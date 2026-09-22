"use client";

import { useRef, MutableRefObject, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

interface GarmentModelProps {
  color: string;
  materialType: "cotton" | "linen" | "silk";
  scrollProgress?: MutableRefObject<number>;
  modelUrl?: string; // Optional URL to load a real GLTF
  isInteractive?: boolean; // If true, disable scroll-based animation
}

// Procedural fallback garment if no modelUrl is provided
function ProceduralGarment({ color, materialProps }: { color: string, materialProps: any }) {
  return (
    <group position={[0, -0.5, 0]}>
      {/* Torso (Body) */}
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.7, 0.65, 1.8, 32, 1, false, 0, Math.PI * 2]} />
        <meshStandardMaterial color={color} {...materialProps} />
      </mesh>
      
      {/* Left Sleeve */}
      <mesh castShadow receiveShadow position={[-0.9, 1.1, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.25, 0.25, 0.8, 16]} />
        <meshStandardMaterial color={color} {...materialProps} />
      </mesh>
      
      {/* Right Sleeve */}
      <mesh castShadow receiveShadow position={[0.9, 1.1, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.25, 0.25, 0.8, 16]} />
        <meshStandardMaterial color={color} {...materialProps} />
      </mesh>
      
      {/* Collar */}
      <mesh castShadow receiveShadow position={[0, 1.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.35, 0.08, 16, 32]} />
        <meshStandardMaterial color={color} {...materialProps} />
      </mesh>

      {/* Hem */}
      <mesh castShadow receiveShadow position={[0, -0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.65, 0.04, 16, 32]} />
        <meshStandardMaterial color={color} {...materialProps} />
      </mesh>
    </group>
  );
}

// Component to load external GLTF
function LoadedGarment({ url, color, materialProps }: { url: string, color: string, materialProps: any }) {
  const { scene } = useGLTF(url);
  
  // Clone the scene so we can mutate it safely
  const clone = useMemo(() => scene.clone(), [scene]);

  // Apply color and material properties to all meshes
  useMemo(() => {
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          // If the model has multiple materials, you can filter by name here
          const mat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(color),
            ...materialProps,
          });
          mesh.material = mat;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      }
    });
  }, [clone, color, materialProps]);

  return <primitive object={clone} scale={1.5} position={[0, -1, 0]} />;
}

export function GarmentModel({ color, materialType, scrollProgress, modelUrl, isInteractive = false }: GarmentModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Procedural material properties
  const materialProps = useMemo(() => {
    switch (materialType) {
      case "silk":
        return { roughness: 0.1, metalness: 0.1, clearcoat: 1.0, clearcoatRoughness: 0.1 };
      case "linen":
        return { roughness: 0.9, metalness: 0.0, bumpScale: 0.02 };
      case "cotton":
      default:
        return { roughness: 0.7, metalness: 0.05 };
    }
  }, [materialType]);

  useFrame((state) => {
    if (!groupRef.current || isInteractive) return;

    // Optional subtle floating effect
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;

    // Apply scroll progress rotation if provided
    if (scrollProgress) {
      const p = scrollProgress.current;
      
      let targetRotationY = 0;
      
      if (p < 0.25) {
        targetRotationY = 0;
      } else if (p < 0.5) {
        targetRotationY = Math.PI / 2; // Side view
      } else if (p < 0.75) {
        targetRotationY = Math.PI; // Back view
      } else {
        targetRotationY = 0; // Front view again for configurator
      }

      // Smoothly interpolate rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      {modelUrl ? (
        <LoadedGarment url={modelUrl} color={color} materialProps={materialProps} />
      ) : (
        <ProceduralGarment color={color} materialProps={materialProps} />
      )}
    </group>
  );
}
