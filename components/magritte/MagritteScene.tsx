'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import Room from './Room';
import Finger from './Finger';
import Vape from './Vape';
import Staircase from './Staircase';
import SireneText from './SireneText';
import Lighting from './Lighting';

export default function MagritteScene() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas
        shadows
        camera={{ position: [0, 4, 11], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#1a1a1a']} />

          <OrbitControls
            target={[0, 2.5, 0]}
            minDistance={6}
            maxDistance={18}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.1}
            enablePan={false}
            enableDamping
            dampingFactor={0.05}
          />

          <Lighting />
          <Room />
          <Finger />
          <Vape />
          <Staircase />
          <SireneText />
          {/* <Effects /> */}
        </Suspense>
      </Canvas>
    </div>
  );
}
