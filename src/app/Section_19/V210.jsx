"use client";

import React from "react";

/*
  V210 - Mobile-style carousel (visible everywhere)
  - Autoplay slides every 2000ms (2s)
  - Active slide image auto-toggles between mainImage and hoverImage
  - Tap image to manually toggle (pauses autoplay briefly)
  - Tap card to expand details (Add to cart / View details)
*/
export default function V210({
  autoplay = true,
  autoplayInterval = 2000, // 2 seconds as requested
  imageToggleInterval = 1800,
}) {
  const rootVars = {
    "--primary": "#eb2525ff",
    "--secondary-heading": "#ffffff",
  };

  const products = [
    {
      name: "NX Suit",
      price: "$ 150.00 USD",
      compare: "$ 200.00 USD",
      mainImage:
        "https://cdn.prod.website-files.com/667337a492e68bf1bbac5bc1/6682fc9718fabe5571ab9096_suit-2688310_1280.avif",
      hoverImage:
        "https://cdn.prod.website-files.com/667337a492e68bf1bbac5bc1/6682fca0bcedcabbdb11fe0b_man-7200999_1280-p-500.avif",
    },
    {
      name: "Blue Jeans",
      price: "$ 50.00 USD",
      compare: "$ 68.00 USD",
      mainImage:
        "https://cdn.prod.website-files.com/667337a492e68bf1bbac5bc1/6682f3e60fc6625c5390879a_woman-2799490_1280.avif",
      hoverImage:
        "https://cdn.prod.website-files.com/667337a492e68bf1bbac5bc1/6682f3f2a70bd453048cb2f3_bag-1850053_1280.jpg",
    },
    {
      name: "Green Shirt",
      price: "$ 75.00 USD",
      compare: "$ 82.00 USD",
      mainImage:
        "https://cdn.prod.website-files.com/667337a492e68bf1bbac5bc1/6682ea4df396acbe785491f2_product_0-3.png",
      hoverImage:
        "https://cdn.prod.website-files.com/667337a492e68bf1bbac5bc1/6682ea50a1049f45b9daf962_product_0.png",
    },
    {
      name: "Blue Sweater",
      price: "$ 90.00 USD",
      compare: "$ 100.00 USD",
      mainImage:
        "https://cdn.prod.website-files.com/667337a492e68bf1bbac5bc1/6682f4d17fa5af1724d6d7a4_jacket-2899729_1280.avif",
      hoverImage:
        "https://cdn.prod.website-files.com/667337a492e68bf1bbac5bc1/6682f4d1f49f85adf2ef5ffb_jacket-2899728_1280-p-500.avif",
    },
  ];

  // refs & state
  const scrollRef = React.useRef(null);
  const autoplayTimerRef = React.useRef(null);
  const imageToggleTimerRef = React.useRef(null);
  const interactionTimeoutRef = React.useRef(null);
  const isInteractingRef = React.useRef(false);

  const [activeDot, setActiveDot] = React.useState(0);
  const [expanded, setExpanded] = React.useState(null);
  const [imageToggled, setImageToggled] = React.useState({}); // { idx: boolean }

  // center a child by index
  const centerChild = (i) => {
    const sc = scrollRef.current;
    if (!sc || !sc.children[i]) return;
    const child = sc.children[i];
    const scRect = sc.getBoundingClientRect();
    const chRect = child.getBoundingClientRect();
    const offset = (chRect.left + chRect.width / 2) - (scRect.left + scRect.width / 2);
    sc.scrollBy({ left: offset, behavior: "smooth" });
    setActiveDot(i);
  };

  // autoplay helpers
  const startAutoplay = React.useCallback(() => {
    if (!autoplay || autoplayTimerRef.current) return;
    autoplayTimerRef.current = setInterval(() => {
      if (!isInteractingRef.current) {
        setActiveDot((prev) => {
          const next = (prev + 1) % products.length;
          centerChild(next);
          return next;
        });
      }
    }, autoplayInterval);
  }, [autoplay, autoplayInterval, products.length]);

  const stopAutoplay = React.useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  const pauseForInteraction = React.useCallback(() => {
    isInteractingRef.current = true;
    stopAutoplay();
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
      startAutoplay();
    }, 4500);
  }, [startAutoplay, stopAutoplay]);

  // update activeDot based on scroll center
  React.useEffect(() => {
    const sc = scrollRef.current;
    if (!sc) return;
    let raf = null;
    const children = () => Array.from(sc.children || []);
    function update() {
      const scRect = sc.getBoundingClientRect();
      const scCenter = scRect.left + scRect.width / 2;
      let closestIndex = 0;
      let closestDist = Infinity;
      children().forEach((ch, i) => {
        const chRect = ch.getBoundingClientRect();
        const chCenter = chRect.left + chRect.width / 2;
        const d = Math.abs(chCenter - scCenter);
        if (d < closestDist) {
          closestDist = d;
          closestIndex = i;
        }
      });
      if (closestIndex !== activeDot) setActiveDot(closestIndex);
    }

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
      pauseForInteraction();
    };

    update();
    sc.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      sc.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [activeDot, pauseForInteraction]);

  // start autoplay at mount
  React.useEffect(() => {
    startAutoplay();
    return () => {
      stopAutoplay();
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    };
  }, [startAutoplay, stopAutoplay]);

  // image auto-toggle for the active slide
  React.useEffect(() => {
    if (imageToggleTimerRef.current) {
      clearInterval(imageToggleTimerRef.current);
      imageToggleTimerRef.current = null;
    }
    imageToggleTimerRef.current = setInterval(() => {
      setImageToggled((prev) => ({ ...prev, [activeDot]: !prev[activeDot] }));
    }, imageToggleInterval);
    return () => {
      if (imageToggleTimerRef.current) clearInterval(imageToggleTimerRef.current);
    };
  }, [activeDot, imageToggleInterval]);

  // pause autoplay while user touches the carousel
  React.useEffect(() => {
    const sc = scrollRef.current;
    if (!sc) return;
    const onPointerDown = () => pauseForInteraction();
    sc.addEventListener("pointerdown", onPointerDown, { passive: true });
    sc.addEventListener("touchstart", onPointerDown, { passive: true });
    return () => {
      sc.removeEventListener("pointerdown", onPointerDown);
      sc.removeEventListener("touchstart", onPointerDown);
    };
  }, [pauseForInteraction]);

  const toggleImageManual = (idx, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setImageToggled((prev) => ({ ...prev, [idx]: !prev[idx] }));
    pauseForInteraction();
  };

  const addToCartLocal = (p) => {
    alert(`${p.name} added to cart (demo)`);
    pauseForInteraction();
  };

  return (
    <section style={rootVars} className="relative  z-20 mt-6 mb-8 px-4">
      <div className="flex items-center  justify-center mb-6">
        <div className="flex items-center justify-center gap-3">
          {/* <span className="inline-block rounded-[30px] px-3 py-1 text-sm font-semibold bg-[var(--primary)] text-[var(--secondary-heading)]">
            Flash Sale
          </span> */}
          <h3 className="text-4xl font-semibold">On Sale <span className="text-[#eb2525ff]">Products</span></h3>
        </div>

        {/* <a href="#" className="text-sm font-medium text-gray-600 hover:text-black">View all</a> */}
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4"
        style={{ WebkitOverflowScrolling: "touch" }}
        aria-label="Sale products carousel"
      >
        {products.map((p, idx) => {
          const isToggled = !!imageToggled[idx];
          return (
            <div
              key={idx}
              className="snap-center flex-shrink-0 w-[78%] sm:w-[48%] md:w-[34%] lg:w-[28%] bg-white rounded-2xl shadow-md overflow-hidden transform transition-transform duration-300"
              style={{
                boxShadow: activeDot === idx ? "0 12px 40px rgba(0,0,0,0.18)" : undefined,
                transform: activeDot === idx ? "translateY(-6px)" : undefined,
              }}
            >
              <button
                type="button"
                onClick={() => setExpanded(expanded === idx ? null : idx)}
                aria-expanded={expanded === idx}
                className="w-full text-left"
              >
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={p.mainImage}
                    alt={p.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                      isToggled ? "opacity-0 scale-105" : "opacity-100 scale-100"
                    }`}
                    style={{ transitionTimingFunction: "cubic-bezier(.2,.9,.2,1)" }}
                    onClick={(e) => toggleImageManual(idx, e)}
                  />

                  <img
                    src={p.hoverImage}
                    alt={`${p.name} alternate`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                      isToggled ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                    style={{ transitionTimingFunction: "cubic-bezier(.2,.9,.2,1)" }}
                    onClick={(e) => toggleImageManual(idx, e)}
                  />

                  <div className="absolute top-3 left-3 px-3 py-1 rounded text-sm text-white bg-[var(--primary)]">
                    On Sale
                  </div>

                  <div className="absolute right-3 top-3 inline-flex items-center gap-2">
                    <div className="bg-white/80 text-xs px-2 py-1 rounded font-semibold">{p.price}</div>
                    <div className="text-xs text-gray-400 line-through hidden sm:block">{p.compare}</div>
                  </div>
                </div>

                <div className="p-4">
                  <h4 className="text-md font-semibold">{p.name}</h4>
                  <div className="flex items-center gap-2 mt-2 text-yellow-500" aria-hidden>
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>☆</span>
                  </div>

                  <div className="mt-3 text-sm text-gray-500">{expanded === idx ? "Tap again to collapse" : "Tap image to preview alternate view"}</div>
                </div>
              </button>

              <div
                className={
                  "px-4 pb-4 transition-all duration-300 overflow-hidden " +
                  (expanded === idx ? "max-h-60 opacity-100" : "max-h-0 opacity-0")
                }
                aria-hidden={expanded !== idx}
              >
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold">{p.price}</div>
                    <div className="text-sm text-gray-400 line-through">{p.compare}</div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => addToCartLocal(p)}
                      className="bg-[#eb2525ff] text-white px-3 py-2 rounded-md text-sm font-semibold shadow"
                    >
                      Add to cart
                    </button>

                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="bg-[#2ecc71] text-black px-3 py-2 rounded-md text-sm font-semibold shadow"
                    >
                      View details
                    </a>
                  </div>
                </div>

                <div className="mt-3 text-xs text-gray-400">Swipe to see other products</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 mt-2">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              centerChild(i);
              pauseForInteraction();
            }}
            aria-label={`Go to product ${i + 1}`}
            className={
              "w-2 h-2 rounded-full transition-all " +
              (activeDot === i ? "bg-[var(--primary)] w-3 h-3" : "bg-gray-300")
            }
          />
        ))}
      </div>
    </section>
  );
}