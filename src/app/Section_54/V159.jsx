"use client";
import { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaQuoteRight,
  FaStar,
  FaRegStar,
} from "react-icons/fa";

export default function V159() {
  const testimonials = [
    {
      name: "Albert Flores",
      role: "Web Designer",
      image:
        "https://gramentheme.com/html/fresheat/assets/img/testimonial/testimonialProfile1_1.png",
      rating: 4,
      text: "Penatibus magnis dis point parturient montes nascetur ridiculus mus Ut id lorem ac enim the vestibulum blandit nec sit amet felis.",
    },
    {
      name: "Courtney Henry",
      role: "App Developer",
      image:
        "https://gramentheme.com/html/fresheat/assets/img/testimonial/testimonialProfile1_1.png",
      rating: 5,
      text: "Penatibus magnis dis point parturient montes nascetur ridiculus mus Ut id lorem ac enim the vestibulum blandit nec sit amet felis.",
    },
    {
      name: "Jane Cooper",
      role: "UX Specialist",
      image:
        "https://gramentheme.com/html/fresheat/assets/img/testimonial/testimonialProfile1_1.png",
      rating: 5,
      text: "Penatibus magnis dis point parturient montes nascetur ridiculus mus Ut id lorem ac enim the vestibulum blandit nec sit amet felis.",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="testimonial-wrapper style1 relative bg-[#0f0f0f] text-white py-16 overflow-hidden">
      <div className="container mx-auto flex flex-col xl:flex-row items-center justify-between gap-10 relative">
        {/* Left Side (Image + Rotating Circle) */}
        <div className="relative w-full xl:w-6/12 flex justify-center xl:justify-start items-center">
          <img
            src="https://gramentheme.com/html/fresheat/assets/img/testimonial/testimonialThumb1_1.png"
            alt="chef"
            className="relative z-10 w-[90%] sm:w-[400px] xl:w-[750px] max-w-none h-auto object-cover"
          />

          {/* Rotating Circle Play Button */}
          <div className="absolute inset-0 flex justify-center items-center z-20">
            <a
              href="https://www.youtube.com/watch?v=f2Gzr8sAGB8"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex justify-center items-center video-wrap cir36"
            >
              <img
                src="https://gramentheme.com/html/fresheat/assets/img/shape/player.svg"
                alt="circle"
                className="w-20 h-20 sm:w-28 sm:h-28 xl:w-32 xl:h-32"
              />
              <div className="absolute bg-white text-black w-10 h-10 sm:w-12 sm:h-12 rounded-full flex justify-center items-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 sm:w-6 sm:h-6 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 3l14 9-14 9V3z" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* Right Side (Testimonial Slider) */}
        <div className="relative z-30 w-full xl:w-6/12 max-w-xl text-gray-700 min-h-[200px] flex flex-col items-center xl:items-start">
          {/* Section Title */}
          <div className="flex justify-center items-center mb-4">
            <img
              src="https://gramentheme.com/html/fresheat/assets/img/icon/titleIcon.svg"
              className="w-6 mr-2"
              alt="icon"
            />
            <span className="text-orange-500 uppercase tracking-widest font-semibold">
              Testimonials
            </span>
            <img
              src="https://gramentheme.com/html/fresheat/assets/img/icon/titleIcon.svg"
              className="w-6 ml-2"
              alt="icon"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center xl:text-left text-white">
            What Our Clients Say
          </h2>

          {/* Slider Wrapper */}
          <div className="w-full overflow-hidden relative">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="w-full flex-shrink-0 px-2"
                  style={{ minWidth: "100%" }}
                >
                  {/* Card */}
                  <div className="bg-white text-gray-700 rounded-xl shadow-2xl p-6 sm:p-8 border-t-4 border-orange-500">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <img
                          src={t.image}
                          alt={t.name}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full mr-4 flex-shrink-0"
                        />
                        <div>
                          <h6 className="font-bold text-black">{t.name}</h6>
                          <p className="text-sm">{t.role}</p>
                          <div className="flex text-orange-500 text-sm sm:text-base">
                            {[...Array(5)].map((_, j) =>
                              j < t.rating ? (
                                <FaStar key={j} />
                              ) : (
                                <FaRegStar key={j} />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                      <FaQuoteRight className="text-orange-500 text-2xl sm:text-3xl ml-4 flex-shrink-0" />
                    </div>
                    <p className="leading-relaxed text-sm sm:text-base">
                      {t.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation BELOW */}
          <div className="flex justify-center xl:justify-start mt-6 gap-3">
            <button
              onClick={prevSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600 flex justify-center items-center"
            >
              <FaArrowLeft className="text-white text-sm sm:text-base" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600 flex justify-center items-center"
            >
              <FaArrowRight className="text-white text-sm sm:text-base" />
            </button>
          </div>
        </div>
      </div>

      {/* Background Shape */}
      {/* <img
        src="https://gramentheme.com/html/fresheat/assets/img/shape/testimonialShape1_1.png"
        alt="shape"
        className="absolute top-40 right-0 w-40 sm:w-52 opacity-70 animate-spin-slow"
      /> */}

      {/* CSS for cir36 animation */}
      <style jsx>{`
        .video-wrap {
          position: relative;
          z-index: 6;
        }
        .cir36 {
          animation: cir36 20s linear infinite;
        }
        @keyframes cir36 {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
