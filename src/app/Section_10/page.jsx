"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V332 from "./V332";
import V331 from "./V331";






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
    
      <div id="V332" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_10 - V332</label>
      <V332 />
      </div>

     <div id="V331" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_10 - V331</label>
      <V331 />
      </div>

    
             
    </div>
  );
}