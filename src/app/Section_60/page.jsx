"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V339 from "./V339";
import V338 from "./V338";
import V341 from "./V341";
import V340 from "./V340";







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

      <div id="V339" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_60 - V339</label>
      <V339 />
      </div>
  <div id="V338" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_60 - V338</label>
      <V338 />
      </div>
  <div id="V341" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_60 - V341</label>
      <V341 />
      </div>
             <div id="V340" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_60 - V340</label>
      <V340 />
      
      </div> 
    </div>
  );
}