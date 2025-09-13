"use client";
import React, { useEffect, useRef, useState } from "react";

export default function V36() {
  const testimonials = [
    {
      quoteIcon: "https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684e72bf66233c7798279e58_Group%2011.svg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      authorImage: "https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684e8279a606bebae591aa7b_image%20(5).webp",
      authorName: "Sarah Johnson",
      authorTitle: "Sales Manager, BrightWave Inc.",
      animation: 'slide-right', // Example animation type
    },
    {
      quoteIcon: "https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684e72bf66233c7798279e58_Group%2011.svg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      authorImage: "https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684e83bcdf9e87aadaf3c6fd_image%20(6).webp",
      authorName: "Daniel Wright,",
      authorTitle: "Managing Partner, Horizon Retail Group",
      animation: 'slide-up',
    },
    {
      quoteIcon: "https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684e72bf66233c7798279e58_Group%2011.svg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      authorImage: "https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684e83bcba2fb15b5358602b_image%20(7).webp",
      authorName: "Jessica Martin",
      authorTitle: "Marketing Lead, EcoTrend Solutions",
      animation: 'slide-left',
    },
    {
      quoteIcon: "https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684e72bf66233c7798279e58_Group%2011.svg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      authorImage: "https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684e84a3fd686a30634b2189_image%20(8).webp",
      authorName: "Mark Thompson",
      authorTitle: "CEO, GreenPath Retail",
      animation: 'slide-right',
    },
    {
      quoteIcon: "https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684e72bf66233c7798279e58_Group%2011.svg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      authorImage: "https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684e84a313d652f0911de376_image%20(9).webp",
      authorName: "Rachel Kim",
      authorTitle: "Financial Analyst, Zenith Corp",
      animation: 'slide-up',
    },
    {
      quoteIcon: "https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684e72bf66233c7798279e58_Group%2011.svg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      authorImage: "https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684e84a345f90c0ce816a55e_image%20(10).webp",
      authorName: "David Singh",
      authorTitle: "Chief Operating Officer, Horizon Logistics",
      animation: 'slide-left',
    },
    {
      quoteIcon: "https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684e72bf66233c7798279e58_Group%2011.svg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      authorImage: "https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684e84a355983fae093306f4_image%20(11).webp",
      authorName: "Carlos Perez",
      authorTitle: "COO, Streamline Ventures",
      animation: 'slide-right',
    },
    {
      quoteIcon: "https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684e72bf66233c7798279e58_Group%2011.svg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      authorImage: "https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684e84a35d448aa85931da86_image%20(12).webp",
      authorName: "Liam O’Connor",
      authorTitle: "Founder, GlowTech Enterprises",
      animation: 'slide-up',
    },
    {
      quoteIcon: "https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684e72bf66233c7798279e58_Group%2011.svg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      authorImage: "https://cdn.prod.website-files.com/68487f7195aeb42041c38e2e/684e84a3958abbf77e541281_image%20(13).webp",
      authorName: "Michel Chen,",
      authorTitle: "CEO, Fresh Bloom Organics",
      animation: 'slide-left',
    },
  ];

  const TestimonialCard = ({ quoteIcon, text, authorImage, authorName, authorTitle, animation }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // Set isVisible based on whether the element is intersecting
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.1 } // Adjust threshold as needed
      );

      const currentRef = cardRef.current;

      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, []);

    const getAnimationClasses = (animationType, isVisibleState) => {
      if (!isVisibleState) {
        // Initial hidden state or when scrolled out of view
        switch (animationType) {
          case 'slide-right': return 'opacity-0 -translate-x-full';
          case 'slide-up': return 'opacity-0 translate-y-full';
          case 'slide-down': return 'opacity-0 -translate-y-full';
          case 'slide-left': return 'opacity-0 translate-x-full';
          case 'zoom-in': return 'opacity-0 scale-80';
          default: return 'opacity-0 translate-y-5'; // Default hidden state
        }
      } else {
        // Visible state, apply animation
        switch (animationType) {
          case 'slide-right': return 'animate-slide-right-slow';
          case 'slide-up': return 'animate-slide-up-slow';
          case 'slide-down': return 'animate-slide-down-slow';
          case 'slide-left': return 'animate-slide-left-slow';
          case 'zoom-in': return 'animate-zoom-in-slow';
          default: return 'animate-slide-up-slow'; // Default visible animation
        }
      }
    };

    return (
      <div
        ref={cardRef}
        className={`bg-white p-6 rounded-lg shadow-md flex flex-col items-start transition-all duration-1000 ease-in-out
          ${getAnimationClasses(animation, isVisible)}`}
      >
        <div className="mb-4">
          <img src={quoteIcon} loading="lazy" alt="Quote Icon" className="w-8 h-8" />
        </div>
        <p className="text-base text-gray-700 mb-4 leading-relaxed">{text}</p>
        <div className="flex items-center mt-auto">
          <img src={authorImage} loading="lazy" alt="Author" className="w-10 h-10 rounded-full mr-3 object-cover" />
          <div>
            <p className="text-sm font-medium text-gray-900">{authorName}</p>
            <p className="text-xs text-gray-600">{authorTitle}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="testimonial" className="py-12 px-5 bg-gray-100">
      <style jsx>{`
        @keyframes slide-right-slow {
          from { opacity: 0; transform: translateX(-100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-up-slow {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-down-slow {
          from { opacity: 0; transform: translateY(-100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-left-slow {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes zoom-in-slow {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-slide-right-slow { animation: slide-right-slow 1.5s ease-out forwards; }
        .animate-slide-up-slow { animation: slide-up-slow 1.5s ease-out forwards; }
        .animate-slide-down-slow { animation: slide-down-slow 1.5s ease-out forwards; }
        .animate-slide-left-slow { animation: slide-left-slow 1.5s ease-out forwards; }
        .animate-zoom-in-slow { animation: zoom-in-slow 1.5s ease-out forwards; }
      `}</style>
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Testimonial</div>
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Feedback That Speaks Volumes
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quoteIcon={testimonial.quoteIcon}
              text={testimonial.text}
              authorImage={testimonial.authorImage}
              authorName={testimonial.authorName}
              authorTitle={testimonial.authorTitle}
              animation={testimonial.animation}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


