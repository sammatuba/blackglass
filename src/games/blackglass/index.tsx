import { useMemo } from 'react'
import { Anthology } from './Anthology'
import { KANGKONG } from './content/kangkong'
import { VOICECLONE } from './content/voiceclone'
import { DEEPFAKE } from './content/deepfake'
import { FIVEWEEKS } from './content/fiveweeks'
import { ASSISTANT } from './content/assistant'
import { COMPROMISED } from './content/compromised'

/* BLACKGLASS — the phone-anthology Rashomon, now on glassOS.
   Five anchors: the clickbait morning, the voice-clone evening,
   the deepfake afternoon, Bea's five-week drift, and the night
   the family asked the machine. */

const ANCHORS = [KANGKONG, VOICECLONE, DEEPFAKE, FIVEWEEKS, ASSISTANT]

export default function Blackglass() {
  /* Anchor VI (DRAFT, canon review pending) exists only behind ?draft=vi —
     never in the live season, card hidden without the flag. */
  const anchors = useMemo(() => {
    if (typeof window === 'undefined') return ANCHORS
    return new URLSearchParams(window.location.search).get('draft') === 'vi' ? [...ANCHORS, COMPROMISED] : ANCHORS
  }, [])
  return <Anthology anchors={anchors} />
}
