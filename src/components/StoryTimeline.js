import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scroll, GitBranch, Users, Calendar, Star, ChevronRight, ChevronDown } from 'lucide-react';

const TimelineEvent = ({ event, isActive, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`p-6 rounded-xl border transition-all cursor-pointer ${
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

const StoryTimeline = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [expandedSeason, setExpandedSeason] = useState(1);

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
        },
        branchCount: 2
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-2 bg-red-900/20 rounded-lg mb-6">
            <Scroll className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold mb-6">Story Timeline</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore the journey shaped by our community. Each decision point represents 
            a moment where NFT holders influenced the story's direction.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto space-y-8">
          {Object.entries(timelineData).map(([season, events]) => (
            <div key={season} className="border border-red-900/20 rounded-xl overflow-hidden">
              {/* Season Header */}
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

              {/* Season Events */}
              {expandedSeason === Number(season) && (
                <div className="p-6 space-y-6">
                  {events.map((event, index) => (
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

        {/* Legend */}
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-neutral-900/50 rounded-xl">
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
    </div>
  );
};

export default StoryTimeline;