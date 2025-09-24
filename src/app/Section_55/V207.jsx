'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function V207() {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const targetX = useRef(0);
  const currentX = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    if (!container || !scroller) return;

    function onScroll() {
      const totalScrollWidth = scroller.scrollWidth;
      const viewportWidth = window.innerWidth;

      const rect = container.getBoundingClientRect();
      const start = rect.top + window.scrollY;
      const end = start + container.offsetHeight - window.innerHeight;

      const progress = Math.min(
        Math.max((window.scrollY - start) / (end - start), 0),
        1
      );

      // only right gap
      const endGap = Math.min(160, Math.round(viewportWidth * 0.06));

      const maxTranslateX = Math.max(0, totalScrollWidth - viewportWidth);

      // effective max scroll
      const effectiveMax = Math.max(0, maxTranslateX - endGap);

      targetX.current = -effectiveMax * progress;
    }

    function animate() {
      currentX.current += (targetX.current - currentX.current) * 0.02;
      if (scroller) {
        scroller.style.transform = `translate3d(${currentX.current}px, 0, 0)`;
      }
      rafId.current = requestAnimationFrame(animate);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    onScroll();
    animate();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const cards = [
    {
      name: 'Sugar Rush',
      bg: 'https://bombon.rs/images/home/collections/sugar-rush/pattern.svg',
      stamp: 'https://bombon.rs/images/home/collections/sugar-rush/stamp.svg',
      candies: [
        'https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fsugar-rush%2Fcandy1.png&w=640&q=75',
        'https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fsugar-rush%2Fcandy2.png&w=640&q=75',
        'https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fsugar-rush%2Fcandy3.png&w=640&q=75',
        'https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fsugar-rush%2Fcandy4.png&w=640&q=75',
      ],
      desc: 'The pink heart of the kingdom ruled by sparkle, charm and a dash of royal mischief.',
    },
    {
      name: 'Sour Power',
      bg: 'https://bombon.rs/images/home/collections/sour-power/pattern.svg',
      stamp: 'https://bombon.rs/images/home/collections/sour-power/stamp.svg',
      candies: [
        'https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fsour-power%2Fcandy1.png&w=640&q=75',
        'https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fsour-power%2Fcandy2.png&w=640&q=75',
        'https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fsour-power%2Fcandy3.png&w=640&q=75',
        'https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fsour-power%2Fcandy4.png&w=640&q=75',
      ],
      desc: 'A wild green land where clever minds and sour tongues play by their own rules.',
    },
    {
      name: 'Cocoa Bliss',
      bg: 'https://bombon.rs/images/home/collections/cocoa-bliss/pattern.svg',
      stamp: 'https://bombon.rs/images/home/collections/cocoa-bliss/stamp.svg',
      candies: [
        'https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fcocoa-bliss%2Fcandy5.png&w=640&q=75',
        'https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fcocoa-bliss%2Fcandy4.png&w=640&q=75',
        'https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fcocoa-bliss%2Fcandy3.png&w=640&q=75',
        'https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Fcocoa-bliss%2Fcandy2.png&w=640&q=75',
      ],
      desc: 'A cocoa-rich paradise where rivers flow with fudge and mountains hide golden truffles.',
    },
    {
      name: 'Licorizz',
      bg: 'https://bombon.rs/images/home/collections/licorizz/pattern.svg',
      stamp: 'https://bombon.rs/images/home/collections/licorizz/stamp.svg',
      candies: [
        'https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Flicorizz%2Fcandy1.png&w=640&q=75',
        'https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Flicorizz%2Fcandy2.png&w=640&q=75',
        'https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Flicorizz%2Fcandy3.png&w=640&q=75',
        'https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fcollections%2Flicorizz%2Fcandy4.png&w=640&q=75',
      ],
      desc: 'Elegant and enigmatic, Licorizz is the smoky-black capital of cool – where flavor speaks in whispers.',
    },
  ];

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-purple-50">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-8 mt-15 flex flex-col gap-4 items-start md:items-center lg:items-start">
            <p className="uppercase text-xl font-semibold tracking-wide text-gray-800">
              SHOP THE LATEST SWEETS
            </p>
            <h2 className="text-3xl lg:text-5xl font-extrabold leading-tight tracking-wide text-gray-900 text-left md:text-center lg:text-left">
              Discover the 4 hidden realms <br></br>of our Candy Kingdom
            </h2>
            <p className="text-lg max-w-4xl text-gray-700 text-left md:text-center lg:text-left">
              Scroll down to move horizontally through the realms.Hover a card to reveal candies in all corners.
          
            </p>
          </div>

          {/* Horizontal scroller */}
          <div
            ref={scrollerRef}
            className="flex will-change-transform gap-5"
            style={{
              width: 'max-content',
              paddingRight: '6vw', // right gap only
           
            }}
          >
            {/* <h1>Hiiii</h1> */}
            {cards.map((item, i) => (
              <div
                key={i}
                className="shrink-0 w-[70vw] md:w-[45vw] max-w-[800px] group relative rounded-3xl bg-white shadow-lg overflow-visible ml-0 first:ml-0 md:ml-6"
              >
                
                <div
                  className="relative h-[360px] flex items-center justify-center"
                  style={{
                    backgroundImage: `url(${item.bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <Image
                    alt={`${item.name} stamp`}
                    src={item.stamp}
                    width={600}
                    height={260}
                    className="relative z-10 transition-transform duration-500 group-hover:scale-[1.05] group-hover:-rotate-3"
                  />
                  <div className="pointer-events-none absolute inset-0">
                    
                    {item.candies.map((candy, j) => {
                      let pos = '';
                      if (j === 0) pos = 'top-0 left-0 -translate-x-6 -translate-y-6';
                      else if (j === 1) pos = 'top-0 right-0 translate-x-6 -translate-y-6';
                      else if (j === 2) pos = 'bottom-0 left-0 -translate-x-6 translate-y-6';
                      else if (j === 3) pos = 'bottom-0 right-0 translate-x-6 translate-y-6';

                      return (
                        
                        <Image
                          key={j}
                          alt={`candy-${j}`}
                          src={candy}
                          width={160}
                          height={160}
                          className={`absolute ${pos} scale-0 transition-transform duration-500 group-hover:scale-100`}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="space-y-3 px-6 py-6">
                  <h3 className="text-xl font-bold uppercase text-gray-900">
                    {item.name}
                  </h3>
                  
                  <p className="text-base text-gray-700">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
