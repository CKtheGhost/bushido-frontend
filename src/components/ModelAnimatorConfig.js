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
  },
];

export const animations = [
  {
    name: 'Walk',
    path: '/models/animations/Catwalk Walk Turn 180 Tight.fbx',
    defaultSpeed: 1,
    loop: THREE.LoopRepeat,
    blendDuration: 0.5,
    clipName: 'mixamo.com' // Default Mixamo animation name
  },
  {
    name: 'Death',
    path: '/models/animations/Dying.fbx',
    defaultSpeed: 1,
    loop: THREE.LoopOnce,
    blendDuration: 0.3,
    clipName: 'mixamo.com'
  },
  {
    name: 'Hip Hop',
    path: '/models/animations/Hip Hop Dancing.fbx',
    defaultSpeed: 1,
    loop: THREE.LoopRepeat,
    blendDuration: 0.4,
    clipName: 'mixamo.com'
  },
  {
    name: 'Pray',
    path: '/models/animations/Praying.fbx',
    defaultSpeed: 1,
    loop: THREE.LoopRepeat,
    blendDuration: 0.5,
    clipName: 'mixamo.com'
  },
  {
    name: 'Dance',
    path: '/models/animations/Silly Dancing.fbx',
    defaultSpeed: 1,
    loop: THREE.LoopRepeat,
    blendDuration: 0.4,
    clipName: 'mixamo.com'
  }
];