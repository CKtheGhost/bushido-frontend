import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Center, Html } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedModel = ({ 
  modelPath, 
  animationPath, 
  isPlaying = true, 
  speed = 1, 
  loop = true,
  scale = 2,
  position = [0, -1, 0] 
}) => {
  const group = useRef();
  const { scene } = useGLTF(modelPath);
  const [mixer] = useState(() => new THREE.AnimationMixer(scene));
  const [currentAction, setCurrentAction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Move useGLTF call outside of conditional
  const animationData = useGLTF(animationPath || modelPath);

  // Handle animation setup
  useEffect(() => {
    if (!animationPath) return;

    try {
      setIsLoading(true);
      
      const animations = animationData.animations;
      if (animations && animations.length > 0) {
        // Stop current animation if exists
        if (currentAction) {
          currentAction.fadeOut(0.5);
          currentAction.stop();
        }

        // Create and configure new action
        const action = mixer.clipAction(animations[0]);
        
        // Configure animation
        action
          .reset()
          .setEffectiveTimeScale(speed)
          .setEffectiveWeight(1)
          .setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce);

        // Handle non-looping animations
        if (!loop) {
          action.clampWhenFinished = true;
          action.loop = THREE.LoopOnce;
        }

        // Fade in the new animation
        action.fadeIn(0.5);
        action.play();

        setCurrentAction(action);
        setError(null);
      } else {
        throw new Error('No animations found in GLB file');
      }
    } catch (err) {
      console.error('Error setting up animation:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }

    return () => {
      if (currentAction) {
        currentAction.stop();
        currentAction.fadeOut(0.5);
      }
    };
  }, [animationPath, animationData, mixer, speed, loop, currentAction]);

  // Handle play/pause
  useEffect(() => {
    if (currentAction) {
      if (isPlaying) {
        currentAction.paused = false;
        currentAction.play();
      } else {
        currentAction.paused = true;
      }
    }
  }, [isPlaying, currentAction]);

  // Handle speed changes
  useEffect(() => {
    if (currentAction) {
      currentAction.timeScale = speed;
    }
  }, [speed, currentAction]);

  // Update mixer on frame
  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta);
    }
  });

  // Setup materials and shadows
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material = new THREE.MeshPhysicalMaterial({
            ...child.material,
            roughness: 0.7,
            metalness: 0.3,
            envMapIntensity: 1,
            shadowSide: THREE.DoubleSide
          });
        }
      }
    });

    return () => {
      scene.traverse((child) => {
        if (child.isMesh) {
          if (child.material) {
            child.material.dispose();
          }
          if (child.geometry) {
            child.geometry.dispose();
          }
        }
      });
    };
  }, [scene]);

  return (
    <group ref={group}>
      <Center scale={scale} position={position}>
        <primitive object={scene} />
        {error && (
          <Html center>
            <div className="bg-black/80 text-red-500 px-4 py-2 rounded-lg">
              {error}
            </div>
          </Html>
        )}
        {isLoading && (
          <Html center>
            <div className="bg-black/80 text-white px-4 py-2 rounded-lg">
              Loading animation...
            </div>
          </Html>
        )}
      </Center>
    </group>
  );
};

// Memory management - Preload and dispose of models/animations
AnimatedModel.preload = (modelPath) => {
  if (modelPath) {
    useGLTF.preload(modelPath);
  }
};

AnimatedModel.dispose = (modelPath) => {
  if (modelPath) {
    useGLTF.clear(modelPath);
  }
};

export default AnimatedModel;