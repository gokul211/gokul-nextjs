"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V24 from "./V24";
import V34 from "./V34";


export default function Section_9() {
  const titleText = "Moon Light";
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
    
            <div id="V24" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_9 - V24</label>
      <V24 />
      </div>
              <div id="V24" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_9 - V34</label>
      <V34 />
      </div>
    </div>
  );
}