"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function V279() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [closing, setClosing] = useState(false);
  const navRef = useRef(null);
  const timeoutRef = useRef(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
    setClosing(false);
  };

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setClosing(false);
    setOpenDropdown(menu);
  };

  const handleMouseLeave = (menu) => {
    timeoutRef.current = setTimeout(() => {
      if (openDropdown === menu) {
        setClosing(true);
        setTimeout(() => {
          setOpenDropdown(null);
          setClosing(false);
        }, 150);
      }
    }, 200); // Increased delay to 200ms for better usability
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setClosing(true);
        setTimeout(() => {
          setOpenDropdown(null);
          setClosing(false);
        }, 150);
      }
    };

    const handleKey = (e) => {
      if (e.key === "Escape") {
        setClosing(true);
        setTimeout(() => {
          setOpenDropdown(null);
          setClosing(false);
        }, 150);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    window.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("keydown", handleKey);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [openDropdown]);

  return (
    <nav
      ref={navRef}
      className="bg-[#1a1a1a] text-white w-full py-3 px-8 flex items-center justify-between relative"
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <img
          src="https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ac0_nav%20logo.svg"
          alt="hautech.ai"
          className="h-6"
        />
      </div>

      {/* Center: Navigation */}
      <div className="flex items-center gap-6 text-sm font-semibold relative">
        <a href="#reviews" className="hover:text-[#f4893a] transition-colors duration-200">
          Reviews
        </a>
        <a href="#cases" className="hover:text-[#f4893a] transition-colors duration-200">
          Use cases
        </a>
        <a href="#benefits" className="hover:text-[#f4893a] transition-colors duration-200">
          Benefits
        </a>
        <a href="#tools" className="hover:text-[#f4893a] transition-colors duration-200">
          Tools
        </a>

        {/* About Us Dropdown */}
        <div
          className="relative text-left"
          onMouseEnter={() => handleMouseEnter("about")}
          onMouseLeave={() => handleMouseLeave("about")}
        >
          <button
            onClick={() => toggleDropdown("about")}
            className="flex items-center text-left gap-1 hover:text-[#f4893a] transition-colors duration-200"
          >
            About Us <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === "about" ? "rotate-180" : ""}`} />
          </button>

          <div 
            className={`absolute top-full left-0 bg-[#222] rounded-lg mt-2 w-44 shadow-lg text-sm z-10 transition-all duration-200 ${
              openDropdown === "about" 
                ? closing 
                  ? "opacity-0 transform -translate-y-2 pointer-events-none" 
                  : "opacity-100 transform translate-y-0" 
                : "opacity-0 transform -translate-y-2 pointer-events-none"
            }`}
            onMouseEnter={() => handleMouseEnter("about")}
            onMouseLeave={() => handleMouseLeave("about")}
          >
            <a href="#tools" className="block px-4 py-2 hover:bg-[#333] hover:text-[#f4893a] transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg">
              Tools
            </a>
            <a href="#interfaces" className="block px-4 py-2 hover:bg-[#333] hover:text-[#f4893a] transition-colors duration-200">
              Interfaces
            </a>
            <a href="#faq" className="block px-4 py-2 hover:bg-[#333] hover:text-[#f4893a] transition-colors duration-200">
              FAQ
            </a>
            <a href="#contact" className="block px-4 py-2 hover:bg-[#333] hover:text-[#f4893a] transition-colors duration-200">
              Get in Touch
            </a>
            <a
              href="https://blog.hautech.ai/"
              className="block px-4 py-2 hover:bg-[#333] hover:text-[#f4893a] transition-colors duration-200"
            >
              Blog
            </a>
          </div>
        </div>

        {/* AI Models Dropdown */}
        <div
          className="relative text-left"
          onMouseEnter={() => handleMouseEnter("ai")}
          onMouseLeave={() => handleMouseLeave("ai")}
        >
          <button
            onClick={() => toggleDropdown("ai")}
            className="flex items-center gap-1 hover:text-[#f4893a] transition-colors duration-200"
          >
            AI models <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === "ai" ? "rotate-180" : ""}`} />
          </button>

          <div 
            className={`absolute top-full left-0 bg-[#222] rounded-lg mt-2 w-32 shadow-lg text-sm z-10 transition-all duration-200 ${
              openDropdown === "ai" 
                ? closing 
                  ? "opacity-0 transform -translate-y-2 pointer-events-none" 
                  : "opacity-100 transform translate-y-0" 
                : "opacity-0 transform -translate-y-2 pointer-events-none"
            }`}
            onMouseEnter={() => handleMouseEnter("ai")}
            onMouseLeave={() => handleMouseLeave("ai")}
          >
            <a href="/naomi" className="block px-4 py-2 hover:bg-[#333] hover:text-[#f4893a] transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg">
              Naomi
            </a>
            <a href="/linda" className="block px-4 py-2 hover:bg-[#333] hover:text-[#f4893a] transition-colors duration-200">
              Linda
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-[#333] hover:text-[#f4893a] transition-colors duration-200">
              Kate
            </a>
          </div>
        </div>

        <a href="/pricing" className="hover:text-[#f4893a] transition-colors duration-200">
          Pricing
        </a>
        <a href="https://docs.hautech.ai" className="hover:text-[#f4893a] transition-colors duration-200">
          API
        </a>
      </div>

      {/* Right: Buttons */}
      <div className="flex items-center gap-3">
        <a
          href="https://studio.hautech.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity duration-200"
        >
          Get started for free
        </a>
        <a
          href="#"
          className="bg-[#f58a2c] text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity duration-200"
        >
          Contact sales
        </a>
      </div>
    </nav>
  );
}