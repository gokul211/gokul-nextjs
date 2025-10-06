import React, { useEffect, useRef, useState } from "react";

export default function V250() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            setHasBeenInView(true);
          } else if (hasBeenInView) {
            setInView(false);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [hasBeenInView]);

  const products = [
    {
      title: "Summer Shirt",
      price: "Rs. 108,200.00",
      img: "//maya-theme-empower.myshopify.com/cdn/shop/files/pro_15a.webp?v=1744288727&width=1125",
      href: "/products/stylish-summer-shirt",
      titleBg: "#f6ea8c",
    },
    {
      title: "Women Sweater",
      price: "Rs. 405,500.00",
      img: "//maya-theme-empower.myshopify.com/cdn/shop/files/pro_2a.webp?v=1744290535&width=1125",
      href: "/products/flexfit-gym-set",
      titleBg: "#b0b8f2",
    },
    {
      title: "Loose T-shirt",
      price: "Rs. 315,400.00",
      img: "//maya-theme-empower.myshopify.com/cdn/shop/files/pro_14a.webp?v=1744289524&width=1125",
      href: "/products/loose-fit-t-shirt",
      titleBg: "#d18dd4",
    },
    {
      title: "Wool Overcoat",
      price: "Rs. 405,500.00",
      img: "//maya-theme-empower.myshopify.com/cdn/shop/files/pro_6a.webp?v=1744290182&width=1125",
      href: "/products/mens-wool-overcoat",
      titleBg: "#addd35",
    },
    {
      title: "Sports Bra",
      price: "Rs. 405,500.00",
      img: "//maya-theme-empower.myshopify.com/cdn/shop/files/pro_19a.webp?v=1744288379&width=1125",
      href: "/products/sports-bra-wide-straps",
      titleBg: "#d68ca7",
    },
  ];

  function lighten(hex, amount = 0.08) {
    try {
      if (!hex) return hex;
      let c = hex.replace("#", "");
      if (c.length === 3) c = c.split("").map((ch) => ch + ch).join("");
      const num = parseInt(c, 16);
      const r = Math.min(255, Math.round(((num >> 16) & 0xff) * (1 + amount)));
      const g = Math.min(255, Math.round(((num >> 8) & 0xff) * (1 + amount)));
      const b = Math.min(255, Math.round((num & 0xff) * (1 + amount)));
      return `rgb(${r}, ${g}, ${b})`;
    } catch {
      return hex;
    }
  }

  const topStackIndex = products.length - 1;
  const topStack = products[topStackIndex];

  return (
    <section
      id="shopify-section-template--18773151187141__best_selling_products_3ykyje"
      ref={ref}
      aria-label="Best selling products"
      className="relative overflow-hidden"
      style={{
        paddingTop: "70px",
        paddingBottom: "70px",
        background: "radial-gradient(rgba(37,45,0,1), rgba(0,0,0,1) 73%)",
        color: "#c4c4c4",
      }}
    >
      <div className="mx-auto max-w-[1114.67px] px-4">
        <div className="grid md:grid-cols-[.7fr_1fr] lg:grid-cols-2 gap-8 items-center">
          {/* LEFT: hero text */}
          <div className="space-y-6">
            <div className="max-w-[90%]">
              <h2
                className="text-[44px] md:text-[56px] leading-tight font-extrabold text-[#f5f5f5]"
                style={{ letterSpacing: "-0.5px" }}
              >
                TRENDING STYLES YOU
                <br />
                CAN'T MISS!
              </h2>

              <p className="text-sm text-[#c4c4c4] mt-4 leading-relaxed">
                Explore our collection of top-selling fashion favorites, featuring the latest trends and must-have styles loved by our customers.
                Each piece is thoughtfully selected for its quality, comfort, and popularity, making it easy to stay stylish without compromising on ease.
                <br />
                <br />
                From everyday essentials to standout statement looks, our bestsellers offer something for every wardrobe. Refresh your style with fashion that blends modern design and timeless appeal, and stay ahead of the curve with pieces that truly make an impact.
              </p>

              <div className="mt-6">
                <a
                  href="/collections/all"
                  className="inline-flex items-center gap-3 rounded-full px-5 py-3 bg-white text-black text-sm font-medium transition-all"
                  aria-label="Shop Now"
                >
                  <span className="w-6 h-6 flex items-center justify-center">
                    <svg viewBox="0 0 52 43" fill="none" className="w-5 h-5">
                      <path d="M0.775823 37.8686L4.1886 42.7085L43.9453 14.675L40.6173 33.9547L46.4679 34.9684L51.5177 5.71225L22.2644 0.643612L21.2545 6.4948L40.5325 9.83504L0.775823 37.8686Z" fill="currentColor"></path>
                    </svg>
                  </span>
                  <span>SHOP NOW</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: product panel */}
          <div className="p-4 relative">
            <div
              className="right-panel"
              style={{
                borderRadius: 18,
                padding: 18,
                background: "rgba(0,0,0,0.85)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.6), inset 0 0 40px rgba(0,0,0,0.45)",
                border: "2px solid rgba(255,255,255,0.03)",
                minHeight: 360,
              }}
            >
              {/* INITIAL STACK */}
              <div
                className="initial-stack"
                style={{
                  position: "absolute",
                  right: 28,
                  top: 12,
                  width: 320,
                  height: 68,
                  zIndex: 60,
                  pointerEvents: "none",
                  transformOrigin: "center right",
                  transform: inView
                    ? "translateY(-24px) translateX(36px) rotate(8deg) scale(0.9)"
                    : "translateY(0) rotate(-6deg) scale(1)",
                  opacity: inView ? 0 : 1,
                  transition: "transform 1s cubic-bezier(.2,.9,.3,1), opacity 0.8s ease 0.2s",
                }}
                aria-hidden
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 12,
                    background: lighten(topStack.titleBg, 0.12),
                    transform: "translate(12px, 10px) rotate(-2deg)",
                    boxShadow: "0 8px 22px rgba(0,0,0,0.45)",
                    zIndex: 1,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 12,
                    background: lighten(topStack.titleBg, 0.06),
                    transform: "translate(6px, 6px) rotate(-1.5deg)",
                    boxShadow: "0 10px 24px rgba(0,0,0,0.36)",
                    zIndex: 2,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 12,
                    overflow: "hidden",
                    background: topStack.titleBg,
                    zIndex: 10,
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 20,
                    paddingRight: 20,
                    boxShadow: "0 12px 30px rgba(0,0,0,0.34)",
                  }}
                >
                  <div style={{ fontWeight: 700, color: "#111", fontSize: 18 }}>{topStack.title}</div>
                </div>
              </div>

              {/* Product list */}
              <ul className="flex flex-col items-center justify-center gap-4" style={{ position: "relative", zIndex: 20 }}>
                {products.map((p, idx) => {
                  const base = idx * 220; // more gap = slower stagger
                  const delays = {
                    container: idx * 160,
                    image: base + 80,
                    fill: base + 200,
                    title: base + 320,
                    price: base + 440,
                    arrow: base + 560,
                  };
                  const reverseDelays = {
                    container: idx * 120,
                    image: base + 60,
                    fill: base + 160,
                    title: base + 240,
                    price: base + 360,
                    arrow: base + 0,
                  };

                  const initialTransform = `translate(120px, -220px) rotate(10deg) scale(0.96)`;
                  const finalTransform = `translate(0,0) rotate(0deg) scale(1)`;

                  return (
                    <li
                      key={p.title}
                      className="product-row"
                      style={{
                        position: "relative",
                        width: "100%",
                        borderRadius: 14,
                        padding: 6,
                        background: "transparent",
                        transform: inView ? finalTransform : initialTransform,
                        transition: `transform 1.2s cubic-bezier(.22,1,.36,1) ${inView ? delays.container : reverseDelays.container}ms, opacity 1.1s ease ${inView ? delays.container : reverseDelays.container}ms`,
                        opacity: inView ? 1 : 0,
                      }}
                    >
                      <div
                        className="thumb"
                        style={{
                          position: "absolute",
                          left: 14,
                          top: "50%",
                          width: 84,
                          height: 84,
                          borderRadius: 12,
                          overflow: "hidden",
                          boxShadow: "0 6px 18px rgba(0,0,0,0.45)",
                          background: "#eee",
                          zIndex: 12,
                          transform: inView
                            ? "translateY(-50%) translateX(0) rotate(-4deg) scale(1)"
                            : "translateY(-220%) translateX(120px) rotate(8deg) scale(0.96)",
                          opacity: inView ? 1 : 0,
                          transition: `transform 1.3s cubic-bezier(.22,1,.36,1) ${inView ? delays.image : reverseDelays.image}ms, opacity 1s ease ${inView ? delays.image : reverseDelays.image}ms`,
                        }}
                      >
                        <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
                      </div>

                      <a
                        href={p.href}
                        className="inner-card"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 18,
                          padding: "16px 18px 16px 112px",
                          borderRadius: 12,
                          background: "transparent",
                          color: "#000",
                          textDecoration: "none",
                          zIndex: 10,
                          position: "relative",
                          minHeight: 104,
                          overflow: "hidden",
                        }}
                        aria-label={p.title}
                      >
                        <div
                          className="fill"
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: p.titleBg,
                            transform: inView ? "scaleX(1)" : "scaleX(0)",
                            transformOrigin: "left center",
                            transition: `transform 0.9s cubic-bezier(.2,.9,.3,1) ${inView ? delays.fill : reverseDelays.fill}ms`,
                            zIndex: 2,
                          }}
                        />

                        <div style={{ position: "relative", zIndex: 3, display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
                            <div
                              className="card-title"
                              style={{
                                fontWeight: 700,
                                fontSize: 16,
                                lineHeight: 1.1,
                                opacity: inView ? 1 : 0,
                                transform: inView ? "translateY(0)" : "translateY(10px)",
                                transition: `all 0.9s cubic-bezier(.16,.84,.44,1) ${inView ? delays.title : reverseDelays.title}ms`,
                              }}
                            >
                              {p.title}
                            </div>

                            <div
                              className="card-price"
                              style={{
                                fontSize: 13,
                                opacity: inView ? 1 : 0,
                                transform: inView ? "translateY(0)" : "translateY(10px)",
                                transition: `all 0.9s cubic-bezier(.16,.84,.44,1) ${inView ? delays.price : reverseDelays.price}ms`,
                              }}
                            >
                              {p.price}
                            </div>
                          </div>

                          <div
                            className="arrow-wrap"
                            style={{
                              position: "absolute",
                              right: 14,
                              top: "50%",
                              transform: inView ? "translateY(-50%) scale(1)" : "translateY(-50%) scale(0.86)",
                              zIndex: 20,
                              opacity: inView ? 1 : 0,
                              transition: `transform 0.8s cubic-bezier(.16,.84,.44,1) ${inView ? delays.arrow : reverseDelays.arrow}ms, opacity 0.8s ease ${inView ? delays.arrow : reverseDelays.arrow}ms`,
                            }}
                          >
                            <span
                              style={{
                                width: 44,
                                height: 44,
                                borderRadius: "50%",
                                border: "2px solid rgba(0,0,0,0.18)",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "transparent",
                              }}
                              aria-hidden
                            >
                              <svg viewBox="0 0 52 43" fill="none" style={{ width: 18, height: 18 }}>
                                <path d="M0.775823 37.8686L4.1886 42.7085L43.9453 14.675L40.6173 33.9547L46.4679 34.9684L51.5177 5.71225L22.2644 0.643612L21.2545 6.4948L40.5325 9.83504L0.775823 37.8686Z" fill="currentColor"></path>
                              </svg>
                            </span>
                          </div>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        ul > li { width: 70%; margin: 0 auto; }
        @media (min-width: 1025px) {
          ul > li { width: 100%; }
        }

        .inner-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .inner-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }
        .inner-card .arrow-wrap span {
          transition: transform 0.3s ease;
        }
        .inner-card .arrow-wrap span:hover {
          transform: scale(1.06);
        }

        @media (max-width: 640px) {
          .thumb { left: 8px; width: 72px; height: 72px; }
          .inner-card { padding-left: 98px; min-height: 88px; }
          ul > li { width: 90%; }
        }
      `}</style>
    </section>
  );
}