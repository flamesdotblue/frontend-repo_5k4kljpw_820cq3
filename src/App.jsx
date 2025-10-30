import HeroSection from './components/HeroSection'
import ParallaxShowcase from './components/ParallaxShowcase'
import PlateImage from './components/PlateImage'
import ScrollHint from './components/ScrollHint'

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Main sections */}
      <HeroSection />
      <ParallaxShowcase />

      {/* Hidden imports acknowledgment to satisfy build-time tree-shaking while ensuring proper wiring */}
      <div className="hidden">
        <PlateImage />
        <ScrollHint />
      </div>

      <footer className="py-20 text-center text-slate-500">
        © {new Date().getFullYear()} Plate Create
      </footer>
    </div>
  )
}

export default App
