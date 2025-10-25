"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V334 from "./V334";
import V333 from "./V333";







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
    
            <div id="V334" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_15 - V334</label>
      <V334 />
      </div>
   
          <div id="V333" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_15 - V333</label>
      <V333 />
      </div>
             
    </div>
  );
}