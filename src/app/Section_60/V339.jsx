import { useState } from 'react';

export default function V339() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const [showSpecialCard, setShowSpecialCard] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Different content for each card
  const cardContents = [
    {
      title: "The Metamorphosis",
      content: [
        "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.",
        "He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.",
        "The bedding was hardly able to cover it and seemed ready to slide off any moment.",
         "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.",
        "He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.",
        "The bedding was hardly able to cover it and seemed ready to slide off any moment."
      ]
    },
    {
      title: "A New Beginning",
      content: [
        "The sun rose over the horizon, painting the sky in shades of orange and pink.",
        "Birds began their morning songs, welcoming the new day with melodious chirps.",
        "Everything felt fresh and full of possibilities, as if the world was being reborn.",
         "The sun rose over the horizon, painting the sky in shades of orange and pink.",
        "Birds began their morning songs, welcoming the new day with melodious chirps.",
        "Everything felt fresh and full of possibilities, as if the world was being reborn."
      ]
    },
    {
      title: "The Adventure",
      content: [
        "Deep in the forest, an ancient tree stood tall, its branches reaching toward the heavens.",
        "Legends spoke of treasures hidden within its hollow trunk, guarded by mystical creatures.",
        "Many had sought it, but few had returned to tell their tales.",
         "Deep in the forest, an ancient tree stood tall, its branches reaching toward the heavens.",
        "Legends spoke of treasures hidden within its hollow trunk, guarded by mystical creatures.",
        "Many had sought it, but few had returned to tell their tales."
      ]
    },
    {
      title: "Ocean Dreams",
      content: [
        "Waves crashed against the shore, their rhythm as old as time itself.",
        "Beneath the surface, a world of wonder thrived in vibrant colors and mysterious depths.",
        "The ocean held secrets that humanity had yet to discover.",
        "Waves crashed against the shore, their rhythm as old as time itself.",
        "Beneath the surface, a world of wonder thrived in vibrant colors and mysterious depths.",
        "The ocean held secrets that humanity had yet to discover."
      ]
    },
    {
      title: "Starlight",
      content: [
        "The night sky sparkled with countless stars, each one a distant sun.",
        "Galaxies swirled in cosmic dances, painting the universe with light.",
        "In the vastness of space, Earth was but a tiny blue dot, yet it held all of our stories.",
          "The night sky sparkled with countless stars, each one a distant sun.",
        "Galaxies swirled in cosmic dances, painting the universe with light.",
        "In the vastness of space, Earth was but a tiny blue dot, yet it held all of our stories."
      ]
    }
  ];

  const toggle = () => {
    if (isFlipped) {
      hide();
    } else {
      setShowSpecialCard(true);
      setIsFlipped(true);
    }
  };

  const hide = () => {
    setIsHiding(true);
    setIsFlipped(false);
    setTimeout(() => {
      setIsHiding(false);
      setShowSpecialCard(false);
      // Move to next card after hiding
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cardContents.length);
    }, 900);
  };

  const currentCard = cardContents[currentCardIndex];

  return (
    <div className="relative h-screen font-['Ubuntu',sans-serif] bg-white">
      <style jsx>{`
        @import url(https://fonts.googleapis.com/css?family=Ubuntu:400,300,500,700);
        
        @keyframes animationFrames {
          0% { transform: translateX(0) rotateY(180deg); z-index: 1; }
          50% { transform: translateX(-200%) rotateY(0deg) rotateZ(15deg) scale(0.7, 0.7); z-index: -10; }
          100% { transform: translateX(0) rotateY(0deg) scale(0.9, 0.9); z-index: -10; }
        }
        
        .hide-animation {
          animation: animationFrames linear 0.55s;
          animation-iteration-count: 1;
        }
      `}</style>

      {/* Card Counter */}
      <div className="absolute top-40 left-40 text-4xl font-bold text-gray-900">
        Card {currentCardIndex + 1} of {cardContents.length}
      </div>

      {/* Deck Container */}
      <div className="absolute bottom-[30%] right-[30%] p-2.5 transform-gpu">
        {/* Back cards */}
        <div
          className="w-[200px] h-[275px] rounded-lg mb-1 shadow-[0px_3px_5px_rgba(0,0,0,0.5)] absolute top-0 border border-[#726A53] bg-[#F8F5ED] overflow-hidden p-2 box-border"
          style={{
            transform: 'rotateZ(-2deg)',
            top: '1px',
            backgroundImage: "url('https://s-media-cache-ak0.pinimg.com/236x/c1/59/b4/c159b4738dae9c9d8d6417228024de8d.jpg')",
            backgroundSize: '102.5% 101.5%',
            backgroundPosition: 'center',
          }}
        />
        
        <div
          className="w-[200px] h-[275px] rounded-lg mb-1 shadow-[0px_3px_5px_rgba(0,0,0,0.5)] absolute top-0 border border-[#726A53] bg-[#F8F5ED] overflow-hidden p-2 box-border"
          style={{
            transform: 'rotateZ(6deg)',
            top: '7px',
            backgroundImage: "url('https://s-media-cache-ak0.pinimg.com/236x/c1/59/b4/c159b4738dae9c9d8d6417228024de8d.jpg')",
            backgroundSize: '102.5% 101.5%',
            backgroundPosition: 'center',
          }}
        />

        {/* Flip Container */}
        <div
          className="relative z-[2] cursor-pointer"
          style={{ perspective: '1000px' }}
          onClick={toggle}
        >
          {/* Green Card */}
          <div
            className={`w-[200px] h-[275px] rounded-lg mb-1 absolute top-0 border border-[#726A53] bg-red-500 overflow-hidden p-2 box-border z-[1] ${showSpecialCard ? 'block' : 'hidden'}`}
            style={{
              backgroundImage: "url('https://s-media-cache-ak0.pinimg.com/236x/c1/59/b4/c159b4738dae9c9d8d6417228024de8d.jpg')",
              backgroundSize: '102.5% 101.5%',
              backgroundPosition: 'center',
              boxShadow: 'none',
            }}
          />

          {/* Flipper */}
          <div
            className={`relative w-[200px] h-[275px] transition-transform duration-[600ms] ${isHiding ? 'hide-animation -z-[1]' : ''}`}
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'left center',
              transform: isFlipped ? 'rotateY(180deg) translate(-50%, -35%)' : 'rotateY(0deg)',
              zIndex: isFlipped ? 50 : isHiding ? -1 : 'auto',
            }}
          >
            {/* Front */}
            <div
              className="absolute top-0 left-0 w-[200px] h-[275px]"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(0deg)',
              }}
            >
              <div
                className={`w-[200px] h-[275px] rounded-lg shadow-[0px_3px_5px_rgba(0,0,0,0.5)] border border-[#726A53] bg-[#F8F5ED] overflow-hidden p-2 box-border transition-transform duration-[600ms]`}
                style={{
                  WebkitFontSmoothing: 'antialiased',
                  transformOrigin: 'right top',
                  transform: isFlipped ? 'scale(2.5, 2.5)' : 'scale(1, 1)',
                  backgroundImage: "url('https://s-media-cache-ak0.pinimg.com/236x/c1/59/b4/c159b4738dae9c9d8d6417228024de8d.jpg')",
                  backgroundSize: '102.5% 101.5%',
                  backgroundPosition: 'center',
                  boxShadow: 'none',
                }}
              />
            </div>

            {/* Back */}
            <div
              className="absolute top-0 left-0 w-[200px] h-[275px]"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div
                className={`w-[500px] h-[687.5px] rounded-lg border border-[#726A53] bg-[#F8F5ED] overflow-hidden p-4 box-border text-lg transition-transform duration-[600ms]`}
                style={{
                  transform: isFlipped ? 'scale(0.5, 0.5) scale(1, 1)' : 'scale(0.5, 0.5)',
                  transformOrigin: 'left top',
                  WebkitFontSmoothing: 'antialiased',
                  backgroundSize: '101% 102%',
                  backgroundPosition: '0% -5px',
                }}
              >
                <h4 className="font-bold text-xl mb-3">{currentCard.title}</h4>
                {currentCard.content.map((paragraph, index) => (
                  <p key={index} className="p-0 mt-0 mb-3 text-left">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}