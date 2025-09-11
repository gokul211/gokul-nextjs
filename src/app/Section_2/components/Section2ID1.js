import Image from "next/image";

export default function Section2ID1() {
  const titleText = "Moon Light";

  return (
    <div id="section1-container"> 
      <h1 className="text-5xl text-center font-extrabold text-gray-900 mb-8">Section 1</h1> 
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      
        <div className="flex-shrink-0">
          <Image
            src="data:image/jpeg;base64,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"
            alt="Moon Image"
            width={400}
            height={300}
            className="rounded-lg shadow-md"
          />
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
            {titleText}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Explore the wonders of the cosmos with our in-depth look at the Moon. From its ancient craters to its mysterious dark side, the Moon has captivated humanity for millennia. Learn about its formation, its phases, and its profound impact on Earth&apos;s tides and ecosystems.
          </p>
       
        </div>
      </div>
    </div>
  );
}