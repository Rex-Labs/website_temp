import React, { useState, useEffect, useRef } from 'react';
import './header.css';

const navLinks = [
  { name: 'Our Projects', href: '#work' },
  { name: 'Our Crew', href: '#crew' },
  { name: 'Contact Us', href: '#contact' },
];

const projectMenuItems = [
  {
    id: 'fridglet',
    title: 'Fridglet',
    description: 'Healthy meals from what’s already in your fridge, with smart AI guidance.',
    image: '/fridglet/showcase.png',
  },
  {
    id: 'vitra',
    title: 'Vitra',
    description: 'All-in-one fitness with sleep, diet, and workouts wrapped in a sleek UI.',
    image: '/vitra/all.png',
  },
  {
    id: 'mongolia',
    title: 'Mongolia',
    description: 'Our AI engine powering predictive wellness across the Rex Labs ecosystem.',
    image: '/magnolia/logo.png',
  },
];

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [closeProjectsDropdown, setCloseProjectsDropdown] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const sectionIdsRef = useRef<string[]>(['home', 'work', 'crew', 'contact']);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      // Scroll spy
      const scrollPos = window.scrollY + window.innerHeight * 0.25;
      let current = 'home';
      for (const id of sectionIdsRef.current) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        if (scrollPos >= top) current = id;
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;
    
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }

    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const NavLinks: React.FC<{ className?: string }> = ({ className }) => (
    <nav className={className}>
      {navLinks.map(link => {
        if (link.name === 'Our Projects') {
          return (
            <div key={link.name} className="relative group">
              <a
                href={link.href}
                onClick={handleSmoothScroll}
                aria-current={activeSection === link.href.replace('#', '') ? 'page' : undefined}
                className={`relative text-sm font-medium transition-colors duration-200 py-2 inline-flex items-center ${activeSection === link.href.replace('#','') ? 'text-white' : 'text-gray-300 hover:text-white'}`}
              >
                {link.name}
                <svg className="ml-2 w-3 h-3 text-current transition-transform duration-300 transform group-hover:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                <span className={`absolute bottom-0 left-0 block h-[2px] bg-white transition-all duration-300 ease-in-out origin-left ${activeSection === link.href.replace('#','') ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'}`} />
              </a>

              <div
                className={`mega-menu absolute left-1/2 mt-3 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible -translate-x-1/2 translate-y-1 group-hover:-translate-x-1/2 group-hover:translate-y-0 transition-all duration-200 ${closeProjectsDropdown ? 'opacity-0 invisible pointer-events-none' : ''}`}
              >
                <div className="mega-menu__inner">
                  {projectMenuItems.map((project) => (
                    <a
                      key={project.id}
                      href={`#${project.id}`}
                      role="menuitem"
                      onClick={(e) => {
                        handleSmoothScroll(e);
                        setCloseProjectsDropdown(true);
                        setTimeout(() => setCloseProjectsDropdown(false), 350);
                      }}
                      className="mega-card"
                    >
                      <div className="mega-card__thumb">
                        <img src={project.image} alt={`${project.title} thumbnail`} />
                      </div>
                      <div className="mega-card__body">
                        <div className="mega-card__title">{project.title}</div>
                        <p className="mega-card__desc">{project.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        return (
          <a
            key={link.name}
            href={link.href}
            onClick={handleSmoothScroll}
            aria-current={activeSection === link.href.replace('#', '') ? 'page' : undefined}
            className={`relative group text-sm font-medium transition-colors duration-200 py-2 ${activeSection === link.href.replace('#','') ? 'text-white' : 'text-gray-300 hover:text-white'}`}
          >
            {link.name}
            <span
              className={`absolute bottom-0 left-0 block h-[2px] bg-white transition-all duration-300 ease-in-out origin-left ${activeSection === link.href.replace('#','') ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'}`}
            />
          </a>
        );
      })}
      {/* Internships Closed Flair */}
      <div className="relative flex items-center space-x-2">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/30 backdrop-blur-sm">
          <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Internships Closed! :)
        </span>
        <a href="https://discord.gg/DcJsgVFHM8" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#5865F2] text-white border border-[#5865F2] backdrop-blur-sm hover:bg-[#4f5bda] transition-colors duration-200">
          <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
          Join our community!
        </a>
      </div>
    </nav>
  );

  return (
    <>
  <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/50 backdrop-blur-lg border-b border-gray-800' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 w-full">
            <a href="#home" onClick={handleSmoothScroll} className="flex items-center group transition-transform duration-300 ease-in-out hover:scale-105">
              <svg
                width="88"
                height="36"
                viewBox="0 0 130 50"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white transition-all duration-300 group-hover:opacity-90 group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.4)]"
                aria-label="Rex Labs Logo"
              >
                <text style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '38px', letterSpacing: '-0.05em' }} x="12" y="35">R</text>
                <circle cx="14" cy="37" r="3" />
                <text style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '38px', letterSpacing: '-0.05em' }} x="36" y="35">E</text>
                <text style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '38px', letterSpacing: '-0.05em' }} x="60" y="35">X</text>
                <circle cx="87" cy="9" r="3" />
                <text style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '12px', letterSpacing: '0.25em' }} x="33" y="48">LABS</text>
              </svg>
            </a>
            <NavLinks className="hidden md:flex items-center space-x-8 ml-auto" />
            <div className="md:hidden ml-auto">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -mr-2 text-gray-300 hover:text-white focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-black/80 backdrop-blur-lg">
          <div className="p-8">
            <NavLinks className="flex flex-col items-start space-y-6" />
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;