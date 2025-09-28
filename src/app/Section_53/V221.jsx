import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import Head from "next/head";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function V221() {
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

  const [slideWidth, setSlideWidth] = useState(0);
  const [slideShiftPx, setSlideShiftPx] = useState(0);
  const [animateCan, setAnimateCan] = useState(false);

  // NEW: which slide's can is visible (only the active slide while section visible)
  const [playCanFor, setPlayCanFor] = useState(-1);

  const GAP_PX = 6;
  const dragRef = useRef({ dragging: false, startX: 0, startTranslate: 0 });
  const sectionVisibleRef = useRef(true);
  const AUTOPLAY_DELAY = 2000;

  useLayoutEffect(() => {
    function measure() {
      const maskW = maskRef.current ? maskRef.current.clientWidth : 0;
      setSlideWidth(maskW);
      setSlideShiftPx(maskW + GAP_PX);
      if (trackRef.current) {
        trackRef.current.style.width = `${slides.length * (maskW + GAP_PX)}px`;
        trackRef.current.style.transition = "transform 450ms ease";
        trackRef.current.style.transform = `translateX(-${index * (maskW + GAP_PX)}px)`;
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  useEffect(() => {
    if (!dragRef.current.dragging && trackRef.current) {
      trackRef.current.style.transition = "transform 450ms ease";
      trackRef.current.style.transform = `translateX(-${index * slideShiftPx}px)`;
    }
  }, [index, slideShiftPx]);

  // IntersectionObserver: manage animateCan and playCanFor visibility
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting;
          setAnimateCan(isVisible);
          sectionVisibleRef.current = isVisible;
          if (isVisible) {
            // when section becomes visible, ensure the active slide's can appears (with animation)
            setPlayCanFor(index);
          } else {
            // hide all when out of viewport
            setPlayCanFor(-1);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.unobserve(el);
      observer.disconnect();
    };
  }, [index]);

  // When index changes, show that slide's can (only if section visible)
  useEffect(() => {
    if (animateCan) {
      setPlayCanFor(index);
    } else {
      setPlayCanFor(-1);
    }
  }, [index, animateCan]);

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

  // Pointer / swipe handlers
  const onPointerDown = (e) => {
    if (!trackRef.current) return;
    const clientX = e.clientX ?? (e.touches && e.touches[0].clientX) ?? 0;
    dragRef.current.dragging = true;
    dragRef.current.startX = clientX;
    const style = window.getComputedStyle(trackRef.current);
    const matrix = new DOMMatrixReadOnly(style.transform === "none" ? "matrix(1,0,0,1,0,0)" : style.transform);
    dragRef.current.startTranslate = matrix.m41;
    trackRef.current.style.transition = "none";
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  };

  const onPointerMove = (e) => {
    if (!dragRef.current.dragging || !trackRef.current) return;
    const clientX = e.clientX ?? 0;
    const delta = clientX - dragRef.current.startX;
    const newTranslate = dragRef.current.startTranslate + delta;
    trackRef.current.style.transform = `translateX(${newTranslate}px)`;
  };

  const onPointerUp = (e) => {
    if (!dragRef.current.dragging || !trackRef.current) return;
    dragRef.current.dragging = false;
    const clientX = e.clientX ?? 0;
    const delta = clientX - dragRef.current.startX;
    const threshold = Math.min(70, slideShiftPx * 0.16);
    let newIndex = index;
    if (delta > threshold) newIndex = (index - 1 + slides.length) % slides.length;
    else if (delta < -threshold) newIndex = (index + 1) % slides.length;
    setIndex(newIndex);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("pointercancel", onPointerUp);
  };

  // Autoplay
  useEffect(() => {
    const id = setInterval(() => {
      if (dragRef.current.dragging) return;
      if (!sectionVisibleRef.current) return;
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_DELAY);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=Mona+Sans+Condensed:wght@700;800&display=swap"
          rel="stylesheet"
        />
        <title>V221 — appear-only can animation</title>
      </Head>

      <section ref={sectionRef} className="overflow-hidden relative bg-[#071a02] text-white">
        <div className="mx-auto px-4 py-12 md:py-20" style={{ maxWidth: "77.5rem", minHeight: "48vh" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div>
              <h2
                className="uppercase font-extrabold text-left"
                style={{
                  fontFamily: "'Mona Sans Condensed', sans-serif",
                  fontSize: "1.9rem",
                  lineHeight: 0.98,
                  margin: 0,
                }}
              >
                Real reviews, real experiences
              </h2>
              <p className="mt-2 text-left" style={{ maxWidth: "24rem", fontFamily: "'Manrope', sans-serif", fontSize: "0.9rem" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius eni
              </p>
            </div>

            <div className="flex justify-center items-start relative">
              <img
                src={tigerUrl}
                alt="Tiger"
                loading="lazy"
                className="object-contain w-32 md:w-56 -translate-y-2"
                style={{
                  filter: "grayscale(1) saturate(0) brightness(10) contrast(1)",
                  mixBlendMode: "screen",
                }}
              />
            </div>
          </div>

          {/* Slider */}
          <div className="mt-6 relative">
            <div className="absolute right-0 -top-10 flex gap-2 z-20">
              <button
                onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
                className="w-9 h-8 rounded-md bg-white flex items-center justify-center shadow hidden md:flex"
                aria-label="Previous"
              >
                <FiChevronLeft size={16} color="#111" />
              </button>
              <button
                onClick={() => setIndex((i) => (i + 1) % slides.length)}
                className="w-9 h-8 rounded-md bg-white flex items-center justify-center shadow hidden md:flex"
                aria-label="Next"
              >
                <FiChevronRight size={16} color="#111" />
              </button>
            </div>

            <div className="flex items-start">
              <div
                ref={maskRef}
                onPointerDown={onPointerDown}
                className="overflow-visible w-full md:w-1/2 rounded-[8px] touch-pan-y"
                style={{ touchAction: "pan-y" }}
              >
                <div
                  ref={trackRef}
                  className="flex items-stretch"
                  style={{
                    transform: `translateX(-${index * slideShiftPx}px)`,
                    gap: `${GAP_PX}px`,
                    transition: "transform 450ms ease",
                    willChange: "transform",
                  }}
                >
                  {slides.map((s, i) => {
                    // determine if can should be visible for this slide
                    const canVisible = playCanFor === i;
                    return (
                      <div
                        key={s.id}
                        className="rounded-[8px] flex-shrink-0 flex flex-col justify-start items-start relative overflow-hidden p-3"
                        style={{
                          width: slideWidth ? `${slideWidth}px` : "94%",
                          minHeight: "42vh",
                          maxHeight: "56vh",
                          background: s.colorBg,
                          color: s.textColor,
                        }}
                      >
                        <div className="w-full md:w-[62%] flex flex-col" style={{ gap: 10 }}>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
                              style={{
                                border: "0.8px solid rgba(255,255,255,0.14)",
                                backdropFilter: "blur(8px)",
                              }}
                            >
                              <img src={s.avatar} alt="avatar" loading="lazy" className="w-full h-full object-cover" />
                            </div>
                          </div>

                          <div className="text-left font-extrabold text-[20px] leading-[1.05] mt-1" style={{ color: s.textColor }}>
                            “
                          </div>

                          <div
                            className="text-left font-extrabold leading-[1.05]"
                            style={{
                              fontFamily: "'Mona Sans Condensed', sans-serif",
                              color: s.textColor,
                              fontSize: "25px",
                            }}
                          >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                          </div>

                          <div className="mt-auto text-left">
                            <div className="text-[15px] font-semibold" style={{ color: s.textColor }}>Andrew Power</div>
                            <p className="text-[13px] m-0 opacity-90" style={{ color: s.textColor }}>Co-founder @ marvolo.co</p>
                          </div>
                        </div>

                        {/* decorative circle (desktop only) */}
                        <div
                          className="absolute rounded-full hidden md:block"
                          style={{
                            width: "14rem",
                            height: "14rem",
                            right: "-14%",
                            bottom: "-14%",
                            background: "rgba(255,255,255,0.05)",
                            zIndex: 1,
                          }}
                        />

                        {/* Can: appear-only animation */}
                        <div
                          className="absolute"
                          style={{
                            right: "-6%",
                            bottom: "-12%",
                            width: "5.5rem",
                            zIndex: 2,
                            opacity: canVisible ? 1 : 0,
                            transform: canVisible ? "rotate(-40deg) translateX(0) scale(1)" : "rotate(-40deg) translateX(110px) scale(0.7)",
                            // only animate when appearing; when hiding use no transition so it disappears instantly
                            transition: canVisible
                              ? `transform 0.9s ease ${i * 0.06}s, opacity 0.9s ease ${i * 0.06}s`
                              : "none",
                          }}
                        >
                          <img src={s.can} alt="can" loading="lazy" className="w-full h-auto object-contain" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3 flex items-center gap-2 justify-center md:justify-start">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        idx === index ? "bg-white scale-125" : "bg-white/35"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="hidden md:block" style={{ flex: 1 }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}