import React, { useState } from 'react';
import { Menu, ChevronDown, Sun, Moon, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const NavigationMenu = ({ currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { language, changeLanguage, languages } = useLanguage();

  const menuItems = {
    en: [
      { title: 'Home', path: '/' },
      { title: 'Collection', path: '/collection' },
      { title: 'Samurai Legacy', path: '/samurai-legacy' },
      { title: 'Community', path: '/community' },
      { title: 'Animator', path: '/animator' },
      { title: 'Animated Series', path: '/animated-series' }
    ],
    jp: [
      { title: 'ホーム', path: '/' },
      { title: 'コレクション', path: '/collection' },
      { title: '侍の伝説', path: '/samurai-legacy' },
      { title: 'コミュニティ', path: '/community' },
      { title: 'アニメーター', path: '/animator' },
      { title: 'アニメシリーズ', path: '/animated-series' }
    ],
    kr: [
      { title: '홈', path: '/' },
      { title: '컬렉션', path: '/collection' },
      { title: '사무라이 레거시', path: '/samurai-legacy' },
      { title: '커뮤니티', path: '/community' },
      { title: '애니메이터', path: '/animator' },
      { title: '애니메이션 시리즈', path: '/animated-series' }
    ]
  };

  const currentMenuItems = menuItems[language?.code || 'en'];

  const handleNavigate = (path) => {
    window.location.href = path;
    setIsOpen(false);
  };

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.2, 
        ease: "easeOut" 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10,
      transition: { 
        duration: 0.2, 
        ease: "easeIn" 
      } 
    }
  };

  const buttonBaseClasses = "flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg transition-all duration-300 border border-red-700/50 hover:scale-105 shadow-lg hover:shadow-red-900";

  return (
    <div className="flex items-center gap-4">
      {/* Language Switcher */}
      <div className="relative">
        <button
          onClick={() => setIsLangOpen(!isLangOpen)}
          className={buttonBaseClasses}
        >
          <span className="flex items-center gap-2">
            <Globe size={20} />
            <span>{language?.flag || '🇺🇸'}</span>
          </span>
        </button>

        <AnimatePresence>
          {isLangOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-full right-0 mt-2 bg-neutral-900 border border-red-900/20 rounded-lg shadow-lg overflow-hidden z-50"
            >
              {Object.values(languages || {}).map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setIsLangOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-red-900/20 transition-colors text-white"
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={buttonBaseClasses}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Navigation Menu */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={buttonBaseClasses}
        >
          <Menu size={20} />
          <span>Menu</span>
          <ChevronDown
            size={16}
            className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-full right-0 mt-2 w-48 bg-neutral-900 border border-red-900/20 rounded-lg shadow-lg overflow-hidden z-50"
            >
              {currentMenuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className={`w-full px-4 py-3 text-left transition-colors ${
                    currentPath === item.path
                      ? 'bg-red-900/40 text-red-400'
                      : 'text-white hover:bg-red-900/20'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NavigationMenu;