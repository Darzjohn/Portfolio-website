import { useEffect, useState } from 'react'
import logo from '../assets/logo-Doris.png'

// Minimum time the loading screen stays visible (milliseconds).
const MIN_TIME = 4000

function Preloader() {
  const [progress, setProgress] = useState(0) // 0 → 1
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    // Stop the page from scrolling while the loader is showing.
    document.body.style.overflow = 'hidden'

    const start = performance.now()
    let pageLoaded = document.readyState === 'complete'
    const onLoad = () => {
      pageLoaded = true
    }
    window.addEventListener('load', onLoad)

    let frame
    const tick = (now) => {
      const time = Math.min((now - start) / MIN_TIME, 1)
      // Wait at 90% until the page (images, fonts) has fully loaded.
      const value = Math.min(time, pageLoaded ? 1 : 0.9)
      setProgress(value)

      if (value >= 1) {
        setLeaving(true)
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('load', onLoad)
      document.body.style.overflow = ''
    }
  }, [])

  // Remove the loader from the page after the fade-out finishes.
  useEffect(() => {
    if (!leaving) return
    const timer = setTimeout(() => {
      document.body.style.overflow = ''
      setGone(true)
    }, 1200)
    return () => clearTimeout(timer)
  }, [leaving])

  if (gone) return null

  return (
    <div
      role="status"
      aria-label="Loading website"
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-950 via-green-950 to-stone-900 transition-all duration-1200 ${
        leaving ? 'pointer-events-none scale-105 opacity-0' : 'opacity-100'
      }`}
    >
      {/* Soft glowing blobs */}
      <div
        aria-hidden="true"
        className="animate-float absolute -left-24 -top-24 h-96 w-96 rounded-full bg-emerald-500/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-float absolute -bottom-32 right-0 h-[28rem] w-[28rem] rounded-full bg-lime-400/15 blur-3xl [animation-delay:2s]"
      />

      {/* Logo with spinning ring */}
      <div className="animate-fade-up relative flex h-32 w-32 items-center justify-center">
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-spin rounded-full border-2 border-white/10 border-t-lime-300 border-r-emerald-400"
        />
        <span
          aria-hidden="true"
          className="absolute inset-3 animate-ping rounded-full bg-emerald-400/10"
        />
        <img
          src={logo}
          alt=""
          className="relative h-20 w-20 rounded-2xl bg-white object-contain p-1 shadow-xl shadow-black/40 ring-2 ring-lime-300/50"
        />
      </div>

      {/* Name */}
      <h1 className="animate-fade-up mt-8 text-2xl font-bold tracking-wide text-white [animation-delay:0.2s] sm:text-3xl">
        Doris John{' '}
        <span className="bg-gradient-to-r from-lime-300 via-emerald-300 to-green-400 bg-clip-text text-transparent">
          Aligato
        </span>
      </h1>
      <p className="animate-fade-up mt-2 text-sm text-emerald-100/70 [animation-delay:0.4s]">
        Web Developer · Virtual Assistant · AI Creator
      </p>

      {/* Progress bar */}
      <div className="animate-fade-up mt-8 w-56 [animation-delay:0.6s] sm:w-72">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-lime-300 via-emerald-400 to-green-400 shadow-[0_0_12px] shadow-emerald-400/60"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
        <p className="mt-3 text-center text-xs font-medium tracking-widest text-emerald-100/60">
          {Math.round(progress * 100)}%
        </p>
      </div>
    </div>
  )
}

export default Preloader
