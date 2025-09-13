"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V36 from "./V36";



export default function Section_13() {
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
    
            <div id="V36" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_13 - V36</label>
      <V36 />
      </div>
          
    </div>
  );
}