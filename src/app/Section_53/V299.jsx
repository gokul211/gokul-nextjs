'use client';

import { useEffect, useRef, useState } from 'react';

export default function V299() {
  const sectionRef = useRef(null);
  const imgBlockRef = useRef(null);
  const imgWrapRef = useRef(null);
  const headingInclusivityRef = useRef(null);
  const headingCustomizationRef = useRef(null);
  const customizationImgRef = useRef(null);
  const customizationTextRef = useRef(null);
  const customizeColRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const [ticking, setTicking] = useState(false);

  const handleScroll = () => {
    if (!sectionRef.current) return;

    const scrollTop = sectionRef.current.scrollTop;
    const scrollHeight = sectionRef.current.scrollHeight;
    const clientHeight = sectionRef.current.clientHeight;
    const maxScroll = scrollHeight - clientHeight;
    
    const progress = maxScroll > 0 ? Math.min(1, scrollTop / maxScroll) : 0;

    if (scrollIndicatorRef.current) {
      scrollIndicatorRef.current.style.opacity = progress > 0.02 ? '0' : '1';
    }

    // Phase 1: Horizontal scroll (0 - 0.6)
    if (progress < 0.6) {
      const phase1Progress = progress / 0.6;
      const imgWidth = 380;
      const gap = 32;
      const totalWidth = (imgWidth + gap) * 8;
      const scrollAmount = totalWidth * phase1Progress;

      if (imgBlockRef.current) {
        imgBlockRef.current.style.transform = `translateX(-${scrollAmount}px)`;
      }
      if (imgWrapRef.current) {
        imgWrapRef.current.style.opacity = '1';
        imgWrapRef.current.style.filter = 'blur(0px)';
      }
      if (headingInclusivityRef.current) {
        headingInclusivityRef.current.style.opacity = String(1 - phase1Progress * 0.3);
      }
      if (headingCustomizationRef.current) {
        headingCustomizationRef.current.style.opacity = '0';
      }
      if (customizationImgRef.current) {
        customizationImgRef.current.style.opacity = '0';
        customizationImgRef.current.style.transform = 'translate(-50%, -50%) scale(0.2)';
      }
      if (customizationTextRef.current) {
        customizationTextRef.current.style.opacity = '0';
        customizationTextRef.current.style.transform = 'translateX(-100px)';
      }
      if (customizeColRef.current) {
        customizeColRef.current.style.opacity = '0';
        customizeColRef.current.style.transform = 'translateX(100px)';
      }
    }
    // Phase 2: Zoom in (0.6 - 1.0)
    else {
      const phase2Progress = (progress - 0.6) / 0.4;

      if (imgWrapRef.current) {
        imgWrapRef.current.style.opacity = String(Math.max(0, 1 - phase2Progress * 2));
        imgWrapRef.current.style.filter = `blur(${phase2Progress * 20}px)`;
      }
      if (headingInclusivityRef.current) {
        headingInclusivityRef.current.style.opacity = String(Math.max(0, 1 - phase2Progress * 2));
      }
      if (headingCustomizationRef.current) {
        headingCustomizationRef.current.style.opacity = String(Math.min(1, phase2Progress * 1.5));
      }

      const zoomProgress = Math.min(1, phase2Progress * 1.2);
      if (customizationImgRef.current) {
        customizationImgRef.current.style.opacity = String(zoomProgress);
        customizationImgRef.current.style.transform = `translate(-50%, -50%) scale(${0.2 + zoomProgress * 0.8})`;
      }
      if (customizationTextRef.current) {
        customizationTextRef.current.style.opacity = String(Math.min(1, phase2Progress * 1.5));
        customizationTextRef.current.style.transform = `translateX(${-100 + zoomProgress * 100}px)`;
      }
      if (customizeColRef.current) {
        customizeColRef.current.style.opacity = String(Math.min(1, phase2Progress * 1.5));
        customizeColRef.current.style.transform = `translateX(${100 - zoomProgress * 100}px)`;
      }
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          setTicking(false);
        });
        setTicking(true);
      }
    };

    section.addEventListener('scroll', onScroll);
    handleScroll();

    return () => section.removeEventListener('scroll', onScroll);
  }, [ticking]);

  const images = [
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80b36_people%20img%200.webp',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ab4_people%20img%201.webp',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ab2_people%20img%202.webp',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ab0_people%20img%203.webp',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ab1_people%20img%204.webp',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ab3_people%20img%205.webp',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80b36_people%20img%200.webp',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ab4_people%20img%201.webp',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ab2_people%20img%202.webp',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ab0_people%20img%203.webp',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ab1_people%20img%204.webp',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ab3_people%20img%205.webp',
  ];

  const customizationImage = 'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ab2_people%20img%202.webp';

  const customizeItems = [
    { title: 'Model parameters', tags: ['eye color', 'hair color', 'height', 'weight'] },
    { title: 'Facial expressions', tags: ['smiling', 'serious', 'neutral', 'playful'] },
    { title: 'Body posture', tags: ['standing', 'walking', 'sitting', 'leaning'] },
    { title: 'Apparel positioning', tags: ['tied', 'wrapped-around', 'open-front'] },
    { title: 'Clothing fit', tags: ['oversized', 'regular fit', 'slim fit', 'tailored'] },
    { title: 'Background', tags: ['city street', 'nature', 'studio', 'beach'] },
  ];

  return (
    <section 
      ref={sectionRef}
      className="w-full h-screen bg-gray-100 relative overflow-y-scroll overflow-x-hidden"
    >
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }
        .animate-bounce-custom {
          animation: bounce 2s infinite;
        }
      `}</style>

      <div style={{ height: '500vh' }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-gray-100">
          <div className="w-full h-full relative">
            {/* Heading */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10">
              <h2
                ref={headingInclusivityRef}
                className="text-6xl font-bold text-center text-gray-900 whitespace-nowrap transition-opacity duration-300"
              >
                Inclusivity
              </h2>
              <h2
                ref={headingCustomizationRef}
                className="text-6xl font-bold text-center text-gray-900 whitespace-nowrap transition-opacity duration-300"
              >
                Customization
              </h2>
            </div>

            {/* Images Container */}
            <div
              ref={imgWrapRef}
              className="absolute inset-0 flex items-center justify-start transition-all duration-300 overflow-visible pl-[5%]"
            >
              <div
                ref={imgBlockRef}
                className="flex gap-8"
                style={{ willChange: 'transform' }}
              >
                {images.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt=""
                    className="w-80 h-96 object-contain flex-shrink-0 rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* Center Layout Container */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full flex items-center justify-center relative">
                {/* Customization Image - Center */}
                <img
                  ref={customizationImgRef}
                  src={customizationImage}
                  alt=""
                  className="absolute w-96 h-[500px] object-contain rounded-lg transition-all duration-300 z-20"
                  style={{
                    left: '50%',
                    top: '90px',
                    transform: 'translate(-50%, -50%) scale(0.2)',
                    opacity: 0,
                  }}
                />

                {/* Text Left */}
                <div
                  ref={customizationTextRef}
                  className="absolute left-12 w-80 transition-all duration-300 z-10"
                  style={{
                    top: '50%',
                    transform: 'translateY(-50%) translateX(-100px)',
                    opacity: 0,
                  }}
                >
                  <p className="text-lg leading-relaxed text-gray-700">
                    Unlimited possibilities for customization: change model, facial expression, pose, background, clothes details with just a few words.
                  </p>
                </div>

                {/* Customize Panel Right */}
                <div
                  ref={customizeColRef}
                  className="absolute right-12 w-96 transition-all duration-300 z-10 max-h-[80vh] overflow-y-hidden"
                  style={{
                    top: '-90px',
                    transform: 'translateY(-50%) translateX(100px)',
                    opacity: 0,
                  }}
                >
                  <div className="bg-gray-900 text-white px-8 py-6 rounded-full flex items-center gap-4 text-lg font-semibold mb-6">
                    <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div>Customize</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {customizeItems.map((item, idx) => (
                      <div key={idx} className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-sm font-semibold text-gray-900 mb-3">{item.title}</div>
                        <div className="flex flex-wrap gap-2 items-center">
                          {item.tags.map((tag, tagIdx) => (
                            <div key={tagIdx} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                              {tag}
                            </div>
                          ))}
                          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors flex-shrink-0">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 5V19M5 12H19" stroke="#666" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            {/* <div
              ref={scrollIndicatorRef}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-gray-600 text-sm animate-bounce-custom transition-opacity duration-300"
            >
              Scroll to explore ↓
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}