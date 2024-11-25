import React from 'react';
import { 
  Environment, 
  AccumulativeShadows, 
  RandomizedLight,
  Backdrop,
  ContactShadows 
} from '@react-three/drei';

const Scene = ({ children, environmentPreset = 'dawn' }) => {
  return (
    <>
      {/* Main Environment */}
      <Environment
        preset={environmentPreset}
        background
        blur={0.8}
      />

      {/* Main Directional Light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Fill Light */}
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.5}
        castShadow={false}
      />

      {/* Ambient Light */}
      <ambientLight intensity={0.5} />

      {/* Accumulative Shadows */}
      <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        frames={100}
        temporal
      >
        <RandomizedLight
          position={[8, 5, -5]}
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={1}
          size={10}
          bias={0.001}
        />
      </AccumulativeShadows>

      {/* Contact Shadows */}
      <ContactShadows
        position={[0, -0.98, 0]}
        scale={10}
        resolution={512}
        far={1}
        blur={2}
        opacity={0.8}
      />

      {/* Backdrop */}
      <Backdrop
        receiveShadow
        scale={[20, 5, 5]}
        position={[0, -0.5, -3]}
        rotation={[0, 0, 0]}
      >
        <meshStandardMaterial color="#353540" />
      </Backdrop>

      {children}
    </>
  );
};