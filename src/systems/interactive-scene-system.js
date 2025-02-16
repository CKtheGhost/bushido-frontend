import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import {
  Play, Crown, Heart, Star, BarChart, Activity,
  AlertCircle, Trophy, Sparkles, Medal, Target,
  Book, Scroll, Swords, Shield, Flame, Wind,
  Award, Gift, Hourglass, Milestone, Users
} from 'lucide-react';

// Enhanced animation variants
const animations = {
  fadeScale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.3 }
  },
  slideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
    transition: { duration: 0.4 }
  },
  popIn: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring", stiffness: 500, damping: 30 }
  },
  ripple: {
    initial: { scale: 0, opacity: 1 },
    animate: { scale: 2, opacity: 0 },
    transition: { duration: 0.8 }
  },
  bounce: {
    initial: { y: 0 },
    animate: { y: -10 },
    transition: { duration: 0.5, yoyo: Infinity }
  }
};

// Enhanced achievements system
const ACHIEVEMENT_CATEGORIES = {
  STORY: {
    icon: Book,
    color: 'red',
    title: 'Story Achievements'
  },
  COMMUNITY: {
    icon: Users,
    color: 'blue',
    title: 'Community Achievements'
  },
  VOTING: {
    icon: Trophy,
    color: 'yellow',
    title: 'Voting Achievements'
  },
  MILESTONE: {
    icon: Target,
    color: 'green',
    title: 'Milestones'
  }
};

const ACHIEVEMENTS = [
  {
    id: 'first_vote',
    category: 'VOTING',
    title: 'First Voice',
    description: 'Cast your first vote',
    xp: 100,
    icon: Star,
    requirement: { type: 'votes', count: 1 }
  },
  {
    id: 'scene_expert',
    category: 'STORY',
    title: 'Scene Expert',
    description: 'Participate in 5 different scenes',
    xp: 250,
    icon: Scroll,
    requirement: { type: 'scenes', count: 5 }
  },
  {
    id: 'influence_master',
    category: 'COMMUNITY',
    title: 'Influence Master',
    description: 'Reach Level 10 influence',
    xp: 1000,
    icon: Crown,
    requirement: { type: 'level', count: 10 }
  },
  {
    id: 'winning_choice',
    category: 'VOTING',
    title: 'Choice Champion',
    description: 'Vote for the winning option 3 times',
    xp: 500,
    icon: Medal,
    requirement: { type: 'winning_votes', count: 3 }
  }
];

// Interactive scene features
const SceneInteraction = ({ scene, onAction }) => {
  const controls = useAnimation();

  const handleInteraction = useCallback(async (action) => {
    // Visual feedback animation
    await controls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.3 }
    });

    // Trigger scene-specific action
    onAction(action);
  }, [controls, onAction]);

  return (
    <motion.div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
      <div className="flex gap-4 justify-center">
        {scene.availableActions.map((action) => (
          <motion.button
            key={action.type}
            onClick={() => handleInteraction(action)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={controls}
            className="p-3 bg-red-600/80 hover:bg-red-500 rounded-lg text-white"
          >
            <action.icon className="w-6 h-6" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// Achievement notification system
const AchievementPopup = ({ achievement, onComplete }) => (
  <motion.div
    variants={animations.slideUp}
    initial="initial"
    animate="animate"
    exit="exit"
    onAnimationComplete={onComplete}
    className="fixed bottom-4 right-4 p-4 bg-neutral-900/90 backdrop-blur-sm border border-red-500 rounded-lg shadow-lg"
  >
    <div className="flex items-center gap-4">
      <motion.div
        variants={animations.popIn}
        className="p-2 bg-red-600 rounded-full"
      >
        <Trophy className="w-6 h-6 text-white" />
      </motion.div>
      <div>
        <h4 className="text-white font-bold">{achievement.title}</h4>
        <p className="text-sm text-gray-300">{achievement.description}</p>
        <div className="text-red-500 text-sm mt-1">+{achievement.xp} XP</div>
      </div>
    </div>
  </motion.div>
);

// Level up animation overlay
const LevelUpOverlay = ({ level, onComplete }) => (
  <motion.div
    variants={animations.fadeScale}
    initial="initial"
    animate="animate"
    exit="exit"
    onAnimationComplete={onComplete}
    className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
  >
    <div className="text-center">
      <motion.div
        variants={animations.bounce}
        className="mb-4"
      >
        <Sparkles className="w-16 h-16 text-yellow-500" />
      </motion.div>
      <motion.h2
        variants={animations.popIn}
        className="text-4xl font-bold text-white mb-2"
      >
        Level Up!
      </motion.h2>
      <motion.div
        variants={animations.slideUp}
        className="text-2xl text-red-500"
      >
        Level {level}
      </motion.div>
    </div>
  </motion.div>
);

// Interactive scene preview with hotspots
const EnhancedScenePreview = ({ scene, onInteract }) => {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const controls = useAnimation();

  const handleHotspotClick = async (hotspot) => {
    setActiveHotspot(hotspot);
    await controls.start('ripple');
    onInteract(hotspot);
  };

  return (
    <motion.div className="relative h-[600px] rounded-xl overflow-hidden">
      <img 
        src={`/api/placeholder/800/600`}
        alt={scene?.title || 'Scene preview'}
        className="w-full h-full object-cover"
      />
      
      {scene?.hotspots?.map((hotspot) => (
        <motion.button
          key={hotspot.id}
          style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
          className="absolute w-8 h-8 -ml-4 -mt-4"
          whileHover={{ scale: 1.2 }}
          onClick={() => handleHotspotClick(hotspot)}
        >
          <motion.div
            animate={controls}
            variants={animations.ripple}
            className="absolute inset-0 rounded-full bg-red-500/50"
          />
          <motion.div
            animate={activeHotspot?.id === hotspot.id ? animations.bounce : {}}
            className="relative w-full h-full rounded-full bg-red-500 flex items-center justify-center"
          >
            <hotspot.icon className="w-4 h-4 text-white" />
          </motion.div>
        </motion.button>
      ))}
      
      {activeHotspot && (
        <motion.div
          variants={animations.fadeScale}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute bottom-4 left-4 right-4 p-4 bg-black/80 backdrop-blur-sm rounded-lg"
        >
          <h4 className="text-white font-bold mb-1">{activeHotspot.title}</h4>
          <p className="text-gray-300 text-sm">{activeHotspot.description}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

// Achievement progress with categories and tiers
const EnhancedAchievementProgress = ({ 
  achievements, 
  completedIds,
  progress,
  onAchievementClick 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredAchievements = achievements.filter(achievement => 
    selectedCategory === 'ALL' || achievement.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* Category filters */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedCategory('ALL')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${
            selectedCategory === 'ALL'
              ? 'bg-red-600 text-white'
              : 'bg-neutral-800 text-gray-400 hover:bg-neutral-700'
          }`}
        >
          All Achievements
        </motion.button>
        
        {Object.entries(ACHIEVEMENT_CATEGORIES).map(([key, category]) => {
          const CategoryIcon = category.icon;
          return (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap ${
                selectedCategory === key
                  ? 'bg-red-600 text-white'
                  : 'bg-neutral-800 text-gray-400 hover:bg-neutral-700'
              }`}
            >
              <CategoryIcon className="w-4 h-4" />
              <span>{category.title}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Achievement grid */}
      <motion.div
        variants={{
          animate: { transition: { staggerChildren: 0.1 } }
        }}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <AnimatePresence mode="wait">
          {filteredAchievements.map((achievement) => {
            const isCompleted = completedIds.includes(achievement.id);
            const currentProgress = progress[achievement.id] || 0;
            const progressPercentage = Math.min(
              (currentProgress / achievement.requirement.count) * 100,
              100
            );

            return (
              <motion.div
                key={achievement.id}
                variants={animations.fadeScale}
                layout
                onClick={() => onAchievementClick(achievement)}
                className={`p-4 rounded-lg border cursor-pointer ${
                  isCompleted 
                    ? 'bg-red-900/20 border-red-500'
                    : 'bg-neutral-800 border-transparent hover:border-red-500/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    isCompleted ? 'bg-red-500' : 'bg-neutral-700'
                  }`}>
                    <achievement.icon className={`w-6 h-6 ${
                      isCompleted ? 'text-white' : 'text-gray-400'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-white font-bold">{achievement.title}</h4>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                    
                    {!isCompleted && (
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-red-500">
                            {currentProgress}/{achievement.requirement.count}
                          </span>
                        </div>
                        <div className="h-1 bg-neutral-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-red-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercentage}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>
                    )}
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
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export {
  ACHIEVEMENTS,
  ACHIEVEMENT_CATEGORIES,
  animations,
  SceneInteraction,
  AchievementPopup,
  LevelUpOverlay,
  EnhancedScenePreview,
  EnhancedAchievementProgress
};