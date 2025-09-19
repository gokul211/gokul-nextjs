"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V41 from "./V41";
import V178 from "./V178";
import V177 from "./V177";



export default function Section_14() {
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
    
            <div id="V41" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_14 - V41</label>
      <V41 />
      </div>
            <div id="V178" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_14 - V178</label>
      <V178 />
      </div>
            <div id="V177" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_14 - V177</label>
      <V177 />
      </div>
    </div>
  );
}