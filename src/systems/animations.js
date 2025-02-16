// src/systems/animations.js

// Base animation variants
export const baseVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },
  
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  },
  
  slideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.3 }
  },
  
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.3 }
  }
};

// Interaction animations
export const interactionVariants = {
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 }
  },
  
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  
  press: {
    scale: 0.9,
    transition: { duration: 0.1 }
  }
};

// Container animations
export const containerVariants = {
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  
  list: {
    animate: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  }
};

// Notification animations
export const notificationVariants = {
  initial: { 
    opacity: 0,
    y: 50,
    scale: 0.3
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30
    }
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: { duration: 0.2 }
  }
};

// Progress animations
export const progressVariants = {
  initial: { width: 0 },
  animate: width => ({
    width: `${width}%`,
    transition: { duration: 0.5, ease: "easeOut" }
  })
};

// Transition presets
export const transitions = {
  spring: {
    type: "spring",
    stiffness: 500,
    damping: 30
  },
  
  smooth: {
    type: "tween",
    duration: 0.3,
    ease: "easeInOut"
  },
  
  bounce: {
    type: "spring",
    stiffness: 300,
    damping: 10
  }
};

// Animation utilities
export const createStaggerVariants = (delay = 0.1, stagger = 0.05) => ({
  animate: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay
    }
  }
});

export const createFadeSlideVariants = (direction = "up", distance = 20) => {
  const axis = direction === "up" || direction === "down" ? "y" : "x";
  const sign = direction === "up" || direction === "left" ? 1 : -1;
  
  return {
    initial: { 
      opacity: 0,
      [axis]: distance * sign
    },
    animate: {
      opacity: 1,
      [axis]: 0
    },
    exit: {
      opacity: 0,
      [axis]: -distance * sign
    }
  };
};