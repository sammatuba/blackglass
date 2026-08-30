import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

/* Cheap glass: reflective physical materials, no transmission pass.
   The whole scene is 7 flat shards — worth it on capable devices only
   (GlassHero gates on memory/cores/reduced-motion before loading this). */

type ShardDef = {
  pos: [number, number, number]
  rot: [number, number, number]
  scale: [number, number, number]
  speed: number
  color: string
}

const SHARDS: ShardDef[] = [
  { pos: [0, 0.2, 0], rot: [0.4, 0.2, 0], scale: [1.5, 2.4, 0.5], speed: 0.12, color: '#818cf8' },
  { pos: [-2.6, 0.8, -1.5], rot: [0.8, -0.4, 0.5], scale: [1.0, 1.7, 0.4], speed: 0.18, color: '#22d3ee' },
  { pos: [2.7, -0.6, -1.2], rot: [-0.3, 0.7, -0.6], scale: [1.1, 1.9, 0.45], speed: 0.15, color: '#f5b942' },
  { pos: [-1.4, -1.6, 0.6], rot: [0.2, 1.2, 0.9], scale: [0.7, 1.2, 0.3], speed: 0.22, color: '#818cf8' },
  { pos: [1.6, 1.8, 0.4], rot: [-0.6, -0.8, -0.4], scale: [0.8, 1.3, 0.35], speed: 0.2, color: '#818cf8' },
  { pos: [-3.4, -0.9, -3], rot: [0.5, 0.9, -0.8], scale: [0.9, 1.5, 0.4], speed: 0.14, color: '#22d3ee' },
  { pos: [3.6, 1.2, -2.6], rot: [-0.9, -0.2, 0.7], scale: [0.85, 1.4, 0.4], speed: 0.16, color: '#f5b942' },
]

function Shard({ def }: { def: ShardDef }) {
  const ref = useRef<THREE.Mesh>(null)
  const geo = useMemo(() => new THREE.TetrahedronGeometry(1), [])
  useEffect(() => () => geo.dispose(), [geo])
  useFrame((_, dt) => {
    const m = ref.current
    if (!m) return
    m.rotation.y += dt * def.speed
    m.rotation.x += dt * def.speed * 0.6
  })
  return (
    <mesh ref={ref} geometry={geo} position={def.pos} rotation={def.rot} scale={def.scale}>
      <meshPhysicalMaterial
        color={def.color}
        roughness={0.12}
        metalness={0.05}
        transparent
        opacity={0.32}
        envMapIntensity={2.2}
        clearcoat={1}
        clearcoatRoughness={0.25}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

/** pointer parallax via window events — the canvas itself is pointer-events-none */
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null)
  const target = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    const k = Math.min(1, dt * 3)
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, target.current.x * 0.16, k)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -target.current.y * 0.1, k)
    g.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.12
  })
  return <group ref={group}>{children}</group>
}

function Environment() {
  const { gl, scene } = useThree()
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04)
    scene.environment = env.texture
    return () => {
      scene.environment = null
      env.dispose()
      pmrem.dispose()
    }
  }, [gl, scene])
  return null
}

export default function HeroScene({ active }: { active: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7.5], fov: 40 }}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      style={{ width: '100%', height: '100%' }}
    >
      <Environment />
      <Rig>
        {SHARDS.map((def, i) => (
          <Shard key={i} def={def} />
        ))}
      </Rig>
    </Canvas>
  )
}
