import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Vote, Play, Users, Crown, Heart } from 'lucide-react';
import AnimatedModel from './AnimatedModel';
import SceneEnvironment from '../assets/scene/SceneEnvironment';
import { presetModels } from './ModelAnimatorConfig';

const CommunityAnimator = () => {
  const [selectedScene, setSelectedScene] = useState(null);
  const [userWallet, setUserWallet] = useState(null);

  // Using only existing models without custom animations
  const storyScenes = [
    {
      id: 1,
      title: "Shadow Warrior's Tale",
      description: "A masterless samurai embarks on a journey of redemption",
      model: presetModels[1].path, // Shadow Warrior model
      votes: 1245,
      status: "Active"
    },
    {
      id: 2,
      title: "Dragon Knight Rising",
      description: "The legendary Dragon Clan chooses its next champion",
      model: presetModels[2].path, // Dragon Knight model
      votes: 892,
      status: "Upcoming"
    }
  ];

  // Voting options for current scene
  const currentVotes = [
    {
      id: 1,
      title: "Choose the Warrior's Path",
      options: [
        { id: 1, text: "Join the Shadow Clan", votes: 450 },
        { id: 2, text: "Align with the Dragon Temple", votes: 380 },
        { id: 3, text: "Remain Independent", votes: 415 }
      ],
      endsIn: "2 days"
    }
  ];

  const calculateVotingPower = (nftCount) => {
    if (nftCount >= 10) return 15;
    if (nftCount >= 5) return 7;
    if (nftCount >= 3) return 4;
    return nftCount;
  };

  const handleConnectWallet = () => {
    // Simulate wallet connection
    const mockWallet = {
      address: '0x....',
      nftCount: 3,
      votingPower: calculateVotingPower(3)
    };
    setUserWallet(mockWallet);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Community Animation Studio</h1>
          <p className="text-xl text-gray-400">Shape our story through animation and voting</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Story Scenes */}
          <div className="space-y-6">
            <div className="bg-neutral-900/50 rounded-xl p-6 border border-red-900/20">
              <div className="flex items-center gap-3 mb-6">
                <Play className="w-6 h-6 text-red-500" />
                <h2 className="text-2xl font-bold text-white">Story Scenes</h2>
              </div>
              
              <div className="space-y-4">
                {storyScenes.map((scene) => (
                  <button
                    key={scene.id}
                    onClick={() => setSelectedScene(scene)}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      selectedScene?.id === scene.id 
                        ? 'bg-red-600 hover:bg-red-500'
                        : 'bg-neutral-800 hover:bg-neutral-700'
                    }`}
                  >
                    <h3 className="text-lg font-bold text-white mb-2">{scene.title}</h3>
                    <p className="text-sm text-gray-400 mb-3">{scene.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className={`px-2 py-1 rounded-full ${
                        scene.status === 'Active' 
                          ? 'bg-green-900/20 text-green-500'
                          : 'bg-blue-900/20 text-blue-500'
                      }`}>
                        {scene.status}
                      </span>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{scene.votes} votes</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Voting Power */}
            <div className="bg-neutral-900/50 rounded-xl p-6 border border-red-900/20">
              <div className="flex items-center gap-3 mb-6">
                <Crown className="w-6 h-6 text-red-500" />
                <h2 className="text-2xl font-bold text-white">Your Influence</h2>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-neutral-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">NFTs Held</span>
                    <span className="text-white font-bold">{userWallet?.nftCount || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Voting Power</span>
                    <span className="text-red-500 font-bold">{userWallet?.votingPower || 0} votes</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleConnectWallet}
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-all"
                >
                  {userWallet ? 'Connected' : 'Connect Wallet'}
                </button>
              </div>
            </div>
          </div>

          {/* 3D Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-neutral-900/50 rounded-xl p-6 border border-red-900/20 h-[600px] relative">
              <Canvas shadows>
                <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={45} />
                <SceneEnvironment>
                  {selectedScene && (
                    <AnimatedModel
                      modelPath={selectedScene.model}
                      scale={2}
                      position={[0, -1, 0]}
                    />
                  )}
                </SceneEnvironment>
                <OrbitControls
                  makeDefault
                  minPolarAngle={Math.PI / 4}
                  maxPolarAngle={Math.PI / 2}
                  minDistance={3}
                  maxDistance={10}
                />
              </Canvas>

              {!selectedScene && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <p className="text-white text-xl">Select a scene to begin</p>
                </div>
              )}
            </div>

            {/* Active Votes */}
            {selectedScene && (
              <div className="mt-6 bg-neutral-900/50 rounded-xl p-6 border border-red-900/20">
                <div className="flex items-center gap-3 mb-6">
                  <Vote className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-bold text-white">Active Votes</h2>
                </div>

                {currentVotes.map((vote) => (
                  <div key={vote.id} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-white">{vote.title}</h3>
                      <span className="text-sm text-gray-400">Ends in {vote.endsIn}</span>
                    </div>
                    
                    <div className="grid gap-3">
                      {vote.options.map((option) => (
                        <button
                          key={option.id}
                          className="p-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-all"
                          disabled={!userWallet}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-white">{option.text}</span>
                            <div className="flex items-center gap-2 text-gray-400">
                              <Heart className="w-4 h-4" />
                              <span>{option.votes}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityAnimator;