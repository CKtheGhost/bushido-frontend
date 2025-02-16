import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import LoadingTransition from './components/LoadingTransition';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Web3Provider } from './contexts/Web3Context';
import HomePage from './components/HomePage';
import CollectionGrid from './components/CollectionGrid';
import ModelAnimator from './components/ModelAnimator';
import SamuraiLegacy from './components/SamuraiLegacy';
import CommunityGovernance from './components/CommunityGovernance';
import AnimatedSeries from './components/AnimatedSeries';
import CommunityAnimator from './components/CommunityAnimator';

const App = () => {
  const [currentPage, setCurrentPage] = useState('/');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleLocation = () => {
      setIsLoading(true);
      setCurrentPage(window.location.pathname);
      setTimeout(() => setIsLoading(false), 500);
    };

    window.addEventListener('popstate', handleLocation);
    handleLocation();

    return () => {
      window.removeEventListener('popstate', handleLocation);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case '/collection':
        return <CollectionGrid />;
      case '/animator':
        return <ModelAnimator />;
      case '/samurai-legacy':
        return <SamuraiLegacy />;
      case '/community':
        return <CommunityGovernance />;
      case '/animated-series':
        return <AnimatedSeries />;
      case '/community-animator':
        return <CommunityAnimator />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Web3Provider>
      <ThemeProvider>
        <LanguageProvider>
          <LoadingTransition isLoading={isLoading}>
            <Layout>
              {renderPage()}
            </Layout>
          </LoadingTransition>
        </LanguageProvider>
      </ThemeProvider>
    </Web3Provider>
  );
};

export default App;