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
  preview: 'ledger' | 'feed'
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
    preview: 'ledger',
  },
  {
    id: 'the-feed-dial',
    number: '02',
    title: 'The Feed Dial',
    tagline: 'Five weeks. One feed. No lie.',
    description:
      'Set the ranking weights behind Bea’s feed and watch what creators make. Then find the lever that changes what the feed is paid for — and what it costs.',
    route: '/glassbox/the-feed-dial',
    minutes: 6,
    status: 'shipped',
    topics: ['attention', 'recommendation', 'algorithmic capture'],
    preview: 'feed',
  },
]
