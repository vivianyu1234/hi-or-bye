'use client';

import { useState, useCallback, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import Room from './Room';
import Finger from './Finger';
import StripedBall from './StripedBall';
import Staircase from './Staircase';
import Bed from './Bed';
import Wardrobe from './Wardrobe';
import WineGlass from './WineGlass';
import Bathtub from './Bathtub';
import WashBasin from './WashBasin';
import BathroomWindow from './BathroomWindow';
import Lighting from './Lighting';
import ChemicalChoice from './ChemicalChoice';
import { ROOMS, Chemical, GameState } from '@/lib/magritte/gameState';

export default function Game() {
  const [currentRoom, setCurrentRoom] = useState(0);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [transitioning, setTransitioning] = useState(false);
  const [showingHiAnimation, setShowingHiAnimation] = useState(false);
  const [hiText, setHiText] = useState('Hi');
  const [hiAnimationType, setHiAnimationType] = useState<'first' | 'second'>('first');
  const [zoomingIntoWindow, setZoomingIntoWindow] = useState(false);

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
      // Check if transitioning from room 1 to room 2
      if (currentRoom === 0) {
        // Show Hi animation before transitioning to room 2
        setHiAnimationType('first');
        setShowingHiAnimation(true);
        setHiText('Hi');
      } else if (currentRoom === 1) {
        // Show Hi animation before transitioning to room 3
        setHiAnimationType('second');
        setShowingHiAnimation(true);
        setHiText('Hiiiii');
      } else if (currentRoom === 2) {
        // Room 3 - zoom into window before winning
        setZoomingIntoWindow(true);
        setTimeout(() => {
          setZoomingIntoWindow(false);
          setGameState('won');
          setTransitioning(false);
        }, 3000); // 3 second zoom animation
      } else {
        // Normal transition for other rooms
        setTimeout(() => {
          if (currentRoom >= ROOMS.length - 1) {
            setGameState('won');
          } else {
            setCurrentRoom(prev => prev + 1);
          }
          setTransitioning(false);
        }, 1500);
      }
    }
  }, [currentRoom, transitioning, gameState]);

  // Handle Hi animation
  useEffect(() => {
    if (!showingHiAnimation) return;

    const duration = 1500; // 1.5 seconds
    const interval = 50; // Update every 50ms for smooth animation
    const startTime = Date.now();

    // Determine animation parameters based on type
    const isFirstAnimation = hiAnimationType === 'first';
    const startText = isFirstAnimation ? 'Hi' : 'Hiiiii';
    const targetText = isFirstAnimation ? 'Hiiiii' : 'Hiiiiiiiiii';
    const baseText = 'Hi';
    const startICount = isFirstAnimation ? 1 : 5; // "Hi" has 1 'i', "Hiiiii" has 5 'i's
    const targetICount = isFirstAnimation ? 5 : 10; // "Hiiiii" has 5 'i's, "Hiiiiiiiiii" has 10 'i's
    const lettersToAdd = targetICount - startICount;

    const animationInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1); // 0 to 1
      
      // Calculate how many 'i's to add based on progress
      const lettersAdded = Math.floor(progress * lettersToAdd);
      const currentICount = startICount + lettersAdded;
      const newText = baseText + 'i'.repeat(currentICount);
      setHiText(newText);

      if (progress >= 1) {
        // Ensure final text matches target
        setHiText(targetText);
        clearInterval(animationInterval);
        // After animation completes, transition to next room
        setTimeout(() => {
          setCurrentRoom(prev => prev + 1);
          setTransitioning(false);
          setShowingHiAnimation(false);
        }, 300); // Small delay to show final text
      }
    }, interval);

    return () => clearInterval(animationInterval);
  }, [showingHiAnimation, hiAnimationType]);

  const resetGame = () => {
    setCurrentRoom(0);
    setGameState('playing');
    setTransitioning(false);
  };

  return (
    <div className="w-full h-screen bg-black relative">
      {/* Zoom animation styles */}
      <style jsx global>{`
        @keyframes zoomIntoWindow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(3);
            opacity: 1;
          }
          100% {
            transform: scale(10);
            opacity: 1;
          }
        }
      `}</style>
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
              <WineGlass />
            </>
          )}
          
          {/* Room 3 objects - Bathroom */}
          {room.id === 3 && (
            <>
              <Bathtub />
              <WashBasin />
              <BathroomWindow />
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
          <p className="text-lg opacity-80">Room {currentRoom + 1}: {room.name}</p>
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

      {/* Hi animation overlay - only show when transitioning from room 1 to room 2 */}
      {showingHiAnimation && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center pointer-events-none z-50">
          <h2 
            className="text-9xl font-bold text-white"
            style={{ 
              textShadow: '4px 4px 8px rgba(0,0,0,0.8)',
              transition: 'all 0.1s ease-out'
            }}
          >
            {hiText}
          </h2>
        </div>
      )}

      {/* Transition overlay - only show for other transitions */}
      {transitioning && !showingHiAnimation && (
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

      {/* Zoom into window animation */}
      {zoomingIntoWindow && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 overflow-hidden"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.9) 100%)',
          }}
        >
          <div
            className="relative"
            style={{
              animation: 'zoomIntoWindow 3s ease-in forwards',
            }}
          >
            {/* Magritte window scene */}
            <div
              className="relative"
              style={{
                width: '400px',
                height: '350px',
                background: 'linear-gradient(to bottom, #87CEEB 0%, #B0D4E8 50%, #5A7A8A 70%, #5A7A8A 100%)',
                borderRadius: '50% 50% 0 0 / 30% 30% 0 0',
                border: '20px solid #C4A5A0',
                overflow: 'hidden',
              }}
            >
              {/* Clouds */}
              <div className="absolute top-8 left-8 w-20 h-8 bg-white/70 rounded-full"></div>
              <div className="absolute top-12 left-16 w-16 h-6 bg-white/70 rounded-full"></div>
              <div className="absolute top-6 right-12 w-24 h-10 bg-white/70 rounded-full"></div>

              {/* Floating rock */}
              <div
                className="absolute right-16 top-24"
                style={{
                  width: '80px',
                  height: '60px',
                  background: '#7A7A7A',
                  borderRadius: '50%',
                }}
              ></div>

              {/* Sea */}
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{
                  height: '80px',
                  background: '#5A7A8A',
                }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Win Screen */}
      {gameState === 'won' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
          {/* Magritte window scene background */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, #87CEEB 0%, #B0D4E8 40%, #C8DDE8 60%, #5A7A8A 80%, #5A7A8A 100%)',
            }}
          >
            {/* Clouds */}
            <div className="absolute top-[10%] left-[10%] w-32 h-12 bg-white/70 rounded-full"></div>
            <div className="absolute top-[15%] left-[15%] w-24 h-10 bg-white/70 rounded-full"></div>
            <div className="absolute top-[8%] right-[15%] w-40 h-14 bg-white/70 rounded-full"></div>
            <div className="absolute top-[12%] right-[20%] w-28 h-10 bg-white/70 rounded-full"></div>
            <div className="absolute top-[20%] left-[40%] w-36 h-12 bg-white/70 rounded-full"></div>

            {/* Floating rock */}
            <div
              className="absolute right-[20%] top-[35%]"
              style={{
                width: '120px',
                height: '90px',
                background: 'radial-gradient(ellipse at 40% 40%, #9A9A9A, #6A6A6A)',
                borderRadius: '50%',
              }}
            ></div>

            {/* Two figures on horizon */}
            <div className="absolute bottom-[22%] left-[30%] w-2 h-8 bg-[#2A3A5A]"></div>
            <div className="absolute bottom-[22%] left-[32%] w-2 h-7 bg-[#2A3A5A]"></div>
          </div>

          {/* Semi-transparent overlay for text readability */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-6xl font-bold text-white mb-4" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.5)' }}>Hello World!</h2>
            <p className="text-white text-xl mb-8 text-center px-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              You've transcended the daydream...<br />and I have kind of learnt to code!
            </p>
            <button
              onClick={resetGame}
              className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors pointer-events-auto"
            >
              Dream Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
