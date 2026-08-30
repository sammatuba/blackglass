/* The six red-flag families — the taxonomy Scam Radar trains.
   Drawn from Google's Be Scam Ready taxonomy + PH scam texture. */

export type FamilyId = 'urgency' | 'authority' | 'payment' | 'toogood' | 'emotion' | 'channel'

export interface FamilyMeta {
  id: FamilyId
  label: string
  short: string
  icon: string
  hint: string
}

export const FAMILIES: FamilyMeta[] = [
  {
    id: 'urgency',
    label: 'Urgency & pressure',
    short: 'Urgency',
    icon: '⏱️',
    hint: 'Countdowns, deadlines, “act now or else”. Real institutions never give you hours.',
  },
  {
    id: 'authority',
    label: 'Authority & impersonation',
    short: 'Authority',
    icon: '🎭',
    hint: 'Banks, government, police, family — claimed loudly, verified never.',
  },
  {
    id: 'payment',
    label: 'Payment & money movement',
    short: 'Payment',
    icon: '💸',
    hint: 'Fees to receive money, transfers to strangers, “investments” with guaranteed returns.',
  },
  {
    id: 'toogood',
    label: 'Too good to be true',
    short: 'Too good',
    icon: '🎰',
    hint: 'Prizes you never joined, wages for no work, discounts too deep to exist.',
  },
  {
    id: 'emotion',
    label: 'Emotional leverage & secrecy',
    short: 'Emotion',
    icon: '🫂',
    hint: 'Fear, love, embarrassment — and “don’t tell anyone yet”. Emotion is the override button.',
  },
  {
    id: 'channel',
    label: 'Channel anomalies',
    short: 'Channel',
    icon: '🔀',
    hint: 'New numbers, odd domains, wrong platform, links where none belong.',
  },
]

export const FAMILY_BY_ID = Object.fromEntries(FAMILIES.map((f) => [f.id, f])) as Record<FamilyId, FamilyMeta>

/** the three judgments a scam-ready person can make */
export type Verdict = 'scam' | 'legit' | 'verify'

export const VERDICT_META: Record<Verdict, { label: string; key: string; classes: string }> = {
  scam: { label: 'Scam', key: '1', classes: 'bg-red-500/15 text-red-300 border-red-500/40 hover:bg-red-500/25' },
  verify: { label: 'Verify first', key: '2', classes: 'bg-amber-400/15 text-amber-300 border-amber-400/40 hover:bg-amber-400/25' },
  legit: { label: 'Legit', key: '3', classes: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/25' },
}
