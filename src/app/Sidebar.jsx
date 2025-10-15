// // app/components/Sidebar.js
// "use client";

// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";

// const sections = [
//   { href: "/Section_2", label: "Section_2" },
//   { href: "/Section_7", label: "Section_7" },
// { href: "/Section_9", label: "Section_9" },
// ];

// const Sidebar = () => {
//   const containerRef = useRef(null);
//   const indicatorRef = useRef(null);
//   const itemsRef = useRef([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [hoverIndex, setHoverIndex] = useState(null);

//   // Per-item transform for 3D tilt
//   const [tilt, setTilt] = useState({}); // { [index]: "rotateX(...) rotateY(...) translateZ(...)" }

//   // Logo parallax ref
//   const logoRef = useRef(null);

//   // Move indicator (sliding border) to an item (by index)
//   const moveIndicatorTo = (index) => {
//     const container = containerRef.current;
//     const el = itemsRef.current[index];
//     const indicator = indicatorRef.current;
//     if (!container || !el || !indicator) return;

//     const containerRect = container.getBoundingClientRect();
//     const elRect = el.getBoundingClientRect();

//     const left = elRect.left - containerRect.left;
//     const width = elRect.width;

//     indicator.style.transform = `translateX(${left}px)`;
//     indicator.style.width = `${width}px`;
//   };

//   useEffect(() => {
//     // move indicator to initial active
//     moveIndicatorTo(activeIndex);

//     // reposition on resize
//     const onResize = () => moveIndicatorTo(hoverIndex ?? activeIndex);
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // When hoverIndex changes, move indicator
//   useEffect(() => {
//     moveIndicatorTo(hoverIndex ?? activeIndex);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [hoverIndex, activeIndex]);

//   // 3D tilt handlers
//   const handleMouseMoveItem = (e, index) => {
//     const el = itemsRef.current[index];
//     if (!el) return;
//     const rect = el.getBoundingClientRect();
//     const px = (e.clientX - rect.left) / rect.width; // 0..1
//     const py = (e.clientY - rect.top) / rect.height; // 0..1

//     // tilt degrees
//     const rotateY = (px - 0.5) * 18; // -9..9 deg
//     const rotateX = -(py - 0.5) * 10; // -5..5 deg
//     const translateZ = 8; // subtle pop
//     setTilt((t) => ({ ...t, [index]: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)` }));
//   };

//   const handleMouseLeaveItem = (index) => {
//     setTilt((t) => ({ ...t, [index]: "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)" }));
//     setHoverIndex(null);
//   };

//   // Logo parallax via mouse movement on the top container
//   const handleTopMouseMove = (e) => {
//     if (!logoRef.current) return;
//     const cx = window.innerWidth / 2;
//     const cy = window.innerHeight / 2;
//     const px = (e.clientX - cx) / cx; // -1..1
//     const py = (e.clientY - cy) / cy;
//     logoRef.current.style.transform = `translate3d(${px * 6}px, ${py * 6}px, 0) rotate(${px * 2}deg)`;
//   };

//   const handleTopMouseLeave = () => {
//     if (!logoRef.current) return;
//     logoRef.current.style.transform = `translate3d(0px, 0px, 0) rotate(0deg)`;
//   };

//   return (
//     <div
//       className="bg-gray-900 text-white py-4 px-6 relative overflow-hidden"
//       onMouseMove={handleTopMouseMove}
//       onMouseLeave={handleTopMouseLeave}
//     >
//       {/* Logo (left) */}
//       <div
//         ref={logoRef}
//         className="absolute left-6 top-3 w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold shadow-lg z-30"
//         style={{ transition: "transform 0.15s linear" }}
//       >
//         {/* Replace with <img src="/logo.png" alt="Logo" /> if you have a logo */}
//         L
//       </div>

//       <div
//         ref={containerRef}
//         className="flex justify-start gap-6 items-center overflow-x-auto relative z-20"
//         style={{ paddingLeft: "56px" }} // make room for logo
//       >
//         {sections.map((s, i) => (
//           <div
//             key={s.href}
//             ref={(el) => (itemsRef.current[i] = el)}
//             className="relative"
//             onMouseEnter={() => {
//               setHoverIndex(i);
//             }}
//             onMouseMove={(e) => handleMouseMoveItem(e, i)}
//             onMouseLeave={() => handleMouseLeaveItem(i)}
//           >
//             <Link
//               href={s.href}
//               onClick={() => setActiveIndex(i)}
//               className={`block px-4 py-2 rounded-lg bg-transparent text-white transform transition-shadow duration-300 hover:shadow-xl hover:bg-white/5`}
//               style={{
//                 // apply tilt transform if present
//                 transform: tilt[i] ?? "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
//                 transition: "transform 160ms ease, box-shadow 180ms ease",
//                 willChange: "transform",
//                 cursor: "pointer",
//               }}
//             >
//               <span className="select-none font-medium">{s.label}</span>
//             </Link>
//           </div>
//         ))}

//         {/* Sliding indicator (bottom border) */}
//         <div
//           ref={indicatorRef}
//           className="absolute bottom-0 h-[3px] bg-indigo-400 rounded transition-all duration-300"
//           style={{
//             left: 0,
//             width: 0,
//             transform: "translateX(0px)",
//             transitionProperty: "transform, width",
//             transitionTimingFunction: "cubic-bezier(.2,.9,.2,1)",
//           }}
//         />
//       </div>

//       {/* Overflow three dots - keep it interactive */}
//       <div className="absolute right-6 top-3 z-30">
//         <button
//           className="text-white text-2xl font-bold focus:outline-none"
//           title="More"
//           onClick={() => {
//             // if you want to open a dropdown you can implement it here
//             alert("Add your dropdown handler here");
//           }}
//         >
//           ...
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
'use client';

// app/components/Navbar.js
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const MENU = [
  { label: 'Home', href: '/' },
  {
    label: 'Section 1-15',
    href: '',
    submenu: [
      { label: 'Section 2', href: '/Section_2' },
      { label: 'Section 7', href: '/Section_7' },
      { label: 'Section 8', href: '/Section_8' },
      { label: 'Section 9', href: '/Section_9' },
 { label: 'Section 13', href: '/Section_13' },
  { label: 'Section 14', href: '/Section_14' },
   { label: 'Section 16', href: '/Section_16' },
   { label: 'Section 18', href: '/Section_18' },
   { label: 'Section 19', href: '/Section_19' },
  { label: 'Section 31', href: '/Section_31' },
  { label: 'Section 53', href: '/Section_53' },
   { label: 'Section 54', href: '/Section_54' },
    { label: 'Section 55', href: '/Section_55' },
    ],
  },
  {
    label: 'Section 16-30',
    href: '',
    submenu: [
      { label: 'Section 56', href: '/Section_56' },
       { label: 'Section 57', href: '/Section_57' },

    ],
  },
];

const OPEN_DELAY = 80;   // ms before opening submenu
const CLOSE_DELAY = 260; // ms before closing submenu

const Sidebar = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const openTimer = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (openTimer.current) clearTimeout(openTimer.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const hasHref = (href) => !!href && href.trim() !== '';

  const handleMouseEnter = (i) => {
    // entering either the trigger or submenu cancels close timer and starts open timer
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (openTimer.current) clearTimeout(openTimer.current);
    openTimer.current = setTimeout(() => {
      setOpenIndex(i);
      openTimer.current = null;
    }, OPEN_DELAY);
  };

  const handleMouseLeave = (i = null) => {
    // leaving either the trigger or submenu starts the close timer;
    // only close if the currently open menu matches (prevents cross-closing)
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpenIndex((prev) => (i === null || prev === i ? null : prev));
      closeTimer.current = null;
    }, CLOSE_DELAY);
  };

  const toggleSubmenu = (i) => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <header className="w-full bg-gray-900 text-white fixed top-0 left-0 z-[1000]">
      <nav className="flex items-center justify-between max-w-[1200px] mx-auto py-[12px] px-[20px]">
        <div className="brand">
          <Link href="/" className="text-white font-bold text-[18px] no-underline">MyApp</Link>
        </div>

        <ul className="nav-list flex gap-[12px] list-none m-0 p-0 items-center">
          {MENU.map((item, i) => {
            const isOpen = openIndex === i;
            const itemHasHref = hasHref(item.href);

            // Submenu classes now entirely controlled by isOpen
            const submenuClass = [
              'submenu absolute left-0 top-[calc(100%+6px)] bg-[#0b1220] min-w-[180px] rounded-lg py-[8px] list-none m-0 z-50',
              'shadow-[0_6px_18px_rgba(2,6,23,0.6)]',
              'transform origin-top transition-[opacity,transform] duration-[120ms]',
              isOpen
                ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                : 'pointer-events-none opacity-0 -translate-y-[6px] scale-[0.98]',
            ].join(' ');

            return (
              <li
                key={`${i}-${item.label}`}
                className={`nav-item relative ${isOpen ? 'open' : ''}`}
                onMouseEnter={() => item.submenu && handleMouseEnter(i)}
                onMouseLeave={() => item.submenu && handleMouseLeave(i)}
              >
                <div
                  className="nav-link inline-flex items-center gap-[8px] px-[12px] py-[8px] rounded-[6px] text-gray-200 cursor-pointer"
                  onClick={() => item.submenu && toggleSubmenu(i)}
                  role={item.submenu ? 'button' : undefined}
                  tabIndex={item.submenu ? 0 : undefined}
                  aria-haspopup={item.submenu ? 'true' : undefined}
                  aria-expanded={item.submenu ? isOpen : undefined}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && item.submenu) {
                      e.preventDefault();
                      toggleSubmenu(i);
                    }
                  }}
                  onFocus={() => item.submenu && handleMouseEnter(i)}
                  onBlur={() => item.submenu && handleMouseLeave(i)}
                >
                  {itemHasHref ? (
                    <Link href={item.href} className="text-inherit no-underline">{item.label}</Link>
                  ) : (
                    <span className="nav-label text-inherit text-[15px]">{item.label}</span>
                  )}
                  {item.submenu && <span className="caret text-[12px] opacity-80">▾</span>}
                </div>

                {item.submenu && (
                  <ul
                    className={submenuClass}
                    aria-hidden={!isOpen}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={() => handleMouseLeave(i)}
                  >
                    {item.submenu.map((sub, j) => {
                      const subHasHref = hasHref(sub.href);
                      return (
                        <li key={`${i}-${j}-${sub.label}`} className="px-[14px] py-[6px]">
                          {subHasHref ? (
                            <Link href={sub.href} className="text-gray-200 block no-underline hover:bg-[rgba(255,255,255,0.03)] hover:rounded-[6px]">
                              {sub.label}
                            </Link>
                          ) : (
                            <span className="sub-label text-gray-200 block">{sub.label}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Small global styles for <=720px */}
      <style jsx global>{`
        @media (max-width: 720px) {
          .navbar { padding: 10px 12px; }
          .nav-list { gap: 6px; overflow-x: auto; padding-bottom: 6px; }
          .submenu {
            position: static !important;
            transform: none !important;
            opacity: 1 !important;
            display: none !important;
            box-shadow: none !important;
            background: transparent !important;
            padding: 0 !important;
            pointer-events: auto !important;
          }
          .nav-item.open .submenu {
            display: block !important;
          }
          .submenu li { padding: 8px 0 8px 12px !important; }
        }
      `}</style>
    </header>
  );
};

export default Sidebar;