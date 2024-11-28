import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

const ModelLoader = ({ 
  modelPath, 
  traits = {}, 
  animation = 'idle',
  scale = 1,
  position = [0, 0, 0]
}) => {
  const group = useRef();
  const { scene, animations } = useGLTF(modelPath);
  const { actions, mixer } = useAnimations(animations, group);
  
  // Handle model loading
  useEffect(() => {
    // Clone the scene to avoid mutations
    const modelScene = scene.clone();
    
    // Apply materials and textures
    modelScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Apply PBR materials
        child.material = new THREE.MeshPhysicalMaterial({
          map: child.material.map,
          normalMap: child.material.normalMap,
          roughnessMap: child.material.roughnessMap,
          metalnessMap: child.material.metalnessMap,
          envMapIntensity: 1,
          roughness: 0.5,
          metalness: 0.5,
        });
      }
    });

    // Clear previous model
    while (group.current.children.length) {
      group.current.remove(group.current.children[0]);
    }

    // Add new model
    group.current.add(modelScene);
  }, [scene, modelPath]);

  // Handle traits
  useEffect(() => {
    Object.entries(traits).forEach(async ([category, trait]) => {
      if (trait) {
        const { scene: traitScene } = await useGLTF.load(trait.path);
        const traitMesh = traitScene.clone();
        
        // Position the trait based on category
        switch (category) {
          case 'armor':
            traitMesh.position.set(0, 0, 0);
            break;
          case 'weapon':
            traitMesh.position.set(0.5, 0, 0);
            break;
          case 'mask':
            traitMesh.position.set(0, 1.6, 0);
            break;
          default:
            break;
        }
        
        group.current.add(traitMesh);
      }
    });
  }, [traits]);

  // Handle animations
  useEffect(() => {
    // Reset and stop all animations
    Object.values(actions).forEach(action => action.stop());
    
    // Play selected animation
    if (actions[animation]) {
      actions[animation].reset().play();
    }
  }, [actions, animation]);

  return (
    <group 
      ref={group} 
      position={position}
      scale={[scale, scale, scale]}
    />
  );
};