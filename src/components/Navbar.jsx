import { useEffect, useState } from 'react'
import logo from '../assets/logo-Doris.png'
 
const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]
 
function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
 
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-sm transition-all duration-300 ${
          scrolled ? 'shadow-lg shadow-black/30' : 'shadow-2xl shadow-black/20'
        }`}
      >
        {/* Brand */}
        <a
          href="#top"
          className="flex items-center gap-3 text-white"
        >
          <img
            src={logo}
            alt="Doris John Aligato logo"
            className="h-10 w-10 rounded-xl bg-white object-contain p-0.5 shadow-md shadow-black/30 ring-2 ring-lime-300/50"
          />
          <span className="text-base font-bold tracking-wide sm:text-lg">
            Doris John <span className="text-lime-300">Aligato</span>
          </span>
        </a>
 
        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-sm font-medium text-emerald-50/80 transition hover:text-white"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-lime-300 to-emerald-400 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
 
        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden rounded-xl bg-emerald-500 px-5 py-2 text-sm font-semibold text-emerald-950 shadow-md shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-400 md:inline-block"
        >
          Let's Talk
        </a>
 
        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/10 md:hidden"
        >
          <span
            className={`h-0.5 w-5 bg-white transition ${
              open ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-white transition ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-white transition ${
              open ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </nav>
 
      {/* Mobile menu */}
      <div
        className={`mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-white/20 bg-emerald-950/70 backdrop-blur-sm transition-all duration-300 md:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 border-transparent opacity-0'
        }`}
      >
        <ul className="flex flex-col gap-1 p-4">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-emerald-50/90 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-xl bg-emerald-500 px-4 py-3 text-center font-semibold text-emerald-950 transition hover:bg-emerald-400"
            >
              Let's Talk
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
 
export default Navbar