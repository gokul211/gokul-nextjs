'use client';

import React, { useEffect, useRef, useState } from 'react';

const V331 = () => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const stages = [
    {
      number: '1',
      image: 'https://salakhov-design.ru/thumb/2/JJRFfVPpkVt3_qj02nLliw/2048r2048/d/1.jpg',
      title: 'DISCUSSION OF THE PROJECT AND CONCLUSION OF THE CONTRACT',
      description: 'Before starting work, we hold a meeting (online or by phone) to discuss your goals, style preferences, the structure of the future website, and the availability of ready-made content in detail. This allows us to avoid filling out a lengthy brief.\n\nNext, we conclude a contract with clear terms and conditions.\n\nWork begins after a 50% prepayment',
      progress: 20
    },
    {
      number: '2',
      image: 'https://salakhov-design.ru/thumb/2/cAi6fYpt27zx9IyocVQNcA/2048r2048/d/2.jpg',
      title: 'RESEARCH AND DESIGN',
      description: 'Next, I analyze your niche and competitors to identify key advantages.\n\nBased on the research, I create a prototype — a diagram of the future website with the layout of blocks, text, and graphics. This helps to immediately assess the ease of navigation and the logic of interaction.\n\nSometimes the prototyping stage can be skipped, and you can go straight to the concepts',
      progress: 40
    },
    {
      number: '3',
      image: 'https://salakhov-design.ru/thumb/2/CNie89ZibOs5L9gEfUiRsQ/2048r2048/d/3.jpg',
      title: 'DESIGN CONCEPT DEVELOPMENT',
      description: 'I propose 1–3 design options for the main page (first screens).\n\nThe style and visual design are based on the approved references, color palette, and fonts',
      progress: 60
    },
    {
      number: '4',
      image: 'https://salakhov-design.ru/thumb/2/QLrUY5Ae7FDmNrg18GQHng/2048r2048/d/4.jpg',
      title: 'FULL DESIGN OF ALL PAGES',
      description: 'After the concept is agreed upon, I draw the full design of all sections of the site.\n\nIf the order includes only a layout, I additionally prepare a UI-kit (a set of interface elements) and submit the project for layout',
      progress: 80
    },
    {
      number: '5',
      image: 'https://salakhov-design.ru/thumb/2/99vQGqygdpeMpAVjZV_LlQ/2048r2048/d/5.jpg',
      title: 'LAYOUT AND CUSTOMIZATION OF FUNCTIONALITY',
      description: 'Adaptively transfer designs from Figma to Webflow, Taptop or Tilda, optimizing display on computers, tablets and smartphones.\n\nI connect the necessary tools:\n\n- Application forms and payment systems.\n- Animations and interactive elements.\n- SEO headlines and descriptions for social networks.\n- Analytics services (Google Analytics, Yandex.Metrica, etc.).',
      progress: 100
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      
      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        const scrolled = Math.abs(rect.top);
        const maxScroll = sectionHeight - windowHeight;
        const progress = Math.min(scrolled / maxScroll, 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getCardPositionMobile = (index) => {
    const cardHeight = 500;
    const imageHeight = 120;
    
    if (index === 0) {
      return { 
        top: 0, 
        opacity: 1, 
        zIndex: 1,
        transform: 'translateY(0px)'
      };
    }
    
    if (index === 1) {
      if (scrollProgress < 0.25) {
        return { 
          top: 0,
          opacity: 1, 
          zIndex: 2,
          transform: `translateY(${cardHeight}px)`
        };
      } else {
        const localProgress = Math.min((scrollProgress - 0.25) / 0.15, 1);
        const moveDistance = cardHeight - imageHeight;
        const currentMove = cardHeight - (moveDistance * localProgress);
        return { 
          top: 0,
          opacity: 1, 
          zIndex: 3,
          transform: `translateY(${currentMove}px)`
        };
      }
    }
    
    if (index === 2) {
      if (scrollProgress < 0.25) {
        return { 
          top: 0,
          opacity: 0, 
          zIndex: 3,
          transform: `translateY(${cardHeight * 2}px)`
        };
      } else if (scrollProgress < 0.4) {
        const localProgress = (scrollProgress - 0.25) / 0.15;
        return { 
          top: 0,
          opacity: localProgress, 
          zIndex: 2,
          transform: `translateY(${cardHeight * 2}px)`
        };
      } else {
        const localProgress = Math.min((scrollProgress - 0.4) / 0.15, 1);
        const startPos = cardHeight * 2;
        const endPos = imageHeight * 2.0;
        const currentMove = startPos - ((startPos - endPos) * localProgress);
        return { 
          top: 0,
          opacity: 1, 
          zIndex: 4,
          transform: `translateY(${currentMove}px)`
        };
      }
    }
    
    if (index === 3) {
      if (scrollProgress < 0.4) {
        return { 
          top: 0,
          opacity: 0, 
          zIndex: 4,
          transform: `translateY(${cardHeight * 3}px)`
        };
      } else if (scrollProgress < 0.55) {
        const localProgress = (scrollProgress - 0.4) / 0.15;
        return { 
          top: 0,
          opacity: localProgress, 
          zIndex: 3,
          transform: `translateY(${cardHeight * 3}px)`
        };
      } else {
        const localProgress = Math.min((scrollProgress - 0.55) / 0.15, 1);
        const startPos = cardHeight * 3;
        const endPos = imageHeight * 3.0;
        const currentMove = startPos - ((startPos - endPos) * localProgress);
        return { 
          top: 0,
          opacity: 1, 
          zIndex: 5,
          transform: `translateY(${currentMove}px)`
        };
      }
    }
    
    if (index === 4) {
      if (scrollProgress < 0.55) {
        return { 
          top: 0,
          opacity: 0, 
          zIndex: 5,
          transform: `translateY(${cardHeight * 4}px)`
        };
      } else if (scrollProgress < 0.7) {
        const localProgress = (scrollProgress - 0.55) / 0.15;
        return { 
          top: 0,
          opacity: localProgress, 
          zIndex: 4,
          transform: `translateY(${cardHeight * 4}px)`
        };
      } else {
        const localProgress = Math.min((scrollProgress - 0.7) / 0.3, 1);
        const startPos = cardHeight * 3;
        const endPos = imageHeight * 4.0;
        const currentMove = startPos - ((startPos - endPos) * localProgress);
        return { 
          top: 0,
          opacity: 1, 
          zIndex: 6,
          transform: `translateY(${currentMove}px)`
        };
      }
    }
    
    return { top: 0, opacity: 0, zIndex: 0, transform: 'translateY(0px)' };
  };

  return (
    <div>
      <div 
        ref={sectionRef}
        className="relative"
        style={{ height: `${stages.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden bg-[#d9ff9d]">
          <div className="relative h-full w-full flex items-start pt-20">
            {stages.map((stage, index) => {
              const position = getCardPositionMobile(index);
              
              return (
                <div
                  key={index}
                  className="absolute left-0 right-0 mx-auto border-t border-[#999999] transition-all duration-700 ease-out"
                  style={{
                    top: `${position.top}px`,
                    width: '90%',
                    maxWidth: '400px',
                    borderTopWidth: index === 0 ? '0px' : '1px',
                    opacity: position.opacity,
                    zIndex: position.zIndex,
                    transform: position.transform,
                  }}
                >
                  <div className="flex flex-col bg-[#d9ff9d]" style={{ padding: '1.5em' }}>
                    <div 
                      className="w-full rounded-[15px] overflow-hidden mb-4"
                      style={{ height: '120px' }}
                    >
                      <img
                        src={stage.image}
                        alt={stage.number}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <div className="flex flex-col bg-[#d9ff9d]">
                      <h3 
                        className="uppercase font-bold mb-3 bg-[#d9ff9d]"
                        style={{ 
                          fontSize: '1.1em',
                          lineHeight: '1.2',
                          letterSpacing: '0.02em',
                          textAlign: 'left'
                        }}
                      >
                        {stage.title}
                      </h3>
                      <p 
                        className="whitespace-pre-line bg-[#d9ff9d] mb-4"
                        style={{ 
                          fontSize: '0.85em',
                          fontWeight: 400,
                          lineHeight: '1.3',
                          textAlign: 'left'
                        }}
                      >
                        {stage.description}
                      </p>
                      
                      <div className="flex justify-between items-center bg-[#d9ff9d] mt-2">
                        <div className="relative bg-[#d9ff9d]" style={{ width: '3em', height: '3em' }}>
                          <svg 
                            viewBox="0 0 100 100" 
                            className="w-full h-full transform -rotate-90"
                          >
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="#ffffff"
                              strokeWidth="8"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="#ff1493"
                              strokeWidth="8"
                              strokeDasharray={`${2 * Math.PI * 45}`}
                              strokeDashoffset={`${2 * Math.PI * 45 * (1 - stage.progress / 100)}`}
                              strokeLinecap="round"
                              className="transition-all duration-500"
                            />
                          </svg>
                          <div 
                            className="absolute inset-0 flex items-center justify-center font-bold"
                            style={{ color: '#ff1493', fontSize: '1em' }}
                          >
                            {stage.progress}%
                          </div>
                        </div>
                        
                        <p 
                          className="text-[#999999] bg-[#d9ff9d]"
                          style={{ 
                            fontSize: '0.9em',
                            fontWeight: 400,
                            lineHeight: '1.16'
                          }}
                        >
                          Scroll
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default V331;