import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  padding: 2rem;
`;

const GlowingText = styled.h1`
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 900;
  background: linear-gradient(135deg, #1DB954 0%, #1ed760 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(29, 185, 84, 0.5);
  animation: glow 2s ease-in-out infinite;
  margin-bottom: 1rem;

  @keyframes glow {
    0%, 100% {
      filter: drop-shadow(0 0 20px rgba(29, 185, 84, 0.6));
    }
    50% {
      filter: drop-shadow(0 0 40px rgba(29, 185, 84, 1));
    }
  }
`;

const Subtext = styled.p`
  font-size: 1.2rem;
  color: #b3b3b3;
  max-width: 600px;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ExploreButton = styled.button`
  padding: 1rem 3rem;
  background: #1DB954;
  color: white;
  border: none;
  border-radius: 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(29, 185, 84, 0.4);

  &:hover {
    background: #1ed760;
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(29, 185, 84, 0.6);
  }

  &:active {
    transform: scale(0.98);
  }
`;

function HeroSection() {
  return (
    <HeroContainer>
      <GlowingText>Feel The Music</GlowingText>
      <Subtext>
        Discover millions of songs, playlists, podcasts, and artists from all around the world.
      </Subtext>
      <ExploreButton onClick={() => alert('Explore Now clicked!')}>
        🎵 Explore Now
      </ExploreButton>
    </HeroContainer>
  );
}

export default HeroSection;
