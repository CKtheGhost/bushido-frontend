import * as THREE from 'three';

export const presetModels = [
  { 
    name: 'Default Samurai', 
    path: '/models/character.glb'
  },
  { 
    name: 'Shadow Warrior', 
    path: '/models/character (1).glb' 
  },
  { 
    name: 'Dragon Knight', 
    path: '/models/character (2).glb' 
  },
  { 
    name: 'Storm Blade', 
    path: '/models/character (3).glb' 
  },
  { 
    name: 'Flame Master', 
    path: '/models/character (4).glb' 
  },
  { 
    name: 'Thunder Lord', 
    path: '/models/character (5).glb' 
  },
  { 
    name: 'Wind Walker', 
    path: '/models/character (6).glb' 
  },
  { 
    name: 'Void Seeker', 
    path: '/models/character (7).glb' 
  }
];

export const animations = [
  {
    name: 'Walk',
    path: '/models/animations/walk.glb',
    defaultSpeed: 1,
    loop: THREE.LoopRepeat,
    blendDuration: 0.5,
    category: 'movement'
  },
  {
    name: 'Death',
    path: '/models/animations/death.glb',
    defaultSpeed: 1,
    loop: THREE.LoopOnce,
    blendDuration: 0.3,
    category: 'action'
  },
  {
    name: 'Hip Hop Dance',
    path: '/models/animations/hiphop.glb',
    defaultSpeed: 1,
    loop: THREE.LoopRepeat,
    blendDuration: 0.4,
    category: 'dance'
  },
  {
    name: 'Pray',
    path: '/models/animations/pray.glb',
    defaultSpeed: 1,
    loop: THREE.LoopRepeat,
    blendDuration: 0.5,
    category: 'action'
  },
  {
    name: 'Dance',
    path: '/models/animations/dance.glb',
    defaultSpeed: 1,
    loop: THREE.LoopRepeat,
    blendDuration: 0.4,
    category: 'dance'
  }
];

// Environment and rendering settings
export const environmentSettings = {
  default: {
    preset: 'sunset',
    blur: 0.8,
    background: true
  },
  lighting: {
    ambient: {
      intensity: 0.5
    },
    directional: {
      intensity: 1.5,
      position: [2.5, 8, 5],
      shadowMapSize: 1024
    }
  }
};

export const materialPresets = {
  default: {
    roughness: 0.7,
    metalness: 0.3,
    envMapIntensity: 1
  }
};

export const modelSettings = {
  scale: 2,
  position: [0, -1, 0],
  rotation: [0, 0, 0],
  castShadow: true,
  receiveShadow: true
};

export const debugSettings = {
  enabled: process.env.NODE_ENV === 'development',
  logAnimations: true,
  logModelChanges: true,
  showLoadingStates: true,
  showErrorMessages: true
};