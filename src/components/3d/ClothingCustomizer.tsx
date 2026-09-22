'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, Environment } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface ClothingCustomizerProps {
  color: string;
}

function BasicShirt({ color }: { color: string }) {
  const material = useMemo(() => new THREE.MeshStandardMaterial({ color, roughness: 0.8 }), [color]);

  return (
    <group>
      {/* Torso */}
      <mesh material={material} position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1, 3, 32]} />
      </mesh>
      
      {/* Left Sleeve */}
      <mesh material={material} position={[-1.3, 1, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.4, 0.4, 1.5, 32]} />
      </mesh>
      
      {/* Right Sleeve */}
      <mesh material={material} position={[1.3, 1, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.4, 0.4, 1.5, 32]} />
      </mesh>
    </group>
  );
}

export default function ClothingCustomizer({ color }: ClothingCustomizerProps) {
  return (
    <div className="w-full h-full min-h-[400px] bg-muted/20 rounded-xl overflow-hidden shadow-inner cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />
        <Center>
          <BasicShirt color={color} />
        </Center>
        <OrbitControls enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} />
      </Canvas>
    </div>
  );
}
