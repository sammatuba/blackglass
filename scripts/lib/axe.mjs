/* Shared axe-core check for the smoke scripts (E3 in docs/game-design-eval.md).
   Injects axe into the page, runs it, prints serious/critical violations,
   and sets the process exit code when any are found. Moderate/minor are
   reported but do not fail. */
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const AXE_PATH = require.resolve('axe-core/axe.min.js')

/** run axe on the current page state; returns number of serious+critical violations */
export async function axeCheck(page, label) {
  await page.addScriptTag({ path: AXE_PATH })
  const results = await page.evaluate(() =>
    window.axe.run(document, {
      resultTypes: ['violations'],
    }),
  )
  const blocking = results.violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical',
  )
  const minor = results.violations.filter((v) => v.impact !== 'serious' && v.impact !== 'critical')

  if (minor.length) {
    console.log(`  axe [${label}] minor (${minor.length}):`)
    for (const v of minor) console.log(`    · ${v.id} (${v.impact}) ×${v.nodes.length}`)
  }
  if (blocking.length) {
    console.log(`  axe [${label}] BLOCKING (${blocking.length}):`)
    for (const v of blocking) {
      console.log(`    · ${v.id} (${v.impact}) ×${v.nodes.length} — ${v.help}`)
      for (const n of v.nodes.slice(0, 3)) console.log(`        ${n.target.join(' ')}`)
    }
    process.exitCode = 1
  } else {
    console.log(`  axe [${label}]: clean (serious/critical)`)
  }
  return blocking.length
}
