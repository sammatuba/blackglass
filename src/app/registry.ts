export type Pillar = 'play' | 'train' | 'learn'

export type IconName =
  | 'phone'
  | 'book'
  | 'radar'
  | 'loop'
  | 'search'
  | 'eye'
  | 'clipboard'

/** status drives the hub badge; keep in sync with docs/GAMES.md */
export type GameStatus = 'legacy' | 'building' | 'shipped'

export interface GameEntry {
  id: string
  title: string
  tagline: string
  description: string
  pillar: Pillar
  topics: string[]
  status: GameStatus
  meta: string
  icon: IconName
  /** internal platform route (new games) */
  route?: string
  /** directory under dist/legacy (vanilla apps shipped verbatim from play/) */
  legacyPath?: string
}

export const PILLAR_META: Record<
  Pillar,
  {
    name: string
    blurb: string
    /** literal utility strings so Tailwind can see them */
    text: string
    border: string
    chipBg: string
    iconBg: string
  }
> = {
  play: {
    name: 'Play',
    blurb:
      'Stories you live from the inside. The anthology puts you in the phones of a family navigating AI-powered deception — each phone its own way of being fooled.',
    text: 'text-play',
    border: 'hover:border-play/60',
    chipBg: 'bg-play/12 text-play',
    iconBg: 'bg-play/15 text-play',
  },
  train: {
    name: 'Train',
    blurb:
      'Skills for the real world. Scam Radar drills the reflexes — judge the feed, work the case, verify through official channels — until the pause before you tap Send becomes automatic.',
    text: 'text-train',
    border: 'hover:border-train/60',
    chipBg: 'bg-train/12 text-train',
    iconBg: 'bg-train/15 text-train',
  },
  learn: {
    name: 'Glassbox',
    blurb:
      'Take the mechanism apart. Explorables that put the model in your hands — change the numbers, watch the incentive move, then return to the story knowing why it worked.',
    text: 'text-learn',
    border: 'hover:border-learn/60',
    chipBg: 'bg-learn/12 text-learn',
    iconBg: 'bg-learn/15 text-learn',
  },
}

export const STATUS_LABEL: Record<GameStatus, string> = {
  legacy: 'LEGACY',
  building: 'BETA',
  shipped: 'NEW',
}

/** Playable game cards and the legacy shelf. Glassbox explorables are
    catalogued separately in src/games/glassbox/catalog.ts. */
export const GAMES: GameEntry[] = [
  {
    id: 'scam-radar',
    title: 'Scam Radar',
    tagline: 'Train the pause that beats the scam',
    description:
      'Judge a live feed of texts, DMs, and calls — Scam, Legit, or Verify first — then work narrative case files: inspect the artifacts, weigh the clues, choose your response.',
    pillar: 'train',
    topics: ['red flags', 'verify first', 'case files'],
    status: 'shipped',
    meta: 'Trainer · feed + cases',
    icon: 'radar',
    route: '/scam-radar',
  },
  {
    id: 'tell-exam',
    title: 'Tell Exam',
    tagline: 'Find the flaw they planted on purpose',
    description:
      'The synthetic images the family was fooled by, one at a time — tap where you think the tell is, then reveal. Every flaw was planted on purpose; scoring is the manifest itself. The objective measure of the eye the story trains.',
    pillar: 'train',
    topics: ['tells', 'synthetic media', 'second look'],
    status: 'shipped',
    meta: 'Trainer · tell exam',
    icon: 'eye',
    route: '/tell-exam',
  },
  {
    id: 'blackglass',
    title: 'BLACKGLASS',
    tagline: 'Three phones. One morning.',
    description:
      'The phone-anthology on glassOS. A link about a vegetable moves through a family on a Saturday — live it from inside Maya\u2019s, Tita Merly\u2019s, and Bea\u2019s phones (each its own UI, its own way of being fooled), then see the one timeline none of them could.',
    pillar: 'play',
    topics: ['clickbait', 'group chat', 'AI debunker'],
    status: 'shipped',
    meta: 'Phone-anthology · 4 anchors + finale',
    icon: 'phone',
    route: '/blackglass',
  },
  {
    id: 'blackglass-phones',
    title: 'BLACKGLASS · classic',
    tagline: 'Four ways to be fooled',
    description:
      'One family, one group chat, four stories. Live a scam from inside Maya’s, Tita Merly’s, and Bea’s phones — then see the one timeline none of them could.',
    pillar: 'play',
    topics: ['clickbait', 'voice clone', 'deepfake', 'the feed'],
    status: 'legacy',
    meta: 'Phone-anthology · 20–30 min each',
    icon: 'phone',
    legacyPath: 'blackglass-phones/',
  },
  {
    id: 'blackglass-maya',
    title: 'Maya’s Story',
    tagline: 'The long-form read',
    description:
      'The original single-perspective interactive fiction: one scam-heavy day across twelve scenes and three acts, ~15,000 words.',
    pillar: 'play',
    topics: ['interactive fiction', 'one day'],
    status: 'legacy',
    meta: 'Interactive fiction · 60–90 min',
    icon: 'book',
    legacyPath: 'blackglass/',
  },
  {
    id: 'human-in-the-loop',
    title: 'Human-in-the-Loop',
    tagline: 'When do you override the machine?',
    description:
      'Case files of AI recommendations — accept or override? Trains automation bias awareness and trust calibration, with a classroom mode.',
    pillar: 'learn',
    topics: ['automation bias', 'trust calibration'],
    status: 'legacy',
    meta: 'Card game · 15–25 min',
    icon: 'loop',
    legacyPath: 'human-in-the-loop/',
  },
  {
    id: 'bias-bounty',
    title: 'Bias Bounty',
    tagline: 'Find the hidden unfairness',
    description:
      'Deal AI-system cards, match problems to three bias patterns — biased data, flawed metrics, proxy discrimination — and see the real-world harm.',
    pillar: 'learn',
    topics: ['algorithmic bias', 'fairness'],
    status: 'legacy',
    meta: 'Card game · 15–25 min',
    icon: 'search',
    legacyPath: 'bias-bounty-lite/',
  },
  {
    id: 'hallucination-hunt',
    title: 'Hallucination Hunt',
    tagline: 'Stamp the claims',
    description:
      'Fact-check AI-generated claims with tool cards — citation check, cross-reference, source verification — and stamp each one VERIFIED, HALLUCINATED, or UNVERIFIABLE.',
    pillar: 'learn',
    topics: ['verification', 'hallucination'],
    status: 'legacy',
    meta: 'Card game · 15–25 min',
    icon: 'eye',
    legacyPath: 'hallucination-hunt/',
  },
  {
    id: 'risk-assessment',
    title: 'Risk Assessment Protocol',
    tagline: 'Govern the system',
    description:
      'Walk an AI system through the NIST AI RMF — MAP, MEASURE, MANAGE, GOVERN — and assign its EU AI Act risk tier.',
    pillar: 'learn',
    topics: ['NIST AI RMF', 'EU AI Act'],
    status: 'legacy',
    meta: 'Card game · 20–30 min',
    icon: 'clipboard',
    legacyPath: 'risk-assessment-protocol/',
  },
]

export function gameByLegacyPath(path: string): GameEntry | undefined {
  const norm = path.replace(/\/+$/, '') + '/'
  return GAMES.find((g) => g.legacyPath === norm)
}
