import React, { useState, useEffect } from 'react';
import InteractiveBackground from '../InteractiveBackground';
import AnimatedCounter from '../ui/AnimatedCounter';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

interface Stat { value: string; label: string }
const stats: Stat[] = [
  { value: '3+', label: 'Projects in the Works' },
  { value: '50+', label: 'Active Team Members' },
  { value: '5+', label: 'Years Combined Experience' },
];

const HomePage: React.FC = () => {
  const headingText = "Rex Labs.";
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      // Hide indicator if scrolled more than 50px
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative overflow-hidden min-h-screen flex items-center justify-center py-24 sm:py-32">
      <InteractiveBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-extrabold tracking-tighter scroll-animation will-change-transform relative inline-block">
            {headingText.split('').map((letter, index) => {
              const delay = index * 50;
              return (
                <span
                  key={index}
                  className="animate-letter inline-block [text-shadow:0_4px_16px_rgba(255,255,255,0.15)]"
                  style={{ animationDelay: `${delay}ms`, transform: prefersReducedMotion ? 'none' : undefined }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              );
            })}
          </h1>
          <p className="mt-6 text-xl sm:text-2xl text-gray-400 leading-relaxed scroll-animation" style={{ transitionDelay: '600ms' }}>
            To build affordable, easy-to-use apps that make wellness accessible to everyone, empowering individuals to take control of their health proactively.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => {
            const numeric = parseInt(stat.value, 10) || 0;
            const suffix = stat.value.replace(/\d+/g, '') || '+';
            return (
              <div
                key={stat.label}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 scroll-animation group"
                style={{ transitionDelay: `${800 + index * 150}ms` }}
              >
                <div className="text-center">
                  <p className="text-5xl font-bold tracking-tighter">
                    <AnimatedCounter target={numeric} suffix={suffix} />
                  </p>
                  <p className="mt-2 text-gray-300 group-hover:text-white transition-colors text-lg font-semibold whitespace-nowrap">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <a 
        href="#work"
        onClick={handleScrollClick}
        className={`scroll-down-indicator ${!showScrollIndicator ? 'hidden' : ''}`}
        aria-label="Scroll to next section"
      >
        <div className="scroll-circle">
          <div className="scroll-arrow"></div>
        </div>
      </a>
    </section>
  );
};

export default HomePage;