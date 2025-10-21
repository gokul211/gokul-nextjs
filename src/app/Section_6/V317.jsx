import React, { useState, useEffect, useRef } from 'react';

export default function V317() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const headerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!headerRef.current) return;

      const rect = headerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const deltaX = mouseX - centerX;
      const deltaY = mouseY - centerY;

      const rotateY = (deltaX / rect.width) * 20;
      const rotateX = -(deltaY / rect.height) * 25;

      setRotation({ x: rotateX, y: rotateY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-start justify-center pt-8">
      <header 
        ref={headerRef}
        className="min-h-[52vh]"
        style={{
          perspective: '2000px',
          perspectiveOrigin: '50% 50vh',
        }}
      >
        <h1 
          className="m-0"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: 'transform 0.75s cubic-bezier(0.15, 0.65, 0.2, 1)',
            fontSize: '11vw',
            lineHeight: '0.85',
            padding: '2.825vw 3.125vw 3.125vw',
            fontFamily: '"Proza Display", "Hoefler Text", Garamond, Palatino, "Palatino Linotype", serif',
            fontWeight: '900',
            letterSpacing: '-0.01em',
            textRendering: 'geometricPrecision',
          }}
        >
          <span className="flex items-center">
            Paul O
            <span style={{ margin: '0 -0.025em' }}>'</span>
            Rely
            <span
              className="flex-1"
              style={{
                borderStyle: 'solid',
                borderColor: 'inherit',
                borderLeftColor: 'transparent',
                borderWidth: '0 0 0.1em 0.1em',
                margin: '50px 0.4em 0.3em 0.1em',
              }}
            />
          </span>
          <span 
            className="block"
            style={{
              WebkitTextFillColor: 'transparent',
              textFillColor: 'transparent',
              WebkitTextStroke: '0.02em currentcolor',
              textStroke: '0.02em currentcolor',
            }}
          >
            <span
              className="inline-block relative"
              style={{
                borderStyle: 'solid',
                borderColor: 'inherit',
                borderRightColor: 'transparent',
                borderWidth: '0.1em 0.1em 0 0',
                marginRight: '0.1em',
                paddingLeft: '1em',
                top: '0em',
              }}
            />
            Art Director &amp; Graphic Designer
          </span>
        </h1>
      </header>
    </div>
  );
}