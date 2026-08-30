import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * Fade-up on first scroll into view. Motion animates via rAF, which the
 * global CSS reduced-motion override can't reach — so we check the media
 * query here and render a plain div when the user prefers reduced motion.
 */
export function FadeIn({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 0.8, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
