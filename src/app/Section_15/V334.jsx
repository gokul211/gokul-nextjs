import React, { useEffect, useRef, useState } from 'react';

export default function V334() {
  const hoverGridRef = useRef(null);
  const heroLogoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const lastActivatedIndexRef = useRef(-1);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Load Spline viewer script immediately
    if (!window.customElements.get('spline-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.10.77/build/spline-viewer.js';
      script.onload = () => setSplineLoaded(true);
      document.head.appendChild(script);
    } else {
      setSplineLoaded(true);
    }
  }, []);

  useEffect(() => {
    const gridCols = isMobile ? 6 : 12;
    const gridRows = isMobile ? 5 : 8;
    const totalCells = gridCols * gridRows;

    // Mouse move handler for grid effect
    const handleMouseMove = (e) => {
      if (!hoverGridRef.current) return;

      const rect = hoverGridRef.current.getBoundingClientRect();
      const col = Math.floor((e.clientX - rect.left) / (rect.width / gridCols));
      const row = Math.floor((e.clientY - rect.top) / (rect.height / gridRows));
      const centerIndex = row * gridCols + col;

      if (centerIndex >= 0 && centerIndex < totalCells && centerIndex !== lastActivatedIndexRef.current) {
        lastActivatedIndexRef.current = centerIndex;
        const cell = hoverGridRef.current?.children[centerIndex];

        if (cell && !cell.classList.contains('active')) {
          cell.classList.add('active');

          setTimeout(() => {
            cell?.classList.remove('active');
          }, 2000);
        }
      }

      // Parallax effect on logo
      if (heroLogoRef.current) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.008;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.008;
        heroLogoRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      if (hoverGridRef.current) {
        Array.from(hoverGridRef.current.children).forEach(cell => {
          cell.classList.remove('active');
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile]);

  const GridCell = () => (
    <div className="relative opacity-0 grid-cell">
      <div className="border-line-top" />
      <div className="border-right" />
      <div className="border-line-bottom" />
      <div className="border-left" />
      <div className="bg-overlay" />
      <div className="dot-tl" />
      <div className="dot-tr" />
      <div className="dot-br" />
      <div className="dot-bl" />
    </div>
  );

  const gridCols = isMobile ? 6 : 12;
  const gridRows = isMobile ? 5 : 8;
  const totalCells = gridCols * gridRows;

  return (
    <>
      <style jsx global>{`

        .grid-cell .border-line-top,
        .grid-cell .border-line-bottom,
        .grid-cell .border-left,
        .grid-cell .border-right {
          position: absolute;
          background: rgba(255, 31, 143, 0.4);
          opacity: 0;
        }

        .grid-cell .border-line-top {
          top: 0;
          left: 0;
          width: 0;
          height: 1px;
          transition: width 0.3s ease, opacity 0.3s ease;
        }

        .grid-cell .border-right {
          top: 0;
          right: 0;
          width: 1px;
          height: 0;
          transition: height 0.3s ease 0.3s, opacity 0.3s ease 0.3s;
        }

        .grid-cell .border-line-bottom {
          bottom: 0;
          right: 0;
          width: 0;
          height: 1px;
          transition: width 0.3s ease 0.6s, opacity 0.3s ease 0.6s;
        }

        .grid-cell .border-left {
          bottom: 0;
          left: 0;
          width: 1px;
          height: 0;
          transition: height 0.3s ease 0.9s, opacity 0.3s ease 0.9s;
        }

        .grid-cell .bg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 31, 143, 0.08);
          opacity: 0;
          transition: opacity 0.3s ease 1.2s;
        }

        .grid-cell.active {
          opacity: 1;
        }

        .grid-cell.active .border-line-top {
          width: 100%;
          opacity: 1;
        }

        .grid-cell.active .border-right {
          height: 100%;
          opacity: 1;
        }

        .grid-cell.active .border-line-bottom {
          width: 100%;
          opacity: 1;
        }

        .grid-cell.active .border-left {
          height: 100%;
          opacity: 1;
        }

        .grid-cell.active .bg-overlay {
          opacity: 1;
        }

        .grid-cell .dot-tl,
        .grid-cell .dot-tr,
        .grid-cell .dot-br,
        .grid-cell .dot-bl {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ff1f8f;
          border-radius: 50%;
          opacity: 0;
          transform: scale(0);
        }

        .grid-cell .dot-tl {
          top: -2px;
          left: -2px;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .grid-cell .dot-tr {
          top: -2px;
          right: -2px;
          transition: opacity 0.2s ease 0.3s, transform 0.2s ease 0.3s;
        }

        .grid-cell .dot-br {
          bottom: -2px;
          right: -2px;
          transition: opacity 0.2s ease 0.6s, transform 0.2s ease 0.6s;
        }

        .grid-cell .dot-bl {
          bottom: -2px;
          left: -2px;
          transition: opacity 0.2s ease 0.9s, transform 0.2s ease 0.9s;
        }

        .grid-cell.active .dot-tl,
        .grid-cell.active .dot-tr,
        .grid-cell.active .dot-br,
        .grid-cell.active .dot-bl {
          opacity: 1;
          transform: scale(1);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .hero-logo {
          animation: fadeInUp 1s ease-out 0.3s both;
        }

        .spline-badge {
          animation: fadeIn 1.5s ease-out;
        }

        .logo-img {
          transition: all 0.3s ease;
        }

        .logo-img:hover {
          transform: translateY(-15px) scale(1.1);
          filter: drop-shadow(0 0 30px rgba(196, 255, 97, 0.6));
        }

        spline-viewer {
          width: 100%;
          height: 100%;
        }
      `}</style>

      <section className="h-screen flex items-center justify-center p-16 md:p-8 relative overflow-hidden bg-black">
        {/* Spline Background */}
        <div className="absolute left-0 right-0 top-0 bottom-0 w-full h-full z-[50]" style={{ pointerEvents: 'auto' }}>
          {!isMobile && (
            <div className="absolute top-0 left-0 w-full h-full">
              <spline-viewer url="https://prod.spline.design/AOoX479E09VEZd56/scene.splinecode"></spline-viewer>
            </div>
          )}

          {isMobile && (
            <div className="absolute top-0 left-0 w-full h-full">
              <spline-viewer url="https://prod.spline.design/RFs2rNI65inpncCk/scene.splinecode"></spline-viewer>
            </div>
          )}
        </div>

        {/* Hover Grid */}
        <div
          ref={hoverGridRef}
          className={`absolute inset-0 w-full h-full pointer-events-none z-10 grid gap-0 ${
            isMobile ? 'grid-cols-6 grid-rows-5' : 'grid-cols-12 grid-rows-8'
          }`}
        >
          {Array.from({ length: totalCells }).map((_, i) => (
            <GridCell key={i} />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-[2] w-full h-screen flex items-center justify-center">
          <div
            ref={heroLogoRef}
            className="hero-logo text-center"
          >
            <img
              src="https://salakhov-design.ru/thumb/2/XPJO1S1XzJOIzHtrB7vGLA/640r480/d/green_logo_light_3.svg"
              alt="Salakhov Logo"
              className="logo-img w-full h-auto max-w-[1500px] md:max-w-[1200px] sm:max-w-[820px]"
            />
          </div>
        </div>

        {/* Spline Badge */}
        <div className="spline-badge absolute bottom-10 right-10 md:bottom-5 md:right-5 flex items-center gap-2 px-5 py-3 md:px-4 md:py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm md:text-xs font-medium z-10">
          <div className="w-5 h-5 bg-gradient-to-br from-pink-500 to-lime-300 rounded-full"></div>
          Built with Spline
        </div>
      </section>
    </>
  );
}