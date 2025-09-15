// page.jsx
"use client"
import Image from "next/image";
import React, { useEffect } from "react";
import V21 from "./V21";
import V30 from "./V30";
import V52 from "./V52";
import V49 from "./V49";

export default function Section_7() {
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
      <div id="V21" className="hidden md:block" style={{ padding: "50px 0", textAlign: 'center', fontWeight: 'bold' }}>
        <label>Section_7 - V21</label>
        <V21 />
      </div>

      <div id="V30" className="hidden md:block" style={{ padding: "50px 0", textAlign: 'center', fontWeight: 'bold' }}>
        <label>Section_7 - V30</label>
        <V30 />
      </div>

      <div id="V52" className="hidden md:block" style={{ padding: "50px 0", textAlign: 'center', fontWeight: 'bold' }}>
        <label>Section_7 - V52</label>
        <V52 />
      </div>

      {/* Mobile-only section: V49 should be visible on small screens */}
      <div id="V49" className="block md:hidden" style={{ padding: "30px 0", textAlign: 'center', fontWeight: 'bold' }}>
        <label>Section_7 - V49</label>
        <V49 />
      </div>
    </div>
  );
}