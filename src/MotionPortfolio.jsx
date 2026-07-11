import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  lazy,
  Suspense,
} from "react"
import { motion, useScroll, useTransform, AnimatePresence, useInView, useAnimation } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Preloader from "./components/Preloader"
import ScrollReveal from "./components/ScrollReveal"
import ThreeDPhotoCarousel from "./components/three-d-carousel"
import { GradientHeading } from "./components/ui/gradient-heading"
import { TextAnimate } from "./components/ui/text-animate"
import LogoCarousel from "./components/ui/logo-carousel"

gsap.registerPlugin(ScrollTrigger)

// ─── Data ───────────────────────────────────────────────────────────────────

const projects = [
  {
    id: "hollow-purple",
    name: "Hollow Purple",
    category: "CLOUD SECURITY",
    tagline: "Adaptive Cloud Identity Attack Detection",
    description:
      "15-microservice pipeline that constructs live temporal identity interaction graphs from cloud event streams, with Merkle audit chains and FastAPI orchestration.",
    metrics: ["15 Microservices", "10K events/sec", "GCP IAM"],
    stack: ["Python", "FastAPI", "GCP IAM", "Docker", "Temporal Graphs"],
    link: "hollowpurple.html",
    github: "https://github.com/Tejaswanth2406/hollow-purple",
    image: "HOLLOWPURPLE.PNG",
  },
  {
    id: "hakari",
    name: "HAKARI",
    category: "AI / SIMULATION",
    tagline: "Cognitive Simulation Engine",
    description:
      "Physics-inspired simulation grounded in entropy mechanics, Bayesian inference, and information theory — modeling emergent cognition.",
    metrics: ["Entropy Physics", "Bayesian Core", "Information Theory"],
    stack: ["JavaScript", "Node.js", "Bayesian Inference"],
    link: "hakari.html",
    github: "https://github.com/Tejaswanth2406/hakari",
    image: "HAKARI.PNG",
  },
  {
    id: "piria",
    name: "PIRIA",
    category: "AI RUNTIME",
    tagline: "Physics-Inspired Relational Intelligence Architecture",
    description:
      "MVP runtime for persistent cognitive graphs using WAL journaling, CRDT-style merging, and physics-inspired relational intelligence.",
    metrics: ["Persistent Graphs", "WAL Journaling", "CRDT Merging"],
    stack: ["Rust", "Graph Runtime", "WAL"],
    link: "piria.html",
    github: "https://github.com/Tejaswanth2406/PIRIA",
    image: "PIRIA.PNG",
  },
  {
    id: "iot-sentinel",
    name: "IoT Sentinel",
    category: "NETWORK SECURITY",
    tagline: "Wide-Area Network Security Scanner",
    description:
      "Unified Wireshark, Nmap and RustScan scanner with CVE correlation and industrial protocol detection at 10K packets per second.",
    metrics: ["10K pps", "CVE Correlation", "Industrial Protocols"],
    stack: ["Python", "Lua", "FastAPI", "Docker", "Nmap"],
    link: "iot_sentinal.html",
    github: "https://github.com/Tejaswanth2406/iot-sentinal",
    image: "IOT_SENTINAL.PNG",
  },
  {
    id: "clu",
    name: "CLU",
    category: "LEGAL / AI",
    tagline: "AI Legal Document Analyzer",
    description:
      "Severity-tagged analysis of ToS and Privacy Policies with plain-English summaries and risk scores powered by Anthropic's Claude.",
    metrics: ["Risk Scoring", "ToS Analysis", "Claude API"],
    stack: ["TypeScript", "React 18", "Anthropic API"],
    link: "clu.html",
    github: "https://github.com/Tejaswanth2406/CLU",
    image: "CLU.PNG",
  },
  {
    id: "mumcare",
    name: "Mumcare AI",
    category: "HEALTH / AI",
    tagline: "AI Decision Engine for Caregivers",
    description:
      "Empathetic intent handling with grounded RAG retrieval and bilingual EN+AR support for maternal healthcare guidance.",
    metrics: ["Bilingual EN+AR", "RAG Pipeline", "Empathetic AI"],
    stack: ["FastAPI", "Claude 3", "RAG", "Langchain"],
    link: "mumcare.html",
    github: "https://github.com/Tejaswanth2406/Mumcare-AI-",
    image: "MUMCARE_AI.PNG",
  },
]

const experiences = [
  {
    role: "AI/ML Intern",
    company: "MACSOF",
    period: "May 2026 — Jul 2026",
    type: "INTERNSHIP",
    description:
      "Advanced AI systems: multimodal orchestration, Retrieval-Augmented Generation, and MCP-based intelligent workflows. Contributing to cognitive simulation research.",
    tags: ["RAG", "MCP", "Multimodal", "Agents"],
  },
  {
    role: "Cybersecurity Intern",
    company: "AISECT",
    period: "Jun 2025 — Oct 2025",
    type: "INTERNSHIP",
    description:
      "Network security, vulnerability assessment, threat monitoring, and incident response to support organizational cybersecurity posture.",
    tags: ["Network Security", "Vulnerability Assessment", "Incident Response"],
  },
  {
    role: "Vulnerability Researcher",
    company: "HackerOne & Intigriti",
    period: "Ongoing",
    type: "INDEPENDENT",
    description:
      "Active in offensive security: reverse engineering, IAM challenges, responsible disclosure, and security tooling development.",
    tags: ["Offensive Security", "IAM", "Reverse Engineering", "CVE Research"],
  },
]

const achievements = [
  {
    title: "AI Agent Olympics Milan",
    year: "2026",
    label: "FINALIST",
    description:
      "Pitched context-aware AI agent with multimodal orchestration to expert judges and investors at Milan.",
  },
  {
    title: "SIH 2024",
    year: "2024",
    label: "NATIONAL QUALIFIER",
    description:
      "Smart India Hackathon National Level. Cleared regional rounds, led team through national stage selection.",
  },
  {
    title: "Cloud Hunting Games",
    year: "2025",
    label: "CERTIFICATE",
    description: "Completed the cloud security CTF challenge with verified certificate.",
    link: "https://www.cloudhuntinggames.com/certificate/exfilcola/db46a967-79f2-4c08-bc6b-1c2224fbc512",
  },
  {
    title: "Cloud Security Championship",
    year: "2026",
    label: "LEADERBOARD",
    description: "Ranked in the global cloud security championship leaderboard.",
    link: "https://www.cloudsecuritychampionship.com/leaderboard?page=9",
  },
  {
    title: "Wiz BigIAM Challenge",
    year: "2026",
    label: "FINISHER",
    description: "Completed the BigIAM cloud identity and access management challenge.",
    link: "https://bigiamchallenge.com/finisher/TBBXmPES",
  },
]

const certifications = [
  { name: "Fortinet Certified", date: "Apr 2026", image: "Fortinet Certified Associate.png" },
  { name: "Anthropic MCP", date: "Apr 2026", image: "ANTHROPIC MCP CERTIFICATION.jpg" },
  { name: "Oracle OCI Architect", date: "Dec 2025", image: "OCI Certified assocaite.png" },
  { name: "Cloud Hunting Games", date: "Jun 2026", image: "THE CLOUD HUNTING GAMES.png", link: "https://www.cloudhuntinggames.com/certificate/exfilcola/db46a967-79f2-4c08-bc6b-1c2224fbc512" },
  { name: "BigIAM Challenge", date: "Jun 2026", image: "THE BIG IAM.png", link: "https://bigiamchallenge.com/finisher/TBBXmPES" },
  { name: "Cloud Security Championship", date: "Jun 2026", image: "Ultimate cloud security Challenge.png", link: "https://www.cloudsecuritychampionship.com/leaderboard?page=9" },
]

const affiliations = [
  { name: "PoetrySoup", role: "Published Poet", link: "https://www.poetrysoup.com/poems_poets/poems_by_poet.aspx?ID=194817" },
  { name: "iNaturalist", role: "Naturalist Member", link: "https://www.inaturalist.org/people/tejaswanthsurisetty" },
  { name: "Myma", role: "Visual Artist", link: "https://www.myma.art/artwork/cmpuu7f6p000lad2i7fbufalh" },
  { name: "Loopgarden", role: "Music Artist", link: "https://loopgarden.io/the-study/" },
]

const skills = [
  {
    category: "PROGRAMMING",
    items: ["Python", "JavaScript", "TypeScript", "Rust", "Java", "Lua", "HTML/CSS"],
  },
  {
    category: "AI & ML",
    items: ["LLMs & Agents", "RAG Systems", "MCP Servers", "Claude & GPT-4", "LangChain", "Vector DBs"],
  },
  {
    category: "SECURITY",
    items: ["Penetration Testing", "IAM & Cloud Security", "CVE Research", "Burp Suite", "Nmap & RustScan", "OWASP"],
  },
  {
    category: "CLOUD",
    items: ["GCP", "Oracle OCI", "Docker", "Kubernetes", "Terraform", "Vercel"],
  },
  {
    category: "FRAMEWORKS",
    items: ["React 18", "Next.js", "FastAPI", "Node.js", "Vite", "Framer Motion"],
  },
  {
    category: "DEVOPS",
    items: ["Git & GitHub Actions", "CI/CD Pipelines", "Microservices", "WebGL", "GSAP", "Three.js"],
  },
]

// ─── Reusable Micro Components ───────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p className="space-mono text-[10px] tracking-[0.4em] text-white/30 uppercase mb-6">
      {children}
    </p>
  )
}

function Divider() {
  return <div className="w-full h-px bg-white/5 my-0" />
}

function MagneticButton({ children, href, className, onClick, ...props }) {
  const btnRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const el = btnRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (btnRef.current) btnRef.current.style.transform = "translate(0,0)"
  }, [])

  const Tag = href ? "a" : "button"

  return (
    <Tag
      ref={btnRef}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex items-center gap-2 transition-all duration-300 ${className}`}
      style={{ transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
      {...props}
    >
      {children}
    </Tag>
  )
}

function TiltCard({ children, className }) {
  const cardRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.01)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current)
      cardRef.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)"
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  )
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Navbar({ visible }) {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-16 py-5 glass border-b border-white/5"
    >
      <a href="#hero" className="space-mono text-sm font-bold tracking-wider text-white">
        TJS.
      </a>
      <div className="hidden md:flex items-center gap-8">
        {["Work", "About", "Experience", "Skills", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="space-mono text-[10px] tracking-[0.3em] text-white/40 hover:text-white transition-colors uppercase"
          >
            {item}
          </a>
        ))}
      </div>
      <MagneticButton
        href="hire_me.html"
        className="px-5 py-2 border border-white/20 rounded-full space-mono text-[10px] tracking-widest text-white/70 hover:text-white hover:border-white/50"
      >
        HIRE ME
      </MagneticButton>
    </motion.nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ onScrolled }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      if (v > 0.15) onScrolled?.(true)
      else onScrolled?.(false)
    })
    return unsub
  }, [scrollYProgress, onScrolled])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Layered background */}
      <div className="absolute inset-0 z-0">
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.06),transparent)]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto w-full"
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex justify-center mb-10"
        >
          <div className="flex items-center gap-3 px-4 py-2 border border-white/10 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="space-mono text-[10px] tracking-[0.4em] text-white/40 uppercase">
              AVAILABLE FOR WORK — 2026
            </span>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(3rem,12vw,10rem)] font-black leading-[0.9] tracking-[-0.04em] playfair mb-8"
        >
          <span className="gradient-text italic">Tejaswanth</span>
          <br />
          <span className="text-white/80">Surisetty</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl text-white/40 font-light max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          Security Engineer · AI Systems Architect · Vulnerability Researcher
          <br />
          <span className="text-white/20 text-sm">4th Year CSE · GITAM University</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          <MagneticButton
            href="#work"
            className="px-8 py-4 bg-white text-black font-bold rounded-full text-sm hover:bg-white/90"
          >
            View Work
          </MagneticButton>
          <MagneticButton
            href="mailto:tejaswanthsurisetty@gmail.com"
            className="px-8 py-4 border border-white/20 rounded-full text-sm text-white/80 hover:text-white hover:border-white/50"
          >
            Get in Touch
          </MagneticButton>
        </motion.div>

        {/* Tech badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {["Python", "React", "FastAPI", "GSAP", "GCP", "Claude API", "Docker"].map((t) => (
            <span
              key={t}
              className="px-3 py-1 border border-white/10 rounded-full space-mono text-[10px] text-white/30 tracking-wider"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent"
        />
        <span className="space-mono text-[9px] tracking-[0.4em] text-white/20 uppercase">SCROLL</span>
      </motion.div>
    </section>
  )
}

// ─── Philosophy ───────────────────────────────────────────────────────────────

function PhilosophySection() {
  return (
    <section id="philosophy" className="relative py-32 md:py-48 px-6 flex items-center justify-center min-h-[60vh]">
      <div className="max-w-4xl mx-auto text-center">
        <SectionLabel>PHILOSOPHY</SectionLabel>
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={3}
          blurStrength={6}
          containerClassName="text-3xl md:text-5xl font-light playfair italic leading-relaxed text-white/80"
        >
          Technology should feel invisible. Intelligence should feel natural. Security should never be an afterthought.
        </ScrollReveal>
      </div>
    </section>
  )
}

// ─── Featured Work ────────────────────────────────────────────────────────────

function FeaturedWork() {
  const featured = projects.slice(0, 3)

  return (
    <section id="work" className="relative py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <SectionLabel>FEATURED WORK</SectionLabel>
            <GradientHeading size="xl" weight="bold" as="h2">
              Selected Projects
            </GradientHeading>
          </div>
          <a
            href="#projects"
            className="hidden md:flex items-center gap-2 space-mono text-[10px] tracking-widest text-white/30 hover:text-white transition-colors uppercase"
          >
            View All <span className="text-lg">→</span>
          </a>
        </div>

        <div className="space-y-px">
          {featured.map((project, i) => (
            <React.Fragment key={project.id}>
              <TiltCard className="group">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-10 px-6 hover:bg-white/[0.02] transition-colors rounded-2xl"
                >
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-4">
                      <span className="space-mono text-[10px] tracking-widest text-white/20">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="space-mono text-[10px] tracking-widest text-white/30 uppercase">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black tracking-tight group-hover:italic transition-all duration-300">
                      {project.name}
                    </h3>
                    <p className="text-white/40 text-base leading-relaxed max-w-xl">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.stack.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 border border-white/10 rounded-full space-mono text-[10px] text-white/30"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 md:flex-col md:items-end">
                    <a
                      href={project.link}
                      className="px-6 py-3 bg-white text-black font-bold rounded-full text-xs hover:bg-white/90 transition-colors"
                    >
                      View Project
                    </a>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 border border-white/20 rounded-full text-xs text-white/60 hover:text-white hover:border-white/50 transition-colors"
                      >
                        GitHub →
                      </a>
                    )}
                  </div>
                </motion.div>
              </TiltCard>
              {i < featured.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── About ───────────────────────────────────────────────────────────────────

function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-40 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Left: portrait placeholder with dither styling */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white/[0.03] border border-white/10 group"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <p className="space-mono text-[10px] tracking-[0.4em] text-white/20">TEJASWANTH</p>
              <div className="text-8xl font-black text-white/5 playfair italic">TJS</div>
              <p className="space-mono text-[10px] tracking-widest text-white/15">GITAM · CSE · 2026</p>
            </div>
          </div>
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <p className="space-mono text-[10px] tracking-widest text-white/40">4th Year CSE</p>
            <p className="space-mono text-[10px] tracking-widest text-white/20">GITAM University</p>
          </div>
        </motion.div>

        {/* Right: story */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10"
        >
          <div>
            <SectionLabel>ABOUT</SectionLabel>
            <GradientHeading size="lg" weight="bold" as="h2" className="mb-6">
              Building at the intersection of AI & Security
            </GradientHeading>
            <p className="text-white/50 text-lg leading-relaxed">
              I'm a 4th Year CSE student at GITAM University, Visakhapatnam, obsessively focused on LLMs, RAG pipelines, cloud security, and vulnerability research. I build systems that are both intelligent and secure.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { label: "EDUCATION", value: "B.Tech CSE · GITAM University · 2023–Present" },
              { label: "FOCUS", value: "AI Systems · Cloud Security · Vulnerability Research" },
              { label: "INTERESTS", value: "Cognitive AI · Entropy Physics · Red Teaming · Poetry" },
              { label: "VISION", value: "Secure, intelligent systems that amplify human potential" },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-8 py-4 border-b border-white/5">
                <span className="space-mono text-[10px] tracking-widest text-white/25 w-28 flex-shrink-0 pt-1">
                  {label}
                </span>
                <span className="text-white/70 text-sm leading-relaxed">{value}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-4 flex-wrap">
            <MagneticButton
              href="https://github.com/Tejaswanth2406"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-white/20 rounded-full text-sm text-white/60 hover:text-white hover:border-white/50 transition-colors space-mono text-xs tracking-widest"
            >
              GITHUB →
            </MagneticButton>
            <MagneticButton
              href="https://www.linkedin.com/in/tejaswanth-surisetty-590322312/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-white/20 rounded-full text-sm text-white/60 hover:text-white hover:border-white/50 transition-colors space-mono text-xs tracking-widest"
            >
              LINKEDIN →
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Education ────────────────────────────────────────────────────────────────

function EducationSection() {
  return (
    <section id="education" className="relative py-24 px-6 md:px-16 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>EDUCATION</SectionLabel>
        <GradientHeading size="xl" weight="bold" as="h2" className="mb-16">
          Academic Path
        </GradientHeading>
        <div className="space-y-px">
          {[
            {
              period: "2023 — Present",
              degree: "B.Tech Computer Science & Engineering",
              institution: "GITAM University, Visakhapatnam",
              detail: "Focus: AI, LLMs, Cloud Security, Cybersecurity",
            },
            {
              period: "2021 — 2023",
              degree: "Intermediate (MPC)",
              institution: "ASCENT Junior College, Visakhapatnam",
              detail: "Mathematics, Physics, Chemistry · 844/940 (~89.8%)",
            },
          ].map((edu, i) => (
            <React.Fragment key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="group py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] px-4 rounded-2xl transition-colors"
              >
                <div className="space-y-2">
                  <p className="space-mono text-[10px] tracking-widest text-white/25">{edu.period}</p>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight group-hover:italic transition-all duration-300">
                    {edu.degree}
                  </h3>
                  <p className="text-white/40">{edu.detail}</p>
                </div>
                <p className="text-white/30 text-right md:text-right md:max-w-[200px]">{edu.institution}</p>
              </motion.div>
              {i < 1 && <Divider />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Experience ───────────────────────────────────────────────────────────────

function ExperienceSection() {
  const lineRef = useRef(null)

  useEffect(() => {
    if (!lineRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" className="relative py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>EXPERIENCE</SectionLabel>
        <GradientHeading size="xl" weight="bold" as="h2" className="mb-16">
          Career Timeline
        </GradientHeading>

        <div className="relative pl-8 md:pl-16">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-4 top-2 bottom-2 w-px bg-white/5">
            <div ref={lineRef} className="absolute inset-0 bg-white/30 origin-top" />
          </div>

          <div className="space-y-16">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px 0px" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative group"
              >
                {/* Timeline dot */}
                <div className="absolute -left-9 md:-left-[4.5rem] top-1.5 w-2.5 h-2.5 rounded-full bg-white/20 border border-white/40 group-hover:bg-white group-hover:scale-125 transition-all duration-300" />

                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 border border-white/15 rounded-full space-mono text-[9px] tracking-widest text-white/40 uppercase">
                      {exp.type}
                    </span>
                    <span className="space-mono text-[10px] text-white/25">{exp.period}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight group-hover:italic transition-all duration-300">
                    {exp.role}
                  </h3>
                  <p className="text-white/40 font-semibold">{exp.company}</p>
                  <p className="text-white/40 leading-relaxed max-w-2xl">{exp.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/[0.05] rounded-full space-mono text-[10px] text-white/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Skills ───────────────────────────────────────────────────────────────────

function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 px-6 md:px-16 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>INTELLIGENCE</SectionLabel>
        <GradientHeading size="xl" weight="bold" as="h2" className="mb-8">
          Skills & Arsenal
        </GradientHeading>

        {/* Logo Carousel */}
        <div className="relative mb-16 -mx-6 md:-mx-16 overflow-hidden">
          <LogoCarousel />
        </div>

        {/* Skill grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skillGroup, i) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="p-6 border border-white/5 rounded-2xl bg-white/[0.01] hover:border-white/15 hover:bg-white/[0.03] transition-all group"
            >
              <p className="space-mono text-[10px] tracking-[0.4em] text-white/30 uppercase mb-5">
                {skillGroup.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 + j * 0.04, duration: 0.4 }}
                    className="px-3 py-1.5 bg-white/[0.05] hover:bg-white/10 border border-white/10 hover:border-white/25 rounded-full text-xs text-white/60 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── All Projects ─────────────────────────────────────────────────────────────

function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>PROJECT VAULT</SectionLabel>
        <GradientHeading size="xl" weight="bold" as="h2" className="mb-16">
          All Projects
        </GradientHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <TiltCard key={project.id} className="group h-full">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="h-full flex flex-col p-8 border border-white/5 rounded-3xl bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.03] transition-all"
              >
                {/* Project image */}
                {project.image && (
                  <div className="w-full h-40 rounded-xl overflow-hidden mb-6 bg-white/5">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-opacity duration-500 mix-blend-screen"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <span className="space-mono text-[10px] tracking-widest text-white/25 uppercase">{project.category}</span>
                  <span className="space-mono text-white/10">·</span>
                  <span className="space-mono text-[10px] text-white/15">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-3 group-hover:italic transition-all duration-300">
                  {project.name}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed mb-6 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.stack.map((t) => (
                    <span key={t} className="px-2.5 py-1 border border-white/10 rounded-full space-mono text-[9px] text-white/30">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a
                    href={project.link}
                    className="px-4 py-2 bg-white text-black font-bold rounded-full text-xs hover:bg-white/90 transition-colors"
                  >
                    View →
                  </a>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-white/20 rounded-full text-xs text-white/50 hover:text-white hover:border-white/50 transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Research ─────────────────────────────────────────────────────────────────

function ResearchSection() {
  const topics = [
    { title: "Cloud Security & IAM", desc: "Identity and Access Management on GCP & OCI. Privilege escalation paths, audit logging, and temporal graph-based anomaly detection." },
    { title: "Vulnerability Research", desc: "Active on HackerOne and Intigriti. Offensive security, responsible disclosure, and CVE analysis across web and network attack surfaces." },
    { title: "Reverse Engineering", desc: "Binary analysis, firmware unpacking, and protocol analysis for IoT and industrial control systems." },
    { title: "AI Red Teaming", desc: "Adversarial prompt engineering, jailbreaking, and model robustness evaluation for LLM-based systems." },
    { title: "CTF & Competitions", desc: "Cloud Hunting Games, BigIAM Challenge, Wiz Security Championship. Placed globally in cloud security challenges." },
    { title: "AI Safety Research", desc: "Exploring alignment, interpretability, and safe deployment patterns for autonomous AI agents in production." },
  ]

  return (
    <section id="research" className="relative py-24 px-6 md:px-16 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>RESEARCH & SECURITY</SectionLabel>
        <GradientHeading size="xl" weight="bold" as="h2" className="mb-16">
          Research Areas
        </GradientHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 rounded-3xl overflow-hidden">
          {topics.map((topic, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              className="p-8 bg-black hover:bg-white/[0.025] transition-colors group"
            >
              <div className="flex items-start gap-4">
                <span className="space-mono text-[9px] text-white/20 mt-1 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="space-y-2">
                  <h3 className="font-black text-lg group-hover:italic transition-all duration-300">
                    {topic.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">{topic.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

function GallerySection() {
  return (
    <section id="gallery" className="relative py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>GALLERY</SectionLabel>
        <GradientHeading size="xl" weight="bold" as="h2" className="mb-12">
          Screenshots & Credentials
        </GradientHeading>
        <div className="border border-white/5 rounded-3xl overflow-hidden bg-white/[0.01] p-4">
          <ThreeDPhotoCarousel />
        </div>
      </div>
    </section>
  )
}

// ─── Achievements ─────────────────────────────────────────────────────────────

function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-24 px-6 md:px-16 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>ACHIEVEMENTS</SectionLabel>
        <GradientHeading size="xl" weight="bold" as="h2" className="mb-16">
          Wins & Recognition
        </GradientHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((ach, i) => (
            <TiltCard key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="h-full p-8 border border-white/5 rounded-2xl bg-black hover:border-white/20 hover:bg-white/[0.03] transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 border border-white/20 rounded-full space-mono text-[9px] tracking-widest text-white/50 uppercase">
                    {ach.label}
                  </span>
                  <span className="space-mono text-[10px] text-white/20">{ach.year}</span>
                </div>
                <h3 className="text-xl font-black mb-3 group-hover:italic transition-all duration-300">
                  {ach.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{ach.description}</p>
                {ach.link && (
                  <a
                    href={ach.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-4 space-mono text-[10px] text-white/30 hover:text-white transition-colors tracking-widest"
                  >
                    VERIFY →
                  </a>
                )}
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Certifications ───────────────────────────────────────────────────────────

function CertificationsSection() {
  const [hovered, setHovered] = useState(null)

  return (
    <section id="certifications" className="relative py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>CERTIFICATIONS</SectionLabel>
        <GradientHeading size="xl" weight="bold" as="h2" className="mb-16">
          Verified Credentials
        </GradientHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.a
              key={i}
              href={cert.link || "#"}
              target={cert.link ? "_blank" : "_self"}
              rel={cert.link ? "noopener noreferrer" : ""}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.6 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all block"
            >
              {/* Image with dither-like effect */}
              <div className="relative h-44 bg-white/[0.02] overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.name}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    hovered === i
                      ? "opacity-80 filter-none scale-105"
                      : "opacity-30 grayscale scale-100"
                  }`}
                  loading="lazy"
                />
                {hovered !== i && (
                  <div className="absolute inset-0 mix-blend-overlay bg-black/40" />
                )}
              </div>
              <div className="p-5 bg-black">
                <h3 className="font-black text-base mb-1 group-hover:italic transition-all duration-300">
                  {cert.name}
                </h3>
                <p className="space-mono text-[10px] text-white/30 tracking-widest">{cert.date}</p>
                {cert.link && (
                  <p className="space-mono text-[9px] text-white/20 mt-2 tracking-widest">CLICK TO VERIFY →</p>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Featured Projects Showcase ───────────────────────────────────────────────

function FeaturedProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState(null)

  return (
    <section id="featured-projects" className="relative py-24 px-6 md:px-16 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>SHOWCASE</SectionLabel>
        <GradientHeading size="xl" weight="bold" as="h2" className="mb-16">
          Featured Projects
        </GradientHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.a
              key={project.id}
              href={project.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              onMouseEnter={() => setHoveredProject(i)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all block h-full"
            >
              {/* Image background */}
              <div className="relative h-56 bg-gradient-to-br from-white/5 to-white/[0.02] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    hoveredProject === i
                      ? "scale-110 opacity-60"
                      : "scale-100 opacity-30"
                  }`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="space-mono text-[10px] text-white/50 tracking-widest mb-2">
                  {project.category}
                </div>
                <h3 className="text-xl font-black mb-2 group-hover:italic transition-all">
                  {project.name}
                </h3>
                <p className="text-xs text-white/60 line-clamp-2 mb-4">
                  {project.tagline}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.slice(0, 3).map((tech, j) => (
                    <span
                      key={j}
                      className="space-mono text-[8px] px-2 py-1 border border-white/20 rounded-full text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover overlay */}
              {hoveredProject === i && (
                <motion.div
                  className="absolute inset-0 border-2 border-white/50 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Exclusive Archives ────────────────────────────────────────────────────────

function ExclusiveArchivesSection() {
  const archives = [
    {
      title: "Hidden Vault",
      description: "Exclusive research, unreleased projects, and experimental work",
      href: "hidden vault.html",
      icon: "🔐",
    },
    {
      title: "Vault Content",
      description: "Deep dives into specialized security and AI topics",
      href: "vault-content.html",
      icon: "📦",
    },
    {
      title: "Services",
      description: "Security consulting, AI systems design, and architecture",
      href: "hire_me.html",
      icon: "⚙️",
    },
  ]

  return (
    <section id="archives" className="relative py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>RESOURCES</SectionLabel>
        <GradientHeading size="xl" weight="bold" as="h2" className="mb-16">
          Exclusive Archives
        </GradientHeading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {archives.map((archive, i) => (
            <motion.a
              key={i}
              href={archive.href}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group p-8 border border-white/10 rounded-2xl hover:border-white/30 transition-all hover:bg-white/[0.03] block"
            >
              <div className="text-4xl mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                {archive.icon}
              </div>
              <h3 className="font-black text-lg mb-3 group-hover:italic transition-all">
                {archive.title}
              </h3>
              <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                {archive.description}
              </p>
              <div className="mt-4 text-xs text-white/40 group-hover:text-white/60 transition-colors">
                EXPLORE →
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Infrastructure Tech Stack ────────────────────────────────────────────────

function InfrastructureStackSection() {
  const stackCategories = [
    {
      title: "Backend & Processing",
      items: ["Python", "Node.js", "Rust", "FastAPI", "Express"],
    },
    {
      title: "Cloud & DevOps",
      items: ["GCP", "OCI", "Docker", "Kubernetes", "CI/CD"],
    },
    {
      title: "AI & Machine Learning",
      items: ["LLMs", "Claude API", "RAG", "Anthropic MCP", "Graph AI"],
    },
    {
      title: "Frontend & Design",
      items: ["React 18", "WebGL", "GSAP", "Framer Motion", "Tailwind"],
    },
  ]

  return (
    <section id="infrastructure" className="relative py-24 px-6 md:px-16 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>TECH</SectionLabel>
        <GradientHeading size="xl" weight="bold" as="h2" className="mb-16">
          Infrastructure Stack
        </GradientHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stackCategories.map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="p-6 border border-white/10 rounded-2xl hover:border-white/20 transition-all hover:bg-white/[0.02]"
            >
              <h3 className="font-black text-sm mb-6 tracking-widest">
                {category.title.toUpperCase()}
              </h3>
              <div className="space-y-2">
                {category.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    <span className="text-sm text-white/70">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Explore More Navigation ──────────────────────────────────────────────────

function ExploreMoreSection() {
  const links = [
    {
      title: "React Demo",
      description: "Interactive component showcase",
      href: "test_react.html",
    },
    {
      title: "Services",
      description: "Consulting and development",
      href: "hire_me.html",
    },
    {
      title: "Publications",
      description: "Research and technical papers",
      href: "publications.html",
    },
    {
      title: "Hidden Vault",
      description: "Exclusive content",
      href: "hidden vault.html",
    },
    {
      title: "GitHub",
      description: "All source code",
      href: "https://github.com/Tejaswanth2406",
      external: true,
    },
    {
      title: "HackerOne Profile",
      description: "Security research",
      href: "https://hackerone.com/tejaswanth2406",
      external: true,
    },
  ]

  return (
    <section id="explore-more" className="relative py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>NAVIGATION</SectionLabel>
        <GradientHeading size="xl" weight="bold" as="h2" className="mb-16">
          Explore More
        </GradientHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              target={link.external ? "_blank" : "_self"}
              rel={link.external ? "noopener noreferrer" : ""}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="group p-6 border border-white/10 rounded-2xl hover:border-white/30 transition-all hover:bg-white/[0.03] block"
            >
              <h3 className="font-black text-base mb-2 group-hover:italic transition-all flex items-center justify-between">
                {link.title}
                {link.external && <span className="text-xs opacity-50">↗</span>}
              </h3>
              <p className="text-sm text-white/60">{link.description}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Publications ─────────────────────────────────────────────────────────────

function PublicationsSection() {
  return (
    <section id="publications" className="relative py-24 px-6 md:px-16 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>PUBLICATIONS</SectionLabel>
        <GradientHeading size="xl" weight="bold" as="h2" className="mb-8">
          Research & Writing
        </GradientHeading>
        <div className="flex items-center gap-8 py-16 border-y border-white/5">
          <div className="space-y-4">
            <span className="px-4 py-2 border border-white/15 rounded-full space-mono text-[10px] tracking-widest text-white/40">
              LATEST PUBLICATIONS
            </span>
            <p className="text-white/30 text-lg leading-relaxed max-w-xl">
              New paper:
              <a
                href="https://zenodo.org/records/21310377"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-white hover:text-pink-300 transition-colors underline underline-offset-4"
              >
                Transcendence: A Computational and Philosophical Framework for Recursive Epistemic Self-Improvement
              </a>
            </p>
            <p className="text-white/30 text-lg leading-relaxed max-w-xl">
              ORCID:
              <a
                href="https://orcid.org/my-orcid?orcid=0009-0009-1962-0377"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-white hover:text-cyan-300 transition-colors underline underline-offset-4"
              >
                0009-0009-1962-0377
              </a>
            </p>
            <p className="text-white/30 text-lg leading-relaxed max-w-xl">
              OpenAIRE:
              <a
                href="https://explore.openaire.eu/my-orcid-links"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-white hover:text-cyan-300 transition-colors underline underline-offset-4"
              >
                My ORCID links
              </a>
            </p>
            <p className="text-white/30 text-lg leading-relaxed max-w-xl">
              Academia.edu:
              <a
                href="https://independent.academia.edu/TejaswanthSurisetty"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-white hover:text-cyan-300 transition-colors underline underline-offset-4"
              >
                Tejaswanth Surisetty
              </a>
            </p>
            <a
              href="publications.html"
              className="inline-flex items-center gap-2 space-mono text-[10px] text-white/30 hover:text-white transition-colors tracking-widest"
            >
              VIEW PUBLICATIONS PAGE →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Affiliations ─────────────────────────────────────────────────────────────

function AffiliationsSection() {
  return (
    <section id="affiliations" className="relative py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>BEYOND CODE</SectionLabel>
        <GradientHeading size="xl" weight="bold" as="h2" className="mb-16">
          Affiliations & Art
        </GradientHeading>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {affiliations.map((affil, i) => (
            <motion.a
              key={i}
              href={affil.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group p-6 border border-white/5 rounded-2xl bg-white/[0.01] hover:border-white/25 hover:bg-white/[0.04] transition-all text-center flex flex-col items-center justify-center min-h-[140px] gap-3"
            >
              <h4 className="font-black text-lg group-hover:italic transition-all duration-300">{affil.name}</h4>
              <p className="space-mono text-[10px] text-white/30 tracking-widest uppercase">{affil.role}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact ─────────────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contact" className="relative py-32 md:py-48 px-6 text-center bg-white/[0.01]">
      <div className="max-w-4xl mx-auto">
        <SectionLabel>INITIATE CONNECTION</SectionLabel>
        <GradientHeading size="xxxl" weight="black" as="h2" className="mb-8">
          Let's Build Something
        </GradientHeading>
        <p className="text-white/40 text-xl mb-16 leading-relaxed">
          Open to internships, research collaborations, freelance projects, and meaningful conversations.
        </p>
        <div className="flex flex-col items-center gap-6">
          <MagneticButton
            href="mailto:tejaswanthsurisetty@gmail.com"
            className="text-2xl md:text-4xl font-light text-white hover:italic transition-all duration-500 underline underline-offset-8 decoration-white/20 hover:decoration-white"
          >
            tejaswanthsurisetty@gmail.com
          </MagneticButton>

          <div className="flex flex-wrap gap-4 justify-center pt-8">
            {[
              { label: "GitHub", href: "https://github.com/Tejaswanth2406" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/tejaswanth-surisetty-590322312/" },
              { label: "Hire Me", href: "hire_me.html" },
              { label: "Support", href: "https://v0-tejjj-support-portal.vercel.app/" },
            ].map((link) => (
              <MagneticButton
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : "_self"}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : ""}
                className="px-6 py-3 border border-white/15 rounded-full space-mono text-xs tracking-widest text-white/40 hover:text-white hover:border-white/50 transition-all"
              >
                {link.label}
              </MagneticButton>
            ))}
          </div>
        </div>

        <p className="mt-24 space-mono text-[9px] opacity-15 tracking-[1em] uppercase">
          2026 TEJASWANTH SURISETTY · TEJJJ.IS-A.DEV
        </p>
      </div>
    </section>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function MotionPortfolio() {
  const [ready, setReady] = useState(false)
  const [navVisible, setNavVisible] = useState(false)
  const lenisRef = useRef(null)

  // Lenis smooth scroll
  useEffect(() => {
    if (!ready) return
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      lenisRef.current = lenis

      lenis.on("scroll", ScrollTrigger.update)

      gsap.ticker.add((time) => lenis.raf(time * 1000))
      gsap.ticker.lagSmoothing(0)

      return () => {
        lenis.destroy()
        gsap.ticker.remove((time) => lenis.raf(time * 1000))
      }
    })
  }, [ready])

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />

      {ready && (
        <div className="relative bg-black text-white overflow-x-hidden noise-overlay">
          <Navbar visible={navVisible} />

          <Hero onScrolled={setNavVisible} />
          <PhilosophySection />
          <Divider />
          <FeaturedWork />
          <Divider />
          <AboutSection />
          <Divider />
          <EducationSection />
          <Divider />
          <ExperienceSection />
          <Divider />
          <SkillsSection />
          <Divider />
          <ProjectsSection />
          <Divider />
          <ResearchSection />
          <Divider />
          <GallerySection />
          <Divider />
          <AchievementsSection />
          <Divider />
          <CertificationsSection />
          <Divider />
          <FeaturedProjectsSection />
          <Divider />
          <ExclusiveArchivesSection />
          <Divider />
          <InfrastructureStackSection />
          <Divider />
          <ExploreMoreSection />
          <Divider />
          <PublicationsSection />
          <Divider />
          <AffiliationsSection />
          <Divider />
          <ContactSection />
        </div>
      )}
    </>
  )
}
