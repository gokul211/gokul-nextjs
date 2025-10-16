"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V150 from "./V150";
import V149 from "./V149";
import V176 from "./V176";
import V175 from "./V175";
import V223 from "./V223";
import V221 from "./V221";
import V299 from "./V299";
import V298 from "./V298";




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
         <div id="V175" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_53 - V175</label>
      <V175 />
      </div>
         <div id="V176" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_53 - V176</label>
      <V176 />
      </div>
        <div id="V223" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_53 - V223</label>
        <V223 />
      </div>
         <div id="V221" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_53 - V221</label>
        <V221 />
      </div>
  <div id="V299" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_53 - V299</label>
        <V299 />
      </div>
              <div id="V298" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_53 - V298</label>
        <V298 />
      </div>
    </div>
  );
}