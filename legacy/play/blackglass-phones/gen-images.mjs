#!/usr/bin/env node
/* =====================================================================
   BLACKGLASS — diegetic-artifact generator
   Reads assets/manifest.json and generates the artifacts the characters
   are FOOLED BY (clickbait previews, the Dr. Anita deepfake stills).
   Authoring-time only — the shipped game just references the PNGs it
   writes. Zero npm dependencies (Node >= 18 built-in fetch).

   Usage:
     GEMINI_API_KEY=...  node gen-images.mjs            # generate missing
     GEMINI_API_KEY=...  node gen-images.mjs --force    # regenerate all
     GEMINI_API_KEY=...  node gen-images.mjs --only=dr-anita-still
     node gen-images.mjs --emit        # rewrite assets/artifacts.js only (no key)
     node gen-images.mjs --dry-run      # print prompts, call nothing

   Flags:
     --force            overwrite existing files
     --only=<id[,id]>   restrict to these artifact ids
     --model=<name>     override defaultModel for this run
     --emit             only (re)write the browser mirror artifacts.js, then exit
     --dry-run          resolve + print requests, make no API calls

   Models:
     gemini-2.5-flash-image  (default, "Nano Banana") — supports editFrom
                             image-conditioning for subject consistency.
     imagen-4.0-generate-001 (or similar) — text-only; editFrom is ignored.
   ===================================================================== */

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ASSETS = join(HERE, 'assets');
const MANIFEST_PATH = join(ASSETS, 'manifest.json');
const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

/* Load .env if present — checked from the script dir up to the repo root,
   so `node gen-images.mjs` works without --env-file (Node >= 20.12). */
if (typeof process.loadEnvFile === 'function') {
  for (const p of ['.env', '../.env', '../../.env', '../../../.env']) {
    try { process.loadEnvFile(join(HERE, p)); break; } catch { /* keep looking */ }
  }
}

/* ---- args ---- */
const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
const val = (k) => { const a = argv.find((x) => x.startsWith(k + '=')); return a ? a.slice(k.length + 1) : null; };
const FORCE = has('--force');
const DRY = has('--dry-run');
const EMIT_ONLY = has('--emit');
const ONLY = (val('--only') || '').split(',').map((s) => s.trim()).filter(Boolean);
const MODEL_ARG = val('--model');
const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '';

/* ---- tiny logging ---- */
const c = { dim: (s) => `\x1b[2m${s}\x1b[0m`, ok: (s) => `\x1b[32m${s}\x1b[0m`, warn: (s) => `\x1b[33m${s}\x1b[0m`, err: (s) => `\x1b[31m${s}\x1b[0m`, b: (s) => `\x1b[1m${s}\x1b[0m` };
const log = (...a) => console.log(...a);

async function main() {
  const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
  const all = manifest.artifacts || [];

  if (EMIT_ONLY) {
    await emitArtifactsJs(manifest);
    log(c.ok('✓ wrote assets/artifacts.js (browser mirror) — no images generated'));
    return;
  }

  const selected = all.filter((a) => (ONLY.length ? ONLY.includes(a.id) : true));
  if (!selected.length) { log(c.warn('nothing selected')); return; }

  if (!API_KEY && !DRY) {
    log(c.err('No GEMINI_API_KEY (or GOOGLE_API_KEY) in env.'));
    log(c.dim('  export GEMINI_API_KEY=...   then re-run.  Or use --dry-run / --emit.'));
    process.exit(1);
  }

  const defaultModel = MODEL_ARG || manifest.defaultModel || 'gemini-2.5-flash-image';
  log(c.b(`BLACKGLASS artifacts`), c.dim(`· model ${defaultModel}${DRY ? ' · DRY RUN' : ''}`));

  /* editFrom dependencies must be generated/available before dependents.
     Order so that any editFrom source precedes its consumer. */
  const ordered = topoOrder(selected, all);

  let made = 0, skipped = 0, failed = 0;
  for (const art of ordered) {
    const outPath = join(ASSETS, art.file);
    if (existsSync(outPath) && !FORCE && !DRY) {
      log(c.dim(`· skip   ${art.id} (exists; --force to redo)`));
      skipped++; continue;
    }
    const model = art.model || defaultModel;
    const prompt = buildPrompt(manifest, art);
    try {
      if (DRY) {
        log(c.b(`\n— ${art.id} —`), c.dim(`${model} · ${art.aspect || 'default'}`));
        log(prompt);
        if (art.editFrom) log(c.dim(`  (conditioned on ${art.editFrom})`));
        continue;
      }
      log(c.dim(`· gen    ${art.id} …`));
      const bytes = await generate({ model, prompt, art });
      await writeFile(outPath, bytes);
      log(c.ok(`✓ wrote  ${art.file}`), c.dim(`(${(bytes.length / 1024).toFixed(0)} KB)`));
      made++;
    } catch (e) {
      log(c.err(`✗ fail   ${art.id}: ${e.message}`));
      failed++;
    }
  }

  if (!DRY) await emitArtifactsJs(manifest);
  log('');
  log(c.b('done'), c.dim(`· ${made} made · ${skipped} skipped · ${failed} failed`));
  if (made) log(c.dim('  artifacts.js refreshed. Open play/blackglass-phones/index.html.'));
  if (failed) process.exitCode = 1;
}

/* Build the full prompt: global style + tells guidance + the artifact prompt. */
function buildPrompt(manifest, art) {
  const parts = [];
  if (manifest.globalStyle) parts.push(manifest.globalStyle);
  parts.push(art.prompt);
  if (art.tellsNote) parts.push('Deliberate, findable flaws to include: ' + art.tellsNote);
  parts.push('Output a single image. No real brand names, no real URLs, no real or recognizable person.');
  return parts.join('\n\n');
}

/* Dispatch by model family. Returns a Buffer of image bytes. */
async function generate({ model, prompt, art }) {
  if (/imagen/i.test(model)) return generateImagen({ model, prompt, art });
  return generateGemini({ model, prompt, art });
}

/* gemini-2.5-flash-image ("Nano Banana"): generateContent, inline image out.
   Supports an input image part (editFrom) for subject consistency. */
async function generateGemini({ model, prompt, art }) {
  const parts = [{ text: prompt }];
  if (art.editFrom) {
    const src = await loadEditSource(art.editFrom);
    if (src) parts.push({ inlineData: { mimeType: src.mime, data: src.b64 } });
  }
  const generationConfig = { responseModalities: ['IMAGE'] };
  if (art.aspect) generationConfig.imageConfig = { aspectRatio: art.aspect };

  const body = { contents: [{ role: 'user', parts }], generationConfig };
  const json = await callApi(`${model}:generateContent`, body);
  const cand = json.candidates && json.candidates[0];
  const outParts = (cand && cand.content && cand.content.parts) || [];
  const img = outParts.find((p) => p.inlineData && p.inlineData.data);
  if (!img) {
    const txt = outParts.map((p) => p.text).filter(Boolean).join(' ');
    throw new Error('no image in response' + (txt ? ` (model said: ${txt.slice(0, 120)})` : ''));
  }
  return Buffer.from(img.inlineData.data, 'base64');
}

/* Imagen: :predict, base64 in predictions[]. No image-conditioning. */
async function generateImagen({ model, prompt, art }) {
  if (art.editFrom) console.log(c.warn(`  (imagen ignores editFrom for ${art.id} — consistency not guaranteed)`));
  const parameters = { sampleCount: 1, personGeneration: 'allow_adult' };
  if (art.aspect) parameters.aspectRatio = art.aspect;
  const body = { instances: [{ prompt }], parameters };
  const json = await callApi(`${model}:predict`, body);
  const pred = json.predictions && json.predictions[0];
  const b64 = pred && (pred.bytesBase64Encoded || (pred.image && pred.image.bytesBase64Encoded));
  if (!b64) throw new Error('no image in imagen response');
  return Buffer.from(b64, 'base64');
}

async function callApi(path, body) {
  const res = await fetch(`${API_BASE}/${path}?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    let detail = '';
    try { const j = await res.json(); detail = j.error ? j.error.message : JSON.stringify(j); }
    catch { detail = await res.text(); }
    throw new Error(`HTTP ${res.status} — ${String(detail).slice(0, 200)}`);
  }
  return res.json();
}

async function loadEditSource(id) {
  // find the source artifact's output file, read + base64 it for conditioning
  const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
  const src = (manifest.artifacts || []).find((a) => a.id === id);
  if (!src) return null;
  const p = join(ASSETS, src.file);
  if (!existsSync(p)) { console.log(c.warn(`  (editFrom ${id} not generated yet — proceeding without conditioning)`)); return null; }
  const buf = await readFile(p);
  return { mime: 'image/png', b64: buf.toString('base64') };
}

/* sources-before-consumers ordering for editFrom chains */
function topoOrder(selected, all) {
  const byId = new Map(all.map((a) => [a.id, a]));
  const out = [];
  const seen = new Set();
  const visit = (a) => {
    if (!a || seen.has(a.id)) return;
    if (a.editFrom && byId.has(a.editFrom)) visit(byId.get(a.editFrom));
    seen.add(a.id);
    out.push(a);
  };
  selected.forEach(visit);
  // keep only the originally-selected ids (sources pulled in only to order them)
  const wanted = new Set(selected.map((a) => a.id));
  return out.filter((a) => wanted.has(a.id));
}

/* Emit the browser-side mirror: window.ARTIFACTS = { id: {file, kind, fallback, tells} }.
   This is what app.js reads under file:// (no fetch). Prompts are NOT shipped. */
async function emitArtifactsJs(manifest) {
  const map = {};
  for (const a of manifest.artifacts || []) {
    map[a.id] = {
      title: a.title || a.id,
      what: a.what || '',
      anchor: a.anchor || 'kangkong',
      file: 'assets/' + a.file,
      kind: a.kind,
      aspect: a.aspect || null,
      fallback: a.fallback || null,
      tells: (a.tells || []).map((t) => ({ id: t.id, label: t.label, detail: t.detail, x: t.x, y: t.y })),
    };
  }
  const order = (manifest.artifacts || []).map((a) => a.id);
  const banner = '/* AUTO-GENERATED by gen-images.mjs from assets/manifest.json — do not edit by hand. */\n';
  const js = banner +
    'window.ARTIFACTS = ' + JSON.stringify(map, null, 2) + ';\n' +
    'window.ARTIFACTS_ORDER = ' + JSON.stringify(order) + ';\n';
  await writeFile(join(ASSETS, 'artifacts.js'), js);
}

main().catch((e) => { console.error(c.err(e.stack || e.message)); process.exit(1); });
