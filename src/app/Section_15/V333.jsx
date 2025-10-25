import React, { useEffect, useRef, useState } from 'react';

export default function V333() {
  const hoverGridRef = useRef(null);
  const heroLogoRef = useRef(null);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const lastActivatedIndexRef = useRef(-1);

  useEffect(() => {
    // Load Spline viewer script immediately
    if (!window.customElements.get('spline-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.9.98/build/spline-viewer.js';
      script.onload = () => setSplineLoaded(true);
      document.head.appendChild(script);
    } else {
      setSplineLoaded(true);
    }
  }, []);

  useEffect(() => {
    const gridCols = 6;
    const gridRows = 5;
    const totalCells = gridCols * gridRows;

    // Touch move handler for grid effect
    const handleTouchMove = (e) => {
      if (!hoverGridRef.current) return;

      const touch = e.touches[0];
      const rect = hoverGridRef.current.getBoundingClientRect();
      const col = Math.floor((touch.clientX - rect.left) / (rect.width / gridCols));
      const row = Math.floor((touch.clientY - rect.top) / (rect.height / gridRows));
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
        const moveX = (touch.clientX - window.innerWidth / 2) * 0.005;
        const moveY = (touch.clientY - window.innerHeight / 2) * 0.005;
        heroLogoRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    };

    // Mouse move handler for desktop preview
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
        const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.005;
        heroLogoRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    };

    // Touch/Mouse end handler
    const handleEnd = () => {
      if (hoverGridRef.current) {
        Array.from(hoverGridRef.current.children).forEach(cell => {
          cell.classList.remove('active');
        });
      }
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleEnd);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleEnd);

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleEnd);
    };
  }, []);

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

  const totalCells = 6 * 5; // Mobile grid

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

        .logo-img:active {
          transform: translateY(-10px) scale(1.05);
          filter: drop-shadow(0 0 20px rgba(196, 255, 97, 0.6));
        }

        spline-viewer {
          width: 100%;
          height: 100%;
        }
      `}</style>

      <section className="h-screen flex flex-col p-8 relative overflow-hidden bg-black">
        {/* Spline Background - Top Half */}
        <div className="relative w-full h-[60vh] z-[2]" style={{ pointerEvents: 'auto' }}>
          <div className="absolute top-0 left-0 w-full h-full">
            <spline-viewer url="https://prod.spline.design/RFs2rNI65inpncCk/scene.splinecode"></spline-viewer>
          </div>
        </div>

        {/* Hover Grid - Mobile Grid 6x5 */}
        <div
          ref={hoverGridRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10 grid grid-cols-6 grid-rows-5 gap-0"
        >
          {Array.from({ length: totalCells }).map((_, i) => (
            <GridCell key={i} />
          ))}
        </div>

        {/* Hero Content - Bottom */}
        <div className="relative z-[50] w-full flex-1 flex items-center justify-center">
          <div
            ref={heroLogoRef}
            className="hero-logo text-center w-full px-4"
          >
            <img
              src="https://salakhov-design.ru/thumb/2/XPJO1S1XzJOIzHtrB7vGLA/640r480/d/green_logo_light_3.svg"
              alt="Salakhov Logo"
              className="logo-img w-full h-auto max-w-[90vw] mx-auto"
            />
          </div>
        </div>

        {/* Spline Badge */}
        <div className="spline-badge absolute bottom-5 right-5 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-medium z-10">
          <div className="w-4 h-4 bg-gradient-to-br from-pink-500 to-lime-300 rounded-full"></div>
          Built with Spline
        </div>
      </section>
    </>
  );
}