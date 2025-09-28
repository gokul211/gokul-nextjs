import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import Head from "next/head";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function V223() {
  const slides = [
    {
      id: 1,
      colorBg: "#69943c",
      avatar:
        "https://cdn.prod.website-files.com/66ae6d5d335aaf4dfce34142/66b117e1a5d77710ba29fb2e_Copy%20of%20Untitled%20Design%20(3).avif",
      can:
        "https://cdn.prod.website-files.com/66ae6d5d335aaf4dfce34142/66af7c4faeb5ab04740db9ab_4.avif",
      textColor: "#ffffff",
    },
    {
      id: 2,
      colorBg: "#4aa1b3",
      avatar:
        "https://cdn.prod.website-files.com/66ae6d5d335aaf4dfce34142/66b117b5e5a0e9592f7270c2_Copy%20of%20Untitled%20Design%20(1).avif",
      can:
        "https://cdn.prod.website-files.com/66ae6d5d335aaf4dfce34142/66af7c4f3366d46c5664e356_5.avif",
      textColor: "#ffffff",
    },
    {
      id: 3,
      colorBg: "#d94c4c",
      avatar:
        "https://cdn.prod.website-files.com/66ae6d5d335aaf4dfce34142/66b116587c84d1a7150f4177_66aa8e33918434749add451b_2.avif",
      can:
        "https://cdn.prod.website-files.com/66ae6d5d335aaf4dfce34142/66af7c4f9264ecc82d0c7517_1.avif",
      textColor: "#ffffff",
    },
    {
      id: 4,
      colorBg: "#ff8a3d",
      avatar:
        "https://cdn.prod.website-files.com/66ae6d5d335aaf4dfce34142/66b117b1b1606d2b6a57fdb4_Copy%20of%20Untitled%20Design.avif",
      can:
        "https://cdn.prod.website-files.com/66ae6d5d335aaf4dfce34142/66af7c4fd09b8c9a478632bf_1%20(1).avif",
      textColor: "#ffffff",
    },
    {
      id: 5,
      colorBg: "#f2c94c",
      avatar:
        "https://cdn.prod.website-files.com/66ae6d5d335aaf4dfce34142/66b11658fa22f208b0b1aaf3_66aa8e33c56814099c1ab257_1.avif",
      can:
        "https://cdn.prod.website-files.com/66ae6d5d335aaf4dfce34142/66af7c50e30b267f53999bfa_6.avif",
      textColor: "#111111",
    },
  ];

  const tigerUrl =
    "https://cdn.prod.website-files.com/66ae6d5d335aaf4dfce34142/66b1214531416707b88c3617_Untitled%20design%20(27).avif";

  const [index, setIndex] = useState(0);
  const maskRef = useRef(null);
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const [slideShiftPx, setSlideShiftPx] = useState(0);
  const [animateCan, setAnimateCan] = useState(false);
  const GAP_PX = 16 * 2;

  useLayoutEffect(() => {
    function measure() {
      const maskW = maskRef.current ? maskRef.current.clientWidth : 0;
      setSlideShiftPx(maskW + GAP_PX);
      if (trackRef.current) {
        trackRef.current.style.width = `${slides.length * (maskW + GAP_PX)}px`;
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [slides.length]);

  // Scroll observer for can animation (play when section enters, reset when it leaves)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // set true when intersecting, false when leaving so animation can replay on re-enter
          setAnimateCan(entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + slides.length) % slides.length);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % slides.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides.length]);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=Mona+Sans+Condensed:wght@700;800&display=swap"
          rel="stylesheet"
        />
        <title>V223 Reviews</title>
      </Head>

      <section
        ref={sectionRef}
        className="overflow-hidden relative bg-[#071a02] text-white"
      >
        <div className="mx-auto px-8 py-28" style={{ maxWidth: "77.5rem", minHeight: "75vh" }}>
          {/* Heading + Tiger */}
          <div className="grid grid-cols-2 gap-6 items-start">
            <div>
              <h2
                className="uppercase font-extrabold text-left"
                style={{
                  fontFamily: "'Mona Sans Condensed', sans-serif",
                  fontSize: "4em",
                  lineHeight: 0.98,
                  margin: 0,
                }}
              >
                Real reviews, real experiences
              </h2>
              <p className="mt-6 text-left" style={{ maxWidth: "27rem", fontFamily: "'Manrope', sans-serif" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius eni
              </p>
            </div>
            <div className="flex justify-end items-start relative">
              {/* NOTE: styles below make the tiger appear white */}
              <img
                src={tigerUrl}
                alt="Tiger"
                className="object-contain w-64 -translate-y-2"
                style={{
                  transform: undefined, // keep tailwind translate for Y; using style for complex filter
                  filter: "grayscale(1) saturate(0) brightness(10) contrast(1)",
                  mixBlendMode: "screen",
                }}
              />
            </div>
          </div>

          {/* Slider */}
          <div className="mt-24 relative">
            {/* Arrows */}
            <div className="absolute right-0 -top-12 flex gap-3 z-20">
              <button onClick={prev} className="w-12 h-10 rounded-md bg-white flex items-center justify-center shadow">
                <FiChevronLeft size={18} color="#111" />
              </button>
              <button onClick={next} className="w-12 h-10 rounded-md bg-white flex items-center justify-center shadow">
                <FiChevronRight size={18} color="#111" />
              </button>
            </div>

            <div className="flex items-start">
              <div ref={maskRef} className="overflow-visible w-1/2 rounded-[10px]">
                <div
                  ref={trackRef}
                  className="flex items-stretch transition-transform duration-500 ease"
                  style={{
                    transform: `translateX(-${index * slideShiftPx}px)`,
                    gap: `${GAP_PX}px`,
                  }}
                >
                  {slides.map((s, i) => (
                    <div
                      key={s.id}
                      className="rounded-[12px] flex-shrink-0 basis-1/5 flex flex-col justify-start items-start relative overflow-hidden p-[1.3rem]"
                      style={{
                        minHeight: "65svh",
                        background: s.colorBg,
                        color: s.textColor,
                      }}
                    >
                      {/* Left content column (avatar, quote mark, big text, reviewer) */}
                      <div className="w-[62%] flex flex-col" style={{ gap: 18 }}>
                        {/* Avatar top-left */}
                        <div className="flex items-center gap-3">
                          <div
                            className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0"
                            style={{
                              border: "0.8px solid rgba(255,255,255,0.16)",
                              backdropFilter: "blur(12px)",
                            }}
                          >
                            <img src={s.avatar} alt="avatar" className="w-full h-full object-cover" />
                          </div>
                        </div>

                        {/* small quote mark — left aligned slightly below avatar */}
                        <div className="text-left font-extrabold text-[28px] leading-[1.05] mt-1" style={{ color: s.textColor }}>
                          “
                        </div>

                        {/* Big quote text (left aligned, multi-line) */}
                        <div
                          className="text-left font-extrabold text-[32px] leading-[1.02]"
                          style={{
                            fontFamily: "'Mona Sans Condensed', sans-serif",
                            color: s.textColor,
                          }}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                        </div>

                        {/* Reviewer pushed to bottom-left of the card */}
                        <div className="mt-auto text-left">
                          <div className="text-[16px] font-semibold" style={{ color: s.textColor }}>Andrew Power</div>
                          <p className="text-[14px] m-0 opacity-90" style={{ color: s.textColor }}>Co-founder @ marvolo.co</p>
                        </div>
                      </div>

                      {/* decorative pale circle behind the can (on the right) */}
                      <div
                        className="absolute rounded-full"
                        style={{
                          width: "22rem",
                          height: "22rem",
                          right: "-20%",
                          bottom: "-20%",
                          background: "rgba(255,255,255,0.06)",
                          zIndex: 1,
                        }}
                      />

                      {/* Can with scroll-triggered animation (placed on the right, overlapping the circle) */}
                      <div
                        className="absolute"
                        style={{
                          right: "-4%",
                          bottom: "-18%",
                          width: "10rem",
                          zIndex: 2,
                          opacity: animateCan ? 1 : 0,
                          transform: animateCan
                            ? "rotate(-40deg) translateX(0) scale(1)"
                            : "rotate(-40deg) translateX(200px) scale(0.7)",
                          transition: `transform 1s ease ${i * 0.2}s, opacity 1s ease ${i * 0.2}s`,
                        }}
                      >
                        <img src={s.can} alt="can" className="w-full h-auto object-contain" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dots (disabled in original) */}
              </div>
              <div style={{ flex: 1 }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}