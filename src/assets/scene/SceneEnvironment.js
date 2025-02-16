import React from 'react';
import { Environment, AccumulativeShadows, RandomizedLight } from '@react-three/drei';

const SceneEnvironment = ({ children }) => {
  return (
    <>
      {/* HDR Environment */}
      <Environment
        files="/satara_night_4k.hdr"
        background
        intensity={1}
      />

      {/* Subtle Soft Shadows (optional) */}
      <AccumulativeShadows
        position={[0, -0.01, 0]}
        scale={30}
        color="#000000"
        opacity={0.5}
        frames={50}
        temporal
      >
        <RandomizedLight
          position={[5, 10, -8]}
          amount={4}
          radius={5}
          ambient={0.5}
          intensity={0.8}
          size={10}
          bias={0.001}
        />
      </AccumulativeShadows>

      {children}
    </>
  );
};

export default SceneEnvironment;
