'use client';

import React, { useEffect, useRef, useState } from 'react';

const V332 = () => {
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

  // Calculate card positions based on scroll
  const getCardPosition = (index) => {
  const cardWidth = 677;
  // Reduce imageWidth so stacked cards move further left and content becomes visible
  const imageWidth = 220; // previously 270
    
    // Card 1 always stays at position 0
    if (index === 0) {
      return { 
        left: 0, 
        opacity: 1, 
        zIndex: 1,
        transform: 'translateX(0px)'
      };
    }
    
    // Card 2: Initially at cardWidth, then moves to imageWidth
    if (index === 1) {
      if (scrollProgress < 0.25) {
        // Initial position - visible on screen
        return { 
          left: 0,
          opacity: 1, 
          zIndex: 2,
          transform: `translateX(${cardWidth}px)`
        };
      } else {
        // Moves over Card 1 - stops at imageWidth to show Card 1's image
        const localProgress = Math.min((scrollProgress - 0.25) / 0.15, 1);
        const moveDistance = cardWidth - imageWidth;
        const currentMove = cardWidth - (moveDistance * localProgress);
        return { 
          left: 0,
          opacity: 1, 
          zIndex: 3,
          transform: `translateX(${currentMove}px)`
        };
      }
    }
    
    // Card 3: Comes from right, then stacks
    if (index === 2) {
      if (scrollProgress < 0.25) {
        // Off screen on right
        return { 
          left: 0,
          opacity: 0, 
          zIndex: 3,
          transform: `translateX(${cardWidth * 2}px)`
        };
      } else if (scrollProgress < 0.4) {
        // Coming into view
        const localProgress = (scrollProgress - 0.25) / 0.15;
        return { 
          left: 0,
          opacity: localProgress, 
          zIndex: 2,
          transform: `translateX(${cardWidth * 2}px)`
        };
      } else {
        // Stacking over Card 2 - stops at imageWidth*2 to show both previous images
        const localProgress = Math.min((scrollProgress - 0.4) / 0.15, 1);
  const startPos = cardWidth * 2;
  const endPos = imageWidth * 2.0; // nudge a bit more left
        const currentMove = startPos - ((startPos - endPos) * localProgress);
        return { 
          left: 0,
          opacity: 1, 
          zIndex: 4,
          transform: `translateX(${currentMove}px)`
        };
      }
    }
    
    // Card 4: Comes from right, then stacks
    if (index === 3) {
      if (scrollProgress < 0.4) {
        // Off screen on right
        return { 
          left: 0,
          opacity: 0, 
          zIndex: 4,
          transform: `translateX(${cardWidth * 3}px)`
        };
      } else if (scrollProgress < 0.55) {
        // Coming into view
        const localProgress = (scrollProgress - 0.4) / 0.15;
        return { 
          left: 0,
          opacity: localProgress, 
          zIndex: 3,
          transform: `translateX(${cardWidth * 3}px)`
        };
      } else {
        // Stacking over Card 3 - stops at imageWidth*3 to show all 3 previous images
        const localProgress = Math.min((scrollProgress - 0.55) / 0.15, 1);
  const startPos = cardWidth * 3;
  const endPos = imageWidth * 3.0; // move further left so 4th card content is visible
        const currentMove = startPos - ((startPos - endPos) * localProgress);
        return { 
          left: 0,
          opacity: 1, 
          zIndex: 5,
          transform: `translateX(${currentMove}px)`
        };
      }
    }
    
    // Card 5: Comes from right, then stacks
    if (index === 4) {
      if (scrollProgress < 0.55) {
        // Off screen on right
        return { 
          left: 0,
          opacity: 0, 
          zIndex: 5,
          transform: `translateX(${cardWidth * 4}px)`
        };
      } else if (scrollProgress < 0.7) {
        // Coming into view
        const localProgress = (scrollProgress - 0.55) / 0.15;
        return { 
          left: 0,
          opacity: localProgress, 
          zIndex: 4,
          transform: `translateX(${cardWidth * 4}px)`
        };
      } else {
        // Stacking over Card 4 - stops at imageWidth*4 to show all 4 previous images
        const localProgress = Math.min((scrollProgress - 0.7) / 0.3, 1);
  const startPos = cardWidth * 4;
  // Adjust final card position so it sits more balanced with the right content column.
  // Increasing the multiplier moves it slightly to the right compared to previous value.
  const endPos = imageWidth * 4.0;
        const currentMove = startPos - ((startPos - endPos) * localProgress);
        return { 
          left: 0,
          opacity: 1, 
          zIndex: 6,
          transform: `translateX(${currentMove}px)`
        };
      }
    }
    
    return { left: 0, opacity: 0, zIndex: 0, transform: 'translateX(0px)' };
  };

  return (
    <div>
      
      <div 
        ref={sectionRef}
        className="relative"
        style={{ height: `${stages.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden bg-[#d9ff9d]">
          <div className="relative h-full w-full flex items-end">
            {stages.map((stage, index) => {
              const position = getCardPosition(index);
              
              return (
                <div
                  key={index}
                  className="absolute bottom-0 border-l border-[#999999] transition-all duration-700 ease-out"
                  style={{
                    left: `${position.left}px`,
                    height: '75vh',
                    width: '677px',
                    borderLeftWidth: index === 0 ? '0px' : '1px',
                    opacity: position.opacity,
                    zIndex: position.zIndex,
                    transform: position.transform,
                  }}
                >
                  <div className="h-full flex flex-col justify-between bg-[#d9ff9d]" style={{ padding: '2.18em' }}>
                    {/* Top Section */}
                    <div className="flex gap-10 bg-[#d9ff9d]">
                      {/* Left - Image (always visible, no background) */}
                      <div 
                        className="flex-shrink-0 rounded-[20px] overflow-hidden"
                        style={{ width: '13em', height: '13em' }}
                      >
                        <img
                          src={stage.image}
                          alt={stage.number}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Right - Content (with solid background to hide previous card's content) */}
                      <div className="flex-1 flex flex-col bg-[#d9ff9d]">
                        <h3 
                          className="uppercase font-bold mb-6 bg-[#d9ff9d]"
                          style={{ 
                            fontSize: '1.5em',
                            lineHeight: '1.2',
                            letterSpacing: '0.02em',
                            textAlign:"left"
                          }}
                        >
                          {stage.title}
                        </h3>
                        <p 
                          className="whitespace-pre-line bg-[#d9ff9d]"
                          style={{ 
                            fontSize: '1em',
                            fontWeight: 400,
                            lineHeight: '1.16',
                            textAlign:"left"
                
                          }}
                        >
                          {stage.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Section (with background to hide previous card's bottom) */}
                    <div className="flex justify-between items-end bg-[#d9ff9d]">
                      {/* Left - Progress Circle */}
                      <div className="relative bg-[#d9ff9d]" style={{ width: '3.8em', height: '3.8em' }}>
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
                          className="absolute inset-0 flex items-center justify-center  font-bold"
                          style={{ color: '#ff1493', fontSize: '1.2em' }}
                        >
                          {stage.progress}%
                        </div>
                      </div>
                      
                      {/* Right - Scroll Text */}
                      <p 
                        className="text-[#999999] bg-[#d9ff9d]"
                        style={{ 
                          fontSize: '1em',
                          fontWeight: 400,
                          lineHeight: '1.16'
                
                        }}
                      >
                        Scroll
                      </p>
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

export default V332;