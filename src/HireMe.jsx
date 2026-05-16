import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Star } from 'lucide-react';

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

const TiltCard = ({ title, value, href }) => {
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
      className="group relative block bg-paper p-8 text-ink no-underline overflow-hidden border border-transparent"
    >
      <div className="absolute inset-0 bg-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 translate-z-12">
        <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-50 mb-4">{title}</h3>
        <div className="font-display text-lg md:text-xl font-normal break-words">{value}</div>
      </div>
      
      <div className="absolute bottom-6 right-6 opacity-30 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 z-10">
        <ArrowUpRight size={24} />
      </div>
    </motion.a>
  );
};

export default function HireMe() {
  const [formStatus, setFormStatus] = useState({ state: 'idle', message: '' });

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
    <div className="relative w-full max-w-[1400px] mx-auto px-[5%] py-[60px] flex-grow flex flex-col lg:flex-row gap-[60px] z-20">
      
      {/* Vertical Brand */}
      <div className="relative lg:w-[180px] w-full shrink-0 mb-10 lg:mb-0">
        <motion.h1 
          initial={{ clipPath: 'inset(0 0 100% 0)', y: 100 }}
          animate={{ clipPath: 'inset(0 0 0 0)', y: 0 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="font-syne text-[80px] lg:text-[clamp(60px,10vw,140px)] font-extrabold text-skyblue leading-[0.8] lg:[writing-mode:vertical-lr] uppercase tracking-[-0.05em] lg:sticky lg:top-[60px] whitespace-nowrap"
        >
          HIRE ME
        </motion.h1>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col gap-12">
        
        {/* Header Deco */}
        <Reveal>
          <div className="flex justify-between items-center pb-6 border-b border-[#f2ede4] border-opacity-20">
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase opacity-70">Tejaswanth Surisetty</span>
            <span className="deco-star text-skyblue">✦</span>
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase opacity-70">Availability: Mid-2026</span>
          </div>
        </Reveal>

        {/* Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 items-start">
          <Reveal delay={0.1} className="flex flex-col gap-6">
            <h2 className="font-display text-[clamp(32px,5vw,64px)] font-bold italic leading-[1.1]">
              Ready to solve complex problems.
            </h2>
            <p className="text-lg leading-[1.6] opacity-80 max-w-[440px]">
              Bringing a unique blend of offensive security research and agentic AI development. I build systems that don't just work, but adapt and defend.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="border border-[#f2ede4] border-opacity-10 p-[2px]"
            >
              <div className="bg-[#f2ede4] bg-opacity-5 h-[340px] flex items-center justify-center overflow-hidden relative">
                <svg width="100%" height="100%" viewBox="0 0 400 340" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M200 170L240 130L200 90L160 130L200 170Z" fill="currentColor" className="text-skyblue opacity-10" />
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="font-syne text-[240px] font-extrabold opacity-5" fill="currentColor">T</text>
                </svg>
              </div>
            </motion.div>
          </Reveal>
        </div>

        {/* Contact Form */}
        <Reveal delay={0.2} className="mt-6 p-12 bg-[#f2ede4] bg-opacity-[0.03] border border-[#f2ede4] border-opacity-10">
          <h3 className="font-display text-3xl mb-8 italic">Quick Message</h3>
          <form onSubmit={handleSubmit} action="https://formspree.io/f/tejaswanthsurisetty@gmail.com" method="POST">
            <div className="mb-6 flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">Your Name</label>
              <input type="text" name="name" required placeholder="Enter your name" className="bg-transparent border-b border-ink/10 py-3 text-ink font-serif text-lg outline-none transition-colors focus:border-skyblue" />
            </div>
            <div className="mb-6 flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">Your Email</label>
              <input type="email" name="_replyto" required placeholder="mail@example.com" className="bg-transparent border-b border-ink/10 py-3 text-ink font-serif text-lg outline-none transition-colors focus:border-skyblue" />
            </div>
            <div className="mb-6 flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">Message</label>
              <textarea name="message" rows="4" required placeholder="Let's build something..." className="bg-transparent border-b border-ink/10 py-3 text-ink font-serif text-lg outline-none transition-colors focus:border-skyblue min-h-[120px] resize-y"></textarea>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={formStatus.state === 'loading'}
              className="group relative overflow-hidden min-w-[200px] bg-ink text-paper py-4 font-syne font-bold uppercase tracking-[0.1em] z-10 transition-colors hover:text-ink disabled:opacity-70 disabled:pointer-events-none"
            >
              <span className="absolute inset-0 bg-skyblue origin-right scale-x-0 transition-transform duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:origin-left group-hover:scale-x-100 -z-10" />
              {formStatus.state === 'loading' ? 'Sending...' : 'Submit Message →'}
            </motion.button>
            
            {formStatus.state !== 'idle' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-5 font-mono text-xs ${formStatus.state === 'success' ? 'text-skyblue' : formStatus.state === 'error' ? 'text-[#9e4220]' : 'text-ink-70'}`}
              >
                {formStatus.message}
              </motion.div>
            )}
          </form>
        </Reveal>

        {/* Contact Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[2px] bg-[#f2ede4] bg-opacity-10 border border-[#f2ede4] border-opacity-10">
          <Reveal delay={0.3}>
            <TiltCard title="Send an Inquiry" value="tejaswanthsurisetty@gmail.com" href="mailto:tejaswanthsurisetty@gmail.com" />
          </Reveal>
          <Reveal delay={0.4}>
            <TiltCard title="Professional Network" value="LinkedIn Profile" href="https://www.linkedin.com/in/tejaswanth-surisetty-590322312/" />
          </Reveal>
          <Reveal delay={0.4}>
            <TiltCard title="Code & Research" value="GitHub Repository" href="https://github.com/Tejaswanth2406" />
          </Reveal>
        </div>

        {/* Actions & Footer Deco */}
        <Reveal delay={0.4} className="flex justify-end py-10">
          <motion.a 
            whileHover={{ backgroundColor: '#1a1510', color: '#f4f1ea' }}
            href="index.html" 
            className="font-mono text-xs uppercase tracking-[0.1em] text-ink py-3 px-6 border border-ink/20 transition-all duration-300"
          >
            ← Back to Portfolio
          </motion.a>
        </Reveal>

        <Reveal delay={0.4} className="flex justify-between items-center pt-6 border-t border-ink/10 mt-auto text-ink-70 pb-10">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase">Neural Defense</span>
          <span className="deco-star text-skyblue">✦</span>
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase">Protocol Zero</span>
          <span className="deco-star text-skyblue">✦</span>
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase">Ghost Circuit</span>
        </Reveal>

      </div>
    </div>
  );
}
