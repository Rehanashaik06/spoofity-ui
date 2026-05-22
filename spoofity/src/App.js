import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import RecommendationsSection from './components/RecommendationsSection';
import PlaylistsSection from './components/PlaylistsSection';
import MiniPlayer from './components/MiniPlayer';

const AppContainer = styled.div`
  background: ${props => props.isDarkWine 
    ? 'linear-gradient(135deg, #722F37 0%, #000000 100%)'
    : 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'
  };
  color: white;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow-x: hidden;
  transition: background 0.3s ease;
`;

function App() {
  const [isDarkWine, setIsDarkWine] = useState(false);

  return (
    <AppContainer isDarkWine={isDarkWine}>
      <Navbar isDarkWine={isDarkWine} onThemeToggle={() => setIsDarkWine(!isDarkWine)} />
      <HeroSection />
      <RecommendationsSection />
      <PlaylistsSection />
      <MiniPlayer />
    </AppContainer>
  );
}

export default App;
