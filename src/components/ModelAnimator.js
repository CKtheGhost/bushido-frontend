import React, { useState, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls,
  useGLTF, 
  Environment, 
  Center,
  ContactShadows,
  PerspectiveCamera
} from '@react-three/drei';
import { ChevronDown, Camera, Upload, AlertCircle, RotateCw } from 'lucide-react';

// Define preset models
const presetModels = [
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

// Basic Model Component
const Model = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);

  React.useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <Center>
      <primitive object={scene} scale={2} position={[0, -1, 0]} />
    </Center>
  );
};

// Scene Component
const Scene = ({ children }) => {
  return (
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
};

// Main Component
const ModelAnimator = () => {
  const [selectedModel, setSelectedModel] = useState(presetModels[0]);
  const [customModel, setCustomModel] = useState(null);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <header className="bg-black/50 backdrop-blur-sm border-b border-red-900/20 p-6">
        <h1 className="text-4xl font-bold text-red-500 text-center">
          Samurai Customizer
        </h1>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Model Selection */}
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
          </div>

          {/* Center Panel - Model Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 rounded-xl p-6 border border-red-900/20 h-[600px] relative">
              <Canvas shadows gl={{ preserveDrawingBuffer: true }}>
                <Suspense fallback={null}>
                  <Scene>
                    {(customModel || selectedModel?.path) && (
                      <Model modelPath={customModel || selectedModel.path} />
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

              {/* Controls */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                <button
                  onClick={handleRotation}
                  className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full text-white transition-all"
                >
                  <RotateCw size={24} />
                </button>
                <button
                  onClick={captureScreenshot}
                  className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full text-white transition-all"
                >
                  <Camera size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelAnimator;