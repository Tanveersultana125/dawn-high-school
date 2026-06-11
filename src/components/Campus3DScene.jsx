import { Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Html, Float } from '@react-three/drei'
import * as THREE from 'three'

/* ------------------------------------------------------------------ *
 * Palette — kept in sync with the site's navy + gold theme
 * ------------------------------------------------------------------ */
const COL = {
  wall: '#efe8d6',
  wallDark: '#ddd3bb',
  roof: '#0e2a5e',
  roofTop: '#0a1f44',
  gold: '#d4af37',
  goldLit: '#e6c768',
  glow: '#ffe6a8',
  trunk: '#5a3d22',
  leaf: '#2f7d4f',
  ground: '#0b1b3a',
}

const HOTSPOTS = [
  { id: 'academic', icon: '🏛️', title: 'Academic Block', desc: '60 smart classrooms across four floors.', pos: [0, 3.4, 0] },
  { id: 'innovation', icon: '🔬', title: 'Innovation Center', desc: 'Robotics, AI & STEM laboratories.', pos: [-4.6, 2.4, 0] },
  { id: 'library', icon: '📚', title: 'Library & Media', desc: 'Digital research & reading commons.', pos: [4.6, 2.4, 0] },
  { id: 'sports', icon: '⚽', title: 'Sports Complex', desc: 'Indoor arena, pool & athletic fields.', pos: [0, 0.8, 3.6] },
]


/* ------------------------------------------------------------------ *
 * A wall of evenly-spaced, softly-lit windows on one face of a block
 * ------------------------------------------------------------------ */
function WindowWall({ width, height, rows, cols, axis = 'z', sign = 1, offset, y = 0 }) {
  const wins = useMemo(() => {
    const out = []
    const padX = width * 0.16
    const padY = height * 0.2
    const usableW = width - padX * 2
    const usableH = height - padY * 2
    const stepX = cols > 1 ? usableW / (cols - 1) : 0
    const stepY = rows > 1 ? usableH / (rows - 1) : 0
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const lx = -usableW / 2 + c * stepX
        const ly = -usableH / 2 + r * stepY + y
        out.push([lx, ly])
      }
    }
    return out
  }, [width, height, rows, cols, y])

  const wW = (width / cols) * 0.5
  const wH = (height / rows) * 0.52

  return (
    <group>
      {wins.map(([lx, ly], i) => {
        const p = axis === 'z' ? [lx, ly, offset * sign] : [offset * sign, ly, lx]
        const rot = axis === 'z' ? [0, 0, 0] : [0, Math.PI / 2, 0]
        return (
          <mesh key={i} position={p} rotation={rot}>
            <planeGeometry args={[wW, wH]} />
            <meshStandardMaterial
              color={COL.glow}
              emissive={COL.glow}
              emissiveIntensity={0.9}
              toneMapped={false}
            />
          </mesh>
        )
      })}
    </group>
  )
}

/* A rectangular building block with a gold parapet trim + lit windows */
function Block({ position = [0, 0, 0], size = [4, 2, 3], rows = 2, cols = 4, windows = true }) {
  const [w, h, d] = size
  return (
    <group position={position}>
      {/* body */}
      <mesh castShadow receiveShadow position={[0, h / 2, 0]}>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={COL.wall} roughness={0.85} metalness={0.05} />
      </mesh>
      {/* gold parapet trim */}
      <mesh position={[0, h + 0.06, 0]} castShadow>
        <boxGeometry args={[w + 0.12, 0.12, d + 0.12]} />
        <meshStandardMaterial color={COL.gold} metalness={0.7} roughness={0.3} emissive={COL.gold} emissiveIntensity={0.12} />
      </mesh>
      {/* base plinth */}
      <mesh position={[0, 0.08, 0]} receiveShadow>
        <boxGeometry args={[w + 0.16, 0.16, d + 0.16]} />
        <meshStandardMaterial color={COL.wallDark} roughness={0.9} />
      </mesh>
      {windows && (
        <>
          <WindowWall width={w} height={h} rows={rows} cols={cols} axis="z" sign={1} offset={d / 2 + 0.02} y={h / 2} />
          <WindowWall width={w} height={h} rows={rows} cols={cols} axis="z" sign={-1} offset={d / 2 + 0.02} y={h / 2} />
          <WindowWall width={d} height={h} rows={rows} cols={Math.max(2, Math.round(cols * d / w))} axis="x" sign={1} offset={w / 2 + 0.02} y={h / 2} />
          <WindowWall width={d} height={h} rows={rows} cols={Math.max(2, Math.round(cols * d / w))} axis="x" sign={-1} offset={w / 2 + 0.02} y={h / 2} />
        </>
      )}
    </group>
  )
}

/* Entrance portico: columns + steps + pediment */
function Entrance() {
  const cols = [-1.4, -0.7, 0.7, 1.4]
  return (
    <group position={[0, 0, 1.5]}>
      {/* steps */}
      {[0, 1, 2].map((s) => (
        <mesh key={s} position={[0, 0.07 + s * 0.07, 0.7 - s * 0.18]} receiveShadow castShadow>
          <boxGeometry args={[3.4 - s * 0.2, 0.14, 0.5 - s * 0.05]} />
          <meshStandardMaterial color={COL.wallDark} roughness={0.9} />
        </mesh>
      ))}
      {/* doors */}
      <mesh position={[0, 0.85, 0.18]}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshStandardMaterial color={COL.roof} emissive={COL.glow} emissiveIntensity={0.35} />
      </mesh>
      {/* columns */}
      {cols.map((x) => (
        <mesh key={x} position={[x, 1, 0.7]} castShadow>
          <cylinderGeometry args={[0.12, 0.14, 2, 16]} />
          <meshStandardMaterial color={COL.wall} roughness={0.7} />
        </mesh>
      ))}
      {/* pediment / portico roof */}
      <mesh position={[0, 2.12, 0.55]} castShadow>
        <boxGeometry args={[3.4, 0.18, 0.9]} />
        <meshStandardMaterial color={COL.gold} metalness={0.6} roughness={0.35} />
      </mesh>
      {/* triangular pediment cap */}
      <mesh position={[0, 2.45, 0.55]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.55, 0.85, 3]} />
        <meshStandardMaterial color={COL.roof} roughness={0.6} />
      </mesh>
    </group>
  )
}

/* Central clock tower with a dome + flag */
function Tower() {
  const flag = useRef()
  useFrame((state) => {
    if (flag.current) {
      const t = state.clock.elapsedTime
      flag.current.scale.x = 1 + Math.sin(t * 4) * 0.12
    }
  })
  return (
    <group position={[0, 2.8, 0]}>
      <mesh castShadow position={[0, 0.6, 0]}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial color={COL.wall} roughness={0.8} />
      </mesh>
      {/* clock face */}
      <mesh position={[0, 0.7, 0.62]}>
        <circleGeometry args={[0.28, 32]} />
        <meshStandardMaterial color={COL.goldLit} emissive={COL.gold} emissiveIntensity={0.4} toneMapped={false} />
      </mesh>
      {/* gold ring */}
      <mesh position={[0, 1.28, 0]}>
        <boxGeometry args={[1.35, 0.14, 1.35]} />
        <meshStandardMaterial color={COL.gold} metalness={0.7} roughness={0.3} />
      </mesh>
      {/* dome */}
      <mesh castShadow position={[0, 1.55, 0]}>
        <sphereGeometry args={[0.6, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={COL.roof} metalness={0.4} roughness={0.4} />
      </mesh>
      {/* spire + flag */}
      <mesh position={[0, 2.15, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.7, 8]} />
        <meshStandardMaterial color={COL.gold} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh ref={flag} position={[0.16, 2.32, 0]}>
        <planeGeometry args={[0.32, 0.2]} />
        <meshStandardMaterial color={COL.gold} side={THREE.DoubleSide} emissive={COL.gold} emissiveIntensity={0.25} />
      </mesh>
    </group>
  )
}

/* Simple low-poly tree */
function Tree({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.7, 8]} />
        <meshStandardMaterial color={COL.trunk} roughness={1} />
      </mesh>
      <mesh castShadow position={[0, 0.95, 0]}>
        <coneGeometry args={[0.42, 0.9, 10]} />
        <meshStandardMaterial color={COL.leaf} roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0, 1.35, 0]}>
        <coneGeometry args={[0.32, 0.7, 10]} />
        <meshStandardMaterial color={COL.leaf} roughness={0.9} />
      </mesh>
    </group>
  )
}

/* Interactive label that floats above a part of the campus */
function Hotspot({ icon, title, desc, pos }) {
  const [open, setOpen] = useState(false)
  return (
    <Html position={pos} center distanceFactor={11} zIndexRange={[20, 0]}>
      <button
        className={`r3d-pin ${open ? 'open' : ''}`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="r3d-dot" />
        <span className="r3d-card">
          <span className="r3d-ic">{icon}</span>
          <b>{title}</b>
          <small>{desc}</small>
        </span>
      </button>
    </Html>
  )
}

/* The whole campus, gently auto-rotating */
function Campus() {
  return (
    <group position={[0, -1.2, 0]}>
      {/* lawn */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[9, 64]} />
        <meshStandardMaterial color={COL.ground} roughness={1} />
      </mesh>

      {/* wings */}
      <Block position={[-4, 0, 0]} size={[3, 2.2, 2.4]} rows={2} cols={3} />
      <Block position={[4, 0, 0]} size={[3, 2.2, 2.4]} rows={2} cols={3} />
      {/* central academic block */}
      <Block position={[0, 0, 0]} size={[4.2, 2.8, 3]} rows={3} cols={4} />
      <Tower />
      <Entrance />

      {/* trees + flagpole base greenery */}
      <Tree position={[-6.4, 0, 1.6]} scale={1.1} />
      <Tree position={[6.3, 0, 1.8]} scale={1} />
      <Tree position={[-2.6, 0, 3]} scale={0.85} />
      <Tree position={[2.7, 0, 3]} scale={0.9} />

      {HOTSPOTS.map((h) => (
        <Hotspot key={h.id} {...h} />
      ))}

      <ContactShadows position={[0, 0.02, 0]} opacity={0.45} scale={20} blur={2.4} far={6} color="#000814" />
    </group>
  )
}

export default function Campus3DScene() {
  return (
    <div className="r3d-stage">
            <Canvas
              shadows
              dpr={[1, 2]}
              camera={{ position: [9, 6, 11], fov: 42 }}
              gl={{ antialias: true, alpha: true }}
            >
              <color attach="background" args={['#061128']} />
              <fog attach="fog" args={['#061128', 18, 34]} />

              <ambientLight intensity={0.55} />
              <directionalLight
                position={[8, 12, 6]}
                intensity={1.3}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-left={-12}
                shadow-camera-right={12}
                shadow-camera-top={12}
                shadow-camera-bottom={-12}
              />
              <pointLight position={[-8, 4, -6]} intensity={40} color="#4f86f7" distance={30} />
              <pointLight position={[8, 3, 6]} intensity={30} color="#d4af37" distance={28} />

              <Suspense fallback={null}>
                <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.25}>
                  <Campus />
                </Float>
              </Suspense>

              <OrbitControls
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.7}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2.2}
                minDistance={9}
                maxDistance={20}
                enableDamping
                dampingFactor={0.08}
              />
            </Canvas>

      <div className="campus3d-hint">
        <span>🖱️</span> Drag to rotate · Scroll to zoom
      </div>
    </div>
  )
}
