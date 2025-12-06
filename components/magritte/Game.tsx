'use client';

import { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import Room from './Room';
import Finger from './Finger';
import StripedBall from './StripedBall';
import Staircase from './Staircase';
import Bed from './Bed';
import Wardrobe from './Wardrobe';
import HairComb from './HairComb';
import Lighting from './Lighting';
import ChemicalChoice from './ChemicalChoice';
import { ROOMS, Chemical, GameState } from '@/lib/magritte/gameState';

export default function Game() {
  const [currentRoom, setCurrentRoom] = useState(0);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [transitioning, setTransitioning] = useState(false);

  const room = ROOMS[currentRoom];

  const handleChemicalSelect = useCallback((chemical: Chemical) => {
    if (transitioning || gameState !== 'playing') return;

    setTransitioning(true);

    if (chemical.isLethal) {
      // Player dies
      setTimeout(() => {
        setGameState('dead');
        setTransitioning(false);
      }, 1000);
    } else {
      // Player progresses
      setTimeout(() => {
        if (currentRoom >= ROOMS.length - 1) {
          setGameState('won');
        } else {
          setCurrentRoom(prev => prev + 1);
        }
        setTransitioning(false);
      }, 1500);
    }
  }, [currentRoom, transitioning, gameState]);

  const resetGame = () => {
    setCurrentRoom(0);
    setGameState('playing');
    setTransitioning(false);
  };

  return (
    <div className="w-full h-screen bg-black relative">
      {/* 3D Scene */}
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
          <Room roomId={room.id} />
          
          {/* Room 1 objects */}
          {room.id === 1 && (
            <>
              <Finger />
              <StripedBall />
              <Staircase />
            </>
          )}
          
          {/* Room 2 objects */}
          {room.id === 2 && (
            <>
              <Bed />
              <Wardrobe />
              <HairComb />
            </>
          )}

          {/* Chemical choices */}
          {gameState === 'playing' && !transitioning && (
            <>
              <ChemicalChoice
                chemical={room.chemicals[0]}
                position={[-4, 2, 3]}
                onSelect={handleChemicalSelect}
              />
              <ChemicalChoice
                chemical={room.chemicals[1]}
                position={[4, 2, 3]}
                onSelect={handleChemicalSelect}
              />
            </>
          )}
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full p-6 pointer-events-none">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold tracking-widest mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            HI OR BYE
          </h1>
          <p className="text-lg opacity-80">Select a substance to take</p>
        </div>
      </div>

      {/* Instructions */}
      {gameState === 'playing' && !transitioning && (
        <div className="absolute bottom-8 left-0 w-full text-center pointer-events-none">
          <p className="text-white text-lg opacity-70">
            Choose wisely... one will set you free, one will end your dream
          </p>
        </div>
      )}

      {/* Transition overlay */}
      {transitioning && (
        <div className="absolute inset-0 bg-white pointer-events-none animate-pulse opacity-50" />
      )}

      {/* Game Over Screen */}
      {gameState === 'dead' && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
          <h2 className="text-6xl font-bold text-red-500 mb-4">BYE</h2>
          <p className="text-white text-xl mb-8">Your dream has ended...</p>
          <button
            onClick={resetGame}
            className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors pointer-events-auto"
          >
            Dream Again
          </button>
        </div>
      )}

      {/* Win Screen */}
      {gameState === 'won' && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
          <h2 className="text-6xl font-bold text-green-400 mb-4">HI</h2>
          <p className="text-white text-xl mb-8">You've transcended the dream...</p>
          <button
            onClick={resetGame}
            className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors pointer-events-auto"
          >
            Dream Again
          </button>
        </div>
      )}
    </div>
  );
}
