import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import PlateImage from './PlateImage'

export default function ParallaxShowcase() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // Background and foreground parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10vh', '10vh'])
  const midY = useTransform(scrollYProgress, [0, 1], ['-4vh', '6vh'])
  const fgY = useTransform(scrollYProgress, [0, 1], ['0vh', '12vh'])

  // Plate 3D rotation across the section
  const rotateY = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0, -20, 15, -35])
  const rotateX = useTransform(scrollYProgress, [0, 1], [6, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.02])
  const plateY = useTransform(scrollYProgress, [0, 1], ['-10vh', '0vh'])
  const opacityIn = useTransform(scrollYProgress, [0, 0.12, 0.2], [0, 0.6, 1])

  return (
    <section ref={ref} className="relative min-h-[180vh] bg-white">
      {/* Layers */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(70%_50%_at_50%_0%,rgba(14,165,233,0.10),transparent)]"
      />
      <motion.div
        style={{ y: midY }}
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(50%_30%_at_20%_20%,rgba(99,102,241,0.08),transparent)]"
      />

      <div className="relative container mx-auto px-6 pt-24 pb-40">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-slate-900">
            3D Parallax Showcase
          </h2>
          <p className="mt-3 text-slate-600">
            Continue scrolling to view the plate from multiple angles with smooth perspective and depth.
          </p>
        </div>

        {/* Plate display */}
        <motion.div
          style={{ y: plateY, opacity: opacityIn }}
          className="relative mt-16 flex items-center justify-center"
        >
          <motion.div
            style={{ rotateY, rotateX, scale, transformStyle: 'preserve-3d', transformPerspective: 1200 }}
            className="w-[min(92vw,1000px)] drop-shadow-2xl"
            aria-label="3D plate rotation"
          >
            <PlateImage
              alt="Rotating license plate"
              className="w-full h-auto select-none rounded-2xl ring-1 ring-slate-200 bg-white"
            />
          </motion.div>
        </motion.div>

        {/* Foreground accents */}
        <motion.div style={{ y: fgY }} className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Responsive by design',
              text: 'Works beautifully on mobile and desktop with hardware-accelerated transforms.',
            },
            {
              title: 'Scroll-linked motion',
              text: 'Animations are driven by your scroll position for precise control.',
            },
            {
              title: 'Depth and realism',
              text: 'Subtle parallax and perspective cues make the plate feel tangible.',
            },
          ].map((f, i) => (
            <div key={i} className="p-5 rounded-2xl ring-1 ring-slate-200 bg-white/70 backdrop-blur">
              <h3 className="font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-slate-600 text-sm">{f.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
