"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V233 from "./V233";
import V232 from "./V232";





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
    
            <div id="V233" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_18 - V233</label>
      <V233 />
      </div>
      
      <div id="V232" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_18 - V232</label>
      <V232 />
      </div>
    
             
    </div>
  );
}