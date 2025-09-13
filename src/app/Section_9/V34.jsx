"use client";
import React from "react";

export default function V34() {
  const footerLinks = {
    Company: [
      "Lorem Ipsum",
      "Dolor Sit",
      "Amet Consectetur",
    ],
    Utility: [
      "Adipiscing Elit",
      "Sed Do",
      "Eiusmod Tempor",
    ],
    Resources: [
      "Incididunt Ut",
      "Labore Et",
      "Magna Aliqua",
    ],
    Social: [
      "Ut Enim",
      "Ad Minim",
      "Veniam Quis",
    ],
  };

  return (
    <div className="footer-section bg-gradient-to-b from-[#abff594d] to-white text-gray-800">
      <section className="section-home-cta py-8"> {/* Reduced padding for mobile */}
        <div className="padding-global max-w-7xl mx-auto px-4">
          <div className="container-large">
            <div className="max-width-large mx-auto text-center">
              <div
                data-w-id="2539d3fa-486c-0aa0-8733-cb4752b7e431"
                className="home-cta-wrap"
                style={{
                  transform: "translate3d(0px, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                  transformStyle: "preserve-3d",
                  opacity: 1,
                }}
              >
                <div className="section-title-block text-center">
                  <h2
                    className="heading-style-h2 text-3xl font-bold text-black mb-2" // Smaller heading for mobile
                    aria-label="Take the Next Step with Orderze"
                  >
                    Lorem Ipsum Dolor Sit Amet
                  </h2>
                  <div className="max-width-xlarge mx-auto max-w-4xl">
                    <p
                      data-w-id="2539d3fa-486c-0aa0-8733-cb4752b7e436"
                      className="text-base text-gray-700 mb-4" // Smaller text for mobile
                      style={{
                        transform: "translate3d(0px, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                        transformStyle: "preserve-3d",
                        opacity: 1,
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
                <div
                  data-w-id="e43ff785-ad8c-b6da-d9a4-2ca143133ca4"
                  style={{
                    transform: "translate3d(0px, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    transformStyle: "preserve-3d",
                    opacity: 1,
                  }}
                  className="flex justify-center"
                >
                  <a
                    data-w-id="a62ba691-561d-a0e4-5855-cd6c7444b28b"
                    href="/pricing"
                    className="group button is-secondary w-inline-block bg-gradient-to-r from-lime-400 to-cyan-400 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-sm" // Smaller button for mobile
                  >
                    <div
                      className="button-text transform transition-transform duration-300 group-hover:-translate-x-4"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      Lorem Ipsum Trial
                    </div>
                    <svg
                      className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform transition-transform duration-300 group-hover:translate-x-0 -translate-x-4" // Smaller icon for mobile
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr className="border-gray-300 my-2 max-w-7xl mx-auto px-4" /> {/* Adjusted spacing for mobile */}
      <footer className="footer py-8"> {/* Reduced padding for mobile */}
        <div className="padding-global max-w-7xl mx-auto px-4">
          <div className="container-large">
            <div className="footer-wrapper flex flex-col items-center text-center"> {/* Stacked vertically for mobile */}
              <div
                data-w-id="2539d3fa-486c-0aa0-8733-cb4752b7e43e"
                className="footer-left-block w-full mb-6" // Full width for mobile
                style={{
                  opacity: 1,
                  transform: "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <a
                  href="/"
                  aria-current="page"
                  className="footer-logo w-inline-block w--current flex items-center justify-center" // Centered for mobile
                >
                  <img
                    src="https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/68488563182b7770811d0a2e_Logo.svg"
                    loading="lazy"
                    alt="Orderze Webflow Template Image"
                    className="footer-logo-image h-7 mr-1" // Smaller logo for mobile
                  />
                  <span className="text-xl font-bold text-black">ssags</span> {/* Smaller text for mobile */}
                </a>
                <p className="text-sm text-gray-700 mt-2"> {/* Smaller text for mobile */}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div
                data-w-id="2539d3fa-486c-0aa0-8733-cb4752b7e443"
                className="footer-right-block w-full flex flex-wrap justify-center" // Centered and wrapped for mobile
                style={{
                  transform: "translate3d(0px, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                  transformStyle: "preserve-3d",
                  opacity: 1,
                }}
              >
                {Object.entries(footerLinks).map(([title, links]) => (
                  <div key={title} className="footer-menu-box w-1/2 mb-4"> {/* Adjusted width for mobile */}
                    <div className="text-sm font-bold text-black mb-2">
                      {title}
                    </div>
                    <div className="footer-menu-link-box flex flex-col space-y-1"> {/* Reduced spacing for mobile */}
                      {links.map((link, idx) => (
                        <a key={idx} href="#" className="footer-link text-gray-700 hover:text-black text-sm"> {/* Smaller text for mobile */}
                          {link}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <hr className="border-gray-300 my-2" /> {/* Adjusted spacing for mobile */}
            <div
              data-w-id="2539d3fa-486c-0aa0-8733-cb4752b7e46a"
              className="text-center mt-4" // Adjusted spacing for mobile
              style={{
                transform: "translate3d(0px, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                transformStyle: "preserve-3d",
                opacity: 1,
              }}
            >
              <p className="text-gray-700 text-sm"> {/* Smaller text for mobile */}
                © 2025 Lorem Ipsum. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}