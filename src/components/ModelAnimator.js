import React, { useState, useCallback, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls,
  useGLTF, 
  PerspectiveCamera
} from '@react-three/drei';
import { Camera, Upload, AlertCircle, RotateCw, Play, Pause, RefreshCw } from 'lucide-react';
import * as THREE from 'three';
import { presetModels, animations } from './ModelAnimatorConfig';
import AnimatedModel from './AnimatedModel';
import SceneEnvironment from '../assets/scene/SceneEnvironment';

// Preload models
presetModels.forEach(model => {
  useGLTF.preload(model.path);
});

// Main ModelAnimator Component
const ModelAnimator = () => {
  const [selectedModel, setSelectedModel] = useState(presetModels[0]);
  const [customModel, setCustomModel] = useState(null);
  const [selectedAnimation, setSelectedAnimation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [loopAnimation, setLoopAnimation] = useState(true);
  const [error, setError] = useState(null);
  const [cameraRotation, setCameraRotation] = useState(0);

  // Debug animation state changes
  useEffect(() => {
    if (selectedAnimation) {
      console.log('Animation state changed:', {
        name: selectedAnimation.name,
        path: selectedAnimation.path,
        isPlaying,
        speed: animationSpeed,
        loop: loopAnimation
      });
    }
  }, [selectedAnimation, isPlaying, animationSpeed, loopAnimation]);

  const handleModelChange = useCallback((model) => {
    console.log('Model changed:', model);
    setSelectedModel(model);
    setError(null);
  }, []);

  const handleAnimationSelect = useCallback((animation) => {
    console.log('Animation selected:', animation);
    // Verify animation file exists
    fetch(animation.path)
      .then(response => {
        if (!response.ok) {
          throw new Error('Animation file not found');
        }
        setSelectedAnimation(animation);
        setIsPlaying(true);
      })
      .catch(error => {
        console.error('Animation load error:', error);
        setError(`Failed to load animation: ${error.message}`);
      });
  }, []);

  const handleCustomModelUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.name.toLowerCase().endsWith('.glb')) {
        console.log('Loading custom model:', file.name);
        const url = URL.createObjectURL(file);
        setCustomModel(url);
        setSelectedModel(null);
        setError(null);
      } else {
        setError('Please upload a GLB file');
      }
    }
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
          {/* Left Panel - Controls (unchanged) */}
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
                  <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={45} />
                  <SceneEnvironment>
                    {(customModel || selectedModel?.path) && (
                      <AnimatedModel 
                        modelPath={customModel || selectedModel.path}
                        animationPath={selectedAnimation?.path}
                        isPlaying={isPlaying}
                        speed={animationSpeed}
                        loop={loopAnimation}
                        key={`${selectedModel?.path}-${selectedAnimation?.path}`}
                      />
                    )}
                  </SceneEnvironment>
                  <OrbitControls
                    makeDefault
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 2.5}
                    minDistance={3}
                    maxDistance={10}
                    target={[0, 0, 0]}
                    rotation={[0, cameraRotation, 0]}
                  />
                </Suspense>
              </Canvas>

              {/* Controls */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                <div className="flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm rounded-lg p-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-lg hover:bg-gray-700 text-white transition-all"
                    disabled={!selectedAnimation}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <input
                    type="range"
                    min="0.1"
                    max="2"
                    step="0.1"
                    value={animationSpeed}
                    onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                    className="w-24 accent-red-500"
                  />
                  <span className="text-white text-sm">{animationSpeed.toFixed(1)}x</span>
                  <button
                    onClick={() => setLoopAnimation(!loopAnimation)}
                    className={`p-2 rounded-lg transition-all ${
                      loopAnimation ? 'bg-red-600 hover:bg-red-500' : 'hover:bg-gray-700'
                    } text-white`}
                  >
                    <RefreshCw size={20} />
                  </button>
                </div>
                
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

              {/* Loading State */}
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