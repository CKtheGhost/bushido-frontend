import React, { useState } from 'react';
import Card from './Card'; 
import { Play, Vote, Calendar, Clock, Users, ChevronRight, ThumbsUp } from 'lucide-react';

const AnimatedSeries = () => {
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const episodes = [
    {
      id: 1,
      title: "Through the Veil of Time",
      thumbnail: "/api/placeholder/640/360",
      status: "Released",
      duration: "24:15",
      votes: 15234,
      airDate: "March 15, 2024",
      description: "The protagonist activates the artifact and is transported to 16th-century Japan, where he disrupts a battle between samurai and is captured by the Courage Clan."
    },
    {
      id: 2,
      title: "The Virtue of Loyalty",
      thumbnail: "/api/placeholder/640/360",
      status: "Voting",
      votingEnds: "3 days",
      votes: 8756,
      description: "The community is currently voting on key plot decisions that will shape the protagonist's journey with the Loyalty Clan."
    },
    {
      id: 3,
      title: "Shadows of Betrayal",
      thumbnail: "/api/placeholder/640/360",
      status: "In Production",
      progress: "65%",
      description: "Following the community votes, this episode explores the Compassion Clan's village under attack and the protagonist's moral choices."
    }
  ];

  const upcomingVotes = [
    {
      title: "Antagonist's True Identity",
      endDate: "2 days",
      votes: 5423
    },
    {
      title: "Clan Alliance Decision",
      endDate: "5 days",
      votes: 3876
    },
    {
      title: "Next Episode Focus",
      endDate: "1 week",
      votes: 6234
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block p-2 bg-red-900/20 rounded-lg mb-6">
              <Play className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-6xl font-bold mb-6">Animated Series</h1>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8" />
            <p className="text-xl text-gray-400 leading-relaxed">
              Watch your NFTs and community decisions come to life in our groundbreaking
              animated series. Every episode is shaped by holder votes, creating a truly
              unique collaborative storytelling experience.
            </p>
          </div>
        </div>
      </section>

      {/* Episodes Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">Episodes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {episodes.map((episode) => (
              <Card 
                key={episode.id}
                className="bg-neutral-900/50 border-red-900/20 overflow-hidden hover:border-red-500 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedEpisode(episode)}
              >
                <img 
                  src={episode.thumbnail} 
                  alt={episode.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">{episode.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      episode.status === 'Released' ? 'bg-green-900/20 text-green-500' :
                      episode.status === 'Voting' ? 'bg-blue-900/20 text-blue-500' :
                      'bg-yellow-900/20 text-yellow-500'
                    }`}>
                      {episode.status}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">{episode.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    {episode.duration && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {episode.duration}
                      </div>
                    )}
                    {episode.votes && (
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {episode.votes.toLocaleString()} votes
                      </div>
                    )}
                    {episode.votingEnds && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {episode.votingEnds} left
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Active Votes Section */}
      <section className="py-16 bg-neutral-900/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">Active Votes</h2>
            <button className="text-red-500 flex items-center gap-2 hover:text-red-400 transition-colors">
              View All <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingVotes.map((vote, index) => (
              <Card key={index} className="bg-neutral-900/50 border-red-900/20 p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold">{vote.title}</h3>
                  <Vote className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Ends in {vote.endDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    {vote.votes.toLocaleString()} votes
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnimatedSeries;