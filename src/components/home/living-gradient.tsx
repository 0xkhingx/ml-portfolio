"use client";

import { useEffect, useRef } from "react";

/**
 * A slow, living gradient in the site palette: domain-warped fbm noise
 * that drifts over time and bends gently toward the pointer. Light-mode
 * rendition of the Cuzzon "blue-hour" hero shader.
 *
 * The left/headline side stays cream for text contrast; colour pools to
 * the right. Renders one still frame under prefers-reduced-motion, pauses
 * off-screen, and falls back to a static CSS gradient without WebGL.
 */

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseOn;

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frag / uRes.y;
  vec2 m = uMouse / uRes.y;
  float t = uTime * 0.035;

  vec2 d = uv - m;
  float md = exp(-dot(d, d) * 5.0) * uMouseOn;
  vec2 q = vec2(fbm(uv * 1.3 + t), fbm(uv * 1.3 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(uv * 1.15 + 3.0 * q + vec2(1.7, 9.2) + t * 1.4 - d * md * 1.4),
                fbm(uv * 1.15 + 3.0 * q + vec2(8.3, 2.8) - t));
  float f = fbm(uv * 1.05 + 2.6 * r);

  vec3 cream = vec3(1.000, 0.992, 0.965);
  vec3 lilac = vec3(0.886, 0.831, 0.878);
  vec3 mist = vec3(0.580, 0.604, 0.694);
  vec3 slate = vec3(0.486, 0.494, 0.616);
  vec3 ink = vec3(0.298, 0.325, 0.447);

  // colour pools top-right (as in Cuzzon); the lower-left, where the
  // headline sits, stays light enough for ink text
  vec2 n = frag / uRes;
  float aspect = uRes.x / uRes.y;
  float lit = smoothstep(1.45, 0.05, distance(n * vec2(aspect, 1.0), vec2(0.8 * aspect, 0.72)));
  lit = 0.16 + 0.84 * lit;

  vec3 col = mix(cream, lilac, smoothstep(0.15, 0.5, f));
  col = mix(col, mist, smoothstep(0.3, 0.62, f) * 0.95 * lit);
  col = mix(col, slate, smoothstep(0.42, 0.74, 0.5 * q.x + 0.5 * f) * 0.9 * lit);
  col = mix(col, ink, smoothstep(0.5, 0.8, f) * 0.8 * lit);
  // light ribbons through the colour: the light-mode echo of Cuzzon's lilac embers
  col = mix(col, cream, pow(smoothstep(0.5, 0.86, r.y), 2.0) * 0.6 * lit);
  col = mix(col, lilac, md * 0.3);

  col += (hash(frag + fract(uTime) * 91.0) - 0.5) * 0.012; // dither against banding
  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = "attribute vec2 a; void main(){ gl_Position = vec4(a, 0.0, 1.0); }";

export function LivingGradient({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader) ?? "shader error");
      }
      return shader;
    };

    let uniforms: Record<string, WebGLUniformLocation | null>;
    try {
      const prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      gl.useProgram(prog);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
      );
      const loc = gl.getAttribLocation(prog, "a");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      uniforms = Object.fromEntries(
        ["uRes", "uTime", "uMouse", "uMouseOn"].map((k) => [
          k,
          gl.getUniformLocation(prog, k),
        ]),
      );
    } catch {
      return; // static CSS fallback stays visible
    }

    canvas.dataset.ready = "true";

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // The field is soft, so render below device resolution and let CSS upscale.
    let scale = 1;
    let W = 0;
    let H = 0;
    const pointer = { x: -9999, y: -9999, sx: -9999, sy: -9999, on: 0, onS: 0 };

    const resize = () => {
      scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.6;
      const rect = host.getBoundingClientRect();
      W = Math.max(1, Math.round(rect.width * scale));
      H = Math.max(1, Math.round(rect.height * scale));
      canvas.width = W;
      canvas.height = H;
      gl.viewport(0, 0, W, H);
    };
    resize();

    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      pointer.on = inside ? 1 : 0;
      if (!inside) return;
      pointer.x = (event.clientX - rect.left) * scale;
      pointer.y = H - (event.clientY - rect.top) * scale;
      if (pointer.sx < -9000) {
        pointer.sx = pointer.x;
        pointer.sy = pointer.y;
      }
    };
    const onLeave = () => {
      pointer.on = 0;
    };

    const t0 = performance.now();
    let last = t0;
    let raf = 0;
    let visible = true;

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const k = Math.min(1, dt * 6);
      pointer.sx += (pointer.x - pointer.sx) * k;
      pointer.sy += (pointer.y - pointer.sy) * k;
      pointer.onS += (pointer.on - pointer.onS) * Math.min(1, dt * 2.5);

      gl.uniform2f(uniforms.uRes, W, H);
      gl.uniform1f(uniforms.uTime, reduce ? 12 : (now - t0) / 1000 + 20);
      gl.uniform2f(uniforms.uMouse, pointer.sx, pointer.sy);
      gl.uniform1f(uniforms.uMouseOn, pointer.onS);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      draw(now);
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      last = performance.now();
      if (reduce) draw(last);
      else raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(host);

    const onResize = () => {
      resize();
      if (reduce) draw(performance.now());
    };
    const onVisibility = () => {
      if (!document.hidden && visible) start();
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    start();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_72%,transparent)] ${className}`}
    >
      {/* Static fallback: the same idea in CSS, visible until WebGL is ready */}
      <div className="living-gradient-fallback absolute inset-0" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000 data-[ready=true]:opacity-100"
      />
    </div>
  );
}
