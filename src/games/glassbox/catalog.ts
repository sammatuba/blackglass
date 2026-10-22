export interface ExplorableEntry {
  id: string
  number: string
  title: string
  tagline: string
  description: string
  route: string
  minutes: number
  status: 'shipped' | 'building'
  topics: string[]
}

export const EXPLORABLES: ExplorableEntry[] = [
  {
    id: 'one-in-a-thousand',
    number: '01',
    title: 'One in a Thousand',
    tagline: 'A scam that almost never works — and still pays for itself.',
    description:
      'The ledger behind the voice-clone call. Turn the reach, cost, and conversion knobs, then find the one lever that changes the business.',
    route: '/glassbox/one-in-a-thousand',
    minutes: 5,
    status: 'shipped',
    topics: ['scam economics', 'AI scale', 'verification'],
  },
]
