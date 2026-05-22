import React, { useState } from 'react';
import styled from 'styled-components';

const recommendations = [
  { id: 1, name: 'Workout Mix', description: 'High energy tracks to power you through your routines.', emoji: '💪', artist: 'Hyper Beats' },
  { id: 2, name: 'Chill Vibes', description: 'Relaxed acoustic and lofi sounds to calm your mind.', emoji: '😎', artist: 'Sunny Chords' },
  { id: 3, name: 'Party Time', description: 'House hits and anthems to dance all night to.', emoji: '🎉', artist: 'DJ Sparkle' },
  { id: 4, name: 'Focus Mode', description: 'Deep synthwave and study beats for high concentration.', emoji: '🎯', artist: 'Study Wave' },
  { id: 5, name: 'Sad Songs', description: 'Melodic soft rock and ballads for quiet reflection.', emoji: '😢', artist: 'Melancholic Hearts' },
  { id: 6, name: 'Road Trip', description: 'Classic rock and upbeat pop anthems for your travel.', emoji: '🚗', artist: 'The Highwaymen' },
];

const SectionContainer = styled.section`
  padding: 6rem 2.5rem;
  background: rgba(0, 0, 0, 0.35);
  position: relative;
  z-index: 10;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  margin-bottom: 3rem;
  color: white;
  text-align: center;
  
  span {
    color: #1DB954;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: ${props => props.theme.cardBg};
  border: ${props => props.theme.cardBorder};
  border-radius: 16px;
  padding: 2rem;
  cursor: pointer;
  position: relative;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(29, 185, 84, 0.15) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(29, 185, 84, 0.2);
    border-color: #1DB954;
    
    &::before {
      opacity: 1;
    }
  }
`;

const EmojiContainer = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  transition: transform 0.5s ease;
  user-select: none;
  z-index: 2;
  
  ${Card}:hover & {
    transform: scale(1.15) rotate(5deg);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: white;
  text-align: center;
  z-index: 2;
`;

const CardDesc = styled.p`
  font-size: 0.9rem;
  color: #b3b3b3;
  margin-bottom: 1.5rem;
  text-align: center;
  line-height: 1.5;
  z-index: 2;
  flex-grow: 1;
`;

const ActionWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  width: 100%;
  margin-top: auto;
  z-index: 2;
`;

const PlayButton = styled.button`
  flex: 2;
  padding: 0.8rem;
  background: #1DB954;
  color: black;
  border: none;
  border-radius: 8px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  
  &:hover {
    background: #1ed760;
    box-shadow: 0 0 15px rgba(29, 185, 84, 0.4);
    transform: scale(1.03);
  }
  
  &:active {
    transform: scale(0.97);
  }
`;

const LikeButton = styled.button`
  flex: 1;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.08);
  color: ${props => props.liked ? '#E63946' : 'white'};
  border: 1px solid ${props => props.liked ? '#E63946' : 'rgba(255, 255, 255, 0.15)'};
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

function RecommendationsSection({ playTrack }) {
  const [liked, setLiked] = useState({});

  const toggleLike = (e, id) => {
    e.stopPropagation(); // Avoid triggering card click
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SectionContainer id="recommendations">
      <SectionTitle>✨ Personalized <span>Recommendations</span></SectionTitle>
      <Grid>
        {recommendations.map(playlist => (
          <Card key={playlist.id} onClick={() => playTrack(playlist.name, playlist.artist, playlist.emoji)}>
            <EmojiContainer>{playlist.emoji}</EmojiContainer>
            <CardTitle>{playlist.name}</CardTitle>
            <CardDesc>{playlist.description}</CardDesc>
            <ActionWrapper>
              <PlayButton
                onClick={(e) => {
                  e.stopPropagation();
                  playTrack(playlist.name, playlist.artist, playlist.emoji);
                }}
              >
                ▶️ Play
              </PlayButton>
              <LikeButton
                liked={liked[playlist.id]}
                onClick={(e) => toggleLike(e, playlist.id)}
              >
                {liked[playlist.id] ? '❤️' : '🤍'}
              </LikeButton>
            </ActionWrapper>
          </Card>
        ))}
      </Grid>
    </SectionContainer>
  );
}

export default RecommendationsSection;

