import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { VitePWA } from 'vite-plugin-pwa'

const BASE = '/blackglass/'

export default defineConfig({
  base: BASE,
  plugins: [
    react(),
    tailwindcss(),
    // Ship the legacy vanilla apps verbatim — the hub embeds them same-origin.
    viteStaticCopy({
      targets: [{ src: 'play/**/*', dest: 'legacy' }],
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
        navigateFallbackDenylist: [/^\/blackglass\/legacy\//],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },
    }),
  ],
})
