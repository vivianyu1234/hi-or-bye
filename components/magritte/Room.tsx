'use client';

import { COLORS, DIMENSIONS } from '@/lib/magritte/constants';
import * as THREE from 'three';

interface RoomProps {
  roomId?: number;
}

export default function Room({ roomId = 1 }: RoomProps) {
  const { roomWidth, roomHeight, roomDepth } = DIMENSIONS;
  const isBedroom = roomId === 2;
  const isBathroom = roomId === 3;

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
        <meshStandardMaterial color={isBedroom ? COLORS.ceiling : isBathroom ? '#C4956A' : COLORS.wallDark} />
      </mesh>

      {/* Wood ceiling planks for bathroom */}
      {isBathroom && Array.from({ length: 25 }, (_, i) => (
        <mesh
          key={`ceiling-plank-${i}`}
          position={[-roomWidth / 2 + (i + 0.5) * (roomWidth / 25), roomHeight - 0.001, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.02, roomDepth]} />
          <meshBasicMaterial color="#A67B52" />
        </mesh>
      ))}

      {/* Back Wall */}
      {isBathroom ? (
        <>
          {/* Upper wood paneling */}
          <mesh position={[0, roomHeight * 0.7, -roomDepth / 2]} receiveShadow>
            <planeGeometry args={[roomWidth, roomHeight * 0.6]} />
            <meshStandardMaterial color="#C4956A" roughness={0.6} />
          </mesh>
          {/* Lower tile section */}
          <mesh position={[0, roomHeight * 0.2, -roomDepth / 2 + 0.01]} receiveShadow>
            <planeGeometry args={[roomWidth, roomHeight * 0.4]} />
            <meshStandardMaterial color="#E8E0D5" roughness={0.4} />
          </mesh>
        </>
      ) : (
        <mesh position={[0, roomHeight / 2, -roomDepth / 2]} receiveShadow>
          <planeGeometry args={[roomWidth, roomHeight]} />
          <meshStandardMaterial color={isBedroom ? COLORS.skyBlue : COLORS.wall} />
        </mesh>
      )}

      {/* Left Wall */}
      {isBathroom ? (
        <>
          <mesh position={[-roomWidth / 2, roomHeight * 0.7, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
            <planeGeometry args={[roomDepth, roomHeight * 0.6]} />
            <meshStandardMaterial color="#C4956A" roughness={0.6} />
          </mesh>
          <mesh position={[-roomWidth / 2 + 0.01, roomHeight * 0.2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
            <planeGeometry args={[roomDepth, roomHeight * 0.4]} />
            <meshStandardMaterial color="#E8E0D5" roughness={0.4} />
          </mesh>
        </>
      ) : (
        <mesh position={[-roomWidth / 2, roomHeight / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[roomDepth, roomHeight]} />
          <meshStandardMaterial color={isBedroom ? COLORS.skyBlue : COLORS.wall} />
        </mesh>
      )}

      {/* Right Wall */}
      {isBathroom ? (
        <>
          <mesh position={[roomWidth / 2, roomHeight * 0.7, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
            <planeGeometry args={[roomDepth, roomHeight * 0.6]} />
            <meshStandardMaterial color="#C4956A" roughness={0.6} />
          </mesh>
          <mesh position={[roomWidth / 2 - 0.01, roomHeight * 0.2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
            <planeGeometry args={[roomDepth, roomHeight * 0.4]} />
            <meshStandardMaterial color="#E8E0D5" roughness={0.4} />
          </mesh>
        </>
      ) : (
        <mesh position={[roomWidth / 2, roomHeight / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[roomDepth, roomHeight]} />
          <meshStandardMaterial color={isBedroom ? COLORS.skyBlue : COLORS.wall} />
        </mesh>
      )}

      {/* Floor - wood, rug, or tile based on room */}
      {isBedroom ? (
        <>
          {/* Cream/beige wooden floor base */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[roomWidth, roomDepth, 1, 1]} />
            <meshStandardMaterial
              color={COLORS.room2Floor}
              roughness={0.7}
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
              <meshBasicMaterial color={COLORS.room2FloorDark} />
            </mesh>
          ))}

          {/* Green and white striped rug */}
          {Array.from({ length: 12 }, (_, i) => (
            <mesh
              key={`rug-stripe-${i}`}
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, 0.01, -roomDepth * 0.25 + i * (roomDepth * 0.5 / 12)]}
              receiveShadow
            >
              <planeGeometry args={[roomWidth * 0.6, roomDepth * 0.5 / 12]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? COLORS.rugDark : COLORS.rugPattern}
                roughness={0.9}
              />
            </mesh>
          ))}
        </>
      ) : isBathroom ? (
        <>
          {/* Bathroom tile floor - cream/beige */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[roomWidth, roomDepth, 1, 1]} />
            <meshStandardMaterial
              color="#E8E0D5"
              roughness={0.5}
            />
          </mesh>

          {/* Small tile grid lines */}
          {Array.from({ length: 28 }, (_, i) => (
            <mesh
              key={`tile-line-h-${i}`}
              position={[-roomWidth / 2 + (i + 0.5) * (roomWidth / 28), 0.001, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[0.015, roomDepth]} />
              <meshBasicMaterial color="#D8D0C5" />
            </mesh>
          ))}
          {Array.from({ length: 32 }, (_, i) => (
            <mesh
              key={`tile-line-v-${i}`}
              position={[0, 0.001, -roomDepth / 2 + (i + 0.5) * (roomDepth / 32)]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[roomWidth, 0.015]} />
              <meshBasicMaterial color="#D8D0C5" />
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
