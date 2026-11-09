/* =====================================================================
   THE GRADE — the suite's shared scoring language (pure logic, no UI,
   no engine imports). One scale (S/A/B/C), one rank ladder — used by
   the anthology's signal desk (score.ts re-exports these), the Scam
   Radar feed triage and case debriefs, the Tell Exam results, and the
   Hub's season strip.

   The grade always measures what the player SAW and PRACTICED —
   never the story outcome.
   ===================================================================== */

export type Grade = 'S' | 'A' | 'B' | 'C'

export const GRADE_NAME: Record<Grade, string> = {
  S: 'CRYSTAL',
  A: 'CLEAR',
  B: 'HAZY',
  C: 'FOGGED',
}

export const GRADE_COLOR: Record<Grade, string> = {
  S: '#22d3ee',
  A: '#6ee7b7',
  B: '#f5b942',
  C: '#94a3b8',
}

export function gradeFor(total: number): Grade {
  if (total >= 85) return 'S'
  if (total >= 70) return 'A'
  if (total >= 50) return 'B'
  return 'C'
}

/* Season ranks — the shared progression language. Each scored surface
   feeds its best into one total; the rank is the season's name for how
   clear-eyed you have become. */

export const RANKS: { at: number; name: string }[] = [
  { at: 0, name: 'NEW SIGNAL' },
  { at: 1, name: 'WATCHER' },
  { at: 300, name: 'PATTERN READER' },
  { at: 600, name: 'SEER' },
  { at: 900, name: 'CLEAR-EYED' },
]

export function rankFor(total: number, lived: number): string {
  if (lived === 0) return RANKS[0].name
  let name = RANKS[1].name
  for (const r of RANKS) if (total >= r.at && r.at > 0) name = r.name
  return name
}
