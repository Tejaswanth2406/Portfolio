import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { cn } from "../../lib/utils"

const animations = {
  rollIn: {
    hidden: { opacity: 0, y: 40, rotate: -5 },
    visible: { opacity: 1, y: 0, rotate: 0 },
  },
  whipIn: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  popIn: {
    hidden: { opacity: 0, scale: 0.6 },
    visible: { opacity: 1, scale: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  shiftInUp: {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  letterStagger: {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
  },
}

export function TextAnimate({
  text = "",
  type = "fadeInUp",
  className,
  stagger = 0.06,
  duration = 0.6,
  once = true,
  by = "word",
  children,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-50px 0px" })
  const controls = useAnimation()
  const content = text || (typeof children === "string" ? children : "")
  const segments = by === "word" ? content.split(" ") : content.split("")
  const anim = animations[type] || animations.fadeInUp

  useEffect(() => {
    if (isInView) controls.start("visible")
    else if (!once) controls.start("hidden")
  }, [isInView, controls, once])

  return (
    <motion.span
      ref={ref}
      initial="hidden"
      animate={controls}
      className={cn("inline-flex flex-wrap gap-x-[0.25em]", className)}
      aria-label={content}
    >
      {segments.map((seg, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={{
            hidden: anim.hidden,
            visible: anim.visible?.call
              ? anim.visible
              : {
                  ...anim.visible,
                  transition: {
                    delay: i * stagger,
                    duration,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
          }}
          className="inline-block"
        >
          {seg}
          {by === "word" && "\u00A0"}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default TextAnimate
