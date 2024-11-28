// Scene.js
import React, { Suspense } from 'react';
import { 
  Environment, 
  ContactShadows,
  Html
} from '@react-three/drei';
import { environmentSettings } from './ModelAnimatorConfig';

const LoadingSpinner = () => (
  <Html center>
    <div className="bg-black/80 text-white px-6 py-4 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        <span>Loading scene...</span>
      </div>
    </div>
  </Html>
);

const Scene = React.memo(({ children }) => (
  <Suspense fallback={<LoadingSpinner />}>
    {/* Environment */}
    <Environment 
      preset={environmentSettings.default.preset} 
      background={environmentSettings.default.background}
      blur={environmentSettings.default.blur} 
    />

    {/* Lighting */}
    <ambientLight intensity={environmentSettings.lighting.ambient.intensity} />
    <directionalLight
      castShadow
      position={environmentSettings.lighting.directional.position}
      intensity={environmentSettings.lighting.directional.intensity}
      shadow-mapSize-width={environmentSettings.lighting.directional.shadowMapSize}
      shadow-mapSize-height={environmentSettings.lighting.directional.shadowMapSize}
    >
      <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} />
    </directionalLight>

    {/* Ground shadow */}
    <ContactShadows
      opacity={0.4}
      scale={10}
      blur={2}
      far={4}
      resolution={256}
      color="#000000"
      position={[0, -0.5, 0]}
    />

    {/* Scene content */}
    {children}
  </Suspense>
));

Scene.displayName = 'Scene';

export default Scene;