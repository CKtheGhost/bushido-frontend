import React from 'react';
import { X } from 'lucide-react';

const NFTDetailsModal = ({ isOpen, onClose, nft, isDark, currentLang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative w-full max-w-2xl ${
        isDark ? 'bg-neutral-900' : 'bg-white'
      } rounded-xl shadow-2xl overflow-hidden`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="w-full md:w-1/2 p-6">
            <img
              src={nft.src}
              alt={nft.alt[currentLang]}
              className="w-full h-72 object-contain bg-black rounded-lg"
            />
          </div>

          {/* Details */}
          <div className="w-full md:w-1/2 p-6">
            <h2 className={`text-2xl font-bold ${
              isDark ? 'text-red-500' : 'text-red-600'
            } mb-4`}>
              {nft.alt[currentLang]}
            </h2>

            <div className="space-y-6">
              {/* Traits */}
              <div>
                <h3 className={`text-lg font-semibold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Traits
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {nft.traits.map((trait, index) => (
                    <div 
                      key={index}
                      className={`px-3 py-2 rounded-lg ${
                        isDark 
                          ? 'bg-red-900/20 text-red-500' 
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      <div className="text-sm font-medium">{trait.type}</div>
                      <div className="text-xs opacity-75">{trait.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div>
                <h3 className={`text-lg font-semibold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Biography
                </h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  {nft.bio[currentLang]}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Rarity Rank</div>
                  <div className={`text-lg font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    #{nft.rarityRank} / 10,000
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Token ID</div>
                  <div className={`text-lg font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    #{nft.id}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDetailsModal;