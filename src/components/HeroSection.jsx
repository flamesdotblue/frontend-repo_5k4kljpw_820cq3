import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import PlateImage from './PlateImage'
import ScrollHint from './ScrollHint'

export default function HeroSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Plate lifts off the card as we scroll through the hero
  const plateY = useTransform(scrollYProgress, [0, 1], ['0vh', '-32vh'])
  const plateScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const plateRotateX = useTransform(scrollYProgress, [0, 1], [0, 12])
  const cardOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.4, 0])
  const cardY = useTransform(scrollYProgress, [0, 1], ['0vh', '10vh'])

  return (
    <section ref={sectionRef} className="relative h-[180vh] bg-gradient-to-b from-slate-50 to-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_40%_at_50%_0%,rgba(59,130,246,0.08),transparent)]" />
        {/* Centered content */}
        <div className="relative h-full flex items-center justify-center px-6">
          {/* Card container */}
          <motion.div
            style={{ opacity: cardOpacity, y: cardY }}
            className="relative w-full max-w-5xl aspect-[16/8] rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200 flex items-center justify-center"
            aria-label="Display card"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 to-slate-50/30" />
            <div className="absolute -inset-px rounded-3xl bg-[radial-gradient(100%_60%_at_50%_0%,rgba(2,6,23,0.06),transparent)]" />
          </motion.div>

          {/* Floating plate */}
          <motion.div
            style={{ y: plateY, scale: plateScale, rotateX: plateRotateX, transformPerspective: 1000 }}
            className="absolute w-[min(90vw,980px)]"
            aria-label="License plate"
          >
            <PlateImage
              alt="Plate Create license plate"
              className="w-full h-auto select-none will-change-transform drop-shadow-2xl rounded-2xl ring-1 ring-slate-200 bg-white"
            />
          </motion.div>

          <ScrollHint />
        </div>

        {/* Headline */}
        <div className="absolute top-20 w-full text-center">
          <motion.h1
            className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Plate Create
          </motion.h1>
          <motion.p
            className="mt-3 text-slate-600 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            A tactile, scroll-driven showcase — the plate lifts off and glides into a 3D reveal.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
