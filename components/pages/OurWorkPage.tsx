import React, { useState, useRef, useEffect } from 'react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

// Project data with hardcoded base64 encoded SVG images
const projectsData = [
  {
    slug: 'fridglet',
    title: 'Fridglet',
    description: "Fridglet brings healthy dieting and eating habits to everyone. It allows you to eat healthy without breaking the bank by using ingredients you already have.",
    tags: ['Nutrition', 'AI','Health', 'COMING SOON'],
  images: [
    '/fridglet/showcase.png',
    '/fridglet/scan.png',
    '/fridglet/wow.png'
  ],
  },
  {
    slug: 'vitra',
        title: 'Vitra',
    description: 'Vitra is an all-in-one fitness app that allows you to plan and track your sleep, diet, and workouts. Featuring a clean and sleek UI, Vitra makes it easy for anyone to be healthy.',
    tags: ['Fitness', 'AI', 'Mobile', 'COMING 2026'],
    images: [
      '/vitra/all.png',
      '/vitra/dash.png',
      '/vitra/workout.png'
    ]
  },
  {
    slug: 'mongolia',
    title: 'Mangolia AI Engine',
    description: 'The core artificial intelligence powering our ecosystem of health apps. Mangolia is being developed to provide personalized, predictive, and proactive wellness insights.',
    tags: ['Core Tech', 'AI', 'ML', 'COMING 2035'],
    images: [
        '/magnolia/logo.png',
        '/magnolia/logo.png',
        '/magnolia/logo.png'
      ]
  },
];

interface ProjectData {
  title: string;
  description: string;
  tags: string[];
  images: string[];
}

const Project: React.FC<{ project: ProjectData; index: number }> = ({ project, index }) => {
  const isReversed = index % 2 !== 0;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const carouselTimerRef = useRef<number | null>(null);

  const images = project.images || [];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToImage = (imageIndex: number) => {
    setCurrentImageIndex(imageIndex);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !imageContainerRef.current) return;
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    const rotateX = -10 * (y - 0.5);
    const rotateY = 10 * (x - 0.5);
    imageContainerRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    if (!imageContainerRef.current) return;
    imageContainerRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  // Auto advance carousel for subtle motion if multiple images
  useEffect(() => {
    if (prefersReducedMotion || images.length < 2) return;
    const advance = () => {
      nextImage();
      carouselTimerRef.current = window.setTimeout(advance, 4000 + Math.random() * 2000);
    };
    carouselTimerRef.current = window.setTimeout(advance, 3500);
    return () => {
      if (carouselTimerRef.current) window.clearTimeout(carouselTimerRef.current);
    };
  }, [images.length, prefersReducedMotion]);

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-24`}>
      <div
        className={`scroll-animation ${isReversed ? 'lg:order-2' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
  <div ref={imageContainerRef} className="group rounded-2xl overflow-hidden shadow-2xl shadow-black/30 relative transition-transform duration-300 ease-out will-change-transform" style={{ willChange: 'transform' }}>
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/20 p-4">
            {images.map((src, idx) => (
              <div
                key={idx}
                className={`absolute top-4 left-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] rounded-lg overflow-hidden flex items-center justify-center bg-black/10 transition-opacity duration-500 ease-in-out ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                style={{ aspectRatio: '16/10' }}
              >
                <img
                  src={src}
                  alt={`${project.title} screenshot ${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                  style={{ background: '#181818' }}
                />
              </div>
            ))}
          </div>
          {images.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute top-1/2 left-6 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hover:bg-black/50" aria-label="Previous image">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={nextImage} className="absolute top-1/2 right-6 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hover:bg-black/50" aria-label="Next image">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {images.map((_, idx) => (
                  <button key={idx} onClick={() => goToImage(idx)} className={`w-2 h-2 rounded-full transition-colors duration-300 ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white'}`} aria-label={`Go to image ${idx + 1}`}></button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className={`scroll-animation ${isReversed ? 'lg:order-1' : ''}`} style={{ transitionDelay: '200ms' }}>
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 sm:p-12 rounded-2xl text-center lg:text-left">
          <h3 className="text-4xl sm:text-5xl font-bold tracking-tighter">{project.title}</h3>
          <p className="mt-6 text-lg sm:text-xl text-gray-400 leading-relaxed">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
            {project.tags.map(tag => (
              <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 text-gray-300 text-sm font-medium rounded-full backdrop-blur-sm transition-all duration-200 ease-in-out hover:bg-white/20 hover:scale-105">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


const OurWorkPage: React.FC = () => {
  return (
    <section id="work" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
        <div className="text-center max-w-4xl mx-auto scroll-animation">
          <h2 className="text-5xl sm:text-7xl font-extrabold tracking-tighter">Crafted with purpose.</h2>
          <p className="mt-6 text-xl sm:text-2xl text-gray-400 leading-relaxed">
            A glimpse into the innovative solutions we're building to revolutionize digital health and wellness.
          </p>
        </div>
        <div className="space-y-24 sm:space-y-32">
          {projectsData.map((project, index) => (
            <section key={project.title} id={(project as any).slug}>
              <Project project={project as any} index={index} />
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurWorkPage;