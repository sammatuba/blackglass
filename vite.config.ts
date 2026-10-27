import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages uses a subpath; Cloudflare Pages serves the site at the root.
const BASE = process.env.CF_PAGES ? '/' : '/blackglass/'

export default defineConfig({
  base: BASE,
  plugins: [
    react(),
    tailwindcss(),
    // Ship the legacy vanilla apps verbatim — the hub embeds them same-origin.
    // Artifact media is excluded: it lives once in public/artifacts/ and the
    // legacy iframe reads it via window.ARTIFACT_BASE (dedupe, 2026-10-04).
    viteStaticCopy({
      targets: [
        { src: ['play/**/*', '!play/blackglass-phones/assets/*.{png,webm,mp4}'], dest: 'legacy' },
      ],
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['legacy/**/*'],
      manifest: {
        name: 'BLACKGLASS — Seeing Clearly in a World Shaped by AI',
        short_name: 'BLACKGLASS',
        description:
          'Games for AI safety, scam-readiness, and cyber-security — play the story, train the instincts, learn the concepts.',
        lang: 'en',
        theme_color: '#070b14',
        background_color: '#070b14',
        display: 'standalone',
        start_url: BASE,
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        navigateFallback: BASE,
        // iframe navigations into legacy apps must load their own HTML
        navigateFallbackDenylist: [/^\/(?:blackglass\/)?legacy\//],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        // Capability-gated/runtime-loaded media stays out of the precache:
        // the hero chunk (reduced-motion / low-RAM devices get the CSS
        // gradient) and artifact clips (multi-MB; cached by the browser on
        // first play instead of charged to every first visit).
        globIgnores: ['**/HeroScene-*.js', '**/*.webm', '**/*.mp4', '**/artifacts/*.png'],
      },
    }),
  ],
})
