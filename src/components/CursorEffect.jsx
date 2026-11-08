import { useEffect, useRef } from 'react'

const COLORS = ['#bef264', '#6ee7b7', '#34d399', '#4ade80', '#fbbf24', '#f9a8d4']

const petalSvg = (color) =>
  `<svg viewBox="0 0 24 24" width="100%" height="100%" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,.35))">
     <path d="M12 2C6 6 4 12 6 18c2 3 6 4 6 4s4-1 6-4c2-6 0-12-6-16z" fill="${color}"/>
     <path d="M12 5v15" stroke="rgba(0,0,0,.2)" stroke-width=".8" stroke-linecap="round"/>
   </svg>`

function CursorEffect() {
  const layerRef = useRef(null)
  const flowerRef = useRef(null)
  const flowerInnerRef = useRef(null)

  useEffect(() => {
    // Only for mouse users who haven't asked for reduced motion.
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    const layer = layerRef.current
    const flower = flowerRef.current
    const inner = flowerInnerRef.current

    let mx = -100, my = -100 // mouse
    let fx = -100, fy = -100 // flower (lags behind)
    let lastSpawn = 0
    let lastX = 0, lastY = 0
    let frame

    const spawn = (x, y, burst = false) => {
      const el = document.createElement('span')
      const size = 10 + Math.random() * 12
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      el.innerHTML = petalSvg(color)
      el.style.cssText = `position:absolute;left:0;top:0;width:${size}px;height:${size}px;will-change:transform,opacity;`

      const dx = (Math.random() - 0.5) * (burst ? 180 : 60)
      const dy = burst ? (Math.random() - 0.5) * 180 : 30 + Math.random() * 50
      const rot = (Math.random() - 0.5) * 540

      el.animate(
        [
          { transform: `translate(${x}px, ${y}px) rotate(0deg) scale(0.4)`, opacity: 0.95 },
          {
            transform: `translate(${x + dx}px, ${y + dy}px) rotate(${rot}deg) scale(1)`,
            opacity: 0,
          },
        ],
        {
          duration: burst ? 900 : 1100 + Math.random() * 500,
          easing: 'cubic-bezier(.2,.7,.3,1)',
          fill: 'forwards',
        }
      ).onfinish = () => el.remove()

      layer.appendChild(el)
    }

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY

      // Drop a petal every ~70ms, only if the mouse actually moved.
      const now = performance.now()
      const dist = Math.hypot(mx - lastX, my - lastY)
      if (now - lastSpawn > 70 && dist > 18) {
        spawn(mx, my)
        lastSpawn = now
        lastX = mx
        lastY = my
      }
    }

    const onDown = () => {
      for (let i = 0; i < 10; i++) spawn(mx, my, true)
      inner.style.transform = 'scale(0.7)'
    }
    const onUp = () => {
      inner.style.transform = ''
    }

    const onOver = (e) => {
      const interactive = e.target.closest?.(
        'a, button, input, textarea, label, [role="button"]'
      )
      flower.dataset.active = interactive ? 'true' : 'false'
    }

    const loop = () => {
      fx += (mx - fx) * 0.18
      fy += (my - fy) * 0.18
      flower.style.transform = `translate(${fx}px, ${fy}px)`
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('mouseover', onOver)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[300] overflow-hidden"
    >
      {/* Flower that follows the cursor */}
      <div
        ref={flowerRef}
        className="group absolute left-0 top-0 -ml-4 -mt-4 h-8 w-8 data-[active=true]:[&>div]:scale-[1.8]"
        style={{ transform: 'translate(-100px, -100px)' }}
      >
        <div
          ref={flowerInnerRef}
          className="h-full w-full transition-transform duration-300"
        >
          <svg
            viewBox="0 0 32 32"
            className="h-full w-full animate-[spin_8s_linear_infinite] drop-shadow-[0_0_6px_rgba(190,242,100,0.7)]"
          >
            {[0, 72, 144, 216, 288].map((deg) => (
              <ellipse
                key={deg}
                cx="16"
                cy="8"
                rx="4"
                ry="7"
                fill="#bef264"
                fillOpacity="0.85"
                stroke="#34d399"
                strokeWidth="0.8"
                transform={`rotate(${deg} 16 16)`}
              />
            ))}
            <circle cx="16" cy="16" r="3.6" fill="#fbbf24" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default CursorEffect