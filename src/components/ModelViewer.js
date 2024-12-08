import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SceneEnvironment from '../assets/scene/SceneEnvironment';
import AnimatedModel from './AnimatedModel';
import { RotateCw } from 'lucide-react';
import * as THREE from 'three';
import { environmentSettings, cameraSettings } from '../assets/ModelAnimatorConfig';

const LoadingScreen = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
    <div className="text-center">
      <RotateCw className="w-8 h-8 text-red-500 animate-spin mx-auto mb-2" />
      <p className="text-white text-lg">Loading scene...</p>
    </div>
  </div>
);

const ModelViewer = ({ 
  modelPath, 
  animationPath,
  isPlaying = true,
  speed = 1,
  loop = true,
  scale = 2,
  position = [0, -1, 0]
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleCreated = ({ gl }) => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.2;
    gl.antialias = true;
    setIsLoading(false);
  };

  return (
    <div className="relative w-full h-[600px] bg-black rounded-lg overflow-hidden">
      {isLoading && <LoadingScreen />}
      
      <Canvas
        shadows
        onCreated={handleCreated}
        camera={{
          position: cameraSettings.default.position,
          fov: cameraSettings.default.fov,
          near: cameraSettings.default.near,
          far: cameraSettings.default.far
        }}
      >
        <Suspense fallback={null}>
          <SceneEnvironment>
            <AnimatedModel
              modelPath={modelPath}
              animationPath={animationPath}
              isPlaying={isPlaying}
              speed={speed}
              loop={loop}
              scale={scale}
              position={position}
            />
          </SceneEnvironment>

          <OrbitControls
            makeDefault
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            minDistance={3}
            maxDistance={10}
            enablePan={false}
            enableDamping
            dampingFactor={0.05}
            rotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
        Click and drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};

export default ModelViewer;