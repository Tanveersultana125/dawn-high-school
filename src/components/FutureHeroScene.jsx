import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Center, Text3D } from '@react-three/drei'

const FONT = '/font3d.json'

// School-themed glyphs: math signs + numbers + a few letters
const GLYPHS = ['+', '-', '=', '%', '*', '/', '<', '>', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B', 'C', 'X', 'Y', 'Z', 'a', 'b']
const COLORS = ['#8b5cf6', '#22d3ee', '#fb923c', '#4ade80', '#f472b6', '#60a5fa', '#fbbf24', '#a78bfa']

// Flow field bounds (glyphs wrap around these so the stream is continuous)
const SPAN_X = 20
const SPAN_Y = 13
const HALF_X = SPAN_X / 2
const HALF_Y = SPAN_Y / 2

// Deterministic placement so positions stay stable across renders
const FIELD = (() => {
  let seed = 9871
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff
    return seed / 0x7fffffff
  }
  return GLYPHS.map((char) => {
    // each glyph drifts in its own direction -> flow comes from all 4 sides
    const angle = rnd() * Math.PI * 2
    const speed = 0.5 + rnd() * 0.7
    return {
      char,
      x0: (rnd() - 0.5) * SPAN_X,
      y0: (rnd() - 0.5) * SPAN_Y,
      z: (rnd() - 0.5) * 5 - 1,
      size: 0.75 + rnd() * 1.05,
      color: COLORS[Math.floor(rnd() * COLORS.length)],
      fspeed: 1 + rnd() * 1.3,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
    }
  })
})()

// keep a value wrapped within [-half, half]
const wrap = (v, half, span) => {
  let r = ((v + half) % span + span) % span
  return r - half
}

function Glyph({ char, x0, y0, z, size, color, fspeed, vx, vy }) {
  const ref = useRef()
  useFrame((s) => {
    const g = ref.current
    if (!g) return
    const t = s.clock.elapsedTime
    g.position.x = wrap(x0 + t * vx, HALF_X, SPAN_X) // own direction, wraps around
    g.position.y = wrap(y0 + t * vy, HALF_Y, SPAN_Y)
  })
  return (
    <group ref={ref} position={[x0, y0, z]}>
      <Float speed={fspeed} rotationIntensity={1} floatIntensity={1.2}>
        <Center scale={size}>
          <Text3D
            font={FONT}
            size={1}
            height={0.42}
            curveSegments={6}
            bevelEnabled
            bevelThickness={0.06}
            bevelSize={0.035}
            bevelSegments={4}
          >
            {char}
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.55} metalness={0.35} roughness={0.16} />
          </Text3D>
        </Center>
      </Float>
    </group>
  )
}

// Whole cluster gently follows the cursor (parallax) for interactivity
function Cluster() {
  const g = useRef()
  useFrame((s) => {
    if (!g.current) return
    g.current.rotation.y += (s.pointer.x * 0.3 - g.current.rotation.y) * 0.04
    g.current.rotation.x += (-s.pointer.y * 0.2 - g.current.rotation.x) * 0.04
  })
  return (
    <group ref={g}>
      {FIELD.map((d, i) => (
        <Glyph key={i} {...d} />
      ))}
    </group>
  )
}

export default function FutureHeroScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 48 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 5, 5]} intensity={1.3} />
      <pointLight position={[-6, -3, 3]} intensity={60} color="#8b5cf6" distance={34} />
      <pointLight position={[6, 4, 2]} intensity={55} color="#22d3ee" distance={34} />
      <pointLight position={[0, -5, 4]} intensity={45} color="#fb923c" distance={30} />
      <Suspense fallback={null}>
        <Cluster />
      </Suspense>
    </Canvas>
  )
}
