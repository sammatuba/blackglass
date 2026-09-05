import { Anthology } from './Anthology'
import { KANGKONG } from './content/kangkong'
import { VOICECLONE } from './content/voiceclone'
import { DEEPFAKE } from './content/deepfake'
import { FIVEWEEKS } from './content/fiveweeks'

/* BLACKGLASS — the phone-anthology Rashomon, now on glassOS.
   Four anchors: the clickbait morning, the voice-clone evening,
   the deepfake afternoon, and Bea's five-week drift. */

const ANCHORS = [KANGKONG, VOICECLONE, DEEPFAKE, FIVEWEEKS]

export default function Blackglass() {
  return <Anthology anchors={ANCHORS} />
}
