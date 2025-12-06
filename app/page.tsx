'use client';

import dynamic from 'next/dynamic';

const Game = dynamic(
  () => import('@/components/magritte/Game'),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden">
      <Game />
    </main>
  );
}
