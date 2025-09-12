"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V21 from "./V21";
import V24 from "./V24";



export default function Section_2() {
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
        <label>Section_2 - V21</label>
        <br></br>        <br></br>

      <V21 />
      </div>
        <div id="V24" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_2 - V24</label>
        <br></br>        <br></br>

      <V24 />
      {/* <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/> */}
      </div>
       
    </div>
  );
}