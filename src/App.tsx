import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Hub from './app/pages/Hub'
import LegacyViewer from './app/pages/LegacyViewer'

const ScamRadar = lazy(() => import('./games/scam-radar'))
const Blackglass = lazy(() => import('./games/blackglass'))

export default function App() {
  return (
    <Suspense
      fallback={<div className="grid min-h-dvh place-items-center text-ink-400">Loading…</div>}
    >
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/scam-radar/*" element={<ScamRadar />} />
        <Route path="/blackglass" element={<Blackglass />} />
        <Route path="/legacy/*" element={<LegacyViewer />} />
        <Route path="*" element={<Hub />} />
      </Routes>
    </Suspense>
  )
}
