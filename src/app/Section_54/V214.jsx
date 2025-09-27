"use client";

import { useState, useEffect } from "react";
import Head from "next/head";

/*
V214 - mobile-first layout (always shows 1 slide per view)

Same left/right top-line mount animation as V211/V215
Carousel shows 1 card at a time (mobile setup) on all screen sizes
Auto-advances every 2 seconds
*/
export default function V214() {
const slides = [
{
clientName: "JOHN DOE",
testimonial:
'"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."',
clientImg:
"https://cdn.prod.website-files.com/667337a492e68bf1bbac5bb0/668582fd0d20138ff5a27400_13487.webp",
productImg:
"https://cdn.prod.website-files.com/667337a492e68bf1bbac5bb0/66859019097c7a9aa90597fe_jacket-2899729_1280.webp",
productTitle: "RED JACKET",
},
{
clientName: "JOHN DOE",
testimonial:
'"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."',
clientImg:
"https://cdn.prod.website-files.com/667337a492e68bf1bbac5bb0/668582fdf47a067c60358e82_23540.webp",
productImg:
"https://cdn.prod.website-files.com/667337a492e68bf1bbac5bb0/6681442a60fefe08c70df614_1511.webp",
productTitle: "WHITE HOODIE",
},
{
clientName: "JOHN DOE",
testimonial:
'"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."',
clientImg:
"https://cdn.prod.website-files.com/667337a492e68bf1bbac5bb0/668582fdd4cc3f951b421780_7091.webp",
productImg:
"https://cdn.prod.website-files.com/667337a492e68bf1bbac5bb0/66858fd955d28c6ebe68ab0c_2149745027.webp",
productTitle: "BLUE JACKET",
},
{
clientName: "JOHN DOE",
testimonial:
'"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."',
clientImg:
"https://cdn.prod.website-files.com/667337a492e68bf1bbac5bb0/668582fd6d120fd778013709_18778.webp",
productImg:
"https://cdn.prod.website-files.com/667337a492e68bf1bbac5bb0/6685900b485f6868a3f5c304_product_0-3.webp",
productTitle: "RED JACKET",
},
{
clientName: "JOHN DOE",
testimonial:
'"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."',
clientImg:
"https://cdn.prod.website-files.com/667337a492e68bf1bbac5bb0/668582fd82af49f1ee689a41_32957.webp",
productImg:
"https://cdn.prod.website-files.com/667337a492e68bf1bbac5bb0/66814436739cdf7bb8cbd26c_29140.webp",
productTitle: "BLACK HOODIE",
},
];
const quoteUrl =
"https://cdn.prod.website-files.com/667337a492e68bf1bbac5bb0/66854e9f7b7af960993793a9_straight-quotes.png";

const [index, setIndex] = useState(0);
const n = slides.length;

// fixed mobile setup: always 1 slide per view
const slidesPerView = 1;

// animate top left/right lines on mount (equal width)
const [linesLoaded, setLinesLoaded] = useState(false);
useEffect(() => {
const t = setTimeout(() => setLinesLoaded(true), 100);
return () => clearTimeout(t);
}, []);

// auto-advance every 2 seconds
useEffect(() => {
const id = setInterval(() => {
setIndex((i) => (i + 1) % n);
}, 2000);
return () => clearInterval(id);
}, [n]);

function prev() {
setIndex((i) => (i - 1 + n) % n);
}
function next() {
setIndex((i) => (i + 1) % n);
}
function goTo(i) {
setIndex(((i % n) + n) % n);
}

// translate percent for single-slide view
const translatePercent = (index * 100) / slidesPerView; // index * 100

return (
<>


  <section className="w-full bg-[#f6f6f6] py-8">
    <div className="max-w-[920px] mx-auto px-4">
      {/* Title bar: left & right equal-width lines */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1 flex items-center">
          <div
            className="h-[2px] bg-[#da000b] w-full"
            style={{
              transform: linesLoaded ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: "transform 700ms cubic-bezier(.2,.8,.2,1), opacity 700ms",
              opacity: linesLoaded ? 1 : 0,
            }}
          />
        </div>

        <div className="text-center max-w-[560px] mx-4">
          <span
            className="inline-block bg-[#da000b] text-white text-[13px] px-3 py-1 rounded-full font-semibold"
            style={{ fontFamily: "'Dosis', sans-serif" }}
          >
            Testimonials
          </span>

          <div className="mt-2 flex items-center justify-center gap-2">
            <h2
              className="text-[22px] leading-[1] font-extrabold"
              style={{ fontFamily: "'Staatliches', sans-serif", color: "#141414" }}
            >
              REVIEW FROM
            </h2>
            <h2
              className="text-[22px] leading-[1] font-extrabold text-[#da000b]"
              style={{ fontFamily: "'Staatliches', sans-serif" }}
            >
              CLIENTS
            </h2>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-end">
          <div
            className="h-[2px] bg-[#da000b] w-full"
            style={{
              transform: linesLoaded ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "right",
              transition: "transform 700ms cubic-bezier(.2,.8,.2,1) 150ms, opacity 700ms 150ms",
              opacity: linesLoaded ? 1 : 0,
            }}
          />
        </div>
      </div>

      {/* Carousel viewport (mobile-first / single slide view) */}
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${translatePercent}%)`,
            }}
          >
            {slides.map((s, i) => (
              <article
                key={i}
                className="bg-white p-5 shadow-sm rounded-lg mx-1 min-w-full box-border"
                style={{ flex: `0 0 100%`, maxWidth: "100%" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 pr-3">
                    <img src={quoteUrl} alt="quote" className="w-9 mb-2" />
                    <h3
                      className="text-[18px] font-bold mb-1"
                      style={{ fontFamily: "'Staatliches', sans-serif", color: "#141414" }}
                    >
                      {s.clientName}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[#da000b]">★</span>
                      <span className="text-[#da000b]">★</span>
                      <span className="text-[#da000b]">★</span>
                      <span className="text-[#da000b]">★</span>
                      <span className="text-[#da000b]">★</span>
                    </div>

                    <p
                      className="text-[#666] text-[14px] leading-7"
                      style={{ fontFamily: "'Dosis', sans-serif", fontWeight: 500 }}
                    >
                      {s.testimonial}
                    </p>
                  </div>

                  <div className="w-[110px] flex-shrink-0 flex items-center justify-center">
                    <img
                      src={s.clientImg}
                      alt={s.clientName}
                      className="object-cover rounded"
                      style={{ width: 110, height: 140 }}
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="border-t border-[#e7e7e7] mt-4 pt-3" />

                <div className="flex items-center gap-3 mt-3">
                  <div className="bg-[#f4f4f4] p-2 w-[56px] h-[56px] flex items-center justify-center rounded">
                    <img src={s.productImg} alt={s.productTitle} className="object-cover" style={{ width: 44, height: 44 }} />
                  </div>
                  <div>
                    <div
                      className="text-[15px] font-bold"
                      style={{ fontFamily: "'Staatliches', sans-serif", color: "#141414" }}
                    >
                      {s.productTitle}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* (Optional) arrows - visible on mobile if you want them; left commented out */}
        {/* <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow">Prev</button>
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow">Next</button> */}
      </div>

      {/* Dots */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {slides.map((_, i) => {
          const active = i === index;
          return (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`show slide ${i + 1}`}
              className={`transition-all duration-200 focus:outline-none ${
                active ? "w-8 h-2 rounded-full bg-[#da000b]" : "w-2 h-2 rounded-full bg-[#e0e0e0]"
              }`}
            />
          );
        })}
      </div>
    </div>
  </section>
</>
);
}