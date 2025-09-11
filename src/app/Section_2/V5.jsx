import Image from "next/image";
import { useState, useEffect } from "react";

export default function V5() {
  const titleText = "Moon";
  const [displayedTitle, setDisplayedTitle] = useState("");

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedTitle((prev) => prev + titleText[index]);
      index++;
      if (index === titleText.length) {
        clearInterval(intervalId);
      }
    }, 100); // Adjust typing speed here (milliseconds)

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Image on the left (or top on small screens) */}
      <div className="flex-shrink-0">
        <Image
          src="https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/0cfcc8dc8cbdcb409480aa3ebae4533ed3d24?orig=true" // **IMPORTANT: Replace with your actual moon image path**
          alt="Moon Image"
          width={400}
          height={300}
          className="rounded-lg shadow-md"
        />
      </div>

      {/* Title and Description on the right (or bottom on small screens) */}
      <div className="text-center md:text-left">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4 animate-pulse">
          {displayedTitle}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Explore the wonders of the cosmos with our in-depth look at the Moon. From its ancient craters to its mysterious dark side, the Moon has captivated humanity for millennia. Learn about its formation, its phases, and its profound impact on Earth's tides and ecosystems.
        </p>
        {/* <p className="text-lg text-gray-700 leading-relaxed">
          Our journey into lunar exploration covers everything from early observations to modern scientific missions. Discover the groundbreaking discoveries made by astronauts and robotic probes, and ponder the future of lunar colonization and resource utilization. The Moon is not just a celestial body; it's a gateway to understanding our place in the universe.
        </p> */}
      </div>
    </div>
  );
}