import React, { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import AnimatedBackground from "./AnimatedBackground"
import { HoverMembers } from "./components/HoverMembers"
import { HoverExpand } from "./components/HoverExpand"
import { TextRoll } from "./components/TextRoll"
import { ImageCursorTrail } from "./components/ImageCursorTrail"
import ScrollReveal from "./components/ScrollReveal"
import ScrollFloat from "./components/ScrollFloat"
import Galaxy from "./components/Galaxy"
import Particles from "./components/Particles"
import RotatingText from "./components/RotatingText"

const MotionPortfolio = () => {
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigationItems = [
    { name: "Home", href: "#hero", id: "hero" },
    { name: "Stats", href: "#expertise", id: "expertise" },
    { name: "Vault", href: "#projects", id: "projects" },
    { name: "Lab", href: "#research", id: "research" },
    { name: "Path", href: "#timeline", id: "timeline" },
    { name: "Wins", href: "#achievements", id: "achievements" },
    { name: "Contact", href: "#contact", id: "contact" },
  ]

  const projectsData = [
    { name: "Hollow Purple", category: "SECURITY", description: "Cloud IAM Detection", link: "hollowpurple.html", github: "https://github.com/Tejaswanth2406/hollow-purple" },
    { name: "HAKARI", category: "AI/ML", description: "AI Research Engine", link: "hakari.html", github: "https://github.com/Tejaswanth2406/hakari" },
    { name: "IOT Sentinel", category: "SECURITY", description: "Network Security Scanner", link: "iot_sentinal.html", github: "https://github.com/Tejaswanth2406/iot-sentinal" },
    { name: "CLU", category: "LEGAL/AI", description: "Legal AI Analyzer", link: "clu.html", github: "https://github.com/Tejaswanth2406/CLU" },
    { name: "PIRIA", category: "AI/RUNTIME", description: "Relational Intelligence Runtime", link: "piria.html", github: "https://github.com/Tejaswanth2406/PIRIA" },
    { name: "Mumcare AI", category: "HEALTH/AI", description: "Health AI Decision Engine", link: "mumcare.html", github: "https://github.com/Tejaswanth2406/Mumcare-AI-" },
  ]

  const certifications = [
    { name: "Cloud Hunting Games", date: "Jun 2026", link: "https://www.cloudhuntinggames.com/certificate/exfilcola/db46a967-79f2-4c08-bc6b-1c2224fbc512", image: "Screenshot 2026-06-02 232923.png" },
    { name: "Cloud Security Championship", date: "2026", link: "https://www.cloudsecuritychampionship.com/leaderboard?page=9", image: "Screenshot 2026-06-03 103743.png" },
    { name: "BigIAM Challenge", date: "2026", link: "https://bigiamchallenge.com/finisher/TBBXmPES", image: "Screenshot 2026-06-03 103916.png" },
    { name: "LinkedIn Certifications", date: "Multiple", link: "https://www.linkedin.com/in/tejaswanth-surisetty-590322312/details/certifications/", image: "Screenshot 2026-06-03 104020.png" },
    { name: "Fortinet Certified", date: "Apr 2026", link: "#", image: "Screenshot 2026-06-03 104120.png" },
    { name: "Oracle Architect", date: "Dec 2025", link: "#", image: "Screenshot 2026-06-03 104220.png" },
  ]

  return (
    <div className="relative w-full overflow-hidden bg-black text-white">
      <AnimatedBackground />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 w-full z-50 flex justify-between items-center px-10 py-8 mix-blend-difference"
      >
        <motion.div
          className="text-2xl font-black tracking-tighter"
          whileHover={{ scale: 1.1 }}
        >
          TJS.
        </motion.div>
        <div className="space-mono text-[8px] tracking-[0.4em] uppercase opacity-30 flex gap-10">
          {navigationItems.map((item) => (
            <motion.a
              key={item.id}
              href={item.href}
              className="hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.1 }}
            >
              {item.name}
            </motion.a>
          ))}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        <div className="absolute inset-0 z-0">
          <Galaxy 
            density={0.8} 
            transparent={true} 
            starSpeed={0.3}
            glowIntensity={0.2}
            mouseInteraction={true}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center max-w-4xl mx-auto px-6 space-y-8 relative z-10"
        >
          <motion.h1
            className="text-7xl md:text-9xl font-black tracking-tighter leading-none italic playfair"
            style={{
              backgroundImage: "linear-gradient(to right, #ffffff, #ffffff/70)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <TextRoll center>TEJASWANTH</TextRoll>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/60 space-mono tracking-wide"
          >
            Security Engineer × AI Systems × Cloud Architecture
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex justify-center gap-6 pt-8"
          >
            <motion.a
              href="mailto:tejaswanthsurisetty@gmail.com"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              className="px-8 py-4 border border-white/20 rounded-full hover:border-white/50 transition-colors"
            >
              Get in Touch
            </motion.a>
            <motion.a
              href="hire_me.html"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              className="px-8 py-4 border border-white/20 rounded-full hover:border-white/50 transition-colors"
            >
              Hire Me
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Expertise Stats */}
      <section id="expertise" className="relative py-32 px-6 md:px-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <ScrollFloat
            animationDuration={1.5}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
            containerClassName="text-6xl font-black mb-24 tracking-tighter italic playfair"
          >
            EXPERTISE
          </ScrollFloat>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { value: "20+", label: "PROJECTS", desc: "Production systems" },
              { value: "5+", label: "SECURITY AREAS", desc: "IAM, Cloud, Vulns" },
              { value: "3", label: "PUBLICATIONS", desc: "Research & findings" },
              { value: "AI", label: "FOCUS", desc: "LLMs & Agents" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 border border-white/5 rounded-3xl bg-white/[0.01] hover:border-white/20 transition-all"
              >
                <div className="text-5xl font-black mb-4">{stat.value}</div>
                <p className="space-mono text-xs opacity-50 mb-2">{stat.label}</p>
                <p className="text-white/40 text-sm">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Skills Matrix */}
      <section id="skills" className="relative py-32 px-6 md:px-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <ScrollReveal 
            baseOpacity={0.05}
            enableBlur={true}
            blurStrength={3}
            containerClassName="text-6xl font-black mb-24 tracking-tighter italic playfair text-right"
            textClassName=""
          >
            TOOLKIT
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "SECURITY", skills: ["Cloud IAM Analysis", "Vuln Research", "Offensive Security", "Network Scanning", "Pen Testing"] },
              { title: "AI/ML", skills: ["LLM Systems", "RAG Pipelines", "Agentic Workflows", "Multimodal AI", "Prompt Eng"] },
              { title: "ENGINEERING", skills: ["Python/FastAPI", "React/TypeScript", "Docker/K8s", "Terraform", "Node.js"] },
              { title: "CLOUD", skills: ["GCP & OCI", "IAM Policies", "Infra Code", "Microservices", "API Design"] },
            ].map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 border border-white/5 rounded-3xl bg-white/[0.01] hover:border-white/20 transition-all"
              >
                <h3 className="space-mono text-xs opacity-20 mb-6">{section.title}</h3>
                <ul className="space-y-3 text-sm font-bold">
                  {section.skills.map((skill, j) => (
                    <li key={j} className="text-white/80 hover:text-white transition">{skill}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Interactive Expertise Areas */}
      <HoverMembers />

      {/* Projects Section */}
      <section id="projects" className="relative py-32 px-6 md:px-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-6xl font-black mb-24 tracking-tighter italic playfair">VAULT</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <motion.a
                  href={project.link}
                  whileHover={{ scale: 1.05 }}
                  className="block p-8 border border-white/5 rounded-3xl bg-white/[0.01] hover:border-white/20 transition-all cursor-pointer"
                >
                  <span className="space-mono text-xs opacity-20 mb-4 block">{project.category}</span>
                  <h3 className="text-3xl font-black mb-4">{project.name}</h3>
                  <p className="text-white/40 text-lg mb-6">{project.description}</p>
                  <div className="flex gap-3">
                    <span className="px-4 py-2 border border-white/10 rounded-full text-xs space-mono opacity-50 hover:opacity-100 transition-opacity">
                      View Project
                    </span>
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-2 border border-white/10 rounded-full text-xs space-mono opacity-50 hover:opacity-100 transition-opacity"
                      >
                        GitHub
                      </motion.a>
                    )}
                  </div>
                </motion.a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Interactive Gallery */}
      <section className="relative py-32 px-6 md:px-20 bg-white/[0.01]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h3 className="text-3xl font-black mb-16 text-center italic playfair">INTERACTIVE SHOWCASE</h3>
          <HoverExpand className="bg-black/20 p-8 rounded-3xl" />
        </motion.div>
      </section>

      {/* Research Lab */}
      <section id="research" className="relative py-32 px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Particles 
            particleCount={100}
            particleSpread={8}
            speed={0.05}
            particleBaseSize={80}
            alphaParticles={true}
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto relative z-10"
        >
          <h2 className="text-6xl font-black mb-24 tracking-tighter italic playfair">RESEARCH LAB</h2>
          <div className="space-y-8">
            {[
              {
                title: "Detection Engineering",
                desc: "Graph modeling for privilege escalation and lateral movement detection.",
                tags: ["GCP IAM", "Graphs", "Audit Replay"],
              },
              {
                title: "AI Risk Analysis",
                desc: "Readable LLM workflows for high-stakes risk assessment and scoring.",
                tags: ["LLMs", "RAG", "Risk Scoring"],
              },
              {
                title: "Security Product Design",
                desc: "Complex intelligence shaped into calm, inspectable interfaces.",
                tags: ["React", "FastAPI", "UX Systems"],
              },
            ].map((research, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 border border-white/5 rounded-3xl bg-white/[0.01] hover:border-white/20 transition-all backdrop-blur-sm"
              >
                <h3 className="text-2xl font-black mb-4">{research.title}</h3>
                <p className="text-white/40 text-lg mb-6">{research.desc}</p>
                <div className="flex gap-2 flex-wrap">
                  {research.tags.map((tag, j) => (
                    <span key={j} className="px-3 py-1 border border-white/10 rounded-full text-xs space-mono opacity-50">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Timeline / Path */}
      <section id="timeline" className="relative py-32 px-6 md:px-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-6xl font-black mb-24 tracking-tighter italic playfair text-right">EDUCATION</h2>
          <div className="space-y-12">
            {[
              { year: "2023 — PRESENT", title: "B.Tech Computer Science", institution: "GITAM University" },
              { year: "2023", title: "Intermediate (MPC)", institution: "ASCENT Junior College" },
            ].map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="border-b border-white/5 pb-12 group hover:border-white/10 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="space-mono text-xs opacity-30 mb-3">{edu.year}</p>
                    <h3 className="text-4xl font-black group-hover:italic transition-all">{edu.title}</h3>
                  </div>
                  <span className="text-lg opacity-10">{edu.institution}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Achievements */}
      <section id="achievements" className="relative py-32 px-6 md:px-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-6xl font-black mb-24 tracking-tighter italic playfair">WINS & CREDENTIALS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {[
              { title: "AI Agent Olympics Milan", year: "2026", desc: "Hackathon Finalist" },
              { title: "SIH 2024 National Stage", year: "2024", desc: "Smart India Hackathon" },
              { title: "Cloud Security Competitions", year: "2025-2026", desc: "Active Participant" },
              { title: "Vulnerability Researcher", year: "Ongoing", desc: "HackerOne & Intigriti" },
            ].map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 border border-white/5 rounded-3xl bg-white/[0.01] hover:border-white/20 transition-all"
              >
                <h3 className="text-xl font-black mb-2">{achievement.title}</h3>
                <p className="text-white/40 text-sm space-mono mb-3">{achievement.year} · {achievement.desc}</p>
              </motion.div>
            ))}
          </div>

          <h3 className="text-3xl font-black mb-8">Verified Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, i) => (
              <motion.a
                key={i}
                href={cert.link}
                target={cert.link.startsWith("http") ? "_blank" : "_self"}
                rel={cert.link.startsWith("http") ? "noopener noreferrer" : ""}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.3)" }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="group p-0 border border-white/10 rounded-2xl overflow-hidden bg-white/[0.01] hover:border-white/20 transition-all cursor-pointer"
              >
                {cert.image && (
                  <div className="w-full h-48 overflow-hidden bg-black/20">
                    <img 
                      src={cert.image} 
                      alt={cert.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-4">
                  <p className="font-black text-sm">{cert.name}</p>
                  <p className="text-white/40 text-xs space-mono mt-2">{cert.date}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative min-h-screen flex flex-col items-center justify-center py-32 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-[14vw] font-black tracking-tighter playfair italic leading-none mb-16">
            <TextRoll center>INITIATE</TextRoll>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="space-mono text-xs opacity-30 mb-6">PRIMARY CONTACT</p>
            <motion.a
              href="mailto:tejaswanthsurisetty@gmail.com"
              className="text-4xl md:text-6xl font-light hover:italic transition-all duration-500 underline underline-offset-[20px] decoration-white/10 block"
              whileHover={{ scale: 1.05, color: "#ffffff" }}
            >
              tejaswanthsurisetty@gmail.com
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="space-mono text-xs opacity-30 mb-6">EXTERNAL LINKS</p>
            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
              <motion.a
                href="https://github.com/Tejaswanth2406"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.3)" }}
                className="p-4 border border-white/10 rounded-lg opacity-40 hover:opacity-100 transition-all font-black"
              >
                GitHub
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/tejaswanth-surisetty-590322312/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.3)" }}
                className="p-4 border border-white/10 rounded-lg opacity-40 hover:opacity-100 transition-all font-black"
              >
                LinkedIn
              </motion.a>
              <motion.a
                href="hire_me.html"
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.3)" }}
                className="p-4 border border-white/10 rounded-lg opacity-40 hover:opacity-100 transition-all font-black"
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 space-mono text-[9px] opacity-10 tracking-[1em] uppercase"
          >
            2026 TEJASWANTH SURISETTY • MOTION_PORTFOLIO
          </motion.p>
        </motion.div>
      </section>
    </div>
  )
}

export default MotionPortfolio
