'use client';

import { EffectComposer, Vignette, Bloom } from '@react-three/postprocessing';

export default function Effects() {
  return (
    <EffectComposer>
      <Vignette eskil={false} offset={0.1} darkness={0.5} />
      <Bloom
        luminanceThreshold={0.9}
        luminanceSmoothing={0.025}
        intensity={0.2}
      />
    </EffectComposer>
  );
}
