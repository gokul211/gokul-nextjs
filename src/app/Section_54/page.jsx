"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V161 from "./V161";
import V159 from "./V159";
import V215 from "./V215";
import V214 from "./V214";





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
    
            <div id="V161" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_54 - V161</label>
      <V161 />
      </div>

       <div id="V159" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_54 - V159</label>
        <V159 />
      </div>
   <div id="V215" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_54 - V215</label>
        <V215 />
      </div>
      <div id="V214" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_54 - V214</label>
        <V214 />
      </div>
 
             
    </div>
  );
}