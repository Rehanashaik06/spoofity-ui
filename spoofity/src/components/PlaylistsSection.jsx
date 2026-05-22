import React, { useState } from 'react';
import styled from 'styled-components';

const playlists = [
  { id: 1, title: 'Trending Now', songs: '45 songs', emoji: '🔥', artist: 'Spoofity Charts' },
  { id: 2, title: 'My Favorites', songs: '128 songs', emoji: '⭐', artist: 'You' },
  { id: 3, title: 'New Releases', songs: '67 songs', emoji: '🆕', artist: 'Various Artists' },
  { id: 4, title: 'Workout Beats', songs: '89 songs', emoji: '🎵', artist: 'Pulse Records' },
];

const SectionContainer = styled.section`
  padding: 6rem 2.5rem;
  background: rgba(0, 0, 0, 0.5);
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

const PlaylistsWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PlaylistItem = styled.div`
  background: ${props => props.isDragging ? 'rgba(29, 185, 84, 0.2)' : props.theme.cardBg};
  border: ${props => props.isDragging ? '2px dashed #1DB954' : props.theme.cardBorder};
  border-radius: 12px;
  padding: 1.2rem 1.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: grab;
  transition: transform 0.2s ease, background 0.3s ease, border 0.3s ease;
  opacity: ${props => props.isDragging ? 0.5 : 1};
  transform: ${props => props.isDragging ? 'scale(0.98)' : 'scale(1)'};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  
  &:hover {
    background: rgba(29, 185, 84, 0.12);
    border-color: #1DB954;
    transform: translateY(-2px);
  }
  
  &:active {
    cursor: grabbing;
  }
`;

const DragHandle = styled.span`
  font-size: 1.6rem;
  margin-right: 1.5rem;
  color: #1DB954;
  user-select: none;
  cursor: grab;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const PlaylistInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const EmojiBadge = styled.span`
  font-size: 2rem;
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlaylistTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.2rem;
`;

const PlaylistMeta = styled.p`
  font-size: 0.85rem;
  color: #b3b3b3;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PlayBtn = styled.button`
  background: #1DB954;
  color: black;
  border: none;
  border-radius: 500px;
  padding: 0.6rem 1.5rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  
  &:hover {
    background: #1ed760;
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

function PlaylistsSection({ playTrack }) {
  const [playlistItems, setPlaylistItems] = useState(playlists);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === targetIndex) {
      setDraggedItemIndex(null);
      return;
    }

    const reorderedList = [...playlistItems];
    const itemToMove = reorderedList[draggedItemIndex];

    reorderedList.splice(draggedItemIndex, 1);
    reorderedList.splice(targetIndex, 0, itemToMove);

    setPlaylistItems(reorderedList);
    setDraggedItemIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

  return (
    <SectionContainer id="playlists">
      <SectionTitle>🎶 Your <span>Playlists</span> (Drag to Reorder)</SectionTitle>
      <PlaylistsWrapper>
        {playlistItems.map((playlist, index) => (
          <PlaylistItem
            key={playlist.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            isDragging={draggedItemIndex === index}
          >
            <DragHandle>☰</DragHandle>
            <PlaylistInfo>
              <EmojiBadge>{playlist.emoji}</EmojiBadge>
              <InfoText>
                <PlaylistTitle>{playlist.title}</PlaylistTitle>
                <PlaylistMeta>{playlist.songs} • Curated by {playlist.artist}</PlaylistMeta>
              </InfoText>
            </PlaylistInfo>
            <Actions>
              <PlayBtn
                onClick={() => playTrack(playlist.title, playlist.artist, playlist.emoji)}
              >
                ▶️ Play
              </PlayBtn>
            </Actions>
          </PlaylistItem>
        ))}
      </PlaylistsWrapper>
    </SectionContainer>
  );
}

export default PlaylistsSection;

