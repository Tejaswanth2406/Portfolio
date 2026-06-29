import { cn } from "../../lib/utils"

/* SVG logo marks for the skills carousel */
function PythonIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M15.885 2C11.075 2 10.5 4.16 10.5 6v2.5h5.5v1H8.5C6.34 9.5 4 10.6 4 15.5s2.34 6.5 4.5 6.5h2V19c0-2.5 2.16-4.5 4.5-4.5h5.5c2.16 0 4.5-1.84 4.5-4.5V7c0-2.5-1.84-5-5.5-5h-3.615zM13 4.5a1 1 0 110 2 1 1 0 010-2z" fill="currentColor" fillOpacity=".9"/>
      <path d="M22 10.5h-2V13c0 2.5-2.16 4.5-4.5 4.5H10c-2.16 0-4.5 1.84-4.5 4.5v4c0 2.5 1.84 5 5.5 5h3.615C19.425 31 20 28.84 20 27v-2.5h-5.5v-1h7.5c2.16 0 4.5-1.1 4.5-6S24.16 10.5 22 10.5zm-3 14a1 1 0 110 2 1 1 0 010-2z" fill="currentColor" fillOpacity=".7"/>
    </svg>
  )
}

function ReactIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="16" cy="16" r="2.5" fill="currentColor"/>
      <ellipse cx="16" cy="16" rx="13" ry="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <ellipse cx="16" cy="16" rx="13" ry="5" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(60 16 16)"/>
      <ellipse cx="16" cy="16" rx="13" ry="5" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(120 16 16)"/>
    </svg>
  )
}

function DockerIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="3" y="17" width="4" height="4" fill="currentColor"/>
      <rect x="8" y="17" width="4" height="4" fill="currentColor"/>
      <rect x="13" y="17" width="4" height="4" fill="currentColor"/>
      <rect x="18" y="17" width="4" height="4" fill="currentColor"/>
      <rect x="8" y="12" width="4" height="4" fill="currentColor"/>
      <rect x="13" y="12" width="4" height="4" fill="currentColor"/>
      <rect x="18" y="12" width="4" height="4" fill="currentColor"/>
      <rect x="13" y="7" width="4" height="4" fill="currentColor"/>
      <path d="M27 17s-1-2-4-2H4C4 22 7 25 12 25h8c4 0 6-3 7-8z" fill="currentColor" fillOpacity=".6"/>
    </svg>
  )
}

function GCPIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M20 8h-3L16 6l-1 2h-3l2.5 3L13 14h3l1 2 1-2h3l-1.5-3L20 8z" fill="currentColor"/>
      <path d="M9 15a7 7 0 0114 0" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M7 21h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M11 21v3M21 21v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function TypeScriptIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="2" y="2" width="28" height="28" rx="2" fill="currentColor" fillOpacity=".9"/>
      <path d="M8 16h8M12 12v12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 20c0 2 1.5 3 3 3s3-1 3-2.5-1.5-2.5-3-3-3-1.5-3-3 1-2.5 3-2.5 2.5.8 3 2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function RustIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="16" cy="16" r="5" fill="currentColor"/>
      <rect x="9" y="14" width="14" height="4" rx="2" fill="none" stroke="currentColor" strokeWidth="1"/>
    </svg>
  )
}

function FastAPIIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="16" cy="16" r="12" fill="currentColor" fillOpacity=".9"/>
      <path d="M17 8l-7 10h6l-1 6 7-10h-6l1-6z" fill="white"/>
    </svg>
  )
}

function BurpIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M16 4L4 10v12l12 6 12-6V10L16 4z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M16 4v24M4 10l12 6 12-6" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

function VercelIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M16 4L28 26H4L16 4z" fill="currentColor"/>
    </svg>
  )
}

function GitHubIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M16 3C8.268 3 2 9.268 2 17c0 6.197 4.02 11.453 9.595 13.309.7.128.957-.304.957-.675 0-.334-.012-1.218-.019-2.389-3.896.847-4.717-1.878-4.717-1.878-.637-1.616-1.554-2.047-1.554-2.047-1.27-.867.096-.85.096-.85 1.406.099 2.146 1.443 2.146 1.443 1.25 2.142 3.278 1.523 4.076 1.164.126-.906.488-1.523.888-1.873-3.11-.353-6.38-1.555-6.38-6.921 0-1.529.547-2.779 1.443-3.76-.145-.354-.625-1.779.136-3.71 0 0 1.176-.376 3.853 1.437A13.432 13.432 0 0116 8.993c1.19.006 2.388.161 3.507.472 2.675-1.813 3.849-1.437 3.849-1.437.763 1.931.284 3.356.139 3.71.899.981 1.441 2.231 1.441 3.76 0 5.38-3.276 6.565-6.396 6.91.503.433.951 1.288.951 2.596 0 1.875-.017 3.386-.017 3.847 0 .374.253.81.962.673C25.984 28.45 30 23.196 30 17c0-7.732-6.268-14-14-14z" fill="currentColor"/>
    </svg>
  )
}

const allLogos = [
  { id: 1, name: "Python", icon: PythonIcon },
  { id: 2, name: "React", icon: ReactIcon },
  { id: 3, name: "Docker", icon: DockerIcon },
  { id: 4, name: "GCP", icon: GCPIcon },
  { id: 5, name: "TypeScript", icon: TypeScriptIcon },
  { id: 6, name: "Rust", icon: RustIcon },
  { id: 7, name: "FastAPI", icon: FastAPIIcon },
  { id: 8, name: "Burp Suite", icon: BurpIcon },
  { id: 9, name: "Vercel", icon: VercelIcon },
  { id: 10, name: "GitHub", icon: GitHubIcon },
]

function LogoRow({ logos, reverse = false }) {
  const doubled = [...logos, ...logos]
  return (
    <div className="relative overflow-hidden py-4">
      <div
        className={cn(
          "flex gap-12 w-max",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
        style={{ willChange: "transform" }}
      >
        {doubled.map((logo, i) => {
          const Icon = logo.icon
          return (
            <div
              key={`${logo.id}-${i}`}
              className="flex items-center gap-3 opacity-40 hover:opacity-80 transition-opacity duration-300 flex-shrink-0"
            >
              <Icon className="w-7 h-7 text-white" />
              <span className="text-sm font-medium text-white whitespace-nowrap space-mono tracking-wider">
                {logo.name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function LogoCarousel({ className }) {
  const half = Math.ceil(allLogos.length / 2)
  const row1 = allLogos.slice(0, half)
  const row2 = allLogos.slice(half)

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      <div className="relative">
        <LogoRow logos={row1} />
        <LogoRow logos={row2} reverse />
      </div>
    </div>
  )
}
