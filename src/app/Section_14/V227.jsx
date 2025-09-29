"use client";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function V227() {
  return (
    <section className="bg-[#061903] text-white py-12 px-6">
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
          <p className="text-sm text-left">Energize your life, the Tigris way</p>
          <div className="flex space-x-4 pt-2">
            {/* Social Icons */}
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
          <div>
            <h4 className="font-bold text-xl underline uppercase mb-3">Pages</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-green-400 transition">Home</a></li>
              <li><a href="/flavors" className="hover:text-green-400 transition">Flavors</a></li>
              <li><a href="/contact" className="hover:text-green-400 transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xl underline uppercase mb-3">CMS</h4>
            <ul className="space-y-2">
              <li><a href="" className="hover:text-green-400 transition">Product Page</a></li>
              <li><a href="" className="hover:text-green-400 transition">Product Categories</a></li>
              <li><a href="" className="hover:text-green-400 transition">Mixes</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xl underline uppercase mb-3">Admin</h4>
            <ul className="space-y-2">
              <li><a href="/admin/style-guide" className="hover:text-green-400 transition">Style Guide</a></li>
              <li><a href="/admin/licenses" className="hover:text-green-400 transition">Licenses</a></li>
              <li><a href="/admin/changelog" className="hover:text-green-400 transition">Changelog</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white-50 mt-10 pt-6 flex flex-col md:flex-row justify-between text-xs text-gray-400">
        <a href="" className="hover:text-green-400 text-white transition">
          Powered by Webflow
        </a>
        <a href="" className="hover:text-green-400 text-white transition">
          Created by Silv Studio
        </a>
      </div>
    </section>
  );
}
