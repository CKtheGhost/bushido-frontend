import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX, ChevronRight } from 'lucide-react';

const features = [
  {
    title: "Samurai Legacy",
    description: "Immerse yourself in the rich tradition of the Bushido code through unique 3D NFTs",
    route: '/samurai-legacy'
  },
  {
    title: "Community Driven",
    description: "Shape the narrative through voting and collaborative storytelling",
    route: '/community'
  },
  {
    title: "Customizable 3D Art",
    description: "Create and customize your own unique Samurai warrior",
    route: '/animator'
  },
  {
    title: "Animated Series",
    description: "Experience your NFTs come to life in our upcoming animated series",
    route: '/animated-series'
  }
];

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    if (videoRef.current) {
      videoRef.current.muted = true;
      
      console.log('Video element:', {
        src: videoRef.current.src,
        readyState: videoRef.current.readyState,
        error: videoRef.current.error,
        networkState: videoRef.current.networkState
      });
    }
  }, []);

  const handleLoadedData = () => {
    console.log('Video loaded successfully');
    setIsVideoLoaded(true);
    
    videoRef.current?.play().catch(err => {
      console.error('Auto-play failed:', err);
    });
  };

  const handleVideoError = (e) => {
    console.error('Video error:', e);
    setVideoError(e.target.error);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  const handleExploreCollection = () => {
    window.location.href = '/collection';
  };

  const handleNavigate = (route) => {
    if (route) {
      window.location.href = route;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white relative overflow-hidden">
      {/* Video Background with Debug Info */}
      <div className="absolute inset-0">
        <video 
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-60" 
          playsInline
          loop
          muted={isMuted}
          onLoadedData={handleLoadedData}
          onError={handleVideoError}
        >
          <source src="/videos/Bushido_Story_004.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Loading State */}
        {!isVideoLoaded && !videoError && (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p>Loading video...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {videoError && (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div className="text-red-500 text-center p-4">
              <p className="text-xl mb-2">Video failed to load</p>
              <p className="text-sm mb-4">Error: {videoError.message}</p>
              <p className="text-sm mb-4">
                Debug info: Make sure video exists at: /videos/Bushido_Story_004.mp4
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Mute Toggle Button */}
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all z-10"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />

      {/* Fixed Background Pattern */}
      <div 
        className="fixed inset-0 bg-repeat opacity-5 pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20L0 20L20 0L40 20L20 20L20 40L20 20Z' fill='white'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }} 
      />

      {/* Main Content Section */}
      <section className="h-screen flex flex-col items-center justify-center text-white px-4 relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-96 h-96 bg-red-800 rounded-full blur-3xl" />
        </div>

        <div 
          className={`relative text-center transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h1 className="text-8xl font-extrabold mb-6 tracking-widest drop-shadow-lg">
            BUSHIDO
          </h1>
          <div className="w-32 h-1 bg-red-500 mx-auto mb-8" />
          <p className="text-2xl mb-12 max-w-2xl mx-auto text-gray-300 font-light">
            Join us in shaping the future of interactive storytelling through unique 3D NFTs 
            and community-driven narratives.
          </p>
          <button 
            className="bg-red-700 hover:bg-red-600 text-white text-xl px-10 py-5 group border border-red-700/50 rounded-xl flex items-center gap-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-red-900 mx-auto"
            onClick={handleExploreCollection}
          >
            Explore Collection 
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative bg-gradient-to-b from-black to-neutral-800">
        <div className="container mx-auto px-4 relative">
          <h2 className="text-5xl font-bold text-white mb-8 text-center drop-shadow-lg">Features</h2>
          <div className="w-20 h-1 bg-red-500 mx-auto mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {features.map((feature, index) => (
              <div 
                key={index} 
                onClick={() => handleNavigate(feature.route)}
                className={`bg-neutral-900 border border-red-900 group hover:border-red-500 transition-all duration-300 p-8 rounded-2xl shadow-lg hover:shadow-red-900 ${
                  feature.route ? 'cursor-pointer' : ''
                }`}
              >
                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                <div className="w-12 h-1 bg-red-500 mb-6 transition-all group-hover:w-16" />
                <p className="text-gray-400 text-lg">{feature.description}</p>
                {feature.route && (
                  <div className="mt-4 flex items-center text-red-500 gap-2">
                    <span>Learn more</span>
                    <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-white">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-red-500">BUSHIDO</h3>
              <div className="w-10 h-1 bg-red-500 mb-6" />
              <p className="text-gray-400 text-lg">Where Art, Community, and Innovation Collide.</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-red-900/20 text-center text-gray-400">
            <p>&copy; 2024 Bushido. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;