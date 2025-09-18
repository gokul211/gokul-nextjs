"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V150 from "./V150";
import V149 from "./V149";



export default function Section_53() {
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
    
            <div id="V150" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_53 - V150</label>
      <V150 />
      </div>
         <div id="V149" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_53 - V149</label>
      <V149 />
      </div>
        
    
             
    </div>
  );
}