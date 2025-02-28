import React, { useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { 
  Play, Vote, Crown, Heart, Users, Clock, 
  AlertCircle, Sword, Scroll, Eye, Book, Wind, 
  Sparkles, MessageCircle, Star, Activity, BarChart, 
  Award 
} from 'lucide-react';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const slideIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 }
};

// Scene types with their icons
const SCENE_TYPES = {
  BATTLE: { icon: Sword, color: 'red' },
  MYSTICAL: { icon: Sparkles, color: 'purple' },
  DIPLOMACY: { icon: MessageCircle, color: 'blue' },
  EXPLORATION: { icon: Eye, color: 'green' },
  SPIRITUAL: { icon: Wind, color: 'cyan' }
};

// Achievement data
const ACHIEVEMENTS = [
  { id: 1, title: "First Vote", icon: Vote, description: "Cast your first vote", xp: 100 },
  { id: 2, title: "Story Shaper", icon: Book, description: "Vote in 5 different scenes", xp: 250 },
  { id: 3, title: "Community Leader", icon: Crown, description: "Reach max voting power", xp: 500 },
  { id: 4, title: "Influencer", icon: Star, description: "Have your vote win 3 times", xp: 300 }
];

// Helper function to calculate voting power
const calculateVotingPower = (nftCount, experience) => {
  const baseVotingPower = nftCount >= 10 ? 15 :
                         nftCount >= 5 ? 7 :
                         nftCount >= 3 ? 4 :
                         nftCount;
  
  const level = Math.floor(experience / 1000) + 1;
  const bonusPower = Math.floor(level / 5);
  
  return baseVotingPower + bonusPower;
};

// Component Definitions
const EnhancedScenePreview = ({ selectedScene, onVoteStart }) => {
  const controls = useAnimation();
  
  const handleInteraction = async () => {
    await controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.5 }
    });
    onVoteStart();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-neutral-900/50 rounded-xl border border-red-900/20 h-[600px] relative overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedScene?.id || 'empty'}
          variants={scaleIn}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full h-full"
        >
          <motion.img 
            src={`/api/placeholder/800/600`} 
            alt={selectedScene?.title || 'Scene preview'} 
            className="w-full h-full object-cover cursor-pointer"
            animate={controls}
            whileHover={{ scale: 1.02 }}
            onClick={handleInteraction}
          />
          
          {selectedScene && (
            <motion.div
              variants={fadeInUp}
              className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent"
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                {selectedScene.title}
              </h3>
              <p className="text-gray-300">{selectedScene.description}</p>
            </motion.div>
          )}
          
          {!selectedScene && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <p className="text-white text-xl">Select a scene to begin</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const EnhancedVotingOption = ({ 
  option, 
  onVote, 
  hasVoted, 
  remainingVotes, 
  userVotes, 
  showResult 
}) => {
  const controls = useAnimation();
  const OptionTypeIcon = SCENE_TYPES[option.type]?.icon;
  const totalVotes = option.votes;
  const votePercentage = Math.round((option.votes / (option.totalVotes || 1)) * 100);

  const handleVoteClick = async () => {
    if (hasVoted || remainingVotes <= 0) return;
    
    await controls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.3 }
    });
    onVote(option.id);
  };

  return (
    <motion.button
      onClick={handleVoteClick}
      animate={controls}
      disabled={hasVoted || remainingVotes <= 0}
      variants={fadeInUp}
      whileHover={!hasVoted && remainingVotes > 0 ? { scale: 1.02 } : {}}
      className={`w-full p-4 rounded-lg text-left transition-all relative overflow-hidden ${
        hasVoted && userVotes[option.id]
          ? 'bg-red-900/30 border border-red-500'
          : hasVoted
            ? 'bg-neutral-800/50 opacity-50'
            : remainingVotes > 0
              ? 'bg-neutral-800 hover:bg-neutral-700'
              : 'bg-neutral-800/50 opacity-50 cursor-not-allowed'
      }`}
    >
      {showResult && (
        <motion.div 
          className="absolute left-0 top-0 h-full bg-red-500/10"
          initial={{ width: 0 }}
          animate={{ width: `${votePercentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      )}

      <div className="relative z-10 flex justify-between items-center">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            {OptionTypeIcon && <OptionTypeIcon className="w-5 h-5 text-red-500" />}
            <span className="text-white">{option.text}</span>
          </div>
          {option.description && (
            <p className="text-sm text-gray-400 mt-1 ml-9">{option.description}</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          {!hasVoted && remainingVotes > 0 && (
            <span className="text-sm text-gray-400">
              Cost: {option.voteCost} votes
            </span>
          )}
          <div className="flex items-center gap-2 text-gray-400">
            <Heart className="w-4 h-4" />
            <span>
              {showResult 
                ? `${votePercentage}% (${totalVotes.toLocaleString()})` 
                : totalVotes.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {showResult && votePercentage > 50 && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-2 right-2"
        >
          <Star className="w-5 h-5 text-yellow-500" />
        </motion.div>
      )}
    </motion.button>
  );
};

const AchievementProgress = ({ achievements, completedIds }) => (
  <motion.div 
    variants={fadeInUp}
    initial="initial"
    animate="animate"
    className="bg-neutral-900/50 rounded-xl p-6 border border-red-900/20"
  >
    <div className="flex items-center gap-3 mb-6">
      <Award className="w-6 h-6 text-red-500" />
      <h3 className="text-xl font-bold text-white">Achievements</h3>
    </div>
    <div className="space-y-4">
      {achievements.map((achievement) => {
        const Icon = achievement.icon;
        const isCompleted = completedIds.includes(achievement.id);
        
        return (
          <motion.div
            key={achievement.id}
            variants={slideIn}
            className={`p-4 rounded-lg border ${
              isCompleted 
                ? 'bg-red-900/20 border-red-500'
                : 'bg-neutral-800 border-transparent'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className={`w-5 h-5 ${
                isCompleted ? 'text-red-500' : 'text-gray-500'
              }`} />
              <div className="flex-1">
                <h4 className="text-white font-bold">{achievement.title}</h4>
                <p className="text-sm text-gray-400">{achievement.description}</p>
              </div>
              <div className="text-right">
                <span className={`text-sm ${
                  isCompleted ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {achievement.xp} XP
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  </motion.div>
);

const CommunityStats = ({ stats }) => (
  <motion.div
    variants={fadeInUp}
    initial="initial"
    animate="animate"
    className="bg-neutral-900/50 rounded-xl p-6 border border-red-900/20"
  >
    <div className="flex items-center gap-3 mb-6">
      <BarChart className="w-6 h-6 text-red-500" />
      <h3 className="text-xl font-bold text-white">Community Impact</h3>
    </div>
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(stats).map(([key, value], index) => (
        <motion.div
          key={key}
          variants={scaleIn}
          className="p-4 bg-neutral-800 rounded-lg"
        >
          <div className="text-sm text-gray-400 mb-1">{key}</div>
          <div className="text-2xl font-bold text-red-500">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const VotingPowerDisplay = ({ nftCount, votingPower }) => (
  <motion.div 
    variants={fadeInUp}
    className="bg-neutral-900/50 rounded-xl p-6 border border-red-900/20"
  >
    <div className="flex items-center gap-3 mb-6">
      <Crown className="w-6 h-6 text-red-500" />
      <h3 className="text-xl font-bold text-white">Your Influence</h3>
    </div>
    
    <div className="grid grid-cols-2 gap-4">
      <motion.div 
        className="p-4 bg-neutral-800 rounded-lg"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400">NFTs Held</span>
          <span className="text-white font-bold">{nftCount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Voting Power</span>
          <span className="text-red-500 font-bold">{votingPower} votes</span>
        </div>
      </motion.div>

      <motion.div 
        className="p-4 bg-neutral-800 rounded-lg"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400">Status</span>
          <span className="text-green-500 font-bold">
            {votingPower > 0 ? 'Active' : 'Inactive'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Next Tier</span>
          <span className="text-gray-400">
            {nftCount < 3 ? '3 NFTs' : 
             nftCount < 5 ? '5 NFTs' : 
             nftCount < 10 ? '10 NFTs' : 'Max Tier'}
          </span>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

const StoryScene = ({ scene, isSelected, onSelect, votingPower }) => {
  const SceneIcon = SCENE_TYPES[scene.type]?.icon || Scroll;
  
  return (
    <motion.button
      onClick={() => onSelect(scene)}
      whileHover={{ scale: 1.02 }}
      className={`w-full p-6 rounded-xl text-left transition-all ${
        isSelected 
          ? 'bg-red-900/30 border border-red-500'
          : 'bg-neutral-900/50 border border-red-900/20 hover:border-red-500'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <SceneIcon className="w-5 h-5 text-red-500" />
            <h3 className="text-xl font-bold text-white">{scene.title}</h3>
          </div>
          <p className="text-gray-400">{scene.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          scene.status === 'Active' 
            ? 'bg-green-900/20 text-green-500'
            : 'bg-blue-900/20 text-blue-500'
        }`}>
          {scene.status}
        </span>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{scene.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{scene.votes.toLocaleString()} votes</span>
          </div>
        </div>
        {votingPower > 0 && (
          <div className="flex items-center gap-2 text-red-500">
            <Crown className="w-4 h-4" />
            <span>+{votingPower} influence</span>
          </div>
        )}
      </div>
    </motion.button>
  );
};

// Main CommunityAnimator Component
const CommunityAnimator = () => {
  const [selectedScene, setSelectedScene] = useState(null);
  const [userVotes, setUserVotes] = useState({});
  const [nftCount, setNftCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [experience, setExperience] = useState(0);
  const [completedAchievements, setCompletedAchievements] = useState([]);
  const [activeTab, setActiveTab] = useState('scenes');
  
  const votingPower = calculateVotingPower(nftCount, experience);
  const remainingVotes = votingPower;

  // Sample story scenes
  const storyScenes = [
    {
      id: 1,
      title: "The Dragon's Awakening",
      type: "BATTLE",
      description: "An ancient dragon stirs from its slumber, threatening the peace of the realm.",
      votes: 1245,
      status: "Active",
      duration: "2:45",
      votingOptions: [
        {
          id: 1,
          text: "Confront the Dragon",
          type: "BATTLE",
          description: "Face the ancient beast in direct combat",
          votes: 450,
          totalVotes: 1245,
          voteCost: 2
        },
        {
          id: 2,
          text: "Seek Dragon's Wisdom",
          type: "MYSTICAL",
          description: "Attempt to communicate and learn from the dragon",
          votes: 380,
          totalVotes: 1245,
          voteCost: 1
        },
        {
          id: 3,
          text: "Unite the Clans",
          type: "DIPLOMACY",
          description: "Gather allies to face the threat together",
          votes: 415,
          totalVotes: 1245,
          voteCost: 3
        }
      ]
    },
    {
      id: 2,
      title: "Temple of Whispers",
      type: "SPIRITUAL",
      description: "Ancient spirits offer guidance, but their wisdom comes at a price.",
      votes: 892,
      status: "Upcoming",
      duration: "3:15"
    }
  ];

  // Community stats
  const communityStats = {
    "Total Votes": 12543,
    "Active Scenes": 3,
    "Community Size": 847,
    "Influence Level": `Level ${Math.floor(experience / 1000) + 1}`
  };

  // Handlers
  const handleVote = (optionId) => {
    const option = selectedScene.votingOptions.find(opt => opt.id === optionId);
    if (!option || option.voteCost > remainingVotes) return;

    setUserVotes(prev => ({
      ...prev,
      [selectedScene.id]: optionId
    }));
    
    setShowResults(true);

    // Update voting stats
    const updatedOptions = selectedScene.votingOptions.map(opt => ({
      ...opt,
      votes: opt.id === optionId ? opt.votes + votingPower : opt.votes,
      totalVotes: opt.totalVotes + votingPower
    }));

    setSelectedScene(prev => ({
      ...prev,
      votingOptions: updatedOptions
    }));
  };

  const handleAchievement = (achievementId) => {
    if (!completedAchievements.includes(achievementId)) {
      const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
      setCompletedAchievements(prev => [...prev, achievementId]);
      setExperience(prev => prev + achievement.xp);
    }
  };

  const handleSceneInteraction = () => {
    if (!completedAchievements.includes(1)) {
      handleAchievement(1);
    }
  };

  const hasVotedOnScene = (sceneId) => userVotes[sceneId] !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header with tabs */}
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Community Animation Studio
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Shape our story through animation and voting
          </p>
          
          <div className="flex justify-center gap-4">
            {['scenes', 'achievements', 'stats'].map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-red-600 text-white'
                    : 'bg-neutral-800 text-gray-400 hover:bg-neutral-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'scenes' ? (
            <motion.div
              key="scenes"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Left Panel */}
              <div className="space-y-6">
                {/* Story Scenes */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <Play className="w-6 h-6 text-red-500" />
                    <h2 className="text-2xl font-bold text-white">Story Scenes</h2>
                  </div>
                  
                  <AnimatePresence>
                    {storyScenes.map((scene, index) => (
                      <motion.div
                        key={scene.id}
                        variants={slideIn}
                        transition={{ delay: index * 0.1 }}
                      >
                        <StoryScene
                          scene={scene}
                          isSelected={selectedScene?.id === scene.id}
                          onSelect={setSelectedScene}
                          votingPower={votingPower}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* XP Level Progress */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-neutral-900/50 rounded-xl p-6 border border-red-900/20"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Activity className="w-6 h-6 text-red-500" />
                    <h3 className="text-xl font-bold text-white">Level Progress</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Level {Math.floor(experience / 1000) + 1}</span>
                      <span className="text-red-500">{experience % 1000}/1000 XP</span>
                    </div>
                    <div className="relative h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute h-full bg-red-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(experience % 1000) / 10}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Voting Power Display */}
                <motion.div variants={fadeInUp}>
                  <VotingPowerDisplay 
                    nftCount={nftCount} 
                    votingPower={votingPower}
                  />
                </motion.div>

                {/* Connect Wallet */}
                {nftCount === 0 && (
                  <motion.button 
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setNftCount(3)}
                    className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-all"
                  >
                    Connect Wallet
                  </motion.button>
                )}
              </div>

              {/* Scene Preview and Voting */}
              <div className="lg:col-span-2">
                {/* Scene Preview */}
                <EnhancedScenePreview 
                  selectedScene={selectedScene}
                  onVoteStart={() => handleSceneInteraction()}
                />

                {/* Voting Section */}
                {selectedScene?.votingOptions && (
                  <motion.div 
                    variants={fadeInUp}
                    className="mt-6 bg-neutral-900/50 rounded-xl p-6 border border-red-900/20"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <Vote className="w-6 h-6 text-red-500" />
                      <h2 className="text-2xl font-bold text-white">Shape the Story</h2>
                    </div>

                    <div className="space-y-4">
                      {nftCount === 0 && (
                        <motion.div 
                          variants={slideIn}
                          className="flex items-center gap-2 text-yellow-500 mb-4"
                        >
                          <AlertCircle className="w-4 h-4" />
                          <span>Connect wallet to participate in voting</span>
                        </motion.div>
                      )}

                      <AnimatePresence>
                        {selectedScene.votingOptions.map((option, index) => (
                          <motion.div
                            key={option.id}
                            variants={fadeInUp}
                            transition={{ delay: index * 0.1 }}
                          >
                            <EnhancedVotingOption
                              option={option}
                              onVote={handleVote}
                              hasVoted={hasVotedOnScene(selectedScene.id)}
                              remainingVotes={remainingVotes}
                              userVotes={userVotes}
                              showResult={showResults}
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : activeTab === 'achievements' ? (
            <motion.div
              key="achievements"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <AchievementProgress 
                achievements={ACHIEVEMENTS}
                completedIds={completedAchievements}
              />
            </motion.div>
          ) : (
            <motion.div
              key="stats"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-4xl mx-auto"
            >
              <CommunityStats stats={communityStats} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CommunityAnimator;