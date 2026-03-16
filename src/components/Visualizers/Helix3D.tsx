import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

const HelixStrand = ({ color, offset }: { color: string; offset: number }) => {
  const points = [];
  for (let i = 0; i < 20; i++) {
    const t = i * 0.5;
    points.push(new THREE.Vector3(Math.cos(t + offset) * 2, i * 0.5 - 5, Math.sin(t + offset) * 2));
  }
  const curve = new THREE.CatmullRomCurve3(points);
  return (
    <mesh>
      <tubeGeometry args={[curve, 64, 0.2, 8, false]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
};

export const Helix3D = () => {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 15] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <HelixStrand color="#06b6d4" offset={0} />
          <HelixStrand color="#a855f7" offset={Math.PI} />
        </Float>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};
