"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V317 from "./V317";
import V316 from "./V316";







export default function Section_6() {
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
    
            <div id="V317" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_6 - V317</label>
      <V317 />
      </div>
    
              <div id="V316" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_6 - V316</label>
      <V316 />
      </div>
    </div>
  );
}