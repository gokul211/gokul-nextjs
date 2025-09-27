// pages/index.js
import React from 'react';
import { FiMail, FiPhone } from 'react-icons/fi';

export default function V219() {
  return (
    <div className="bg-[url('https://cdn.prod.website-files.com/667337a492e68bf1bbac5bb0/667e7d65e0d59a8d5fbf4e23_mnz-m1m2EZOZVwA-unsplash.webp')] bg-cover bg-center bg-black/1 bg-blend-overlay text-white">
      {/* Footer only — removed the empty main placeholder so no space above footer */}
      <footer className="bg-[rgba(0,0,0,0.85)] text-gray-300">
        <div className="max-w-[1440px] mx-auto px-5">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-12 py-20">
            {/* First block: Logo + paragraph */}
            <div className="w-full md:w-[40%] max-w-[450px]">
              <img
                src="https://cdn.prod.website-files.com/667337a492e68bf1bbac5bb0/66885c68ba14f8c54c398c6c_Logo%20(1).webp"
                alt="Cloths logo"
                className="w-[140px] h-auto object-contain mb-6"
                loading="lazy"
              />
              <p className="text-gray-300 text-[15px] text-left font-medium leading-[27px]">
                At Cloths, we're dedicated to providing you with the best in electronic innovation.
                Explore our wide range of products, from T-shirts to Jackets.
              </p>
            </div>

            {/* Useful links */}
            <div className="w-full md:w-auto text-left flex-1 max-w-[220px]">
              <h3 className="text-white text-left text-[20px] font-normal mb-6">Useful Links</h3>
              <nav className="flex flex-col gap-4">
                {['Home', 'About', 'Blog', 'Shop'].map((label) => (
                  <a
                    key={label}
                    href={label === 'Home' ? '/' : `/${label.toLowerCase()}`}
                    className="group inline-flex items-center gap-3 text-gray-300 font-semibold transition-colors duration-300"
                  >
                    <span
                      className="block h-[2px] bg-red-500 w-0 group-hover:w-5 transition-all duration-300"
                      aria-hidden="true"
                    />
                    <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                      {label}
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Quick links */}
            <div className="w-full md:w-auto text-left flex-1 max-w-[220px]">
              <h3 className="text-white text-[20px] font-normal mb-6">Quick Links</h3>
              <nav className="flex flex-col gap-4">
                {['Contact', 'FAQ', 'Log-In', 'Licensing'].map((label) => (
                  <a
                    key={label}
                    href={
                      label === 'Licensing'
                        ? 'https://cloths-nx.webflow.io/utility/license'
                        : `/${label.toLowerCase().replace(/ /g, '-')}`
                    }
                    className="group inline-flex items-center gap-3 text-gray-300 font-semibold transition-colors duration-300"
                  >
                    <span
                      className="block h-[2px] bg-red-500 w-0 group-hover:w-5 transition-all duration-300"
                      aria-hidden="true"
                    />
                    <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                      {label}
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact us (updated: stacked & left-aligned) */}
            <div className="w-full md:w-[28%] max-w-[340px] text-left">
              <h3 className="text-white text-[20px] font-normal mb-6">Contact Us</h3>

              <div className="flex flex-col gap-4">
                <a
                  href="mailto:NX@company.com"
                  className="flex items-start gap-3 p-3 rounded-sm  transition-colors duration-200"
                >
                  <div className="min-w-[42px] min-h-[42px] flex items-center justify-center bg-red-500 text-white rounded">
                    <FiMail size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-gray-300 font-semibold">Email:</div>
                    <div className="text-white text-[14px]">ABC@company.com</div>
                  </div>
                </a>

                <a
                  href="tel:(313)634-1592"
                  className="flex items-start gap-3 p-3 rounded-sm  transition-colors duration-200"
                >
                  <div className="min-w-[42px] min-h-[42px] flex items-center justify-center bg-red-500 text-white rounded">
                    <FiPhone size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-gray-300 font-semibold">Phone:</div>
                    <div className="text-white text-[14px]">(313) 678 - 9876</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* bottom bar */}
          <div className="border-t border-gray-800 pt-6 pb-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400">
              Copyright © Cloths | Designed by Nexoy | Powered by Webflow.com
            </div>

            <div className="flex items-center gap-3">
              {[
                { label: 'facebook', svg: (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.07C22 6.52 17.52 2 12 2S2 6.52 2 12.07C2 17.09 5.66 21.19 10.44 21.98v-6.99H7.9v-2.92h2.55V9.41c0-2.52 1.5-3.9 3.78-3.9 1.1 0 2.25.2 2.25.2v2.48h-1.27c-1.25 0-1.64.78-1.64 1.58v1.9h2.78l-.44 2.92h-2.34v6.99C18.34 21.19 22 17.09 22 12.07z"/></svg>) },
                { label: 'instagram', svg: (<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.2"/><path d="M8 11.99a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z" stroke="currentColor" strokeWidth="1.2"/></svg>) },
                { label: 'twitter', svg: (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.92c-.63.28-1.3.48-2 .57a3.41 3.41 0 0 0-6.06 1.98c0 .27.03.54.09.8A9.72 9.72 0 0 1 3 4.86a3.4 3.4 0 0 0 1.05 4.53c-.5 0-.97-.15-1.38-.38v.04a3.4 3.4 0 0 0 2.73 3.33c-.38.1-.78.15-1.2.06a3.4 3.4 0 0 0 3.17 2.36A6.83 6.83 0 0 1 2 18.1a9.63 9.63 0 0 0 5.2 1.52c6.26 0 9.7-5.18 9.7-9.67v-.44c.67-.48 1.25-1.1 1.71-1.8-.6.27-1.24.45-1.9.53z"/></svg>) },
                { label: 'pinterest', svg: (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.87 8.16 6.88 9.43-.09-.8-.17-2.04.04-2.92.19-.82 1.22-5.22 1.22-5.22s-.31-.62-.31-1.54c0-1.44.84-2.51 1.9-2.51.9 0 1.33.68 1.33 1.5 0 .92-.59 2.3-.9 3.58-.26 1.07.55 1.94 1.64 1.94 1.97 0 3.48-2.08 3.48-5.08 0-2.65-1.9-4.5-4.6-4.5-3.13 0-5 2.35-5 4.78 0 .95.36 1.97.81 2.52.09.11.1.21.07.32-.08.35-.27 1.07-.31 1.22-.05.2-.17.25-.39.15-1.44-.67-2.33-2.77-2.33-4.45 0-3.62 2.63-6.95 7.59-6.95 3.98 0 7.07 2.85 7.07 6.66 0 3.98-2.51 7.19-6 7.19-1.17 0-2.27-.61-2.64-1.32l-.72 2.74c-.26.99-.96 2.24-1.43 3 .98.3 2.02.46 3.1.46 5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>) },
              ].map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-500 transition-colors duration-200"
                >
                  <span className="text-white">{s.svg}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}