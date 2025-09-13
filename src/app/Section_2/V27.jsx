"use client";
import Image from "next/image";
import { useState } from "react";

export default function V27() {
  const workfromhome = {
    src: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/78cj4ab917312100e4f9cae1f3ca34670d9c2?orig=true",
    alt: "Moon Image",
    title: "Work From Home",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  };

  const office = {
    src: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/78cj4daac7859b42744c1991071fec9409816?orig=true",
    alt: "Sun Image",
    title: "Office",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  };

  const [isMoonHovered, setIsMoonHovered] = useState(false);
  const [isSunHovered, setIsSunHovered] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto p-6 bg-white shadow-2xl rounded-lg border border-gray-200">
      {/* Moon Image Container */}
      <div
        className="relative w-[300px] h-[300px] rounded-lg overflow-hidden shadow-md cursor-pointer"
        onMouseEnter={() => setIsMoonHovered(true)}
        onMouseLeave={() => setIsMoonHovered(false)}
      >
        <Image
          src={workfromhome.src}
          alt={workfromhome.alt}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />

        {/* Moon Overlay */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center p-4 text-white transition-opacity duration-300
            ${isMoonHovered ? "opacity-50" : "opacity-0"}`}
        >
          <h2 className="text-3xl font-extrabold mb-2 text-center">
            {workfromhome.title}
          </h2>
          <ul className="text-sm text-left leading-relaxed list-disc list-inside px-4">
            {workfromhome.description
              .split(". ")
              .map(
                (sentence, index) =>
                  sentence && (
                    <li key={index}>
                      {sentence.trim() +
                        (sentence.endsWith(".") ? "" : ".")}
                    </li>
                  )
              )}
          </ul>
        </div>
      </div>

      {/* Sun Image Container */}
      <div
        className="relative w-[300px] h-[300px] rounded-lg overflow-hidden shadow-md cursor-pointer"
        onMouseEnter={() => setIsSunHovered(true)}
        onMouseLeave={() => setIsSunHovered(false)}
      >
        <Image
          src={office.src}
          alt={office.alt}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />

        {/* Sun Overlay */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center p-4 text-white transition-opacity duration-300
            ${isSunHovered ? "opacity-50" : "opacity-0"}`}
        >
          <h2 className="text-3xl font-extrabold mb-2 text-center">
            {office.title}
          </h2>
          <ul className="text-sm text-left leading-relaxed list-disc list-inside px-4">
            {office.description
              .split(". ")
              .map(
                (sentence, index) =>
                  sentence && (
                    <li key={index}>
                      {sentence.trim() +
                        (sentence.endsWith(".") ? "" : ".")}
                    </li>
                  )
              )}
          </ul>
        </div>
      </div>
    </div>
  );
}



