import { useState, useEffect, useRef } from 'react';

const testimonials = [
  { 
    tags: ["Fashion brand owner", "Dubai"], 
    title: "Launching First AI Campaign with Stunning Results", 
    description: "We launched one of the first AI campaign in MENA region. Our website now features a blend of traditional photographs and AI-generated images, creating a more diverse and engaging visual experience for their clients", 
    link: "https://abccompany.com", 
    desktopImg: "https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ac7_Slider%20img%203-min.webp"
  },
  { 
    tags: ["Fashion brand owner", "Netherlands"], 
    title: "Total web site rebranding, increasing sales up to 30%", 
    description: "Hautech has been a game-changer for my brand! Now, creating stunning visuals and on-model photos from simple flat product images is seamless. I can post fresh content on my socials daily", 
    link: "https://xyzcompany.com", 
    desktopImg: "https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80aa6_Slider%20img%201.webp"
  },
  { 
    tags: ["Fashion brand", "Italy"], 
    title: "Unmatched Realism and Brand Identity Integration", 
    description: "The quality of the AI-generated models is absolutely stunning. The realism of the images is so impressive, and what really sets Hautech.ai apart is their algorithm that can replicate our brand's identity.", 
    link: "https://yyycompany.com",
    desktopImg: "https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ac8_Slider%20img%202.webp"
  },
  { 
    tags: ["Local kids brand", "Kazakhstan"], 
    title: "Boosted CTR by 2.4x with Hautech visuals!", 
    description: "Instead of costly and time-consuming photoshoots, we quickly generated tailored model images that resonated with our target demographic audience. This not only boosted our conversion rates but also allowed us to expand our presence across key markets seamlessly.", 
    link: "https://mycompany.com",
    desktopImg: "https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ac6_Slider%20img%204-min.webp"
  },
  { 
    tags: ["Local kids brand", "Kazakhstan"], 
    title: "Created stress free photosession with one year old kids in 1 day!", 
    description: "Hautech AI made what seemed impossible! We struggled to find one-year-old models for our caps photoshoot, but Hautech delivered stunning, stress-free results in just a few hours. The process was seamless, and the images exceeded our expectations!", 
    link: "https://yourcompany.com", 
    desktopImg: "https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ac4_Slider%20img%205-min.webp"
  },
  { 
    tags: ["Kids brand", "Singapore"], 
    title: "Impressive Natural-Looking Results", 
    description: "We are super amazed by the results! Kids look very natural!", 
    link: "https://www.baby.com", 
    desktopImg: "https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ac5_Slider%20img%206-min.webp"
  },
  { 
    tags: ["AI artist", "Singapore"], 
    title: "Seamless Realism and Precision in Visual Content Creation", 
    description: "HautechAI excels with exceptional realism, precise details, and balanced editorial-style compositions. HautechAI deserves recognition for its performance, as even without a prompt, it delivers a cohesive and usable overall result.", 
    link: "https://zzzcompany.com",
    desktopImg: "https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ac9_Slider%20img%207-min.webp"
  }
];

export default function V289() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoplayRef = useRef(null);

  const AUTOPLAY_MS = 1500; // 3.5 seconds for better viewing
  const TRANS_MS = 100; // Smoother, longer transition

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      changeSlide(1);
    }, AUTOPLAY_MS);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const resetAutoplay = () => {
    stopAutoplay();
    setTimeout(startAutoplay, 1000);
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const changeSlide = (direction) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const nextRaw = currentSlide + direction;
    let target;
    if (nextRaw >= testimonials.length) target = 0;
    else if (nextRaw < 0) target = testimonials.length - 1;
    else target = nextRaw;

    setCurrentSlide(target);

    setTimeout(() => {
      setIsAnimating(false);
    }, TRANS_MS);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    resetAutoplay();
    setTimeout(() => {
      setIsAnimating(false);
    }, TRANS_MS);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      changeSlide(-1);
      resetAutoplay();
    } else if (e.key === 'ArrowRight') {
      changeSlide(1);
      resetAutoplay();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isAnimating]);

  return (
    <section className="max-w-[1100px] mx-auto px-5 py-10 bg-[#f8f8f8]">
      <h2 className="text-center text-[2rem] font-bold mb-10 leading-tight text-[#333]">
        Discover how Hautech.ai has helped<br />its customers streamline content production
      </h2>

      <div className="flex gap-8 items-center justify-center relative">
        {/* Image Column */}
        <div className="flex-none w-[45%] min-w-[320px] relative overflow-visible rounded-xl">
          {/* Backdrop layers - Always visible, no animation */}
          <div className="absolute top-[14px] left-[-40px] w-[calc(100%-80px)] h-[calc(100%-14px)] bg-[#e9e9e9] rounded-xl z-0 shadow-[0_8px_18px_rgba(0,0,0,0.06)] rotate-[0.6deg]" />
          <div className="absolute top-[10px] left-[-22px] w-[calc(100%-44px)] h-[calc(100%-10px)] bg-[#f3f3f3] rounded-xl z-0 shadow-[0_6px_14px_rgba(0,0,0,0.05)] rotate-[0.25deg]" />

          {/* Main Image Container */}
          <div className="relative rounded-xl overflow-hidden h-[360px] flex items-left justify-start text-left z-[3]">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`absolute top-0 left-0 w-full h-full flex items-left justify-start text-left transition-all duration-[600ms] ease-in-out ${
                  i === currentSlide
                    ? 'opacity-100 translate-x-0 scale-100 z-[4]'
                    : 'opacity-0 translate-x-8 scale-95'
                }`}
              >
                <img
                  src={t.desktopImg}
                  alt={t.title}
                  className="h-full w-auto object-contain object-left rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.08)] max-w-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content Column */}
        <div className="flex-none w-[45%] min-w-[320px] relative overflow-hidden">
          {/* Navigation Icons */}
          <div className="flex gap-3 mb-5">
            <button
              onClick={() => { changeSlide(-1); resetAutoplay(); }}
              className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-[0_5px_12px_rgba(0,0,0,0.06)] cursor-pointer transition-all duration-[180ms] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(0,0,0,0.1)] z-10"
              aria-label="Previous"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512">
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
              </svg>
            </button>
            <button
              onClick={() => { changeSlide(1); resetAutoplay(); }}
              className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-[0_5px_12px_rgba(0,0,0,0.06)] cursor-pointer transition-all duration-[180ms] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(0,0,0,0.1)] z-10"
              aria-label="Next"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512">
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </button>
          </div>

          {/* Content Slider */}
          <div className="relative w-full h-full">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`${i === currentSlide ? 'relative' : 'absolute'} top-0 left-0 w-full min-h-[360px] p-3 transition-all duration-[600ms] ease-in-out ${
                  i === currentSlide ? 'opacity-100 translate-x-0 z-[2]' : 'opacity-0 translate-x-5'
                }`}
              >
                <div className="flex gap-2 mb-3 flex-wrap">
                  {t.tags.map((tag, idx) => (
                    <div key={idx} className="bg-[#f0f0f0] px-2.5 py-1.5 rounded-[18px] text-[0.82rem] font-medium">
                      {tag}
                    </div>
                  ))}
                </div>
                <h3 className="text-[1.35rem] text-left font-bold mb-3 leading-tight">{t.title}</h3>
                <p className="text-left mb-4 text-[#555] leading-relaxed max-h-[140px] overflow-auto pr-1.5">
                  {t.description}
                </p>
                <a
                  href={t.link}
                  className="block text-left text-black font-semibold no-underline border-black pb-0.5 transition-all duration-[180ms] hover:text-[#555] hover:border-[#555] text-[0.95rem]"
                >
                  {t.link.replace(/^https?:\/\//, '').substring(0, 30)}
                  {t.link.length > 30 ? '...' : ''}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center gap-2 mt-5">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-[300ms] ${
              i === currentSlide ? 'bg-[#333] scale-[1.15]' : 'bg-[#ddd]'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}