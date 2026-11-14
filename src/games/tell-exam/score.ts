/* Tell Exam scoring — pure, so the purity contract is unit-testable.

   The exam signal is recall × precision: find the planted tells AND don't
   flag phantoms. Spamming markers costs. The personal best is only written
   when a full run completes (the caller's job) — an interim score after the
   first artifact is never a best (review finding 2026-11-14). */

export function examSignal(found: number, total: number, alarms: number): number {
  if (total <= 0) return 0
  const precision = found > 0 ? found / (found + alarms) : 0
  return Math.round(((found / total) * 100) * precision)
}
