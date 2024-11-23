import React from 'react';

const BushidoVirtue = ({ title, description, icon }) => (
  <div className="bg-neutral-900 border border-red-900/20 p-8 rounded-2xl hover:border-red-500 transition-all duration-300">
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center text-red-500 mr-4">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white">{title}</h3>
    </div>
    <p className="text-gray-400">{description}</p>
  </div>
);

const SamuraiLegacy = () => {
  const virtues = [
    {
      title: "Righteousness (義, Gi)",
      description: "The power to make decisions based on what is right and just, without hesitation.",
      icon: "義"
    },
    {
      title: "Courage (勇, Yū)",
      description: "The strength to face and overcome any adversity with bravery and fearlessness.",
      icon: "勇"
    },
    {
      title: "Benevolence (仁, Jin)",
      description: "The compassion to help others and show mercy, even to one's enemies.",
      icon: "仁"
    },
    {
      title: "Respect (礼, Rei)",
      description: "The courtesy and etiquette that governs all interactions with others.",
      icon: "礼"
    },
    {
      title: "Sincerity (誠, Makoto)",
      description: "The honesty and truthfulness in word and deed, without deception.",
      icon: "誠"
    },
    {
      title: "Honor (名誉, Meiyo)",
      description: "The dignity and worth of living by the highest moral principles.",
      icon: "名"
    },
    {
      title: "Loyalty (忠義, Chūgi)",
      description: "The devotion and dedication to one's principles and those worthy of service.",
      icon: "忠"
    },
    {
      title: "Self-Control (自制, Jisei)",
      description: "The discipline to remain centered and focused in the face of temptation.",
      icon: "制"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-black/70 backdrop-blur-sm border-b border-red-900/20">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-4xl font-extrabold tracking-wider text-red-500">BUSHIDO</h1>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-6">The Way of the Warrior</h1>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8" />
            <p className="text-xl text-gray-400 leading-relaxed">
              Bushido, "the way of the warrior," is a moral code that emerged in Japan's samurai military class. 
              It emphasized loyalty, honor, courage, and self-discipline. Today, these virtues continue to inspire 
              and guide those who seek to live with purpose and integrity.
            </p>
          </div>
        </div>
      </section>

      {/* Virtues Grid */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">The Eight Virtues of Bushido</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {virtues.map((virtue, index) => (
              <BushidoVirtue key={index} {...virtue} />
            ))}
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-24 bg-neutral-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8">Modern Legacy</h2>
            <div className="w-16 h-1 bg-red-500 mb-8" />
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              The principles of Bushido continue to resonate in modern society, influencing business ethics, 
              personal development, and leadership philosophy. Our NFT collection draws inspiration from these 
              timeless values, creating a bridge between ancient wisdom and contemporary digital art.
            </p>
            <button 
              onClick={() => window.location.href = '/collection'}
              className="bg-red-700 hover:bg-red-600 text-white px-8 py-4 rounded-xl transition-all duration-300"
            >
              Explore Collection
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SamuraiLegacy;