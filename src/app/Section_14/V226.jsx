"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function V226() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#061903] text-white py-12 px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Left Section */}
        <div className="flex flex-col space-y-4 md:w-1/3">
          <a href="/" className="inline-block">
            <img
              src="https://cdn.prod.website-files.com/66ae6d5d335aaf4dfce34142/66b50b6f5aa3ae6e80a0c19e_Frame%201034.avif"
              alt="Tigris Logo"
              className="w-36"
            />
          </a>
          <p className="text-sm text-left">
            Energize your life, the Tigris way
          </p>
          <div className="flex space-x-4 pt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              className="p-2 border rounded-full hover:text-green-400 transition"
            >
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="p-2 border rounded-full hover:text-green-400 transition"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="p-2 border rounded-full hover:text-green-400 transition"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="grid grid-cols-3 gap-6 text-left text-sm">
          {[
            { title: "Pages", links: ["Home", "Flavors", "Contact"] },
            {
              title: "CMS",
              links: ["Product Page", "Product Categories", "Mixes"],
            },
            {
              title: "Admin",
              links: ["Style Guide", "Licenses", "Changelog"],
            },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="font-bold text-xl uppercase mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link, j) => (
                  <li key={j} className="relative">
                    <a
                      href="#"
                      className="hover:text-green-400 transition relative inline-block"
                    >
                      {link}
                      {/* Underline Animation */}
                      <span
                        className={`absolute left-0 -bottom-0.5 h-[2px] bg-red-100 transition-all duration-700 ease-out ${
                          isVisible ? "w-full" : "w-0"
                        }`}
                      ></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row justify-between text-xs text-gray-400">
        <a
          href=""
          className="hover:text-green-400 text-white transition"
        >
          Powered by Webflow
        </a>
        <a
          href=""
          className="hover:text-green-400 text-white transition"
        >
          Created by Silv Studio
        </a>
      </div>
    </section>
  );
}
