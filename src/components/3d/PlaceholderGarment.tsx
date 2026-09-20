"use client";

import { useRef, MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PlaceholderGarmentProps {
  color: string;
  materialType: "cotton" | "linen" | "silk";
  scrollProgress: MutableRefObject<number>;
}

export function PlaceholderGarment({ color, materialType, scrollProgress }: PlaceholderGarmentProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Basic material properties based on type
  const materialProps = {
    roughness: materialType === "silk" ? 0.2 : materialType === "cotton" ? 0.8 : 0.9,
    metalness: materialType === "silk" ? 0.3 : 0.1,
  };

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // progress goes from 0 to 1
    const p = scrollProgress.current;

    // Initial subtle floating
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;

    // Scroll based rotation
    // Scene 1: Introduction (face forward, slowly rotate)
    // Scene 2: Silhouette (rotate to side)
    // Scene 3: Details (zoom in, rotate to back)
    
    // Let's use simple interpolation
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      p * Math.PI * 2,
      0.1
    );

    // Zoom effect based on scroll (up to 1.7x)
    const scale = 1 + p * 0.7;
    groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
  });

  return (
    <group ref={groupRef}>
      {/* Torso (Body) */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.7, 2, 32]} />
        <meshStandardMaterial color={color} {...materialProps} />
      </mesh>
      
      {/* Left Sleeve */}
      <mesh castShadow receiveShadow position={[-1, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.3, 0.3, 1, 16]} />
        <meshStandardMaterial color={color} {...materialProps} />
      </mesh>
      
      {/* Right Sleeve */}
      <mesh castShadow receiveShadow position={[1, 0.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.3, 0.3, 1, 16]} />
        <meshStandardMaterial color={color} {...materialProps} />
      </mesh>
      
      {/* Collar */}
      <mesh castShadow receiveShadow position={[0, 1.1, 0]}>
        <torusGeometry args={[0.4, 0.1, 16, 32]} />
        <meshStandardMaterial color={color} {...materialProps} />
      </mesh>
    </group>
  );
}
