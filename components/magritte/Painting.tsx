'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export default function Painting() {
  const groupRef = useRef<THREE.Group>(null);

  // Create a texture for "The Personal Values" painting
  const createPaintingTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Sky background with clouds
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#B0E0E6');
    gradient.addColorStop(1, '#87CEEB');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw clouds
    ctx.fillStyle = '#FFFFFF';
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
    
    ctx.globalAlpha = 1.0;
    
    // Draw simplified bed (left side)
    ctx.fillStyle = '#8B0000'; // Red mattress
    ctx.fillRect(50, 300, 120, 80);
    ctx.fillStyle = '#3a2a1a'; // Dark wood frame
    ctx.fillRect(45, 295, 130, 10);
    ctx.fillRect(45, 375, 130, 10);
    ctx.fillStyle = '#FFFFFF'; // White bedding
    ctx.fillRect(55, 305, 100, 20);
    
    // Draw simplified wardrobe (right side)
    ctx.fillStyle = '#3a2a1a'; // Dark wood
    ctx.fillRect(350, 200, 100, 200);
    ctx.fillStyle = '#2a1a1a'; // Slightly open doors
    ctx.fillRect(355, 205, 45, 190);
    ctx.fillRect(400, 205, 45, 190);
    
    // Draw comb on bed (simplified)
    ctx.fillStyle = '#8B4513'; // Brown/tortoiseshell
    ctx.fillRect(100, 250, 8, 60);
    // Comb teeth
    for (let i = 0; i < 8; i++) {
      ctx.fillRect(102 + i * 1.2, 310, 0.8, 15);
    }
    
    // Draw wine glass (center)
    ctx.strokeStyle = '#4a90d9';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(250, 350);
    ctx.lineTo(250, 380);
    ctx.lineTo(240, 400);
    ctx.lineTo(260, 400);
    ctx.lineTo(250, 380);
    ctx.stroke();
    
    // Draw soap bar (simplified)
    ctx.fillStyle = '#F5F5F5';
    ctx.fillRect(200, 380, 40, 25);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  };

  const paintingTexture = useMemo(() => createPaintingTexture(), []);

  const frameWidth = 4;
  const frameHeight = 3;
  const frameDepth = 0.1;
  const frameThickness = 0.15;

  return (
    <group ref={groupRef} position={[0, 5, -7.5]} castShadow>
      {/* Painting frame - ornate gold frame */}
      {/* Outer frame */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[frameWidth + frameThickness * 2, frameHeight + frameThickness * 2, frameDepth]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.4} />
      </mesh>
      
      {/* Inner frame edge */}
      <mesh position={[0, 0, frameDepth / 2 + 0.01]} castShadow>
        <boxGeometry args={[frameWidth, frameHeight, 0.02]} />
        <meshStandardMaterial color="#8B7355" roughness={0.5} />
      </mesh>
      
      {/* Painting canvas */}
      <mesh position={[0, 0, frameDepth / 2 + 0.02]} receiveShadow>
        <planeGeometry args={[frameWidth - 0.1, frameHeight - 0.1]} />
        <meshStandardMaterial map={paintingTexture} />
      </mesh>
      
      {/* Frame decorative corners */}
      {[
        [-frameWidth / 2, frameHeight / 2],
        [frameWidth / 2, frameHeight / 2],
        [-frameWidth / 2, -frameHeight / 2],
        [frameWidth / 2, -frameHeight / 2],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0]} castShadow>
          <boxGeometry args={[0.2, 0.2, frameDepth]} />
          <meshStandardMaterial color="#F4D03F" roughness={0.2} metalness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

