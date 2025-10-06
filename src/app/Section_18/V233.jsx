import React, { useEffect, useState } from "react";

/*
  Single-file "Trending Products" page.
  - Visuals styled to match the uploaded image: rounded light-gray media panel (with model photo),
    title under the panel and price under the title (centered).
  - Behavior preserved: hover-image on media area, swatches revealed when hovering the lower info area,
    clicking swatches updates the tile image immediately, Quick View keeps in sync.
*/

function formatPrice(n) {
  // Format as Indian rupee style with two decimals, e.g. 396,400.00
  return n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function ProductCard({ product, selectedColor, onColorChange, onQuickView }) {
  const mainImage = selectedColor?.images?.[0] || product.images[0];
  const hoverImage = product.hoverImage || product.images[1] || product.images[0];

  return (
    <div
      className="product-tile w-56 lg:w-64 bg-transparent rounded-xl p-2 flex-shrink-0 relative focus-within:z-40"
      style={{ perspective: 1000 }}
      tabIndex={-1}
    >
      {/* MEDIA PANEL */}
      <div className="relative overflow-hidden rounded-2xl bg-gray-100 flex items-center justify-center" style={{ padding: "18px" }}>
        <a href={product.url} className="block w-full" onClick={(e) => e.preventDefault()}>
          <div className="media-stack relative" style={{ paddingTop: "124%", borderRadius: 16, overflow: "hidden" }}>
            <img
              src={mainImage}
              alt={`${product.title} - ${selectedColor?.name || "default"}`}
              className="absolute top-0 left-0 w-full h-full object-cover primary-image"
            />
            <img
              src={hoverImage}
              alt="hover"
              className="product-image-secondary absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
        </a>

        <button
          className="quick-view-btn absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 rounded-full p-2 shadow-md"
          onClick={() => onQuickView(product)}
          aria-label="Quick View"
          title="Quick View"
        >
          <span className="text-xs font-semibold">QUICK VIEW</span>
        </button>
      </div>

      {/* LOWER INFO AREA */}
      <div className="text-center mt-3 product-info">
        <a href={product.url} className="block text-sm font-semibold text-gray-900" onClick={(e) => e.preventDefault()}>
          {product.title}
        </a>
        <div className="text-xs text-gray-600 mt-1">Rs. {formatPrice(product.price)}</div>

        <div
          className="swatches-container mt-2 flex items-center justify-center gap-2 opacity-0 transform translate-y-2 transition-all duration-200"
          // visibility controlled by CSS below when .product-info hovered/focused
        >
          {product.colors.map((c) => (
            <button
              key={c.name}
              onClick={() => onColorChange(product.id, c)}
              className={`w-6 h-6 rounded-sm border inline-flex items-center justify-center cursor-pointer focus:outline-none ${
                selectedColor?.name === c.name ? "ring-2 ring-black" : "border-gray-200"
              }`}
              title={c.name}
              aria-label={`Select color ${c.name}`}
              style={{ backgroundColor: c.color }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .swatches-container { pointer-events: none; }
        .product-info:hover .swatches-container,
        .product-info:focus-within .swatches-container {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        /* small tweak so quick view doesn't overlap badly on smaller tiles */
        .quick-view-btn { transition: opacity 180ms ease, transform 180ms ease; opacity: 0; transform: translateY(6px); }
        .product-tile:hover .quick-view-btn { opacity: 1; transform: translateY(0); }

        .media-stack img { display:block; width:100%; height:100%; object-fit:cover; }
        .product-image-secondary { opacity:0; transform:scale(0.99); transition:opacity 240ms, transform 240ms; }
        .media-stack:hover .product-image-secondary { opacity:1; transform:scale(1); }
      `}</style>
    </div>
  );
}

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
  const stopPropagation = (e) => e.stopPropagation();

  function handleColorSelect(c) {
    setLocalColor(c);
    setActiveImage(0);
    onColorChange(product.id, c);
  }

  return (
    <div
      /* On small screens we place the modal content lower (items-start) with some top padding so it doesn't stick to top.
         On md+ screens it is centered again (md:items-center). This avoids the image being cut off at the top on small screens. */
      className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/50 p-4 md:pt-0 pt-12"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white w-full max-w-6xl rounded-xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-auto"
        onClick={stopPropagation}
      >
        <div className="p-4">
          <div className="rounded-lg overflow-hidden bg-gray-100">
            {/* Make image use viewport-based max height and contain to avoid cropping */}
            <img
              src={colorImages[activeImage]}
              className="w-full" 
              style={{ maxHeight: "60vh", width: "100%", objectFit: "contain" }}
              alt={product.title}
            />
          </div>

          <div className="flex gap-2 mt-3">
            {colorImages.map((im, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-20 h-20 rounded-md overflow-hidden border ${i === activeImage ? "thumb-active" : "border-gray-200"}`}
                aria-label={`Thumbnail ${i + 1}`}
              >
                <img src={im} className="w-full h-full object-cover" alt={`thumb-${i}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <div className="text-sm text-gray-500 mt-1">{product.sku}</div>
            <div className="text-3xl font-semibold mt-4">Rs. {formatPrice(product.price)}</div>
            <div className="border-t mt-4 pt-4">
              <div className="flex items-center gap-2">
                <span className="inline-block text-sm font-medium">COLOR :</span>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => handleColorSelect(c)}
                      className={`w-8 h-8 rounded-sm border ${localColor?.name === c.name ? "ring-2 ring-black" : ""}`}
                      title={c.name}
                      style={{ backgroundColor: c.color }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm font-medium mb-2">SIZE : <span className="font-semibold">{selectedSize}</span></div>
                <div className="flex gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1 border rounded ${selectedSize === s ? "bg-black text-white" : "bg-white"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm font-medium mb-2">Quantity</div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-1 border rounded">−</button>
                  <div className="px-4 py-1 border rounded">{qty}</div>
                  <button onClick={() => setQty(qty + 1)} className="px-3 py-1 border rounded">+</button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button className="flex-1 bg-black text-white py-3 rounded-full font-semibold">Add to cart</button>
            <button className="flex-1 border py-3 rounded-full font-semibold">Buy it now</button>
            <button onClick={onClose} className="px-4 py-3 border rounded-full">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Page: V233 */
export default function V233() {
  const [products] = useState(sampleProducts());
  const [selectedColors, setSelectedColors] = useState({});
  const [quickProduct, setQuickProduct] = useState(null);

  useEffect(() => {
    const map = {};
    products.forEach((p) => {
      map[p.id] = p.colors?.[0] || null;
    });
    setSelectedColors(map);
  }, [products]);

  useEffect(() => {
    const el = document.getElementById("trending-section");
    if (el) el.classList.add("fade-in-up");
  }, []);

  function handleColorChange(productId, colorObj) {
    setSelectedColors((s) => ({ ...s, [productId]: colorObj }));
  }

  return (
    <main className="min-h-screen bg-white p-8">
      <section id="trending-section" className="max-w-8xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-6 tracking-tight">TRENDING PRODUCTS</h2>

        <div className="carousel-viewport overflow-x-auto no-scrollbar py-6">
          <div className="flex gap-6 px-4 items-start">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                selectedColor={selectedColors[p.id]}
                onColorChange={handleColorChange}
                onQuickView={(product) => setQuickProduct(product)}
              />
            ))}
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
        .carousel-viewport { perspective: 1200px; -webkit-perspective: 1200px; }
        .product-tile { transform-style: preserve-3d; transition: transform 280ms cubic-bezier(.2,.9,.2,1), opacity 280ms; }
        .product-tile:hover { transform: translateY(-6px) scale(1.02); z-index: 30; box-shadow: 0 20px 40px rgba(0,0,0,0.08); }

        .media-stack { border-radius: 14px; overflow: hidden; background: #f5f5f6; }
        .media-stack img { display:block; width:100%; height:100%; object-fit:cover; }

        .product-image-secondary { opacity:0; transform:scale(0.99); transition:opacity 240ms, transform 240ms; }
        .media-stack:hover .product-image-secondary { opacity:1; transform:scale(1); }

        .thumb-active { outline: 2px solid #111; box-shadow: 0 0 0 3px rgba(0,0,0,0.06); }

        .fade-in-up { opacity:0; transform: translateY(12px); animation: fadeUp 600ms forwards; }
        @keyframes fadeUp { to { opacity:1; transform: translateY(0); } }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .product-tile, .primary-image { backface-visibility: hidden; }
        button:focus { outline: 3px solid rgba(0,0,0,0.12); outline-offset: 2px; }

        /* Match the uploaded image spacing: ensure many tiles visible on wide screens */
        @media (min-width: 1280px) {
          .carousel-viewport .flex > :global(.product-tile) { width: 16rem; }
        }
      `}</style>
    </main>
  );
}

/* Sample products (unchanged) */
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
      hoverImage: "//maya-theme-empower.myshopify.myshopify.com/cdn/shop/files/pro_18c.webp?v=1744288595&width=1125",
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