"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V253 from "./V253";
import V254 from "./V254";





export default function Section_18() {
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
    
            <div id="V253" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_18 - V253</label>
      <V253 />
      </div>
      
      <div id="V254" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_18 - V254</label>
      <V254 />
      </div>
    
             
    </div>
  );
}