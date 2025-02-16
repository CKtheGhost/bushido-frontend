import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    name: 'English',
    code: 'en',
    flag: '🇺🇸',
    content: {
      title: 'BUSHIDO',
      connectWallet: 'Connect Wallet',
      exploreCollection: 'Explore Collection',
      mainHeading: 'Join us in shaping the future of interactive storytelling through unique 3D NFTs and community-driven narratives.',
      footer: {
        quickLinks: 'Quick Links',
        collection: 'Collection',
        samuraiLegacy: 'Samurai Legacy',
        animatedSeries: 'Animated Series',
        community: 'Community',
        governance: 'Governance',
        characterCreator: 'Character Creator',
        connect: 'Connect',
        rights: '© 2024 Bushido. All rights reserved.',
        slogan: 'Where Art, Community, and Innovation Collide.'
      },
      features: {
        title: 'Features',
        learnMore: 'Learn more'
      }
    }
  },
  jp: {
    name: '日本語',
    code: 'jp',
    flag: '🇯🇵',
    content: {
      title: 'ブシドー',
      connectWallet: 'ウォレット接続',
      exploreCollection: 'コレクションを見る',
      mainHeading: 'ユニークな3D NFTとコミュニティ主導のナラティブを通じて、インタラクティブなストーリーテリングの未来を形作ります。',
      footer: {
        quickLinks: 'クイックリンク',
        collection: 'コレクション',
        samuraiLegacy: '侍の伝説',
        animatedSeries: 'アニメシリーズ',
        community: 'コミュニティ',
        governance: 'ガバナンス',
        characterCreator: 'キャラクタークリエイター',
        connect: '接続',
        rights: '© 2024 ブシドー. 全著作権所有。',
        slogan: 'アート、コミュニティ、革新が交わる場所。'
      },
      features: {
        title: '機能',
        learnMore: '詳細を見る'
      }
    }
  },
  kr: {
    name: '한국어',
    code: 'kr',
    flag: '🇰🇷',
    content: {
      title: '부시도',
      connectWallet: '지갑 연결',
      exploreCollection: '컬렉션 보기',
      mainHeading: '독특한 3D NFT와 커뮤니티 주도 내러티브를 통해 인터랙티브 스토리텔링의 미래를 함께 만들어갑니다.',
      footer: {
        quickLinks: '빠른 링크',
        collection: '컬렉션',
        samuraiLegacy: '사무라이 레거시',
        animatedSeries: '애니메이션 시리즈',
        community: '커뮤니티',
        governance: '거버넌스',
        characterCreator: '캐릭터 크리에이터',
        connect: '연결',
        rights: '© 2024 부시도. 모든 권리 보유.',
        slogan: '예술, 커뮤니티, 혁신이 만나는 곳.'
      },
      features: {
        title: '기능',
        learnMore: '자세히 보기'
      }
    }
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(translations.en);

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && translations[savedLang]) {
      setCurrentLanguage(translations[savedLang]);
    }
  }, []);

  const changeLanguage = (langCode) => {
    if (translations[langCode]) {
      setCurrentLanguage(translations[langCode]);
      localStorage.setItem('language', langCode);
    }
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language: currentLanguage, 
        changeLanguage, 
        languages: translations,
        t: (path) => {
          // Simple path resolver (e.g., "footer.quickLinks")
          return path.split('.').reduce((obj, key) => obj?.[key], currentLanguage.content) || path;
        }
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);