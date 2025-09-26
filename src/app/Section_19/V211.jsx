"use client";

import React from "react";

/*
  V211 - Web-style grid (visible everywhere)
  - Top left/right lines grow on mount with a small stagger
  - Grid layout responsive and usable on mobile as well
*/
export default function V211() {
  const rootVars = {
    "--primary": "#eb2525ff",
    "--secondary-heading": "#ffffff",
  };

  const [linesLoaded, setLinesLoaded] = React.useState(false);

  React.useEffect(() => {
    // small timeout to ensure animation runs after mount
    const t = setTimeout(() => setLinesLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

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

  return (
    <section className="relative text-left z-20 mt-10 mb-12" style={rootVars} aria-label="Flash Sale - On Sale Products (web-style)">
      {/* Title Bar */}
      <div className="flex items-center  justify-between w-full mb-8 px-4 md:px-6">
        {/* LEFT LINE */}
        <div
          className="h-[2px] bg-[var(--primary)]"
          style={{
            transform: linesLoaded ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 700ms cubic-bezier(.2,.8,.2,1), opacity 700ms",
            opacity: linesLoaded ? 1 : 0,
            width: "30%",
          }}
        />

        <div className="flex flex-col items-center mx-auto text-center max-w-3xl px-4">
          <div className="flex flex-col items-center w-full">
            <span
              className="inline-block rounded-[30px] px-5 py-2 text-base font-semibold bg-[var(--primary)] text-[var(--secondary-heading)] leading-[30px]"
            >
              Flash Sale
            </span>

            <div className="mt-4 flex flex-col items-center text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
                On Sale <span className="text-[#eb2525ff]">Products</span>
              </h2>
            </div>
          </div>
        </div>

        {/* RIGHT LINE */}
        <div
          className="h-[2px] bg-[var(--primary)]"
          style={{
            transform: linesLoaded ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "right",
            transition:
              "transform 700ms cubic-bezier(.2,.8,.2,1) 150ms, opacity 700ms 150ms",
            opacity: linesLoaded ? 1 : 0,
            width: "30%",
          }}
        />
      </div>

      {/* Products container */}
      <div className="container mx-auto px-4 md:px-5 max-w-[1440px]">
        <div className="grid gap-y-8 gap-x-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, idx) => (
            <article
              key={idx}
              className="group flex flex-col w-full h-full transition-colors duration-300 bg-white rounded-xl overflow-hidden shadow-sm"
            >
              <div className="relative flex items-center justify-center overflow-hidden bg-white aspect-square max-h-[380px]">
                {/* main image */}
                <img
                  src={p.mainImage}
                  alt={p.name}
                  className="w-full h-full object-contain transition-transform duration-700"
                />

                {/* hover image (fades in on hover) */}
                <img
                  src={p.hoverImage}
                  alt={`${p.name} hover`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transform scale-[1.2] transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 bg-white"
                />

                {/* sale pill */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded text-sm text-white bg-[var(--primary)]">
                  On Sale
                </div>

                {/* stacked buttons - hidden by default, appear on hover */}
                <div className="absolute right-6 bottom-3 flex flex-col items-end gap-2 z-20">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert(`${p.name} added to cart (demo)`);
                    }}
                  >
                    <button
                      type="submit"
                      className="text-white text-sm font-semibold shadow-[0_6px_18px_rgba(0,0,0,0.25)] opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 bg-[#eb2525ff] px-3 py-2 min-w-[96px] rounded"
                      aria-label={`Add ${p.name} to cart`}
                    >
                      ADD TO CART
                    </button>
                  </form>

                  <a
                    href="#"
                    className="text-black text-sm font-semibold shadow-[0_6px_18px_rgba(0,0,0,0.18)] opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 bg-[#2ecc71] px-3 py-2 min-w-[96px] rounded inline-flex items-center justify-center"
                  >
                    VIEW DETAILS
                  </a>
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                <div className="flex items-center mb-2 text-yellow-500" aria-hidden>
                  <span className="text-base">★</span>
                  <span className="text-base">★</span>
                  <span className="text-base">★</span>
                  <span className="text-base">★</span>
                  <span className="text-base">☆</span>
                </div>

                <a href="#" className="no-underline">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                </a>

                <div className="mt-3 flex items-center gap-3">
                  <div className="text-[20px] font-semibold">{p.price}</div>
                  <div className="text-sm text-gray-400 line-through">{p.compare}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}