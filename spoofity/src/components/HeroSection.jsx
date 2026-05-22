import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% {
    text-shadow: 0 0 15px rgba(29, 185, 84, 0.4), 0 0 25px rgba(29, 185, 84, 0.2);
  }
  50% {
    text-shadow: 0 0 35px rgba(29, 185, 84, 0.8), 0 0 50px rgba(29, 185, 84, 0.5);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
`;

const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  text-align: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  z-index: 10;
`;

const GlowingText = styled.h1`
  font-size: clamp(3rem, 10vw, 6.5rem);
  font-weight: 900;
  letter-spacing: -2px;
  background: linear-gradient(135deg, #1DB954 0%, #1ed760 50%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${pulse} 3s ease-in-out infinite;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  user-select: none;
`;

const SubText = styled.p`
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  color: #b3b3b3;
  max-width: 650px;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  font-weight: 500;
`;

const ExploreBtn = styled.button`
  padding: 1.2rem 3.5rem;
  background: #1DB954;
  color: black;
  border: none;
  border-radius: 500px;
  font-size: 1.15rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  box-shadow: 0 5px 25px rgba(29, 185, 84, 0.4);
  animation: ${float} 4s ease-in-out infinite;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  
  &:hover {
    background: #1ed760;
    transform: translateY(-4px) scale(1.06);
    box-shadow: 0 10px 30px rgba(29, 185, 84, 0.6);
    color: white;
  }
  
  &:active {
    transform: translateY(-2px) scale(0.98);
  }
`;

function HeroSection() {
  const handleScrollToRecs = () => {
    const section = document.getElementById('recommendations');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroContainer>
      <GlowingText>Feel The Music</GlowingText>
      <SubText>
        Discover millions of songs, playlists, podcasts, and artists from all around the world.
      </SubText>
      <ExploreBtn onClick={handleScrollToRecs}>
        🎬 Explore Now
      </ExploreBtn>
    </HeroContainer>
  );
}

export default HeroSection;

