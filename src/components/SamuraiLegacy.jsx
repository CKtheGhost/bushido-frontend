// Part 1: Imports and Component Setup
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scroll, 
  Swords, 
  Shield, 
  Heart, 
  Users, 
  Star, 
  Crown, 
  UserCheck,
  Brain,
  ChevronRight,
  Play,
  Quote,
  X,
  Check,
  Lightbulb,
  RotateCw,
  Book,
  Volume2,
  VolumeX
} from 'lucide-react';

// Part 2: Virtue Card Component
const BushidoVirtue = ({ title, description, icon: Icon, kanji, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="backdrop-blur-sm bg-neutral-900/80 border border-red-900/20 p-8 rounded-2xl hover:border-red-500 transition-all duration-300 relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 p-4 text-6xl font-bold text-red-500/10 transition-all duration-300 group-hover:text-red-500/20">
      {kanji}
    </div>
    
    <div className="flex items-center mb-6 relative">
      <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center text-red-500 mr-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-2xl font-bold text-white">{title}</h3>
    </div>
    
    <p className="text-gray-300 text-lg leading-relaxed relative z-10">{description}</p>
    
    <motion.div 
      className="absolute inset-0 bg-red-500/5"
      whileHover={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    />
  </motion.div>
);

// Part 3: Timeline Event Component
const TimelineEvent = ({ year, title, description, index }) => (
  <motion.div 
    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="flex items-start gap-4"
  >
    <div className="flex-shrink-0 w-24 text-red-500 font-bold">{year}</div>
    <div>
      <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
      <p className="text-gray-400">{description}</p>
    </div>
  </motion.div>
);

// Part 4: Interactive Quote Component
const InteractiveQuote = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const quotes = [
    {
      text: "The way of the Samurai is found in death.",
      author: "Yamamoto Tsunetomo",
      translation: "武士道は死ぬことにある"
    },
    {
      text: "Bushido is realized in the presence of death.",
      author: "Inazo Nitobe",
      translation: "武士道は死の存在において実現される"
    },
    {
      text: "The sword is the soul of the samurai.",
      author: "Ancient Proverb",
      translation: "刀は侍の魂である"
    }
  ];

  return (
    <motion.div 
      className="bg-neutral-900/50 p-8 rounded-2xl border border-red-900/20"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center"
        >
          <Quote className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <p className="text-2xl text-white mb-4">{quotes[currentIndex].text}</p>
          <p className="text-lg text-red-500 mb-2">{quotes[currentIndex].translation}</p>
          <p className="text-gray-400">- {quotes[currentIndex].author}</p>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center mt-6 gap-2">
        {quotes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-red-500' : 'bg-gray-600 hover:bg-red-500/50'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Part 5: Knowledge Test Component
const KnowledgeTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = [
    {
      question: "Which virtue represents 'Righteousness' in Bushido?",
      answers: ["Jin", "Gi", "Rei", "Yu"],
      correct: 1
    },
    {
      question: "What does '武士道' (Bushido) literally translate to?",
      answers: ["Way of the Warrior", "Code of Honor", "Path of the Sword", "Military Arts"],
      correct: 0
    },
    {
      question: "Which period saw the formal codification of Bushido principles?",
      answers: ["Heian", "Kamakura", "Edo", "Meiji"],
      correct: 2
    }
  ];

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setTimeout(() => {
      if (answerIndex === questions[currentQuestion].correct) {
        setScore(score + 1);
      }
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  return (
    <div className="bg-neutral-900/50 p-8 rounded-2xl border border-red-900/20">
      <div className="flex items-center gap-3 mb-6">
        <Book className="w-6 h-6 text-red-500" />
        <h3 className="text-2xl font-bold text-white">Test Your Knowledge</h3>
      </div>

      {!showResult ? (
        <>
          <div className="mb-8">
            <div className="flex justify-between text-gray-400 mb-2">
              <span>Question {currentQuestion + 1}/{questions.length}</span>
              <span>Score: {score}</span>
            </div>
            <p className="text-xl text-white mb-6">{questions[currentQuestion].question}</p>
            <div className="grid grid-cols-1 gap-4">
              {questions[currentQuestion].answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`p-4 rounded-lg text-left transition-all ${
                    selectedAnswer === null 
                      ? 'bg-neutral-800 hover:bg-neutral-700 text-white'
                      : selectedAnswer === index
                        ? index === questions[currentQuestion].correct
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-red-500/20 text-red-500'
                        : index === questions[currentQuestion].correct
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-neutral-800 text-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {selectedAnswer !== null && (
                      index === questions[currentQuestion].correct ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : selectedAnswer === index ? (
                        <X className="w-5 h-5 text-red-500" />
                      ) : null
                    )}
                    {answer}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">
          <div className="text-6xl font-bold mb-4 text-white">{Math.round((score / questions.length) * 100)}%</div>
          <p className="text-xl text-gray-400 mb-6">
            You got {score} out of {questions.length} questions correct!
          </p>
          <button
            onClick={resetQuiz}
            className="bg-red-700 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto"
          >
            <RotateCw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

// Part 6: Main Component State and Data
const SamuraiLegacy = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const handleLoadedData = () => {
    setIsVideoLoaded(true);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const virtues = [
    {
      title: "Righteousness (義, Gi)",
      description: "The power to make decisions based on what is right and just, without hesitation.",
      icon: Shield,
      kanji: "義"
    },
    {
      title: "Courage (勇, Yū)",
      description: "The strength to face and overcome any adversity with bravery and fearlessness.",
      icon: Swords,
      kanji: "勇"
    },
    {
      title: "Benevolence (仁, Jin)",
      description: "The compassion to help others and show mercy, even to one's enemies.",
      icon: Heart,
      kanji: "仁"
    },
    {
      title: "Respect (礼, Rei)",
      description: "The courtesy and etiquette that governs all interactions with others.",
      icon: Users,
      kanji: "礼"
    },
    {
      title: "Sincerity (誠, Makoto)",
      description: "The honesty and truthfulness in word and deed, without deception.",
      icon: Star,
      kanji: "誠"
    },
    {
      title: "Honor (名誉, Meiyo)",
      description: "The dignity and worth of living by the highest moral principles.",
      icon: Crown,
      kanji: "名"
    },
    {
      title: "Loyalty (忠義, Chūgi)",
      description: "The devotion and dedication to one's principles and those worthy of service.",
      icon: UserCheck,
      kanji: "忠"
    },
    {
      title: "Self-Control (自制, Jisei)",
      description: "The discipline to remain centered and focused in the face of temptation.",
      icon: Brain,
      kanji: "制"
    }
  ];

  const timeline = [
    {
      year: "1100s",
      title: "Rise of the Samurai",
      description: "The warrior class emerges as a distinct social group in Japan."
    },
    {
      year: "1200s",
      title: "Code Formation",
      description: "Early principles of Bushido begin to take shape among warrior houses."
    },
    {
      year: "1600s",
      title: "Codification",
      description: "Bushido principles are formally documented and taught in peacetime."
    },
    {
      year: "1900s",
      title: "Modern Integration",
      description: "Bushido values influence modern Japanese society and business culture."
    },
    {
      year: "Present",
      title: "Digital Renaissance",
      description: "Bushido principles find new expression in digital art and community."
    }
  ];

 // Part 7: JSX Structure and Render Logic
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      {/* Combined Video Background Section */}
      <div className="relative">
        {/* Video Background - Wraps hero and virtues sections */}
        <div className="fixed inset-0 z-0">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            autoPlay
            loop
            muted={isMuted}
            onLoadedData={handleLoadedData}
          >
            <source src="/videos/Weapons (1).mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/75 to-black" />
        </div>

        {/* Loading State */}
        {!isVideoLoaded && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="text-white text-center">
              <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-lg">Loading experience...</p>
            </div>
          </div>
        )}

        {/* Video Controls */}
        <button
          onClick={toggleMute}
          className="fixed bottom-4 right-4 z-50 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>

        {/* Hero Section */}
        <section className="relative py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black/50 to-black/50 z-10" />
          <div className="absolute inset-0 z-10">
            <div className="absolute inset-0 opacity-5">
              <div 
                className="h-full w-full bg-[linear-gradient(45deg,currentColor_1px,transparent_1px),linear-gradient(-45deg,currentColor_1px,transparent_1px)]" 
                style={{ backgroundSize: '30px 30px' }} 
              />
            </div>
          </div>
          
          <div className="container mx-auto px-4 relative z-20">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-7xl font-bold mb-6">武士道</h1>
                <h2 className="text-4xl font-bold mb-6">The Way of the Warrior</h2>
                <div className="w-24 h-1 bg-red-500 mx-auto mb-8" />
                <p className="text-xl text-gray-300 leading-relaxed">
                  Discover the ancient code of the samurai, where honor meets destiny. 
                  Through our NFT collection, we breathe new life into these timeless principles, 
                  creating digital artifacts that embody the spirit of Bushido.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Virtues Grid */}
        <section className="relative py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />
          <div className="container mx-auto px-4 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold">The Eight Virtues of Bushido</h2>
              <div className="w-24 h-1 bg-red-500 mx-auto mt-6" />
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {virtues.map((virtue, index) => (
                <BushidoVirtue key={index} {...virtue} index={index} />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Timeline Section - Marks end of video background */}
      <div className="relative bg-black">
        <section className="py-24 bg-neutral-900/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="p-3 bg-red-900/20 rounded-lg">
                  <Scroll className="w-6 h-6 text-red-500" />
                </div>
                <h2 className="text-4xl font-bold">Historical Timeline</h2>
              </div>
              
              <div className="space-y-12">
                {timeline.map((event, index) => (
                  <TimelineEvent key={index} {...event} index={index} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Interactive Learning Section */}
        <section className="py-24 bg-neutral-900/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="p-3 bg-red-900/20 rounded-lg">
                  <Lightbulb className="w-6 h-6 text-red-500" />
                </div>
                <h2 className="text-4xl font-bold">Interactive Learning</h2>
              </div>

              <div className="grid grid-cols-1 gap-8">
                <InteractiveQuote />
                <KnowledgeTest />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-red-900/20 to-black border border-red-900/20 rounded-3xl p-12 text-center max-w-4xl mx-auto"
            >
              <h2 className="text-4xl font-bold mb-6">Begin Your Journey</h2>
              <p className="text-xl text-gray-400 mb-8">
                Join our community and become part of a new generation of digital warriors, 
                where ancient wisdom meets blockchain innovation.
              </p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => window.location.href = '/collection'}
                  className="bg-red-700 hover:bg-red-600 text-white px-8 py-4 rounded-xl flex items-center gap-2 transition-all duration-300"
                >
                  Explore Collection
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => window.location.href = '/animated-series'}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white px-8 py-4 rounded-xl flex items-center gap-2 transition-all duration-300"
                >
                  Watch Series
                  <Play className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SamuraiLegacy;