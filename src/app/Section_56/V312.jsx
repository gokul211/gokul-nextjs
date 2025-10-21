// components/V312.jsx
import React, { useRef, useState } from "react";

export default function V312() {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  // Move cursor inside the container only
  const handleMove = (e) => {
    const container = containerRef.current;
    const cursor = cursorRef.current;
    if (!container || !cursor) return;

    const rect = container.getBoundingClientRect();
    const cursorSize = 30; // px (match CSS)
    // clientX/Y gives mouse relative to viewport, subtract container origin
    const x = e.clientX - rect.left - cursorSize / 2;
    const y = e.clientY - rect.top - cursorSize / 2;

    // place using left/top so CSS transform can be used for scale animations
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
  };

  // Click expand effect (reverts after 500ms)
  const handleClick = () => {
    setExpanded(true);
    setTimeout(() => setExpanded(false), 500);
  };

  return (
    <div
      ref={containerRef}
      className="v312-container"
      onMouseMove={handleMove}
      onClick={handleClick}
    >
      {/* Only this div holds the custom cursor */}
      <div
        ref={cursorRef}
        className={`cursor ${expanded ? "expand" : ""}`}
        aria-hidden="true"
      ></div>

      {/* Example content inside the container - remove or replace as needed */}
      <div className="content">
        <h2>V312 cursor demo</h2>
        <p>Move and click inside this box to see the cursor effect.</p>
      </div>

      <style jsx>{`
        .v312-container {
          position: relative; /* required so cursor is positioned relative to this container */
          width: 100%;
          min-height: 320px;
          background: #222;
          color: #fff;
          overflow: hidden;
        }

        .content {
          padding: 24px;
          font-family: Helvetica, Arial, sans-serif;
        }

        .cursor {
          position: absolute;
          /* initial placement (off top-left); JS will set left/top on mousemove */
          left: 0;
          top: 0;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: transparent;
          pointer-events: none; /* ensures cursor doesn't block pointer events */
          z-index: 111;
          border: 1px solid #fff;
          transition: all 0.2s ease-out;
          animation: moveCursor1 0.5s infinite alternate;
          transform-origin: center center;
        }

        .cursor.expand {
          background: transparent;
          border-color: yellow;
          animation: moveCursor2 0.5s forwards;
        }

        @keyframes moveCursor1 {
          from {
            transform: scale(1);
            opacity: 1;
          }
          to {
            transform: scale(0.8);
            opacity: 1;
          }
        }

        @keyframes moveCursor2 {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(2.5);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}