// src/systems/types.js

// Scene interaction types
export const INTERACTION_TYPES = {
  LORE: 'LORE',
  BATTLE: 'BATTLE',
  MYSTICAL: 'MYSTICAL',
  DIPLOMACY: 'DIPLOMACY',
  EXPLORATION: 'EXPLORATION',
  SPIRITUAL: 'SPIRITUAL'
};

// Achievement requirement types
export const REQUIREMENT_TYPES = {
  VOTES: 'votes',
  SCENES: 'scenes',
  LEVEL: 'level',
  INTERACTIONS: 'interactions',
  LORE_DISCOVERED: 'lore_discovered',
  WINNING_VOTES: 'winning_votes'
};

// XP and level constants
export const LEVEL_SYSTEM = {
  XP_PER_LEVEL: 1000,
  MAX_LEVEL: 50,
  VOTING_POWER_BONUS_PER_5_LEVELS: 1
};

// NFT tier thresholds
export const NFT_TIERS = {
  BASIC: { min: 1, bonus: 0 },
  ADVANCED: { min: 3, bonus: 1 },
  EXPERT: { min: 5, bonus: 3 },
  MASTER: { min: 10, bonus: 5 }
};

// Scene status types
export const SCENE_STATUS = {
  ACTIVE: 'Active',
  UPCOMING: 'Upcoming',
  COMPLETED: 'Completed',
  LOCKED: 'Locked'
};

// Vote cost modifiers
export const VOTE_COSTS = {
  BASIC: 1,
  IMPORTANT: 2,
  CRITICAL: 3,
  LEGENDARY: 4
};

// Achievement categories
export const ACHIEVEMENT_CATEGORIES = {
  STORY: 'STORY',
  COMMUNITY: 'COMMUNITY',
  VOTING: 'VOTING',
  MILESTONE: 'MILESTONE'
};

// Achievement rewards
export const ACHIEVEMENT_REWARDS = {
  BASIC: { xp: 100, votingPowerBonus: 0 },
  INTERMEDIATE: { xp: 250, votingPowerBonus: 1 },
  ADVANCED: { xp: 500, votingPowerBonus: 2 },
  EXPERT: { xp: 1000, votingPowerBonus: 3 }
};

// Scene interaction results
export const INTERACTION_RESULTS = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  NEUTRAL: 'NEUTRAL',
  SPECIAL: 'SPECIAL'
};

// Utility functions
export const calculateVotingPower = (nftCount, level) => {
  // Find NFT tier
  const tier = Object.entries(NFT_TIERS)
    .reverse()
    .find(([_, { min }]) => nftCount >= min)?.[1] || NFT_TIERS.BASIC;

  // Calculate level bonus
  const levelBonus = Math.floor(level / 5) * LEVEL_SYSTEM.VOTING_POWER_BONUS_PER_5_LEVELS;

  return nftCount + tier.bonus + levelBonus;
};

export const calculateRequiredXP = (level) => {
  return level * LEVEL_SYSTEM.XP_PER_LEVEL;
};

export const getAchievementReward = (difficulty) => {
  return ACHIEVEMENT_REWARDS[difficulty] || ACHIEVEMENT_REWARDS.BASIC;
};

export const isSceneAccessible = (scene, userLevel, completedScenes) => {
  if (scene.status === SCENE_STATUS.LOCKED) {
    return false;
  }
  
  if (scene.requiredLevel && userLevel < scene.requiredLevel) {
    return false;
  }
  
  if (scene.requiredScenes?.some(sceneId => !completedScenes.includes(sceneId))) {
    return false;
  }
  
  return true;
};