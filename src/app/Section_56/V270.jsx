import { useState, useEffect, useRef } from 'react';

export default function V270() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotationY, setRotationY] = useState(-20);
  const [rotationX, setRotationX] = useState(0);
  const [loadedBooks, setLoadedBooks] = useState([]);
  const [autoRotate, setAutoRotate] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prevXRef = useRef(0);
  const autoRotateRef = useRef(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const books = [
    {
      id: 1,
      title: "The Origins of Efficiency",
      author: "Brian Potter",
      bgColor: "#0d121f",
      textColor: "#D0D1D4",
      spineColor: "#111",
      description: "Efficiency is the engine of civilization. But where do improvements in production efficiency come from? In The Origins of Efficiency, Brian Potter argues that improving production efficiency—finding ways to produce goods and services in less time, with less labor, using fewer resources—is the force behind some of the most consequential changes in human history.",
      coverImage: "https://images.ctfassets.net/fzn2n1nzq965/1Ihw0SzaJCMgAMgEKCZ05X/3c56461f66c8a3d350bf161225a259a5/OOE_bump.png?&w=1920"
    },
    {
      id: 2,
      title: "How Google Works",
      author: "Eric Schmidt & Jonathan Rosenberg",
      bgColor: "#E2E2E2",
      textColor: "#504F4F",
      spineColor: "#333",
      description: "An inside look at Google's unique culture and management principles that have made it one of the most innovative companies in the world.",
      coverImage: "https://images.ctfassets.net/fzn2n1nzq965/1Mu5x9yVhG5Bk4h58EV7sT/16e6fee37e30b9c28d77c7c020517a51/HGH_diffuse.png?fm=webp&q=60&w=1920"
    },
    {
      id: 3,
      title: "Scaling People",
      author: "Claire Hughes Johnson",
      bgColor: "#143199",
      textColor: "#dee6ff",
      spineColor: "#0d1f6b",
      description: "From a Stripe and Google executive, a practical guide to company building and scaling the most important resource it has: its people.",
      coverImage: "https://images.ctfassets.net/fzn2n1nzq965/1LxllmpIB1fQHaAhlHIhE7/2e00fcc34f68ed1165f3fb178300b2b3/SP_bump.png?&w=1920"
    },
    {
      id: 4,
      title: "Poor Charlie's Almanack",
      author: "Edited by Peter D. Kaufman",
      bgColor: "#C1B676",
      textColor: "#18185E",
      spineColor: "#8c7e4a",
      description: "From the legendary vice-chairman of Berkshire Hathaway, lessons in investment strategy, philanthropy, and living a rational and ethical life.",
      coverImage: "https://images.ctfassets.net/fzn2n1nzq965/1KFHzXs8DH4ldMmY3QsE0f/5ed293640535502f5ef38b385c5204bc/PCA_bump.png?&w=1920"
    },
    {
      id: 5,
      title: "The Dream Machine",
      author: "M. Mitchell Waldrop",
      bgColor: "#1a1a2e",
      textColor: "#e0e0e0",
      spineColor: "#0f0f1a",
      description: "The untold story of the visionaries who invented the modern computer and changed the world forever.",
      coverImage: "https://images.ctfassets.net/fzn2n1nzq965/1UEFL6ze2ortMaoPIJH4y8/a557300ee8519d4fcf846a7310074588/TDM_foil.png?fm=webp&q=60&w=1920"
    },
    {
      id: 6,
      title: "Where Is My Flying Car?",
      author: "J. Storrs Hall",
      bgColor: "#2d4a5c",
      textColor: "#e8f4f8",
      spineColor: "#1a2d3a",
      description: "A serious investigation into the technological and cultural forces that have stalled progress in key areas of innovation.",
      coverImage: "https://images.ctfassets.net/fzn2n1nzq965/1BP6fmkh8YJQGnVPFrZ5Hj/cc61d1947d2f1a91c9c9d45376d50cc5/WIMFC_bump.jpg?w=1920"
    },
    {
      id: 7,
      title: "The Innovator's Dilemma",
      author: "Clayton M. Christensen",
      bgColor: "#3a2f2f",
      textColor: "#f0d8c8",
      spineColor: "#241f1f",
      description: "The revolutionary book that will change the way you do business, explaining why great companies fail and how to avoid their fate.",
      coverImage: "https://images.ctfassets.net/fzn2n1nzq965/1WghVN4OzScMvJlXtCD71S/a2908a652953f2040a2771905767a49e/WIMFC_foil.png?w=1920"
    },
    {
      id: 8,
      title: "The City Reader",
      author: "Richard T. LeGates",
      bgColor: "#4a5568",
      textColor: "#e2e8f0",
      spineColor: "#2d3748",
      description: "A comprehensive anthology of classic and contemporary writings on urban theory, history, and planning.",
      coverImage: "https://images.ctfassets.net/fzn2n1nzq965/1jaEGHAlr4SF2ZWF7tNfuL/4233ad5d2321e98e71522105b86426a6/texture-city-rect.jpg"
    },
    {
      id: 9,
      title: "Origins of Efficiency",
      author: "Brian Potter",
      bgColor: "#2c1810",
      textColor: "#ddc8b0",
      spineColor: "#1a0f08",
      description: "A deep dive into the historical forces and innovations that have driven efficiency improvements throughout human civilization.",
      coverImage: "https://images.ctfassets.net/fzn2n1nzq965/1xQULP0LAfZ9qWRpaYaO5p/55f731aaa07a4056df0de31d8507699c/OOE_diffuse.jpg?w=1920"
    },
    {
      id: 10,
      title: "The Startup Accelerator",
      author: "Multiple Authors",
      bgColor: "#4a1a3a",
      textColor: "#f0c8e0",
      spineColor: "#2d0f24",
      description: "Essential insights and strategies for building and scaling successful startups from founders and investors.",
      coverImage: "https://images.ctfassets.net/fzn2n1nzq965/2CGmRH2GstW66s5KNTW2B5/c4f90da5ae1d4e6c19255736e7caf14b/SA_diffuse.png?fm=webp&q=60&w=1920"
    }
  ];

  useEffect(() => {
    books.forEach((_, index) => {
      setTimeout(() => {
        setLoadedBooks(prev => [...prev, index]);
      }, index * 250);
    });
  }, []);

  // Auto-rotation effect
  useEffect(() => {
    if (autoRotate) {
      autoRotateRef.current = setInterval(() => {
        setRotationY(prev => prev + 0.5);
      }, 16);
    } else {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    }
    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [autoRotate]);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setAutoRotate(false);
    prevXRef.current = e.touches[0].clientX;
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - prevXRef.current;
    setRotationY(prev => prev + deltaX * 0.5);
    prevXRef.current = e.touches[0].clientX;
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setAutoRotate(false);
    prevXRef.current = e.clientX;
    e.preventDefault();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - prevXRef.current;
    setRotationY(prev => prev + deltaX * 0.5);
    prevXRef.current = e.clientX;
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove);
      return () => {
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [isDragging]);

  const showBookDetail = (bookId) => {
    const book = books.find(b => b.id === bookId);
    setSelectedBook(book);
    setRotationY(-20);
    setRotationX(0);
    setAutoRotate(true);
  };

  const closeDetail = () => {
    setSelectedBook(null);
    setAutoRotate(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#0b1220' }}>
      <style jsx>{`
        @keyframes bookEntranceLeft {
          0% {
            transform: perspective(1200px) rotateX(-20deg) rotateY(-25deg) rotateZ(2deg) translateX(-100vw) scale(1);
            opacity: 0;
          }
          100% {
            transform: perspective(1200px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateX(0) scale(1);
            opacity: 1;
          }
        }
        @keyframes bookEntranceRight {
          0% {
            transform: perspective(1200px) rotateX(-20deg) rotateY(25deg) rotateZ(-2deg) translateX(100vw) scale(1);
            opacity: 0;
          }
          100% {
            transform: perspective(1200px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateX(0) scale(1);
            opacity: 1;
          }
        }
        .book-loaded-left {
          animation: bookEntranceLeft 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .book-loaded-right {
          animation: bookEntranceRight 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .book-initial-left {
          transform: perspective(1200px) rotateX(-20deg) rotateY(-25deg) rotateZ(2deg) translateX(-100vw) scale(1);
          opacity: 0;
        }
        .book-initial-right {
          transform: perspective(1200px) rotateX(-20deg) rotateY(25deg) rotateZ(-2deg) translateX(100vw) scale(1);
          opacity: 0;
        }
      `}</style>

      {/* Book List View */}
      {!selectedBook && (
        <div className="flex flex-col items-center py-10 md:py-20">
          {books.map((book, index) => {
            const fromRight = index % 2 === 1;
            const isLoaded = loadedBooks.includes(index);
            
            return (
              <div key={book.id} className="w-full flex items-center justify-center py-4 md:py-10">
                <div
                  className={`relative cursor-pointer transition-transform duration-1000 ${
                    fromRight 
                      ? (isLoaded ? 'book-loaded-right' : 'book-initial-right')
                      : (isLoaded ? 'book-loaded-left' : 'book-initial-left')
                  }`}
                  style={{
                    width: isMobile ? '90vw' : '500px',
                    maxWidth: '500px',
                    height: isMobile ? '80px' : '120px',
                    transformStyle: 'preserve-3d'
                  }}
                  onClick={() => showBookDetail(book.id)}
                >
                  {/* Spine */}
                  <div
                    className="absolute w-full h-full flex items-center justify-between px-4 md:px-10 rounded-sm"
                    style={{
                      background: book.bgColor,
                      color: book.textColor,
                      transform: 'translateZ(25px)',
                      borderLeft: `3px solid ${book.textColor}33`,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
                    }}
                  >
                    <div className="text-xs md:text-sm tracking-wide">{book.author}</div>
                    <div className="text-sm md:text-base font-semibold tracking-wide flex-1 text-center px-4 md:px-8">{book.title}</div>
                    <div 
                      className="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs"
                      style={{ border: `2px solid ${book.textColor}` }}
                    >
                      SP
                    </div>
                  </div>

                  {/* Side */}
                  <div
                    className="absolute w-12 h-full right-0"
                    style={{
                      background: `linear-gradient(to right, ${book.bgColor}dd, ${book.bgColor})`,
                      transform: 'rotateY(-90deg) translateZ(25px)',
                      boxShadow: 'inset -5px 0 10px rgba(0,0,0,0.3)'
                    }}
                  />

                  {/* Top */}
                  <div
                    className="absolute w-full h-12 top-0"
                    style={{
                      background: book.bgColor,
                      opacity: 0.9,
                      transform: isMobile ? 'rotateX(90deg) translateZ(40px)' : 'rotateX(90deg) translateZ(60px)',
                      boxShadow: 'inset 0 5px 10px rgba(0,0,0,0.2)'
                    }}
                  />

                  {/* Pages Side */}
                  <div
                    className="absolute w-12 h-full right-0"
                    style={{
                      background: 'repeating-linear-gradient(to bottom, #fff 0px, #fff 1px, #f5f5f0 1px, #f5f5f0 2px)',
                      transform: isMobile ? 'rotateY(90deg) translateZ(calc(90vw - 50px))' : 'rotateY(90deg) translateZ(475px)',
                      boxShadow: 'inset 0 0 8px rgba(0,0,0,0.15)'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Book Detail View */}
      {selectedBook && (
        <div 
          className="min-h-screen p-4 md:p-16 transition-all duration-500"
          style={{ 
            background: selectedBook.bgColor,
            perspective: '1200px'
          }}
        >
          {/* Back Button */}
          <button
            onClick={closeDetail}
            className="fixed left-4 md:left-10 top-4 md:top-10 bg-transparent border-none cursor-pointer text-2xl z-50 p-2"
            style={{ color: selectedBook.textColor }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Detail Content */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-20 max-w-7xl mx-auto items-start pt-16 md:pt-20">
            {/* 3D Book Container */}
            <div className="w-full md:flex-none md:w-96 flex justify-center">
              <div
                className="relative transition-transform duration-500"
                style={{
                  width: isMobile ? '200px' : '300px',
                  height: isMobile ? '300px' : '450px',
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
                  cursor: isDragging ? 'grabbing' : 'grab'
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
              >
                {/* Cover */}
                <div
                  className="absolute overflow-hidden"
                  style={{
                    width: isMobile ? '200px' : '300px',
                    height: isMobile ? '300px' : '450px',
                    transform: 'translateZ(25px)',
                    background: selectedBook.bgColor,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <img src={selectedBook.coverImage} alt={selectedBook.title} className="w-full h-full object-cover" />
                </div>

                {/* Back */}
                <div
                  className="absolute"
                  style={{
                    width: isMobile ? '200px' : '300px',
                    height: isMobile ? '300px' : '450px',
                    background: selectedBook.bgColor,
                    transform: 'rotateY(180deg) translateZ(25px)',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
                    backfaceVisibility: 'hidden'
                  }}
                />

                {/* Spine 3D */}
                <div
                  className="absolute"
                  style={{
                    width: '50px',
                    height: isMobile ? '300px' : '450px',
                    background: `linear-gradient(90deg, ${selectedBook.spineColor} 0%, ${selectedBook.bgColor} 50%, ${selectedBook.spineColor} 100%)`,
                    color: selectedBook.textColor,
                    transform: 'rotateY(-90deg) translateZ(25px)',
                    boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.3)'
                  }}
                >
                  <div className="absolute flex flex-col items-center justify-between w-full h-full py-8 px-1">
                    <div 
                      className="text-[10px] tracking-wide whitespace-nowrap"
                      style={{ 
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)'
                      }}
                    >
                      {selectedBook.author}
                    </div>
                    <div 
                      className="text-[11px] font-semibold tracking-wide whitespace-nowrap flex-1 flex items-center justify-center"
                      style={{ 
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)'
                      }}
                    >
                      {selectedBook.title}
                    </div>
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px]"
                      style={{ 
                        border: `2px solid ${selectedBook.textColor}`
                      }}
                    >
                      SP
                    </div>
                  </div>
                </div>

                {/* Pages */}
                <div
                  className="absolute"
                  style={{
                    width: '50px',
                    height: isMobile ? '300px' : '450px',
                    background: 'repeating-linear-gradient(to bottom, #fff 0px, #fff 2px, #f2f2f2 2px, #f2f2f2 4px)',
                    transform: isMobile ? 'rotateY(90deg) translateZ(175px)' : 'rotateY(90deg) translateZ(275px)',
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.15)'
                  }}
                />

                {/* Top */}
                <div
                  className="absolute left-0 top-0"
                  style={{
                    width: isMobile ? '200px' : '300px',
                    height: '50px',
                    background: '#f5f5f0',
                    transform: isMobile ? 'rotateX(90deg) translateZ(150px)' : 'rotateX(90deg) translateZ(225px)',
                    boxShadow: 'inset 0 5px 10px rgba(0,0,0,0.15)'
                  }}
                />

                {/* Bottom */}
                <div
                  className="absolute left-0 bottom-0"
                  style={{
                    width: isMobile ? '200px' : '300px',
                    height: '50px',
                    background: '#f5f5f0',
                    transform: isMobile ? 'rotateX(-90deg) translateZ(150px)' : 'rotateX(-90deg) translateZ(225px)',
                    boxShadow: 'inset 0 -5px 10px rgba(0,0,0,0.15)'
                  }}
                />

                {/* Shadow */}
                <div
                  className="absolute left-1/2 -translate-x-1/2"
                  style={{
                    bottom: '-40px',
                    width: '180%',
                    height: '40px',
                    background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.4), transparent 70%)',
                    filter: 'blur(8px)'
                  }}
                />
              </div>
            </div>

            {/* Info Section */}
            <div className="flex-1 pt-4 md:pt-10" style={{ color: selectedBook.textColor }}>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                {selectedBook.title}
              </h1>
              <h2 className="text-xl md:text-2xl italic font-medium mb-6 md:mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                {selectedBook.author}
              </h2>
              <div className="w-16 h-px my-6 md:my-8" style={{ background: selectedBook.textColor }} />
              <p className="text-base md:text-lg leading-relaxed mt-6">
                {selectedBook.description}
              </p>

              {/* Purchase Section */}
              <div className="mt-8 md:mt-10 flex flex-col">
                <div className="text-lg md:text-xl italic mb-4">Purchase options</div>
                {['Amazon', 'Bookshop', 'Barnes & Noble'].map((store) => (
                  <a
                    key={store}
                    href="#"
                    className="flex items-center justify-between p-3 md:p-4 -mb-px font-semibold transition-all text-sm md:text-base"
                    style={{
                      border: `1px solid ${selectedBook.textColor}`,
                      color: selectedBook.textColor
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <span>Purchase on {store}</span>
                    <span>$40</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}