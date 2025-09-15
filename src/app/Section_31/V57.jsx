import React, { useState } from 'react';

const V57 = () => {
  const [activeTab, setActiveTab] = useState('Kids');

  const data = {
    Men: [
      { title: 'T Shirt', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-02.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Casual Shirts', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-03.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Formal Shirts', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-04.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Sweatshirts', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-05.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Jackets', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-06.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Casual Shirts', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-03.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Jeans', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-07.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Casual Trousers', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-08.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Formal Trousers', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-09.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Shorts', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-10.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Joggers', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-11.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Jeans', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-07.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
    ],
    Women: [
      { title: 'Dresses', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-47.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Sarees', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-50.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Ethnic Wear', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-44.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Lehenga', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-48.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'T-shirts', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-51.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Sarees', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-50.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Co-ords', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-42.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Jump Suits', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-46.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Palazzos', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-49.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Jackets', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-45.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Kurtis', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-43.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Jump Suits', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-46.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
    ],
    Kids: [
      { title: 'T Shirt', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-34.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Shirts', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-37.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Shorts', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-36.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Jeans', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-40.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Trousers', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-33.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Shirts', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-37.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Clothing Sets', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-32.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Ethnic Wear', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-41.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Pyjamas', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-38.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Sweater', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-35.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Party Wear', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-39.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
      { title: 'Ethnic Wear', img: 'https://us.zohocommercecdn.com/stock_images/fashion-zs200002/zcstock-images-41.webp?storefront_domain=glamourgallery-demo.zohoecommerce.com', url: '#' },
    ],
  };

  const tabs = ['Men', 'Women', 'Kids'];

  return (
    <div className="bg-white min-h-screen py-6 px-4">
      <div className="max-w-xs mx-auto">
        {/* Header */}
        <h2 className="text-center font-['Manrope',sans-serif] text-lg sm:text-xl md:text-2xl font-semibold uppercase tracking-wider">
          SHOP THE LATEST
        </h2>

        {/* Vertical centered tabs */}
        <div className="flex flex-col items-center mt-6 space-y-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`uppercase tracking-widest text-sm sm:text-base font-semibold focus:outline-none ${
                  isActive ? 'text-black' : 'text-gray-400'
                }`}
                aria-pressed={isActive}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* 3-column grid of rounded cards */}
        <div className="mt-6">
          <div className="grid grid-cols-3 gap-4">
            {data[activeTab].map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                className="relative block w-full h-28 rounded-2xl overflow-hidden shadow-sm"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  title={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <div className="absolute left-3 bottom-3 text-white text-xs font-semibold leading-tight">
                  {item.title}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default V57;