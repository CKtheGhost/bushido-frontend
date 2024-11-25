import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { 
  useGLTF, 
  useAnimations, 
  Center,
  PresentationControls
} from '@react-three/drei';

const ModelViewer = ({ 
  modelPath, 
  animation = 'idle',
  traits = {},
  isPlaying = true,
  onLoad,
  onError 
}) => {
  const group = useRef();

  // Handle empty modelPath
  if (!modelPath) {
    return null;
  }

  // Load model with error handling
  try {
    const { scene, animations } = useGLTF(modelPath);
    const { actions, mixer } = useAnimations(animations, group);

    // Update animations on frame
    useFrame((state) => {
      if (mixer && isPlaying) {
        mixer.update(state.clock.getDelta());
      }
    });

    return (
      <PresentationControls
        global
        rotation={[0, -Math.PI / 4, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <group ref={group} dispose={null}>
          <Center scale={2}>
            <primitive object={scene} />
          </Center>
        </group>

        {/* Render any additional trait models */}
        {Object.entries(traits).map(([category, trait]) => (
          trait && (
            <group key={category}>
              <Center scale={2}>
                <primitive object={useGLTF(trait.path).scene} />
              </Center>
            </group>
          )
        ))}
      </PresentationControls>
    );
  } catch (error) {
    console.error('Error loading model:', error);
    onError?.(error);
    return null;
  }
};

export default ModelViewer;