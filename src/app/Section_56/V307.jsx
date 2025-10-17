import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function V307() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const canRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const [autoRotate, setAutoRotate] = useState(true);
  const [currentShape, setCurrentShape] = useState('cylinder');
  const [currentTexture, setCurrentTexture] = useState(null);
  
  const autoRotateRef = useRef(true);
  const isDraggingRef = useRef(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0, z: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    initScene();
    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    createCan();
  }, [currentShape]);

  const initScene = () => {
    // Scene
    sceneRef.current = new THREE.Scene();

    // Camera
    cameraRef.current = new THREE.PerspectiveCamera(
      45,
      window.innerWidth > 800 ? 800 / 600 : window.innerWidth / (window.innerWidth * 0.75),
      0.1,
      1000
    );
    cameraRef.current.position.z = 6;

    // Renderer
    const width = Math.min(window.innerWidth - 300, 1000);
    const height = window.innerHeight - 200;
    
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current.setSize(width, height);
    rendererRef.current.setClearColor(0x000000, 0);
    
    if (containerRef.current) {
      containerRef.current.appendChild(rendererRef.current.domElement);
    }

    // Lights - Maximum brightness for crystal clear images
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    sceneRef.current.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight1.position.set(5, 5, 5);
    sceneRef.current.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight2.position.set(-5, -5, -5);
    sceneRef.current.add(directionalLight2);

    const frontLight = new THREE.DirectionalLight(0xffffff, 0.6);
    frontLight.position.set(0, 0, 10);
    sceneRef.current.add(frontLight);

    createCan();
    animate();

    // Event listeners
    const canvas = rendererRef.current.domElement;
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart);
    canvas.addEventListener('touchmove', onTouchMove);
    canvas.addEventListener('touchend', onTouchEnd);
    canvas.addEventListener('wheel', onWheel);
    
    window.addEventListener('resize', onWindowResize);
  };

  const createCan = (imageTexture = null) => {
    if (canRef.current) {
      sceneRef.current.remove(canRef.current);
      if (canRef.current.geometry) canRef.current.geometry.dispose();
      if (canRef.current.material) {
        if (canRef.current.material.map) canRef.current.material.map.dispose();
        canRef.current.material.dispose();
      }
    }

    let texture;
    if (imageTexture) {
      texture = imageTexture;
      setCurrentTexture(imageTexture);
    } else if (currentTexture) {
      texture = currentTexture;
    } else {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#cccccc');
      gradient.addColorStop(1, '#888888');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'white';
      ctx.font = 'bold 60px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Upload Your Image', canvas.width / 2, canvas.height / 2 - 30);
      ctx.font = '40px Arial';
      ctx.fillText('To See It Here!', canvas.width / 2, canvas.height / 2 + 30);
      
      texture = new THREE.CanvasTexture(canvas);
    }

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    let geometry;
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      metalness: 0.0,
      roughness: 0.2,
      emissive: 0xffffff,
      emissiveMap: texture,
      emissiveIntensity: 0.3
    });

    if (currentShape === 'cylinder') {
      const canRadius = 1.0;
      const canHeight = 4.8;
      const topRadius = 0.85;
      const neckHeight = 0.3;
      
      // Main body
      geometry = new THREE.CylinderGeometry(canRadius, canRadius, canHeight, 128);
      canRef.current = new THREE.Mesh(geometry, material);
      
      // Top neck (tapered section)
      const neckGeometry = new THREE.CylinderGeometry(topRadius, canRadius, neckHeight, 128);
      const neckMaterial = new THREE.MeshStandardMaterial({
        color: 0xdddddd,
        metalness: 0.9,
        roughness: 0.1
      });
      const neck = new THREE.Mesh(neckGeometry, neckMaterial);
      neck.position.y = canHeight / 2 + neckHeight / 2;
      canRef.current.add(neck);
      
      // Top cap (pull tab area)
      const topCapGeometry = new THREE.CylinderGeometry(topRadius, topRadius, 0.08, 128);
      const topCapMaterial = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        metalness: 0.95,
        roughness: 0.05
      });
      const topCap = new THREE.Mesh(topCapGeometry, topCapMaterial);
      topCap.position.y = canHeight / 2 + neckHeight + 0.04;
      canRef.current.add(topCap);
      
      // Top circle detail (darker ring)
      const topRingGeometry = new THREE.CircleGeometry(topRadius, 128);
      const topRingMaterial = new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        metalness: 0.85,
        roughness: 0.15
      });
      const topRing = new THREE.Mesh(topRingGeometry, topRingMaterial);
      topRing.rotation.x = -Math.PI / 2;
      topRing.position.y = canHeight / 2 + neckHeight + 0.08;
      canRef.current.add(topRing);

      // Bottom cap
      const bottomCapGeometry = new THREE.CylinderGeometry(canRadius, canRadius * 0.95, 0.15, 128);
      const bottomCapMaterial = new THREE.MeshStandardMaterial({
        color: 0xdddddd,
        metalness: 0.9,
        roughness: 0.1
      });
      const bottomCap = new THREE.Mesh(bottomCapGeometry, bottomCapMaterial);
      bottomCap.position.y = -canHeight / 2 - 0.075;
      canRef.current.add(bottomCap);
      
      // Bottom circle
      const bottomCircleGeometry = new THREE.CircleGeometry(canRadius * 0.95, 128);
      const bottomCircleMaterial = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        metalness: 0.85,
        roughness: 0.15
      });
      const bottomCircle = new THREE.Mesh(bottomCircleGeometry, bottomCircleMaterial);
      bottomCircle.rotation.x = Math.PI / 2;
      bottomCircle.position.y = -canHeight / 2 - 0.15;
      canRef.current.add(bottomCircle);
      
    } else if (currentShape === 'cube') {
      geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
      canRef.current = new THREE.Mesh(geometry, material);
      
    } else if (currentShape === 'sphere') {
      geometry = new THREE.SphereGeometry(1.6, 128, 128);
      canRef.current = new THREE.Mesh(geometry, material);
      
    } else if (currentShape === 'cone') {
      geometry = new THREE.ConeGeometry(1.4, 3.5, 128);
      canRef.current = new THREE.Mesh(geometry, material);
    }

    sceneRef.current.add(canRef.current);
  };

  const onMouseDown = (e) => {
    isDraggingRef.current = true;
    previousMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - previousMouseRef.current.x;
    const deltaY = e.clientY - previousMouseRef.current.y;

    targetRotationRef.current.y += deltaX * 0.01;
    targetRotationRef.current.x += deltaY * 0.01;

    previousMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = () => {
    isDraggingRef.current = false;
  };

  const onTouchStart = (e) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      previousMouseRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }
  };

  const onTouchMove = (e) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    e.preventDefault();

    const deltaX = e.touches[0].clientX - previousMouseRef.current.x;
    const deltaY = e.touches[0].clientY - previousMouseRef.current.y;

    targetRotationRef.current.y += deltaX * 0.01;
    targetRotationRef.current.x += deltaY * 0.01;

    previousMouseRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const onTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const onWheel = (e) => {
    e.preventDefault();
    cameraRef.current.position.z += e.deltaY * 0.005;
    cameraRef.current.position.z = Math.max(3, Math.min(12, cameraRef.current.position.z));
  };

  const onWindowResize = () => {
    const width = Math.min(window.innerWidth - 300, 1000);
    const height = window.innerHeight - 200;
    
    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(width, height);
  };

  const animate = () => {
    requestAnimationFrame(animate);

    if (canRef.current) {
      if (autoRotateRef.current && !isDraggingRef.current) {
        targetRotationRef.current.y += 0.005;
      }

      rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.1;
      rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.1;
      rotationRef.current.z += (targetRotationRef.current.z - rotationRef.current.z) * 0.1;

      canRef.current.rotation.x = rotationRef.current.x;
      canRef.current.rotation.y = rotationRef.current.y;
      canRef.current.rotation.z = rotationRef.current.z;
    }

    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        
        // Use high resolution for best quality
        canvas.width = Math.max(img.width, 2048);
        canvas.height = Math.max(img.height, 2048);
        const ctx = canvas.getContext('2d');

        // COVER mode - Fill entire canvas without white space
        const imgAspect = img.width / img.height;
        const canvasAspect = canvas.width / canvas.height;
        
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (imgAspect > canvasAspect) {
          // Image is wider - fit to height and crop sides
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgAspect;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        } else {
          // Image is taller - fit to width and crop top/bottom
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgAspect;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        const imageTexture = new THREE.CanvasTexture(canvas);
        imageTexture.minFilter = THREE.LinearFilter;
        imageTexture.magFilter = THREE.LinearFilter;
        createCan(imageTexture);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleShapeChange = (shape) => {
    setCurrentShape(shape);
  };

  const handleResetView = () => {
    rotationRef.current = { x: 0, y: 0, z: 0 };
    targetRotationRef.current = { x: 0, y: 0, z: 0 };
    cameraRef.current.position.z = 6;
  };

  const handleRotateLeft = () => {
    targetRotationRef.current.z += 0.3;
  };

  const handleRotateRight = () => {
    targetRotationRef.current.z -= 0.3;
  };

  return (
    <div className="w-screen h-screen relative flex items-center justify-center bg-black overflow-hidden">
      <h1 className="absolute top-5 left-1/2 -translate-x-1/2 text-white text-4xl font-sans m-0 z-10" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
        3D Rotating Can
      </h1>

      <div className="absolute top-5 right-5 flex flex-col gap-4 z-10">
        {/* Upload Section */}
        <div className="backdrop-blur-md p-5 rounded-2xl shadow-lg" style={{ background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px rgba(255, 255, 255, 0.1)' }}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-white text-black px-8 py-3 rounded-full text-base cursor-pointer font-bold w-full transition-all duration-300 hover:scale-105"
            style={{ boxShadow: '0 8px 25px rgba(255, 255, 255, 0.5)' }}
          >
            📷 Upload Image
          </button>
          <p className="text-white text-xs opacity-80 mt-2.5 text-center">Upload your image!</p>
        </div>

        {/* Shape Selector */}
        <div className="backdrop-blur-md p-4 rounded-2xl" style={{ background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px rgba(255, 255, 255, 0.1)' }}>
          <div className="text-white text-sm mb-2.5 text-center font-bold">Change Shape</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { shape: 'cylinder', emoji: '🥫', label: 'Can' },
              { shape: 'cube', emoji: '📦', label: 'Cube' },
              { shape: 'sphere', emoji: '⚽', label: 'Sphere' },
              { shape: 'cone', emoji: '🍦', label: 'Cone' }
            ].map(({ shape, emoji, label }) => (
              <button
                key={shape}
                onClick={() => handleShapeChange(shape)}
                className={`px-3 py-2 rounded-2xl cursor-pointer transition-all duration-300 text-xs text-center hover:scale-105 ${
                  currentShape === shape
                    ? 'bg-white text-black border-white'
                    : 'text-white'
                }`}
                style={currentShape === shape ? {} : { background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255, 255, 255, 0.3)' }}
              >
                {emoji} {label}
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="backdrop-blur-md p-4 rounded-2xl" style={{ background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px rgba(255, 255, 255, 0.1)' }}>
          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-5 py-2.5 rounded-full cursor-pointer transition-all duration-300 text-sm w-full hover:scale-105 ${
                autoRotate
                  ? 'bg-white text-black border-white'
                  : 'text-white'
              }`}
              style={autoRotate ? {} : { background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255, 255, 255, 0.3)' }}
            >
              🔄 Auto Rotate
            </button>
            <button
              onClick={handleResetView}
              className="text-white px-5 py-2.5 rounded-full cursor-pointer transition-all duration-300 text-sm w-full hover:scale-105"
              style={{ background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255, 255, 255, 0.3)' }}
            >
              ↻ Reset View
            </button>
          </div>

          <div className="flex gap-2.5 justify-center mt-2.5">
            <button
              onClick={handleRotateLeft}
              className="bg-white text-black border-none w-12 h-12 rounded-full cursor-pointer transition-all duration-300 text-xl flex items-center justify-center hover:scale-110 active:scale-95"
              style={{ boxShadow: '0 4px 15px rgba(255, 255, 255, 0.3)' }}
            >
              ⬅️
            </button>
            <button
              onClick={handleRotateRight}
              className="bg-white text-black border-none w-12 h-12 rounded-full cursor-pointer transition-all duration-300 text-xl flex items-center justify-center hover:scale-110 active:scale-95"
              style={{ boxShadow: '0 4px 15px rgba(255, 255, 255, 0.3)' }}
            >
              ➡️
            </button>
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center"
        style={{ cursor: isDraggingRef.current ? 'grabbing' : 'grab' }}
      />

      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-sm opacity-60 z-10">
        Drag to rotate • Scroll to zoom • Arrows to tilt
      </p>
    </div>
  );
}