import { useEffect, useRef } from 'react'
 
const COLORS = ['#bef264', '#6ee7b7', '#34d399', '#4ade80', '#fbbf24', '#f9a8d4']
 
// Never keep more than this many petals on screen at once (keeps it smooth).
const MAX_PETALS = 28
 
// No CSS filters here on purpose: filters are expensive to repaint
// and were a main cause of the cursor stutter.
const petalSvg = (color) =>
  `<svg viewBox="0 0 24 24" width="100%" height="100%">
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
 
    // Hide the normal (white arrow / hand) cursor everywhere,
    // so the flower is the only cursor.
    const hideCursor = document.createElement('style')
    hideCursor.textContent = 'html, html * { cursor: none !important; }'
    document.head.appendChild(hideCursor)
 
    const layer = layerRef.current
    const flower = flowerRef.current
    const inner = flowerInnerRef.current
 
    let mx = -100, my = -100 // mouse position
    let lastSpawn = 0
    let lastX = 0, lastY = 0
    let petals = 0
 
    const spawn = (x, y, burst = false) => {
      if (petals >= MAX_PETALS) return
      petals++
 
      const el = document.createElement('span')
      const size = 10 + Math.random() * 12
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      el.innerHTML = petalSvg(color)
      el.style.cssText = `position:absolute;left:0;top:0;width:${size}px;height:${size}px;will-change:transform,opacity;`
 
      const dx = (Math.random() - 0.5) * (burst ? 180 : 60)
      const dy = burst ? (Math.random() - 0.5) * 180 : 30 + Math.random() * 50
      const rot = (Math.random() - 0.5) * 540
 
      const anim = el.animate(
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
      )
      anim.onfinish = () => {
        petals--
        el.remove()
      }
 
      layer.appendChild(el)
    }
 
    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
 
      // The flower sits exactly on the pointer: moved instantly on every
      // mouse event (no easing, no waiting for the next frame), so there
      // is no lag. Only transform is changed, which is very cheap.
      flower.style.transform = `translate3d(${mx}px, ${my}px, 0)`
 
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
      for (let i = 0; i < 8; i++) spawn(mx, my, true)
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
 
    // Hide the flower when the mouse leaves the window, show it again on return.
    const onLeave = () => {
      flower.style.opacity = '0'
    }
    const onEnter = () => {
      flower.style.opacity = '1'
    }
 
    const opts = { passive: true }
    window.addEventListener('mousemove', onMove, opts)
    window.addEventListener('mousedown', onDown, opts)
    window.addEventListener('mouseup', onUp, opts)
    window.addEventListener('mouseover', onOver, opts)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
 
    return () => {
      hideCursor.remove()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [])
 
  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[300] overflow-hidden"
    >
      {/* Flower cursor: sits exactly on the pointer */}
      <div
        ref={flowerRef}
        className="absolute left-0 top-0 -ml-4 -mt-4 h-8 w-8 transition-opacity duration-200 will-change-transform data-[active=true]:[&>div]:scale-[1.8]"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div
          ref={flowerInnerRef}
          className="relative h-full w-full transition-transform duration-300"
        >
          {/* Static glow (does not rotate, so it is cheap to draw) */}
          <span
            aria-hidden="true"
            className="absolute -inset-2 rounded-full bg-[radial-gradient(circle,rgba(190,242,100,0.45),transparent_70%)]"
          />
          <svg
            viewBox="0 0 32 32"
            className="relative h-full w-full animate-[spin_8s_linear_infinite] will-change-transform"
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