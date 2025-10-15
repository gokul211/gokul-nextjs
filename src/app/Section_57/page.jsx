"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import { V285 } from "./V285";
import { V284 } from "./V284";





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
    
      <div id="V285" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_57 - V285</label>
      <V285 />
      </div>

        <div id="V284" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_57 - V284</label>
      <V284 />
      </div>
    
    
             
    </div>
  );
}