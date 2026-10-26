import bgTree from '../assets/bg-tree.jpg'
 
const highlights = [
  {
    icon: '</>',
    title: 'Web Development',
    text: 'Websites & digital projects',
  },
  {
    icon: '🌿',
    title: 'Virtual Assistance',
    text: 'Organization & admin support',
  },
  {
    icon: '🎬',
    title: 'AI Video Creation',
    text: 'AI-made product short videos',
  },
  {
    icon: '🎨',
    title: 'AI Graphic Design',
    text: 'AI-assisted visuals & branding',
  },
]
 
function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-emerald-950 px-6 pb-16 pt-28"
    >
      {/* Background photo: fixed, so every section shows one seamless image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center lg:bg-fixed"
        style={{ backgroundImage: `url(${bgTree})` }}
      />
 
      {/* Dark green overlay keeps the text readable over the photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[15] bg-emerald-950/65"
      />
 
      {/* Decorative background blobs: forest, moss and earth tones */}
      <div
        aria-hidden="true"
        className="animate-float absolute -left-24 -top-24 -z-10 h-96 w-96 rounded-full bg-emerald-500/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-float absolute -bottom-32 right-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-lime-400/20 blur-3xl [animation-delay:2s]"
      />
      <div
        aria-hidden="true"
        className="animate-float absolute left-1/2 top-1/3 -z-10 h-72 w-72 rounded-full bg-amber-700/30 blur-3xl [animation-delay:4s]"
      />
 
      {/* Main glass panel */}
      <div className="animate-fade-up w-full max-w-6xl rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-8 lg:p-10">
        <p className="mb-4 inline-block rounded-2xl border border-emerald-300/30 bg-emerald-300/10 px-4 py-1.5 text-[0.65rem] font-medium uppercase leading-relaxed tracking-wider text-emerald-200 sm:rounded-full sm:text-xs sm:tracking-widest">
          Web Developer · Virtual Assistant · AI Video Creator · AI Graphic Designer
        </p>
 
        <h1 className="text-3xl font-bold leading-tight text-white min-[400px]:text-4xl sm:text-5xl">
          Creative solutions.
          <br />
          <span className="bg-gradient-to-r from-lime-300 via-emerald-300 to-green-400 bg-clip-text text-transparent">
            Reliable support.
          </span>
        </h1>
 
        <p className="mt-5 max-w-2xl text-base text-emerald-50/80">
          I help businesses build their online presence and stay organized
          through practical digital solutions, from websites to AI-made
          product short videos and graphic designs.
        </p>
 
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#work"
            className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-emerald-950 shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-400"
          >
            View My Work ↗
          </a>
          <a
            href="#contact"
            className="rounded-xl border border-white/30 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/15"
          >
            Contact Me
          </a>
        </div>
 
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-white/20"
            >
              <span
                aria-hidden="true"
                className="mb-3 inline-block text-xl text-lime-300"
              >
                {item.icon}
              </span>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-emerald-50/70">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
 
export default Hero