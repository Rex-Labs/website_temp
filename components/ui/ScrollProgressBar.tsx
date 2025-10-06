import React, { useEffect } from 'react';

// A lightweight scroll progress bar that scales via a CSS variable.
const ScrollProgressBar: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      document.documentElement.style.setProperty('--scroll-progress', progress.toString());
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
      <div className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-white/80 via-white to-white/60 shadow-[0_0_10px_-2px_rgba(255,255,255,0.5)]" style={{ transform: 'scaleX(var(--scroll-progress, 0))', transition: 'transform 0.1s linear' }} />
    </div>
  );
};

export default ScrollProgressBar;
