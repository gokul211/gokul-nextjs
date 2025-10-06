import React, { useEffect, useRef, useState } from "react";

/*
  V232 — Auto-playing, right-to-left carousel (one-by-one)
  - Shows one product per view
  - Auto-advances right -> left (i.e. slides next item into view)
  - Seamless looping using a cloned first slide
  - Pauses on hover/touch and when Quick View is open
  - Clicking color swatches still updates the tile immediately and Quick View synchronizes
*/

function formatPrice(n) {
  return n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* Product card (same visuals/behavior) */
function ProductCard({ product, selectedColor, onColorChange, onQuickView, compact = false }) {
  const mainImage = selectedColor?.images?.[0] || product.images[0];
  const hoverImage = product.hoverImage || product.images[1] || product.images[0];

  return (
    <div
      className="product-tile"
      role="group"
      aria-label={product.title}
      tabIndex={-1}
    >
      <div className="media-panel">
        <a href={product.url} onClick={(e) => e.preventDefault()} className="block w-full">
          <div className="media-stack">
            <img src={mainImage} alt={`${product.title} - ${selectedColor?.name || "default"}`} className="primary-image" />
            <img src={hoverImage} alt="hover" className="product-image-secondary" />
          </div>
        </a>

        <button
          className="quick-view-btn"
          onClick={() => onQuickView(product)}
          aria-label="Quick View"
          title="Quick View"
        >
          <span>QUICK VIEW</span>
        </button>
      </div>

      <div className="product-info">
        <a href={product.url} onClick={(e) => e.preventDefault()} className="title">
          {product.title}
        </a>
        <div className="price">Rs. {formatPrice(product.price)}</div>

        <div className="swatches-container">
          {product.colors.map((c) => (
            <button
              key={c.name}
              onClick={() => onColorChange(product.id, c)}
              className={`swatch ${selectedColor?.name === c.name ? "active" : ""}`}
              title={c.name}
              aria-label={`Select color ${c.name}`}
              style={{ backgroundColor: c.color }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .product-tile {
          width: 100%;
          max-width: 520px;
          box-sizing: border-box;
          padding: 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .media-panel {
          width: 100%;
          border-radius: 16px;
          background: #f3f3f4;
          padding: 14px;
          position: relative;
          overflow: hidden;
        }
        .media-stack {
          width: 100%;
          padding-top: 110%;
          position: relative;
          border-radius: 12px;
          overflow: hidden;
        }
        .media-stack img { position: absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; display:block; }
        .product-image-secondary { opacity: 0; transform: scale(.99); transition: opacity .24s, transform .24s; }
        .media-stack:hover .product-image-secondary { opacity: 1; transform: scale(1); }
        .quick-view-btn {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 12px;
          background: rgba(255,255,255,0.95);
          padding: 10px 12px;
          border-radius: 999px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          border: none;
          cursor: pointer;
        }
        .quick-view-btn span { font-size: 12px; font-weight: 600; }

        .product-info { text-align: center; margin-top: 12px; width: 100%; }
        .title { display:block; font-weight: 600; color: #111; text-decoration: none; margin-bottom: 6px; }
        .price { color: #6b7280; font-size: 13px; margin-bottom: 8px; }

        .swatches-container { display:flex; gap:8px; justify-content:center; align-items:center; margin-top:6px; }
        .swatch { width: 36px; height: 36px; border-radius: 6px; border: 1px solid rgba(0,0,0,0.08); display:inline-block; cursor:pointer; }
        .swatch.active { outline: 3px solid rgba(0,0,0,0.12); }

        @media (min-width: 900px) {
          .product-tile { max-width: 420px; padding: 12px; }
        }
      `}</style>
    </div>
  );
}

/* Quick view modal - compact bottom sheet on small screens */
function QuickViewModal({ product, selectedColor, onClose, onColorChange }) {
  const [activeImage, setActiveImage] = useState(0);
  const [localColor, setLocalColor] = useState(selectedColor || product?.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setLocalColor(selectedColor || product?.colors?.[0] || null);
    setSelectedSize(product?.sizes?.[0] || null);
    setActiveImage(0);
    setQty(1);
  }, [product, selectedColor]);

  if (!product) return null;

  const colorImages = localColor?.images?.length ? localColor.images : product.images;
  const stop = (e) => e.stopPropagation();

  function handleColorSelect(c) {
    setLocalColor(c);
    setActiveImage(0);
    onColorChange(product.id, c);
  }

  return (
    <div className="qv-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="qv-content" onClick={stop}>
        <div className="qv-left">
          <div className="qv-img-wrap">
            <img src={colorImages[activeImage]} alt={product.title} />
          </div>

          <div className="thumbs">
            {colorImages.map((im, i) => (
              <button key={i} onClick={() => setActiveImage(i)} className={`thumb ${i === activeImage ? "active" : ""}`}>
                <img src={im} alt={`thumb-${i}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="qv-right">
          <div>
            <h3>{product.title}</h3>
            <div className="sku">{product.sku}</div>
            <div className="price-large">Rs. {formatPrice(product.price)}</div>

            <div className="section">
              <div className="label">COLOR :</div>
              <div className="colors">
                {product.colors.map((c) => (
                  <button key={c.name} onClick={() => handleColorSelect(c)} className={`sw ${localColor?.name === c.name ? "active" : ""}`} style={{ backgroundColor: c.color }} />
                ))}
              </div>
            </div>

            <div className="section">
              <div className="label">SIZE :</div>
              <div className="sizes">
                {product.sizes.map((s) => (
                  <button key={s} className="size">{s}</button>
                ))}
              </div>
            </div>

            <div className="section qty">
              <div className="label">Quantity</div>
              <div className="qty-controls">
                <button className="qbtn">−</button>
                <div className="qnum">1</div>
                <button className="qbtn">+</button>
              </div>
            </div>
          </div>

          <div className="actions">
            <button className="add">Add to cart</button>
            <button className="buy">Buy it now</button>
            <button onClick={onClose} className="close">Close</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .qv-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 60; display:flex; align-items:center; justify-content:center; padding:16px; }
        .qv-content { width: 100%; max-width: 920px; background: #fff; border-radius: 12px; display: grid; grid-template-columns: 1fr 1fr; max-height: 90vh; overflow:auto; }
        .qv-left { padding: 14px; }
        .qv-img-wrap { background:#f3f3f4; border-radius: 10px; overflow:hidden; }
        .qv-img-wrap img { width:100%; height: auto; display:block; object-fit:cover; max-height: 520px; }
        .thumbs { display:flex; gap:8px; margin-top:10px; overflow:auto; padding-bottom:6px; }
        .thumb { width:64px; height:64px; border-radius:8px; border:1px solid #e6e6e6; overflow:hidden; }
        .thumb img { width:100%; height:100%; object-fit:cover; display:block; }

        .qv-right { padding: 16px; display:flex; flex-direction:column; justify-content:space-between; }
        .qv-right h3 { margin:0; font-size:20px; }
        .sku { color:#6b7280; font-size:13px; margin-top:6px; }
        .price-large { font-size:22px; font-weight:700; margin-top:10px; }

        .section { margin-top:12px; }
        .label { font-weight:600; font-size:13px; margin-bottom:8px; display:inline-block; }
        .colors { display:flex; gap:8px; align-items:center; }
        .sw { width:36px; height:36px; border-radius:8px; border:1px solid rgba(0,0,0,0.08); }
        .sw.active { outline: 3px solid rgba(0,0,0,0.12); }

        .sizes { display:flex; gap:8px; flex-wrap:wrap; margin-top:6px; }
        .size { padding:8px 12px; border:1px solid #e5e7eb; border-radius:8px; background:#fff; }

        .qty { margin-top:12px; }
        .qty-controls { display:flex; gap:8px; align-items:center; margin-top:8px; }
        .qbtn { padding:8px 12px; border:1px solid #e5e7eb; border-radius:8px; background:#fff; }
        .qnum { padding:8px 12px; border:1px solid #e5e7eb; border-radius:8px; }

        .actions { display:flex; gap:10px; margin-top:12px; }
        .add { flex:1; background:#111; color:#fff; padding:12px; border-radius:999px; border:none; }
        .buy { flex:1; border:1px solid #111; padding:12px; border-radius:999px; background:#fff; }
        .close { padding:10px 12px; border-radius:8px; border:1px solid #e5e7eb; }
        
        /* Mobile: bottom-sheet compact */
        @media (max-width: 640px) {
          .qv-backdrop { align-items: flex-end; padding:0; background: linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.6)); }
          .qv-content { width: 100%; max-width: 100%; border-radius: 12px 12px 0 0; grid-template-columns: 1fr; max-height: 85vh; }
          .qv-left, .qv-right { padding:12px; }
          .qv-img-wrap img { max-height: 320px; border-radius:8px; }
          .actions { flex-direction: column; }
          .actions button { width:100%; }
        }
      `}</style>
    </div>
  );
}

/* Page: V232 (Auto-play R->L carousel) */
export default function V232() {
  const [products] = useState(sampleProducts());
  const [selectedColors, setSelectedColors] = useState({});
  const [quickProduct, setQuickProduct] = useState(null);

  // Carousel state/refs
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0); // 0..n (n is cloned first)
  const slideCount = products.length;
  const intervalRef = useRef(null);
  const transitionMs = 600;
  const autoDelay = 3000;

  // init selected colors
  useEffect(() => {
    const map = {};
    products.forEach((p) => { map[p.id] = p.colors?.[0] || null; });
    setSelectedColors(map);
  }, [products]);

  // Build array of refs for items (unused for transform approach but kept for potential extensions)
  useEffect(() => {
    // start autoplay after mount
    startAuto();
    return () => stopAuto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pause when QuickView open
  useEffect(() => {
    if (quickProduct) stopAuto(); else startAuto();
  }, [quickProduct]);

  // Carousel control functions
  function startAuto() {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setSlideIndex((s) => s + 1);
    }, autoDelay);
  }
  function stopAuto() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  // Apply transform whenever slideIndex changes
  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    // ensure inner has transition for index < cloneIndex
    inner.style.transition = `transform ${transitionMs}ms cubic-bezier(.2,.9,.2,1)`;
    // compute percent translate: each slide is 100% of container width
    const translateX = -(slideIndex * 100);
    inner.style.transform = `translateX(${translateX}%)`;

    // if we've moved to the cloned slide (index === slideCount), after transition reset to 0 without animation
    if (slideIndex >= slideCount) {
      const onEnd = () => {
        // disable transition, snap back to start
        inner.style.transition = "none";
        inner.style.transform = `translateX(0%)`;
        // force reflow to apply no-transition transform
        // eslint-disable-next-line no-unused-expressions
        inner.offsetHeight;
        // reset index to 0 without animation
        setSlideIndex(0);
        inner.removeEventListener("transitionend", onEnd);
      };
      inner.addEventListener("transitionend", onEnd);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideIndex, slideCount]);

  function handleMouseEnter() { stopAuto(); }
  function handleMouseLeave() { if (!quickProduct) startAuto(); }
  function handleTouchStart() { stopAuto(); }
  function handleTouchEnd() { if (!quickProduct) startAuto(); }

  function handleColorChange(productId, colorObj) {
    setSelectedColors((s) => ({ ...s, [productId]: colorObj }));
  }

  return (
    <main className="min-h-screen bg-white p-4">
      <section id="trending-section" className="max-w-6xl mx-auto">
        <h2 className="heading">TRENDING PRODUCTS</h2>

        <div
          className="carousel-outer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          ref={containerRef}
        >
          <div className="carousel-inner" ref={innerRef}>
            {products.map((p) => (
              <div className="slide" key={p.id}>
                <ProductCard
                  product={p}
                  selectedColor={selectedColors[p.id]}
                  onColorChange={handleColorChange}
                  onQuickView={(product) => setQuickProduct(product)}
                />
              </div>
            ))}

            {/* cloned first slide for seamless loop */}
            <div className="slide clone" key={"clone-first"}>
              <ProductCard
                product={products[0]}
                selectedColor={selectedColors[products[0].id]}
                onColorChange={handleColorChange}
                onQuickView={(product) => setQuickProduct(product)}
              />
            </div>
          </div>
        </div>
      </section>

      {quickProduct && (
        <QuickViewModal
          product={quickProduct}
          selectedColor={selectedColors[quickProduct.id]}
          onClose={() => setQuickProduct(null)}
          onColorChange={handleColorChange}
        />
      )}

      <style jsx global>{`
        .heading { text-align:center; font-size:22px; font-weight:800; margin-bottom:12px; letter-spacing:0.6px; }

        /* carousel outer hides overflow so user can't manually horizontally scroll */
        .carousel-outer {
          width: 100%;
          max-width: 760px;
          margin: 0 auto;
          overflow: hidden;
          border-radius: 14px;
          touch-action: none; /* prevent swipe to scroll the area */
        }

        /* inner is flex and wide: each slide takes 100% width */
        .carousel-inner {
          display:flex;
          width: 100%;
          will-change: transform;
        }
        .slide {
          flex: 0 0 100%;
          display: flex;
          justify-content: center;
        }
        /* allow clone slide visually identical */
        .slide.clone { opacity: 1; }

        /* disable pointer events on inner to avoid horizontal scroll attempts */
        .carousel-inner, .slide { pointer-events: auto; }

        /* desktop: keep single-item view but center within a larger wrapper */
        @media (min-width: 900px) {
          .carousel-outer { max-width: 980px; }
          .product-tile { max-width: 520px; }
        }

        /* animation hint: small translate lift on hover */
        .product-tile { transition: transform 220ms cubic-bezier(.2,.9,.2,1); }
        .product-tile:hover { transform: translateY(-6px) scale(1.02); }

        /* small reset for body margins */
        html,body { height:100%; }
      `}</style>
    </main>
  );
}

/* Sample products (same as before) */
function sampleProducts() {
  return [
    {
      id: "8251552235717",
      title: "Full Sleeve Round Neck T-shirt",
      sku: "FSRN-01",
      price: 3965,
      url: "/products/full-sleeve-round-neck-t-shirt",
      images: [
        "//maya-theme-empower.myshopify.com/cdn/shop/files/pro_5b.webp?v=1744290362&width=1125",
        "//maya-theme-empower.myshopify.com/cdn/shop/files/pro_5c.webp?v=1744290362&width=1125"
      ],
      hoverImage: "//maya-theme-empower.myshopify.com/cdn/shop/files/pro_5c.webp?v=1744290362&width=1125",
      sizes: ["M","L","S"],
      colors: [
        { name: "Green", color: "#2b7a43", images: ["//maya-theme-empower.myshopify.com/cdn/shop/files/Green_5.webp?v=1744290362&width=1125"] },
        { name: "Purple", color: "#5a2d6d", images: ["//maya-theme-empower.myshopify.com/cdn/shop/files/Purple_5.webp?v=1744290362&width=1125"] },
        { name: "Gray", color: "#9ca3af", images: ["//maya-theme-empower.myshopify.com/cdn/shop/files/Grey_5.webp?v=1744290362&width=1125"] },
        { name: "Black", color: "#111111", images: ["//maya-theme-empower.myshopify.com/cdn/shop/files/Black_5.webp?v=1744290362&width=1125"] }
      ]
    },
    {
      id: "8251552006341",
      title: "Loose T-shirt",
      sku: "LS-02",
      price: 3154,
      url: "/products/loose-fit-t-shirt",
      images: ["//maya-theme-empower.myshopify.com/cdn/shop/files/pro_14a.webp?v=1744289524&width=1125","//maya-theme-empower.myshopify.com/cdn/shop/files/pro_14d.webp?v=1744289524&width=1125"],
      hoverImage: "//maya-theme-empower.myshopify.com/cdn/shop/files/pro_14d.webp?v=1744289524&width=1125",
      sizes: ["M","L","XL"],
      colors: [
        { name: "White", color: "#fff", images: ["//maya-theme-empower.myshopify.com/cdn/shop/files/white_14.webp?v=1744288718&width=1125"] },
        { name: "Gray", color: "#9ca3af", images: ["//maya-theme-empower.myshopify.com/cdn/shop/files/Grey_24.webp?v=1744288718&width=1125"] },
        { name: "Black", color: "#111", images: ["//maya-theme-empower.myshopify.com/cdn/shop/files/Black_38.webp?v=1744288718&width=1125"] },
        { name: "Blue", color: "#2b6cb0", images: ["//maya-theme-empower.myshopify.com/cdn/shop/files/Blue_31.webp?v=1744288718&width=1125"] }
      ]
    },
    {
      id: "8251552202949",
      title: "Polyester Women Gym Suit",
      sku: "SDZ1068",
      price: 4054,
      url: "/products/polyester-women-gym-suit",
      images: ["//maya-theme-empower.myshopify.com/cdn/shop/files/pro_17a.webp?v=1744288485&width=1126","//maya-theme-empower.myshopify.com/cdn/shop/files/pro_17c.webp?v=1744288485&width=1126"],
      hoverImage: "//maya-theme-empower.myshopify.com/cdn/shop/files/pro_17c.webp?v=1744288485&width=1126",
      sizes: ["S","M","L","XL"],
      colors: [
        { name: "Purple", color:"#6d2f6f", images:["//maya-theme-empower.myshopify.com/cdn/shop/files/Purple_29.webp?v=1744287547&width=1125"] },
        { name: "Black", color:"#111", images:["//maya-theme-empower.myshopify.com/cdn/shop/files/Black_17.webp?v=1744287548&width=1125"] },
        { name: "Green", color:"#2b7a43", images:["//maya-theme-empower.myshopify.com/cdn/shop/files/Green17.webp?v=1744287546&width=1125"] },
        { name: "Maroon", color:"#6b1f1f", images:["//maya-theme-empower.myshopify.com/cdn/shop/files/Mehroon_17.webp?v=1744287546&width=1125"] }
      ]
    },
    {
      id: "8251552432325",
      title: "Sleeveless Crop Top",
      sku: "CROP-11",
      price: 6036,
      url: "/products/ribbed-fitted-sleeveless-crop-top",
      images: ["//maya-theme-empower.myshopify.com/cdn/shop/files/pro_11a.webp?v=1744289298&width=1125","//maya-theme-empower.myshopify.com/cdn/shop/files/pro_11b.webp?v=1744289298&width=1125"],
      hoverImage: "//maya-theme-empower.myshopify.com/cdn/shop/files/pro_11b.webp?v=1744289298&width=1125",
      sizes: ["S","M","L"],
      colors: [
        { name: "Orange", color:"#f97316", images:["//maya-theme-empower.myshopify.com/cdn/shop/files/Orange_11.webp?v=1744289298&width=1125"] },
        { name: "White", color:"#fff", images:["//maya-theme-empower.myshopify.com/cdn/shop/files/White_11.webp?v=1744289298&width=1125"] },
        { name: "Purple", color:"#6d2f6f", images:["//maya-theme-empower.myshopify.com/cdn/shop/files/Purple_26.webp?v=1744289298&width=1125"] }
      ]
    },
    {
      id: "8251552137413",
      title: "Racer Back Sports top",
      sku: "RB-18",
      price: 1352,
      url: "/products/racer-back-sports-bra",
      images: ["//maya-theme-empower.myshopify.com/cdn/shop/files/pro_18a.webp?v=1744288595&width=1125","//maya-theme-empower.myshopify.com/cdn/shop/files/pro_18c.webp?v=1744288595&width=1125"],
      hoverImage: "//maya-theme-empower.myshopify.com/cdn/shop/files/pro_18c.webp?v=1744288595&width=1125",
      sizes: ["S","M","L"],
      colors: [
        { name: "White", color:"#fff", images:["//maya-theme-empower.myshopify.com/cdn/shop/files/White_18.webp?v=1744288595&width=1125"] },
        { name: "Black", color:"#111", images:["//maya-theme-empower.myshopify.com/cdn/shop/files/Black_36.webp?v=1744288595&width=1125"] },
        { name: "Maroon", color:"#6b1f1f", images:["//maya-theme-empower.myshopify.com/cdn/shop/files/mehroon_19.webp?v=1744288595&width=1125"] }
      ]
    },
    {
      id: "8251552366789",
      title: "Skirt set 3 pcs set",
      sku: "SK-10",
      price: 4955,
      url: "/products/skirt-set-3-pcs-set-with-jacket",
      images: ["//maya-theme-empower.myshopify.com/cdn/shop/files/pro_10a.webp?v=1744289376&width=1125","//maya-theme-empower.myshopify.com/cdn/shop/files/pro_10c.webp?v=1744289376&width=1125"],
      hoverImage: "//maya-theme-empower.myshopify.com/cdn/shop/files/pro_10c.webp?v=1744289376&width=1125",
      sizes: ["S","M","L"],
      colors: [
        { name: "Black", color:"#111", images:["//maya-theme-empower.myshopify.com/cdn/shop/files/Black_26.webp?v=1744288719&width=1125"] },
        { name: "Brown", color:"#6b3e2d", images:["//maya-theme-empower.myshopify.com/cdn/shop/files/Brown_10.webp?v=1744288719&width=1125"] }
      ]
    },
    {
      id: "8251551908037",
      title: "Crop top co-ord set",
      sku: "CT-01",
      price: 2703,
      url: "/products/crop-top-co-ord-set",
      images: ["//maya-theme-empower.myshopify.com/cdn/shop/files/pro_1a.webp?v=1744290608&width=1125","//maya-theme-empower.myshopify.com/cdn/shop/files/pro_1d.webp?v=1744290608&width=1125"],
      hoverImage: "//maya-theme-empower.myshopify.com/cdn/shop/files/pro_1d.webp?v=1744290608&width=1125",
      sizes: ["S","M","L"],
      colors: [
        { name: "Black", color:"#111", images:["//maya-theme-empower.myshopify.com/cdn/shop/files/Black_1.webp?v=1744289749&width=1125"] },
        { name: "Maroon", color:"#6b1f1f", images:["//maya-theme-empower.myshopify.com/cdn/shop/files/Mehroon_1.webp?v=1744289749&width=1125"] }
      ]
    },
    {
      id: "8251552596165",
      title: "Cotton Cropped Trucker Shirt",
      sku: "CT-09",
      price: 2253,
      url: "/products/cotton-cropped-trucker-shirt",
      images: ["//maya-theme-empower.myshopify.com/cdn/shop/files/pro_9a.webp?v=1744289223&width=1126","//maya-theme-empower.myshopify.com/cdn/shop/files/pro_9b.webp?v=1744289223&width=1126"],
      hoverImage: "//maya-theme-empower.myshopify.com/cdn/shop/files/pro_9b.webp?v=1744289223&width=1126",
      sizes: ["S","M","L"],
      colors: [
        { name: "White", color:"#fff", images:["//maya-theme-empower.myshopify.com/cdn/shop/files/white_9.webp?v=1744288719&width=1125"] },
        { name: "Purple", color:"#7c2d6d", images:["//maya-theme-empower.myshopify.com/cdn/shop/files/Pink_9.webp?v=1744288719&width=1125"] }
      ]
    }
  ];
}