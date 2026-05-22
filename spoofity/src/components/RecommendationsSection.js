import React, { useState } from 'react';
import styled from 'styled-components';

const RecommendationsContainer = styled.section`
  padding: 4rem 2rem;
  background: rgba(0, 0, 0, 0.3);
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #1DB954;
  text-align: center;
`;

const PlaylistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PlaylistCard = styled.div`
  background: linear-gradient(135deg, rgba(29, 185, 84, 0.1) 0%, rgba(29, 185, 84, 0.05) 100%);
  border: 1px solid rgba(29, 185, 84, 0.3);
  border-radius: 0.8rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: linear-gradient(135deg, rgba(29, 185, 84, 0.2) 0%, rgba(29, 185, 84, 0.1) 100%);
    border-color: #1DB954;
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(29, 185, 84, 0.2);
  }
`;

const PlaylistEmoji = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const PlaylistName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: white;
`;

const PlaylistDescription = styled.p`
  font-size: 0.9rem;
  color: #b3b3b3;
  margin-bottom: 1rem;
`;

const PlayButton = styled.button`
  width: 100%;
  padding: 0.7rem;
  background: #1DB954;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #1ed760;
  }
`;

const recommendations = [
  { id: 1, name: 'Workout Mix', description: 'High energy tracks', emoji: '💪' },
  { id: 2, name: 'Chill Vibes', description: 'Relax and unwind', emoji: '😎' },
  { id: 3, name: 'Party Time', description: 'Dance all night', emoji: '🎉' },
  { id: 4, name: 'Focus Mode', description: 'Stay concentrated', emoji: '🎯' },
  { id: 5, name: 'Sad Songs', description: 'Deep emotions', emoji: '😢' },
  { id: 6, name: 'Road Trip', description: 'Travel companion', emoji: '🚗' },
];

function RecommendationsSection() {
  const [liked, setLiked] = useState({});

  const toggleLike = (id) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <RecommendationsContainer>
      <SectionTitle>✨ Personalized Recommendations</SectionTitle>
      <PlaylistGrid>
        {recommendations.map(playlist => (
          <PlaylistCard key={playlist.id}>
            <PlaylistEmoji>{playlist.emoji}</PlaylistEmoji>
            <PlaylistName>{playlist.name}</PlaylistName>
            <PlaylistDescription>{playlist.description}</PlaylistDescription>
            <PlayButton onClick={() => toggleLike(playlist.id)}>
              {liked[playlist.id] ? '❤️ Liked' : '🤍 Like'}
            </PlayButton>
          </PlaylistCard>
        ))}
      </PlaylistGrid>
    </RecommendationsContainer>
  );
}

export default RecommendationsSection;
