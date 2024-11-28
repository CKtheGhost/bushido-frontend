import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Center, Html } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedModel = ({ 
  modelPath, 
  animationPath = '', 
  isPlaying = true, 
  speed = 1, 
  loop = true,
  scale = 2,
  position = [0, -1, 0] 
}) => {
  const groupRef = useRef();
  const { scene } = useGLTF(modelPath);
  const animationData = useGLTF(animationPath);
  const mixerRef = useRef();
  const [currentAction, setCurrentAction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Setup model and mixer
  useEffect(() => {
    let mounted = true;
    
    try {
      const clonedScene = scene.clone();
      const newMixer = new THREE.AnimationMixer(clonedScene);
      mixerRef.current = newMixer;

      clonedScene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material = new THREE.MeshPhysicalMaterial({
            map: child.material?.map,
            normalMap: child.material?.normalMap,
            roughnessMap: child.material?.roughnessMap,
            metalnessMap: child.material?.metalnessMap,
            envMapIntensity: 1.2,
            roughness: 0.7,
            metalness: 0.3
          });
        }
      });

      if (groupRef.current && mounted) {
        while (groupRef.current.children.length) {
          groupRef.current.remove(groupRef.current.children[0]);
        }
        groupRef.current.add(clonedScene);
        setError(null);
      }
    } catch (err) {
      console.error('Model setup error:', err);
      if (mounted) {
        setError('Failed to load model: ' + err.message);
      }
    } finally {
      if (mounted) {
        setIsLoading(false);
      }
    }

    return () => {
      mounted = false;
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
      if (groupRef.current) {
        while (groupRef.current.children.length) {
          groupRef.current.remove(groupRef.current.children[0]);
        }
      }
    };
  }, [scene]);

  // Handle animation setup
  useEffect(() => {
    if (!mixerRef.current || !animationPath || !animationData?.animations?.length) return;
    
    try {
      if (currentAction) {
        currentAction.fadeOut(0.5);
        currentAction.stop();
      }

      mixerRef.current.stopAllAction();
      
      const action = mixerRef.current.clipAction(animationData.animations[0]);
      
      action.reset()
        .setEffectiveTimeScale(speed)
        .setEffectiveWeight(1)
        .setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce);

      if (!loop) {
        action.clampWhenFinished = true;
      }

      action.fadeIn(0.5);
      action.play();

      setCurrentAction(action);
      setError(null);
    } catch (err) {
      console.error('Animation setup error:', err);
      setError('Failed to setup animation: ' + err.message);
    }
  }, [animationPath, animationData, loop, speed, currentAction]);

  // Handle playback controls
  useEffect(() => {
    if (currentAction) {
      currentAction.paused = !isPlaying;
      currentAction.timeScale = speed;
    }
  }, [currentAction, isPlaying, speed]);

  // Animation update via useFrame
  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  return (
    <group ref={groupRef}>
      <Center scale={scale} position={position}>
        {isLoading && (
          <Html center>
            <div className="bg-black/80 text-white px-4 py-2 rounded-lg">
              Loading resources...
            </div>
          </Html>
        )}
        {error && (
          <Html center>
            <div className="bg-black/80 text-red-500 px-4 py-2 rounded-lg">
              {error}
            </div>
          </Html>
        )}
      </Center>
    </group>
  );
};

export default AnimatedModel;