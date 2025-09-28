"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V154 from "./V154";
import V153 from "./V153";
import V211 from "./V211";
import V210 from "./V210";
import V225 from "./V225";
import V224 from "./V224";




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
  
    <div id="V211" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_19 - V211</label>
      <V211 />
      </div>
      
   <div id="V210" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_19 - V210</label>
      <V210 />
      </div> 
       <div id="V225" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_19 - V225</label>
      <V225 />
      </div> 
        
    <div id="V224" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_19 - V224</label>
      <V224 />
      </div> 
             
    </div>
  );
}