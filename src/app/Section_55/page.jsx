"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V197 from "./V197";
import V201 from "./V201";
import V207 from "./V207";
// import V200 from "./V200";
// import V196 from "./V196";






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
    
            <div id="V197" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_55 - V197</label>
      <V197 />
      </div>
     {/* <div id="V196" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_55 - V196</label>
      <V196 />
      </div> */}
          <div id="V201" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_55 - V201</label>
      <V201 />
      </div>
       {/* <div id="V200" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_55 - V200</label>
      <V200 />
      </div> */}
        <div id="V207" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_55 - V207</label>
      <V207 />
      </div>
    
             
    </div>
  );
}