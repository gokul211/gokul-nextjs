"use client";
import { motion } from "framer-motion";
import { FiHeart, FiArrowRight } from "react-icons/fi";
import { CiShoppingBasket } from "react-icons/ci";
import { LuEye } from "react-icons/lu";

export default function V153() {
  const dishes = [
    {
      name: "Chicken Fried Rice",
      price: "$100.99",
      img: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/3it607646990323b44e36bdb8a5c4ca270750?orig=true",
    },
    {
      name: "Chinese Pasta",
      price: "$15.99",
      img: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/3it6006b5e40dfa6448d887f2b06a200671a7?orig=true",
    },
    {
      name: "Chicken Pizza",
      price: "$26.99",
      img: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/3it60e7243419bffe428682999b2315a53174?orig=true",
    },
    {
      name: "Chicken Noodles",
      price: "$39.00",
      img: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/3it60b43c7151634f425995f01cdbd97bbd05?orig=true",
    },
    {
      name: "Grilled Chicken",
      price: "$20.99",
      img: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/3it60c9478faa3bd340daba36ef23bb62795d?orig=true",
    },
  ];

  return (
    <section className="relative bg-[#0d0d0d] py-[80px] sm:py-[100px] text-white overflow-hidden">
      {/* shapes */}
      <div className="absolute right-0 top-10 hidden 2xl:block animate-bounce">
        <img
          src="https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/ssqoge9cd9d71e4644995881f96e3ae1bf30e?orig=true"
          alt="shape right"
          className="w-[180px] sm:w-[220px] h-auto"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="flex justify-center items-center space-x-2">
            <img
              src="https://gramentheme.com/html/fresheat/assets/img/icon/titleIcon.svg"
              alt="icon"
              className="w-5 sm:w-6 h-5 sm:h-6"
            />
            <span className="text-orange-400 font-semibold tracking-wide uppercase text-sm sm:text-base">
              Popular Dishes
            </span>
            <img
              src="https://gramentheme.com/html/fresheat/assets/img/icon/titleIcon.svg"
              alt="icon"
              className="w-5 sm:w-6 h-5 sm:h-6"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-2 sm:mt-3">
            Best Selling Dishes
          </h2>
        </div>

        {/* Dishes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {dishes.map((dish, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="relative group rounded-2xl p-4 sm:p-5 flex flex-col items-center shadow-md overflow-hidden bg-[#1a1a1a] transition-all duration-300"
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundImage =
                  "url('https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/ssqoga707cc85311548bd8c74d142996e4c75?orig=true')")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundImage = "none")
              }
            >
              {/* social icons */}
              <div className="absolute right-3 top-3 flex flex-col items-center z-10">
                <a
                  href="wishlist.html"
                  className="bg-red-600 text-white w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:scale-110 transition"
                >
                  <FiHeart />
                </a>
                <div className="flex flex-col gap-2 mt-2 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                  <a
                    href="cart.html"
                    className="bg-white text-black w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-red-600 hover:text-white transition"
                  >
                    <CiShoppingBasket size={14} />
                  </a>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    className="bg-white text-black w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-red-600 hover:text-white transition"
                  >
                    <LuEye size={14} />
                  </a>
                </div>
              </div>

              {/* dish image */}
              <div className="relative rounded-full overflow-hidden w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
                <img
                  src={dish.img}
                  alt={dish.name}
                  className="rounded-full object-cover w-32 h-32 sm:w-40 sm:h-40 relative z-10"
                />
              </div>

              {/* text */}
              <h3 className="text-base sm:text-lg font-bold mt-3 sm:mt-4 text-center">
                {dish.name}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm">The Registration Fee</p>
              <h6 className="text-red-500 text-base sm:text-lg font-semibold mt-1">
                {dish.price}
              </h6>
            </motion.div>
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center mt-8 sm:mt-10">
          <a
            href="menu2.html"
            className="bg-red-600 hover:bg-red-700 transition px-5 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-semibold flex items-center gap-2 text-sm sm:text-base"
          >
            VIEW ALL ITEM
            <FiArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
