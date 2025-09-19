import React from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaAngleDoubleRight,
  FaArrowRight,
} from "react-icons/fa";

export default function V178() {
  return (
    <footer
      className="relative text-white"
      style={{
        background:
          "radial-gradient(1200px 500px at 5% 70%, rgba(255,120,25,0.06), transparent 8%), linear-gradient(180deg,#07151b 0%, #051018 100%)",
        overflow: "hidden",
      }}
    >
      {/* floating decorative shapes */}
      <img
        src="https://gramentheme.com/html/fresheat/assets/img/shape/footerShape1_1.png"
        alt=""
        className="hidden xl:block absolute bottom-14 left-0 w-34 opacity-90 pointer-events-none animate-[pump_3s_ease-in-out_infinite]"
      />
      <img
        src="https://gramentheme.com/html/fresheat/assets/img/shape/footerShape1_2.png"
        alt=""
        className="hidden xl:block absolute bottom-0 left-0 w-32 opacity-70 pointer-events-none"
      />
      <img
        src="https://gramentheme.com/html/fresheat/assets/img/shape/footerShape1_3.png"
        alt=""
        className="hidden xl:block absolute right-6 top-6 w-36 opacity-80 pointer-events-none"
      />
      <img
        src="https://gramentheme.com/html/fresheat/assets/img/shape/footerShape1_4.png"
        alt=""
        className="hidden xl:block absolute right-0 top-0 w-48 opacity-90 pointer-events-none"
      />

      {/* Inject custom keyframes for pump animation */}
      <style jsx>{`
        @keyframes pump {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
      `}</style>

      {/* Top orange info bar */}
      <div className="max-w-6xl mx-auto px-6 pt-12">
        <div
          className="mx-auto rounded-2xl px-6 py-6 flex flex-col lg:flex-row gap-6 items-center justify-between shadow-xl"
          style={{ backgroundColor: "#ff7a1a" }}
        >
          {/* item 1 */}
          <div className="flex items-center gap-4 min-w-[220px]">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <FaMapMarkerAlt className="text-white" />
            </div>
            <div>
              <div className="text-xs text-white/90 uppercase tracking-wide">Address</div>
              <div className="text-white font-semibold text-lg">4648 Rocky Road Philadelphia</div>
            </div>
          </div>

          {/* item 2 */}
          <div className="flex items-center gap-4 min-w-[220px]">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <FaEnvelope className="text-white" />
            </div>
            <div className="text-center lg:text-left">
              <div className="text-xs text-white/90 uppercase tracking-wide">Send Email</div>
              <div className="text-white font-semibold text-lg">info@exmple.com</div>
            </div>
          </div>

          {/* item 3 */}
          <div className="flex items-center gap-4 min-w-[220px] justify-end">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <FaPhoneAlt className="text-white" />
            </div>
            <div className="text-right">
              <div className="text-xs text-white/90 uppercase tracking-wide">Call Emergency</div>
              <div className="text-white font-semibold text-lg">+88 0123 654 99</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer widgets wrapper */}
      <div className="max-w-6xl mx-auto px-6">
        {/* footer top dark panel */}
        <div className="mt-10 rounded-2xl p-10" style={{ background: "#07121a", borderRadius: 20 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1: logo + socials */}
            <div>
              <div className="mb-4 text-left">
                <a href="/" className="inline-flex items-center gap-3">
                  <img
                    src="https://gramentheme.com/html/fresheat/assets/img/logo/logoWhite.svg"
                    alt="logo"
                    className="h-10 w-auto"
                  />
                </a>
              </div>
              <p className="text-gray-300 text-left leading-relaxed mb-4 text-sm">
                Phasellus ultricies aliquam volutpat ullamcorper laoreet neque, a lacinia curabitur
                lacinia mollis
              </p>
              <div className="flex gap-3">
                {[FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube].map((Icon, i) => (
                  <a
                    key={i}
                    className="w-9 h-9 rounded-sm bg-black/20 flex items-center justify-center hover:bg-orange-500 transition"
                    href="#"
                  >
                    <Icon className="text-white text-sm" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3 text-gray-300">
                {["About Us", "Our Gallery", "Our Blogs", "FAQ’S", "Contact Us"].map((t) => (
                  <li key={t}>
                    <a
                      href="#"
                      className="flex items-center gap-3 hover:text-orange-500 transition"
                    >
                      <span className="text-orange-400">
                        <FaAngleDoubleRight />
                      </span>
                      <span className="text-sm">{t}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Our Menu */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Our Menu</h3>
              <ul className="space-y-3 text-gray-300">
                {["Burger King", "Pizza king", "Fresh Food", "Vegetable", "Desserts"].map((t) => (
                  <li key={t}>
                    <a
                      href="#"
                      className="flex items-center gap-3 hover:text-orange-500 transition"
                    >
                      <span className="text-orange-400">
                        <FaAngleDoubleRight />
                      </span>
                      <span className="text-sm">{t}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact Us */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <ul className="text-gray-300 mb-4">
                <li className="mb-2">
                  Monday – Friday: <span className="text-orange-400"> 8am – 4pm </span>
                </li>
                <li>
                  Saturday: <span className="text-orange-400"> 8am – 12am </span>
                </li>
              </ul>

              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <div className="flex items-center gap-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 rounded-md px-2 text-l py-3  text-black placeholder-gray-500 outline-none"
                    style={{ background: "#ffffff", minWidth: 0 }}
                  />
                  <button
                    type="submit"
                    className="w-12 h-12 rounded-md flex items-center justify-center bg-orange-500 hover:bg-orange-600 transition"
                  >
                    <FaArrowRight className="text-white" />
                  </button>
                </div>
                <label className="flex items-start gap-2 text-sm text-gray-300">
                  <input type="checkbox" className="mt-1" />
                  <span>
                    I agree to the{" "}
                    <a href="#" className="text-white underline">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
              </form>
            </div>
          </div>
        </div>

        {/* footer bottom */}
        <div className="mt-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © All Copyright 2024 by{" "}
            <a href="/" className="text-white underline">
              FreshEat
            </a>
          </p>
          <ul className="flex gap-6">
            <li>
              <a className="text-gray-300 hover:text-orange-500 transition" href="#">
                Terms &amp; Condition
              </a>
            </li>
            <li>
              <a className="text-gray-300 hover:text-orange-500 transition" href="#">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* floating orange scroll-up button */}
      <button
        aria-label="scroll to top"
        className="fixed right-6 bottom-6 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg hover:bg-orange-600 transition"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M12 5l7 7H5l7-7z" fill="white" />
        </svg>
      </button>
    </footer>
  );
}
