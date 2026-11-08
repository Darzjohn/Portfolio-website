import Preloader from './components/Preloader'
import FallingLeaves from './components/FallingLeaves'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import SelectedWork from './components/SelectedWork'
import ServicesSkills from './components/ServicesSkills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CursorEffect from './components/CursorEffect'
 

function App() {
  return (
    <>
      <Preloader />
      <FallingLeaves />
      <Navbar />
      <main>
        <Hero />
        <About />
        <SelectedWork />
        <ServicesSkills />
        <Contact />
      </main>
      <Footer />

        <Preloader />
        <CursorEffect />
        <FallingLeaves />
         <Navbar />


    </>
  )
}
 
export default App
 