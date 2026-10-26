import profile from '../assets/profile.jpg'
import bgTree from '../assets/bg-tree.jpg'
 
// Replace the placeholder text with your own story.
const details = [
  {
    icon: '🎓',
    title: 'Education',
    text: 'Bachelor of Science in Information Technology (BSIT). Equipped with foundational knowledge in web development, computer systems, and digital technologies.',
  },
  {
    icon: '🌱',
    title: 'Approach',
    text: 'I value clear communication, creativity, organization, and continuous learning. My goal is to understand each clients needs and deliver reliable, high-quality work.',
  },
  {
    icon: '🤝',
    title: 'What I Offer',
    text: 'Web development, virtual assistance, AI video and graphic design.',
  },
]
 
function About() {
  return (
    <section
      id="about"
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
        className="animate-float absolute -right-24 top-10 -z-10 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-float absolute -bottom-24 -left-16 -z-10 h-96 w-96 rounded-full bg-amber-700/20 blur-3xl [animation-delay:3s]"
      />
 
      <div className="mx-auto w-full max-w-6xl">
        {/* Section heading */}
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          About{' '}
          <span className="bg-gradient-to-r from-lime-300 via-emerald-300 to-green-400 bg-clip-text text-transparent">
            Me
          </span>
        </h2>
 
        {/* Main glass panel */}
        <div className="mt-8 grid items-center gap-8 rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl sm:p-8 shadow-black/30 backdrop-blur-sm md:grid-cols-[auto_1fr] md:gap-10 lg:p-10">
          {/* Photo */}
          <div className="mx-auto">
            <div className="rounded-3xl bg-gradient-to-br from-lime-300/60 via-emerald-400/40 to-amber-600/40 p-1">
              <img
                src={profile}
                alt="Portrait"
                className="h-48 w-48 rounded-[1.35rem] object-cover sm:h-56 sm:w-56 lg:h-60 lg:w-60"
              />
            </div>
          </div>
 
          {/* Story */}
          <div>
            <p className="text-lg leading-relaxed text-emerald-50/85">
              Your story, education, and professional approach.
            </p>
            <p className="mt-4 leading-relaxed text-emerald-50/70">
              I am a Bachelor of Science in Information Technology 
              (BSIT) graduate with a passion for technology, creativity, and continuous learning. 
              I enjoy creating modern, user-friendly websites, designing digital content, 
              and helping businesses manage their daily tasks efficiently. With my knowledge of web development,
               Microsoft Office, Google Workspace, Canva, and social media tools, 
               I aim to provide reliable and creative solutions that support my clients' goals. 
               I am committed to improving my skills, delivering quality work, and building positive, 
               long-term professional relationships with every client I work with.
            </p>
 
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-emerald-950 shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-400"
              >
                Let's Talk
              </a>
              <a
                href="#work"
                className="rounded-xl border border-white/30 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                See My Work
              </a>
            </div>
          </div>
        </div>
 
        {/* Detail cards */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {details.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-white/20"
            >
              <span
                aria-hidden="true"
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-300/30 bg-emerald-300/10 text-3xl"
              >
                {item.icon}
              </span>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-emerald-50/70">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
 
export default About