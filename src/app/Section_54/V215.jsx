"use client";

import { useState, useEffect } from "react";
import Head from "next/head";

export default function V215() {
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

  const [index, setIndex] = useState(0); // current starting slide index
  const n = slides.length;

  // slidesPerView: 1 on small, 2 on md+ (kept in state so translate calculation works)
  const [slidesPerView, setSlidesPerView] = useState(1);

  // animate top left/right lines on mount
  const [linesLoaded, setLinesLoaded] = useState(false);

  useEffect(() => {
    // set initial based on viewport and update on resize
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setSlidesPerView(mq.matches ? 2 : 1);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  useEffect(() => {
    // small timeout so transition runs after mount
    const t = setTimeout(() => setLinesLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Auto-advance every 2 seconds
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
    setIndex(((i % n) + n) % n); // safe modulo
  }

  // compute translate % for the track:
  const translatePercent = (index * 100) / slidesPerView;

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dosis:wght@400;500;600&family=Staatliches&display=swap"
          rel="stylesheet"
        />
      </Head>

      <section className="w-full bg-[#f6f6f6] py-12">
        <div className="max-w-[1440px] mx-auto px-5">
          {/* Title bar: left and right containers share equal flex so inner lines are equal width */}
          <div className="flex items-center justify-between mb-8">
            {/* LEFT container (flex:1) */}
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

            {/* CENTER title (fixed max width) */}
            <div className="text-center max-w-[800px] mx-6">
              <span
                className="inline-block bg-[#da000b] text-white text-[14px] px-4 py-1 rounded-full font-semibold"
                style={{ fontFamily: "'Dosis', sans-serif" }}
              >
                Testimonials
              </span>

              <div className="mt-3 flex items-center justify-center gap-3">
                <h2
                  className="text-[30px] leading-[1] font-extrabold"
                  style={{ fontFamily: "'Staatliches', sans-serif", color: "#141414" }}
                >
                  REVIEW FROM
                </h2>
                <h2
                  className="text-[30px] leading-[1] font-extrabold text-[#da000b]"
                  style={{ fontFamily: "'Staatliches', sans-serif" }}
                >
                  CLIENTS
                </h2>
              </div>
            </div>

            {/* RIGHT container (flex:1) */}
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

          {/* Carousel area */}
          <div className="relative">
            {/* viewport */}
            <div className="overflow-hidden">
              {/* track */}
              <div
                className="flex transition-transform gap-5 duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${translatePercent}%)`,
                }}
              >
                {slides.map((s, i) => {
                  const basisPercent = 100 / slidesPerView;
                  return (
                    <article
                      key={i}
                      className="bg-white p-6 shadow-sm text-left"
                      style={{
                        flex: `0 0 ${basisPercent}%`,
                        maxWidth: `${basisPercent}%`,
                        boxSizing: "border-box",
                      }}
                    >
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1 pr-4">
                          <img src={quoteUrl} alt="quote" className="w-10 mb-2" />
                          <h3
                            className="text-[20px] font-bold mb-2"
                            style={{ fontFamily: "'Staatliches', sans-serif", color: "#141414" }}
                          >
                            {s.clientName}
                          </h3>

                          <div className="flex items-center gap-2 mb-4">
                            {/* five red stars */}
                            <span className="text-[#da000b]">★</span>
                            <span className="text-[#da000b]">★</span>
                            <span className="text-[#da000b]">★</span>
                            <span className="text-[#da000b]">★</span>
                            <span className="text-[#da000b]">★</span>
                          </div>

                          <p
                            className="text-[#666] text-[15px] leading-7 mb-4"
                            style={{ fontFamily: "'Dosis', sans-serif", fontWeight: 500 }}
                          >
                            {s.testimonial}
                          </p>
                        </div>

                        <div className="w-[140px] flex-shrink-0 flex items-center justify-center">
                          <img
                            src={s.clientImg}
                            alt={s.clientName}
                            className="object-cover"
                            style={{ width: 150, height: 150 }}
                            loading="lazy"
                          />
                        </div>
                      </div>

                      <div className="border-t border-[#e7e7e7] mt-5 pt-4" />

                      <div className="flex items-center gap-4 mt-4">
                        <div className="bg-[#f4f4f4] p-2 w-[70px] h-[70px] flex items-center justify-center">
                          <img src={s.productImg} alt={s.productTitle} className="object-cover" style={{ width: 54, height: 54 }} />
                        </div>
                        <div>
                          <div
                            className="text-[16px] font-bold"
                            style={{ fontFamily: "'Staatliches', sans-serif", color: "#141414" }}
                          >
                            {s.productTitle}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {slides.map((_, i) => {
              const active = i === index;
              return (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`show slide ${i + 1}`}
                  className={`transition-all duration-200 focus:outline-none ${
                    active ? "w-9 h-3 rounded-full bg-[#da000b]" : "w-3 h-3 rounded-full bg-[#e0e0e0]"
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