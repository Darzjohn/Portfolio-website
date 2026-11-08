import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import resume from '../assets/Aligato_Resume.pdf'
 
const EMAIL = 'dorisjohnaligato@gmail.com'
 
// Web3Forms access key: messages are forwarded to dorisjohnaligato@gmail.com.
const ACCESS_KEY = '1358555f-672e-40a2-98a3-66bde3c63803'
 
// Opens a new Gmail message in the browser with the receiver already filled in.
const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(
  'Project Inquiry'
)}`
 
// The Resume link uses the PDF in src/assets/Aligato_Resume.pdf.
// Add your profile name to the end of the LinkedIn link.
const socialLinks = [
  {
    icon: '📄',
    label: 'Resume',
    href: resume,
    download: 'Aligato_Resume.pdf',
  },
  { icon: '💼', label: 'LinkedIn', href: 'https://www.linkedin.com/in/' },
  { icon: '💻', label: 'GitHub', href: 'https://github.com/Darzjohn' },
]
 
const fieldClass =
  'mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-emerald-100/40 outline-none backdrop-blur-sm transition focus:border-emerald-300/60 focus:bg-white/15 focus:ring-2 focus:ring-emerald-400/30'
 
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
 
  // idle | sending | success | error
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [showModal, setShowModal] = useState(false)
 
  // Let visitors close the pop-up with the Escape key.
  useEffect(() => {
    if (!showModal) return
    const onKey = (e) => e.key === 'Escape' && setShowModal(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showModal])
 
  const handleSubmit = async (e) => {
    e.preventDefault()
 
    // Hidden spam trap: real visitors never fill it in.
    if (e.target.elements._honey.value) return
 
    setStatus('sending')
    setErrorMsg('')
    try {
      // Web3Forms forwards the message to your Gmail.
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: form.name,
          email: form.email, // used as the reply-to address
          message: form.message,
          subject: `New portfolio message from ${form.name}`,
          from_name: 'Portfolio Website',
        }),
      })
      const data = await res.json()
 
      if (!res.ok || !data.success) {
        console.error('Contact form failed:', res.status, data)
        setErrorMsg(data?.message || '')
        setStatus('error')
        return
      }
 
      setStatus('success')
      setShowModal(true)
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('Contact form error:', err)
      setErrorMsg('')
      setStatus('error')
    }
  }
 
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-950 via-green-950 to-stone-900 flex min-h-svh flex-col justify-center px-6 pb-16 pt-28"
    >
      {/* Decorative background blobs */}
      <div
        aria-hidden="true"
        className="animate-float absolute -left-20 top-10 -z-10 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-float absolute -bottom-24 right-0 -z-10 h-96 w-96 rounded-full bg-lime-400/15 blur-3xl [animation-delay:3s]"
      />
      <div
        aria-hidden="true"
        className="animate-float absolute right-1/3 top-1/2 -z-10 h-64 w-64 rounded-full bg-amber-700/20 blur-3xl [animation-delay:5s]"
      />
 
      <div className="mx-auto w-full max-w-6xl">
        {/* Section heading */}
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Let's Work{' '}
          <span className="bg-gradient-to-r from-lime-300 via-emerald-300 to-green-400 bg-clip-text text-transparent">
            Together
          </span>
        </h2>
        <p className="mt-4 max-w-2xl text-base text-emerald-50/75 sm:text-lg">
          Contact form, email, resume, and social links.
        </p>
 
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Form panel */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-8 lg:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium text-emerald-100">
                Name
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className={fieldClass}
                />
              </label>
 
              <label className="block text-sm font-medium text-emerald-100">
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className={fieldClass}
                />
              </label>
            </div>
 
            <label className="mt-5 block text-sm font-medium text-emerald-100">
              Message
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                rows={6}
                required
                className={`${fieldClass} resize-none`}
              />
            </label>
 
            {/* Hidden spam trap */}
            <input
              type="text"
              name="_honey"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
 
            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-6 w-full rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-emerald-950 shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
            >
              {status === 'sending' ? 'Sending…' : 'Send Message ↗'}
            </button>
 
            {/* Result message */}
            <div aria-live="polite">
              {status === 'error' && (
                <p className="mt-4 rounded-xl border border-amber-300/40 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
                  ⚠️ Sorry, your message could not be sent.{' '}
                  {errorMsg
                    ? errorMsg
                    : 'Please check your connection and try again.'}
                </p>
              )}
            </div>
          </form>
 
          {/* Contact links panel */}
          <div className="flex flex-col rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-8">
            <h3 className="text-xl font-semibold text-white">Find me here</h3>
            <p className="mt-1 text-sm text-emerald-50/70">
              Prefer email? One click opens Gmail with my address ready.
            </p>
 
            {/* Featured email card: opens a Gmail compose window */}
            <a
              href={gmailLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 block rounded-2xl border border-emerald-300/30 bg-gradient-to-br from-emerald-400/20 via-emerald-300/10 to-lime-300/10 p-5 shadow-lg shadow-emerald-900/30 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-lime-300/60 hover:from-emerald-400/30"
            >
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/30 bg-emerald-300/15 text-3xl"
                >
                  ✉️
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-medium uppercase tracking-widest text-lime-200/80">
                    Email me
                  </span>
                  <span className="block truncate text-base font-semibold text-white sm:text-lg">
                    {EMAIL}
                  </span>
                </span>
              </div>
 
              <span className="mt-4 flex items-center justify-between rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-emerald-950 transition group-hover:bg-emerald-400">
                Compose in Gmail
                <span className="transition group-hover:translate-x-1">↗</span>
              </span>
            </a>
 
            {/* Resume and social links */}
            <ul className="mt-5 grid grid-cols-3 gap-3">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    download={item.download}
                    target={
                      item.href.startsWith('http') || item.download
                        ? '_blank'
                        : undefined
                    }
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-2 py-4 text-center backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-white/20"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-300/30 bg-emerald-300/10 text-2xl"
                    >
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium text-white">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
 
      {/* Success pop-up (rendered on top of the whole page) */}
      {showModal &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-title"
            onClick={() => setShowModal(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-6 backdrop-blur-sm"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="animate-fade-up w-full max-w-md rounded-3xl border border-white/20 bg-emerald-950/85 p-8 text-center shadow-2xl shadow-black/50 backdrop-blur-sm"
            >
              <span
                aria-hidden="true"
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-lime-300/40 bg-lime-300/15 text-3xl font-bold text-lime-300"
              >
                ✓
              </span>
              <h3
                id="inquiry-title"
                className="mt-5 text-2xl font-bold text-white"
              >
                Inquiry Sent Successfully!
              </h3>
              <p className="mt-3 text-emerald-50/80">
                Thank you! Your inquiry has been sent. We will message you
                right away about your inquiries.
              </p>
              <button
                type="button"
                autoFocus
                onClick={() => setShowModal(false)}
                className="mt-6 w-full rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-emerald-950 shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-400"
              >
                Close
              </button>
            </div>
          </div>,
          document.body
        )}
    </section>
  )
}
 
export default Contact