'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS, DIMENSIONS, POSITIONS } from '@/lib/magritte/constants';

export default function StripedBall() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const { ballRadius, fingerHeight } = DIMENSIONS;
  const { finger: fingerPos } = POSITIONS;

  const ballY = fingerHeight + ballRadius * 0.85;

  const stripedMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        stripeCount: { value: 6 },
        color1: { value: new THREE.Color(COLORS.ballWhite) },
        color2: { value: new THREE.Color(COLORS.ballBlack) },
        hovered: { value: 0 },
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec3 vWorldNormal;
        void main() {
          vPosition = position;
          vNormal = normal;
          vWorldNormal = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float stripeCount;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float hovered;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec3 vWorldNormal;

        void main() {
          float stripe = step(0.5, fract(vPosition.y * stripeCount + 0.5));
          vec3 baseColor = mix(color1, color2, stripe);

          vec3 lightDir = normalize(vec3(0.5, 1.0, 0.5));
          float diff = max(dot(vWorldNormal, lightDir), 0.0);
          float ambient = 0.4;
          float lighting = ambient + diff * 0.6;

          vec3 finalColor = baseColor * lighting;

          if (hovered > 0.5) {
            finalColor += vec3(0.08, 0.08, 0.1);
          }

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = ballY + Math.sin(state.clock.elapsedTime * 1.5) * 0.04;
      meshRef.current.rotation.y += hovered ? 0.015 : 0.003;
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.hovered.value = hovered ? 1 : 0;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[fingerPos.x, ballY, fingerPos.z]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
    >
      <sphereGeometry args={[ballRadius, 64, 64]} />
      <primitive object={stripedMaterial} attach="material" />
    </mesh>
  );
}
