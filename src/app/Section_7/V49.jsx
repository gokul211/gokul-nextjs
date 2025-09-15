import React from "react";

export default function V49() {
  const bgUrl =
    "https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-21.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com";
  const logoUrl =
    "https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-31.png?storefront_domain=glamourgallery-demo.zohoecommerce.com";

  const linkClass =
    "inline-block text-black hover:text-gray-700 transform hover:scale-95 transition-all duration-150";

  return (
    <footer
      className="w-full"      /* <-- was: "block md:hidden w-full" */
      style={{
        fontFamily: "'Manrope', sans-serif",
        backgroundImage: `linear-gradient(to bottom, rgba(30,34,45,0.6), rgba(30,34,45,0.6)), url(${bgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      {/* outer container made responsive so content remains centered on large screens */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-14">
        {/* Newsletter hero — same copy as V52 but scaled for mobile */}
        <div className="text-center mb-10">
          <h2
            className="mx-auto text-white font-extrabold"
            style={{ fontSize: 32, lineHeight: 1.05 }}
          >
            Sign Up For Newsletter
          </h2>
          <p className="mt-2 text-sm text-white/90">
            Subscribe to the weekly newsletter for all the latest updates
          </p>

          <form
            className="mt-5 inline-flex items-center w-full justify-center"
            onSubmit={(e) => e.preventDefault()}
            role="search"
            aria-label="Subscribe to newsletter"
          >
            <input
              type="email"
              placeholder="Email"
              aria-label="Email"
              required
              className="appearance-none text-black placeholder-black/70 px-4 py-2.5 bg-white/80 border border-white rounded-l-lg flex-1"
              style={{ minWidth: 0, maxWidth: 520 }}
            />
            <button
              type="submit"
              className="bg-white text-black font-bold px-4 py-2.5 rounded-r-lg hover:bg-black hover:text-white transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Main white card — content preserved, but inner links layout adjusted for mobile */}
        <div className="bg-white rounded-2xl p-6 text-black shadow-md relative overflow-visible max-w-[720px] mx-auto">
          {/* Left column content (logo, description, contacts) — same text */}
          <div className="flex flex-col items-center text-left">
            <img src={logoUrl} alt="Logo" width={180} height={60} loading="lazy" />
            <div className="mt-5 max-w-[360px] text-sm leading-7 text-black/90 font-medium">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                feugiat, nibh nec ultrices tristique, arcu urna faucibus lorem,
                at volutpat purus massa eget sapien. Donec sit amet urna non
                metus efficitur.
              </p>
            </div>

            {/* horizontal line */}
            <hr className="my-4 border-t border-gray-200 w-full max-w-[360px]" />

            <div className="mt-5 w-full max-w-[360px] space-y-3 text-sm font-medium">
              <div className="flex justify-between ">
                <span className="text-sm">For Return Queries</span>
                <a className="font-medium px-8" href="tel:+911234567890">: +91 12345 67890</a>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">For Order Queries</span>
                <a className="font-medium px-8" href="tel:+911234567890">: +91 12345 67890</a>
              </div>
              <div className="flex justify-between">
                <span className="text-sm ">For Delivery Queries</span>
                <a className="font-medium px-8" href="tel:+911234567890">: +91 12345 67890</a>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Write To Us</span>
                <a className="font-medium px-5" href="mailto:info@company.com">: info@company.com</a>
              </div>
            </div>
          </div>

          {/* Links area: two columns */}
          <div className="mt-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="pr-3">
                <h3 className="text-base font-bold mb-2 text-left">Shop For</h3>
                <ul className="space-y-2 font-medium text-sm text-left">
                  <li><a className={linkClass} href="#">Men's Wears</a></li>
                  <li><a className={linkClass} href="#">Women's Wears</a></li>
                  <li><a className={linkClass} href="#">Kids</a></li>
                  <li><a className={linkClass} href="#">New Arrivals</a></li>
                </ul>
              </div>

              <div className="pl-3">
                <h3 className="text-base font-bold mb-2 text-left">Quick Links</h3>
                <ul className="space-y-2 font-medium text-sm text-left">
                  <li><a className={linkClass} href="#">About Us</a></li>
                  <li><a className={linkClass} href="#">Privacy Policy</a></li>
                  <li><a className={linkClass} href="#">Return Policy</a></li>
                  <li><a className={linkClass} href="#">T&C’s</a></li>
                </ul>
              </div>
            </div>

            {/* Follow Us On */}
            <div className="mt-5 pt-4 border-t border-gray-100">
              <h3 className="text-base font-bold mb-3 text-center">Follow Us On</h3>
              <div className="flex items-center justify-center gap-3 text-sm">
                <a className="text-black hover:text-gray-700" href="#">Twitter</a>
                <span className="text-gray-300">•</span>
                <a className="text-black hover:text-gray-700" href="#">Pinterest</a>
                <span className="text-gray-300">•</span>
                <a className="text-black hover:text-gray-700" href="#">Facebook</a>
                <span className="text-gray-300">•</span>
                <a className="text-black hover:text-gray-700" href="#">Instagram</a>
              </div>
            </div>
          </div>
        </div>

        {/* bottom summary - same as V52 but scaled */}
        <div className="mt-6 text-center text-white/90">
          <div className="inline-block p-2">
            <img src={logoUrl} alt="Logo" width={140} height={46} loading="lazy" />
          </div>
          <p className="mt-3 max-w-xs mx-auto text-xs text-white/85">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            quis nunc sed mauris posuere cursus.
          </p>
        </div>
      </div>
    </footer>
  );
}