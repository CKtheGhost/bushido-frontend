// ModelAnimator.js
import React, { useState, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls,
  useGLTF, 
  Environment, 
  ContactShadows,
  Html
} from '@react-three/drei';
import { Camera, Upload, AlertCircle, RotateCw, Play, Pause, RefreshCw } from 'lucide-react';
import * as THREE from 'three';
import { presetModels, animations } from './ModelAnimatorConfig';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Scene error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-red-500 text-center p-4">
            <p className="text-lg mb-2">Failed to load scene</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading Spinner Component
const LoadingSpinner = () => (
  <Html center>
    <div className="bg-black/80 text-white px-4 py-2 rounded-lg flex items-center gap-3">
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      <span>Loading...</span>
    </div>
  </Html>
);

// Animated Model Component
const AnimatedModel = ({ modelPath, animationPath, isPlaying, speed, loop }) => {
  // Always call useGLTF for model
  const { scene } = useGLTF(modelPath);
  // Always call useGLTF for animation, using modelPath as fallback
  const animationResult = useGLTF(animationPath || modelPath);

  const clonedScene = React.useMemo(() => {
    const clone = scene.clone();
    clone.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        if (node.material) {
          node.material = new THREE.MeshPhysicalMaterial({
            ...node.material,
            roughness: 0.7,
            metalness: 0.3,
            envMapIntensity: 1.2
          });
        }
      }
    });
    return clone;
  }, [scene]);

  const mixer = React.useMemo(() => new THREE.AnimationMixer(clonedScene), [clonedScene]);

  React.useEffect(() => {
    if (animationPath && animationResult.animations?.length) {
      const action = mixer.clipAction(animationResult.animations[0]);
      action.reset();
      action.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce);
      action.setEffectiveTimeScale(speed);
      action.play();

      return () => {
        action.stop();
        mixer.stopAllAction();
      };
    }
  }, [mixer, animationResult, animationPath, loop, speed]);

  React.useEffect(() => {
    mixer.timeScale = isPlaying ? speed : 0;
  }, [mixer, isPlaying, speed]);

  React.useFrame((state, delta) => {
    mixer.update(delta);
  });

  return <primitive object={clonedScene} />;
};

// Scene Component
const Scene = React.memo(({ children }) => (
  <>
    <Environment preset="sunset" background blur={0.8} />
    <ambientLight intensity={0.5} />
    <directionalLight
      castShadow
      position={[2.5, 8, 5]}
      intensity={1.5}
      shadow-mapSize={[1024, 1024]}
    />
    <ContactShadows
      opacity={0.4}
      scale={10}
      blur={2}
      far={4}
      resolution={256}
      color="#000000"
    />
    {children}
  </>
));

Scene.displayName = 'Scene';

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
  const [isLoading, setIsLoading] = useState(false);

  // Preload models
  React.useEffect(() => {
    presetModels.forEach(model => {
      try {
        useGLTF.preload(model.path);
      } catch (err) {
        console.error(`Failed to preload model: ${model.path}`, err);
      }
    });

    return () => {
      if (customModel) {
        URL.revokeObjectURL(customModel);
      }
    };
  }, [customModel]);

  const handleModelChange = useCallback((model) => {
    setIsLoading(true);
    setSelectedModel(model);
    setSelectedAnimation(null);
    setError(null);
    setIsLoading(false);
  }, []);

  const handleAnimationSelect = useCallback((animation) => {
    setSelectedAnimation(animation);
    setIsPlaying(true);
  }, []);

  const handleCustomModelUpload = useCallback((event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.name.toLowerCase().endsWith('.glb')) {
      if (customModel) {
        URL.revokeObjectURL(customModel);
      }
      const url = URL.createObjectURL(file);
      setCustomModel(url);
      setSelectedModel(null);
      setSelectedAnimation(null);
      setError(null);
    } else {
      setError('Please upload a GLB file');
    }
  }, [customModel]);

  const handleScreenshot = useCallback(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = `samurai-model-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <header className="bg-black/50 backdrop-blur-sm border-b border-red-900/20 p-6">
        <h1 className="text-4xl font-bold text-red-500 text-center">
          Samurai Customizer
        </h1>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Controls */}
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
                    disabled={isLoading}
                  >
                    {model.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Section */}
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
                    disabled={!selectedModel && !customModel}
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

          {/* Right Panel - 3D Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 rounded-xl p-6 border border-red-900/20 h-[600px] relative">
              <ErrorBoundary>
                <Canvas
                  shadows
                  camera={{ position: [0, 2, 5], fov: 45 }}
                  gl={{ preserveDrawingBuffer: true }}
                >
                  <Suspense fallback={<LoadingSpinner />}>
                    <Scene>
                      {(selectedModel?.path || customModel) && (
                        <AnimatedModel
                          modelPath={customModel || selectedModel.path}
                          animationPath={selectedAnimation?.path}
                          isPlaying={isPlaying}
                          speed={animationSpeed}
                          loop={loopAnimation}
                        />
                      )}
                      <OrbitControls
                        makeDefault
                        minPolarAngle={0}
                        maxPolarAngle={Math.PI / 2}
                        rotation={[0, cameraRotation, 0]}
                      />
                    </Scene>
                  </Suspense>
                </Canvas>
              </ErrorBoundary>

              {/* Playback Controls */}
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
                    disabled={!selectedAnimation}
                  />
                  <span className="text-white text-sm">{animationSpeed.toFixed(1)}x</span>
                  <button
                    onClick={() => setLoopAnimation(!loopAnimation)}
                    className={`p-2 rounded-lg transition-all ${
                      loopAnimation ? 'bg-red-600 hover:bg-red-500' : 'hover:bg-gray-700'
                    } text-white`}
                    disabled={!selectedAnimation}
                  >
                    <RefreshCw size={20} />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setCameraRotation(prev => prev + Math.PI / 2)}
                    className="p-3 bg-gray-800/80 hover:bg-gray-700 rounded-full text-white transition-all backdrop-blur-sm"
                  >
                    <RotateCw size={24} />
                  </button>
                  <button
                    onClick={handleScreenshot}
                    className="p-3 bg-gray-800/80 hover:bg-gray-700 rounded-full text-white transition-all backdrop-blur-sm"
                  >
                    <Camera size={24} />
                  </button>
                </div>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="text-white text-center">
                    <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-lg">Loading...</p>
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