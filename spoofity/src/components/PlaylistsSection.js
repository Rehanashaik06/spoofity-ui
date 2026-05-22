import React, { useState } from 'react';
import styled from 'styled-components';

const PlaylistsContainer = styled.section`
  padding: 4rem 2rem;
  background: rgba(0, 0, 0, 0.5);
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #1DB954;
  text-align: center;
`;

const PlaylistsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PlaylistItem = styled.div`
  background: rgba(29, 185, 84, 0.05);
  border: 1px solid rgba(29, 185, 84, 0.2);
  border-radius: 0.8rem;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: grab;
  transition: all 0.3s;

  &:active {
    cursor: grabbing;
    opacity: 0.7;
  }

  &:hover {
    background: rgba(29, 185, 84, 0.1);
    border-color: #1DB954;
  }
`;

const PlaylistInfo = styled.div`
  flex: 1;
`;

const PlaylistTitle = styled.h3`
  font-size: 1.1rem;
  color: white;
  margin-bottom: 0.3rem;
`;

const PlaylistMeta = styled.p`
  font-size: 0.85rem;
  color: #b3b3b3;
`;

const DragHandle = styled.span`
  font-size: 1.5rem;
  margin-right: 1rem;
  color: #1DB954;
`;

const PlayButtonStyle = {
  background: '#1DB954',
  color: 'white',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '0.3rem',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const playlists = [
  { id: 1, title: 'Trending Now', songs: '45 songs', emoji: '🔥' },
  { id: 2, title: 'My Favorites', songs: '128 songs', emoji: '⭐' },
  { id: 3, title: 'New Releases', songs: '67 songs', emoji: '🆕' },
  { id: 4, title: 'Workout Beats', songs: '89 songs', emoji: '🎵' },
];

function PlaylistsSection() {
  const [playlistItems, setPlaylistItems] = useState(playlists);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (index) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    if (draggedItem === null || draggedItem === index) return;

    const newPlaylists = [...playlistItems];
    const draggedPlaylist = newPlaylists[draggedItem];
    newPlaylists.splice(draggedItem, 1);
    newPlaylists.splice(index, 0, draggedPlaylist);
    setPlaylistItems(newPlaylists);
    setDraggedItem(null);
  };

  return (
    <PlaylistsContainer>
      <SectionTitle>🎶 Your Playlists (Drag to Reorder)</SectionTitle>
      <PlaylistsGrid>
        {playlistItems.map((playlist, index) => (
          <PlaylistItem
            key={playlist.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
          >
            <DragHandle>≡</DragHandle>
            <PlaylistInfo>
              <PlaylistTitle>{playlist.emoji} {playlist.title}</PlaylistTitle>
              <PlaylistMeta>{playlist.songs}</PlaylistMeta>
            </PlaylistInfo>
            <button style={PlayButtonStyle}>
              ▶️ Play
            </button>
          </PlaylistItem>
        ))}
      </PlaylistsGrid>
    </PlaylistsContainer>
  );
}

export default PlaylistsSection;
