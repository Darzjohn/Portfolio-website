import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import SelectedWork from './components/SelectedWork'
import ServicesSkills from './components/ServicesSkills'
import Contact from './components/Contact'
import Footer from './components/Footer'
 
function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <SelectedWork />
        <ServicesSkills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
 
export default App
 