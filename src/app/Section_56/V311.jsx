import { useRef, useEffect, useState } from 'react';

export default function V311() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const animationRef = useRef(null);

  // Particle class for sparkle effects
  class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.life = 1;
      this.decay = Math.random() * 0.02 + 0.01;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life -= this.decay;
      this.size *= 0.99;
    }
    
    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.life;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePos({ x, y });
    
    // Create new particles at mouse position
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    const newParticles = [];
    
    for (let i = 0; i < 8; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      newParticles.push(new Particle(x, y, color));
    }
    
    setParticles(prev => [...prev, ...newParticles]);
  };

  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Clear canvas with semi-transparent black for trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    setParticles(prev => {
      const updatedParticles = prev
        .map(particle => {
          particle.update();
          return particle;
        })
        .filter(particle => particle.life > 0);

      // Draw all particles
      updatedParticles.forEach(particle => {
        particle.draw(ctx);
      });

      return updatedParticles;
    });

    // Draw main cursor sparkle
    drawCursorSparkle(ctx, mousePos.x, mousePos.y);

    animationRef.current = requestAnimationFrame(animate);
  };

  const drawCursorSparkle = (ctx, x, y) => {
    if (x === 0 && y === 0) return;

    const time = Date.now() * 0.001;
    
    // Main cursor glow
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.5, 'rgba(100, 200, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(100, 200, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Rotating sparkles around cursor
    for (let i = 0; i < 8; i++) {
      const angle = time * 2 + (i * Math.PI / 4);
      const radius = 15 + Math.sin(time * 3 + i) * 5;
      const sparkleX = x + Math.cos(angle) * radius;
      const sparkleY = y + Math.sin(angle) * radius;
      
      const sparkleGradient = ctx.createRadialGradient(
        sparkleX, sparkleY, 0, sparkleX, sparkleY, 4
      );
      sparkleGradient.addColorStop(0, `hsl(${i * 45}, 100%, 70%)`);
      sparkleGradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = sparkleGradient;
      ctx.beginPath();
      ctx.arc(sparkleX, sparkleY, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Direction trail effect
    const trailLength = 30;
    for (let i = 0; i < trailLength; i++) {
      const progress = i / trailLength;
      const trailX = x - (mousePos.dx || 0) * progress * 2;
      const trailY = y - (mousePos.dy || 0) * progress * 2;
      const size = 3 * (1 - progress);
      const alpha = 0.3 * (1 - progress);
      
      ctx.fillStyle = `rgba(100, 200, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(trailX, trailY, size, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const resizeCanvas = () => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const container = containerRef.current;
    const canvas = canvasRef.current;
    
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    resizeCanvas();
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Event listeners
    container.addEventListener('mousemove', handleMouseMove);
    
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      container.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full bg-black overflow-hidden">
      
      {/* Sparkle Cursor Container */}
      <div 
        ref={containerRef} 
        className="relative w-full h-[200px] cursor-none bg-black"
      >
        <canvas 
          ref={canvasRef} 
          className="w-full h-full block"
        />
        
        {/* Simple instruction overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <p className="text-white/60 text-sm font-light tracking-wide">
            Move your cursor to see sparkle effects
          </p>
        </div>
      </div>
    </div>
  );
}