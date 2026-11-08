import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import bgTree from '../assets/bg-tree.jpg'
// Put the screenshots in src/assets/ with these exact names.
import sumisho from '../assets/sumisho.png'
import sumisho2 from '../assets/sumisho2.png'
import sumisho3 from '../assets/sumisho3.png'
// Design images live in src/assets/Design/
import hanasui from '../assets/Design/hanasui-serum.png'
import icedSeasalt from '../assets/Design/Iced-seasalt.jpg'
 
// category: 'Web' | 'Video' | 'Design'
// images: list of screenshots (2+ images becomes an automatic slideshow)
// youtube: YouTube video ID (the part after /shorts/ or ?v=). Shows a
//          thumbnail with a play button that opens the video in a pop-up.
// featured: true = wide card with the slideshow on the left, details on the right
// Design cards with an image and link '#' open the image full-size when clicked.
const projects = [
  {
    title: 'Sumisho Motor Finance Quote Tool',
    category: 'Web',
    featured: true,
    description:
      'A quotation web app for Sumisho Motor Finance. Staff can search motorcycle models by name, code, SRP or down payment, browse Honda, Suzuki and Yamaha lineups, and copy a payment quote in one tap.',
    tags: ['React', 'Search & Filters', 'Dark mode', 'Login'],
    images: [sumisho, sumisho2, sumisho3], // swaps automatically; add more screenshots here
    video: '',
    url: 'darzjohn.github.io/mxSales_sumisho',
    link: 'https://darzjohn.github.io/mxSales_sumisho/',
  },
  {
    title: 'AI Product Short Video',
    category: 'Video',
    description: 'Sample AI-made product short video.',
    images: [],
    video: '',
    youtube: 'xgWTgvedHb4',
    link: 'https://youtube.com/shorts/xgWTgvedHb4',
  },
  {
    title: 'AI Product Short Video 2',
    category: 'Video',
    description: 'Sample AI-made product short video.',
    images: [],
    video: '',
    youtube: 'JS4PF-SGK4Y',
    link: 'https://youtube.com/shorts/JS4PF-SGK4Y',
  },
  {
    title: 'Hitchi Dubai Perfume',
    category: 'Video',
    description: 'AI-made product short video for Hitchi Dubai perfume.',
    images: [],
    video: '',
    youtube: 'WA1_FBqMV6I',
    link: 'https://youtu.be/WA1_FBqMV6I',
  },
  {
    title: 'AI Product Short Video 3',
    category: 'Video',
    description: 'Sample AI-made product short video.',
    images: [],
    video: '',
    youtube: 'rppLT3HHgzk',
    link: 'https://youtube.com/shorts/rppLT3HHgzk',
  },
  {
    title: 'Hanasui Vitamin C Glow Serum',
    category: 'Design',
    description: 'AI-assisted product graphic for Hanasui Vitamin C Glow Serum.',
    images: [hanasui],
    video: '',
    link: '#',
  },
  {
    title: 'Iced Sea Salt',
    category: 'Design',
    description: 'AI-assisted product graphic for Iced Sea Salt.',
    images: [icedSeasalt],
    video: '',
    link: '#',
  },
]
 
const filters = ['All', 'Web', 'Video', 'Design']
 
const placeholderIcons = { Web: '</>', Video: '🎬', Design: '🎨' }
 
// Image slideshow: auto-plays, pauses on hover, has arrows + dots,
// and clicking a slide opens it full-size.
function Slideshow({ images, title, url, showFrame, onOpen }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const many = images.length > 1
 
  useEffect(() => {
    if (!many || paused) return
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      4500
    )
    return () => clearInterval(timer)
  }, [many, paused, images.length])
 
  const go = (step) => (e) => {
    e.stopPropagation()
    setIndex((i) => (i + step + images.length) % images.length)
  }
 
  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="overflow-hidden rounded-2xl border border-white/20 bg-emerald-950/70 shadow-2xl shadow-black/40"
    >
      {/* Browser window bar */}
      {showFrame && (
        <div className="flex items-center gap-3 border-b border-white/10 bg-white/10 px-3 py-1.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-lime-300/80" />
          </span>
          <span className="min-w-0 flex-1 truncate rounded-full bg-black/25 px-3 py-1 text-center text-xs text-emerald-100/70">
            {url || title}
          </span>
        </div>
      )}
 
      {/* Slides */}
      <div className="group/slide relative aspect-[16/9] bg-emerald-900/40">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => onOpen(src)}
            aria-label={`Enlarge screenshot ${i + 1} of ${title}`}
            aria-hidden={i !== index}
            tabIndex={i === index ? 0 : -1}
            className={`absolute inset-0 cursor-zoom-in transition-opacity duration-700 ${
              i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <img
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              className="h-full w-full object-cover object-top"
            />
          </button>
        ))}
 
        {/* Hover hint */}
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-emerald-950/70 px-3 py-1 text-xs text-emerald-100 opacity-0 backdrop-blur-sm transition group-hover/slide:opacity-100">
          Click to enlarge
        </span>
 
        {many && (
          <>
            <button
              type="button"
              onClick={go(-1)}
              aria-label="Previous screenshot"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-emerald-950/60 text-white backdrop-blur-sm transition hover:bg-emerald-500 hover:text-emerald-950"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={go(1)}
              aria-label="Next screenshot"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-emerald-950/60 text-white backdrop-blur-sm transition hover:bg-emerald-500 hover:text-emerald-950"
            >
              ›
            </button>
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIndex(i)
                  }}
                  aria-label={`Go to screenshot ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === index
                      ? 'w-6 bg-lime-300'
                      : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
 
function SelectedWork() {
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState(null) // image src or null
  const [videoId, setVideoId] = useState(null) // YouTube video ID or null
 
  const visible =
    active === 'All'
      ? projects
      : projects.filter((project) => project.category === active)
 
  // Close the enlarged image or video with Escape.
  useEffect(() => {
    if (!lightbox && !videoId) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setLightbox(null)
        setVideoId(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, videoId])
 
  return (
    <section
      id="work"
      className="relative isolate overflow-hidden bg-emerald-950 flex min-h-svh flex-col justify-center px-6 pb-10 pt-24"
    >
      {/* Background photo: fixed, so every section shows one seamless image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center lg:bg-fixed"
        style={{ backgroundImage: `url(${bgTree})` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[15] bg-emerald-950/65"
      />
 
      {/* Decorative background blobs */}
      <div
        aria-hidden="true"
        className="animate-float absolute -left-24 top-20 -z-10 h-96 w-96 rounded-full bg-lime-400/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-float absolute -bottom-24 right-0 -z-10 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl [animation-delay:3s]"
      />
 
      <div className="mx-auto w-full max-w-6xl">
        {/* Section heading */}
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Selected{' '}
          <span className="bg-gradient-to-r from-lime-300 via-emerald-300 to-green-400 bg-clip-text text-transparent">
            Work
          </span>
        </h2>
        <p className="mt-2 max-w-2xl text-base text-emerald-50/75">
          Project cards with screenshots, descriptions, and links.
        </p>
 
        {/* Filter tabs */}
        <div className="mt-5 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={`rounded-full border px-5 py-2 text-sm font-medium backdrop-blur-sm transition ${
                active === filter
                  ? 'border-emerald-300/60 bg-emerald-500 text-emerald-950 shadow-md shadow-emerald-500/30'
                  : 'border-white/20 bg-white/10 text-emerald-50/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
 
        {/* Project cards */}
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) =>
            project.featured ? (
              /* Featured wide card: slideshow + details side by side */
              <article
                key={project.title}
                className="grid items-center gap-5 rounded-3xl border border-white/20 bg-white/10 p-4 shadow-xl shadow-black/20 backdrop-blur-sm transition duration-300 hover:border-emerald-300/40 hover:bg-white/15 md:col-span-2 lg:col-span-3 lg:grid-cols-[1fr_1fr] lg:gap-8 lg:p-5"
              >
                <Slideshow
                  images={project.images}
                  title={project.title}
                  url={project.url}
                  showFrame
                  onOpen={setLightbox}
                />
 
                <div>
                  <span className="inline-block rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-emerald-200">
                    Featured · {project.category}
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-emerald-50/75">
                    {project.description}
                  </p>
 
                  {project.tags && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-100"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
 
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-400"
                  >
                    View Live Project ↗
                  </a>
                </div>
              </article>
            ) : (
              /* Regular card */
              <article
                key={project.title}
                className="group overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-xl shadow-black/20 backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:border-emerald-300/40 hover:bg-white/15"
              >
                {/* Media area */}
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-emerald-800/60 via-green-900/60 to-amber-900/40">
                  {project.youtube ? (
                    /* YouTube video: thumbnail + play button, opens a pop-up player */
                    <button
                      type="button"
                      onClick={() => setVideoId(project.youtube)}
                      aria-label={`Play video: ${project.title}`}
                      className="group/play relative h-full w-full cursor-pointer"
                    >
                      <img
                        src={`https://img.youtube.com/vi/${project.youtube}/hqdefault.jpg`}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 bg-emerald-950/30 transition group-hover/play:bg-emerald-950/10" />
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-emerald-500 pl-1 text-2xl text-emerald-950 shadow-lg shadow-black/40 transition group-hover/play:scale-110 group-hover/play:bg-emerald-400"
                      >
                        ▶
                      </span>
                    </button>
                  ) : project.video ? (
                    <video
                      src={project.video}
                      controls
                      muted
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  ) : project.images.length ? (
                    /* Image: shown in full, click to enlarge */
                    <button
                      type="button"
                      onClick={() => setLightbox(project.images[0])}
                      aria-label={`Enlarge ${project.title}`}
                      className="relative h-full w-full cursor-zoom-in overflow-hidden"
                    >
                      {/* Blurred copy of the image fills the card, like the video cards */}
                      <img
                        src={project.images[0]}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full scale-125 object-cover blur-xl"
                      />
                      <span className="absolute inset-0 bg-emerald-950/30" />
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="relative h-full w-full object-contain transition duration-500 group-hover:scale-105"
                      />
                    </button>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl text-lime-300/80">
                      {placeholderIcons[project.category]}
                    </div>
                  )}
                  <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/20 bg-emerald-950/60 px-3 py-1 text-xs font-medium text-emerald-200 backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
 
                {/* Details */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-emerald-50/70">
                    {project.description}
                  </p>
 
                  {project.link === '#' && project.images.length ? (
                    /* No external link: open the image full-size instead */
                    <button
                      type="button"
                      onClick={() => setLightbox(project.images[0])}
                      className="mt-5 inline-block text-sm font-semibold text-lime-300 transition hover:text-lime-200"
                    >
                      View design{' '}
                      <span className="inline-block transition group-hover:translate-x-1">
                        ↗
                      </span>
                    </button>
                  ) : (
                    <a
                      href={project.link}
                      target={project.link.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="mt-5 inline-block text-sm font-semibold text-lime-300 transition hover:text-lime-200"
                    >
                      {project.youtube ? 'Watch on YouTube' : 'View project'}{' '}
                      <span className="inline-block transition group-hover:translate-x-1">
                        ↗
                      </span>
                    </a>
                  )}
                </div>
              </article>
            )
          )}
        </div>
      </div>
 
      {/* Enlarged screenshot (rendered on top of the whole page) */}
      {lightbox &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged screenshot"
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-10"
          >
            <img
              src={lightbox}
              alt="Enlarged project screenshot"
              className="animate-fade-up max-h-full max-w-full rounded-2xl border border-white/20 shadow-2xl shadow-black/60"
            />
            <button
              type="button"
              autoFocus
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl text-white transition hover:bg-emerald-500 hover:text-emerald-950"
            >
              ✕
            </button>
          </div>,
          document.body
        )}
 
      {/* Video pop-up: vertical player for YouTube Shorts */}
      {videoId &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Project video"
            onClick={() => setVideoId(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-10"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="animate-fade-up aspect-[9/16] h-full max-h-[85vh] overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl shadow-black/60"
            >
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`}
                title="Project video"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <button
              type="button"
              autoFocus
              onClick={() => setVideoId(null)}
              aria-label="Close video"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl text-white transition hover:bg-emerald-500 hover:text-emerald-950"
            >
              ✕
            </button>
          </div>,
          document.body
        )}
    </section>
  )
}
 
export default SelectedWork