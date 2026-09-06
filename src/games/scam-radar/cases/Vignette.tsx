import loveseat from '../../../assets/kitbitz/cushioned-loveseat--51901c53.svg'
import tableLamp from '../../../assets/kitbitz/table-lamp--3ade088a.svg'
import monstera from '../../../assets/kitbitz/potted-monstera-plant--7453374f.svg'
import desk from '../../../assets/kitbitz/minimalist-desk--533168fb.svg'
import deskLamp from '../../../assets/kitbitz/capsule-desk-lamp--2a726de8.svg'
import bookshelf from '../../../assets/kitbitz/bookshelf-cabinet--9a0de1c7.svg'
import storefront from '../../../assets/kitbitz/storefront-shop--d7093dc8.svg'
import streetLamp from '../../../assets/kitbitz/classic-street-lamp--b7834bdf.svg'
import pottedTree from '../../../assets/kitbitz/potted-tree--64bb7e7b.svg'

/* Quiet CC0 scene vignettes (Kitbitz catalog — see src/assets/kitbitz/MANIFEST.json)
   for the case-file debriefs: the room you were sitting in when it happened. */

type Piece = { src: string; h: number; left?: string; right?: string; center?: boolean }

const SCENES: Record<'sala' | 'desk' | 'street', Piece[]> = {
  sala: [
    { src: tableLamp, h: 50, left: '7%' },
    { src: loveseat, h: 70, center: true },
    { src: monstera, h: 62, right: '5%' },
  ],
  desk: [
    { src: bookshelf, h: 78, left: '6%' },
    { src: desk, h: 64, center: true },
    { src: deskLamp, h: 52, right: '9%' },
  ],
  street: [
    { src: streetLamp, h: 80, left: '8%' },
    { src: storefront, h: 88, right: '18%' },
    { src: pottedTree, h: 50, right: '4%' },
  ],
}

export function Vignette({ scene }: { scene: 'sala' | 'desk' | 'street' }) {
  return (
    <div
      aria-hidden="true"
      className="relative h-24 overflow-hidden bg-gradient-to-b from-ink-700/40 to-ink-900"
    >
      <div className="absolute inset-x-0 bottom-0 h-px bg-ink-600/60" />
      {SCENES[scene].map((p, i) => (
        <img
          key={i}
          src={p.src}
          alt=""
          loading="lazy"
          className="absolute bottom-0 opacity-90 [filter:saturate(.85)_brightness(.92)]"
          style={{
            height: p.h,
            left: p.center ? '50%' : p.left,
            right: p.right,
            transform: p.center ? 'translateX(-50%)' : undefined,
          }}
        />
      ))}
    </div>
  )
}
