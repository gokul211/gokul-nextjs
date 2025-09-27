// pages/index.js
import React, { useState } from 'react';
import { MdEmail, MdPhone } from 'react-icons/md'; // 👈 Importing from react-icons

export default function V218() {
  const [openSection, setOpenSection] = useState(''); // '' | 'useful' | 'quick' | 'contact'

  const toggle = (key) => {
    setOpenSection((prev) => (prev === key ? '' : key));
  };

  const links = {
    useful: ['Home', 'About', 'Blog', 'Shop'],
    quick: ['Contact', 'FAQ', 'Log-In', 'Licensing'],
  };

  return (
    <div className="bg-[url('https://cdn.prod.website-files.com/667337a492e68bf1bbac5bb0/667e7d65e0d59a8d5fbf4e23_mnz-m1m2EZOZVwA-unsplash.webp')] bg-cover bg-center bg-black/1 bg-blend-overlay text-white">
      <footer className="bg-[rgba(0,0,0,0.85)] text-gray-300">
        <div className="max-w-[1440px] mx-auto px-4 md:px-5">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12 py-12 md:py-16">

            {/* Logo + paragraph */}
            <div className="w-full md:w-[40%] md:max-w-[450px] md:pr-6">
              <img
                src="https://cdn.prod.website-files.com/667337a492e68bf1bbac5bb0/66885c68ba14f8c54c398c6c_Logo%20(1).webp"
                alt="Cloths logo"
                className="w-[120px] md:w-[140px] h-auto object-contain mb-4 md:mb-6"
                loading="lazy"
              />
              <p className="text-gray-300 text-[14px] md:text-[15px] text-left font-medium leading-[22px] md:leading-[27px]">
                At Cloths, we're dedicated to providing you with the best in electronic innovation.
                Explore our wide range of products, from T-shirts to Jackets.
              </p>

              <div className="border-b border-white/10 mt-4 md:hidden" />
            </div>

            {/* Useful Links */}
            <div className="w-full md:w-auto flex-1 md:max-w-[300px]">
              <button
                type="button"
                onClick={() => toggle('useful')}
                aria-expanded={openSection === 'useful'}
                className="w-full flex items-center justify-between gap-3"
              >
                <h3 className="text-white text-[18px] md:text-[20px] font-semibold text-left py-1 md:py-0">
                  Useful Links
                </h3>
                <span
                  className={`md:hidden inline-flex items-center justify-center w-8 h-8 rounded transition-transform duration-200 ${
                    openSection === 'useful' ? 'rotate-180' : 'rotate-0'
                  }`}
                  aria-hidden
                >
                  ▼
                </span>
              </button>

              <div
                className={`overflow-hidden transition-[max-height] duration-300 md:max-h-full ${
                  openSection === 'useful' ? 'max-h-40' : 'max-h-0'
                } md:max-h-full`}
              >
                <nav className="mt-3 md:mt-4 flex flex-col gap-3 pl-1">
                  {links.useful.map((label) => (
                    <a
                      key={label}
                      href={label === 'Home' ? '/' : `/${label.toLowerCase()}`}
                      className="inline-flex items-center gap-3 text-gray-300 font-medium text-[14px] hover:text-white transition-colors duration-150"
                    >
                      <span className="pl-1">{label}</span>
                    </a>
                  ))}
                </nav>
              </div>

              <div className="border-b border-white/10 mt-4 md:hidden" />
            </div>

            {/* Quick Links */}
            <div className="w-full md:w-auto flex-1 md:max-w-[300px]">
              <button
                type="button"
                onClick={() => toggle('quick')}
                aria-expanded={openSection === 'quick'}
                className="w-full flex items-center justify-between gap-3"
              >
                <h3 className="text-white text-[18px] md:text-[20px] font-semibold text-left py-1 md:py-0">
                  Quick Links
                </h3>
                <span
                  className={`md:hidden inline-flex items-center justify-center w-8 h-8 rounded transition-transform duration-200 ${
                    openSection === 'quick' ? 'rotate-180' : 'rotate-0'
                  }`}
                  aria-hidden
                >
                  ▼
                </span>
              </button>

              <div
                className={`overflow-hidden transition-[max-height] duration-300 md:max-h-full ${
                  openSection === 'quick' ? 'max-h-40' : 'max-h-0'
                } md:max-h-full`}
              >
                <nav className="mt-3 md:mt-4 flex flex-col gap-3 pl-1">
                  {links.quick.map((label) => (
                    <a
                      key={label}
                      href={
                        label === 'Licensing'
                          ? 'https://cloths-nx.webflow.io/utility/license'
                          : `/${label.toLowerCase().replace(/ /g, '-')}`
                      }
                      className="inline-flex items-center gap-3 text-gray-300 font-medium text-[14px] hover:text-white transition-colors duration-150"
                    >
                      <span className="pl-1">{label}</span>
                    </a>
                  ))}
                </nav>
              </div>

              <div className="border-b border-white/10 mt-4 md:hidden" />
            </div>

            {/* Contact Us */}
            <div className="w-full md:w-[28%] md:max-w-[340px]">
              <button
                type="button"
                onClick={() => toggle('contact')}
                aria-expanded={openSection === 'contact'}
                className="w-full flex items-center justify-between gap-3"
              >
                <h3 className="text-white text-[18px] md:text-[20px] font-semibold text-left py-1 md:py-0">
                  Contact Us
                </h3>
                <span
                  className={`md:hidden inline-flex items-center justify-center w-8 h-8 rounded transition-transform duration-200 ${
                    openSection === 'contact' ? 'rotate-180' : 'rotate-0'
                  }`}
                  aria-hidden
                >
                  ▼
                </span>
              </button>

              <div
                className={`overflow-hidden transition-[max-height] duration-300 md:max-h-full ${
                  openSection === 'contact' ? 'max-h-56' : 'max-h-0'
                } md:max-h-full`}
              >
                <div className="mt-3 md:mt-4 flex flex-col gap-3 pl-1">
                  <a
                    href="mailto:NX@company.com"
                    className="flex items-start gap-3 p-2 rounded-sm hover:bg-white/5 transition-colors duration-150"
                  >
                    <div className="min-w-[40px] min-h-[40px] flex items-center justify-center bg-red-500 text-white rounded">
                      <MdEmail size={18} /> {/* 👈 Email icon */}
                    </div>
                    <div>
                      <div className="text-gray-300 font-medium text-[13px]">Email</div>
                      <div className="text-white text-[14px]">NX@company.com</div>
                    </div>
                  </a>

                  <a
                    href="tel:(313)634-1592"
                    className="flex items-start gap-3 p-2 rounded-sm hover:bg-white/5 transition-colors duration-150"
                  >
                    <div className="min-w-[40px] min-h-[40px] flex items-center justify-center bg-red-500 text-white rounded">
                      <MdPhone size={18} /> {/* 👈 Phone icon */}
                    </div>
                    <div>
                      <div className="text-gray-300 font-medium text-[13px]">Phone</div>
                      <div className="text-white text-[14px]">(313) 634 - 1592</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* bottom bar */}
          <div className="border-t border-white/10 pt-5 pb-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
            <div className="text-sm text-gray-400 text-left md:text-left w-full md:w-auto">
              Copyright © Cloths | Designed by Nexoy | Powered by Webflow.com
            </div>

            {/* Social Icons (keep as is or also convert to react-icons if you want) */}
            <div className="flex items-center gap-3">
              {/* ... same social icons ... */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
