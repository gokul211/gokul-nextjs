'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function V206() {
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

      const endGap = Math.min(100, Math.round(viewportWidth * 0.08));
      const maxTranslateX = Math.max(0, totalScrollWidth - viewportWidth);
      const effectiveMax = Math.max(0, maxTranslateX - endGap);

      targetX.current = -effectiveMax * progress;
    }

    function animate() {
      currentX.current += (targetX.current - currentX.current) * 0.08;
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
    <section ref={containerRef} className="relative h-[300vh] bg-gradient-to-b from-pink-50 to-purple-100">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="px-4 sm:px-6 md:px-10 text-center">
          <p className="uppercase text-sm font-semibold tracking-widest text-pink-600">
            Shop the Latest Sweets
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-2 text-purple-900">
            Discover the 4 hidden realms <br /> of our Candy Kingdom
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-700 max-w-xl mx-auto">
            Scroll down to move horizontally through the realms. Tap a card to reveal candies in all corners.
          </p>
        </div>

        {/* Mobile-friendly Horizontal scroller */}
        <div
          ref={scrollerRef}
          className="flex will-change-transform gap-4 sm:gap-6 mt-10 px-2 sm:px-6"
          style={{
            width: 'max-content',
            paddingRight: '8vw',
          }}
        >
          {cards.map((item, i) => (
            <div
              key={i}
              className="shrink-0 w-[80vw] sm:w-[55vw] max-w-[500px] group relative rounded-2xl bg-white shadow-lg overflow-visible"
            >
              <div
                className="relative h-[260px] sm:h-[320px] flex items-center justify-center rounded-t-2xl"
                style={{
                  backgroundImage: `url(${item.bg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <Image
                  alt={`${item.name} stamp`}
                  src={item.stamp}
                  width={400}
                  height={200}
                  className="relative z-10 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2"
                />
                <div className="pointer-events-none absolute inset-0">
                  {item.candies.map((candy, j) => {
                    let pos = '';
                    if (j === 0) pos = 'top-0 left-0 -translate-x-4 -translate-y-4';
                    else if (j === 1) pos = 'top-0 right-0 translate-x-4 -translate-y-4';
                    else if (j === 2) pos = 'bottom-0 left-0 -translate-x-4 translate-y-4';
                    else if (j === 3) pos = 'bottom-0 right-0 translate-x-4 translate-y-4';

                    return (
                      <Image
                        key={j}
                        alt={`candy-${j}`}
                        src={candy}
                        width={120}
                        height={120}
                        className={`absolute ${pos} scale-0 transition-transform duration-500 group-hover:scale-100`}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="space-y-2 px-4 py-4 sm:px-6 sm:py-6 text-center">
                <h3 className="text-lg sm:text-xl font-bold uppercase text-gray-900">
                  {item.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
