import React, { useRef, useEffect } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
}

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  // FIX: Initialize useRef with a null value and update the type to allow null. The original `useRef<number>()` is invalid as it requires an initial number value.
  const animationFrameId = useRef<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
  const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    const homeSection = document.getElementById('home');

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = (homeSection ? homeSection.offsetHeight : window.innerHeight) * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = (homeSection ? homeSection.offsetHeight : window.innerHeight) + 'px';
      ctx.scale(dpr, dpr);
      createParticles();
    };

    const createParticles = () => {
      particles = [];
  const densityDivisor = prefersReducedMotion ? 40000 : 12000;
  const numberOfParticles = (canvas.width * canvas.height) / densityDivisor;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() * 0.4 - 0.2),
          speedY: (Math.random() * 0.4 - 0.2),
        });
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = event.clientX - rect.left;
      mouseRef.current.y = event.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
        mouseRef.current.x = null;
        mouseRef.current.y = null;
    }

  const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].x += particles[i].speedX;
        particles[i].y += particles[i].speedY;

        if (particles[i].x < 0 || particles[i].x > canvas.width) particles[i].speedX *= -1;
        if (particles[i].y < 0 || particles[i].y > canvas.height) particles[i].speedY *= -1;
        
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(particles[i].x, particles[i].y, particles[i].size, 0, Math.PI * 2);
        ctx.fill();
        
        let mouseDistance = Infinity;
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
            const dx = particles[i].x - mouseRef.current.x;
            const dy = particles[i].y - mouseRef.current.y;
            mouseDistance = Math.sqrt(dx*dx + dy*dy);
            const pushRadius = 100;
            if(mouseDistance < pushRadius) {
                const forceDirectionX = dx / mouseDistance;
                const forceDirectionY = dy / mouseDistance;
                const force = (pushRadius - mouseDistance) / pushRadius;
                const directionX = forceDirectionX * force * 0.5;
                const directionY = forceDirectionY * force * 0.5;
                particles[i].x += directionX;
                particles[i].y += directionY;
            }
        }

        if (!prefersReducedMotion) {
          for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 120) {
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 * (1 - distance / 120)})`;
              ctx.lineWidth = 0.3;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }
      
      animationFrameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    homeSection?.addEventListener('mouseleave', handleMouseLeave);
    
    resizeCanvas();
    animate();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      homeSection?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-[-1]" aria-hidden="true" />;
};

export default InteractiveBackground;