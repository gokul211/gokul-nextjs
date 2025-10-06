// V244.jsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const V244 = () => {
  const ref = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll progress used only for desktop parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const leftImageX = useTransform(
    scrollYProgress,
    [0, 1],
    isDesktop ? ["0%", "-220%"] : ["0%", "0%"]
  );
  const rightImageX = useTransform(
    scrollYProgress,
    [0, 1],
    isDesktop ? ["0%", "220%"] : ["0%", "0%"]
  );

  // Image sources (replace with your own if needed)
  const imgLeft =
    "https://maya-theme-empower.myshopify.com/cdn/shop/files/media-with-text1_1.webp?v=1746436221&width=1200";
  const imgRight =
    "https://maya-theme-empower.myshopify.com/cdn/shop/files/media-with-text2_1.webp?v=1746436221&width=1200";

  return (
    <section
      ref={ref}
      className="w-full min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8 md:py-20"
      aria-labelledby="v244-heading"
    >
      {/* MOBILE / TABLET: stacked single column card (matches your screenshot) */}
      {!isDesktop && (
        <div className="w-full max-w-md">
          {/* Top Image Card */}
          <div className="bg-white rounded-[20px] overflow-hidden shadow-sm">
            <img
              src={imgLeft}
              alt="Fashion model"
              loading="lazy"
              className="w-full h-[320px] object-cover rounded-t-[20px]"
            />
            <div className="p-5 text-center">
              <h2
                id="v244-heading"
                className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight"
              >
                SHOP THE LATEST
                <br />
                FASHION TRENDS
              </h2>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                Step into style with our collection of the latest fashion
                trends! From bold new looks to timeless classics, we’ve got the
                must-have pieces to refresh your wardrobe.
              </p>

              <div className="mt-5 flex items-center justify-center">
                <a
                  href="/collections"
                  className="inline-flex items-center gap-3 bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium shadow transform hover:scale-105 transition"
                  aria-label="View more collections"
                >
                  <span className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center">
                    {/* simple arrow icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M12.293 16.293a1 1 0 011.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 10-1.414 1.414L15.586 10H4a1 1 0 100 2h11.586l-3.293 3.293a1 1 0 000 1.414z" />
                    </svg>
                  </span>
                  VIEW MORE
                </a>
              </div>
            </div>
          </div>

          {/* Spacing and second card */}
          <div className="mt-6 bg-white rounded-[20px] overflow-hidden shadow-sm">
            <img
              src={imgRight}
              alt="Fashion model 2"
              loading="lazy"
              className="w-full h-[260px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-base font-semibold text-gray-900">
                New Arrivals
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Discover fresh pieces added this week — curated for every look.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP: overlapping parallax layout (kept from previous design) */}
      {isDesktop && (
        <div className="w-full relative flex items-center justify-center py-10">
          {/* Center text card on top */}
          <div className="relative z-30 w-full max-w-2xl text-center">
            <div className="bg-white/90 backdrop-blur-sm px-8 py-10 rounded-2xl shadow-lg">
              <h2
                id="v244-heading"
                className="text-3xl font-extrabold text-gray-900"
              >
                SHOP THE LATEST FASHION TRENDS
              </h2>
              <p className="mt-4 text-gray-600">
                Step into style with our collection of the latest fashion
                trends! From bold new looks to timeless classics, we’ve curated
                must-have pieces to refresh your wardrobe.
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <a
                  href="/collections"
                  className="inline-flex items-center bg-black text-white px-6 py-3 rounded-full text-sm font-medium shadow hover:scale-105 transition"
                >
                  VIEW MORE
                </a>
              </div>
            </div>
          </div>

          {/* Left parallax image */}
          <motion.div
            style={{ x: leftImageX }}
            className="absolute top-1/2 left-1/2 -translate-x-[160%] -translate-y-1/2 w-72 md:w-96 rounded-2xl overflow-hidden shadow-2xl z-20"
            aria-hidden="true"
          >
            <img
              src={imgLeft}
              alt="Fashion left"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          </motion.div>

          {/* Right parallax image */}
          <motion.div
            style={{ x: rightImageX }}
            className="absolute top-1/2 left-1/2 -translate-x-[-40%] -translate-y-1/2 w-72 md:w-96 rounded-2xl overflow-hidden shadow-2xl z-10"
            aria-hidden="true"
          >
            <img
              src={imgRight}
              alt="Fashion right"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default V244;