import React, { useState, useEffect, useRef } from 'react';

const navLinks = [
  { name: 'Our Projects', href: '#work' },
  { name: 'Our Crew', href: '#crew' },
  { name: 'Contact Us', href: '#contact' },
];

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      {navLinks.map(link => (
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
      ))}
      {/* Internships Closed Flair */}
      <div className="relative flex items-center">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/30 backdrop-blur-sm">
          <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Internships Closed! :)
        </span>
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