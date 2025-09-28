"use client";
import { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function V225() {
  const [current, setCurrent] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [step, setStep] = useState(0);
  const carouselWindowRef = useRef(null);
  const isFirstMeasure = useRef(true);

  const gap = 12; // gap between items
  const scaleFactor = 1.18; // increase to make cans wider

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

  const decideVisibleCount = (containerWidth) => {
    if (containerWidth >= 1500) return 6;
    if (containerWidth >= 1200) return 5;
    if (containerWidth >= 900) return 4;
    if (containerWidth >= 600) return 3;
    return 2;
  };

  useEffect(() => {
    const el = carouselWindowRef.current;
    if (!el) return;

    const update = () => {
      const width = el.clientWidth || el.getBoundingClientRect().width;
      // For the first measurement, force 5 visible items
      let visible = isFirstMeasure.current ? 5 : decideVisibleCount(width);

      // Compute widths and step
      const totalGap = gap * (visible - 1);
      const baseItemWidth = (width - totalGap) / visible;
      const computedItemWidth = Math.floor(baseItemWidth * scaleFactor);

      // Prevent item from being wider than container space
      const maxAllowed = Math.floor(width - (visible - 1) * gap);
      const finalItemWidth = Math.min(computedItemWidth, maxAllowed);

      setItemWidth(finalItemWidth);
      setStep(finalItemWidth + gap);

      // mark that we've done the first measurement
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

  return (
    <div
      className="py-[6.5rem] pb-12 text-center text-white overflow-visible"
      style={{
        // Top dark red, bottom light red (adjust % or colors as needed)
        background: "linear-gradient(180deg, #8B0000 0%, #8B0000 70%, #FF1919 70%, #FF1919 100%)",
        fontFamily: '"Mona Sans Condensed", sans-serif'
      }}
    >
      <h2 className="text-[5rem] font-extrabold uppercase m-0">More Flavors</h2>
      <p className="text-[1.5rem] text-center max-w-[47rem] mx-auto my-4 mb-12">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum.
      </p>

      <div className="relative w-full flex justify-center items-center overflow-visible">
        <button
          aria-label="previous"
          onClick={handlePrev}
          className="absolute bg-[rgba(255,255,255,0.12)] border-0 cursor-pointer text-white text-[2.2rem] z-50 flex items-center justify-center w-[80px] h-[80px] rounded-full transition-transform duration-150 ease-in-out shadow-lg hover:-translate-y-1 hover:bg-[rgba(255,255,255,0.18)]"
          style={{ top: "-80px", left: "12px" }}
        >
          <FaChevronLeft />
        </button>

        <button
          aria-label="next"
          onClick={handleNext}
          className="absolute bg-[rgba(255,255,255,0.12)] border-0 cursor-pointer text-white text-[2.2rem] z-50 flex items-center justify-center w-[80px] h-[80px] rounded-full transition-transform duration-150 ease-in-out shadow-lg hover:-translate-y-1 hover:bg-[rgba(255,255,255,0.18)]"
          style={{ top: "-80px", right: "12px" }}
        >
          <FaChevronRight />
        </button>

        <div
          ref={carouselWindowRef}
          className="flex justify-start overflow-visible"
          style={{ width: "min(88%, 1100px)", paddingTop: "2.8rem", paddingBottom: "1rem", boxSizing: "border-box" }}
        >
          <div
            className="flex items-end transition-transform duration-[450ms] py-4 will-change-transform"
            style={{ transform: `translateX(-${current * step}px)`, width: "max-content" }}
          >
            {flavors.map((flavor, index) => (
              <div
                key={index}
                className="group flex flex-col items-center text-center cursor-pointer flex-none transition-transform duration-300 transform translate-y-[6px] hover:-translate-y-[12px] z-10 hover:z-40"
                style={{ width: itemWidth ? `${itemWidth}px` : "auto", marginLeft: index === 0 ? 0 : `${gap}px` }}
              >
                {/* Increased can height */}
                <div className="block rounded-[10px] overflow-visible" style={{ height: "min(68vh, 680px)" }}>
                  <img
                    src={flavor.img}
                    alt={flavor.name}
                    className="h-full w-auto block transition-transform duration-[350ms] ease-[cubic-bezier(.2,.9,.3,1)] origin-[50%_70%] object-contain relative z-10 group-hover:-translate-y-[6px] group-hover:-rotate-[-3deg] group-hover:scale-[1.08] group-hover:saturate-110 group-hover:animate-shake-pump"
                  />
                </div>
                <p className="mt-4 text-base font-semibold">{flavor.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}