"use client";
import React from "react";
import { FaFacebook, FaYoutube, FaInstagram, FaPinterest, FaTiktok } from "react-icons/fa";

export default function V24() {
  const footerLinks = {
    Discover: [
      "Lorem Ipsum",
      "Dolor Sit",
      "Amet Consectetur",
      "Adipiscing Elit",
      "Sed Do",
      "Eiusmod Tempor",
      "Incididunt Ut",
      "Labore Et",
    ],
    "License & Terms": [
      "Magna Aliqua",
      "Ut Enim",
      "Ad Minim",
      "Veniam Quis",
      "Nostrud Exercitation",
      "Ullamco Laboris",
      "Nisi Ut",
      "Aliquip Ex",
    ],
    Resources: [
      "Ea Commodo",
      "Consequat Duis",
      "Aute Irure",
      "Dolor In",
      "Reprehenderit In",
      "Voluptate Velit",
      "Esse Cillum",
    ],
  };

  return (
    <footer className="bg-black text-white px-6 py-10">
      {/* --- TOP SECTION --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8">

        {/* Column 1 (Social + Email) */}
        <div className="text-center">
          {/* Social Icons */}
          <div className="flex justify-center gap-4 text-2xl mb-6">
            <a href="#" className="hover:text-gray-400"><FaTiktok /></a>
            <a href="#" className="hover:text-gray-400"><FaFacebook /></a>
            <a href="#" className="hover:text-gray-400"><FaYoutube /></a>
            <a href="#" className="hover:text-gray-400"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-400"><FaPinterest /></a>
            {/* Custom X */}
            <a href="#" className="hover:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                   className="w-6 h-6">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H17.17l-5.214-6.822L5.99
                21.75H2.68l7.73-8.835L2.25 2.25h7.08l4.713 6.231 4.2-6.231zM17.22
                19.59h1.833L7.08 4.32H5.112L17.22 19.59z" />
              </svg>
            </a>
          </div>

          {/* Newsletter */}
          <p className="mb-3 font-semibold text-lg">Subscribe for updates</p>
          <div className="flex max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 border border-white bg-black text-white rounded-l focus:outline-none"
            />
            <button className="px-4 bg-white text-black font-bold rounded-r">➤</button>
          </div>
          <p className="text-xs mt-2 text-gray-300">
            Unsubscribe any time. <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>

        {/* Column 2–4 (Links) */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-semibold mb-3 text-lg underline text-center">{title}</h4> {/* Centered title */}
            <ul className="space-y-2 list-disc list-inside text-left mx-auto max-w-xs"> {/* Left-aligned, dotted list */}
              {links.map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:text-gray-400 hover:underline hover:decoration-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* --- DIVIDER --- */}
      <div className="border-t border-gray-600 my-8"></div>

      {/* --- BOTTOM SECTION --- */}
      <div className="max-w-7xl mx-auto flex flex-col justify-center items-center text-sm gap-6">

        {/* Left: Certification + Links */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">©</span>
            <span>Certified B Corporation</span>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#" className="hover:text-gray-400 hover:underline hover:decoration-white">Lorem Market</a>
            <a href="#" className="hover:text-gray-400 hover:underline hover:decoration-white">Lorem Tuts+</a>
            <a href="#" className="hover:text-gray-400 hover:underline hover:decoration-white">Placeit Ipsum</a>
            <a href="#" className="hover:text-gray-400 hover:underline hover:decoration-white">Mixkit Dolor</a>
            <a href="#" className="hover:text-gray-400 hover:underline hover:decoration-white">All Products</a>
            <a href="#" className="hover:text-gray-400 hover:underline hover:decoration-white">Sitemap</a>
          </div>
        </div>

        {/* Right: Language Selector */}
        <div>
          <select className="bg-black border border-white px-3 py-1 rounded text-white">
            <option>English</option>
            <option>Spanish</option>
          </select>
        </div>
      </div>
    </footer>
  );
}