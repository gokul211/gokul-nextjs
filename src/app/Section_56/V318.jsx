import { useState, useRef, useEffect } from 'react';

export default function V318() {
  const [screen, setScreen] = useState('initial'); // 'initial', 'type', 'draw'
  const [currentColor, setCurrentColor] = useState('#0000cc');
  const [isDrawing, setIsDrawing] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [isEraser, setIsEraser] = useState(false);
  
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const iceBreakerMessages = [
    "Hi Paul! 😊",
    "Hello! Let's chat!",
    "Hey there! 👋",
    "What's up?",
    "Nice to meet you!",
    "Let's connect!"
  ];

  useEffect(() => {
    if (screen === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3;
      ctx.strokeStyle = currentColor;
      ctxRef.current = ctx;
    }
  }, [screen]);

  const handleColorChange = (color, eraser = false) => {
    setCurrentColor(color);
    setIsEraser(eraser);
    
    if (ctxRef.current) {
      if (eraser) {
        ctxRef.current.globalCompositeOperation = 'destination-out';
        ctxRef.current.lineWidth = 20;
      } else {
        ctxRef.current.globalCompositeOperation = 'source-over';
        ctxRef.current.lineWidth = 3;
        ctxRef.current.strokeStyle = color;
      }
    }
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleIceBreaker = () => {
    const randomMsg = iceBreakerMessages[Math.floor(Math.random() * iceBreakerMessages.length)];
    setMessageText(randomMsg);
  };

  const handleIceBreakerDraw = () => {
    if (ctxRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
      ctxRef.current.font = 'bold 60px Arial';
      ctxRef.current.fillStyle = currentColor;
      ctxRef.current.fillText('Hi 😊', canvas.width / 2 - 75, canvas.height / 2);
    }
  };

  const handleSendType = () => {
    if (messageText.trim()) {
      alert('Message sent! (Demo only)');
      setMessageText('');
    }
  };

  const handleSendDraw = () => {
    if (ctxRef.current && canvasRef.current) {
      alert('Drawing sent! (Demo only)');
      const canvas = canvasRef.current;
      ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleRestart = () => {
    setScreen('initial');
    setMessageText('');
    if (ctxRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden font-mono">
      {/* Diagonal stripes background */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,0.03) 35px, rgba(0,0,0,0.03) 70px)'
      }} />

      <div className="relative z-10 h-full flex flex-col p-5 sm:p-10">
        {/* Initial Screen */}
        {screen === 'initial' && (
          <div className="h-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col sm:flex-row gap-8 sm:gap-24">
              <div 
                onClick={() => setScreen('type')}
                className="text-7xl sm:text-[120px] font-bold lowercase cursor-pointer transition-all duration-300 active:scale-95 sm:hover:scale-110 text-center"
                style={{
                  WebkitTextStroke: '2px #000',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {'type'.split('').map((letter, i) => (
                  <span 
                    key={i} 
                    className="inline-block"
                    style={{
                      animation: `typeIn 1.2s ease infinite ${i * 0.15}s`,
                      animationDirection: 'alternate'
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
              <div 
                onClick={() => setScreen('draw')}
                className="text-7xl sm:text-[120px] font-bold lowercase cursor-pointer transition-all duration-300 active:scale-95 sm:hover:scale-110 text-center"
                style={{
                  WebkitTextStroke: '2px #000',
                  WebkitTextFillColor: 'transparent',
                  animation: 'float 3s ease-in-out infinite'
                }}
              >
                draw
              </div>
            </div>
          </div>
        )}

        {/* Type Form */}
        {screen === 'type' && (
          <div className="flex flex-col h-full">
            <div className="flex gap-3 sm:gap-5 mb-4 sm:mb-8 flex-wrap items-center">
              <button onClick={handleIceBreaker} className="text-sm sm:text-lg font-bold active:scale-95 transition-all">
                ice breaker
              </button>
              <button onClick={handleRestart} className="text-sm sm:text-lg font-bold active:scale-95 transition-all">
                restart
              </button>
              <button onClick={handleSendType} className="text-sm sm:text-lg font-bold active:scale-95 transition-all">
                send!
              </button>
            </div>
            <div className="flex-1 border-2 border-black">
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Hi 😊"
                className="w-full h-full border-none outline-none font-mono text-2xl sm:text-5xl p-3 sm:p-5 resize-none bg-transparent"
              />
            </div>
          </div>
        )}

        {/* Draw Form */}
        {screen === 'draw' && (
          <div className="flex flex-col h-full">
            <div className="flex gap-3 sm:gap-5 mb-4 sm:mb-8 flex-wrap items-center">
              <button 
                onClick={() => handleColorChange('#0000cc', false)}
                className={`text-sm sm:text-lg font-bold active:scale-95 transition-all ${!isEraser && currentColor === '#0000cc' ? 'underline' : ''}`}
                style={{color: '#0000cc', textDecorationThickness: '3px'}}
              >
                blu
              </button>
              <button 
                onClick={() => handleColorChange('#cc0000', false)}
                className={`text-sm sm:text-lg font-bold active:scale-95 transition-all ${!isEraser && currentColor === '#cc0000' ? 'underline' : ''}`}
                style={{color: '#cc0000', textDecorationThickness: '3px'}}
              >
                red
              </button>
              <button 
                onClick={() => handleColorChange('#171717', false)}
                className={`text-sm sm:text-lg font-bold active:scale-95 transition-all ${!isEraser && currentColor === '#171717' ? 'underline' : ''}`}
                style={{color: '#171717', textDecorationThickness: '3px'}}
              >
                blk
              </button>
              <button 
                onClick={() => handleColorChange('#666666', true)}
                className={`text-sm sm:text-lg font-bold active:scale-95 transition-all ${isEraser ? 'underline' : ''}`}
                style={{color: '#666666', textDecorationThickness: '3px'}}
              >
                eraser
              </button>
              <button onClick={handleIceBreakerDraw} className="text-sm sm:text-lg font-bold active:scale-95 transition-all">
                ice breaker
              </button>
              <button onClick={handleRestart} className="text-sm sm:text-lg font-bold active:scale-95 transition-all">
                restart
              </button>
              <button onClick={handleSendDraw} className="text-sm sm:text-lg font-bold active:scale-95 transition-all">
                send!
              </button>
            </div>
            <div className="flex-1 border-2 border-black">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-full cursor-crosshair block touch-none"
              />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes reveal {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes typeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
      `}</style>
    </div>
  );
}