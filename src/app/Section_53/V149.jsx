"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function V149() {
  const foodItems = [
    {
      name: "Grilled Chicken",
      price: "$26.99",
      img: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/3it60c9478faa3bd340daba36ef23bb62795d?orig=true",
    },
    {
      name: "Veg Supreme Pizza",
      price: "$28.00",
      img: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/3it60e7243419bffe428682999b2315a53174?orig=true",
    },
    {
      name: "Chicken Fried Rice",
      price: "$100.99",
      img: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/3it6006b5e40dfa6448d887f2b06a200671a7?orig=true",
    },
    {
      name: "Egg & Cucumber",
      price: "$20.99",
      img: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/3it607646990323b44e36bdb8a5c4ca270750?orig=true",
    },
    {
      name: "Paneer Tikka",
      price: "$15.50",
      img: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/3it60b43c7151634f425995f01cdbd97bbd05?orig=true",
    },
  ];

  return (
    <section className="bg-[#111] py-16 relative overflow-hidden">
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>

      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-white text-3xl font-extrabold">
            Popular Food Items
          </h2>
        </div>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          speed={3500}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          allowTouchMove={true}
          className="pb-8"
        >
          {foodItems.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="bg-[#1a1a1a] rounded-2xl p-6 mx-auto max-w-sm">
                {/* Food Image + Rotating Circle */}
                <div className="relative mb-6 flex justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="https://gramentheme.com/html/fresheat/assets/img/food-items/circleShape.png"
                      alt="circle"
                      className="w-50 h-50 animate-spin-slow"
                    />
                  </div>

                  <img
                    src={item.img}
                    alt={item.name}
                    className="relative z-10 w-44 h-44 object-cover rounded-full"
                  />
                </div>

                {/* Food Content */}
                <div className="text-center">
                  <h3 className="text-white text-2xl font-bold mb-2">
                    {item.name}
                  </h3>
                  <div className="text-gray-400 text-sm mb-1">
                    The Registration Fee
                  </div>
                  <div className="text-red-500 font-semibold text-xl">
                    {item.price}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
