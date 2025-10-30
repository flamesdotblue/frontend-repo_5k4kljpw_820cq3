import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function ScrollHint() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-600">
      <motion.div
        initial={{ y: 0, opacity: 0.8 }}
        animate={{ y: [0, 6, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="flex items-center gap-2"
        aria-hidden
      >
        <ChevronDown className="w-5 h-5" />
        <span className="text-sm">Scroll</span>
      </motion.div>
    </div>
  )
}
