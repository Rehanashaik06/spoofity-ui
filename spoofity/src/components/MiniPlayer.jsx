import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
  from {
    transform: translateY(120px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const rotateCD = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 2.5rem;
  right: 2.5rem;
  background: rgba(18, 18, 18, 0.75);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(29, 185, 84, 0.35);
  border-radius: 20px;
  padding: 1.5rem;
  width: 320px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(29, 185, 84, 0.15);
  animation: ${slideUp} 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 100;
  display: ${props => props.visible ? 'flex' : 'none'};
  flex-direction: column;
  color: white;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #1DB954;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(29, 185, 84, 0.3);
  }
`;

const PlayerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
`;

const HeaderStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 800;
  color: #1DB954;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const GlowingDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #1DB954;
  box-shadow: 0 0 8px #1DB954;
  animation: pulse 1.5s infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
`;

const CloseBtn = styled.button`
  background: transparent;
  border: none;
  color: #888;
  font-size: 1.1rem;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: white;
  }
`;

const TrackInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.2rem;
`;

const TrackImage = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(29, 185, 84, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  position: relative;
  overflow: hidden;
  
  span {
    display: inline-block;
    animation: ${props => props.isPlaying ? rotateCD : 'none'} 6s linear infinite;
  }
`;

const TrackMeta = styled.div`
  flex: 1;
  min-width: 0;
`;

const Title = styled.h4`
  font-size: 1rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.2rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Artist = styled.p`
  font-size: 0.85rem;
  color: #b3b3b3;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProgressSlider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.15);
  outline: none;
  margin-bottom: 1.2rem;
  cursor: pointer;
  
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
  }
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #1DB954;
    cursor: pointer;
    margin-top: -4px;
    box-shadow: 0 0 10px rgba(29, 185, 84, 0.8);
    transition: transform 0.1s ease;
  }
  
  &:hover::-webkit-slider-thumb {
    transform: scale(1.3);
  }
`;

const TimeDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #888;
  margin-top: -1rem;
  margin-bottom: 1.2rem;
  font-weight: 600;
`;

const PlayerControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1rem;
`;

const RoundControlBtn = styled.button`
  background: transparent;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: #e5e5e5;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #1DB954;
    color: #1DB954;
    background: rgba(29, 185, 84, 0.05);
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const PlayPauseBtn = styled.button`
  background: #1DB954;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  color: black;
  font-size: 1.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(29, 185, 84, 0.4);
  transition: all 0.2s ease;
  
  &:hover {
    background: #1ed760;
    transform: scale(1.1);
    box-shadow: 0 4px 18px rgba(29, 185, 84, 0.6);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const VolumeControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 0.5rem;
`;

const VolIcon = styled.button`
  background: transparent;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: white;
  }
`;

const VolumeSlider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  width: 100px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.15);
  outline: none;
  cursor: pointer;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #1DB954;
    cursor: pointer;
  }

  &::-webkit-slider-thumb:hover {
    box-shadow: 0 0 6px #1DB954;
  }
`;

function MiniPlayer({ currentTrack, setCurrentTrack }) {
  const [isVisible, setIsVisible] = useState(true);
  const [volume, setVolume] = useState(50);
  const [prevVolume, setPrevVolume] = useState(50);
  const [progressVal, setProgressVal] = useState(25);
  const [trackSeconds, setTrackSeconds] = useState(45);

  const isPlaying = currentTrack.isPlaying;

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgressVal(prev => {
          if (prev >= 100) {
            setCurrentTrack(curr => ({ ...curr, isPlaying: false }));
            return 0;
          }
          return prev + 1;
        });
        setTrackSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, setCurrentTrack]);

  const togglePlay = () => {
    setCurrentTrack(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const handleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
    } else {
      setVolume(prevVolume === 0 ? 50 : prevVolume);
    }
  };

  const formatTime = (totalSeconds) => {
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleProgressChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setProgressVal(val);
    setTrackSeconds(Math.floor((val / 100) * 180));
  };

  return (
    <PlayerContainer visible={isVisible}>
      <PlayerHeader>
        <HeaderStatus>
          <GlowingDot />
          {isPlaying ? 'Streaming Spoofity' : 'Paused'}
        </HeaderStatus>
        <CloseBtn onClick={() => setIsVisible(false)}>✕</CloseBtn>
      </PlayerHeader>

      <TrackInfo>
        <TrackImage isPlaying={isPlaying}>
          <span>{currentTrack.emoji || '🎵'}</span>
        </TrackImage>
        <TrackMeta>
          <Title>{currentTrack.title}</Title>
          <Artist>{currentTrack.artist}</Artist>
        </TrackMeta>
      </TrackInfo>

      <ProgressSlider
        type="range"
        min="0"
        max="100"
        value={progressVal}
        onChange={handleProgressChange}
      />

      <TimeDisplay>
        <span>{formatTime(trackSeconds)}</span>
        <span>3:00</span>
      </TimeDisplay>

      <PlayerControls>
        <RoundControlBtn onClick={() => alert('⏮️ Moving to previous track')}>⏮️</RoundControlBtn>
        <PlayPauseBtn onClick={togglePlay}>
          {isPlaying ? '⏸️' : '▶️'}
        </PlayPauseBtn>
        <RoundControlBtn onClick={() => alert('⏭️ Skipping to next track')}>⏭️</RoundControlBtn>
      </PlayerControls>

      <VolumeControls>
        <VolIcon onClick={handleMute}>
          {volume === 0 ? '🔇' : volume < 40 ? '🔉' : '🔊'}
        </VolIcon>
        <VolumeSlider
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(parseInt(e.target.value, 10))}
        />
      </VolumeControls>
    </PlayerContainer>
  );
}

export default MiniPlayer;

