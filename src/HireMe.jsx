import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Star, Github, Linkedin, Mail, Shield, Brain, Zap } from 'lucide-react';

// Simple inline Patreon icon (keeps dependency-free)
const PatreonIcon = ({ size = 18, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
    <rect x="2" y="3" width="5" height="18" rx="1" fill="#F96854" />
    <circle cx="15.5" cy="12" r="5.5" fill="#F96854" />
  </svg>
);

const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const TiltCard = ({ title, value, href, icon: Icon, description }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : '_self'}
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="group relative block bg-gradient-to-br from-card to-bg-hover p-8 text-text-primary no-underline overflow-hidden border border-cyan border-opacity-30 rounded-xl cursor-pointer"
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan from-0% via-purple via-50% to-pink to-100% opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      
      {/* Glow effect */}
      <motion.div
        animate={{
          boxShadow: [
            'inset 0 0 0px rgba(0, 217, 255, 0)',
            'inset 0 0 20px rgba(0, 217, 255, 0.1)',
            'inset 0 0 0px rgba(0, 217, 255, 0)',
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0 rounded-xl"
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {Icon && <Icon size={20} className="text-cyan opacity-80 group-hover:opacity-100 transition-opacity" />}
            <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-60">{title}</h3>
          </div>
        </div>
        
        <div className="font-display text-xl md:text-2xl font-bold break-words text-transparent bg-gradient-to-r from-cyan via-text-primary to-pink bg-clip-text mb-3 group-hover:scale-105 transition-transform origin-left">
          {value}
        </div>
        
        {description && (
          <p className="text-sm text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {description}
          </p>
        )}
      </div>
      
      <div className="absolute bottom-6 right-6 opacity-40 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-2 group-hover:-translate-y-2 z-10 text-cyan">
        <motion.div
          animate={{ rotate: [0, 45, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowUpRight size={28} className="font-bold" />
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan to-pink origin-left"
      />
    </motion.a>
  );
};

export default function HireMe() {
  const [formStatus, setFormStatus] = useState({ state: 'idle', message: '' });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    
    setFormStatus({ state: 'loading', message: 'Transmitting data...' });

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setFormStatus({ state: 'success', message: '✦ Message sent successfully. I will get back to you soon.' });
        form.reset();
      } else {
        const result = await response.json().catch(() => ({}));
        setFormStatus({ 
          state: 'error', 
          message: result.errors ? result.errors.map(error => error.message).join(", ") : 'Oops! There was a problem submitting your form.' 
        });
      }
    } catch (error) {
      setFormStatus({ state: 'error', message: 'Connection error. Please check your network and try again.' });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-dark text-text-primary overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          animate={{
            background: [
              'radial-gradient(at 0% 0%, rgba(0, 217, 255, 0.1) 0%, transparent 50%)',
              'radial-gradient(at 100% 100%, rgba(255, 0, 110, 0.1) 0%, transparent 50%)',
              'radial-gradient(at 50% 50%, rgba(131, 56, 236, 0.1) 0%, transparent 50%)',
              'radial-gradient(at 0% 0%, rgba(0, 217, 255, 0.1) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto px-[5%] py-[60px] flex-grow flex flex-col lg:flex-row gap-[60px] z-20">
        
        {/* Vertical Brand */}
        <div className="relative lg:w-[180px] w-full shrink-0 mb-10 lg:mb-0">
          <motion.h1 
            initial={{ clipPath: 'inset(0 0 100% 0)', y: 100 }}
            animate={{ clipPath: 'inset(0 0 0 0)', y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="font-syne text-[60px] lg:text-[clamp(60px,10vw,120px)] font-extrabold text-cyan leading-[0.8] lg:[writing-mode:vertical-lr] uppercase tracking-[-0.05em] lg:sticky lg:top-[60px] whitespace-nowrap"
          >
            ARCHITECT
          </motion.h1>
        </div>

        {/* Main Content */}
        <div className="flex-grow flex flex-col gap-12">
          
          {/* Header Deco */}
          <Reveal>
            <div className="flex justify-between items-center pb-6 border-b border-cyan border-opacity-10">
              <span className="font-mono text-[11px] tracking-[0.3em] uppercase opacity-70">Tejaswanth Surisetty</span>
              <span className="text-cyan opacity-70">✦</span>
              <span className="font-mono text-[11px] tracking-[0.3em] uppercase opacity-70">Security • AI • Engineering</span>
            </div>
          </Reveal>

          {/* Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 items-start">
            <Reveal delay={0.1} className="flex flex-col gap-6">
              <h2 className="font-display text-[clamp(36px,5vw,68px)] font-bold leading-[1.1] text-text-primary">
                I build intelligent systems that{' '}
                <span className="bg-gradient-to-r from-cyan via-pink to-purple bg-clip-text text-transparent">
                  secure the future.
                </span>
              </h2>
              <p className="text-lg leading-[1.7] text-text-secondary max-w-[480px]">
                Security research meets AI engineering. I architect defense systems that think, adapt, and anticipate threats before they strike.
              </p>
              <div className="flex gap-3 pt-2 flex-wrap">
                <Reveal delay={0.15}>
                  <motion.a
                    href="https://github.com/Tejaswanth2406"
                    target="_blank"
                    whileHover={{ y: -4, scale: 1.1 }}
                    className="group p-3 bg-card border border-cyan border-opacity-40 rounded-lg hover:bg-cyan hover:bg-opacity-15 transition-all hover:border-opacity-100 cursor-pointer"
                    title="View my GitHub"
                  >
                    <Github size={20} className="text-cyan group-hover:scale-110 transition-transform" />
                  </motion.a>
                </Reveal>
                <Reveal delay={0.2}>
                  <motion.a
                    href="https://www.linkedin.com/in/tejaswanth-surisetty-590322312/"
                    target="_blank"
                    whileHover={{ y: -4, scale: 1.1 }}
                    className="group p-3 bg-card border border-pink border-opacity-40 rounded-lg hover:bg-pink hover:bg-opacity-15 transition-all hover:border-opacity-100 cursor-pointer"
                    title="Connect on LinkedIn"
                  >
                    <Linkedin size={20} className="text-pink group-hover:scale-110 transition-transform" />
                  </motion.a>
                </Reveal>
                <Reveal delay={0.25}>
                  <motion.a
                    href="mailto:tejaswanthsurisetty@gmail.com"
                    whileHover={{ y: -4, scale: 1.1 }}
                    className="group p-3 bg-card border border-purple border-opacity-40 rounded-lg hover:bg-purple hover:bg-opacity-15 transition-all hover:border-opacity-100 cursor-pointer"
                    title="Send me an email"
                  >
                    <Mail size={20} className="text-purple group-hover:scale-110 transition-transform" />
                  </motion.a>
                </Reveal>
                <Reveal delay={0.28}>
                  <motion.a
                    href="https://www.patreon.com/c/TejaswanthSurisetty"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.04 }}
                    className="group inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-rose-600 to-rose-400 text-white rounded-md shadow-md transition-transform"
                    title="Support on Patreon"
                    aria-label="Support on Patreon"
                  >
                    <PatreonIcon size={18} className="flex-shrink-0" />
                    <span className="text-sm font-medium">Patreon</span>
                  </motion.a>
                </Reveal>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <motion.div 
                animate={{
                  boxShadow: [
                    '0 0 60px rgba(0, 217, 255, 0.2)',
                    '0 0 80px rgba(255, 0, 110, 0.2)',
                    '0 0 60px rgba(131, 56, 236, 0.2)',
                    '0 0 60px rgba(0, 217, 255, 0.2)',
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                whileHover={{ scale: 1.02 }}
                className="border border-cyan border-opacity-20 p-[2px] rounded-xl overflow-hidden"
              >
                <div className="bg-card bg-opacity-50 h-[340px] flex items-center justify-center overflow-hidden relative rounded-lg">
                  <svg width="100%" height="100%" viewBox="0 0 400 340" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#ff006e" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                    <circle cx="200" cy="170" r="80" fill="url(#gradient1)" opacity="0.2" />
                    <text x="50%" y="45%" dominantBaseline="middle" textAnchor="middle" className="font-syne text-[200px] font-extrabold opacity-20" fill="currentColor">T</text>
                    <text x="50%" y="75%" dominantBaseline="middle" textAnchor="middle" className="font-mono text-xs opacity-30" fill="currentColor">Neural • Secure • Resilient</text>
                  </svg>
                </div>
              </motion.div>
            </Reveal>
          </div>

          {/* Contact Form */}
          <Reveal delay={0.3} className="mt-8 p-8 lg:p-12 bg-card bg-opacity-30 border border-cyan border-opacity-10 rounded-xl backdrop-blur-sm">
            <h3 className="font-display text-3xl mb-8">Quick Message</h3>
            <form onSubmit={handleSubmit} action="https://formspree.io/f/tejaswanthsurisetty@gmail.com" method="POST">
              <div className="mb-6 flex flex-col gap-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">Your Name</label>
                <input type="text" name="name" required placeholder="Enter your name" className="bg-transparent border-b border-cyan border-opacity-20 py-3 text-text-primary font-serif text-lg outline-none transition-colors focus:border-cyan focus:border-opacity-60 placeholder-text-secondary placeholder-opacity-50" />
              </div>
              <div className="mb-6 flex flex-col gap-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">Your Email</label>
                <input type="email" name="_replyto" required placeholder="mail@example.com" className="bg-transparent border-b border-cyan border-opacity-20 py-3 text-text-primary font-serif text-lg outline-none transition-colors focus:border-cyan focus:border-opacity-60 placeholder-text-secondary placeholder-opacity-50" />
              </div>
              <div className="mb-6 flex flex-col gap-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">Message</label>
                <textarea name="message" rows="4" required placeholder="Let's build something secure..." className="bg-transparent border-b border-cyan border-opacity-20 py-3 text-text-primary font-serif text-lg outline-none transition-colors focus:border-cyan focus:border-opacity-60 min-h-[120px] resize-y placeholder-text-secondary placeholder-opacity-50" />
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={formStatus.state === 'loading'}
                className="group relative overflow-hidden min-w-[200px] bg-gradient-to-r from-cyan to-pink text-dark py-4 px-8 font-syne font-bold uppercase tracking-[0.1em] z-10 transition-all rounded-lg hover:shadow-lg hover:shadow-cyan/50 disabled:opacity-70 disabled:pointer-events-none"
              >
                {formStatus.state === 'loading' ? 'Sending...' : 'Send Message →'}
              </motion.button>
              
              {formStatus.state !== 'idle' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-5 font-mono text-xs ${formStatus.state === 'success' ? 'text-cyan' : formStatus.state === 'error' ? 'text-pink' : 'text-text-secondary'}`}
                >
                  {formStatus.message}
                </motion.div>
              )}
            </form>
          </Reveal>

          {/* Contact Grid */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4">
            <Reveal delay={0.4}>
              <TiltCard 
                title="Email" 
                value="Get in touch"
                description="tejaswanthsurisetty@gmail.com"
                href="mailto:tejaswanthsurisetty@gmail.com" 
                icon={Mail} 
              />
            </Reveal>
            <Reveal delay={0.5}>
              <TiltCard 
                title="Professional" 
                value="Connect with me"
                description="LinkedIn • Full profile"
                href="https://www.linkedin.com/in/tejaswanth-surisetty-590322312/" 
                icon={Linkedin} 
              />
            </Reveal>
            <Reveal delay={0.6}>
              <TiltCard 
                title="Code" 
                value="See my work"
                description="GitHub • Projects & Research"
                href="https://github.com/Tejaswanth2406" 
                icon={Github} 
              />
            </Reveal>
            <Reveal delay={0.7}>
              <TiltCard
                title="Support"
                value="Become a patron"
                description="Support my work on Patreon"
                href="https://www.patreon.com/c/TejaswanthSurisetty"
                icon={PatreonIcon}
              />
            </Reveal>
          </div>

          {/* Tech Stack & Footer */}
          <Reveal delay={0.5} className="mt-12 pt-10 border-t border-cyan border-opacity-10">
            <div className="flex flex-col gap-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-70 mb-4">Expertise</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { icon: Shield, text: 'Security Research' },
                    { icon: Brain, text: 'AI/LLM Systems' },
                    { icon: Zap, text: 'Cloud Architecture' },
                  ].map((item, idx) => (
                    <motion.div key={idx} whileHover={{ x: 5 }} className="flex items-center gap-2 text-sm text-text-secondary">
                      <item.icon size={16} className="text-cyan" />
                      {item.text}
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 text-text-tertiary">
                <span className="font-mono text-[11px] tracking-[0.3em] uppercase">Neural Defense</span>
                <span className="text-cyan opacity-70">✦</span>
                <span className="font-mono text-[11px] tracking-[0.3em] uppercase">Protocol Zero</span>
                <span className="text-cyan opacity-70">✦</span>
                <span className="font-mono text-[11px] tracking-[0.3em] uppercase">Ghost Circuit</span>
              </div>
            </div>
          </Reveal>

          {/* Back Button */}
          <Reveal delay={0.6} className="flex justify-end py-6">
            <motion.a 
              whileHover={{ backgroundColor: 'rgba(0, 217, 255, 0.1)', x: -5 }}
              href="index.html" 
              className="font-mono text-xs uppercase tracking-[0.1em] text-cyan py-3 px-6 border border-cyan border-opacity-30 transition-all rounded-lg"
            >
              ← Back to Portfolio
            </motion.a>
          </Reveal>

        </div>
      </div>
    </div>
  );
}
