import type { AppId } from '../types'

export const APP_META: Record<AppId, { name: string; icon: string; tile: string }> = {
  messages: { name: 'Messages', icon: '💬', tile: 'bg-gradient-to-b from-emerald-400/90 to-emerald-600/90' },
  gallery: { name: 'Gallery', icon: '🌸', tile: 'bg-gradient-to-b from-fuchsia-400/90 to-purple-600/90' },
  phone: { name: 'Phone', icon: '📞', tile: 'bg-gradient-to-b from-emerald-500/90 to-teal-700/90' },
  browser: { name: 'Browser', icon: '🌐', tile: 'bg-gradient-to-b from-sky-400/90 to-blue-700/90' },
  contacts: { name: 'Contacts', icon: '👤', tile: 'bg-gradient-to-b from-amber-400/90 to-orange-600/90' },
  notes: { name: 'Notes', icon: '📝', tile: 'bg-gradient-to-b from-yellow-300/90 to-amber-500/90' },
  settings: { name: 'Settings', icon: '⚙️', tile: 'bg-gradient-to-b from-slate-400/90 to-slate-600/90' },
}

export function Avatar({ name, hue, size = 'md' }: { name: string; hue: number; size?: 'sm' | 'md' }) {
  const s = size === 'sm' ? 'h-9 w-9 text-[13px]' : 'h-11 w-11 text-base'
  return (
    <span
      className={`grid ${s} shrink-0 place-items-center rounded-full font-bold text-white`}
      style={{ backgroundColor: `hsl(${hue} 45% 38%)` }}
      aria-hidden="true"
    >
      {name.trim().charAt(0)}
    </span>
  )
}

export function EmptyState({ icon, title, sub }: { icon: string; title: string; sub?: string }) {
  return (
    <div className="grid h-full place-items-center px-8 text-center">
      <div>
        <div className="text-3xl opacity-40" aria-hidden="true">
          {icon}
        </div>
        <p className="mt-2 text-sm font-semibold text-[var(--os-dim)]">{title}</p>
        {sub && <p className="mt-1 text-xs leading-relaxed text-[var(--os-faint)]">{sub}</p>}
      </div>
    </div>
  )
}
