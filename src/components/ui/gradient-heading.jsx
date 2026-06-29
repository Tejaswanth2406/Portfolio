import { cn } from "../../lib/utils"

const gradientVariants = {
  default: "from-white via-white/80 to-white/50",
  light: "from-white via-white/90 to-white/70",
  pink: "from-white via-pink-200/80 to-pink-400/60",
  blue: "from-white via-blue-200/80 to-blue-400/60",
  muted: "from-white/70 via-white/50 to-white/30",
}

const sizeVariants = {
  xs: "text-2xl md:text-3xl",
  sm: "text-3xl md:text-4xl",
  md: "text-4xl md:text-5xl",
  lg: "text-5xl md:text-6xl",
  xl: "text-6xl md:text-7xl",
  xxl: "text-7xl md:text-8xl",
  xxxl: "text-8xl md:text-9xl",
}

const weightVariants = {
  thin: "font-light",
  base: "font-normal",
  semi: "font-semibold",
  bold: "font-bold",
  black: "font-black",
}

export function GradientHeading({
  children,
  variant = "default",
  size = "xl",
  weight = "bold",
  className,
  as: Tag = "h2",
  ...props
}) {
  return (
    <Tag
      className={cn(
        "bg-gradient-to-b bg-clip-text text-transparent tracking-tight leading-none",
        gradientVariants[variant] || gradientVariants.default,
        sizeVariants[size] || sizeVariants.xl,
        weightVariants[weight] || weightVariants.bold,
        "playfair italic",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

export default GradientHeading
