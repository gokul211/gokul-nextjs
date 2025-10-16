"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
import V41 from "./V41";
import V178 from "./V178";
import V177 from "./V177";
import V219 from "./V219";
import V218 from "./V218";
import V227 from "./V227";
import V226 from "./V226";
import V303 from "./V303";
import V302 from "./V302";



export default function Section_14() {
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
    
            <div id="V41" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_14 - V41</label>
      <V41 />
      </div>
            <div id="V178" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_14 - V178</label>
      <V178 />
      </div>
            <div id="V177" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_14 - V177</label>
      <V177 />
      </div>
            <div id="V219" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_14 - V219</label>
      <V219 />
      </div>
            <div id="V218" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_14 - V218</label>
      <V218 />
      </div>
          <div id="V227" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_14 - V227</label>
      <V227 />
      </div>
          <div id="V226" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_14 - V226</label>
      <V226 />
      </div>
       <div id="V303" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_14 - V303</label>
      <V303 />
      </div>
    <div id="V302" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_14 - V302</label>
      <V302 />
      </div>
<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
    </div>
  );
}