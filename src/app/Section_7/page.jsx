"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V21 from "./V21";
import V30 from "./V30";



export default function Section_7() {
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
     <div id="V21"  className="hidden md:block "style={{ padding: "50px 0",textAlign:'center',fontWeight:'bold'}}>
        <label>Section_7 - V21</label>
        <br></br>        <br></br>

      <V21 />
      </div>
   <div id="V21"  className="hidden md:block "style={{ padding: "50px 0",textAlign:'center',fontWeight:'bold'}}>
        <label>Section_7 - V21</label>
        <br></br>        <br></br>

      <V30 />
      </div>
    </div>
  );
}