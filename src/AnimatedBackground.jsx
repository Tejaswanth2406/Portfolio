import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-paper">
      {/* Floating Aurora Orbs */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 100, 0],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-mpink blur-[120px] opacity-70"
      />
      
      <motion.div
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 120, -80, 0],
          scale: [1, 0.8, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[-10%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-mcyan blur-[120px] opacity-70"
      />
      
      <motion.div
        animate={{
          x: [0, 80, -120, 0],
          y: [0, 80, -120, 0],
          scale: [1, 1.4, 0.9, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-mcream blur-[120px] opacity-70"
      />

      {/* Linen Texture Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `
            repeating-linear-gradient(to right, rgba(255,255,255,0.03) 0px, transparent 1px, transparent 2px),
            repeating-linear-gradient(to bottom, rgba(255,255,255,0.03) 0px, transparent 1px, transparent 2px)
          `
        }}
      />

      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
