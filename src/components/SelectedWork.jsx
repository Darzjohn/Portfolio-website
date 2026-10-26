import { useState } from 'react'
import bgTree from '../assets/bg-tree.jpg'
 
// Replace these placeholders with your real projects.
// category: 'Web' | 'Video' | 'Design'
// image: imported image file (optional)   video: link to an .mp4 file (optional)
const projects = [
  {
    title: 'Project Title One',
    category: 'Web',
    description: 'Short description of the project and your role.',
    image: '',
    video: '',
    link: '#',
  },
  {
    title: 'Project Title Two',
    category: 'Video',
    description: 'Short description of the AI product short video.',
    image: '',
    video: '',
    link: '#',
  },
  {
    title: 'Project Title Three',
    category: 'Design',
    description: 'Short description of the graphic design project.',
    image: '',
    video: '',
    link: '#',
  },
]
 
const filters = ['All', 'Web', 'Video', 'Design']
 
const placeholderIcons = { Web: '</>', Video: '🎬', Design: '🎨' }
 
function SelectedWork() {
  const [active, setActive] = useState('All')
 
  const visible =
    active === 'All'
      ? projects
      : projects.filter((project) => project.category === active)
 
  return (
    <section
      id="work"
      className="relative isolate overflow-hidden bg-emerald-950 flex min-h-svh flex-col justify-center px-6 pb-16 pt-28"
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
        <p className="mt-4 max-w-2xl text-base text-emerald-50/75 sm:text-lg">
          Project cards with screenshots, descriptions, and links.
        </p>
 
        {/* Filter tabs */}
        <div className="mt-8 flex flex-wrap gap-3">
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
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-xl shadow-black/20 backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:border-emerald-300/40 hover:bg-white/15"
            >
              {/* Media area */}
              <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-emerald-800/60 via-green-900/60 to-amber-900/40">
                {project.video ? (
                  <video
                    src={project.video}
                    controls
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-4xl text-lime-300/80">
                    {placeholderIcons[project.category]}
                  </div>
                )}
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-emerald-950/60 px-3 py-1 text-xs font-medium text-emerald-200 backdrop-blur-sm">
                  {project.category}
                </span>
              </div>
 
              {/* Details */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white">
                  {project.title}
                </h3>
                <p className="mt-2 text-emerald-50/70">{project.description}</p>
                <a
                  href={project.link}
                  className="mt-5 inline-block text-sm font-semibold text-lime-300 transition hover:text-lime-200"
                >
                  View project{' '}
                  <span className="inline-block transition group-hover:translate-x-1">
                    ↗
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
 
export default SelectedWork