'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export default function BathroomWindow() {
  const groupRef = useRef<THREE.Group>(null);

  const frameColor = '#8B5A2B';

  // Create a Magritte-style surrealist view texture
  const createViewTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Pink/mauve background (like the Magritte painting frame)
    ctx.fillStyle = '#C4A5A0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw archway opening
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(80, canvas.height);
    ctx.lineTo(80, 180);
    ctx.arc(256, 180, 176, Math.PI, 0, false);
    ctx.lineTo(432, canvas.height);
    ctx.closePath();
    ctx.clip();

    // Sky gradient through archway
    const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    skyGradient.addColorStop(0, '#87CEEB');
    skyGradient.addColorStop(0.5, '#B0D4E8');
    skyGradient.addColorStop(0.7, '#C8DDE8');
    skyGradient.addColorStop(1, '#6A8FA0');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Clouds
    ctx.fillStyle = '#FFFFFF';
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.arc(150, 120, 30, 0, Math.PI * 2);
    ctx.arc(180, 115, 40, 0, Math.PI * 2);
    ctx.arc(210, 120, 30, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(320, 150, 25, 0, Math.PI * 2);
    ctx.arc(345, 145, 35, 0, Math.PI * 2);
    ctx.arc(370, 150, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Sea/horizon line
    ctx.fillStyle = '#5A7A8A';
    ctx.fillRect(80, 380, 352, 132);

    // Floating rock (surrealist element)
    ctx.fillStyle = '#8A8A8A';
    ctx.beginPath();
    ctx.ellipse(360, 280, 50, 40, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#6A6A6A';
    ctx.beginPath();
    ctx.ellipse(355, 290, 45, 35, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#9A9A9A';
    ctx.beginPath();
    ctx.ellipse(365, 270, 30, 25, 0, 0, Math.PI * 2);
    ctx.fill();

    // Two small figures on horizon
    ctx.fillStyle = '#2A3A5A';
    ctx.fillRect(180, 360, 8, 25);
    ctx.fillRect(195, 362, 8, 23);

    ctx.restore();

    // Surrealist face element (upside down, peering from top)
    ctx.fillStyle = '#E8C4B0';
    ctx.beginPath();
    ctx.ellipse(200, 80, 60, 75, 0, 0, Math.PI * 2);
    ctx.fill();

    // Face features (upside down)
    ctx.fillStyle = '#C4956A';
    ctx.beginPath();
    ctx.ellipse(200, 110, 15, 10, 0, 0, Math.PI * 2); // nose
    ctx.fill();

    ctx.fillStyle = '#C46A5A';
    ctx.beginPath();
    ctx.ellipse(200, 50, 20, 8, 0, 0, Math.PI * 2); // lips
    ctx.fill();

    // Eyes (appear at bottom since face is upside down)
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(175, 130, 12, 8, 0, 0, Math.PI * 2);
    ctx.ellipse(225, 130, 12, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#4A3A2A';
    ctx.beginPath();
    ctx.arc(175, 130, 5, 0, Math.PI * 2);
    ctx.arc(225, 130, 5, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  return (
    <group ref={groupRef} position={[0, 5, -7.5]}>
      {/* Window frame - outer */}
      <mesh castShadow>
        <boxGeometry args={[5, 4, 0.2]} />
        <meshStandardMaterial color={frameColor} roughness={0.5} />
      </mesh>

      {/* Window glass with Magritte painting view */}
      <mesh position={[0, 0, 0.15]}>
        <planeGeometry args={[4.5, 3.5]} />
        <meshBasicMaterial map={createViewTexture} />
      </mesh>

      {/* Window frame dividers */}
      <mesh position={[0, 0, 0.2]} castShadow>
        <boxGeometry args={[0.08, 3.5, 0.05]} />
        <meshStandardMaterial color={frameColor} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.2]} castShadow>
        <boxGeometry args={[4.5, 0.08, 0.05]} />
        <meshStandardMaterial color={frameColor} roughness={0.5} />
      </mesh>
    </group>
  );
}
