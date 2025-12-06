'use client';

import { COLORS, DIMENSIONS } from '@/lib/magritte/constants';
import * as THREE from 'three';

interface RoomProps {
  roomId?: number;
}

export default function Room({ roomId = 1 }: RoomProps) {
  const { roomWidth, roomHeight, roomDepth } = DIMENSIONS;
  const isBedroom = roomId === 2;

  // Create sky texture with clouds for bedroom
  const createSkyTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, COLORS.skyBlueLight);
    gradient.addColorStop(1, COLORS.skyBlue);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw clouds
    ctx.fillStyle = COLORS.cloudWhite;
    ctx.globalAlpha = 0.8;
    
    // Cloud 1
    ctx.beginPath();
    ctx.arc(100, 150, 40, 0, Math.PI * 2);
    ctx.arc(130, 150, 50, 0, Math.PI * 2);
    ctx.arc(160, 150, 40, 0, Math.PI * 2);
    ctx.fill();
    
    // Cloud 2
    ctx.beginPath();
    ctx.arc(300, 200, 35, 0, Math.PI * 2);
    ctx.arc(325, 200, 45, 0, Math.PI * 2);
    ctx.arc(350, 200, 35, 0, Math.PI * 2);
    ctx.fill();
    
    // Cloud 3
    ctx.beginPath();
    ctx.arc(200, 100, 30, 0, Math.PI * 2);
    ctx.arc(220, 100, 40, 0, Math.PI * 2);
    ctx.arc(240, 100, 30, 0, Math.PI * 2);
    ctx.fill();
    
    // Cloud 4
    ctx.beginPath();
    ctx.arc(400, 250, 35, 0, Math.PI * 2);
    ctx.arc(420, 250, 45, 0, Math.PI * 2);
    ctx.arc(440, 250, 35, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.globalAlpha = 1.0;
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  };

  const skyTexture = isBedroom ? createSkyTexture() : null;

  return (
    <group>
      {/* Ceiling */}
      <mesh position={[0, roomHeight, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial color={isBedroom ? COLORS.ceiling : COLORS.wallDark} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, roomHeight / 2, -roomDepth / 2]} receiveShadow>
        <planeGeometry args={[roomWidth, roomHeight]} />
        <meshStandardMaterial 
          color={isBedroom ? COLORS.skyBlue : COLORS.wall}
          map={skyTexture || undefined}
        />
      </mesh>

      {/* Left Wall */}
      <mesh
        position={[-roomWidth / 2, roomHeight / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[roomDepth, roomHeight]} />
        <meshStandardMaterial 
          color={isBedroom ? COLORS.skyBlue : COLORS.wall}
          map={skyTexture || undefined}
        />
      </mesh>

      {/* Right Wall */}
      <mesh
        position={[roomWidth / 2, roomHeight / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[roomDepth, roomHeight]} />
        <meshStandardMaterial 
          color={isBedroom ? COLORS.skyBlue : COLORS.wall}
          map={skyTexture || undefined}
        />
      </mesh>

      {/* Floor - wood or rug based on room */}
      {isBedroom ? (
        <>
          {/* Wooden floor base */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[roomWidth, roomDepth, 1, 1]} />
            <meshStandardMaterial
              color={COLORS.wood}
              roughness={0.8}
            />
          </mesh>
          
          {/* Wood plank lines */}
          {Array.from({ length: 20 }, (_, i) => (
            <mesh
              key={`plank-${i}`}
              position={[-roomWidth / 2 + (i + 0.5) * (roomWidth / 20), 0.001, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[0.02, roomDepth]} />
              <meshBasicMaterial color={COLORS.woodDark} />
            </mesh>
          ))}
          
          {/* Dark patterned rug in center */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.01, 0]}
            receiveShadow
          >
            <planeGeometry args={[roomWidth * 0.7, roomDepth * 0.6]} />
            <meshStandardMaterial
              color={COLORS.rugDark}
              roughness={0.9}
            />
          </mesh>
          
          {/* Rug pattern lines */}
          {Array.from({ length: 8 }, (_, i) => (
            <mesh
              key={`rug-line-${i}`}
              position={[-roomWidth * 0.35 + (i + 0.5) * (roomWidth * 0.7 / 8), 0.011, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[0.02, roomDepth * 0.6]} />
              <meshBasicMaterial color={COLORS.rugPattern} />
            </mesh>
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <mesh
              key={`rug-line-v-${i}`}
              position={[0, 0.011, -roomDepth * 0.3 + (i + 0.5) * (roomDepth * 0.6 / 6)]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[roomWidth * 0.7, 0.02]} />
              <meshBasicMaterial color={COLORS.rugPattern} />
            </mesh>
          ))}
        </>
      ) : (
        <>
          {/* Regular floor with wood plank effect */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[roomWidth, roomDepth, 1, 1]} />
            <meshStandardMaterial
              color={COLORS.floor}
              roughness={0.8}
            />
          </mesh>

          {/* Wood plank lines */}
          {Array.from({ length: 20 }, (_, i) => (
            <mesh
              key={`plank-${i}`}
              position={[-roomWidth / 2 + (i + 0.5) * (roomWidth / 20), 0.001, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[0.02, roomDepth]} />
              <meshBasicMaterial color={COLORS.floorDark} />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}
