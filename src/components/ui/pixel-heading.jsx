import { useEffect, useRef, useState } from "react"
import { cn } from "../../lib/utils"

const FONTS = ["serif", "mono", "sans-serif", "monospace", "cursive"]

export function PixelHeading({
  children,
  mode = "wave",
  autoPlay = true,
  className,
  as: Tag = "h2",
  cycleInterval = 200,
  staggerDelay = 80,
  ...props
}) {
  const text = typeof children === "string" ? children : ""
  const chars = text.split("")
  const [fontIndices, setFontIndices] = useState(chars.map(() => 0))
  const [active, setActive] = useState(autoPlay)
  const rafRef = useRef(null)
  const tickRef = useRef(0)

  useEffect(() => {
    if (!active) return
    let frame = 0
    const animate = () => {
      frame++
      if (frame % Math.max(1, Math.round(cycleInterval / 16)) === 0) {
        tickRef.current++
        setFontIndices(prev =>
          prev.map((_, i) => {
            const offset = mode === "wave" ? i : mode === "random" ? Math.floor(Math.random() * FONTS.length) : 0
            return (tickRef.current + offset) % FONTS.length
          })
        )
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, mode, cycleInterval])

  return (
    <Tag
      className={cn("tracking-tight", className)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => !autoPlay && setActive(false)}
      {...props}
    >
      {chars.map((char, i) =>
        char === " " ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <span
            key={i}
            style={{
              fontFamily: FONTS[fontIndices[i]],
              display: "inline-block",
              transition: `font-family ${staggerDelay}ms`,
            }}
          >
            {char}
          </span>
        )
      )}
    </Tag>
  )
}

export default PixelHeading
