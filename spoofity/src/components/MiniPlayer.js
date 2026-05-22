import React, { useState } from 'react';
import styled from 'styled-components';

const FloatingPlayer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: linear-gradient(135deg, rgba(29, 185, 84, 0.2) 0%, rgba(29, 185, 84, 0.05) 100%);
  border: 1px solid #1DB954;
  border-radius: 1rem;
  padding: 1rem;
  min-width: 280px;
  box-shadow: 0 8px 32px rgba(29, 185, 84, 0.3);
  animation: slideUp 0.5s ease;
  z-index: 50;

  @keyframes slideUp {
    from {
      transform: translateY(100px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    bottom: 1rem;
    right: 1rem;
    min-width: 250px;
  }
`;

const PlayerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #1DB954;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #1ed760;
  }
`;

const NowPlaying = styled.div`
  margin-bottom: 1rem;
`;

const SongTitle = styled.h4`
  color: white;
  font-size: 1rem;
  margin-bottom: 0.3rem;
`;

const Artist = styled.p`
  color: #b3b3b3;
  font-size: 0.85rem;
`;

const ProgressBar = styled.div`
  background: rgba(255, 255, 255, 0.1);
  height: 4px;
  border-radius: 2px;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const Progress = styled.div`
  background: #1DB954;
  height: 100%;
  width: ${props => props.progress}%;
  transition: width 0.1s linear;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
`;

const ControlButton = styled.button`
  background: ${props => props.active ? '#1DB954' : 'transparent'};
  border: 1px solid #1DB954;
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #1DB954;
    transform: scale(1.1);
  }
`;

function MiniPlayer() {
  const [isVisible, setIsVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(45);

  if (!isVisible) return null;

  return (
    <FloatingPlayer>
      <PlayerHeader>
        <span style={{ color: '#1DB954', fontWeight: 'bold' }}>Now Playing</span>
        <CloseButton onClick={() => setIsVisible(false)}>✕</CloseButton>
      </PlayerHeader>
      
      <NowPlaying>
        <SongTitle>🎵 Summer Vibes</SongTitle>
        <Artist>By The Groove Squad</Artist>
      </NowPlaying>

      <ProgressBar>
        <Progress progress={progress} />
      </ProgressBar>

      <Controls>
        <ControlButton>⏮️</ControlButton>
        <ControlButton 
          active={isPlaying}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </ControlButton>
        <ControlButton>⏭️</ControlButton>
        <ControlButton>🔊</ControlButton>
      </Controls>
    </FloatingPlayer>
  );
}

export default MiniPlayer;
