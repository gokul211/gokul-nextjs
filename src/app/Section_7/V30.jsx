"use client";
import React from "react";

export default function V30() {
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
      <section className="section-home-cta py-16">
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
                    className="heading-style-h2 text-5xl font-bold text-black mb-4"
                    aria-label="Take the Next Step with Orderze"
                  >
                    Lorem Ipsum Dolor Sit Amet
                  </h2>
                  <div className="max-width-xlarge mx-auto max-w-4xl">
                    <p
                      data-w-id="2539d3fa-486c-0aa0-8733-cb4752b7e436"
                      className="text-lg text-gray-700 mb-8"
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
                    className="group button is-secondary w-inline-block bg-gradient-to-r from-lime-400 to-cyan-400 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
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
                      className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transform transition-transform duration-300 group-hover:translate-x-0 -translate-x-4"
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
      <hr className="border-gray-300 my-4 max-w-7xl mx-auto px-4" /> {/* Added horizontal line here */}
      <footer className="footer py-12">
        <div className="padding-global max-w-7xl mx-auto px-4">
          <div className="container-large">
            <div className="footer-wrapper flex flex-wrap justify-between items-start">
              <div
                data-w-id="2539d3fa-486c-0aa0-8733-cb4752b7e43e"
                className="footer-left-block w-full md:w-1/3 mb-8 md:mb-0"
                style={{
                  opacity: 1,
                  transform: "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <a
                  href="/"
                  aria-current="page"
                  className="footer-logo w-inline-block w--current flex items-center"
                >
                  <img
                    src="https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/68488563182b7770811d0a2e_Logo.svg"
                    loading="lazy"
                    alt="Orderze Webflow Template Image"
                    className="footer-logo-image h-8 mr-2"
                  />
                  <span className="text-2xl font-bold text-black">ssags</span>
                </a>
                <p className="text-base text-gray-700 mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div
                data-w-id="2539d3fa-486c-0aa0-8733-cb4752b7e443"
                className="footer-right-block w-full md:w-2/3 flex flex-wrap justify-between"
                style={{
                  transform: "translate3d(0px, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                  transformStyle: "preserve-3d",
                  opacity: 1,
                }}
              >
                {Object.entries(footerLinks).map(([title, links]) => (
                  <div key={title} className="footer-menu-box w-1/2 md:w-1/4 mb-6">
                    <div className="text-sm font-bold text-black mb-3">
                      {title}
                    </div>
                    <div className="footer-menu-link-box flex flex-col space-y-2">
                      {links.map((link, idx) => (
                        <a key={idx} href="#" className="footer-link text-gray-700 hover:text-black">
                          {link}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <hr className="border-gray-300 my-4" />
            <div
              data-w-id="2539d3fa-486c-0aa0-8733-cb4752b7e46a"
              className="text-center mt-8"
              style={{
                transform: "translate3d(0px, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                transformStyle: "preserve-3d",
                opacity: 1,
              }}
            >
              <p className="text-gray-700">
                © 2025 Lorem Ipsum. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}