/*
  Zero-dependency PNG icon generator for the BLACKGLASS PWA.
  Draws the shard mark on a deep-ink gradient, supersampled 2x,
  and writes 192 / 512 / maskable icons into public/icons/.
*/
import { deflateSync } from 'node:zlib'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'public', 'icons')
mkdirSync(OUT, { recursive: true })

/* ---------- minimal PNG encoder ---------- */
const CRC_TABLE = new Int32Array(256)
for (let n = 0; n < 256; n++) {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  CRC_TABLE[n] = c
}
function crc32(buf) {
  let c = -1
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ -1) >>> 0
}
function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([len, body, crc])
}
function encodePNG(width, height, rgba) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // color type RGBA
  const raw = Buffer.alloc(height * (1 + width * 4))
  for (let y = 0; y < height; y++) {
    raw[y * (1 + width * 4)] = 0 // filter: none
    Buffer.from(rgba.buffer, y * width * 4, width * 4).copy(raw, y * (1 + width * 4) + 1)
  }
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

/* ---------- drawing ---------- */
const BG_TOP = [16, 24, 46]
const BG_BOT = [4, 6, 11]
const FILL = [129, 140, 248] // indigo-400
const LINE = [199, 210, 254] // indigo-200
const GLOW = [129, 140, 248]

// convex quad in unit space (centered), later scaled
const SHARD = [
  [0.0, -0.62],
  [0.42, 0.0],
  [0.0, 0.62],
  [-0.42, 0.0],
]
const CENTER = [0, 0]

function sign(ax, ay, bx, by, px, py) {
  return (bx - ax) * (py - ay) - (by - ay) * (px - ax)
}
function insideQuad(px, py) {
  const signs = []
  for (let i = 0; i < 4; i++) {
    const [ax, ay] = SHARD[i]
    const [bx, by] = SHARD[(i + 1) % 4]
    signs.push(sign(ax, ay, bx, by, px, py) < 0)
  }
  return signs.every(Boolean) || signs.every((s) => !s)
}
function distToSeg(px, py, ax, ay, bx, by) {
  const dx = bx - ax
  const dy = by - ay
  const l2 = dx * dx + dy * dy || 1e-9
  let t = ((px - ax) * dx + (py - ay) * dy) / l2
  t = Math.max(0, Math.min(1, t))
  const gx = ax + t * dx - px
  const gy = ay + t * dy - py
  return Math.hypot(gx, gy)
}
function blend(dst, dr, dg, db, da, alpha) {
  return [
    dst[0] * (1 - alpha) + dr * alpha,
    dst[1] * (1 - alpha) + dg * alpha,
    dst[2] * (1 - alpha) + db * alpha,
    Math.min(255, dst[3] * (1 - alpha) + da * alpha),
  ]
}

/** draw at size D, shard scaled by `shrink` (maskable safe-zone) */
function draw(D, shrink) {
  const px = new Uint8ClampedArray(D * D * 4)
  const s = (D / 2) * 0.92 * shrink
  const quad = SHARD.map(([x, y]) => [x * s, y * s])
  const cx = D / 2
  const cy = D / 2
  const lw = Math.max(1.2, D * 0.006)

  for (let y = 0; y < D; y++) {
    for (let x = 0; x < D; x++) {
      const i = (y * D + x) * 4
      // vertical gradient background
      const g = y / D
      let col = [
        BG_TOP[0] + (BG_BOT[0] - BG_TOP[0]) * g,
        BG_TOP[1] + (BG_BOT[1] - BG_TOP[1]) * g,
        BG_TOP[2] + (BG_BOT[2] - BG_TOP[2]) * g,
        255,
      ]
      // soft radial glow behind the shard
      const dglow = Math.hypot(x - cx, y - (cy - D * 0.06)) / (D * 0.55)
      col = blend(col, GLOW[0], GLOW[1], GLOW[2], 255, Math.max(0, 0.18 * (1 - dglow)))

      const lx = x - cx
      const ly = y - cy
      if (insideQuad(lx, ly)) {
        // facet shading: brighter toward the top-left facet
        const t = Math.max(0, Math.min(1, 0.5 - (lx / s) * 0.5))
        col = blend(col, FILL[0] * (0.7 + t * 0.5), FILL[1] * (0.7 + t * 0.5), FILL[2] * (0.85 + t * 0.3), 255, 0.2)
      }
      // edges
      let edge = Infinity
      for (let k = 0; k < 4; k++) {
        const [ax, ay] = quad[k]
        const [bx, by] = quad[(k + 1) % 4]
        edge = Math.min(edge, distToSeg(lx, ly, ax, ay, bx, by))
      }
      // facet lines from center to vertices
      let facet = Infinity
      for (const [vx, vy] of quad) {
        facet = Math.min(facet, distToSeg(lx, ly, CENTER[0], CENTER[1], vx, vy))
      }
      const eA = Math.max(0, 1 - edge / (lw * 1.6))
      const fA = Math.max(0, 1 - facet / (lw * 1.1))
      if (eA > 0) col = blend(col, LINE[0], LINE[1], LINE[2], 255, 0.85 * eA * eA)
      if (fA > 0) col = blend(col, LINE[0], LINE[1], LINE[2], 255, 0.4 * fA * fA)

      px[i] = col[0]
      px[i + 1] = col[1]
      px[i + 2] = col[2]
      px[i + 3] = col[3]
    }
  }
  return px
}

/** 2x box downsample */
function downscale(px, D) {
  const S = D / 2
  const out = new Uint8ClampedArray(S * S * 4)
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      for (let c = 0; c < 4; c++) {
        const a = px[((y * 2) * D + x * 2) * 4 + c]
        const b = px[((y * 2) * D + x * 2 + 1) * 4 + c]
        const d = px[((y * 2 + 1) * D + x * 2) * 4 + c]
        const e = px[((y * 2 + 1) * D + x * 2 + 1) * 4 + c]
        out[(y * S + x) * 4 + c] = (a + b + d + e) / 4
      }
    }
  }
  return out
}

function make(size, shrink, name) {
  const D = size * 2
  const raw = draw(D, shrink)
  const png = encodePNG(size, size, downscale(raw, D))
  writeFileSync(join(OUT, name), png)
  console.log(`✓ ${name} (${size}×${size}, ${Math.round(png.length / 1024)} KB)`)
}

make(512, 1, 'icon-512.png')
make(192, 1, 'icon-192.png')
make(512, 0.72, 'icon-maskable-512.png')
console.log('done → public/icons/')
