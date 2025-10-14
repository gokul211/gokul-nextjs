"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

export default function V278() {
  const [openDropdown, setOpenDropdown] = useState(null); // for desktop hover/click (md+)
  const [mobileOpen, setMobileOpen] = useState(false); // main mobile menu
  const [mobileExpanded, setMobileExpanded] = useState({
    about: false,
    ai: false,
  }); // mobile accordion state
  const navRef = useRef(null);
  const mobilePanelRef = useRef(null);

  // Toggle desktop dropdown (click) - only one can be open at a time
  const toggleDropdown = (menu) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setOpenDropdown(null);
  };

  // Toggle mobile menu
  const toggleMobile = () => {
    setMobileOpen((v) => !v);
  };

  // Toggle mobile accordion sections - only one can be open at a time
  const toggleMobileSection = (section) => {
    setMobileExpanded((prev) => {
      const newState = { about: false, ai: false };
      if (!prev[section]) {
        newState[section] = true;
      }
      return newState;
    });
  };

  // Close everything on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        closeAllDropdowns();
      }

      // If mobile panel is open and click outside panel, close it
      if (
        mobileOpen &&
        mobilePanelRef.current &&
        !mobilePanelRef.current.contains(e.target) &&
        !navRef.current.contains(e.target)
      ) {
        setMobileOpen(false);
      }
    };

    const handleKey = (e) => {
      if (e.key === "Escape") {
        closeAllDropdowns();
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    window.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("keydown", handleKey);
    };
  }, [mobileOpen]);

  // Close mobile menu when resizing up to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Helper to close mobile menu when clicking a link
  const handleMobileLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className="bg-[#1a1a1a] text-white w-full py-3 px-4 md:px-8 flex items-center justify-between relative"
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <img
          src="https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ac0_nav%20logo.svg"
          alt="hautech.ai"
          className="h-6"
        />
      </div>

      {/* Center: Desktop Navigation (hidden on mobile) */}
      <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
        <a href="#reviews" className="hover:text-[#f4893a] transition-colors duration-150 whitespace-nowrap">
          Reviews
        </a>
        <a href="#cases" className="hover:text-[#f4893a] transition-colors duration-150 whitespace-nowrap">
          Use cases
        </a>
        <a href="#benefits" className="hover:text-[#f4893a] transition-colors duration-150 whitespace-nowrap">
          Benefits
        </a>
        <a href="#tools" className="hover:text-[#f4893a] transition-colors duration-150 whitespace-nowrap">
          Tools
        </a>

        {/* About Us Dropdown (desktop) */}
        <div
          className="relative text-left"
          onMouseEnter={() => setOpenDropdown("about")}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <button
            onClick={() => toggleDropdown("about")}
            className="flex items-center justify-center gap-1 hover:text-[#f4893a] transition-colors duration-150 whitespace-nowrap"
            aria-expanded={openDropdown === "about"}
            aria-haspopup="true"
          >
            About Us <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === "about" ? "rotate-180" : ""}`} />
          </button>

          {openDropdown === "about" && (
            <div
              className="absolute bg-[#222] rounded-lg mt-2 top-full left-1/2 transform -translate-x-1/2 min-w-[12rem] shadow-lg text-sm z-50"
              onMouseEnter={() => setOpenDropdown("about")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <a href="#tools" className="block  px-4 py-2 hover:bg-[#333] hover:text-[#f4893a]" onClick={closeAllDropdowns}>Tools</a>
              <a href="#interfaces" className="block px-4 py-2 hover:bg-[#333] hover:text-[#f4893a]" onClick={closeAllDropdowns}>Interfaces</a>
              <a href="#faq" className="block px-4 py-2 hover:bg-[#333] hover:text-[#f4893a]" onClick={closeAllDropdowns}>FAQ</a>
              <a href="#contact" className="block px-4 py-2 hover:bg-[#333] hover:text-[#f4893a]" onClick={closeAllDropdowns}>Get in Touch</a>
              <a href="https://blog.hautech.ai/" className="block px-4 py-2 hover:bg-[#333] hover:text-[#f4893a]" onClick={closeAllDropdowns}>Blog</a>
            </div>
          )}
        </div>

        {/* AI Models Dropdown (desktop) */}
        <div
          className="relative text-left"
          onMouseEnter={() => setOpenDropdown("ai")}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <button
            onClick={() => toggleDropdown("ai")}
            className="flex items-center justify-center gap-1 hover:text-[#f4893a] transition-colors duration-150 whitespace-nowrap"
            aria-expanded={openDropdown === "ai"}
            aria-haspopup="true"
          >
            AI models <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === "ai" ? "rotate-180" : ""}`} />
          </button>

          {openDropdown === "ai" && (
            <div
              className="absolute bg-[#222] rounded-lg mt-2 top-full left-1/2 transform -translate-x-1/2 w-32 shadow-lg text-sm z-50"
              onMouseEnter={() => setOpenDropdown("ai")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <a href="/naomi" className="block px-4 py-2 hover:bg-[#333] hover:text-[#f4893a]" onClick={closeAllDropdowns}>Naomi</a>
              <a href="/linda" className="block px-4 py-2 hover:bg-[#333] hover:text-[#f4893a]" onClick={closeAllDropdowns}>Linda</a>
              <a href="#" className="block px-4 py-2 hover:bg-[#333] hover:text-[#f4893a]" onClick={closeAllDropdowns}>Kate</a>
            </div>
          )}
        </div>

        <a href="/pricing" className="hover:text-[#f4893a] transition-colors duration-150 whitespace-nowrap">Pricing</a>
        <a href="https://docs.hautech.ai" className="hover:text-[#f4893a] transition-colors duration-150 whitespace-nowrap">API</a>
      </div>

      {/* Right: Desktop Buttons */}
      <div className="hidden md:flex items-center gap-3">
        <a
          href="https://studio.hautech.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition whitespace-nowrap"
        >
          Get started for free
        </a>
        <a
          href="#"
          className="bg-[#f58a2c] text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition whitespace-nowrap"
        >
          Contact sales
        </a>
      </div>

      {/* Mobile: hamburger */}
      <div className="md:hidden flex items-center">
        <button
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={toggleMobile}
          className="p-2 rounded-md hover:bg-white/10 transition"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Panel (small screens) */}
      {/* Full-screen overlay panel when mobileOpen */}
      <div
        ref={mobilePanelRef}
        className={`md:hidden fixed inset-0 z-40 transition-transform duration-250 ${
          mobileOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-full opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Dim background */}
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Slide-up panel */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#0f0f0f] rounded-t-xl shadow-lg p-6 max-h-[80vh] overflow-y-auto">
          {/* Top row: logo + close */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img
                src="https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ac0_nav%20logo.svg"
                alt="hautech.ai"
                className="h-6"
              />
            </div>
            <button onClick={() => setMobileOpen(false)} aria-label="Close" className="p-2 rounded hover:bg-white/10">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile nav items */}
          <nav className="flex flex-col gap-2 text-sm font-semibold">
            <a onClick={handleMobileLinkClick} href="#reviews" className="py-3 px-1 hover:text-[#f4893a] text-center">Reviews</a>
            <a onClick={handleMobileLinkClick} href="#cases" className="py-3 px-1 hover:text-[#f4893a] text-center">Use cases</a>
            <a onClick={handleMobileLinkClick} href="#benefits" className="py-3 px-1 hover:text-[#f4893a] text-center">Benefits</a>
            <a onClick={handleMobileLinkClick} href="#tools" className="py-3 px-1 hover:text-[#f4893a] text-center">Tools</a>

            {/* About Us accordion */}
            <div className="pt-2 border-t border-white/5">
              <button
                onClick={() => toggleMobileSection("about")}
                aria-expanded={mobileExpanded.about}
                className="w-full flex items-center justify-center gap-2 py-3 px-1"
              >
                <span className="font-semibold">About Us</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded.about ? "rotate-180" : ""}`} />
              </button>

              <div className={`overflow-hidden transition-[max-height] duration-200 ${mobileExpanded.about ? "max-h-60" : "max-h-0"}`}>
                <a onClick={handleMobileLinkClick} href="#tools" className="block px-2 py-2 text-sm hover:text-[#f4893a] text-center">Tools</a>
                <a onClick={handleMobileLinkClick} href="#interfaces" className="block px-2 py-2 text-sm hover:text-[#f4893a] text-center">Interfaces</a>
                <a onClick={handleMobileLinkClick} href="#faq" className="block px-2 py-2 text-sm hover:text-[#f4893a] text-center">FAQ</a>
                <a onClick={handleMobileLinkClick} href="#contact" className="block px-2 py-2 text-sm hover:text-[#f4893a] text-center">Get in Touch</a>
                <a onClick={handleMobileLinkClick} href="https://blog.hautech.ai/" className="block px-2 py-2 text-sm hover:text-[#f4893a] text-center">Blog</a>
              </div>
            </div>

            {/* AI Models accordion */}
            <div className="pt-2 border-t border-white/5">
              <button
                onClick={() => toggleMobileSection("ai")}
                aria-expanded={mobileExpanded.ai}
                className="w-full flex items-center justify-center gap-2 py-3 px-1"
              >
                <span className="font-semibold">AI models</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded.ai ? "rotate-180" : ""}`} />
              </button>

              <div className={`overflow-hidden transition-[max-height] duration-200 ${mobileExpanded.ai ? "max-h-48" : "max-h-0"}`}>
                <a onClick={handleMobileLinkClick} href="/naomi" className="block px-2 py-2 text-sm hover:text-[#f4893a] text-center">Naomi</a>
                <a onClick={handleMobileLinkClick} href="/linda" className="block px-2 py-2 text-sm hover:text-[#f4893a] text-center">Linda</a>
                <a onClick={handleMobileLinkClick} href="#" className="block px-2 py-2 text-sm hover:text-[#f4893a] text-center">Kate</a>
              </div>
            </div>

            <a onClick={handleMobileLinkClick} href="/pricing" className="pt-3 block py-3 px-1 hover:text-[#f4893a] text-center">Pricing</a>
            <a onClick={handleMobileLinkClick} href="https://docs.hautech.ai" className="block py-3 px-1 hover:text-[#f4893a] text-center">API</a>

            {/* CTAs */}
            <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
              <a
                href="https://studio.hautech.ai"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-full text-center"
              >
                Get started for free
              </a>
              <a
                href="#"
                onClick={() => setMobileOpen(false)}
                className="bg-[#f58a2c] text-white text-sm font-semibold px-4 py-2 rounded-full text-center"
              >
                Contact sales
              </a>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
}