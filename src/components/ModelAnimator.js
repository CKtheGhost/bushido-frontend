import React, { useState } from 'react';
import { ChevronDown, Play, Pause, RotateCw, Camera } from 'lucide-react';

const ModelAnimator = () => {
  const [selectedTraits, setSelectedTraits] = useState({
    armor: 'default',
    weapon: 'katana',
    mask: 'none'
  });
  
  const [selectedAnimation, setSelectedAnimation] = useState('idle');
  const [isPlaying, setIsPlaying] = useState(true);
  const [rotation, setRotation] = useState(0);
  
  const traits = {
    armor: ['default', 'gold', 'silver', 'bronze', 'shadow'],
    weapon: ['katana', 'nodachi', 'wakizashi', 'naginata', 'tanto'],
    mask: ['none', 'oni', 'kitsune', 'hannya', 'menpo']
  };
  
  const animations = [
    'idle',
    'battle-stance',
    'attack',
    'defend',
    'meditate',
    'walk',
    'run'
  ];

  const handleTraitChange = (category, value) => {
    setSelectedTraits(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleRotation = () => {
    setRotation(prev => (prev + 45) % 360);
  };

  const captureScreenshot = () => {
    console.log('Capturing screenshot...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <header className="bg-black/50 backdrop-blur-sm border-b border-red-900/20 p-6">
        <h1 className="text-4xl font-bold text-red-500 text-center">
          Samurai Customizer
        </h1>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Traits */}
          <div className="bg-gray-900/50 rounded-xl p-6 border border-red-900/20">
            <h2 className="text-2xl font-bold text-white mb-6">Traits</h2>
            
            {Object.entries(traits).map(([category, options]) => (
              <div key={category} className="mb-6">
                <label className="text-gray-300 text-lg capitalize mb-2 block">
                  {category}
                </label>
                <div className="relative">
                  <select
                    value={selectedTraits[category]}
                    onChange={(e) => handleTraitChange(category, e.target.value)}
                    className="w-full bg-gray-800 text-white rounded-lg p-3 pr-10 appearance-none border border-red-900/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                  >
                    {options.map(option => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            ))}
          </div>

          {/* Center Panel - Model Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 rounded-xl p-6 border border-red-900/20 h-[600px] relative">
              {/* Placeholder for 3D Model Viewer */}
              <div 
                className="w-full h-full bg-black/50 rounded-lg flex items-center justify-center"
                style={{ transform: `rotateY(${rotation}deg)`, transition: 'transform 0.3s ease-in-out' }}
              >
                <p className="text-gray-500 text-lg">3D Model Viewer</p>
              </div>

              {/* Controls */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-3 bg-red-600 hover:bg-red-500 rounded-full text-white transition-all"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
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

            {/* Animation Selection */}
            <div className="mt-6 bg-gray-900/50 rounded-xl p-6 border border-red-900/20">
              <h2 className="text-2xl font-bold text-white mb-6">Animations</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {animations.map(animation => (
                  <button
                    key={animation}
                    onClick={() => setSelectedAnimation(animation)}
                    className={`p-3 rounded-lg text-white transition-all ${
                      selectedAnimation === animation
                        ? 'bg-red-600 hover:bg-red-500'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    {animation.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelAnimator;

