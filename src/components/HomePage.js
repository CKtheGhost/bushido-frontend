import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, ChevronRight, Sword, Users, Play, Code, X } from 'lucide-react';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(null);
  const [activeFeature, setActiveFeature] = useState(null);
  const [showAutoplayPrompt, setShowAutoplayPrompt] = useState(true);
  const videoRef = useRef(null);

  const features = [
    {
      icon: <Sword className="w-10 h-10" />,
      title: "Samurai Legacy",
      description: "Immerse yourself in the rich tradition of the Bushido code through unique 3D NFTs",
      route: '/samurai-legacy',
      color: "from-red-500/20 to-transparent"
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Community Driven",
      description: "Shape the narrative through voting and collaborative storytelling",
      route: '/community',
      color: "from-blue-500/20 to-transparent"
    },
    {
      icon: <Code className="w-10 h-10" />,
      title: "Customizable 3D Art",
      description: "Create and customize your own unique Samurai warrior",
      route: '/animator',
      color: "from-green-500/20 to-transparent"
    },
    {
      icon: <Play className="w-10 h-10" />,
      title: "Animated Series",
      description: "Experience your NFTs come to life in our upcoming animated series",
      route: '/animated-series',
      color: "from-purple-500/20 to-transparent"
    }
  ];

    useEffect(() => {
    setIsVisible(true);
    
    // Try to play with sound immediately (will likely be blocked by browser)
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {
        // If autoplay with sound fails, mute and try again
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play();
        }
      });
    }
  }, []);

  const handleLoadedData = () => {
    setIsVideoLoaded(true);
  };

  const enableSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      setShowAutoplayPrompt(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  const handleNavigate = (route) => {
    if (route) window.location.href = route;
  };

    return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          loop
          muted={isMuted}
          onLoadedData={handleLoadedData}
          onError={(e) => setVideoError(e)}
        >
          <source src="/videos/Bushido_Story_004.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Autoplay Prompt */}
      <AnimatePresence>
        {showAutoplayPrompt && isVideoLoaded && isMuted && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-black/90 backdrop-blur-sm border border-red-500/20 rounded-xl p-4 shadow-xl flex items-center gap-4">
              <div className="text-white text-sm">
                <p>Enable sound for full experience?</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={enableSound}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm transition-colors"
                >
                  Enable
                </button>
                <button
                  onClick={() => setShowAutoplayPrompt(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

       {/* Loading State */}
      {!isVideoLoaded && !videoError && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
          <div className="text-white text-center">
            <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-lg">Loading experience...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section - Reduced height */}
        <section className="flex-shrink-0 h-[45vh] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-7xl font-extrabold mb-4 text-white tracking-wider">
              BUSHIDO
            </h1>
            <div className="w-32 h-1 bg-red-500 mx-auto mb-6" />
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join us in shaping the future of interactive storytelling through unique 3D NFTs 
              and community-driven narratives.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-700 hover:bg-red-600 text-white text-xl px-10 py-4 rounded-xl flex items-center gap-2 mx-auto group transition-all duration-300"
              onClick={() => handleNavigate('/collection')}
            >
              Explore Collection
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </section>

        {/* Features Section - Expanded proportionally */}
        <section className="flex-grow flex items-center py-12 relative">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-white text-center mb-12"
            >
              Features
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  onHoverStart={() => setActiveFeature(index)}
                  onHoverEnd={() => setActiveFeature(null)}
                  onClick={() => handleNavigate(feature.route)}
                  className="relative bg-neutral-900/50 border border-red-900/20 p-8 rounded-2xl cursor-pointer group h-full"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-4 bg-red-900/20 rounded-lg text-red-500">
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                    </div>
                    <p className="text-gray-400 text-lg flex-grow">{feature.description}</p>
                    <div className="flex items-center gap-2 text-red-500 mt-6 group-hover:translate-x-2 transition-transform">
                      <span>Learn more</span>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

       {/* Video Controls */}
      <button
        onClick={toggleMute}
        className="fixed bottom-4 right-4 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all z-20"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </div>
  );
};

export default HomePage;