"use client";
import { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function FlavorsCarousel() {
  const [current, setCurrent] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [step, setStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const carouselWindowRef = useRef(null);
  const isFirstMeasure = useRef(true);

  const gap = 12; // gap between items (px)
  let scaleFactor = 1.08; // reduced so cans appear a bit smaller

  // mobile/autoplay settings
  const MOBILE_BREAKPOINT = 640; // px: under this -> mobile behavior
  const AUTOPLAY_DELAY_MS = 2000; // 2s autoplay
  const autoplayRef = useRef(null);
  const isPausedRef = useRef(false);

  // touch swipe refs
  const touchStartXRef = useRef(null);
  const touchDeltaXRef = useRef(0);

  const flavors = [
    { name: "Watermelon", img: "https://cdn.prod.website-files.com/66ae838a004ef09aef08a56d/66af7c68df5e94bdf6d8d08d_1-p-500.png" },
    { name: "Blueberry", img: "https://cdn.prod.website-files.com/66ae838a004ef09aef08a56d/66af7ca1eb87f8b8af44bbfe_5-p-500.png" },
    { name: "Kiwi", img: "https://cdn.prod.website-files.com/66ae838a004ef09aef08a56d/66af7cfbbf98e4cbfe2d040e_4-p-500.png" },
    { name: "Dragon Fruit", img: "https://cdn.prod.website-files.com/66ae838a004ef09aef08a56d/66af7c6ca2f291522ffd0d37_2-p-500.png" },
    { name: "Pineapple", img: "https://cdn.prod.website-files.com/66ae838a004ef09aef08a56d/66af7c6133ce62c932cf59e0_6-p-500.png" },
    { name: "Orange", img: "https://cdn.prod.website-files.com/66ae838a004ef09aef08a56d/66af7c97372d85d43ff3c13f_1%20(1)-p-500.png" },
    { name: "Grape", img: "https://cdn.prod.website-files.com/66ae838a004ef09aef08a56d/66af8b39bf98e4cbfe35b6f6_Untitled%20design%20(12)%20(1)-p-500.png" },
    { name: "Raspberry", img: "https://cdn.prod.website-files.com/66ae838a004ef09aef08a56d/66af7c6fd0a17b480f1da3bb_3-p-500.png" },
  ];

  const handlePrev = () => {
    setCurrent(prev => (prev === 0 ? flavors.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrent(prev => (prev === flavors.length - 1 ? 0 : prev + 1));
  };

  const decideVisibleCount = (containerW) => {
    if (containerW >= 1500) return 6;
    if (containerW >= 1200) return 5;
    if (containerW >= 900) return 4;
    if (containerW >= 600) return 3;
    return 2;
  };

  // Measure container, compute item widths and step; detect mobile
  useEffect(() => {
    const el = carouselWindowRef.current;
    if (!el) return;

    const update = () => {
      const width = el.clientWidth || Math.round(el.getBoundingClientRect().width || 0);
      setContainerWidth(width);
      const mobile = width < MOBILE_BREAKPOINT;
      setIsMobile(mobile);

      // If mobile: show 1 slide visible (one-by-one)
      let visible = mobile ? 1 : (isFirstMeasure.current ? 5 : decideVisibleCount(width));

      const totalGap = gap * (visible - 1);
      const baseItemWidth = (width - totalGap) / visible;
      const computedItemWidth = Math.floor(baseItemWidth * scaleFactor);

      // Prevent item being wider than available space
      const maxAllowed = Math.floor(width - (visible - 1) * gap);
      const finalItemWidth = Math.min(computedItemWidth, maxAllowed);

      setItemWidth(finalItemWidth);
      setStep(finalItemWidth + gap);

      if (isFirstMeasure.current) isFirstMeasure.current = false;
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [carouselWindowRef.current]);

  // Autoplay on mobile only
  useEffect(() => {
    const start = () => {
      if (autoplayRef.current !== null) return;
      autoplayRef.current = window.setInterval(() => {
        if (isPausedRef.current) return;
        setCurrent(prev => (prev === flavors.length - 1 ? 0 : prev + 1));
      }, AUTOPLAY_DELAY_MS);
    };
    const stop = () => {
      if (autoplayRef.current !== null) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };

    if (isMobile) start();
    else stop();

    return () => stop();
  }, [isMobile]);

  const pauseAutoplay = () => { isPausedRef.current = true; };
  const resumeAutoplay = () => { isPausedRef.current = false; };

  // Touch handlers for swipe on mobile
  const onTouchStart = (e) => {
    pauseAutoplay();
    const t = e.touches ? e.touches[0] : null;
    touchStartXRef.current = t ? t.clientX : null;
    touchDeltaXRef.current = 0;
  };
  const onTouchMove = (e) => {
    const t = e.touches ? e.touches[0] : null;
    if (t && touchStartXRef.current != null) {
      touchDeltaXRef.current = t.clientX - touchStartXRef.current;
    }
  };
  const onTouchEnd = () => {
    const delta = touchDeltaXRef.current;
    const SWIPE_THRESHOLD = 40;
    if (delta > SWIPE_THRESHOLD) handlePrev();
    else if (delta < -SWIPE_THRESHOLD) handleNext();

    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
    setTimeout(() => resumeAutoplay(), 300);
  };

  // Calculate transform:
  // - On desktop: shift by current * step (same as original)
  // - On mobile (visible=1): center the active item: translateX = centerShift - current*step
  const getTransform = () => {
    if (!step) return "translateX(0px)";
    if (isMobile) {
      const centerShift = Math.round((containerWidth - itemWidth) / 2);
      return `translateX(${centerShift - current * step}px)`;
    }
    return `translateX(${-current * step}px)`;
  };

  // conditional hover classes (disable on mobile)
  const imgHoverClasses = isMobile
    ? "h-full w-auto block transition-transform duration-[350ms] ease-[cubic-bezier(.2,.9,.3,1)] origin-[50%_70%] object-contain relative z-10"
    : "h-full w-auto block transition-transform duration-[350ms] ease-[cubic-bezier(.2,.9,.3,1)] origin-[50%_70%] object-contain relative z-10 group-hover:-translate-y-[6px] group-hover:-rotate-[-3deg] group-hover:scale-[1.08] group-hover:saturate-110 group-hover:animate-shake-pump";

  return (
    <div className="relative py-[4.5rem] pb-10 text-center text-white overflow-visible font-['Mona_Sans_Condensed',sans-serif]">
      {/* background split: top 70% dark red, bottom 30% light red */}
      <div className="absolute inset-0 pointer-events-none z-0 flex flex-col">
        <div className="h-[70%] bg-[#8B0000]" />
        <div className="flex-1 bg-[#FF1919]" />
      </div>

      {/* content (above background) */}
      <div className="relative z-10">
        <h2 className="text-[3.2rem] font-extrabold uppercase m-0">More Flavors</h2>
        <p className="text-[1.1rem] text-center max-w-[40rem] mx-auto my-4 mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum.
        </p>

        <div
          className="relative w-full flex justify-center items-center overflow-visible"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          {/* Keep buttons visible on desktop, hide on mobile */}
          <button
            aria-label="previous"
            onClick={handlePrev}
            className={`absolute -top-[64px] left-3 bg-[rgba(255,255,255,0.12)] border-0 cursor-pointer text-white text-[1.6rem] z-50 flex items-center justify-center w-[64px] h-[64px] rounded-full transition-transform duration-150 ease-in-out shadow-lg hover:-translate-y-1 hover:bg-[rgba(255,255,255,0.18)] ${isMobile ? "hidden" : "flex"}`}
          >
            <FaChevronLeft />
          </button>

          <button
            aria-label="next"
            onClick={handleNext}
            className={`absolute -top-[64px] right-3 bg-[rgba(255,255,255,0.12)] border-0 cursor-pointer text-white text-[1.6rem] z-50 flex items-center justify-center w-[64px] h-[64px] rounded-full transition-transform duration-150 ease-in-out shadow-lg hover:-translate-y-1 hover:bg-[rgba(255,255,255,0.18)] ${isMobile ? "hidden" : "flex"}`}
          >
            <FaChevronRight />
          </button>

          <div
            ref={carouselWindowRef}
            className="flex justify-start overflow-visible"
            style={{ width: "min(88%, 1100px)" }} // dynamic container width expression — one-time static expression; Tailwind can't express min(88%,1100px)
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onPointerDown={pauseAutoplay}
            onPointerUp={() => setTimeout(resumeAutoplay, 300)}
          >
            <div
              className="flex items-end transition-transform duration-[450ms] py-4 will-change-transform"
              style={{ transform: getTransform(), width: "max-content" }} // transform and track width need runtime values
            >
              {flavors.map((flavor, index) => (
                <div
                  key={index}
                  className={`group flex flex-col items-center text-center cursor-pointer flex-none transition-transform duration-300 transform ${isMobile ? "translate-y-[0px]" : "translate-y-[6px] hover:-translate-y-[12px]"} z-10 ${!isMobile ? "hover:z-40" : ""}`}
                  style={{ width: itemWidth ? `${itemWidth}px` : "auto", marginLeft: index === 0 ? 0 : `${gap}px` }} // width is dynamic
                >
                  <div className="block rounded-[10px] overflow-visible" style={{ height: "min(56vh,520px)" }}>
                    <img src={flavor.img} alt={flavor.name} className={imgHoverClasses} />
                  </div>
                  <p className="mt-3 text-base font-semibold">{flavor.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}