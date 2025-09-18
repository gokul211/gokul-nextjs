"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V154 from "./V154";
import V153 from "./V153";




export default function Section_19() {
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
    
            <div id="V154" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_19 - V154</label>
      <V154 />
      </div>
          <div id="V153" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_19 - V153</label>
      <V153 />
      </div>
  
  
        
    
             
    </div>
  );
}