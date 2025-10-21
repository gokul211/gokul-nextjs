import { useRef, useEffect, useCallback } from 'react';

export default function V310() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  const pointer = useRef({
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    moved: false,
  });

  const isPreview = useRef(true);
  const glRef = useRef(null);
  const programsRef = useRef({});
  const texturesRef = useRef({});

  // Shader sources
  const shaders = {
    vertShader: `
      precision highp float;
      varying vec2 vUv;
      attribute vec2 a_position;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 u_texel;

      void main () {
          vUv = .5 * (a_position + 1.);
          vL = vUv - vec2(u_texel.x, 0.);
          vR = vUv + vec2(u_texel.x, 0.);
          vT = vUv + vec2(0., u_texel.y);
          vB = vUv - vec2(0., u_texel.y);
          gl_Position = vec4(a_position, 0., 1.);
      }
    `,
    fragShaderAdvection: `
      precision highp float;
      precision highp sampler2D;

      varying vec2 vUv;
      uniform sampler2D u_velocity_texture;
      uniform sampler2D u_input_texture;
      uniform vec2 u_texel;
      uniform float u_dt;

      vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
          vec2 st = uv / tsize - 0.5;
          vec2 iuv = floor(st);
          vec2 fuv = fract(st);

          vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
          vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
          vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
          vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

          return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
      }

      void main () {
          vec2 coord = vUv - u_dt * bilerp(u_velocity_texture, vUv, u_texel).xy * u_texel;
          float dissipation = 0.96;
          gl_FragColor = dissipation * bilerp(u_input_texture, coord, u_texel);
          gl_FragColor.a = 1.;
      }
    `,
    fragShaderDivergence: `
      precision highp float;
      precision highp sampler2D;

      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D u_velocity_texture;

      void main () {
          float L = texture2D(u_velocity_texture, vL).x;
          float R = texture2D(u_velocity_texture, vR).x;
          float T = texture2D(u_velocity_texture, vT).y;
          float B = texture2D(u_velocity_texture, vB).y;

          float div = .6 * (R - L + T - B);
          gl_FragColor = vec4(div, 0., 0., 1.);
      }
    `,
    fragShaderPressure: `
      precision highp float;
      precision highp sampler2D;

      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D u_pressure_texture;
      uniform sampler2D u_divergence_texture;

      void main () {
          float L = texture2D(u_pressure_texture, vL).x;
          float R = texture2D(u_pressure_texture, vR).x;
          float T = texture2D(u_pressure_texture, vT).x;
          float B = texture2D(u_pressure_texture, vB).x;
          float divergence = texture2D(u_divergence_texture, vUv).x;

          float pressure = (L + R + B + T - divergence) * 0.25;
          gl_FragColor = vec4(pressure, 0., 0., 1.);
      }
    `,
    fragShaderGradientSubtract: `
      precision highp float;
      precision highp sampler2D;

      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D u_pressure_texture;
      uniform sampler2D u_velocity_texture;

      void main () {
          float L = texture2D(u_pressure_texture, vL).x;
          float R = texture2D(u_pressure_texture, vR).x;
          float T = texture2D(u_pressure_texture, vT).x;
          float B = texture2D(u_pressure_texture, vB).x;
          vec2 velocity = texture2D(u_velocity_texture, vUv).xy;
          velocity.xy -= vec2(R - L, T - B);
          gl_FragColor = vec4(velocity, 0., 1.);
      }
    `,
    fragShaderPoint: `
      precision highp float;
      precision highp sampler2D;

      varying vec2 vUv;
      uniform sampler2D u_input_texture;
      uniform float u_ratio;
      uniform vec3 u_point_value;
      uniform vec2 u_point;
      uniform float u_point_size;

      void main () {
          vec2 p = vUv - u_point.xy;
          p.x *= u_ratio;
          vec3 splat = pow(2., -dot(p, p) / u_point_size) * u_point_value;

          vec3 base = texture2D(u_input_texture, vUv).xyz;
          gl_FragColor = vec4(base + splat, 1.);
      }
    `,
    fragShaderOutputShader: `
      precision highp float;
      precision highp sampler2D;

      varying vec2 vUv;
      uniform sampler2D u_output_texture;

      void main () {
          vec3 C = texture2D(u_output_texture, vUv).rgb;
          gl_FragColor = vec4(vec3(1.) - C, 1.);
      }
    `
  };

  const createShader = useCallback((sourceCode, type) => {
    const gl = glRef.current;
    if (!gl) return null;
    
    const shader = gl.createShader(type);
    gl.shaderSource(shader, sourceCode);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compilation error: " + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }, []);

  const createProgram = useCallback((vertexSource, fragmentSource) => {
    const gl = glRef.current;
    if (!gl) return null;

    const vertexShader = createShader(vertexSource, gl.VERTEX_SHADER);
    const fragmentShader = createShader(fragmentSource, gl.FRAGMENT_SHADER);
    
    if (!vertexShader || !fragmentShader) return null;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error: " + gl.getProgramInfoLog(program));
      return null;
    }

    return program;
  }, [createShader]);

  const getUniforms = useCallback((program) => {
    const gl = glRef.current;
    if (!gl || !program) return {};
    
    let uniforms = {};
    let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uniformCount; i++) {
      let uniformName = gl.getActiveUniform(program, i).name;
      uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
    }
    return uniforms;
  }, []);

  const createFBO = useCallback((w, h, type = glRef.current?.RGBA) => {
    const gl = glRef.current;
    if (!gl || w === 0 || h === 0) return null;

    gl.activeTexture(gl.TEXTURE0);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, type, w, h, 0, type, gl.FLOAT, null);

    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);

    return {
      fbo,
      width: w,
      height: h,
      attach(id) {
        gl.activeTexture(gl.TEXTURE0 + id);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        return id;
      }
    };
  }, []);

  const createDoubleFBO = useCallback((w, h, type) => {
    let fbo1 = createFBO(w, h, type);
    let fbo2 = createFBO(w, h, type);

    if (!fbo1 || !fbo2) return null;

    return {
      width: w,
      height: h,
      texelSizeX: 1. / w,
      texelSizeY: 1. / h,
      read: () => fbo1,
      write: () => fbo2,
      swap() {
        let temp = fbo1;
        fbo1 = fbo2;
        fbo2 = temp;
      }
    };
  }, [createFBO]);

  const blit = useCallback((target) => {
    const gl = glRef.current;
    if (!gl) return;

    if (target == null) {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    } else {
      gl.viewport(0, 0, target.width, target.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    }
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  }, []);

  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    glRef.current = gl;
    
    // Try to get float texture extension
    const floatExtension = gl.getExtension('OES_texture_float');
    if (!floatExtension) {
      console.error('Float textures not supported');
      return;
    }

    // Create vertex buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    // Create shader programs
    programsRef.current = {
      splatProgram: createProgram(shaders.vertShader, shaders.fragShaderPoint),
      divergenceProgram: createProgram(shaders.vertShader, shaders.fragShaderDivergence),
      pressureProgram: createProgram(shaders.vertShader, shaders.fragShaderPressure),
      gradientSubtractProgram: createProgram(shaders.vertShader, shaders.fragShaderGradientSubtract),
      advectionProgram: createProgram(shaders.vertShader, shaders.fragShaderAdvection),
      outputShaderProgram: createProgram(shaders.vertShader, shaders.fragShaderOutputShader)
    };

    // Get uniforms for each program
    Object.keys(programsRef.current).forEach(programName => {
      if (programsRef.current[programName]) {
        programsRef.current[programName].uniforms = getUniforms(programsRef.current[programName]);
      }
    });

    // Initialize FBOs
    const container = containerRef.current;
    if (!container) return;

    const fboSize = [
      Math.max(1, Math.floor(0.5 * container.clientWidth)),
      Math.max(1, Math.floor(0.5 * container.clientHeight)),
    ];

    texturesRef.current = {
      outputColor: createDoubleFBO(fboSize[0], fboSize[1]),
      velocity: createDoubleFBO(fboSize[0], fboSize[1], gl.RG),
      divergence: createFBO(fboSize[0], fboSize[1], gl.RGB),
      pressure: createDoubleFBO(fboSize[0], fboSize[1], gl.RGB)
    };
  }, [createProgram, createDoubleFBO, createFBO, getUniforms]);

  const render = useCallback((t) => {
    if (!glRef.current || !programsRef.current.splatProgram) {
      animationRef.current = requestAnimationFrame(render);
      return;
    }

    const gl = glRef.current;
    const { outputColor, velocity, divergence, pressure } = texturesRef.current;
    
    if (!outputColor || !velocity || !divergence || !pressure) {
      animationRef.current = requestAnimationFrame(render);
      return;
    }

    const dt = 1 / 60;

    // Auto preview movement
    if (t && isPreview.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      updateMousePosition(
        rect.left + (0.5 - 0.45 * Math.sin(0.003 * t - 2)) * rect.width,
        rect.top + (0.5 + 0.1 * Math.sin(0.0025 * t) + 0.1 * Math.cos(0.002 * t)) * rect.height
      );
    }

    // Handle pointer movement
    if (pointer.current.moved) {
      if (!isPreview.current) {
        pointer.current.moved = false;
      }

      const { splatProgram } = programsRef.current;
      if (splatProgram && splatProgram.uniforms) {
        gl.useProgram(splatProgram);
        
        // Velocity splat
        gl.uniform1i(splatProgram.uniforms.u_input_texture, velocity.read().attach(1));
        gl.uniform1f(splatProgram.uniforms.u_ratio, canvasRef.current.width / canvasRef.current.height);
        gl.uniform2f(splatProgram.uniforms.u_point, pointer.current.x / canvasRef.current.width, 1 - pointer.current.y / canvasRef.current.height);
        gl.uniform3f(splatProgram.uniforms.u_point_value, pointer.current.dx, -pointer.current.dy, 1);
        gl.uniform1f(splatProgram.uniforms.u_point_size, 4 / (containerRef.current?.clientHeight || 1000));
        blit(velocity.write());
        velocity.swap();

        // Color splat
        gl.uniform1i(splatProgram.uniforms.u_input_texture, outputColor.read().attach(1));
        gl.uniform3f(splatProgram.uniforms.u_point_value, 1.0, 0.0, 0.0); // Purple color
        blit(outputColor.write());
        outputColor.swap();
      }
    }

    // Divergence
    const { divergenceProgram } = programsRef.current;
    if (divergenceProgram && divergenceProgram.uniforms) {
      gl.useProgram(divergenceProgram);
      gl.uniform2f(divergenceProgram.uniforms.u_texel, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(divergenceProgram.uniforms.u_velocity_texture, velocity.read().attach(1));
      blit(divergence);
    }

    // Pressure
    const { pressureProgram } = programsRef.current;
    if (pressureProgram && pressureProgram.uniforms) {
      gl.useProgram(pressureProgram);
      gl.uniform2f(pressureProgram.uniforms.u_texel, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(pressureProgram.uniforms.u_divergence_texture, divergence.attach(1));

      for (let i = 0; i < 10; i++) {
        gl.uniform1i(pressureProgram.uniforms.u_pressure_texture, pressure.read().attach(2));
        blit(pressure.write());
        pressure.swap();
      }
    }

    // Gradient subtract
    const { gradientSubtractProgram } = programsRef.current;
    if (gradientSubtractProgram && gradientSubtractProgram.uniforms) {
      gl.useProgram(gradientSubtractProgram);
      gl.uniform2f(gradientSubtractProgram.uniforms.u_texel, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gradientSubtractProgram.uniforms.u_pressure_texture, pressure.read().attach(1));
      gl.uniform1i(gradientSubtractProgram.uniforms.u_velocity_texture, velocity.read().attach(2));
      blit(velocity.write());
      velocity.swap();
    }

    // Advection - velocity
    const { advectionProgram } = programsRef.current;
    if (advectionProgram && advectionProgram.uniforms) {
      gl.useProgram(advectionProgram);
      gl.uniform2f(advectionProgram.uniforms.u_texel, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(advectionProgram.uniforms.u_velocity_texture, velocity.read().attach(1));
      gl.uniform1i(advectionProgram.uniforms.u_input_texture, velocity.read().attach(1));
      gl.uniform1f(advectionProgram.uniforms.u_dt, dt);
      blit(velocity.write());
      velocity.swap();

      // Advection - color
      gl.uniform2f(advectionProgram.uniforms.u_texel, outputColor.texelSizeX, outputColor.texelSizeY);
      gl.uniform1i(advectionProgram.uniforms.u_input_texture, outputColor.read().attach(2));
      blit(outputColor.write());
      outputColor.swap();
    }

    // Final output
    const { outputShaderProgram } = programsRef.current;
    if (outputShaderProgram && outputShaderProgram.uniforms) {
      gl.useProgram(outputShaderProgram);
      gl.uniform1i(outputShaderProgram.uniforms.u_output_texture, outputColor.read().attach(1));
      blit(null);
    }

    animationRef.current = requestAnimationFrame(render);
  }, [blit]);

  const updateMousePosition = useCallback((eX, eY) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = eX - rect.left;
    const y = eY - rect.top;

    // Only update if within container bounds
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      pointer.current.moved = true;
      pointer.current.dx = 5 * (x - pointer.current.x);
      pointer.current.dy = 5 * (y - pointer.current.y);
      pointer.current.x = x;
      pointer.current.y = y;
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    isPreview.current = false;
    updateMousePosition(e.clientX, e.clientY);
  }, [updateMousePosition]);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    isPreview.current = false;
    updateMousePosition(e.touches[0].clientX, e.touches[0].clientY);
  }, [updateMousePosition]);

  const resizeCanvas = useCallback(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    if (glRef.current) {
      initWebGL();
    }
  }, [initWebGL]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize with a small delay to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      resizeCanvas();
      initWebGL();
    }, 100);

    // Start animation
    animationRef.current = requestAnimationFrame(render);

    // Event listeners
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);

    return () => {
      clearTimeout(initTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      resizeObserver.disconnect();
    };
  }, [initWebGL, render, resizeCanvas, handleMouseMove, handleTouchMove]);

  return (
    <div className="relative w-full bg-black overflow-hidden">
      
      {/* Fluid Canvas Container with Reduced Height */}
      <div 
        ref={containerRef} 
        className="relative w-full h-[400px] "
        style={{ height: '200px',border:"1px solid black"}} // Fixed height
      >
        <canvas 
          ref={canvasRef} 
          className="w-full h-full block "
        />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-black  pointer-events-none">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            V310 - Fluid Cursor
          </h1>
          <p className="text-base md:text-lg opacity-80 text-center max-w-md px-4">
            Move your cursor here to see the fluid animation
          </p>
        </div>
      </div>

      {/* Optional: Additional content below the fluid area */}
      {/* <div className="p-6 text-white text-center">
        <p className="opacity-70">
          This fluid animation is contained within the black box above with reduced height (400px).
        </p>
      </div> */}
    </div>
  );
}