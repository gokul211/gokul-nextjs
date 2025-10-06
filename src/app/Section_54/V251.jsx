// V245.jsx
"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const V245 = () => {
  const ref = useRef(null);

  // Scroll progress within this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress to x movement
  const leftImageX = useTransform(scrollYProgress, [0, 1], ["0%", "-280%"]);
  const rightImageX = useTransform(scrollYProgress, [0, 1], ["0%", "280%"]);

  return (
    <section
      ref={ref}
      className="w-full h-screen relative overflow-hidden bg-gray-100"
    >
      {/* Text Behind */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-0 px-4">
        <h2 className="text-4xl md:text-4xl font-bold text-gray-800">
          SHOP THE LATEST FASHION TRENDS
        </h2>
        <p className="mt-4 text-gray-600 max-w-xl leading-relaxed">
          Step into style with our collection of the latest fashion trends! From
          bold new looks to timeless classics, we’ve got the must-have pieces to
          refresh your wardrobe. Whether you're after casual comfort, chic
          elegance, or trendy statement pieces, our selection is curated to help
          you stay ahead of the curve.
        </p>
        <a
          href="/collections"
          className="mt-6 inline-flex items-center gap-2 bg-black text-white font-medium px-6 py-3 rounded-full hover:scale-105 transition-transform"
        >
          VIEW MORE
        </a>
      </div>

      {/* Left Image */}
      <motion.div
        style={{ x: leftImageX }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[400px] rounded-[45px] overflow-hidden shadow-lg z-10"
      >
        <img
          src="https://maya-theme-empower.myshopify.com/cdn/shop/files/media-with-text1_1.webp?v=1746436221&width=930"
          alt="Fashion Left"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Right Image */}
      <motion.div
        style={{ x: rightImageX }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[400px] rounded-[45px] overflow-hidden shadow-lg z-10"
      >
        <img
          src="https://maya-theme-empower.myshopify.com/cdn/shop/files/media-with-text2_1.webp?v=1746436221&width=930"
          alt="Fashion Right"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>
    </section>
  );
};

export default V245;
