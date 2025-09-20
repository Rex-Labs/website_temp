import React, { useState, useEffect, useRef } from 'react';
import Navigation from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/pages/HomePage';
import OurWorkPage from './components/pages/OurWorkPage';
import OurCrewPage from './components/pages/OurCrewPage';
import ContactUsPage from './components/pages/ContactUsPage';
import ScrollProgressBar from './components/ui/ScrollProgressBar';

// Custom hook for scroll animations
const useScrollAnimation = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.scroll-animation');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1
    });

    elements.forEach(el => {
      observer.observe(el);
    });

    return () => {
      elements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);
};


const App: React.FC = () => {
  useScrollAnimation();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="text-[#F5F5F7]">
      <ScrollProgressBar />
      <Navigation />
      <main>
        <HomePage />
        <OurWorkPage />
        <OurCrewPage />
        <ContactUsPage />
      </main>
      <Footer />
    </div>
  );
};

export default App;