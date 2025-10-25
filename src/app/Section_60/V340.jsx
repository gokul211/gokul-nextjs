'use client';

import { useEffect, useState, useRef } from 'react';

export default function V340() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeCube, setActiveCube] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const galleryRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Show info panel on page load
    const infoPanel = document.querySelector('.info-panel');
    setTimeout(() => {
      infoPanel?.classList.add('show');
      
      // Hide after 3 seconds
      setTimeout(() => {
        infoPanel?.classList.remove('show');
      }, 3000);
    }, 1000);

    // Add mouse move effect for parallax (desktop only)
    const handleMouseMove = (e) => {
      if (isMobile) return;
      
      const cubes = document.querySelectorAll('.cube');
      const gallery = galleryRef.current;
      if (!gallery) return;
      
      const galleryRect = gallery.getBoundingClientRect();
      const galleryCenterX = galleryRect.left + galleryRect.width / 2;
      const galleryCenterY = galleryRect.top + galleryRect.height / 2;
      
      const xAxis = (galleryCenterX - e.clientX) / 60;
      const yAxis = (galleryCenterY - e.clientY) / 60;
      
      cubes.forEach(cube => {
        if (!cube.matches(':hover') && cube.getAttribute('data-index') !== String(activeCube)) {
          cube.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [activeCube, isMobile]);

  const handleCubeClick = (index) => {
    setActiveCube(activeCube === index ? null : index);
  };

  const cubeData = [
    { width: 120, height: 80, image: 'https://picsum.photos/1200/800?image=1011' },
    { width: 90, height: 130, image: 'https://picsum.photos/1424/2136?image=1027' },
    { width: 130, height: 90, image: 'https://picsum.photos/1618/712?image=996' },
    { width: 120, height: 80, image: 'https://picsum.photos/1200/800?image=1005' },
    { width: 64, height: 84, image: 'https://picsum.photos/1042/1356?image=978' },
    { width: 100, height: 66, image: 'https://picsum.photos/1000/666?image=943' },
    { width: 110, height: 75, image: 'https://picsum.photos/1100/750?image=1067' },
    { width: 85, height: 120, image: 'https://picsum.photos/850/1200?image=1035' }
  ];

  // Circular layout positions
  const getCircularPosition = (index, total, radius) => {
    const angle = (index / total) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  return (
    <div className="min-h-screen flex flex-col items-center overflow-hidden bg-gradient-to-br from-[#111] to-[#222] text-white font-['Segoe_UI',_Tahoma,_Geneva,_Verdana,_sans-serif] relative">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-2/3 left-1/3 w-72 h-72 bg-coral-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Circular Gallery Container */}
      <div 
        ref={galleryRef}
        className={`relative ${isMobile ? 'top-10' : 'top-20'} w-full ${isMobile ? 'h-[85vh]' : 'h-[75vh]'} max-w-[1400px] flex items-center justify-center mb-8 z-10`}
      >
        {/* Central Cube */}
        <ul
          data-index="center"
          className={`cube absolute perspective-origin-center transform-style-3d transition-all duration-800 ease-cubic-bezier cursor-pointer filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)] ${
            activeCube === 'center' ? 'active' : ''
          } ${isMounted ? 'opacity-100' : 'opacity-0'}`}
          style={{
            transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
            width: isMobile ? '128px' : '160px',
            height: isMobile ? '96px' : '120px'
          }}
          onClick={() => setActiveCube(activeCube === 'center' ? null : 'center')}
        >
          {[...Array(9)].map((_, liIndex) => (
            <li
              key={liIndex}
              className="absolute left-0 top-0 backface-hidden w-full h-full transition-all duration-600 bg-coral-500 filter grayscale brightness-80 text-indent-999 overflow-hidden border border-white/20"
              style={{
                backgroundImage: `url(https://picsum.photos/1600/1200?image=1074)`,
                backgroundSize: '300% 300%',
                backgroundPosition: getBackgroundPosition(liIndex),
                transform: getTransform(liIndex),
                transitionDelay: getTransitionDelay(liIndex, false)
              }}
            ></li>
          ))}
        </ul>

        {/* Surrounding Cubes in Circular Layout */}
        {cubeData.map((cube, index) => {
          const radius = isMobile ? 180 : 280;
          const position = getCircularPosition(index, cubeData.length, radius);
          
          return (
            <ul
              key={index}
              data-index={index}
              className={`cube absolute perspective-origin-center transform-style-3d transition-all duration-800 ease-cubic-bezier cursor-pointer filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)] ${
                activeCube === index ? 'active' : ''
              } ${activeCube !== null && activeCube !== index && activeCube !== 'center' ? 'inactive' : ''} ${
                isMounted ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
                width: `${isMobile ? cube.width * 0.8 : cube.width}px`,
                height: `${isMobile ? cube.height * 0.8 : cube.height}px`,
                left: `calc(50% + ${position.x}px)`,
                top: `calc(50% + ${position.y}px)`,
                transformOrigin: 'center center',
                marginLeft: isMobile ? `-${(cube.width * 0.8) / 2}px` : `-${cube.width / 2}px`,
                marginTop: isMobile ? `-${(cube.height * 0.8) / 2}px` : `-${cube.height / 2}px`
              }}
              onClick={() => setActiveCube(activeCube === index ? null : index)}
            >
              {[...Array(9)].map((_, liIndex) => (
                <li
                  key={liIndex}
                  className="absolute left-0 top-0 backface-hidden w-full h-full transition-all duration-500 bg-coral-500 filter grayscale brightness-80 text-indent-999 overflow-hidden border border-white/15"
                  style={{
                    backgroundImage: `url(${cube.image})`,
                    backgroundSize: '300% 300%',
                    backgroundPosition: getBackgroundPosition(liIndex),
                    transform: getTransform(liIndex),
                    transitionDelay: getTransitionDelay(liIndex, false)
                  }}
                ></li>
              ))}
            </ul>
          );
        })}

        {/* Circular Guide Line */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'w-[360px] h-[360px]' : 'w-[560px] h-[560px]'} border border-white/10 rounded-full`}></div>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'w-[400px] h-[400px]' : 'w-[600px] h-[600px]'} border border-white/5 rounded-full`}></div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="info-panel fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black/60 px-4 py-3 rounded-2xl text-center text-sm backdrop-blur-lg border border-white/15 opacity-0 transition-all duration-500 pointer-events-none z-20 shadow-2xl max-w-[90vw]">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-coral-500 rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm">
            {isMobile ? 'Tap to expand • Touch to see spread' : 'Click on any cube to expand • Hover to see the spread effect'}
          </span>
          <div className="w-2 h-2 bg-coral-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      <style jsx global>{`
        .font-small-caps {
          font-variant: small-caps;
        }
        
        .perspective-origin-center {
          perspective-origin: center center;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .text-indent-999 {
          text-indent: 999px;
        }
        
        .ease-cubic-bezier {
          transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        /* Hover effect - desktop only */
        @media (min-width: 769px) {
          .cube:hover {
            transform: translateZ(80px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1.08) !important;
            filter: drop-shadow(0 15px 35px rgba(255, 127, 80, 0.4)) !important;
            z-index: 50 !important;
          }
          
          .cube:hover li {
            filter: grayscale(0) brightness(1.15) !important;
          }
        }
        
        /* Active (clicked/tapped) state */
        .cube.active {
          transform: translateZ(120px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1.15) !important;
          filter: drop-shadow(0 20px 40px rgba(255, 127, 80, 0.6)) !important;
          z-index: 100 !important;
        }
        
        .cube.active li {
          filter: grayscale(0) brightness(1.4) !important;
        }
        
        /* Inactive state when another cube is active */
        .cube.inactive {
          filter: grayscale(0.7) brightness(0.5) blur(2px) !important;
          transform: scale(0.85) !important;
        }
        
        /* Setup planes position & rotation */
        .cube li:nth-of-type(1) { transform: none; }
        .cube li:nth-of-type(2) { left: 100%; transform-origin: left center; transform: rotateY(180deg); }
        .cube li:nth-of-type(3) { top: 100%; transform-origin: center top; transform: rotateX(-180deg); }
        .cube li:nth-of-type(4) { left: -100%; transform-origin: right center; transform: rotateY(-180deg); }
        .cube li:nth-of-type(5) { top: -100%; transform-origin: center bottom; transform: rotateX(180deg); }
        .cube li:nth-of-type(6) { top: 100%; left: 100%; transform-origin: center top; transform: rotateX(-180deg); }
        .cube li:nth-of-type(7) { top: 100%; left: -100%; transform-origin: right center; transform: rotateY(-180deg); }
        .cube li:nth-of-type(8) { top: -100%; left: -100%; transform-origin: center bottom; transform: rotateX(180deg); }
        .cube li:nth-of-type(9) { top: -100%; left: 100%; transform-origin: left center; transform: rotateY(180deg); }
        
        /* Hover and Active transformations */
        .cube:hover li:nth-of-type(2),
        .cube:hover li:nth-of-type(4),
        .cube:hover li:nth-of-type(7),
        .cube:hover li:nth-of-type(9),
        .cube.active li:nth-of-type(2),
        .cube.active li:nth-of-type(4),
        .cube.active li:nth-of-type(7),
        .cube.active li:nth-of-type(9) { 
          transform: rotateY(0) !important; 
        }
        
        .cube:hover li:nth-of-type(3),
        .cube:hover li:nth-of-type(5),
        .cube:hover li:nth-of-type(6),
        .cube:hover li:nth-of-type(8),
        .cube.active li:nth-of-type(3),
        .cube.active li:nth-of-type(5),
        .cube.active li:nth-of-type(6),
        .cube.active li:nth-of-type(8) { 
          transform: rotateX(0) !important; 
        }
        
        /* Transition delays */
        .cube li:nth-of-type(2),
        .cube li:nth-of-type(3),
        .cube li:nth-of-type(4),
        .cube li:nth-of-type(5) { transition-delay: 0.03s; }
        
        .cube li:nth-of-type(6),
        .cube li:nth-of-type(7),
        .cube li:nth-of-type(8),
        .cube li:nth-of-type(9) { transition-delay: 0s; }
        
        .cube:hover li:nth-of-type(2),
        .cube:hover li:nth-of-type(3),
        .cube:hover li:nth-of-type(4),
        .cube:hover li:nth-of-type(5),
        .cube.active li:nth-of-type(2),
        .cube.active li:nth-of-type(3),
        .cube.active li:nth-of-type(4),
        .cube.active li:nth-of-type(5) { 
          transition-delay: 0s !important; 
        }
        
        .cube:hover li:nth-of-type(6),
        .cube:hover li:nth-of-type(7),
        .cube:hover li:nth-of-type(8),
        .cube:hover li:nth-of-type(9),
        .cube.active li:nth-of-type(6),
        .cube.active li:nth-of-type(7),
        .cube.active li:nth-of-type(8),
        .cube.active li:nth-of-type(9) { 
          transition-delay: 0.2s !important; 
        }
        
        .info-panel.show {
          opacity: 1;
          transform: translateX(-50%) translateY(-10px) !important;
        }
        
        @keyframes orbitIn {
          from {
            opacity: 0;
            transform: rotateX(0deg) rotateY(0deg) scale(0.3) translateZ(-200px);
          }
          to {
            opacity: 1;
            transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1) translateZ(0);
          }
        }
        
        @keyframes circleIn {
          from {
            opacity: 0;
            transform: scale(0.5) rotateX(0deg) translateZ(-100px);
          }
          to {
            opacity: 1;
            transform: scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
          }
        }
        
        .cube[data-index="center"] {
          animation: orbitIn 1.2s ease-out forwards;
          animation-delay: 0.3s;
        }
        
        .cube:not([data-index="center"]) {
          animation: circleIn 1s ease-out forwards;
        }
        
        .cube:nth-child(2) { animation-delay: 0.4s; }
        .cube:nth-child(3) { animation-delay: 0.5s; }
        .cube:nth-child(4) { animation-delay: 0.6s; }
        .cube:nth-child(5) { animation-delay: 0.7s; }
        .cube:nth-child(6) { animation-delay: 0.8s; }
        .cube:nth-child(7) { animation-delay: 0.9s; }
        .cube:nth-child(8) { animation-delay: 1.0s; }
        .cube:nth-child(9) { animation-delay: 1.1s; }
        
        /* Mobile specific styles */
        @media (max-width: 768px) {
          /* Mobile active state - reduced animation */
          .cube.active {
            transform: translateZ(50px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1.02) !important;
            filter: drop-shadow(0 15px 35px rgba(255, 127, 80, 0.5)) !important;
          }
          
          /* Disable hover effects on mobile */
          .cube:hover {
            transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1) !important;
            filter: drop-shadow(0 8px 20px rgba(0,0,0,0.5)) !important;
          }
          
          .cube:hover li {
            filter: grayscale(0.85) brightness(0.75) !important;
          }
        }
      `}</style>
    </div>
  );
}

// Helper functions
function getBackgroundPosition(index) {
  const positions = [
    'center center',
    'right center',
    'center bottom',
    'left center',
    'center top',
    'right bottom',
    'left bottom',
    'left top',
    'right top'
  ];
  return positions[index];
}

function getTransform(index) {
  const transforms = [
    'none',
    'rotateY(180deg)',
    'rotateX(-180deg)',
    'rotateY(-180deg)',
    'rotateX(180deg)',
    'rotateX(-180deg)',
    'rotateY(-180deg)',
    'rotateX(180deg)',
    'rotateY(180deg)'
  ];
  return transforms[index];
}

function getTransitionDelay(index, isHover) {
  if (isHover) {
    return [2, 3, 4, 5].includes(index) ? '0s' : '0.2s';
  }
  return [2, 3, 4, 5].includes(index) ? '0.03s' : '0s';
}