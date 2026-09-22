"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { GarmentModel } from "./GarmentModel";
import { ConfiguratorUI } from "../configurator/ConfiguratorUI";
import { Suspense, useState, useRef } from "react";
import { useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function CameraRig({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const vec = new THREE.Vector3();
  const lookAt = new THREE.Vector3(0, 0, 0);

  useFrame(() => {
    const p = scrollProgress.current;

    // Scene 1: Introduction (0 - 0.25) -> Centered, zoomed out
    // Scene 2: Silhouette (0.25 - 0.5) -> Side view, slightly lower
    // Scene 3: Details (0.5 - 0.75) -> Zoomed in on torso/material
    // Scene 4: Configurator (0.75 - 1.0) -> Shifted left to make room for UI

    let targetX = 0;
    let targetY = 0;
    let targetZ = 6;
    let lookX = 0;
    let lookY = 0;

    if (p < 0.25) {
      targetZ = 6;
    } else if (p < 0.5) {
      targetY = -1;
      targetZ = 5;
    } else if (p < 0.75) {
      targetY = 0.5; // Look at collar/chest
      targetZ = 3;   // Zoom in
      lookY = 0.5;
    } else {
      targetX = -1.5; // Shift camera left
      targetZ = 5;
    }

    // Smoothly interpolate camera position and lookAt
    camera.position.lerp(vec.set(targetX, targetY, targetZ), 0.05);
    lookAt.lerp(new THREE.Vector3(lookX, lookY, 0), 0.05);
    camera.lookAt(lookAt);
  });

  return null;
}

export function ScrollytellingCanvas() {
  const [color, setColor] = useState("#859183");
  const [material, setMaterial] = useState<"cotton" | "linen" | "silk">("cotton");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Apply spring physics for buttery smooth 3D animation
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
    restDelta: 0.001
  });

  // We use a ref to pass the smooth scroll progress to the 3D scene without re-rendering
  const scrollProgressRef = useRef(0);
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    scrollProgressRef.current = latest;
  });

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-zinc-50 dark:bg-zinc-950">
      
      {/* Sticky container for the 3D Canvas */}
      <div className="w-full h-screen sticky top-0 overflow-hidden">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <color attach="background" args={["#f4f4f5"]} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <CameraRig scrollProgress={scrollProgressRef} />
          
          <Suspense fallback={null}>
            {/* The 3D Scene */}
            <GarmentModel color={color} materialType={material} scrollProgress={scrollProgressRef} />
            <Environment preset="city" />
            <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
          </Suspense>
        </Canvas>
      </div>

      {/* 2D HTML Content overlay, positioned over the sticky canvas */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        
        {/* Page 1: Form & Silhouette (0vh to 100vh) */}
        <div className="w-full h-screen flex items-center px-10 md:px-32">
          <div className="max-w-md pointer-events-auto">
            <h2 className="text-5xl font-bold font-plus-jakarta mb-4 text-black">Form & Silhouette</h2>
            <p className="text-lg text-zinc-600">
              Meticulously crafted lines designed to flatter and empower. Every curve and angle of the ENDEW silhouette is purpose-built.
            </p>
          </div>
        </div>
        
        {/* Page 2: Material Exploration (100vh to 200vh) */}
        <div className="w-full h-screen flex items-center justify-end px-10 md:px-32">
          <div className="max-w-md text-right pointer-events-auto">
            <h2 className="text-5xl font-bold font-plus-jakarta mb-4 text-black">Material Exploration</h2>
            <p className="text-lg text-zinc-600">
              Sourced from the finest mills. Whether it's breathable linen, structured cotton, or flowing silk, quality is woven into every thread.
            </p>
          </div>
        </div>
        
        {/* Page 3: Meticulous Details (200vh to 300vh) */}
        <div className="w-full h-screen flex items-center px-10 md:px-32">
          <div className="max-w-md pointer-events-auto">
            <h2 className="text-5xl font-bold font-plus-jakarta mb-4 text-black">Meticulous Details</h2>
            <p className="text-lg text-zinc-600">
              It's the subtle touches that define true luxury. Examine the collar, the seams, and the precision of the cut.
            </p>
          </div>
        </div>
        
        {/* Page 4: Configurator (300vh to 400vh) */}
        <div className="w-full h-screen flex items-center justify-end px-10 md:px-32">
          <div className="pointer-events-auto w-full max-w-md">
            <ConfiguratorUI 
              color={color} 
              setColor={setColor} 
              material={material} 
              setMaterial={setMaterial} 
            />
          </div>
        </div>
        
      </div>
    </div>
  );
}
