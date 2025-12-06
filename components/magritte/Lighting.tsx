'use client';

export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} color="#ffe4d9" />

      <directionalLight
        position={[5, 10, 5]}
        intensity={1.2}
        color="#fff5ee"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.0001}
      />

      <directionalLight
        position={[-5, 6, 3]}
        intensity={0.4}
        color="#e0d0c0"
      />

      <pointLight
        position={[0, 8, -5]}
        intensity={0.3}
        color="#c4a5a0"
        distance={20}
      />

      <hemisphereLight args={['#c4a5a0', '#8b7355', 0.3]} />
    </>
  );
}
