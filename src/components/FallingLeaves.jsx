// Gentle falling leaves that float over the whole website.
// Change LEAF_COUNT to show more or fewer leaves.
const LEAF_COUNT = 16

const colors = [
  '#bef264', // lime
  '#6ee7b7', // mint
  '#34d399', // emerald
  '#4ade80', // green
  '#b45309', // autumn brown
  '#d97706', // amber
]

// Fixed, pre-calculated values so the leaves look natural but never jump around.
const leaves = Array.from({ length: LEAF_COUNT }, (_, i) => ({
  id: i,
  left: (i * 37 + 11) % 100, // % from the left edge
  size: 14 + ((i * 7) % 16), // px
  duration: 14 + ((i * 5) % 12), // seconds to fall
  delay: -((i * 3.7) % 20), // negative = already falling on load
  drift: ((i % 2 === 0 ? 1 : -1) * (40 + ((i * 13) % 80))), // px sideways
  spin: (i % 2 === 0 ? 1 : -1) * (240 + ((i * 53) % 240)), // degrees
  sway: 3 + ((i * 2) % 4), // seconds per sway
  opacity: 0.35 + ((i * 11) % 40) / 100,
  color: colors[i % colors.length],
}))

function FallingLeaves() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden motion-reduce:hidden"
    >
      {leaves.map((leaf) => (
        <span
          key={leaf.id}
          // Hide extra leaves on small phones to keep things light.
          className={`absolute top-0 block ${leaf.id >= 8 ? 'hidden sm:block' : ''}`}
          style={{
            left: `${leaf.left}%`,
            width: leaf.size,
            height: leaf.size,
            opacity: leaf.opacity,
            '--drift': `${leaf.drift}px`,
            '--spin': `${leaf.spin}deg`,
            animation: `leaf-fall ${leaf.duration}s linear ${leaf.delay}s infinite`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            style={{
              animation: `leaf-sway ${leaf.sway}s ease-in-out ${leaf.delay}s infinite`,
              filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.35))',
            }}
          >
            <path
              d="M12 2C6 6 4 12 6 18c2 3 6 4 6 4s4-1 6-4c2-6 0-12-6-16z"
              fill={leaf.color}
            />
            <path
              d="M12 5v15M12 10l-3-2M12 14l3-2M12 17l-3-2"
              stroke="rgba(0,0,0,0.25)"
              strokeWidth="0.8"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </span>
      ))}
    </div>
  )
}

export default FallingLeaves
