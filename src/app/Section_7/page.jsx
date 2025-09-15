"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

/**
 * Dynamically import client components to avoid SSR evaluation issues.
 * Ensure each component file (V21, V30, V52, V49) has a proper:
 *   export default function ComponentName() { return (...) }
 */
const V21 = dynamic(() => import("./V21"), { ssr: false });
const V30 = dynamic(() => import("./V30"), { ssr: false });
const V52 = dynamic(() => import("./V52"), { ssr: false });
const V49 = dynamic(() => import("./V49"), { ssr: false });

export default function Section_7() {
  // Optional: show mobile preview on desktop for testing (set true to always show)
  const [showMobilePreviewOnDesktop] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div id="section1-container">
      {/* Desktop / md+ sections */}
      <div
        id="V21"
        className="hidden md:block"
        style={{ padding: "50px 0", textAlign: "center", fontWeight: "bold" }}
      >
        <label>Section_7 - V21</label>
        <V21 />
      </div>

      <div
        id="V30"
        className="hidden md:block"
        style={{ padding: "50px 0", textAlign: "center", fontWeight: "bold" }}
      >
        <label>Section_7 - V30</label>
        <V30 />
      </div>

      <div
        id="V52"
        className="hidden md:block"
        style={{ padding: "50px 0", textAlign: "center", fontWeight: "bold" }}
      >
        <label>Section_7 - V52</label>
        <V52 />
      </div>

      {/* Mobile-only section: V49 visible on small screens */}
      {/* If you want the mobile output visible while testing on desktop, set showMobilePreviewOnDesktop = true */}
      <div
        id="V49"
        className={showMobilePreviewOnDesktop ? "block" : "block md:hidden"}
        style={{ padding: "30px 0", textAlign: "center", fontWeight: "bold" }}
      >
        <label>Section_7 - V49</label>
        <V49 />
      </div>
    </div>
  );
}