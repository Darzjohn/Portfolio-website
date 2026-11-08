import bgTree from '../assets/bg-tree.jpg'
 
// Edit these lists to match what you actually offer and know.
const services = [
  {
    icon: '</>',
    title: 'Web Development',
    description: 'Websites & digital projects.',
    items: [
      'Responsive portfolio & business websites',
      'Landing pages & contact forms',
      'Modern, mobile-friendly design',
    ],
  },
  {
    icon: '🧑‍💻',
    title: 'Virtual Assistance',
    description: 'Organization & admin support.',
    items: [
      'Email & calendar management',
      'Data entry & document preparation',
      'Social media support',
    ],
  },
  {
    icon: '🎬',
    title: 'AI Video Creation',
    description: 'AI-made product short videos.',
    items: [
      'AI product short videos',
      'Social media reels & ads',
      'Script, visuals & editing',
    ],
  },
  {
    icon: '🎨',
    title: 'AI Graphic Design',
    description: 'AI-assisted visuals.',
    items: [
      'Social media posts & banners',
      'Logos & branding visuals',
      'Product & promotional graphics',
    ],
  },
]
 
const tools = [
  'VS Code',
  'CapCut',
  'Claude AI',
  'ChatGPT',
  'Google Flow',
  'Pinterest',
  'Canva',
  'Microsoft Office',
  'Google Workspace',
]
 
function ServicesSkills() {
  return (
    <section
      id="services"
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
        className="animate-float absolute -right-20 top-16 -z-10 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-float absolute -left-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-amber-700/20 blur-3xl [animation-delay:3s]"
      />
 
      <div className="mx-auto w-full max-w-6xl">
        {/* Section heading */}
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Services &{' '}
          <span className="bg-gradient-to-r from-lime-300 via-emerald-300 to-green-400 bg-clip-text text-transparent">
            Skills
          </span>
        </h2>
        <p className="mt-4 max-w-2xl text-base text-emerald-50/75 sm:text-lg">
          What I can do for your business, and the tools I use to get it done.
        </p>
 
        {/* Service cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl shadow-black/20 backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:border-emerald-300/40 hover:bg-white/15"
            >
              <span
                aria-hidden="true"
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-300/30 bg-emerald-300/10 text-4xl text-lime-300"
              >
                {service.icon}
              </span>
              <h3 className="text-xl font-semibold text-white">
                {service.title}
              </h3>
              <p className="mt-1 text-sm text-emerald-50/70">
                {service.description}
              </p>
 
              <ul className="mt-5 space-y-2">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-emerald-50/85"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-300"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
 
        {/* Tools */}
        <div className="mt-10 rounded-3xl border border-white/20 bg-white/10 p-5 shadow-xl sm:p-8 shadow-black/20 backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-white">Tools</h3>
          <ul className="mt-5 flex flex-wrap gap-3">
            {tools.map((tool) => (
              <li
                key={tool}
                className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:-translate-y-0.5 hover:bg-emerald-300/20"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
 
export default ServicesSkills