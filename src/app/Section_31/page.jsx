"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V58 from "./V58";
import V57 from "./V57";



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
    
            <div id="V58" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_31 - V58</label>
      <V58 />
      </div>
       <div id="V57" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_31 - V57</label>
      <V57 />
      </div>
             
    </div>
  );
}