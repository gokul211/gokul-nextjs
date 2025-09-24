"use client";
import React, { useRef, useLayoutEffect } from "react";

export default function V175() {
  const slides = [
    "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/ssqogad3ce12f2d324342bf4fdfe10bd8930f?orig=true",
    "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/ssqogff58c21122004417a01f95ad41c856d4?orig=true",
    "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/ssqog1a5981a92b284285a1c7786087b31211?orig=true",
    "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/ssqogad3ce12f2d324342bf4fdfe10bd8930f?orig=true",
    "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/ssqogff58c21122004417a01f95ad41c856d4?orig=true",
    "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/ssqog1a5981a92b284285a1c7786087b31211?orig=true",
    "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/ssqogad3ce12f2d324342bf4fdfe10bd8930f?orig=true",
    "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/ssqogff58c21122004417a01f95ad41c856d4?orig=true",
    "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/ssqog1a5981a92b284285a1c7786087b31211?orig=true",
  ];

  const shapeUrl =
    "https://gramentheme.com/html/fresheat/assets/img/shape/offerShape1_4.png";

  const loopSlides = [...slides, ...slides, ...slides];
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    function update() {
      const totalWidth = el.scrollWidth;
      el.style.setProperty("--scroll-distance", `${totalWidth / 3}px`);

      const duration = 15; // smaller = faster
      el.style.setProperty("--duration", `${duration}s`);
      el.style.setProperty("--start-offset", `0s`);
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pause = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  };
  const resume = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  };

  return (
    <div className="relative bg-[#181818] py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          className="overflow-hidden relative"
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          <div
            ref={trackRef}
            className="flex items-stretch"
            style={{
              gap: "16px",
              animation: "v155-scroll var(--duration) linear infinite",
              transform: "translate3d(0,0,0)",
            }}
          >
            {loopSlides.map((src, idx) => (
              <div key={idx} className="flex-none w-1/3 min-w-[33.3333%]">
                <div
                  className="relative flex flex-col md:flex-row items-center rounded-lg p-6 min-h-[280px] bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url(https://gramentheme.com/html/fresheat/assets/img/bg/offerBG1_1.jpg)",
                  }}
                >
                  {/* Content */}
                  <div className="z-10 text-white space-y-2 md:w-1/2 w-full">
                    <h6 className="text-sm font-medium tracking-wider">
                      ON THIS WEEK
                    </h6>
                    <h3 className="text-2xl font-bold">SPICY FRIED CHICKEN</h3>
                    <p className="text-sm text-gray-300">Limited Time Offer</p>
                    <a
                      href="menu.html"
                      className="inline-flex items-center gap-2 text-white text-sm font-semibold px-5 py-2 rounded-full transition bg-[#EB0029] hover:bg-[#FC791A]"
                    >
                      ORDER NOW
                    </a>
                  </div>

                  {/* Image + shape badge */}
                  <div className="md:w-1/2 w-full flex justify-end md:justify-end mt-4 md:mt-0">
                    <div className="relative">
                      {/* ✅ Shape image only */}
                      <div
                        className="offer-badge-img absolute -top-6 right-30 z-20"
                        aria-hidden="true"
                        style={{
                          backgroundImage: `url(${shapeUrl})`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                      />
                      <img
                        src={src}
                        alt={`thumb-${idx}`}
                        className="offer-img max-h-[140px] object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes v155-scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(calc(-1 * var(--scroll-distance)), 0, 0);
          }
        }

        /* shape image as badge container */
        .offer-badge-img {
          width: 64px;
          height: 64px;
          animation: pump 1s ease-in-out infinite;
          filter: drop-shadow(0 6px 18px rgba(0, 0, 0, 0.35));
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
            transform: scale(1.12);
            opacity: 0.96;
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
            transform: scale(1.03);
          }
          100% {
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          .flex-none {
            flex: 0 0 100%;
            min-width: 100%;
          }
          .offer-badge-img {
            width: 54px;
            height: 54px;
            right: 8px;
            top: -8px;
          }
        }
      `}</style>
    </div>
  );
}
