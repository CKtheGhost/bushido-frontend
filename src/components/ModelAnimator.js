import React, { useState, useCallback, Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls,
  useGLTF, 
  Environment, 
  Center,
  ContactShadows,
  PerspectiveCamera,
  useAnimations
} from '@react-three/drei';
import { ChevronDown, Camera, Upload, AlertCircle, RotateCw, Play, Pause, RefreshCw } from 'lucide-react';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';
import { presetModels, animations } from './ModelAnimatorConfig';

// Preload models
presetModels.forEach(model => {
  useGLTF.preload(model.path);
});

// Enhanced Model Component
const AnimatedModel = ({ modelPath, animation, isPlaying, speed = 1, loop = true }) => {
  const group = useRef();
  const { scene, animations: modelAnimations } = useGLTF(modelPath);
  const [mixer] = useState(() => new THREE.AnimationMixer(scene));
  const [animationClip, setAnimationClip] = useState(null);
  const currentAction = useRef(null);
  const previousAction = useRef(null);

  // Load animation FBX
  useEffect(() => {
    if (animation?.path) {
      const loader = new FBXLoader();
      loader.load(animation.path, (fbx) => {
        const clip = fbx.animations[0];
        if (clip) {
          clip.name = animation.name;
          setAnimationClip(clip);
        }
      });
    }
    
    return () => {
      if (currentAction.current) {
        currentAction.current.stop();
      }
    };
  }, [animation]);

  // Handle animation changes
  useEffect(() => {
    if (!animationClip || !mixer) return;

    const newAction = mixer.clipAction(animationClip);
    
    if (currentAction.current) {
      previousAction.current = currentAction.current;
      const blendTime = animation?.blendDuration || 0.5;
      
      newAction
        .reset()
        .setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce)
        .setEffectiveTimeScale(speed)
        .setEffectiveWeight(1);
        
      newAction.clampWhenFinished = !loop;
      newAction.crossFadeFrom(previousAction.current, blendTime, true);
      newAction.play();
    } else {
      newAction
        .reset()
        .setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce)
        .setEffectiveTimeScale(speed)
        .play();
    }
    
    currentAction.current = newAction;
    
    return () => {
      if (newAction) {
        newAction.stop();
      }
    };
  }, [animationClip, mixer, animation, loop, speed]);

  // Update animation state
  useEffect(() => {
    if (currentAction.current) {
      currentAction.current.paused = !isPlaying;
      currentAction.current.timeScale = speed;
    }
  }, [isPlaying, speed]);

  // Animation frame update
  useFrame((state, delta) => {
    mixer.update(delta);
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
            envMapIntensity: 1
          });
        }
      }
    });
  }, [scene]);

  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} scale={2} position={[0, -1, 0]} />
      </Center>
    </group>
  );
};

// Scene setup
const Scene = ({ children }) => (
  <>
    <Environment preset="sunset" background blur={0.8} />
    <ambientLight intensity={0.5} />
    <directionalLight
      castShadow
      position={[2.5, 8, 5]}
      intensity={1.5}
      shadow-mapSize={[1024, 1024]}
    >
      <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} />
    </directionalLight>
    <ContactShadows
      opacity={0.4}
      scale={10}
      blur={2}
      far={4}
      resolution={256}
      color="#000000"
    />
    <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={45} />
    {children}
  </>
);

// Animation Controls
const AnimationControls = ({ 
  animation,
  isPlaying,
  speed,
  loop,
  onPlayPause,
  onSpeedChange,
  onLoopToggle
}) => (
  <div className="flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm rounded-lg p-2">
    <button
      onClick={onPlayPause}
      className="p-2 rounded-lg hover:bg-gray-700 text-white transition-all"
      disabled={!animation}
    >
      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
    </button>
    <input
      type="range"
      min="0.1"
      max="2"
      step="0.1"
      value={speed}
      onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
      className="w-24 accent-red-500"
    />
    <span className="text-white text-sm">{speed.toFixed(1)}x</span>
    <button
      onClick={onLoopToggle}
      className={`p-2 rounded-lg transition-all ${
        loop ? 'bg-red-600 hover:bg-red-500' : 'hover:bg-gray-700'
      } text-white`}
    >
      <RefreshCw size={20} />
    </button>
  </div>
);

// Main Component
const ModelAnimator = () => {
  const [selectedModel, setSelectedModel] = useState(presetModels[0]);
  const [customModel, setCustomModel] = useState(null);
  const [selectedAnimation, setSelectedAnimation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [loopAnimation, setLoopAnimation] = useState(true);
  const [error, setError] = useState(null);
  const [cameraRotation, setCameraRotation] = useState(0);

  const handleModelChange = useCallback((model) => {
    setSelectedModel(model);
    setError(null);
  }, []);

  const handleCustomModelUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.name.toLowerCase().endsWith('.glb')) {
        const url = URL.createObjectURL(file);
        setCustomModel(url);
        setSelectedModel(null);
        setError(null);
      } else {
        setError('Please upload a GLB file');
      }
    }
  }, []);

  const handleAnimationSelect = useCallback((animation) => {
    setSelectedAnimation(animation);
    setIsPlaying(true);
  }, []);

  const handleRotation = useCallback(() => {
    setCameraRotation(prev => prev + Math.PI / 2);
  }, []);

  const captureScreenshot = useCallback(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'samurai-model.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (customModel) {
        URL.revokeObjectURL(customModel);
      }
    };
  }, [customModel]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <header className="bg-black/50 backdrop-blur-sm border-b border-red-900/20 p-6">
        <h1 className="text-4xl font-bold text-red-500 text-center">
          Samurai Customizer
        </h1>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel */}
          <div className="space-y-6">
            {/* Preset Models */}
            <div className="bg-gray-900/50 rounded-xl p-6 border border-red-900/20">
              <h2 className="text-2xl font-bold text-white mb-6">Preset Models</h2>
              <div className="grid grid-cols-2 gap-4">
                {presetModels.map((model, index) => (
                  <button
                    key={index}
                    onClick={() => handleModelChange(model)}
                    className={`p-4 rounded-lg text-white transition-all ${
                      selectedModel === model
                        ? 'bg-red-600 hover:bg-red-500'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    {model.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Model Upload */}
            <div className="bg-gray-900/50 rounded-xl p-6 border border-red-900/20">
              <h2 className="text-2xl font-bold text-white mb-6">Custom Model</h2>
              <div className="space-y-4">
                <label className="block w-full">
                  <div className="flex items-center justify-center w-full h-32 border-2 border-red-900/20 border-dashed rounded-lg cursor-pointer hover:border-red-500/50 transition-colors">
                    <div className="space-y-2 text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="text-gray-400">Upload GLB file</p>
                    </div>
                    <input
                      type="file"
                      accept=".glb"
                      onChange={handleCustomModelUpload}
                      className="hidden"
                    />
                  </div>
                </label>
                {error && (
                  <div className="flex items-center gap-2 text-red-500">
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Animations */}
            <div className="bg-gray-900/50 rounded-xl p-6 border border-red-900/20">
              <h2 className="text-2xl font-bold text-white mb-6">Animations</h2>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {animations.map((animation, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnimationSelect(animation)}
                    className={`w-full p-4 rounded-lg text-white transition-all ${
                      selectedAnimation === animation
                        ? 'bg-red-600 hover:bg-red-500'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{animation.name}</span>
                      <span className="text-sm text-gray-400">
                        {animation.loop === THREE.LoopOnce ? 'Play Once' : 'Loop'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Model Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 rounded-xl p-6 border border-red-900/20 h-[600px] relative">
              <Canvas shadows gl={{ preserveDrawingBuffer: true }}>
                <Suspense fallback={null}>
                  <Scene>
                    {(customModel || selectedModel?.path) && (
                      <AnimatedModel 
                        modelPath={customModel || selectedModel.path}
                        animation={selectedAnimation}
                        isPlaying={isPlaying}
                        speed={animationSpeed}
                        loop={loopAnimation}
                      />
                    )}
                  </Scene>
                  <OrbitControls
                    makeDefault
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 2}
                    target={[0, 0, 0]}
                    rotation={[0, cameraRotation, 0]}
                  />
                </Suspense>
              </Canvas>

              {/* Animation Controls */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                <AnimationControls
                  animation={selectedAnimation}
                  isPlaying={isPlaying}
                  speed={animationSpeed}
                  loop={loopAnimation}
                  onPlayPause={() => setIsPlaying(!isPlaying)}
                  onSpeedChange={setAnimationSpeed}
                  onLoopToggle={() => setLoopAnimation(!loopAnimation)}
                />
                
                <div className="flex gap-2">
                  <button
                    onClick={handleRotation}
                    className="p-3 bg-gray-800/80 hover:bg-gray-700 rounded-full text-white transition-all backdrop-blur-sm"
                  >
                    <RotateCw size={24} />
                  </button>
                  <button
                    onClick={captureScreenshot}
                    className="p-3 bg-gray-800/80 hover:bg-gray-700 rounded-full text-white transition-all backdrop-blur-sm"
                  >
                    <Camera size={24} />
                  </button>
                </div>
              </div>

              {/* Loading Overlay */}
              {!selectedModel && !customModel && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="text-white text-xl">
                    Select a model to begin
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelAnimator;