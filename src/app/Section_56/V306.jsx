import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function V306() {
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

    // Camera - optimized for mobile with smaller size
    const aspect = window.innerWidth / window.innerHeight;
    cameraRef.current = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    cameraRef.current.position.z = 3.5;

    // Renderer - full screen
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
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
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    
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
    const aspect = window.innerWidth / window.innerHeight;
    cameraRef.current.aspect = aspect;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
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
    cameraRef.current.position.z = 3.5;
  };

  const handleRotateLeft = () => {
    targetRotationRef.current.z += 0.3;
  };

  const handleRotateRight = () => {
    targetRotationRef.current.z -= 0.3;
  };

  return (
    <div className="w-screen h-screen relative flex flex-col bg-black overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 pt-3 pb-2">
        <h1 className="text-white text-xl sm:text-2xl font-bold text-center m-0" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
          3D Rotating Can
        </h1>
      </div>

      {/* 3D Canvas */}
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ cursor: isDraggingRef.current ? 'grabbing' : 'grab', touchAction: 'none' }}
      />

      {/* Bottom Controls Panel - Ultra Compact */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-3 py-2 backdrop-blur-md" style={{ background: 'rgba(0, 0, 0, 0.85)' }}>
        
        {/* Single Row - Auto Rotate + Reset */}
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`flex-1 py-1.5 rounded-lg transition-all duration-300 text-xs font-semibold active:scale-95 ${
              autoRotate
                ? 'bg-white text-black'
                : 'bg-white bg-opacity-20 text-white'
            }`}
          >
            🔄 Auto
          </button>
          <button
            onClick={handleResetView}
            className="flex-1 bg-white bg-opacity-20 text-white py-1.5 rounded-lg transition-all duration-300 text-xs font-semibold active:scale-95"
          >
            ↻ Reset
          </button>
          <button
            onClick={handleRotateLeft}
            className="bg-white text-black w-10 h-10 rounded-lg transition-all duration-300 text-lg flex items-center justify-center active:scale-90"
          >
            ⬅️
          </button>
          <button
            onClick={handleRotateRight}
            className="bg-white text-black w-10 h-10 rounded-lg transition-all duration-300 text-lg flex items-center justify-center active:scale-90"
          >
            ➡️
          </button>
        </div>

        {/* Shape Selector - Compact */}
        <div className="grid grid-cols-4 gap-1.5 mb-2">
          {[
            { shape: 'cylinder', emoji: '🥫' },
            { shape: 'cube', emoji: '📦' },
            { shape: 'sphere', emoji: '⚽' },
            { shape: 'cone', emoji: '🍦' }
          ].map(({ shape, emoji }) => (
            <button
              key={shape}
              onClick={() => handleShapeChange(shape)}
              className={`py-1.5 rounded-lg transition-all duration-300 active:scale-95 ${
                currentShape === shape
                  ? 'bg-white text-black'
                  : 'bg-white bg-opacity-20 text-white'
              }`}
            >
              <div className="text-xl">{emoji}</div>
            </button>
          ))}
        </div>

        {/* Upload Button - Compact */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-white text-black px-4 py-2 rounded-lg text-xs font-bold w-full transition-all duration-300 active:scale-95"
        >
          📷 Upload Image
        </button>
      </div>
    </div>
  );
}