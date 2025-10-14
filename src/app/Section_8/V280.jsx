import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function V280() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const planesRef = useRef([]);
  const timeRef = useRef(0);
  const previousTimeRef = useRef(0);
  const animationIdRef = useRef(null);

  const images = [
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ae0_slider%20img%201-min.webp',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80adf_slider%20img%202-min.png',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80add_slider%20img%203-min.webp',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ade_slider%20img%204-min.png',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ae1_slider%20img%205-min.webp',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ae2_slider%20img%208-min.png',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ae4_slider%20img%209-min.png',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ae6_slider%20img%2010-min.webp',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ae5_slider%20img%2011-min.png',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ae0_slider%20img%201-min.webp',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80adf_slider%20img%202-min.png',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80add_slider%20img%203-min.webp',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ade_slider%20img%204-min.png',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ae1_slider%20img%205-min.webp',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ae2_slider%20img%208-min.png',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ae4_slider%20img%209-min.png',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ae6_slider%20img%2010-min.webp',
    'https://cdn.prod.website-files.com/676eb533fc85a4a340e80a98/676eb533fc85a4a340e80ae5_slider%20img%2011-min.png'
  ];

  const options = {
    speed: 25,
    gap: 10,
    curve: 8,
    direction: -1
  };

  const getWidth = (gap) => 1 + gap / 100;

  const getPlaneWidth = (camera, container) => {
    const vFov = camera.fov * Math.PI / 180;
    const height = 2 * Math.tan(vFov / 2) * camera.position.z;
    const aspect = container.clientWidth / container.clientHeight;
    const width = height * aspect;
    return container.clientWidth / width;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 20);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    const geometry = new THREE.PlaneGeometry(0.8, 1.1, 20, 20);
    const planeSpace = getPlaneWidth(camera, container) * getWidth(options.gap);
    const totalImages = Math.ceil(container.clientWidth / planeSpace) + images.length + 2;
    const initialOffset = Math.ceil(container.clientWidth / (2 * planeSpace) - 0.5);

    let allImages = [];
    for (let i = 0; i < totalImages; i++) {
      allImages.push(images[i % images.length]);
    }

    allImages.forEach((imageSrc, i) => {
      const loader = new THREE.TextureLoader();
      loader.load(imageSrc, (texture) => {
        const material = new THREE.ShaderMaterial({
          uniforms: {
            tex: { value: texture },
            curve: { value: options.curve }
          },
          vertexShader: `
            uniform float curve;
            varying vec2 vertexUV;
            void main() {
              vertexUV = uv;
              vec3 newPosition = position;
              float distanceFromCenter = abs((modelMatrix * vec4(position, 1.0)).x);
              newPosition.y *= 1.0 + (curve / 100.0) * pow(distanceFromCenter, 2.0);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
            }
          `,
          fragmentShader: `
            uniform sampler2D tex;
            varying vec2 vertexUV;
            void main() {
              gl_FragColor = texture2D(tex, vertexUV);
            }
          `
        });

        planesRef.current[i] = new THREE.Mesh(geometry, material);
        planesRef.current[i].position.x = -1 * options.direction * (i - initialOffset) * getWidth(options.gap);
        scene.add(planesRef.current[i]);
      });
    });

    const animate = (currentTime) => {
      const timePassed = currentTime - previousTimeRef.current;

      if (Math.abs(scene.position.x) >= getWidth(options.gap) * images.length) {
        timeRef.current = 0;
      }

      timeRef.current += options.direction * timePassed * 0.00001;
      scene.position.x = timeRef.current * options.speed;

      renderer.render(scene, camera);
      previousTimeRef.current = currentTime;
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative bg-[#0a0a0a] text-white overflow-x-hidden">
      <h2 
        className="text-4xl font-normal text-center max-w-[90%] mb-6 leading-tight z-10 relative"
        style={{ animation: 'fadeInDown 1s ease-out' }}
      >
        Create stunning fashion photos using AI models
      </h2>
      
      <div className="w-screen h-[60vh] min-h-[450px] relative mb-6 overflow-hidden">
        <div 
          className="absolute top-[-80px] left-1/2 -translate-x-1/2 z-10 w-[110vw] h-[150px] pointer-events-none"
          style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, transparent 100%)' }}
        />
        <div 
          ref={containerRef}
          className="absolute top-0 left-0 w-full h-full"
        />
        <div 
          className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 z-10 w-[110vw] h-[150px] pointer-events-none"
          style={{ background: 'linear-gradient(0deg, #0a0a0a 0%, transparent 100%)' }}
        />
      </div>

      <div 
        className="text-center z-10 relative"
        style={{ animation: 'fadeInUp 1s ease-out 0.3s backwards' }}
      >
        {/* <div className="text-base mb-4 max-w-[700px] leading-relaxed opacity-95 px-4">
          From briefs to stunning images in seconds: save time, cut costs, and drive success!
        </div>
        <button className="h-[50px] w-[150px] rounded-[20px] text-black bg-white border-none cursor-pointer text-base">
          Get started for free
        </button> */}
      </div>

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
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
