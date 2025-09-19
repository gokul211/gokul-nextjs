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

export default function V177() {
  return (
    <footer
      className="text-white"
      style={{
        background:
          "radial-gradient(800px 400px at 10% 80%, rgba(255,120,25,0.05), transparent 8%), linear-gradient(180deg,#07151b 0%, #051018 100%)",
        overflow: "hidden",
      }}
    >
      {/* subtle decorative shape */}
      <img
        src="https://gramentheme.com/html/fresheat/assets/img/shape/footerShape1_2.png"
        alt=""
        className="absolute left-0 bottom-6 w-20 opacity-30 pointer-events-none"
      />

      <style jsx>{`
        @keyframes pumpMobile {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .pump {
          animation: pumpMobile 3s ease-in-out infinite;
        }
      `}</style>

      {/* Top orange info bar (mobile-first layout, shown on all screens) */}
      <div className="max-w-md mx-auto px-5 pt-8">
        <div
          className="mx-auto rounded-2xl px-4 py-6 flex flex-col gap-4 shadow-md"
          style={{ backgroundColor: "#ff7a1a" }}
        >
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <FaMapMarkerAlt className="text-white text-lg" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-white/90 uppercase tracking-wide">Address</div>
              <div className="text-white font-semibold text-sm leading-tight">
                4648 Rocky Road, Philadelphia
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <FaEnvelope className="text-white text-lg" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-white/90 uppercase tracking-wide">Send Email</div>
              <div className="text-white font-semibold text-sm leading-tight">info@exmple.com</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <FaPhoneAlt className="text-white text-lg" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-white/90 uppercase tracking-wide">Call Emergency</div>
              <div className="text-white font-semibold text-sm leading-tight">+88 0123 654 99</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer content (mobile-stacked, but visible on all sizes) */}
      <div className="max-w-md mx-auto px-5">
        <div
          className="mt-6 rounded-2xl p-5"
          style={{ background: "#07121a", borderRadius: 20 }}
        >
          {/* Logo + about + socials */}
          <div className="mb-4">
            <a href="/" className="inline-flex items-center gap-3">
              <img
                src="https://gramentheme.com/html/fresheat/assets/img/logo/logoWhite.svg"
                alt="logo"
                className="h-9 w-auto"
              />
            </a>
            <p className="text-gray-300 leading-relaxed mt-3 text-sm">
              Phasellus ultricies aliquam volutpat ullamcorper laoreet neque, a lacinia curabitur
              lacinia mollis
            </p>

            <div className="flex gap-3 mt-4">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube].map((Icon, i) => (
                <a
                  key={i}
                  className="w-10 h-10 rounded-full bg-black/25 flex items-center justify-center hover:bg-orange-500 transition pump"
                  href="#"
                  aria-label="social"
                >
                  <Icon className="text-white text-base" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {["About Us", "Our Gallery", "Our Blogs", "FAQ’S", "Contact Us"].map((t) => (
                <li key={t}>
                  <a
                    href="#"
                    className="flex items-center gap-3 text-gray-300 hover:text-orange-500 transition"
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

          {/* Our Menu */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-3">Our Menu</h3>
            <ul className="space-y-2">
              {["Burger King", "Pizza king", "Fresh Food", "Vegetable", "Desserts"].map((t) => (
                <li key={t}>
                  <a
                    href="#"
                    className="flex items-center gap-3 text-gray-300 hover:text-orange-500 transition"
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

          {/* Contact Us & newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <ul className="text-gray-300 mb-3 text-sm">
              <li className="mb-1">
                Monday – Friday: <span className="text-orange-400"> 8am – 4pm </span>
              </li>
              <li>
                Saturday: <span className="text-orange-400"> 8am – 12am </span>
              </li>
            </ul>

            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 rounded-md px-3 py-3 text-sm text-black placeholder-gray-500 outline-none"
                  style={{ background: "#ffffff" }}
                  aria-label="email"
                />
                <button
                  type="submit"
                  className="w-12 h-12 rounded-md flex items-center justify-center bg-orange-500 hover:bg-orange-600 transition"
                  aria-label="subscribe"
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

        {/* footer bottom (centered) */}
        <div className="mt-4 py-5 text-center">
          <p className="text-gray-400 text-sm">
            © All Copyright 2024 by{" "}
            <a href="/" className="text-white underline">
              FreshEat
            </a>
          </p>
          <div className="flex justify-center gap-4 mt-3">
            <a className="text-gray-300 hover:text-orange-500 transition text-sm" href="#">
              Terms &amp; Condition
            </a>
            <a className="text-gray-300 hover:text-orange-500 transition text-sm" href="#">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      {/* floating scroll-up button */}
      <button
        aria-label="scroll to top"
        className="fixed right-4 bottom-4 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg hover:bg-orange-600 transition z-40"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 6l6 6H6l6-6z" fill="white" />
        </svg>
      </button>
    </footer>
  );
}