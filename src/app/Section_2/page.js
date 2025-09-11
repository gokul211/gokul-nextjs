"use client";

import { useEffect } from "react";
import Section2ID1 from "./components/Section2ID1";

export default function Section_2() {
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
    <div>
      <div id="1" style={{ padding: "50px 0" }}>
        <label>Section ID 1</label>
        <Section2ID1 />
      </div>
      <div id="2" style={{ padding: "50px 0" }}>
        <label>Section ID 2</label>
        <Section2ID1 />
      </div>
       <div id="5" style={{ padding: "50px 0" }}>
        <label>Section ID 3</label>
        <Section2ID1 />
      </div>
    </div>
  );
}
