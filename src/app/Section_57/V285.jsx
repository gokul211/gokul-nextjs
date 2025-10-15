'use client';

import { useState, useEffect, useRef } from 'react';

export function V285() {
  const [activeTab, setActiveTab] = useState('tab1');
  const videoRefs = useRef({});

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

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const tabs = [
    { id: 'tab1', label: 'Product cards' },
    { id: 'tab2', label: 'Total look' },
    { id: 'tab3', label: 'Ads' },
    { id: 'tab4', label: 'AI photo editor' },
    { id: 'tab5', label: 'Cropped faces' },
    { id: 'tab6', label: 'Abstract Imagery for Fashion Marketing' }
  ];

  return (
    <section id="cases" className="max-w-[1200px] mx-auto px-5 py-[60px]">
      <h2 className="text-[48px] md:text-[32px] font-semibold text-center mb-[50px] text-black opacity-0 animate-[fadeInUp_0.8s_ease_forwards]">
        Use cases
      </h2>
      
      <div className="opacity-0 animate-[fadeInUp_0.8s_ease_0.2s_forwards]">
        <div className="flex gap-[10px] mb-[30px] flex-wrap justify-center" role="tablist">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleTabClick(tab.id);
              }}
              className={`px-6 py-3 rounded-[25px] cursor-pointer text-[15px] md:text-[13px] font-medium transition-all duration-300 no-underline inline-block ${
                activeTab === tab.id
                  ? 'bg-black text-white'
                  : 'bg-[#e8e8e8] text-[#666] hover:bg-[#d8d8d8] hover:text-[#333]'
              }`}
            >
              <div>{tab.label}</div>
            </a>
          ))}
        </div>

        {/* Main Container */}
        <div className="relative w-full bg-white rounded-[20px] p-8 md:p-6 shadow-lg border border-gray-200">
          
          {/* Tab 1: Product Cards */}
          <div
            id="tab1"
            className={`${
              activeTab === 'tab1' ? 'block opacity-100' : 'hidden opacity-0'
            } transition-opacity duration-300 w-full`}
          >
            <div className="relative w-full aspect-video rounded-[20px] overflow-hidden mb-[30px] bg-black">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source
                  src="https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80b23_product%20cards%20new-transcode.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <h3 className="text-[36px] md:text-[28px] font-semibold mb-[15px] text-black">
              Product cards
            </h3>
            <div className="text-[18px] md:text-[16px] text-[#666] leading-[1.6]">
              Create consistent, professional product images across your catalog.
            </div>
          </div>

          {/* Tab 2: Total Look */}
          <div
            id="tab2"
            className={`${
              activeTab === 'tab2' ? 'block opacity-100' : 'hidden opacity-0'
            } transition-opacity duration-300 w-full`}
          >
            <div className="relative mb-[30px]">
              <h3 className="text-[36px] md:text-[24px] font-semibold mb-[15px] text-white absolute top-[40px] md:top-[20px] left-[40px] md:left-[20px] z-[2]">
                Total look
              </h3>
              <img
                src="https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80b1e_tab%202%20img.webp"
                alt="Total look"
                className="w-full rounded-[20px] hidden md:block"
              />
              <img
                src="https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80b3f_product%20cards%20mob%20new.jpg"
                alt="Total look mobile"
                className="w-full rounded-[20px] block md:hidden"
              />
            </div>
            
            <div className="text-center mb-[20px]">
              <h4 className="text-[24px] md:text-[20px] font-semibold mb-[15px] text-black">
                Edit clothes
              </h4>
            </div>
            
            <div className="text-center py-6 px-5 bg-gray-50 rounded-[15px]">
              <div className="text-[20px] md:text-[18px] mb-5 text-[#333] font-medium">
                Coming soon, leave your email
              </div>
              <a
                href="#"
                className="inline-block px-8 py-[14px] bg-black text-white no-underline rounded-[25px] font-medium transition-all duration-300 hover:bg-[#333] hover:-translate-y-[2px] hover:shadow-lg"
              >
                Leave your email
              </a>
            </div>
          </div>

          {/* Tab 3: Ads */}
          <div
            id="tab3"
            className={`${
              activeTab === 'tab3' ? 'block opacity-100' : 'hidden opacity-0'
            } transition-opacity duration-300 w-full`}
          >
            <div className="relative w-full aspect-video rounded-[20px] overflow-hidden mb-[30px] bg-black">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source
                  src="https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80acb_ads-transcode.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <h3 className="text-[36px] md:text-[28px] font-semibold mb-[15px] text-black">
              Ads
            </h3>
            <div className="text-[18px] md:text-[16px] text-[#666] leading-[1.6]">
              Easily create multiple image<br />variations of your product
            </div>
          </div>

          {/* Tab 4: AI Photo Editor */}
          <div
            id="tab4"
            className={`${
              activeTab === 'tab4' ? 'block opacity-100' : 'hidden opacity-0'
            } transition-opacity duration-300 w-full`}
          >
            <div className="relative w-full aspect-video rounded-[20px] overflow-hidden mb-[30px] bg-black">
              <h3 className="text-[36px] md:text-[24px] font-semibold text-white absolute top-[40px] md:top-[20px] left-[40px] md:left-[20px] z-[2]">
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
                  src="https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ad9_photo%20editor-transcode.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>

          {/* Tab 5: Cropped Faces */}
          <div
            id="tab5"
            className={`${
              activeTab === 'tab5' ? 'block opacity-100' : 'hidden opacity-0'
            } transition-opacity duration-300 w-full`}
          >
            <div className="relative w-full aspect-video rounded-[20px] overflow-hidden mb-[30px] bg-black">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source
                  src="https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80b28_cropped%20face%20new-transcode.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <h3 className="text-[36px] md:text-[28px] font-semibold mb-[15px] text-black">
              Cropped faces
            </h3>
          </div>

          {/* Tab 6: Abstract Imagery */}
          <div
            id="tab6"
            className={`${
              activeTab === 'tab6' ? 'block opacity-100' : 'hidden opacity-0'
            } transition-opacity duration-300 w-full`}
          >
            <div className="relative w-full aspect-video rounded-[20px] overflow-hidden mb-[30px] bg-black">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source
                  src="https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ad2_moodboard-transcode.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <h3 className="text-[36px] md:text-[28px] font-semibold mb-[15px] text-black">
              Abstract Imagery for Fashion Marketing
            </h3>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}