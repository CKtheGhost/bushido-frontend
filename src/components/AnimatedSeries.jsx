import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, Vote, Calendar, Clock, Users, ChevronRight, Crown, 
  Heart, Star, AlertCircle, Scroll, GitBranch, ChevronDown 
} from 'lucide-react';
import Card from './Card';
import { useWeb3 } from '../contexts/Web3Context';

// Updated FallingPetals component using a real cherry blossom petal image
const FallingPetals = () => {
  const petals = Array.from({ length: 20 });
  return (
    <>
      {petals.map((_, index) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 10 + Math.random() * 5;
        const size = 20 + Math.random() * 20; // Random size between 20px and 40px
        return (
          <motion.img 
            key={index}
            src="/images/cherry-blossom-petal.png"
            alt="Cherry Blossom Petal"
            className="absolute opacity-70"
            style={{ top: -50, left: `${left}%`, width: size, height: 'auto' }}
            animate={{ y: "110vh", rotate: 360 }}
            transition={{ 
              repeat: Infinity, 
              duration: duration, 
              delay: delay, 
              ease: "linear" 
            }}
          />
        );
      })}
    </>
  );
};

// IntenseSamuraiOverlay: a pulsating samurai crest overlay at bottom right
const IntenseSamuraiOverlay = () => (
  <motion.img
    src="/images/samurai-crest.png"
    alt="Samurai Crest"
    className="absolute bottom-10 right-10 w-48 opacity-70 pointer-events-none"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: [0.8, 1.05, 0.8], opacity: [0, 0.8, 0] }}
    transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
  />
);

// VotingPowerDisplay component with refined styling
const VotingPowerDisplay = ({ votingPower }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-neutral-900/50 rounded-xl p-6 border border-red-900/20 mb-8 shadow-lg"
  >
    <div className="flex items-center gap-3 mb-4">
      <Crown className="w-6 h-6 text-red-500" />
      <h3 className="text-xl font-bold text-white">Your Voting Power</h3>
    </div>
    <div className="grid grid-cols-2 gap-4 text-center">
      <div className="p-4 bg-neutral-800 rounded-lg">
        <div className="text-2xl font-bold text-red-500">{votingPower}</div>
        <div className="text-sm text-gray-400">Available Votes</div>
      </div>
      <div className="p-4 bg-neutral-800 rounded-lg">
        <div className="text-2xl font-bold text-green-500">
          {votingPower > 0 ? 'Active' : 'Inactive'}
        </div>
        <div className="text-sm text-gray-400">Voting Status</div>
      </div>
    </div>
  </motion.div>
);

// TimelineEvent component with subtle hover scaling
const TimelineEvent = ({ event, isActive, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileHover={{ scale: 1.02 }}
    animate={{ opacity: 1, y: 0 }}
    className={`p-6 rounded-xl border transition-all cursor-pointer shadow-md ${
      isActive 
        ? 'bg-red-900/30 border-red-500' 
        : 'bg-neutral-900/50 border-red-900/20 hover:border-red-500'
    }`}
    onClick={() => onClick(event.id)}
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
        <p className="text-gray-400">{event.description}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm ${
        event.type === 'decision' ? 'bg-blue-900/20 text-blue-500' :
        event.type === 'episode' ? 'bg-green-900/20 text-green-500' :
        'bg-yellow-900/20 text-yellow-500'
      }`}>
        {event.type}
      </span>
    </div>
    
    {event.communityChoice && (
      <div className="mt-4 p-4 bg-neutral-800 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-red-500">Community Decision</span>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Users className="w-4 h-4" />
            <span>{event.communityChoice.votes.toLocaleString()} votes</span>
          </div>
        </div>
        <div className="font-bold text-white">{event.communityChoice.choice}</div>
      </div>
    )}

    <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
      <div className="flex items-center gap-1">
        <Calendar className="w-4 h-4" />
        {event.date}
      </div>
      {event.branchCount && (
        <div className="flex items-center gap-1">
          <GitBranch className="w-4 h-4" />
          {event.branchCount} branches
        </div>
      )}
    </div>
  </motion.div>
);

const AnimatedSeries = () => {
  // Web3 and state variables
  const { account, votingPower, userNFTs } = useWeb3();
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [userVotes, setUserVotes] = useState({});
  const [remainingVotes, setRemainingVotes] = useState(votingPower || 0);

  // Timeline state
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [expandedSeason, setExpandedSeason] = useState(1);

  // Episodes array remains unchanged
  const episodes = [
    {
      id: 1,
      title: "Origins of Power",
      thumbnail: "/images/collection/685.jpg",
      status: "Released",
      duration: "24:15",
      votes: 15234,
      airDate: "March 15, 2024",
      description: "The first warriors discover ancient artifacts that grant them extraordinary abilities. The community will vote on which clan receives the most powerful relic.",
      votingDeadline: "2 days",
      communityChoices: [
        { id: 1, text: "The Dragon Clan", votes: 5234 },
        { id: 2, text: "The Phoenix Clan", votes: 4891 },
        { id: 3, text: "The Shadow Clan", votes: 5109 }
      ]
    },
    {
      id: 2,
      title: "Path of the Warrior",
      thumbnail: "/images/collection/78.jpg",
      status: "Voting",
      votingEnds: "3 days",
      votes: 8756,
      description: "As tensions rise between clans, warriors must choose their allegiances. Your vote will determine the protagonist's journey.",
      votingDeadline: "3 days",
      communityChoices: [
        { id: 1, text: "Join the rebels", votes: 3234 },
        { id: 2, text: "Remain loyal", votes: 2891 },
        { id: 3, text: "Form a new alliance", votes: 2631 }
      ]
    },
    {
      id: 3,
      title: "Honor's Price",
      thumbnail: "/images/collection/188.jpg",
      status: "In Production",
      progress: "65%",
      description: "The consequences of the community's previous choices unfold as the chosen clan faces an unprecedented challenge.",
      estimatedRelease: "April 2024"
    }
  ];

  // Upcoming votes array remains unchanged
  const upcomingVotes = [
    {
      title: "Next Episode Focus",
      description: "Choose which storyline to explore in Episode 4",
      endDate: "5 days",
      choices: [
        { id: 1, text: "The Ancient Prophecy", votes: 3423 },
        { id: 2, text: "The Hidden Village", votes: 2876 },
        { id: 3, text: "The Forbidden Technique", votes: 3234 }
      ]
    },
    {
      title: "Character Development",
      description: "Select a character's crucial decision",
      endDate: "3 days",
      choices: [
        { id: 1, text: "Accept the dark power", votes: 2423 },
        { id: 2, text: "Seek ancient wisdom", votes: 2876 },
        { id: 3, text: "Forge a new path", votes: 2534 }
      ]
    }
  ];

  // Timeline data remains unchanged
  const timelineData = {
    1: [
      {
        id: 1,
        title: "The Discovery",
        type: "episode",
        date: "Jan 15, 2024",
        description: "Ancient artifacts are discovered, leading to the awakening of dormant powers.",
        branchCount: 3
      },
      {
        id: 2,
        title: "First Guardian",
        type: "decision",
        date: "Jan 30, 2024",
        description: "The community chose which clan would receive the first guardian artifact.",
        communityChoice: {
          choice: "The Dragon Clan becomes the first guardian",
          votes: 15234
        }
      },
      {
        id: 3,
        title: "Rising Tensions",
        type: "episode",
        date: "Feb 15, 2024",
        description: "The balance of power shifts as other clans react to the Dragon Clan's newfound strength.",
        branchCount: 3
      }
    ],
    2: [
      {
        id: 4,
        title: "Alliance Formation",
        type: "decision",
        date: "Mar 1, 2024",
        description: "Community decides on crucial alliances between clans.",
        communityChoice: {
          choice: "Phoenix and Shadow clans form an unexpected alliance",
          votes: 12543
        }
      },
      {
        id: 5,
        title: "The Great Trial",
        type: "upcoming",
        date: "Mar 15, 2024",
        description: "A challenge that will test the resolve of all clans approaches.",
        branchCount: 4
      }
    ]
  };

  // handleVote function remains unchanged
  const handleVote = (episodeId, choiceId) => {
    if (!account || remainingVotes <= 0) return;
    
    setUserVotes(prev => ({
      ...prev,
      [episodeId]: choiceId
    }));
    setRemainingVotes(prev => prev - 1);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white overflow-hidden">
      {/* Cinematic Hero Section */}
      <section className="relative h-screen" id="hero">
        {/* Full-screen background video */}
        <video autoPlay loop muted className="absolute inset-0 object-cover w-full h-full">
          <source src="/videos/animatedSeriesHeader.mp4" type="video/mp4" />
          {/* Replace with your cinematic samurai background video */}
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="container mx-auto px-4 relative z-10 flex items-center justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block p-2 bg-red-900/20 rounded-lg mb-6">
              <Play className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-6xl font-bold mb-4">Samurai Chronicles</h1>
            <p className="text-2xl text-gray-300 mb-6">武士道 - The Way of the Warrior</p>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8" />
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Experience an immersive, cinematic journey where ancient honor meets modern excellence.
              Step into a world of legendary warriors, epic battles, and mystical traditions.
            </p>
          </motion.div>
        </div>
        {/* Falling sakura petals overlay */}
        <FallingPetals />
      </section>

      {/* Voting Power Display */}
      {account && (
        <div className="container mx-auto px-4 relative z-10">
          <VotingPowerDisplay votingPower={remainingVotes} />
        </div>
      )}

      {/* Episodes Grid */}
      <section className="py-16" id="episodes">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold mb-12">Episodes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {episodes.map((episode) => (
              <motion.div
                key={episode.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-neutral-900/50 rounded-xl overflow-hidden border border-red-900/20 hover:border-red-500 transition-all duration-300 shadow-lg transform hover:scale-105"
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
                  
                  {/* Episode Metadata */}
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
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

                  {/* Voting Section */}
                  {episode.communityChoices && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-red-500">Community Vote</span>
                        <span className="text-gray-400">Ends in {episode.votingDeadline}</span>
                      </div>

                      {!account && (
                        <div className="flex items-center gap-2 text-yellow-500 mb-4">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-sm">Connect wallet to participate in voting</span>
                        </div>
                      )}

                      {episode.communityChoices.map((choice) => (
                        <button
                          key={choice.id}
                          onClick={() => handleVote(episode.id, choice.id)}
                          disabled={!account || remainingVotes <= 0}
                          className={`w-full p-3 rounded-lg text-left transition-all ${
                            userVotes[episode.id] === choice.id
                              ? 'bg-red-900/30 border border-red-500'
                              : account && remainingVotes > 0
                              ? 'bg-neutral-800 hover:bg-neutral-700 border border-transparent'
                              : 'bg-neutral-800/50 border border-transparent opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <span>{choice.text}</span>
                              {!account && (
                                <div className="text-sm text-red-500 mt-1">Connect wallet to vote</div>
                              )}
                            </div>
                            <div className="flex items-center gap-4">
                              {account && remainingVotes > 0 && !userVotes[episode.id] && (
                                <span className="text-sm text-gray-400">
                                  Cost: 1 vote ({remainingVotes} remaining)
                                </span>
                              )}
                              <div className="flex items-center gap-2">
                                <Heart className="w-4 h-4" />
                                <span>{choice.votes.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Votes Section */}
      <section className="py-16 bg-neutral-900/30" id="decisions">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">Upcoming Decisions</h2>
            <button className="text-red-500 flex items-center gap-2 hover:text-red-400 transition-colors">
              View All <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingVotes.map((vote, index) => (
              <Card key={index} className="bg-neutral-900/50 border-red-900/20 p-6 shadow-md">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{vote.title}</h3>
                    <p className="text-gray-400">{vote.description}</p>
                  </div>
                  <Vote className="w-6 h-6 text-red-500" />
                </div>
                <div className="space-y-3 mt-6">
                  {vote.choices.map((choice) => (
                    <div key={choice.id} className="flex justify-between items-center text-sm text-gray-400">
                      <span>{choice.text}</span>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        <span>{choice.votes.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center text-sm">
                  <span className="text-gray-400">Voting starts in {vote.endDate}</span>
                  <div className="flex items-center gap-1 text-red-500">
                    <Crown className="w-4 h-4" />
                    <span>{account ? `${remainingVotes} votes available` : 'Connect wallet'}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Timeline Section */}
      <section className="py-16 bg-neutral-900/30" id="timeline">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block p-2 bg-red-900/20 rounded-lg mb-6">
              <Scroll className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-4xl font-bold mb-6">Story Timeline</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Explore the journey shaped by our community. Each decision point represents 
              a moment where NFT holders influenced the story's direction.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {Object.entries(timelineData).map(([season, events]) => (
              <div key={season} className="border border-red-900/20 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedSeason(expandedSeason === Number(season) ? null : Number(season))}
                  className="w-full p-6 bg-neutral-900/50 flex justify-between items-center hover:bg-neutral-900/70 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Star className="w-6 h-6 text-red-500" />
                    <h2 className="text-2xl font-bold">Season {season}</h2>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 transition-transform ${
                      expandedSeason === Number(season) ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedSeason === Number(season) && (
                  <div className="p-6 space-y-6">
                    {events.map((event) => (
                      <TimelineEvent
                        key={event.id}
                        event={event}
                        isActive={selectedEvent === event.id}
                        onClick={setSelectedEvent}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Timeline Legend */}
          <div className="max-w-4xl mx-auto mt-8 p-6 bg-neutral-900/50 rounded-xl shadow-md">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-gray-400">Episode Released</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm text-gray-400">Community Decision</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-sm text-gray-400">Upcoming Event</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intense Samurai Crest Overlay */}
      <IntenseSamuraiOverlay />
    </div>
  );
};

export default AnimatedSeries;

