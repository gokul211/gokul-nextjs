import React from "react";

export default function V52() {
  const bgUrl =
    "https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-21.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com";
  const logoUrl =
    "https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-31.png?storefront_domain=glamourgallery-demo.zohoecommerce.com";

  const linkClass =
    "inline-block text-black hover:text-gray-700 transform hover:scale-95 transition-all duration-150";

  return (
    <footer
      className="hidden md:block w-full"
      style={{
        fontFamily: "'Manrope', sans-serif",
        backgroundImage: `linear-gradient(to bottom, rgba(30,34,45,0.6), rgba(30,34,45,0.6)), url(${bgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Newsletter */}
        <div className="text-center mb-16">
          <h2
            className="mx-auto text-white"
            style={{ fontSize: 56, fontWeight: 700, lineHeight: 1 }}
          >
            Sign Up For Newsletter
          </h2>
          <p className="mt-3 text-base text-white/90">
            Subscribe to the weekly newsletter for all the latest updates
          </p>

          <form
            className="mt-6 inline-flex items-center"
            onSubmit={(e) => e.preventDefault()}
            role="search"
            aria-label="Subscribe to newsletter"
          >
            <label htmlFor="email-web" className="sr-only">
              Email
            </label>
            <input
              id="email-web"
              type="email"
              placeholder="Email"
              aria-label="Email"
              required
              className="appearance-none text-black placeholder-black/70 px-5 py-2.5 bg-white/80 border border-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-white"
              style={{ minWidth: 340 }}
            />
            <button
              type="submit"
              className="bg-white text-black font-bold px-6 py-2.5 rounded-r-lg hover:bg-black hover:text-white transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Main white card */}
        <div className="bg-white rounded-2xl p-8 md:p-12 text-black grid grid-cols-12 gap-8 items-start">
          {/* Left column: logo + constrained text + contact list */}
          <div className="col-span-12 md:col-span-5 flex flex-col">
            <div className="w-full">
              <img
                src={logoUrl}
                alt="Logo"
                width={202}
                height={66}
                loading="lazy"
              />
            </div>

            <div className="mt-6 max-w-[420px] mx-auto md:mx-0 text-center md:text-left">
              <p className="text-sm md:text-base leading-7 text-black/90 font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                feugiat, nibh nec ultrices tristique, arcu urna faucibus lorem,
                at volutpat purus massa eget sapien. Donec sit amet urna non
                metus efficitur commodo.
              </p>
            </div>

            <div className="mt-8 space-y-3 text-sm max-w-[420px] mx-auto md:mx-0 font-medium">
              <div className="flex justify-between ">
                <span className="text-sm">For Return Queries</span>
                <a className="font-medium px-12" href="tel:+911234567890">
                  : +91 12345 67890
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">For Order Queries</span>
                <a className="font-medium px-12" href="tel:+911234567890">
                  : +91 12345 67890
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">For Delivery Queries</span>
                <a className="font-medium px-12" href="tel:+911234567890">
                  : +91 12345 67890
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Write To Us</span>
                <a className="font-medium " href="mailto:info@companyname.com">
                  : info@companyname.com
                </a>
              </div>
            </div>
          </div>

          {/* Right columns: three columns (Shop For / Quick Links / Follow Us On) */}
          <div className="col-span-12 md:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col text-left items-center md:items-start">
              <h3 className="text-lg font-bold mb-3">Shop For</h3>
              <ul className="space-y-2 font-medium">
                <li>
                  <a className={linkClass} href="#">
                    Men's Wears
                  </a>
                </li>
                <li>
                  <a className={linkClass} href="#">
                    Women's Wears
                  </a>
                </li>
                <li>
                  <a className={linkClass} href="#">
                    Kids
                  </a>
                </li>
                <li>
                  <a className={linkClass} href="#">
                    New Arrivals
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col text-left items-center md:items-start">
              <h3 className="text-lg font-bold mb-3">Quick Links</h3>
              <ul className="space-y-2 font-medium">
                <li>
                  <a className={linkClass} href="#">
                    About Us
                  </a>
                </li>
                <li>
                  <a className={linkClass} href="#">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className={linkClass} href="#">
                    Return Policy
                  </a>
                </li>
                <li>
                  <a className={linkClass} href="#">
                    T&C’s
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-left text-left md:items-start">
              <h3 className="text-lg font-bold mb-3">Follow Us On</h3>
              <ul className="space-y-2 font-medium">
                <li>
                  <a className={linkClass} href="#" aria-label="Twitter">
                    Twitter
                  </a>
                </li>
                <li>
                  <a className={linkClass} href="#" aria-label="Pinterest">
                    Pinterest
                  </a>
                </li>
                <li>
                  <a className={linkClass} href="#" aria-label="Facebook">
                    Facebook
                  </a>
                </li>
                <li>
                  <a className={linkClass} href="#" aria-label="LinkedIn">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a className={linkClass} href="#" aria-label="Instagram">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* bottom summary */}
        <div className="mt-8 text-white/90 text-center">
          <div className="inline-block p-2">
            <img src={logoUrl} alt="Logo" width={202} height={66} loading="lazy" />
          </div>
          <p className="mt-4 max-w-2xl mx-auto text-sm text-white/90">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            quis nunc sed mauris posuere cursus.
          </p>
        </div>
      </div>
    </footer>
  );
}