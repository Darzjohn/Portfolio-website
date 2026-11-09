import bgTree from '../assets/bg-tree.jpg'
import animatedMe from '../assets/Animated-me.gif'
 
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
        {/* Text on the left, animated GIF on the right (stacks on mobile) */}
        <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
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
          </div>
 
          {/* Animated GIF in a glowing glass card with floating chips */}
          <div className="flex justify-center lg:justify-end">
            <div className="group relative mx-3 w-fit">
              {/* Soft floating glow behind the card */}
              <div
                aria-hidden="true"
                className="animate-float absolute -inset-6 -z-10 rounded-full bg-gradient-to-tr from-lime-300/40 via-emerald-400/30 to-amber-500/30 blur-3xl"
              />
              {/* Gradient glow border */}
              <div
                aria-hidden="true"
                className="absolute -inset-0.5 rounded-[1.9rem] bg-gradient-to-tr from-lime-300/70 via-emerald-400/30 to-amber-500/60 opacity-80 blur-[2px] transition duration-500 group-hover:opacity-100"
              />
 
              {/* Glass card: the GIF sits at the bottom and is clipped by the rounded corners */}
              <div className="relative flex items-end justify-center overflow-hidden rounded-[1.75rem] border border-white/30 bg-gradient-to-b from-emerald-300/25 via-emerald-500/15 to-emerald-950/40 px-4 pt-6 shadow-2xl shadow-black/40 backdrop-blur-sm">
                <img
                  src={animatedMe}
                  alt="Animated portrait of Doris John Aligato"
                  className="h-60 w-auto object-contain drop-shadow-2xl transition duration-500 group-hover:scale-105 sm:h-72 lg:h-80"
                />
              </div>
 
              {/* Greeting chip */}
              <span className="absolute -left-3 top-6 rounded-full border border-white/30 bg-emerald-950/70 px-4 py-1.5 text-sm font-semibold text-white shadow-lg shadow-black/30 backdrop-blur-sm sm:-left-6">
                <span aria-hidden="true">👋</span> Hi, I'm{' '}
                <span className="text-lime-300">Doris</span>
              </span>
 
              {/* Availability chip */}
              <span className="absolute -right-3 bottom-8 flex items-center gap-2 rounded-full border border-white/30 bg-emerald-950/70 px-4 py-1.5 text-sm font-semibold text-white shadow-lg shadow-black/30 backdrop-blur-sm sm:-right-6">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime-300" />
                </span>
                Open for projects
              </span>
 
              {/* Sparkle chip */}
              <span
                aria-hidden="true"
                className="absolute -right-2 -top-3 rounded-full border border-white/30 bg-emerald-950/70 px-3 py-1.5 text-lg shadow-lg shadow-black/30 backdrop-blur-sm"
              >
                ✨
              </span>
            </div>
          </div>
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