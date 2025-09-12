import Image from "next/image";
import { useState, useEffect } from "react";

export default function V14() {
  const descriptionText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam ";
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [gradientPosition, setGradientPosition] = useState(100); // Start at 100 for full black, move to 0 for clear

  useEffect(() => {
    if (textIndex < descriptionText.length) {
      const textTimer = setTimeout(() => {
        setDisplayedText((prev) => prev + descriptionText[textIndex]);
        setTextIndex((prev) => prev + 1);

        // Update gradient position based on text display progress (reverse for black to clear)
        setGradientPosition(100 - (textIndex / descriptionText.length) * 100);
      }, 20); // Adjust typing speed as needed (milliseconds per character)
      return () => clearTimeout(textTimer);
    } else {
      // Ensure gradient is fully clear once text is done
      setGradientPosition(0);
    }
  }, [textIndex, descriptionText]);

  return (
    <div className="flex flex-col md:flex-row-reverse items-center gap-8 max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Image on the left (or top on small screens) */}
      <div className="flex-shrink-0 relative w-[400px] h-[300px] overflow-hidden rounded-lg shadow-md">
        <Image
          src="https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/0cfcc8dc8cbdcb409480aa3ebae4533ed3d24?orig=true"
          alt="Moon Image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        {/* Overlay for the black to white gradient effect (reversed) */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top left, rgba(0,0,0,1) ${gradientPosition - 20}%, rgba(255,255,255,0) ${gradientPosition + 20}%)`,
            transition: 'background 0.1s linear',
          }}
        ></div>
      </div>

      {/* Title and Description on the right (or bottom on small screens) */}
      <div className="text-center md:text-left">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
          <span role="img" aria-label="moon">🌙</span> Moon Light
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          {displayedText}
        </p>
      </div>
    </div>
  );
}