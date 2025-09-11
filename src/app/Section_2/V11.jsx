import Image from "next/image";
import { useState, useEffect } from "react";

export default function V11() {
  const titleText = "Moon";
  const [displayedTitle, setDisplayedTitle] = useState("Moon Light");

  const moonImage = {
    src: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/0cfcc8dc8cbdcb409480aa3ebae4533ed3d24?orig=true",
    alt: "Moon Image",
    description: "Explore the wonders of the cosmos with our in-depth look at the Moon. From its ancient craters to its mysterious dark side, the Moon has captivated humanity for millennia. Learn about its formation, its phases, and its profound impact on Earth's tides and ecosystems."
  };

  const sunImage = {
    src: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/0cfcc9cbf39214f594b14938e94a85addfad3?orig=true",
    alt: "Sun Image",
    description: "Witness the majestic power of the Sun, the star at the heart of our solar system. Discover its fiery surface, solar flares, and its vital role in sustaining life on Earth. The Sun's energy drives weather patterns, powers photosynthesis, and illuminates our days."
  };

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setDisplayedTitle(isHovered ? "Sun Light" : "Moon Light");
  }, [isHovered]);

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg border border-gray-200">
      <div
        className="flex-shrink-0 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={isHovered ? sunImage.src : moonImage.src}
          alt={isHovered ? sunImage.alt : moonImage.alt}
          width={400}
          height={300}
          className="rounded-lg shadow-md transition-opacity duration-300"
        />
      </div>

      <div className="text-center md:text-left">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
          {displayedTitle}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          {isHovered ? sunImage.description : moonImage.description}
        </p>
    
      </div>
    </div>
  );
}






