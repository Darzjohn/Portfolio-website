import logo from '../assets/logo-Doris.png'
 
function Footer() {
  return (
    <footer className="border-t border-white/10 bg-emerald-950 px-6 py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-emerald-50/60 sm:flex-row">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Doris John Aligato logo"
            className="h-9 w-9 rounded-lg bg-white object-contain p-0.5"
          />
          <p>
            © {new Date().getFullYear()} Doris John Aligato. All rights
            reserved.
          </p>
        </div>
 
        <a
          href="#top"
          className="text-lime-300 transition hover:text-lime-200"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
 
export default Footer