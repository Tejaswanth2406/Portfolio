import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const BOOT_LINES = [
  "INITIALIZING KERNEL...",
  "LOADING NEURAL MODULES...",
  "MOUNTING SECURITY LAYER...",
  "AUTHENTICATING IDENTITY...",
  "ESTABLISHING CONNECTION...",
  "ACCESS GRANTED.",
]

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [lineIndex, setLineIndex] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const totalDuration = 2800
    const steps = 80
    const stepTime = totalDuration / steps
    let step = 0

    const interval = setInterval(() => {
      step++
      const p = Math.min(100, Math.round((step / steps) * 100))
      setProgress(p)
      setLineIndex(Math.min(BOOT_LINES.length - 1, Math.floor((p / 100) * BOOT_LINES.length)))

      if (step >= steps) {
        clearInterval(interval)
        setTimeout(() => setDone(true), 400)
        setTimeout(() => onComplete?.(), 1100)
      }
    }, stepTime)

    return () => clearInterval(interval)
  }, [onComplete])

  const barBlocks = 20
  const filledBlocks = Math.round((progress / 100) * barBlocks)

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* CRT scanline */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute left-0 right-0 h-px bg-white/5"
              animate={{ y: ["0vh", "100vh"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Subtle noise */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: "150px",
            }}
          />

          <div className="relative z-10 w-full max-w-md px-8 space-y-8">
            {/* Logo / name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-mono text-[10px] tracking-[0.5em] text-white/30 uppercase"
            >
              TEJASWANTH SURISETTY
            </motion.div>

            {/* Boot log */}
            <div className="space-y-1 min-h-[120px]">
              {BOOT_LINES.slice(0, lineIndex + 1).map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: i === lineIndex ? 1 : 0.25, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-mono text-xs text-white/80"
                >
                  <span className="text-white/30 mr-2">&gt;</span>
                  {line}
                  {i === lineIndex && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                      className="inline-block ml-1 w-2 h-3 bg-white/60 align-middle"
                    />
                  )}
                </motion.p>
              ))}
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="space-mono text-[10px] text-white/20 tracking-widest">
                  {Array.from({ length: barBlocks }, (_, i) => (
                    <span key={i} className={i < filledBlocks ? "text-white/70" : "text-white/10"}>
                      █
                    </span>
                  ))}
                </span>
                <span className="space-mono text-[10px] text-white/30 tabular-nums">
                  {progress}%
                </span>
              </div>
              <div className="h-px bg-white/5 w-full">
                <motion.div
                  className="h-px bg-white/40"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.05 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
