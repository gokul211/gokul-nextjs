import React, { useRef, useState, useEffect } from "react";

export default function V247() {
  const sliderRef = useRef(null);
  const originalScrollRef = useRef(null); // store original scrollLeft when shifting
  const shiftedRef = useRef(false); // whether we've applied the hover-shift
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [modalIndex, setModalIndex] = useState(null); // for tap-to-open
  const scrollTimeoutRef = useRef(null);
  const autoScrollPausedRef = useRef(false);

  const testimonials = [
    {
      text: `I’ve been shopping at this store for a few months now, and I can confidently say it’s one of the best online shopping experiences I've had. From the seamless ordering process to the fast delivery, everything has been top-notch.`,
      name: "Sophia M.",
      place: "San Francisco, CA",
      img: "//maya-theme-empower.myshopify.com/cdn/shop/files/testimonial_4.webp?v=1746436221&w=400",
    },
    {
      text: `I recently ordered a few items from the 'Stay Warm & Stylish' collection, and I couldn’t be happier. The jacket I bought is both warm and trendy, and I’ve received so many compliments! The material is high quality, and it fits just right.`,
      name: "John P.",
      place: "Austin, TX",
      img: "//maya-theme-empower.myshopify.com/cdn/shop/files/testimonial_6.webp?v=1746436221&w=400",
    },
    {
      text: `As someone who is conscious about the environment, I was thrilled to find a clothing brand that offers an eco-friendly collection without sacrificing style. The clothes are beautiful, comfortable.`,
      name: "Emily R.",
      place: "Miami, FL",
      img: "//maya-theme-empower.myshopify.com/cdn/shop/files/testimonial_1.webp?v=1746436221&w=400",
    },
    {
      text: `The whole shopping experience was fantastic. The website is user-friendly, and I found exactly what I was looking for without any hassle. My order arrived in perfect condition, and the clothing fits beautifully.`,
      name: "Olivia T.",
      place: "Chicago, IL",
      img: "//maya-theme-empower.myshopify.com/cdn/shop/files/testimonial_5.webp?v=1746436222&w=400",
    },
    {
      text: `I’ve been a loyal customer for over a year, and I keep coming back because of the excellent quality and stylish designs. Whether I’m looking for casual wear or something a bit dressier, I can always find something that fits my style perfectly.`,
      name: "Liam W.",
      place: "Los Angeles, CA",
      img: "//maya-theme-empower.myshopify.com/cdn/shop/files/testimonial_7.webp?v=1746436221&w=400",
    },
    {
      text: `I recently ordered from the 'Trendy & Comfortable' collection, and I am so impressed with the quality and design. The items are versatile enough to wear for various occasions, from work to weekend outings.`,
      name: "Mark J.",
      place: "New York, NY",
      img: "//maya-theme-empower.myshopify.com/cdn/shop/files/testimonial_8.webp?v=1746436221&w=400",
    },
  ];

  // determine mobile breakpoint
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto-scroll every 4s (pauses when interacting)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!autoScrollPausedRef.current) {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // center a card in the viewport (works for mobile and desktop)
  const scrollCardIntoView = (index, behavior = "smooth") => {
    const el = sliderRef.current;
    if (!el) return;
    const cards = el.querySelectorAll(".testimonial-card");
    const card = cards[index];
    if (!card) return;
    // center calculation
    const left =
      card.offsetLeft - (el.clientWidth - card.clientWidth) / 2 - parseFloat(getComputedStyle(el).paddingLeft || 0);
    el.scrollTo({ left: Math.max(0, left), behavior });
  };

  // Smooth scroll when activeIndex changes
  useEffect(() => {
    scrollCardIntoView(activeIndex, "smooth");
    // update activeDot logic will use activeIndex elsewhere
  }, [activeIndex]);

  // SHIFT LOGIC (no transform on container, we scroll the container instead)
  const applyHoverShift = () => {
    const el = sliderRef.current;
    if (!el || shiftedRef.current) return;

    const style = getComputedStyle(el);
    const padLeft = parseFloat(style.paddingLeft) || 0;
    if (!padLeft) {
      // nothing to shift
      return;
    }
    originalScrollRef.current = el.scrollLeft;
    const target = Math.max(0, el.scrollLeft - padLeft);
    el.scrollTo({ left: target, behavior: "smooth" });
    shiftedRef.current = true;
  };

  const restoreHoverShift = () => {
    const el = sliderRef.current;
    if (!el || !shiftedRef.current) return;
    const orig = originalScrollRef.current ?? 0;
    el.scrollTo({ left: orig, behavior: "smooth" });
    shiftedRef.current = false;
    originalScrollRef.current = null;
  };

  // handlers for per-card hover — we only call applyHoverShift once when hovering any card,
  // and restore when pointer leaves the slider area entirely to avoid flicker while moving between cards
  const handleCardMouseEnter = (index) => {
    setHoveredIndex(index);
    if (!isMobile) applyHoverShift();
  };

  const handleCardMouseLeave = () => {
    setHoveredIndex(null);
    // do NOT restore here — allow moving between cards without restoring
    // slider area onMouseLeave will restore
  };

  // restore when pointer leaves the whole slider region
  const handleSliderMouseLeave = () => {
    setHoveredIndex(null);
    if (!isMobile) restoreHoverShift();
  };

  // ---------- Mobile / touch interaction handlers ----------

  // Pause auto scroll when user starts interacting
  const startInteraction = () => {
    setIsInteracting(true);
    autoScrollPausedRef.current = true;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }
  };

  // End interaction: snap to nearest card and resume auto-scroll after short delay
  const endInteractionAndSnap = () => {
    setIsInteracting(false);
    // small debounce to wait for scroll inertia to settle
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      snapToNearest();
      // resume auto-scroll after another short delay
      setTimeout(() => {
        autoScrollPausedRef.current = false;
      }, 600);
    }, 120);
  };

  // Called on scroll end: determine nearest card to center and set activeIndex
  const snapToNearest = () => {
    const el = sliderRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll(".testimonial-card"));
    if (!cards.length) return;
    const containerCenter = el.scrollLeft + el.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Infinity;
    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const dist = Math.abs(containerCenter - cardCenter);
      if (dist < nearestDistance) {
        nearestDistance = dist;
        nearestIndex = idx;
      }
    });
    setActiveIndex(nearestIndex);
  };

  // scroll event handler (debounced)
  const handleScroll = () => {
    // while scrolling, pause auto scroll immediately
    autoScrollPausedRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      snapToNearest();
      // resume auto-scroll after short delay
      setTimeout(() => {
        autoScrollPausedRef.current = false;
      }, 600);
    }, 100);
  };

  // Click / tap card to open modal on mobile, or set active on desktop
  const handleCardClick = (index) => {
    if (isMobile) {
      // open modal (tap to view)
      setModalIndex(index);
    } else {
      setActiveIndex(index);
    }
  };

  // Dots → 4 only on desktop, on mobile show one dot per testimonial
  const visibleDots = isMobile ? testimonials.length : 4;
  const groupSize = Math.ceil(testimonials.length / (isMobile ? testimonials.length : visibleDots));
  const activeDot = Math.floor(activeIndex / groupSize);

  // ensure scroll listener attached
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // cleaning timeouts on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <section
      id="shopify-section-template--18773151187141__testimonial_HGhyBK"
      className="relative overflow-hidden"
      style={{ paddingTop: "100px", paddingBottom: "130px" }}
      aria-label="Testimonials"
    >
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <img
          src="//maya-theme-empower.myshopify.com/cdn/shop/files/testimonials_bg.svg?v=1741605757&width=1921"
          alt="background"
          className="w-full h-full object-contain opacity-60"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1920px] mx-auto">
        <div className="text-left mb-10 pl-8 md:pl-5">
          <p className="text-lg font-medium tracking-wide text-gray-500">
            SUCCESS STORIES THAT INSPIRE
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            SEE WHAT REAL CUSTOMERS SAY
          </h2>
        </div>

        {/* Slider */}
        <div
          className="relative"
          onMouseLeave={handleSliderMouseLeave}
          // onPointer handlers for pause/resume (desktop & mobile)
          onPointerDown={() => startInteraction()}
          onPointerUp={() => endInteractionAndSnap()}
          onPointerCancel={() => endInteractionAndSnap()}
        >
          <div
            ref={sliderRef}
            className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory pl-6 md:pl-18"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {testimonials.map((t, i) => (
              <article
                key={i}
                onMouseEnter={() => handleCardMouseEnter(i)}
                onMouseLeave={handleCardMouseLeave}
                onClick={() => handleCardClick(i)}
                className="testimonial-card snap-center md:snap-start bg-gradient-to-br from-white/80 via-white/90 to-white rounded-2xl p-6 min-w-[85%] sm:min-w-[72%] md:min-w-[320px] lg:min-w-[385px] shadow-lg cursor-pointer"
                style={{
                  border:
                    hoveredIndex === i
                      ? "1px solid rgba(0,0,0,0.14)"
                      : "1px solid transparent",
                  transition:
                    "border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease",
                }}
                aria-hidden={activeIndex !== i && isMobile}
                aria-label={`Testimonial by ${t.name}`}
              >
                <div className="testimonial-content mb-6">
                  <p className="text-sm leading-6 text-gray-700 line-clamp-6">
                    {t.text}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white">
                    <img
                      src={t.img}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {t.name}
                    </div>
                    <div className="text-sm text-gray-500">{t.place}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Dots */}
          <div className="mt-6 flex justify-center">
            <div className="flex gap-3 items-center">
              {Array.from({ length: visibleDots }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    // compute index to jump to (if grouped)
                    const targetIndex = isMobile ? i : Math.min(testimonials.length - 1, i * groupSize);
                    setActiveIndex(targetIndex);
                    scrollCardIntoView(targetIndex, "smooth");
                  }}
                  aria-label={`Go to testimonials group ${i + 1}`}
                  className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
                    i === activeDot ? "scale-110 bg-black/80" : "bg-black/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for mobile full read */}
      {modalIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setModalIndex(null)}
        >
          <div
            className="bg-white rounded-xl max-w-xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  {testimonials[modalIndex].name}
                </h3>
                <div className="text-sm text-gray-500">
                  {testimonials[modalIndex].place}
                </div>
              </div>
              <button
                onClick={() => setModalIndex(null)}
                aria-label="Close testimonial"
                className="text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-700 leading-7">
                {testimonials[modalIndex].text}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setModalIndex(null)}
                className="px-4 py-2 bg-black text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 767px) {
          section#shopify-section-template--18773151187141__testimonial_HGhyBK {
            padding-top: 40px !important;
            padding-bottom: 40px !important;
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        /* ensure cards center nicely on most screen sizes */
        .testimonial-card {
          scroll-snap-align: center;
        }
        /* line-clamp for preview on mobile (requires tailwind/line-clamp plugin or you can remove) */
        .line-clamp-6 {
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}