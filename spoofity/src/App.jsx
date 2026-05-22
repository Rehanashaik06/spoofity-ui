import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import RecommendationsSection from './components/RecommendationsSection.jsx';
import PlaylistsSection from './components/PlaylistsSection.jsx';
import MiniPlayer from './components/MiniPlayer.jsx';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
    transition: background 0.5s ease-in-out, color 0.5s ease-in-out;
    overflow-x: hidden;
  }
`;

const AppContainer = styled.div`
  background: ${props => props.theme.background};
  min-height: 100vh;
  position: relative;
  transition: background 0.5s ease-in-out;
`;

const wineTheme = {
  background: 'linear-gradient(135deg, #722F37 0%, #000000 100%)',
  bgColor: '#000000',
  textColor: '#ffffff',
  primaryColor: '#1DB954',
  accentColor: '#E63946',
  cardBg: 'rgba(114, 47, 55, 0.15)',
  cardBorder: '1px solid rgba(29, 185, 84, 0.3)',
  navBg: 'rgba(20, 10, 12, 0.85)',
  themeName: 'wine'
};

const spClassicTheme = {
  background: 'linear-gradient(135deg, #091C0E 0%, #020603 50%, #000000 100%)',
  bgColor: '#000000',
  textColor: '#ffffff',
  primaryColor: '#1DB954',
  accentColor: '#1ed760',
  cardBg: 'rgba(29, 185, 84, 0.08)',
  cardBorder: '1px solid rgba(29, 185, 84, 0.25)',
  navBg: 'rgba(10, 15, 12, 0.85)',
  themeName: 'spClassic'
};

function App() {
  const [isDarkWine, setIsDarkWine] = useState(true); // Wine theme by default

  // Global State for mini-player
  const [currentTrack, setCurrentTrack] = useState({
    title: 'Spoofity Sessions',
    artist: 'The Antigravities',
    emoji: '🎷',
    isPlaying: false
  });

  const playTrack = (title, artist, emoji) => {
    setCurrentTrack({ title, artist, emoji, isPlaying: true });
  };

  const currentTheme = isDarkWine ? wineTheme : spClassicTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <AppContainer>
        <Navbar 
          isDarkWine={isDarkWine} 
          onThemeToggle={() => setIsDarkWine(!isDarkWine)} 
        />
        <HeroSection />
        <RecommendationsSection playTrack={playTrack} />
        <PlaylistsSection playTrack={playTrack} />
        <MiniPlayer currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

