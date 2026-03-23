"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  AdaptiveDpr,
  AdaptiveEvents,
  Preload,
  PerformanceMonitor,
} from "@react-three/drei";
import { useState, useEffect, Component } from "react";
import type React from "react";

interface Scene3DProps {
  children?: React.ReactNode;
  className?: string;
  enableControls?: boolean;
  fallback?: React.ReactNode;
}

// ─── WebGL availability check (cached) ───
let webglSupported: boolean | null = null;

function isWebGLAvailable(): boolean {
  if (webglSupported !== null) return webglSupported;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    webglSupported = gl !== null;
    // Clean up context immediately
    if (gl && "getExtension" in gl) {
      (gl as WebGLRenderingContext)
        .getExtension("WEBGL_lose_context")
        ?.loseContext();
    }
  } catch {
    webglSupported = false;
  }
  return webglSupported;
}

// ─── Error Boundary for WebGL crashes ───
interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: {
    children: React.ReactNode;
    fallback?: React.ReactNode;
  }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // Silence WebGL context errors — expected on low-end devices
    if (
      error.message?.includes("WebGL") ||
      error.message?.includes("context")
    ) {
      return;
    }
    console.warn("[Scene3D] Render error:", error.message);
  }

  render() {
    if (this.state.hasError) {
      return (this.props.fallback ?? null) as React.ReactElement | null;
    }
    return this.props.children;
  }
}

/**
 * High-Performance 3D Scene Wrapper
 * - WebGL availability check (prevents context storm)
 * - Error boundary for graceful degradation
 * - Dynamic Resolution Scaling (PerformanceMonitor)
 * - Adaptive Events during high load
 * - Pre-allocated resources (Preload)
 */
export function Scene3D({
  children,
  className = "",
  enableControls = false,
  fallback,
}: Scene3DProps) {
  const [dpr, setDpr] = useState(1.5);
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    setCanRender(isWebGLAvailable());
  }, []);

  if (!canRender) {
    return (
      <div className={`w-full h-full ${className}`}>
        {fallback ?? null}
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <WebGLErrorBoundary fallback={fallback}>
        <Canvas
          camera={{ position: [0, 0, 130], fov: 40 }}
          dpr={dpr}
          performance={{ min: 0.5 }}
          gl={{
            antialias: false,
            powerPreference: "high-performance",
            preserveDrawingBuffer: false,
            alpha: true,
            stencil: false,
            depth: true,
          }}
          onCreated={({ gl }) => {
            const canvas = gl.domElement;
            canvas.addEventListener(
              "webglcontextlost",
              (e) => {
                e.preventDefault();
                console.warn("[Scene3D] WebGL context lost");
              },
              { once: true },
            );
          }}
        >
          <PerformanceMonitor
            onIncline={() => setDpr((prev) => (prev === 2 ? prev : 2))}
            onDecline={() => setDpr((prev) => (prev === 1 ? prev : 1))}
            flipflops={3}
            onFallback={() => setDpr(1)}
          />

          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <Preload all />

          {children}

          {enableControls && (
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              rotateSpeed={0.5}
            />
          )}
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
