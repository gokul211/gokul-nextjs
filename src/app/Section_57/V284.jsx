'use client';

import { useState, useEffect } from 'react';

export function V284() {
  const [activeTab, setActiveTab] = useState('tab1');

  useEffect(() => {
    // Restart videos in the active tab
    const activePane = document.getElementById(activeTab);
    if (activePane) {
      const videos = activePane.querySelectorAll('video');
      videos.forEach(video => {
        video.currentTime = 0;
        video.play();
      });
    }
  }, [activeTab]);

  const tabs = [
    { id: 'tab1', label: 'Product cards' },
    { id: 'tab2', label: 'Total look' },
    { id: 'tab3', label: 'Ads' },
    { id: 'tab4', label: 'AI photo editor' },
    { id: 'tab5', label: 'Cropped faces' },
    { id: 'tab6', label: 'Abstract Fashion' }
  ];

  return (
    <section id="cases-mobile" className="w-full px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-black mb-2">
          Use cases
        </h2>
      </div>

      {/* Mobile Tabs - Horizontal Scroll */}
      <div className="mb-6">
        <div className="flex overflow-x-auto gap-2 pb-3 hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Container */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        
        {/* Tab 1: Product Cards */}
        <div
          id="tab1"
          className={`${
            activeTab === 'tab1' ? 'block' : 'hidden'
          }`}
        >
          <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-black">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src="https://cdn.website.hautech.ai/cdn/product%20cards%20mobile.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-black">
            Product cards
          </h3>
          <div className="text-gray-600 text-sm leading-relaxed">
            Create consistent, professional product images across your catalog.
          </div>
        </div>

        {/* Tab 2: Total Look */}
        <div
          id="tab2"
          className={`${
            activeTab === 'tab2' ? 'block' : 'hidden'
          }`}
        >
          <div className="relative mb-4">
            <h3 className="text-xl font-semibold text-white absolute top-4 left-4 z-10">
              Total look
            </h3>
            <img
              src="https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80b3f_product%20cards%20mob%20new.jpg"
              alt="Total look"
              className="w-full rounded-xl"
            />
          </div>
          
          <div className="text-center mb-4">
            <h4 className="text-lg font-semibold mb-2 text-black">
              Edit clothes
            </h4>
          </div>
          
          <div className="text-center py-4 px-3 bg-gray-50 rounded-xl">
            <div className="text-base mb-3 text-gray-700 font-medium">
              Coming soon, leave your email
            </div>
            <button className="px-6 py-3 bg-black text-white rounded-full text-sm font-medium transition-all hover:bg-gray-800">
              Leave your email
            </button>
          </div>
        </div>

        {/* Tab 3: Ads */}
        <div
          id="tab3"
          className={`${
            activeTab === 'tab3' ? 'block' : 'hidden'
          }`}
        >
          <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-black">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src="https://cdn.website.hautech.ai/cdn/ads%20mobile.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-black">
            Ads
          </h3>
          <div className="text-gray-600 text-sm leading-relaxed">
            Easily create multiple image variations of your product
          </div>
        </div>

        {/* Tab 4: AI Photo Editor */}
        <div
          id="tab4"
          className={`${
            activeTab === 'tab4' ? 'block' : 'hidden'
          }`}
        >
          <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-black">
            <h3 className="text-xl font-semibold text-white absolute top-4 left-4 z-10">
              AI photo editor
            </h3>
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src="https://cdn.website.hautech.ai/cdn/photo%20editor%20mobile.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>

        {/* Tab 5: Cropped Faces */}
        <div
          id="tab5"
          className={`${
            activeTab === 'tab5' ? 'block' : 'hidden'
          }`}
        >
          <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-black">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src="https://cdn.website.hautech.ai/cdn/cropped%20face%20mobile.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-black">
            Cropped faces
          </h3>
        </div>

        {/* Tab 6: Abstract Fashion */}
        <div
          id="tab6"
          className={`${
            activeTab === 'tab6' ? 'block' : 'hidden'
          }`}
        >
          <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-black">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src="https://cdn.website.hautech.ai/cdn/moodboard%20mobile.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-black">
            Abstract Imagery for Fashion Marketing
          </h3>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}