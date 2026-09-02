import { Anthology } from './Anthology'
import { KANGKONG } from './content/kangkong'

/* BLACKGLASS — the phone-anthology Rashomon, now on glassOS.
   One anchor ships today; the rack carries the rest as they're ported. */

export default function Blackglass() {
  return <Anthology anchor={KANGKONG} />
}
