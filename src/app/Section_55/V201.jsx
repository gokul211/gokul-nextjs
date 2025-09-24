"use client";
import React, { useEffect, useRef, useState } from "react";

export default function V201() {
  const reviews = [

      {
      id: "emma",
      img: "https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Freviewcards%2Femma.png&w=1920&q=75",
      text:
        "I thought I knew good candy, but then I tried this. The perfect mix of sweet, salty, and sour flavors keeps me coming back for more. The gummies are so fresh and fruity! Yum! My snack drawer will never be the same!",
      author: "Sarah D.",
    },

    {
      id: "johny",
      img: "https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Freviewcards%2Fjohny.png&w=1920&q=75",
      text:
        "This candy is dangerously good! The balance of flavors is unreal! I keep telling myself just one more piece…but who am I kidding?",
      author: "Johnny T.",
    },
    
      {
      id: "amanda",
      img: "https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Freviewcards%2Famanda.png&w=1920&q=75",
      text:
        "If you haven't tried Swedish candy, you're missing out! The textures, the flavors, the perfect amount of chew, eeeverything is just right! I ordered once as a treat, and now I'm hooked. Consider me a lifelong fan!",
      author: "Amanda R.",
    },
    {
      id: "lilly",
      img: "https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Freviewcards%2Flilly.png&w=1920&q=75",
      text:
        "I ordered a little bit of everything, and now I can't stop! The liquorice is bold, the chocolate melts perfectly, and the sour candy? WOW. My taste buds are still recovering (in the best way)!",
      author: "Lilly L.",
    },

  ];

  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lerp = (a, b, t) => a + (b - a) * t;
  const offscreenX = 120;
  const offscreenY = 200;

  return (
    <section className="relative overflow-x-clip bg-gradient-to-b from-purple-100 to-purple-200">
      <div ref={containerRef} className="relative container mx-auto">
        {/* Sticky Center Area */}
        <div className="sticky top-0 h-screen flex items-center justify-center">
          {/* Bombon fans Text + Shake Images */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-0">
  <h1 className="font-akina text-[7.5rem] leading-[1.1] text-purple-900 uppercase max-xl:!text-[9.75rem] max-lg:!text-[9.75rem] max-md:!text-[5.18rem] max-sm:!text-[3.62rem]">
    BOMBON FANS <br />
    CAN’T STOP <br />
    TALKING!
  </h1>

  {/* Shake Images */}
  <img
    src="https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fpurpleheart.png&w=640&q=75"
    alt="purpleheart"
    className="absolute top-0 left-[-320px] w-80 max-md:w-40 animate-shakeHeart"
  />
  <img
    src="https://bombon.rs/_next/image?url=%2Fimages%2Fhome%2Fpurplebear.png&w=640&q=75"
    alt="purplebear"
    className="absolute bottom-0 right-[-320px] w-80 max-md:w-40 animate-shakeBear"
  />
</div>


          {/* Review Cards */}
          <div className="relative w-full max-w-[1100px] h-screen text-left flex items-center justify-center">
            {reviews.map((r, i) => {
              const winH =
                typeof window !== "undefined" ? window.innerHeight : 800;
              const rect = containerRef.current?.getBoundingClientRect();
              const containerTop = rect ? window.scrollY + rect.top : 0;

              const clamped = Math.max(0, scrollY - containerTop);
              const stepStart = i * winH;
              const stepEnd = (i + 1) * winH;
              let prog = (clamped - stepStart) / winH;
              prog = Math.max(0, Math.min(1, prog));

              if (i === 0 && scrollY === 0) prog = 1;

              const fromLeft = i % 2 === 0;
              const fromTop = i % 2 !== 0;

              let translateX = lerp(fromLeft ? -offscreenX : offscreenX, 0, prog);
              let translateY = lerp(fromTop ? -offscreenY : offscreenY, 0, prog);
              let rotate = lerp(fromLeft ? -8 : 8, 0, prog);
              let scale = lerp(0.9, 1, prog);
              let opacity = prog > 0 ? 1 : 0;
              let zIndex = 100 + i;

              if (prog === 1) {
                const active = Math.floor(clamped / winH);
                if (i < active) {
                  const stackIdx = active - i;
                  translateY = -20 * stackIdx;
                  scale = 1 - Math.min(0.05 * stackIdx, 0.15);
                  rotate = i % 2 === 0 ? -2 : 2;
                  zIndex = 100 - stackIdx;
                }
              }

              const transform = `translate(-50%, -50%) translate(${translateX}%, ${translateY}px) rotate(${rotate}deg) scale(${scale})`;

              return (
                <div
                  key={r.id}
                  className="absolute left-1/2 top-1/2 w-[900px] max-w-[92%] rounded-[2rem] bg-purple-50 shadow-lg flex items-center justify-between gap-10 p-6 max-md:flex-col max-md:w-[92%] transition-transform duration-500 ease-out hover:z-50"
                  style={{
                    transform,
                    opacity,
                    zIndex,
                  }}
                >
                  <div className="w-1/2 rounded-[2rem] max-md:w-full overflow-hidden">
                    <img
                      src={r.img}
                      alt={`${r.author} review`}
                      loading="lazy"
                      className="object-cover w-full h-[420px] rounded-[2rem] max-md:h-60"
                    />
                  </div>
                  <div className="w-1/2 pr-20 max-md:w-full max-sm:pr-0">
                    <div className="flex gap-2 mb-5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <svg
                          key={idx}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                          className="w-6 h-6 text-pink-300"
                          fill="currentColor"
                        >
                          <path d="M316.9 18c-5.3-11-16.5-18-28.8-18s-23.4 7-28.8 18L195 150.3L51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329l-24.6 145.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5l128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329l104.2-103.1c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7l-143.7-21.2z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-[1rem] md:text-[1.05rem] text-gray-800 leading-[1.05]">
                      {r.text}
                    </p>
                    <p className="mt-12 font-bold">{r.author}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Spacer for each card */}
        <div>
          {reviews.map((r) => (
            <div key={`step-${r.id}`} className="h-screen" />
          ))}
        </div>
      </div>

      {/* Shake Animations */}
      <style jsx>{`
        @keyframes shakeHeart {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          25% { transform: translate(2px, -2px) rotate(2deg); }
          50% { transform: translate(-2px, 2px) rotate(-2deg); }
          75% { transform: translate(2px, -2px) rotate(1deg); }
          100% { transform: translate(0px, 0px) rotate(0deg); }
        }
        @keyframes shakeBear {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          25% { transform: translate(-2px, 2px) rotate(-1deg); }
          50% { transform: translate(2px, -2px) rotate(2deg); }
          75% { transform: translate(-2px, 2px) rotate(-2deg); }
          100% { transform: translate(0px, 0px) rotate(0deg); }
        }
        .animate-shakeHeart {
          animation: shakeHeart 2s infinite;
        }
        .animate-shakeBear {
          animation: shakeBear 2s infinite;
        }
      `}</style>
    </section>
  );
}
