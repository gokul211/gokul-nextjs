'use client';

import React, { useEffect, useRef, useState } from 'react';

const STAGE_OVERLAYS = [
  'https://maya-theme-empower.myshopify.com/cdn/shop/files/pro_19a.webp?v=1744288379&width=1125',
  'https://maya-theme-empower.myshopify.com/cdn/shop/files/pro_11a.webp?v=1744289298&width=1125',
  'https://maya-theme-empower.myshopify.com/cdn/shop/files/pro_10a.webp?v=1744289376&width=1125',
];

const GRID_IMAGES = [
  'https://maya-theme-empower.myshopify.com/cdn/shop/files/pro_20a.webp?v=1744288285&width=1125',
  'https://maya-theme-empower.myshopify.com/cdn/shop/files/pro_9a.webp?v=1744289223&width=1126',
  'https://maya-theme-empower.myshopify.com/cdn/shop/files/pro_17a.webp?v=1744288485&width=1126',
  'https://maya-theme-empower.myshopify.com/cdn/shop/files/blue_21.webp?v=1744287754&width=1125',
  'https://maya-theme-empower.myshopify.com/cdn/shop/files/pro_24a.webp?v=1744287958&width=1125',
  'https://maya-theme-empower.myshopify.com/cdn/shop/files/pro_23a.webp?v=1744288069&width=1125',
  'https://maya-theme-empower.myshopify.com/cdn/shop/files/pro_22a.webp?v=1744287584&width=1125',
  'https://maya-theme-empower.myshopify.com/cdn/shop/files/pro_20a.webp?v=1744288285&width=1125',
  'https://maya-theme-empower.myshopify.com/cdn/shop/files/pro_9a.webp?v=1744289223&width=1126',
  'https://maya-theme-empower.myshopify.com/cdn/shop/files/pro_17a.webp?v=1744288485&width=1126',
  'https://maya-theme-empower.myshopify.com/cdn/shop/files/blue_21.webp?v=1744287754&width=1125',
  'https://maya-theme-empower.myshopify.com/cdn/shop/files/pro_24a.webp?v=1744287958&width=1125',
  'https://maya-theme-empower.myshopify.com/cdn/shop/files/pro_23a.webp?v=1744288069&width=1125',
  'https://maya-theme-empower.myshopify.com/cdn/shop/files/pro_22a.webp?v=1744287584&width=1125',
  'https://maya-theme-empower.myshopify.com/cdn/shop/files/pro_20a.webp?v=1744288285&width=1125',
  'https://maya-theme-empower.myshopify.com/cdn/shop/files/pro_9a.webp?v=1744289223&width=1126',
  'https://maya-theme-empower.myshopify.com/cdn/shop/files/pro_17a.webp?v=1744288485&width=1126',
  'https://maya-theme-empower.myshopify.com/cdn/shop/files/blue_21.webp?v=1744287754&width=1125',
  'https://maya-theme-empower.myshopify.com/cdn/shop/files/pro_24a.webp?v=1744287958&width=1125',
];

export default function V270() {
  const sectionRef = useRef(null);
  const tickingRef = useRef(false);
  const [vh, setVh] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);
  const [stageProgress, setStageProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const overlaysCount = STAGE_OVERLAYS.length;
  const finalGridStageIndex = overlaysCount;
  const totalStages = overlaysCount + 1;

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight || 800);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const handle = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        tickingRef.current = false;
        if (!sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTopDocument = window.scrollY + rect.top;
        const scrollY = window.scrollY || window.pageYOffset;

        const stickyStart = sectionTopDocument;
        const totalStickyDistance = totalStages * vh;
        const stickyEnd = stickyStart + totalStickyDistance;

        let overall = 0;
        if (scrollY <= stickyStart) overall = 0;
        else if (scrollY >= stickyEnd) overall = 1;
        else overall = (scrollY - stickyStart) / totalStickyDistance;

        const raw = overall * totalStages;
        let stageIndex = Math.floor(raw);
        if (stageIndex >= totalStages) stageIndex = totalStages - 1;
        if (stageIndex < 0) stageIndex = 0;
        const localProgress = Math.min(1, Math.max(0, raw - stageIndex));

        setStageProgress(localProgress);
        setActiveStage(stageIndex);
      });
    };

    window.addEventListener('scroll', handle, { passive: true });
    handle();
    return () => window.removeEventListener('scroll', handle);
  }, [vh, totalStages]);

  const baseExtra = Math.round(vh * 0.4);
  const sectionMinHeight = totalStages * vh + baseExtra;

  const overlayStyle = (idx) => {
    const z = 50 + idx;
    let opacity = 0;
    let translateY = 40;
    let scale = 0.98;
    const transitionEase = 'cubic-bezier(.22,.9,.36,1)';

    if (idx < activeStage) {
      opacity = 1;
      translateY = -10;
      scale = 0.96;
    } else if (idx === activeStage) {
      const p = stageProgress;
      opacity = p;
      translateY = 40 - 40 * p;
      scale = 0.98 + 0.02 * p;
    } else {
      opacity = 0;
      translateY = 40;
      scale = 0.98;
    }

    return {
      zIndex: z,
      opacity,
      transform: `translateY(${translateY}px) scale(${scale})`,
      transition: `transform 0.5s ${transitionEase}, opacity 0.5s ${transitionEase}`
    };
  };

  const finalGridLocalProgress = () => {
    if (activeStage < finalGridStageIndex) return 0;
    return Math.min(1, Math.max(0, stageProgress));
  };

  const gridProgress = finalGridLocalProgress();

  const handleGridItemHover = (index) => {
    setHoveredIndex(index);
  };

  const handleGridItemLeave = () => {
    setHoveredIndex(null);
  };

  const getGridItemStyle = (index, row, col) => {
    const baseDelay = (row * 0.1) + (col * 0.05);
    const isHovered = hoveredIndex === index;
    const distanceFromHovered = hoveredIndex !== null ? Math.abs(index - hoveredIndex) : 0;
    
    let scale = 1;
    let zIndex = 1;
    let filter = 'none';
    
    if (isHovered) {
      scale = 1.15;
      zIndex = 100;
      filter = 'brightness(1.2)';
    } else if (hoveredIndex !== null) {
      scale = 0.95;
      filter = 'brightness(0.7)';
    }

    return {
      transform: `translateY(${30 * (1 - gridProgress)}px) scale(${scale})`,
      opacity: gridProgress,
      zIndex,
      filter,
      transition: `transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                   opacity 0.5s ease, 
                   filter 0.3s ease,
                   z-index 0.3s ease`,
      transitionDelay: `${baseDelay}s`,
      cursor: 'pointer'
    };
  };

  return (
    <section
      ref={sectionRef}
      className="v270-section"
      aria-label="products pinned section"
      style={{ minHeight: `${sectionMinHeight}px` }}
    >
      <div className="v270-sticky">
        <div className="v270-head">
          <h2 className="big-heading">FASHION DESIGNED</h2>
          <h3 className="overlay-heading">FOR YOU</h3>
        </div>

        <div className="stage-area">
          <div
            className="hero-img"
            style={{
              opacity: activeStage === 0 ? Math.max(0, 1 - stageProgress * 1.2) : (activeStage > 0 ? 0 : 1),
              transform: activeStage === 0 ? `translateY(${10 * (1 - stageProgress)}px) scale(${0.985 + 0.015 * (1 - stageProgress)})` : 'translateY(-10px) scale(0.96)',
              transition: 'transform 0.45s cubic-bezier(.22,.9,.36,1), opacity 0.45s ease',
              width: '260px',
              height: '340px'
            }}
          >
            <img
              src={STAGE_OVERLAYS[0]}
              alt="hero"
              loading="lazy"
            />
          </div>

          <div className="overlay-stack" aria-hidden={false}>
            {STAGE_OVERLAYS.map((src, idx) => {
              const style = overlayStyle(idx);
              return (
                <div key={src} className="overlay-item" style={style}>
                  <img src={src} alt={`overlay-${idx}`} loading="lazy" />
                </div>
              );
            })}
          </div>

          <div
            className="final-grid"
            style={{
              opacity: gridProgress,
              transform: `scale(${0.96 + 0.04 * gridProgress})`,
              pointerEvents: gridProgress > 0.05 ? 'auto' : 'none'
            }}
          >
            {/* Interactive Background Grid - Full Section */}
            <div className="background-grid">
              {[0, 1, 2, 3, 4].map((row) => (
                <div key={row} className="grid-row">
                  {[0, 1, 2, 3, 4, 5].map((col) => {
                    const index = (row * 6) + col;
                    const imageIndex = index % GRID_IMAGES.length;
                    return (
                      <div
                        key={col}
                        className="grid-item"
                        style={getGridItemStyle(index, row, col)}
                        onMouseEnter={() => handleGridItemHover(index)}
                        onMouseLeave={handleGridItemLeave}
                        onClick={() => console.log(`Clicked grid item ${index}`)}
                      >
                        <img 
                          src={GRID_IMAGES[imageIndex]} 
                          alt={`fashion-${index}`} 
                          loading="lazy" 
                        />
                        <div className="grid-overlay">
                          <span>View Product</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .v270-section {
          position: relative;
          background: #000;
          color: #fff;
          padding: 30px 20px;
          box-sizing: border-box;
        }

        .v270-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          overflow: hidden;
          padding: 10px;
          width: 100%;
        }

        .v270-head {
          position: absolute;
          top: 8%;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          pointer-events: none;
          z-index: 60;
          width: 100%;
        }
        .big-heading {
          margin: 0;
          font-size: 110px;
          font-weight: 900;
          letter-spacing: 2px;
          line-height: 0.88;
          color: transparent;
          -webkit-text-stroke: 3px #fff;
          text-transform: uppercase;
        }
        .overlay-heading {
          margin: 8px 0 0 0;
          font-size: 72px;
          font-weight: 800;
          opacity: 0.98;
          text-transform: uppercase;
        }

        .stage-area {
          width: 100%;
          max-width: 1100px;
          height: 68vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .hero-img {
          position: absolute;
          width: 260px;
          height: 340px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 40;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .hero-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .overlay-stack {
          position: absolute;
          width: 260px;
          height: 340px;
          display: block;
          pointer-events: none;
          z-index: 35;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .overlay-item {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) translateY(40px) scale(0.98);
          width: 260px;
          height: 340px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 28px 50px rgba(0,0,0,0.55);
          background: #111;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .overlay-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .final-grid {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20;
          pointer-events: none;
          transition: transform 0.45s ease, opacity 0.45s ease;
          width: 100%;
          height: 100%;
        }

        .final-grid.active {
          pointer-events: auto;
        }

        /* Interactive Background Grid */
        .background-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
          height: 100%;
          padding: 20px;
          pointer-events: none;
        }

        .final-grid.active .background-grid {
          pointer-events: auto;
        }

        .grid-row {
          display: flex;
          gap: 8px;
          flex: 1;
          width: 100%;
        }

        .grid-item {
          flex: 1;
          border-radius: 8px;
          overflow: hidden;
          background: #111;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
          position: relative;
          cursor: pointer;
          opacity: 0;
          transform: translateY(30px);
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                      opacity 0.5s ease,
                      filter 0.3s ease,
                      z-index 0.3s ease;
        }

        .grid-item:hover {
          box-shadow: 0 12px 32px rgba(255,255,255,0.1);
        }

        .grid-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .grid-item:hover img {
          transform: scale(1.05);
        }

        .grid-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(0,0,0,0.7), rgba(255,255,255,0.1));
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .grid-item:hover .grid-overlay {
          opacity: 1;
        }

        .grid-overlay span {
          color: white;
          font-weight: 600;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          background: rgba(0,0,0,0.8);
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.3);
        }

        @media (max-width: 1200px) {
          .big-heading { font-size: 92px; -webkit-text-stroke: 2.5px #fff; }
          .overlay-heading { font-size: 56px; }
          .background-grid { gap: 6px; padding: 15px; }
          .grid-row { gap: 6px; }
        }

        @media (max-width: 992px) {
          .big-heading { font-size: 56px; -webkit-text-stroke: 1.8px #fff; }
          .overlay-heading { font-size: 28px; }
          .overlay-stack, .hero-img { width: 260px; height: 340px; }
          .stage-area { height: 62vh; }
          .background-grid { gap: 4px; padding: 10px; }
          .grid-row { gap: 4px; }
          .grid-overlay span { font-size: 10px; padding: 6px 12px; }
        }

        @media (max-width: 768px) {
          .background-grid {
            gap: 3px;
            padding: 8px;
          }
          .grid-row {
            gap: 3px;
          }
          .grid-overlay span {
            font-size: 9px;
            padding: 4px 8px;
          }
        }

        @media (max-width: 480px) {
          .big-heading { font-size: 34px; -webkit-text-stroke: 1px #fff; }
          .overlay-heading { font-size: 20px; }
          .overlay-stack, .hero-img { width: 260px; height: 340px; }
          .stage-area { height: 56vh; }
          .v270-head { top: 6%; }
          .background-grid {
            gap: 2px;
            padding: 5px;
          }
          .grid-row {
            gap: 2px;
          }
          .grid-overlay span {
            font-size: 8px;
            padding: 3px 6px;
          }
        }
      `}</style>

      {/* Dynamic class for pointer events */}
      <style jsx>{`
        .final-grid${gridProgress > 0.05 ? '.active' : ''} {
          pointer-events: ${gridProgress > 0.05 ? 'auto' : 'none'};
        }
      `}</style>
    </section>
  );
}