"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import Doc from "./Doc";
// import V321 from "./V321";
// import V320 from "./V320";






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
    
      {/* <div id="V321" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_57 - V321</label>
      <V321 />
      </div> */}
{/* 
          <div id="V320" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_57 - V320</label>
      <V320 />
      </div> */}
<div id="V321" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        {/* <label>Section_57 - V321</label> */}
      <Doc />
      </div>
             
    </div>
  );
}