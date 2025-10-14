"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import { V281 } from "./V281";
import { V280 } from "./V280";

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
    
            <div id="V281" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_8 - V281</label>
      <V281 />
      </div>
      <div id="V280" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_8 - V280</label>
      <V280 />
      </div>
   
    
             
    </div>
  );
}