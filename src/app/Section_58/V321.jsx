import React, { useState, useEffect, useRef } from 'react';

const V321 = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const containerRef = useRef(null);
  const rafRef = useRef(null);

  const projects = [
    {
      id: 'time-machine',
      title: ['time', 'machine'],
      number: '01',
      when: '2017',
      role: 'UI Design',
      what: 'Website for an indoor minigolf venue, featuring a time travel exploration course with 3D and ultraviolet effects.',
      color: '#019632',
      bgColor: '#0a0a0a',
      image: 'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=1200&q=80'
    },
    {
      id: 'agata-piechota',
      title: ['agata', 'piechota'],
      number: '02',
      when: '2017',
      role: ['UI Design', 'Front-end Dev'],
      what: 'One page website introducing the Polish book author, including detailed information about her debut release entitled "Nie widując gwiazd".',
      color: '#c30c11',
      bgColor: '#0a0a0a',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=80'
    },
    {
      id: 'dudow',
      title: ['dudow'],
      number: '03',
      when: '2016',
      role: 'UI Design',
      what: 'Web app where students can solve exercises, track their progress, and discuss topics presented in the classroom.',
      color: '#23a9e1',
      bgColor: '#0a0a0a',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&q=80'
    },
    {
      id: 'sons-da-copa',
      title: ['sons da', 'copa!'],
      number: '04',
      when: '2014',
      role: ['Art Direction', 'UI Design'],
      what: 'Mobile app featuring exclusive sounds for football supporters, featured by Apple as one of the best new apps in the App Store\'s Sports category.',
      color: '#c74cfa',
      bgColor: '#0a0a0a',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80'
    },
    {
      id: 'pactodigital',
      title: ['pacto', 'digital'],
      number: '05',
      when: '2014',
      role: ['Art Direction', 'UI Design'],
      what: 'Website and logo redesign for a digital agency, whose services include design and development of websites and mobile apps, and digital strategy.',
      color: '#365d99',
      bgColor: '#0a0a0a',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80'
    },
    {
      id: 'bikoo',
      title: ['bikoo'],
      number: '06',
      when: '2014',
      role: ['Art Direction', 'UI Design'],
      what: 'Mobile app and logo for a social delivery network, an alternative to traditional delivery methods, where users can send packages in a fast and convenient way.',
      color: '#ffce00',
      bgColor: '#0a0a0a',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80'
    }
  ];

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          if (!containerRef.current) return;
          
          const scrollTop = window.scrollY;
          const docHeight = containerRef.current.offsetHeight - window.innerHeight;
          const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
          
          setScrollProgress(progress);
          
          const projectIndex = Math.min(Math.floor(progress * projects.length), projects.length - 1);
          setActiveProject(projectIndex);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const getRotation = (index) => {
    const projectProgress = (scrollProgress * projects.length) - index;
    const clampedProgress = Math.max(0, Math.min(1.2, projectProgress));
    
    const startRotate = -50;
    const endRotate = 50;
    const rotation = startRotate + (clampedProgress * (endRotate - startRotate));
    
    return rotation;
  };

  const getImagePosition = (index) => {
    const projectProgress = (scrollProgress * projects.length) - index;
    const clampedProgress = Math.max(0, Math.min(1.2, projectProgress));
    
    const startY = 150;
    const endY = -50;
    const yPosition = startY - (clampedProgress * (startY - endY));
    
    return yPosition;
  };

  const getImageOpacity = (index) => {
    const projectProgress = (scrollProgress * projects.length) - index;
    if (projectProgress < -0.2 || projectProgress > 1.2) return 0;
    if (projectProgress < 0) return (projectProgress + 0.2) / 0.2;
    if (projectProgress > 1) return 1 - ((projectProgress - 1) / 0.2);
    return 1;
  };

  const currentProject = projects[activeProject];

  return (
    <div 
      ref={containerRef}
      style={{ 
        height: `${projects.length * 160}vh`, 
        backgroundColor: currentProject.bgColor,
        willChange: 'background-color'
      }}
      className="relative transition-colors duration-700"
    >
      {/* Fixed Header - Top Right */}
      <div 
        className="fixed top-0 right-0 z-50 origin-bottom-right"
        style={{
          transform: 'rotate(90deg) translateX(0)',
          transformOrigin: '100% 100%',
          bottom: 0,
          width: '100vh',
          fontSize: 'clamp(10px, 0.625rem + 0.5vw, 16px)',
          fontFamily: 'Georgia, serif',
          fontWeight: 900,
          letterSpacing: '0.3em',
          textTransform: 'lowercase',
          color: currentProject.color,
          transition: 'color 0.7s ease',
          willChange: 'color'
        }}
      >
        <div className="flex justify-between items-center px-8 py-4">
          <span className="opacity-80">Paul O'Rely</span>
          <span className="opacity-80">Works</span>
        </div>
      </div>

      {/* Fixed Left Side Numbers */}
      <div 
        className="fixed left-0 bottom-0 z-50 origin-bottom-left"
        style={{
          transform: 'rotate(-90deg)',
          transformOrigin: '0 100%',
          width: '100vh',
          fontSize: 'clamp(10px, 0.625rem + 0.5vw, 16px)',
          fontFamily: 'Georgia, serif',
          fontWeight: 900,
          letterSpacing: '0.3em',
          textTransform: 'lowercase',
          color: currentProject.color,
          transition: 'color 0.7s ease',
          willChange: 'color'
        }}
      >
        <div className="flex justify-between items-center px-8 py-4">
          <span className="opacity-80">{currentProject.number}</span>
          <span className="opacity-80">06</span>
        </div>
      </div>

      {/* Fixed Content Area - Left Side */}
      <div className="fixed left-0 top-0 w-full md:w-7/12 h-screen flex items-center justify-start z-40 px-6 md:px-12 lg:px-16">
        <div 
          className="max-w-2xl w-full"
          style={{
            color: currentProject.color,
            transition: 'color 0.7s ease',
            willChange: 'color',
          }}
        >
          <h2 
            className="mb-8 md:mb-12 leading-none"
            style={{
              fontFamily: 'Georgia, serif',
              fontWeight: 900,
              fontSize: 'clamp(3.5rem, 10vw, 9rem)',
              textTransform: 'lowercase',
              letterSpacing: '-0.02em',
              textAlign:"left"
            }}
          >
            {currentProject.title.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <div 
                  className="inline-block"
                  style={{
                    animation: `clipReveal-${activeProject} 0.75s cubic-bezier(0.15, 0.65, 0.2, 1) forwards`
                  }}
                >
                  {line}
                </div>
              </div>
            ))}
          </h2>

          <div className="flex gap-6 md:gap-10 mb-6 items-start">
            <div className="flex-shrink-0">
              <h3 
                className="mb-2 uppercase tracking-wider"
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  opacity: 0.5
                }}
              >
                when
              </h3>
              <p className="text-base md:text-lg font-medium whitespace-nowrap">{currentProject.when}</p>
            </div>
            <div className="flex-shrink-0">
              <h3 
                className="mb-2 uppercase tracking-wider"
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  opacity: 0.5
                }}
              >
                role
              </h3>
              <p className="text-base md:text-lg font-medium whitespace-nowrap">
                {Array.isArray(currentProject.role) 
                  ? currentProject.role.join(', ')
                  : currentProject.role
                }
              </p>
            </div>
            <div className="flex-1">
              <h3 
                className="mb-2 uppercase tracking-wider"
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  opacity: 0.5
                }}
              >
                what
              </h3>
              <p className="text-base md:text-lg leading-relaxed font-light">
                {currentProject.what}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Images - Right Side */}
      <div className="fixed right-0 top-0 w-full md:w-7/12 h-screen flex items-center justify-center pointer-events-none overflow-hidden">
        <div 
          className="relative w-full h-full"
          style={{
            perspective: '2000px',
            perspectiveOrigin: '50% 50%'
          }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="absolute"
              style={{
                opacity: getImageOpacity(index),
                transform: `translate(-50%, -50%) rotate3d(-0.5, 1, 0, ${getRotation(index)}deg)`,
                left: '55%',
                top: `${getImagePosition(index)}vh`,
                width: '85%',
                maxWidth: '750px',
                transition: 'none',
                willChange: 'transform, opacity, top'
              }}
            >
              <div 
                className="relative overflow-hidden bg-white shadow-2xl"
                style={{
                  borderRadius: '1.5vh',
                  border: '2px solid #ddd',
                  padding: '1vh',
                  paddingBottom: '4vh'
                }}
              >
                <div className="relative" style={{ paddingBottom: '56.25%' }}>
                  <img
                    src={project.image}
                    alt={project.title.join(' ')}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ 
                      borderRadius: '0.8vh',
                      imageRendering: 'crisp-edges'
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes clipReveal-0 {
          from {
            clip-path: polygon(0% 0%, 0% 100%, 0% 100%, 0% 100%, 0% 100%);
          }
          to {
            clip-path: polygon(0% 0%, 50% 0%, 100% 0%, 100% 100%, 0% 100%);
          }
        }
        @keyframes clipReveal-1 {
          from {
            clip-path: polygon(0% 0%, 0% 100%, 0% 100%, 0% 100%, 0% 100%);
          }
          to {
            clip-path: polygon(0% 0%, 50% 0%, 100% 0%, 100% 100%, 0% 100%);
          }
        }
        @keyframes clipReveal-2 {
          from {
            clip-path: polygon(0% 0%, 0% 100%, 0% 100%, 0% 100%, 0% 100%);
          }
          to {
            clip-path: polygon(0% 0%, 50% 0%, 100% 0%, 100% 100%, 0% 100%);
          }
        }
        @keyframes clipReveal-3 {
          from {
            clip-path: polygon(0% 0%, 0% 100%, 0% 100%, 0% 100%, 0% 100%);
          }
          to {
            clip-path: polygon(0% 0%, 50% 0%, 100% 0%, 100% 100%, 0% 100%);
          }
        }
        @keyframes clipReveal-4 {
          from {
            clip-path: polygon(0% 0%, 0% 100%, 0% 100%, 0% 100%, 0% 100%);
          }
          to {
            clip-path: polygon(0% 0%, 50% 0%, 100% 0%, 100% 100%, 0% 100%);
          }
        }
        @keyframes clipReveal-5 {
          from {
            clip-path: polygon(0% 0%, 0% 100%, 0% 100%, 0% 100%, 0% 100%);
          }
          to {
            clip-path: polygon(0% 0%, 50% 0%, 100% 0%, 100% 100%, 0% 100%);
          }
        }
      `}</style>
    </div>
  );
};

export default V321;

