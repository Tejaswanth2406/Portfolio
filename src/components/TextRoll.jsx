import { motion } from "framer-motion"

function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

const STAGGER = 0.035

export function TextRoll({ children, className, center = false }) {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn("relative block overflow-hidden", className)}
      style={{
        lineHeight: 0.75,
      }}
    >
      <div>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i

          return (
            <motion.span
              key={`initial-${i}`}
              variants={{
                initial: { y: 0 },
                hovered: { y: -30 },
              }}
              transition={{
                duration: 0.4,
                delay,
                ease: "easeInOut",
              }}
              style={{ display: "inline-block" }}
            >
              {l}
            </motion.span>
          )
        })}
      </div>

      <div style={{ position: "absolute", left: 0, top: 0 }}>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i

          return (
            <motion.span
              key={`hovered-${i}`}
              variants={{
                initial: { y: 30 },
                hovered: { y: 0 },
              }}
              transition={{
                duration: 0.4,
                delay,
                ease: "easeInOut",
              }}
              style={{ display: "inline-block" }}
            >
              {l}
            </motion.span>
          )
        })}
      </div>
    </motion.span>
  )
}

export default TextRoll
