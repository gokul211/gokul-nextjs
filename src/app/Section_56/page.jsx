"use client"
import Image from "next/image";
import React,{useEffect,useState} from "react";
// import V253 from "./V253";
// import V254 from "./V254";
// import V271 from "./V271";
// import V270 from "./V270";
// import V307 from "./V307";
// import V306 from "./V306";
import V308 from "./V308";
import V309 from "./V309";
import V310 from "./V310";
import V311 from "./V311";
import V312 from "./V312";





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
    
            {/* <div id="V253" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_18 - V253</label>
      <V253 />
      </div>
      
      <div id="V254" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_18 - V254</label>
      <V254 />
      </div> */}
    {/* <div id="V271" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_56 - V271</label>
      <V271 />
      </div>
      <div id="V270" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_56 - V270</label>
      <V270 />
      </div> */}
                {/* <div id="V307" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_56 - V307</label>
      <V307 />
      </div>

          <div id="V306" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_56 - V306</label>
      <V306 />
      </div> */}
      
          <div id="V308" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_56 - V308</label>
      <V308 />
      </div>

         <div id="V309" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_56 - V309</label>
      <V309 />
      </div>

      <div id="V310" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_56 - V310</label>
      <V310 />
      </div>

      <div id="V311" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_56 - V311</label>
      <V311 />
      </div>

       <div id="V312" style={{ padding: "50px 0" ,textAlign:'center',fontWeight:'bold'}}>
        <label>Section_56 - V312</label>
      <V312 />
      </div>
    </div>
  );
}