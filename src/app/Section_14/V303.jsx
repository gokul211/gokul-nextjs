import React from 'react';

const V303 = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 flex justify-between">
          <a href="/" className="inline-block">
            <img src="https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ac0_nav%20logo.svg" loading="lazy" alt="hautech.ai" className="footer-logo-img h-8" />
          </a>
        
          <div className="grid grid-cols-4 gap-12">
            {/* Column 1 */}
            <div className="flex flex-col gap-3 text-left">
              <a href="#" className="text-white transition-colors">Reviews</a>
              <a href="#" className="text-white hover:text-[#f4893a] transition-colors">Use cases</a>
              <a href="#" className="text-white hover:text-[#f4893a] transition-colors">Benefits</a>
              <a href="#" className="text-white hover:text-[#f4893a] transition-colors">Pricing</a>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-3 text-left">
              <div className="text-white mb-1">About Us</div>
              <a href="#" className="text-white hover:text-[#f4893a] transition-colors">Tools</a>
              <a href="#" className="text-white hover:text-[#f4893a] transition-colors">Interfaces</a>
              <a href="#" className="text-white hover:text-[#f4893a] transition-colors">FAQ</a>
              <a href="#" className="text-white hover:text-[#f4893a] transition-colors">Get in Touch</a>
              <a href="#" className="text-white hover:text-[#f4893a] transition-colors">Blog</a>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-3 text-left">
              <div className="text-white mb-1">AI models</div>
              <a href="#" className="text-white hover:text-[#f4893a] transition-colors">Naomi</a>
              <a href="#" className="text-white hover:text-[#f4893a] transition-colors">Linda</a>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-3 text-left">
              <div className="text-white mb-1">Write to us</div>
              <a href="#" className="text-white hover:text-[#f4893a] transition-colors mb-4">hello@hautech.ai</a>
              <div className="text-white mb-2">Follow us</div>
              <div className="flex gap-3 mb-4">
                <a href="#" className="w-10 h-10 flex items-center justify-center border border-white rounded hover:bg-white hover:text-black transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z" fill="currentColor"/>
                    <path d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z" fill="currentColor"/>
                    <path d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z" fill="currentColor"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z" fill="currentColor"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center border border-white rounded hover:bg-white hover:text-black transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 25 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.4717 18C15.7854 18 18.4717 15.3137 18.4717 12C18.4717 8.68629 15.7854 6 12.4717 6C9.15797 6 6.47168 8.68629 6.47168 12C6.47168 15.3137 9.15797 18 12.4717 18ZM12.4717 16C14.6808 16 16.4717 14.2091 16.4717 12C16.4717 9.79086 14.6808 8 12.4717 8C10.2625 8 8.47168 9.79086 8.47168 12C8.47168 14.2091 10.2625 16 12.4717 16Z" fill="currentColor"/>
                    <path d="M18.4717 5C17.9194 5 17.4717 5.44772 17.4717 6C17.4717 6.55228 17.9194 7 18.4717 7C19.024 7 19.4717 6.55228 19.4717 6C19.4717 5.44772 19.024 5 18.4717 5Z" fill="currentColor"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.12564 4.27606C1.47168 5.55953 1.47168 7.23969 1.47168 10.6V13.4C1.47168 16.7603 1.47168 18.4405 2.12564 19.7239C2.70088 20.8529 3.61876 21.7708 4.74774 22.346C6.03121 23 7.71137 23 11.0717 23H13.8717C17.232 23 18.9122 23 20.1956 22.346C21.3246 21.7708 22.2425 20.8529 22.8177 19.7239C23.4717 18.4405 23.4717 16.7603 23.4717 13.4V10.6C23.4717 7.23969 23.4717 5.55953 22.8177 4.27606C22.2425 3.14708 21.3246 2.2292 20.1956 1.65396C18.9122 1 17.232 1 13.8717 1H11.0717C7.71137 1 6.03121 1 4.74774 1.65396C3.61876 2.2292 2.70088 3.14708 2.12564 4.27606ZM13.8717 3H11.0717C9.35852 3 8.19393 3.00156 7.29376 3.0751C6.41692 3.14674 5.96852 3.27659 5.65572 3.43597C4.90307 3.81947 4.29115 4.43139 3.90765 5.18404C3.74827 5.49684 3.61842 5.94524 3.54678 6.82208C3.47324 7.72225 3.47168 8.88684 3.47168 10.6V13.4C3.47168 15.1132 3.47324 16.2777 3.54678 17.1779C3.61842 18.0548 3.74827 18.5032 3.90765 18.816C4.29115 19.5686 4.90307 20.1805 5.65572 20.564C5.96852 20.7234 6.41692 20.8533 7.29376 20.9249C8.19393 20.9984 9.35852 21 11.0717 21H13.8717C15.5849 21 16.7494 20.9984 17.6496 20.9249C18.5265 20.8533 18.9749 20.7234 19.2877 20.564C20.0403 20.1805 20.6522 19.5686 21.0357 18.816C21.1951 18.5032 21.325 18.0548 21.3966 17.1779C21.4701 16.2777 21.4717 15.1132 21.4717 13.4V10.6C21.4717 8.88684 21.4701 7.72225 21.3966 6.82208C21.325 5.94524 21.1951 5.49684 21.0357 5.18404C20.6522 4.43139 20.0403 3.81947 19.2877 3.43597C18.9749 3.27659 18.5265 3.14674 17.6496 3.0751C16.7494 3.00156 15.5849 3 13.8717 3Z" fill="currentColor"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center border border-white rounded hover:bg-white hover:text-black transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z" fill="currentColor"/>
                    <path d="M15.5204 7.19333C14.9974 6.5863 14.7091 5.80687 14.7092 5H12.3444V14.6444C12.3265 15.1665 12.1098 15.6611 11.74 16.0238C11.3702 16.3866 10.8762 16.5892 10.3622 16.5889C9.27551 16.5889 8.37245 15.6867 8.37245 14.5667C8.37245 13.2289 9.64286 12.2256 10.9515 12.6378V10.18C8.31122 9.82222 6 11.9067 6 14.5667C6 17.1567 8.11225 19 10.3546 19C12.7577 19 14.7092 17.0167 14.7092 14.5667V9.67444C15.6681 10.3743 16.8194 10.7498 18 10.7478V8.34444C18 8.34444 16.5612 8.41444 15.5204 7.19333Z" fill="currentColor"/>
                  </svg>
                </a>
              </div>
              <a href="#" className="text-white hover:text-[#f4893a] transition-colors">Privacy Policy</a>
              <a href="#" className="text-white hover:text-[#f4893a] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex justify-between items-center">
          <div className="text-white text-sm">
            Pioneering AI for the Fashion Industry | Hautech.ai © 2024
          </div>
          <div className="flex items-center gap-2 text-#f4893a text-sm">
            <span>Made by</span>
            <a href="#" className="hover:text-white transition-colors">
              <span className="font-semibold">adelt</span>
            </a>
            <span>with</span>
            <span className="text-red-500">❤️</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default V303;