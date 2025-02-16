import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Scroll, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import NFTDetailsModal from './NFTDetailsModal';

// Helper Functions
const generateTraits = (id) => {
  const weapons = ['Katana', 'Nodachi', 'Wakizashi', 'Naginata', 'Tanto', 'Yari', 'Bow'];
  const armor = ['Light', 'Medium', 'Heavy', 'Royal', 'Shadow', 'Dragon Scale', 'Phoenix'];
  const masks = ['Oni', 'Kitsune', 'Hannya', 'Menpo', 'Dragon', 'Tengu', 'None'];
  const clans = ['Dragon', 'Phoenix', 'Tiger', 'Wolf', 'Bear', 'Eagle', 'Serpent'];
  const elements = ['Fire', 'Water', 'Earth', 'Wind', 'Thunder', 'Void', 'Spirit'];

  return [
    { type: 'Weapon', value: weapons[id % weapons.length] },
    { type: 'Armor', value: armor[id % armor.length] },
    { type: 'Mask', value: masks[id % masks.length] },
    { type: 'Clan', value: clans[id % clans.length] },
    { type: 'Element', value: elements[id % elements.length] }
  ];
};

const generateBio = (id, traits) => {
  return {
    en: `A legendary warrior of the ${traits[3].value} Clan, mastering the art of the ${traits[0].value}. Wielding the power of ${traits[4].value}, this samurai has earned their place among the elite through countless battles and unwavering dedication to the way of Bushido. Their ${traits[1].value} armor bears the scars of victory, while their ${traits[2].value} mask strikes fear into the hearts of enemies.`,
    jp: `${traits[3].value}一族の伝説の戦士、${traits[0].value}の達人。${traits[4].value}の力を操り、数々の戦いと武士道への揺るぎない献身によってエリートの仲間入りを果たした。${traits[1].value}の鎧は勝利の傷跡を帯び、${traits[2].value}の面は敵の心に恐怖を呼び起こす。`,
    kr: `${traits[3].value} 클랜의 전설적인 전사로, ${traits[0].value}의 달인이다. ${traits[4].value}의 힘을 다루며, 수많은 전투와 부시도 방식에 대한 흔들림 없는 헌신으로 엘리트 반열에 올랐다. ${traits[1].value} 갑옷은 승리의 상처를 간직하고 있으며, ${traits[2].value} 가면은 적의 마음에 공포를 심어준다.`
  };
};

// Sample NFT data
const enhancedImages = [
  { id: 1, src: "/images/collection/685.jpg", alt: {
    en: "Noble Warrior #685",
    jp: "高貴な戦士 #685",
    kr: "고귀한 전사 #685"
  }},
  { id: 2, src: "/images/collection/78.jpg", alt: {
    en: "Shadow Samurai #78",
    jp: "影の侍 #78",
    kr: "그림자 사무라이 #78"
  }},
  { id: 3, src: "/images/collection/188.jpg", alt: {
    en: "Storm Blade #188",
    jp: "嵐の刃 #188",
    kr: "폭풍의 칼날 #188"
  }},
  { id: 4, src: "/images/collection/439.jpg", alt: {
    en: "Forest Guardian #439",
    jp: "森の守護者 #439",
    kr: "숲의 수호자 #439"
  }},
  { id: 5, src: "/images/collection/92.jpg", alt: {
    en: "Flame Warrior #92",
    jp: "炎の戦士 #92",
    kr: "불꽃 전사 #92"
  }},
  { id: 6, src: "/images/collection/139.jpg", alt: {
    en: "Wind Master #139",
    jp: "風の達人 #139",
    kr: "바람의 달인 #139"
  }},
  { id: 7, src: "/images/collection/111.jpg", alt: {
    en: "Thunder Lord #111",
    jp: "雷の君主 #111",
    kr: "천둥의 군주 #111"
  }}
].map(image => {
  const traits = generateTraits(image.id);
  return {
    ...image,
    traits,
    bio: generateBio(image.id, traits),
    rarityRank: Math.floor(Math.random() * 10000) + 1
  };
});

const VideoBackground = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showAutoplayPrompt, setShowAutoplayPrompt] = useState(true);
  const [isVideoError, setIsVideoError] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    let mounted = true;

    const initVideo = async () => {
      if (!videoElement || !mounted) return;

      try {
        // Reset video state
        videoElement.pause();
        videoElement.currentTime = 0;
        videoElement.muted = true;
        
        // Set attributes
        videoElement.setAttribute('playsinline', '');
        videoElement.setAttribute('preload', 'auto');
        videoElement.setAttribute('loop', '');

        // Set source
        const videoPath = `${process.env.PUBLIC_URL}/videos/GM-Pixel-01.mp4`;
        console.log('Loading video from:', videoPath);
        videoElement.src = videoPath;

        // Wait for metadata to load
        await new Promise((resolve, reject) => {
          videoElement.addEventListener('loadedmetadata', resolve, { once: true });
          videoElement.addEventListener('error', reject, { once: true });
        });

        if (!mounted) return;

        // Try to play
        await videoElement.play();
        console.log('Video playing successfully');
        setIsVideoLoaded(true);
      } catch (error) {
        if (!mounted) return;
        console.error('Video initialization error:', {
          error,
          videoState: {
            readyState: videoElement.readyState,
            networkState: videoElement.networkState,
            error: videoElement.error,
            src: videoElement.src
          }
        });
        setIsVideoError(true);
      }
    };

    initVideo();

    return () => {
      mounted = false;
      if (videoElement) {
        videoElement.pause();
        videoElement.removeAttribute('src');
        videoElement.load();
      }
    };
  }, []);

  const handleLoadedData = () => {
    console.log('Video loaded successfully');
    setIsVideoLoaded(true);
  };

  const handleVideoError = (error) => {
    console.error('Video loading error:', {
      error,
      videoError: videoRef.current?.error
    });
    setIsVideoError(true);
  };

  return (
    <>
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          loop
          muted={isMuted}
          onLoadedData={handleLoadedData}
          onError={handleVideoError}
          preload="auto"
          autoPlay
        >
          <source 
            src={`${process.env.PUBLIC_URL}/videos/GM-Pixel-01.mp4`}
            type="video/mp4"
          />
        </video>

        {/* Loading State */}
        {!isVideoLoaded && !isVideoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-white text-center">
              <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-lg">Loading video...</p>
            </div>
          </div>
        )}
        
        {/* Error State */}
        {isVideoError && (
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center">
            <p className="text-red-500 text-lg">Failed to load video</p>
          </div>
        )}
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20 pointer-events-none" />
      </div>

      {/* Video Controls */}
      {!isVideoError && isVideoLoaded && (
        <button
          onClick={() => {
            if (videoRef.current) {
              const newMutedState = !videoRef.current.muted;
              videoRef.current.muted = newMutedState;
              setIsMuted(newMutedState);
            }
          }}
          className="fixed top-28 right-4 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all z-50 backdrop-blur-sm"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX size={24} className="opacity-75 hover:opacity-100" />
          ) : (
            <Volume2 size={24} className="opacity-75 hover:opacity-100" />
          )}
        </button>
      )}
    </>
  );
};

// Stats Section Component
const StatsSection = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.4 }}
    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-20"
  >
    {[
      { label: "Total NFTs", value: "1,600" },
      { label: "Unique Traits", value: "200+" },
      { label: "Animations", value: "20+" }
    ].map((stat, index) => (
      <div 
        key={index} 
        className="bg-neutral-900/50 backdrop-blur-sm border border-red-900/20 rounded-xl p-6 text-center hover:border-red-500 transition-all duration-300"
      >
        <div className="text-4xl font-bold text-red-500 mb-2">{stat.value}</div>
        <div className="text-gray-300">{stat.label}</div>
      </div>
    ))}
  </motion.div>
);

// Journey Path Component
const JourneyPath = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.6 }}
    className="relative max-w-4xl mx-auto mb-20"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-red-900/0 via-red-900/10 to-red-900/0" />
    <div className="relative py-12">
      <div className="flex justify-between items-center">
        {["Origin", "Training", "Awakening", "Destiny"].map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mb-2" />
            <div className="text-sm text-gray-300">{step}</div>
          </div>
        ))}
      </div>
      <div className="absolute top-[2.25rem] left-0 right-0 h-px bg-gradient-to-r from-red-900/0 via-red-500 to-red-900/0" />
    </div>
  </motion.div>
);

// NFT Collection Stats Component
const CollectionStats = () => (
  <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
    {[
      { label: "Floor Price", value: "2.5 ETH" },
      { label: "Volume Traded", value: "1.2K ETH" },
      { label: "Unique Holders", value: "847" }
    ].map((stat, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-neutral-900/50 backdrop-blur-sm border border-red-900/20 rounded-xl p-6 text-center hover:border-red-500 transition-all duration-300"
      >
        <div className="text-4xl font-bold text-red-500 mb-2">{stat.value}</div>
        <div className="text-gray-300">{stat.label}</div>
      </motion.div>
    ))}
  </div>
);

// Collection Description Component
const CollectionDescription = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mt-24 max-w-4xl mx-auto text-center"
  >
    <p className="text-xl text-gray-400 leading-relaxed">
      Each Bushido NFT is a unique masterpiece, featuring intricate 3D artwork and animations 
      that bring the spirit of the samurai to life. As a holder, you'll have the power to 
      influence the story's direction and potentially see your character featured in our 
      upcoming animated series.
    </p>
  </motion.div>
);

// Community CTA Component
const CommunityCallToAction = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="mt-24 bg-gradient-to-r from-red-900/20 to-black border border-red-900/20 rounded-3xl p-12 text-center max-w-4xl mx-auto"
  >
    <h2 className="text-4xl font-bold text-white mb-6">Join Our Legacy</h2>
    <p className="text-xl text-gray-400 mb-8">
      Become part of a legendary community where ancient wisdom meets digital innovation. 
      Shape the future of storytelling through NFT ownership and collaborative narrative building.
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <button 
        onClick={() => window.open('https://discord.gg/bushido', '_blank')}
        className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-all duration-300"
      >
        Join Discord
      </button>
      <button 
        onClick={() => window.open('https://twitter.com/BushidoNFT', '_blank')}
        className="px-8 py-4 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl transition-all duration-300"
      >
        Follow Twitter
      </button>
    </div>
  </motion.div>
);

      // Main CollectionGrid Component
const CollectionGrid = () => {
  const { isDark } = useTheme();
  const { language } = useLanguage();
  const currentLang = language?.code || 'en';
  const [selectedNFT, setSelectedNFT] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Hero Section with Video Background */}
      <div className="relative bg-black text-white">
        <VideoBackground />
        
        <div className="relative z-10">
          <div className="container mx-auto px-4 py-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto mb-20"
            >
              <div className="inline-block p-2 bg-red-900/20 rounded-lg mb-6">
                <Scroll className="w-8 h-8 text-red-500" />
              </div>
              <h1 className="text-5xl font-bold mb-6">The Samurai Legacy</h1>
              <div className="w-24 h-1 bg-red-500 mx-auto mb-8" />
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                To reclaim serenity from despair, we unite with celestial gifts, forging a legacy 
                of honor, justice, and unwavering spirit against tyranny's dark tide.
              </p>
              <p className="text-xl text-gray-300 leading-relaxed">
                In the aftermath of devastation, we, the survivors of a once-peaceful village, 
                rise from smoldering ruins united by grief and bound by an ember of vengeance. 
                Our journey, steeped in mist-wreathed mountains and tempered by ancient samurai masters, 
                transforms us into avatars of divine retribution.
              </p>
            </motion.div>

            <StatsSection />
            <JourneyPath />
          </div>
        </div>
      </div>

      {/* Collection Grid Section */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Explore the Collection
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enhancedImages.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-neutral-900 rounded-lg overflow-hidden shadow-lg border border-red-900/20"
            >
              <img
                src={image.src}
                alt={image.alt[currentLang]}
                className="w-full h-72 object-contain bg-black"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-red-500 mb-4">
                  {image.alt[currentLang]}
                </h2>
                <p className="text-gray-400 mb-6">
                  A unique piece of the Bushido collection, embodying the spirit of the Samurai.
                </p>
                <button 
                  onClick={() => setSelectedNFT(image)}
                  className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg shadow-md transition-all duration-300 w-full"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Sections */}
        <CollectionStats />
        <CollectionDescription />
        <CommunityCallToAction />

        {/* NFT Details Modal */}
        <NFTDetailsModal
          isOpen={selectedNFT !== null}
          onClose={() => setSelectedNFT(null)}
          nft={selectedNFT}
          isDark={isDark}
          currentLang={currentLang}
        />

        {/* Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/5 via-black/0 to-black/0" />
        </div>
      </div>
    </div>
  );
};

export default CollectionGrid;