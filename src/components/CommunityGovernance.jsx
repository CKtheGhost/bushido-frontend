import React from 'react';
import Card from './Card';
import { ArrowRight, Users, Vote, Coins, Crown, ShieldCheck } from 'lucide-react';

const CommunityGovernance = () => {
  const governanceStats = [
    {
      title: "1 NFT",
      votes: "1 Vote",
      tokens: "100 $HONOR/day"
    },
    {
      title: "3 NFTs",
      votes: "4 Votes",
      tokens: "350 $HONOR/day"
    },
    {
      title: "5 NFTs",
      votes: "7 Votes",
      tokens: "650 $HONOR/day"
    },
    {
      title: "10+ NFTs",
      votes: "15 Votes",
      tokens: "1500 $HONOR/day"
    }
  ];

  const featureCards = [
    {
      icon: <Vote className="w-8 h-8 text-red-500" />,
      title: "Voting Power",
      description: "Each NFT grants voting power, with bonuses for holding multiple NFTs. Shape character decisions, story arcs, and future developments."
    },
    {
      icon: <Coins className="w-8 h-8 text-red-500" />,
      title: "Token Rewards",
      description: "Earn $HONOR tokens daily based on your NFT holdings. Tokens can be used for exclusive content, merchandise, and additional voting power."
    },
    {
      icon: <Crown className="w-8 h-8 text-red-500" />,
      title: "Storyline Control",
      description: "Participate in regular voting events to determine character choices, plot twists, and major story developments in our animated series."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-red-500" />,
      title: "Governance Rights",
      description: "Join the council of holders to propose and vote on community initiatives, partnerships, and project direction."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block p-2 bg-red-900/20 rounded-lg mb-6">
              <Users className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-6xl font-bold mb-6">Community Governance</h1>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8" />
            <p className="text-xl text-gray-400 leading-relaxed">
              Shape the future of Bushido through our democratic governance system. 
              Your voice matters in our community, and your influence grows with your commitment.
            </p>
          </div>
        </div>
      </section>

      {/* Governance Tiers */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Governance Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {governanceStats.map((tier, index) => (
              <Card key={index} className="bg-neutral-900/50 border-red-900/20 p-8 hover:border-red-500 transition-all duration-300">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4 text-white">{tier.title}</h3>
                  <div className="w-12 h-1 bg-red-500 mx-auto mb-6" />
                  <p className="text-xl text-red-400 mb-2">{tier.votes}</p>
                  <p className="text-lg text-gray-400">{tier.tokens}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featureCards.map((feature, index) => (
              <Card key={index} className="bg-neutral-900/50 border-red-900/20 p-8 hover:border-red-500 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-red-900/20 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-gray-400 text-lg leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-red-900/20 to-black border-red-900/20 p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Begin your journey as a Bushido governance member. Collect NFTs, earn tokens, 
              and help shape the future of our shared narrative.
            </p>
            <button 
              onClick={() => window.location.href = '/collection'}
              className="bg-red-700 hover:bg-red-600 text-white px-8 py-4 rounded-xl flex items-center gap-2 mx-auto transition-all duration-300"
            >
              Explore Collection
              <ArrowRight className="w-5 h-5" />
            </button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default CommunityGovernance;