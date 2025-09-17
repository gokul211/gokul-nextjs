"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V145 from "./V145";
import V146 from "./V146";





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
    
            <div id="V146" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_16 - V146</label>
      <V146 />
      </div>
         <div id="V145" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_16 - V145</label>
       <V145 />
      </div>
    
             
    </div>
  );
}