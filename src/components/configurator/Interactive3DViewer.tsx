"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import { PlaceholderGarment } from "../3d/PlaceholderGarment";
import { Suspense, useRef } from "react";

interface Interactive3DViewerProps {
  color: string;
  material: "cotton" | "linen" | "silk";
}

export function Interactive3DViewer({ color, material }: Interactive3DViewerProps) {
  // We use a mock static scroll progress for the placeholder garment so it doesn't rotate automatically
  const staticProgress = useRef(0);

  return (
    <div className="w-full h-full bg-zinc-50 dark:bg-zinc-950 rounded-xl overflow-hidden relative">
      <Canvas camera={{ position: [0, 1, 4], fov: 45 }}>
        <color attach="background" args={["#f4f4f5"]} />
        <ambientLight intensity={0.6} />
        <spotLight position={[5, 10, 5]} angle={0.2} penumbra={1} intensity={1} castShadow />
        <spotLight position={[-5, 5, 5]} angle={0.2} penumbra={1} intensity={0.5} />
        
        <Suspense fallback={null}>
          <PlaceholderGarment color={color} materialType={material} scrollProgress={staticProgress} />
          <Environment preset="city" />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={10} blur={2} far={4} />
        </Suspense>

        {/* OrbitControls allows the user to rotate and zoom the model manually */}
        <OrbitControls 
          enablePan={false} 
          minDistance={2} 
          maxDistance={8} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
      <div className="absolute bottom-4 left-4 pointer-events-none text-zinc-400 text-sm">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}
