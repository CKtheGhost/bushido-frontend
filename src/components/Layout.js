import React, { useState, useEffect } from 'react';
import NavigationMenu from './NavigationMenu';
import { Wallet, Twitter, MessageCircle, Send, Loader2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useWeb3 } from '../contexts/Web3Context';

const SocialButton = ({ icon: Icon, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 bg-red-700/20 hover:bg-red-700/40 rounded-lg transition-all duration-300 text-red-500 hover:text-red-400 hover:scale-110"
    aria-label={label}
  >
    <Icon size={24} />
  </a>
);

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="relative z-10 bg-black py-16 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-white">
          <div>
            <h3 className="text-3xl font-bold mb-6 text-red-500">{t('title')}</h3>
            <div className="w-10 h-1 bg-red-500 mb-6" />
            <p className="text-gray-400 text-lg">{t('footer.slogan')}</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li><a href="/collection" className="text-gray-400 hover:text-red-500 transition-colors">{t('footer.collection')}</a></li>
              <li><a href="/samurai-legacy" className="text-gray-400 hover:text-red-500 transition-colors">{t('footer.samuraiLegacy')}</a></li>
              <li><a href="/animated-series" className="text-gray-400 hover:text-red-500 transition-colors">{t('footer.animatedSeries')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">{t('footer.community')}</h4>
            <ul className="space-y-2">
              <li><a href="/community" className="text-gray-400 hover:text-red-500 transition-colors">{t('footer.governance')}</a></li>
              <li><a href="/animator" className="text-gray-400 hover:text-red-500 transition-colors">{t('footer.characterCreator')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">{t('footer.connect')}</h4>
            <div className="flex gap-4">
              <SocialButton
                icon={Twitter}
                href="https://twitter.com/BushidoNFT"
                label="Twitter"
              />
              <SocialButton
                icon={MessageCircle}
                href="https://discord.gg/bushido"
                label="Discord"
              />
              <SocialButton
                icon={Send}
                href="https://t.me/BushidoNFT"
                label="Telegram"
              />
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-red-900/20 text-center text-gray-400">
          <p>{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

const Layout = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { account, connectWallet, disconnectWallet, isConnecting, userNFTs, votingPower } = useWeb3();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handlePath = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('scroll', handleScroll);
    handlePath();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  const handleWalletClick = () => {
    if (account) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${isDark ? 'dark bg-black' : 'bg-white'}`}>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? isDark 
              ? 'bg-black/90 shadow-lg backdrop-blur-sm' 
              : 'bg-white/90 shadow-lg backdrop-blur-sm'
            : 'bg-transparent'
        } border-b ${isDark ? 'border-red-900/20' : 'border-red-300/20'}`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button 
            onClick={handleLogoClick}
            className="flex items-center group"
          >
            <svg 
              className={`h-12 w-12 transition-transform group-hover:scale-110 ${
                isDark ? 'text-red-500' : 'text-red-600'
              }`}
              viewBox="0 0 1000 1000" 
              fill="currentColor"
            >
              <path d="M750 350c0-22-5.2-42.8-14.6-61.2-9.4-18.4-22.8-34.4-39.2-47.2-16.4-12.8-35.6-22.8-56.8-29.6-21.2-6.8-44-10.4-67.6-10.4-23.6 0-46.4 3.6-67.6 10.4-21.2 6.8-40.4 16.8-56.8 29.6-16.4 12.8-29.8 28.8-39.2 47.2C398.8 307.2 393.6 328 393.6 350c0 22 5.2 42.8 14.6 61.2 9.4 18.4 22.8 34.4 39.2 47.2 16.4 12.8 35.6 22.8 56.8 29.6 21.2 6.8 44 10.4 67.6 10.4 23.6 0 46.4-3.6 67.6-10.4 21.2-6.8 40.4-16.8 56.8-29.6 16.4-12.8 29.8-28.8 39.2-47.2C744.8 392.8 750 372 750 350zM571.8 488.4c-21.2 0-41.6-3.2-60.4-9.2-18.8-6-35.2-14.8-49.2-26-14-11.2-25.2-24.8-33.2-40.8-8-16-12-34-12-53.6 0-19.6 4-37.6 12-53.6 8-16 19.2-29.6 33.2-40.8 14-11.2 30.4-20 49.2-26 18.8-6 39.2-9.2 60.4-9.2 21.2 0 41.6 3.2 60.4 9.2 18.8 6 35.2 14.8 49.2 26 14 11.2 25.2 24.8 33.2 40.8 8 16 12 34 12 53.6 0 19.6-4 37.6-12 53.6-8 16-19.2 29.6-33.2 40.8-14 11.2-30.4 20-49.2 26C613.4 485.2 593 488.4 571.8 488.4z"/>
              <path d="M500 150c-193.3 0-350 156.7-350 350s156.7 350 350 350 350-156.7 350-350S693.3 150 500 150zm0 636.4c-157.9 0-286.4-128.5-286.4-286.4S342.1 213.6 500 213.6 786.4 342.1 786.4 500 657.9 786.4 500 786.4z"/>
              <path d="M571.8 268.4c-21.2 0-41.6 3.2-60.4 9.2-18.8 6-35.2 14.8-49.2 26-14 11.2-25.2 24.8-33.2 40.8-8 16-12 34-12 53.6 0 19.6 4 37.6 12 53.6 8 16 19.2 29.6 33.2 40.8 14 11.2 30.4 20 49.2 26 18.8 6 39.2 9.2 60.4 9.2 21.2 0 41.6-3.2 60.4-9.2 18.8-6 35.2-14.8 49.2-26 14-11.2 25.2-24.8 33.2-40.8 8-16 12-34 12-53.6 0-19.6-4-37.6-12-53.6-8-16-19.2-29.6-33.2-40.8-14-11.2-30.4-20-49.2-26C613.4 271.6 593 268.4 571.8 268.4zM500 350c0-22 5.2-42.8 14.6-61.2 9.4-18.4 22.8-34.4 39.2-47.2 16.4-12.8 35.6-22.8 56.8-29.6 21.2-6.8 44-10.4 67.6-10.4 23.6 0 46.4 3.6 67.6 10.4 21.2 6.8 40.4 16.8 56.8 29.6 16.4 12.8 29.8 28.8 39.2 47.2 9.4 18.4 14.6 39.2 14.6 61.2 0 22-5.2 42.8-14.6 61.2-9.4 18.4-22.8 34.4-39.2 47.2-16.4 12.8-35.6 22.8-56.8 29.6-21.2 6.8-44 10.4-67.6 10.4-23.6 0-46.4-3.6-67.6-10.4-21.2-6.8-40.4-16.8-56.8-29.6-16.4-12.8-29.8-28.8-39.2-47.2C505.2 392.8 500 372 500 350z"/>
            </svg>
            <h1 className={`text-4xl font-extrabold tracking-wider ml-4 transition-colors ${
              isDark ? 'text-red-500 group-hover:text-red-400' : 'text-red-600 group-hover:text-red-500'
            }`}>
              {t('title')}
            </h1>
          </button>
          
          <div className="flex items-center gap-4">
            <NavigationMenu currentPath={currentPath} />
            <button 
              onClick={handleWalletClick}
              className={`px-6 py-3 rounded-xl group border flex items-center gap-2 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
                isDark 
                  ? 'bg-red-700 hover:bg-red-600 border-red-700/50 hover:shadow-red-900' 
                  : 'bg-red-600 hover:bg-red-500 border-red-600/50 hover:shadow-red-500'
              } text-white`}
              disabled={isConnecting}
            >
              {isConnecting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Connecting...
                </>
              ) : account ? (
                <div className="flex items-center gap-2">
                  <span>{`${account.slice(0, 6)}...${account.slice(-4)}`}</span>
                  {userNFTs?.length > 0 && (
                    <span className="px-2 py-1 bg-red-900/20 rounded-full text-sm">
                      {userNFTs.length} NFTs
                    </span>
                  )}
                  {votingPower > 0 && (
                    <span className="px-2 py-1 bg-red-900/20 rounded-full text-sm">
                      {votingPower} votes
                    </span>
                  )}
                  <Wallet className="w-6 h-6" />
                </div>
              ) : (
                <>
                  {t('connectWallet')}
                  <Wallet className="w-6 h-6" />
                </>
              )}
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-24">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;