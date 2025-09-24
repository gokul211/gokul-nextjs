"use client";
import React, { useRef, useLayoutEffect, useState } from "react";

export default function V176() {
  const slides = [
    "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/ssqogad3ce12f2d324342bf4fdfe10bd8930f?orig=true",
    "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/ssqogff58c21122004417a01f95ad41c856d4?orig=true",
    "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/ssqog1a5981a92b284285a1c7786087b31211?orig=true",
  ];

  const shapeUrl =
    "https://gramentheme.com/html/fresheat/assets/img/shape/offerShape1_4.png";

  const loopSlides = [...slides, ...slides, ...slides];
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    function update() {
      const totalWidth = el.scrollWidth;
      el.style.setProperty("--scroll-distance", `${totalWidth / 3}px`);
      const duration = 15; // smaller = faster
      el.style.setProperty("--duration", `${duration}s`);
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const togglePause = () => {
    if (!trackRef.current) return;
    if (paused) {
      trackRef.current.style.animationPlayState = "running";
    } else {
      trackRef.current.style.animationPlayState = "paused";
    }
    setPaused(!paused);
  };

  return (
    <div className="relative bg-[#181818] py-12 overflow-hidden">
      {/* ✅ Fixed max-width container */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="overflow-hidden relative" onClick={togglePause}>
          <div
            ref={trackRef}
            className="flex items-stretch cursor-pointer"
            style={{
              gap: "20px",
              animation: "v156-scroll var(--duration) linear infinite",
              transform: "translate3d(0,0,0)",
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {loopSlides.map((src, idx) => (
              <div
                key={idx}
                className="flex-none w-[280px] md:w-[340px] lg:w-[380px]"
              >
                <div className="relative flex flex-col items-center rounded-2xl shadow-xl p-6 bg-[#202020] min-h-[320px]">
                  {/* Product Image with Badge */}
                  <div className="relative w-full flex justify-center">
                    <img
                      src={src}
                      alt={`thumb-${idx}`}
                      className="offer-img max-h-[180px] object-contain drop-shadow-lg"
                    />

                    {/* Pumping Badge */}
                    <div
                      className="offer-badge-img absolute -top-5 -right-5 z-20 flex items-center justify-center"
                      aria-hidden="true"
                      style={{
                        backgroundImage: `url(${shapeUrl})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                    >
                      {/* <span className="offer-badge-text">50% OFF</span> */}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="z-10 text-white space-y-3 text-center mt-6">
                    <h6 className="text-sm font-medium tracking-wider uppercase text-[#FC791A]">
                      On This Week
                    </h6>
                    <h3 className="text-lg md:text-xl font-bold">
                      Spicy Fried Chicken
                    </h3>
                    <p className="text-xs md:text-sm text-gray-400">
                      Limited Time Offer
                    </p>
                    <a
                      href="menu.html"
                      className="inline-flex items-center gap-2 text-white text-sm font-semibold px-6 py-2 rounded-full transition bg-[#EB0029] hover:bg-[#FC791A]"
                    >
                      ORDER NOW
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes v156-scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(calc(-1 * var(--scroll-distance)), 0, 0);
          }
        }

        .offer-badge-img {
          width: 64px;
          height: 64px;
          animation: pump 1.2s ease-in-out infinite;
          filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.35));
        }

        .offer-badge-text {
          color: #fff;
          font-weight: 700;
          font-size: 12px;
          text-align: center;
          line-height: 1;
        }

        .offer-img {
          animation: imgPulse 6s ease-in-out infinite;
          transition: transform 300ms ease;
        }

        @keyframes pump {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.95;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes imgPulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
