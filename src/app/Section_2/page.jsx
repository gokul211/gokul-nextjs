"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V5 from "./V5";

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
     <div id="V5" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_2 - V5</label>
      <V5 />
      </div>
    </div>
  );
}