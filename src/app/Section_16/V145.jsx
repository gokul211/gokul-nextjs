"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaSearch, FaShoppingCart, FaBars, FaTimes, FaPlus } from "react-icons/fa";

export default function V145() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const menus = [
    { name: "Home", links: ["/index.html", "/index-2.html", "/index-3.html"] },
    { name: "About Us", links: ["/about.html", "/about-2.html"] },
    { name: "Shop", links: ["/shop.html", "/shop-right-sidebar.html", "/shop-list.html", "/shop-details.html"] },
    { name: "Pages", links: ["/chef.html", "/menu.html", "/services.html", "/gallery.html", "/faq.html"] },
    { name: "Blog", links: ["/blog.html", "/blog-standard.html", "/blog-details.html"] },
    { name: "Contact", links: ["/contact.html", "/contact2.html"] },
  ];

  return (
    <header className="bg-[#010d17] text-white px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div style={{backgroundColor:"white",padding:"10px",borderRadius:"20px"}}>
      <Link href="/">
        <img src="https://gramentheme.com/html/fresheat/assets/img/logo/logo.svg" alt="logo" className="h-10" />
      </Link>
      </div>

      {/* Right side icons */}
      <div className="flex items-center gap-4">
        <FaSearch className="hover:text-red-500 cursor-pointer" />
        <div className="relative cursor-pointer">
          <FaShoppingCart className="hover:text-red-500" />
          <span className="absolute -top-2 -right-2 bg-orange-500 text-xs px-1 rounded-full">3</span>
        </div>
        <button onClick={() => setIsOpen(true)}>
          <FaBars className="hover:text-red-500 cursor-pointer text-xl" />
        </button>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white text-black shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <img src="/assets/img/logo/logo.svg" alt="logo" className="h-10" />
          <button onClick={() => setIsOpen(false)}>
            <FaTimes className="text-xl text-black" />
          </button>
        </div>

        {/* Sidebar Menu Items */}
        <ul className="flex flex-col text-left">
          {menus.map((menu, index) => (
            <li key={index} className="border-b">
              <button
                onClick={() => toggleMenu(menu.name)}
                className="flex justify-between items-center w-full px-4 py-3 text-left bg-white text-black hover:bg-[#EB0029] hover:text-white"
              >
                {menu.name}
                <FaPlus className="text-xs" />
              </button>

              {/* Dropdown */}
              {activeMenu === menu.name && (
                <ul className="bg-white">
                  {menu.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link}
                        className="block px-8 py-2 text-sm bg-white text-black hover:bg-[#EB0029] hover:text-white"
                      >
                        {link.replace("/", "").replace(".html", "").toUpperCase()}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </header>
  );
}
