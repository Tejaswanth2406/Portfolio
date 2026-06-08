import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const defaultMembers = [
  { name: "Detection", role: "Engineering", image: "https://images.unsplash.com/photo-1526374965328-7f5ae4e8289e?w=400&h=500&fit=crop" },
  { name: "AI Risk", role: "Analysis", image: "https://images.unsplash.com/photo-1485579149c0-123123123123?w=400&h=500&fit=crop" },
  { name: "Cloud", role: "Security", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=500&fit=crop" },
  { name: "LLM", role: "Systems", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=500&fit=crop" },
  { name: "Security", role: "Research", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=500&fit=crop" },
  { name: "Product", role: "Design", image: "https://images.unsplash.com/photo-1507238691854-56c696a03748?w=400&h=500&fit=crop" },
  { name: "Backend", role: "Engineering", image: "https://images.unsplash.com/photo-1516534775068-bb57e5155603?w=400&h=500&fit=crop" },
  { name: "Frontend", role: "Magic", image: "https://images.unsplash.com/photo-1517694712642-f3b5a4c6fb74?w=400&h=500&fit=crop" },
]

function MemberCard({ member, index, isHovered, anyHovered, onHover, onLeave }) {
  const letters = member.name.split("").map((c, i) => ({
    char: c === " " ? "\u00A0" : c,
    i,
  }))

  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      animate={{
        scale: isHovered ? 1.09 : anyHovered ? 0.93 : 1,
        opacity: anyHovered && !isHovered ? 0.38 : 1,
        y: isHovered ? -9 : 0,
      }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      style={{ position: "relative", cursor: "pointer", flexShrink: 0, zIndex: isHovered ? 10 : 1 }}
    >
      <div style={{
        width: "clamp(66px, 8.5vw, 100px)",
        height: "clamp(84px, 11vw, 130px)",
        borderRadius: "13px",
        overflow: "hidden",
        position: "relative",
      }}>
        <motion.img
          src={member.image}
          alt={member.name}
          loading="lazy"
          animate={{ scale: isHovered ? 1.07 : 1 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "12px",
          fontWeight: 600,
          fontSize: "10px",
          color: "#ffffff",
          textAlign: "center",
          overflow: "hidden",
        }}>
          {letters.map((l) => (
            <span key={l.i}>{l.char}</span>
          ))}
        </div>
        <div style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          fontSize: "12px",
          fontWeight: 900,
          color: "rgba(255,255,255,0.6)",
        }}>
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
    </motion.div>
  )
}

export function HoverMembers({ members = defaultMembers, idleText = "EXPERTISE" }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const bgLabel =
    hoveredIndex !== null
      ? members[hoveredIndex].name.toUpperCase()
      : idleText.toUpperCase()

  return (
    <section style={{
      background: "#050505",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', sans-serif",
      overflow: "hidden",
      position: "relative",
      padding: "60px 20px",
    }}>
      {/* Background text */}
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
      }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={bgLabel}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 0.07, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{
              fontSize: "clamp(70px, 14vw, 180px)",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.05em",
              lineHeight: 1,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              userSelect: "none",
            }}
          >
            {bgLabel}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Members row */}
      <div style={{
        display: "flex",
        gap: "clamp(12px, 2vw, 24px)",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 5,
        flexWrap: "wrap",
        maxWidth: "90vw",
      }}>
        {members.map((member, i) => (
          <MemberCard
            key={i}
            member={member}
            index={i}
            isHovered={hoveredIndex === i}
            anyHovered={hoveredIndex !== null}
            onHover={() => setHoveredIndex(i)}
            onLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>

      {/* Bottom name + role */}
      <div style={{
        position: "relative",
        zIndex: 5,
        marginTop: "60px",
        textAlign: "center",
        minHeight: "60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <AnimatePresence mode="wait">
          {hoveredIndex !== null ? (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <motion.p style={{
                fontSize: "32px",
                fontWeight: 900,
                color: "#ffffff",
                margin: 0,
              }}>
                {members[hoveredIndex].name}
              </motion.p>
              <motion.p style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                margin: "8px 0 0 0",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}>
                {members[hoveredIndex].role}
              </motion.p>
            </motion.div>
          ) : (
            <motion.p
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.3)",
                margin: 0,
              }}
            >
              hover to explore expertise areas
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default HoverMembers
