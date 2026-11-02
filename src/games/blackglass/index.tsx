import { Anthology } from './Anthology'
import { KANGKONG } from './content/kangkong'
import { VOICECLONE } from './content/voiceclone'
import { DEEPFAKE } from './content/deepfake'
import { FIVEWEEKS } from './content/fiveweeks'
import { ASSISTANT } from './content/assistant'

/* BLACKGLASS — the phone-anthology Rashomon, now on glassOS.
   Five anchors: the clickbait morning, the voice-clone evening,
   the deepfake afternoon, Bea's five-week drift, and the night
   the family asked the machine. */

const ANCHORS = [KANGKONG, VOICECLONE, DEEPFAKE, FIVEWEEKS, ASSISTANT]

export default function Blackglass() {
  return <Anthology anchors={ANCHORS} />
}
