import React, { useState } from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(29, 185, 84, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1DB954;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const MenuItems = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled.a`
  color: white;
  text-decoration: none;
  font-size: 0.95rem;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #1DB954;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;

  &.sign-up {
    background: white;
    color: black;

    &:hover {
      transform: scale(1.05);
    }
  }

  &.log-in {
    background: transparent;
    color: white;
    border: 2px solid white;

    &:hover {
      border-color: #1DB954;
      color: #1DB954;
    }
  }
`;

const HamburgerMenu = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 60px;
  right: 1rem;
  background: rgba(20, 20, 20, 0.95);
  border: 1px solid #1DB954;
  border-radius: 0.5rem;
  padding: 1rem;
  min-width: 200px;
  display: ${props => props.isOpen ? 'block' : 'none'};
  animation: slideDown 0.3s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DropdownItem = styled.div`
  color: white;
  padding: 0.8rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.3rem;
  transition: all 0.3s;

  &:hover {
    background: #1DB954;
    color: black;
  }
`;

function Navbar({ isDarkWine, onThemeToggle }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <NavbarContainer>
        <LeftSection>
          <Logo>
            <span>♪</span> Spoofity
          </Logo>
          <MenuItems>
            <MenuItem href="#premium">Premium</MenuItem>
            <MenuItem href="#support">Support</MenuItem>
            <MenuItem href="#download">Download</MenuItem>
          </MenuItems>
        </LeftSection>
        <RightSection>
          <Button className="sign-up">Sign up</Button>
          <Button className="log-in">Log in</Button>
          <HamburgerMenu onClick={() => setDropdownOpen(!dropdownOpen)}>
            ☰
          </HamburgerMenu>
        </RightSection>
      </NavbarContainer>

      <Dropdown isOpen={dropdownOpen}>
        <DropdownItem onClick={() => alert('Profile clicked')}>👤 Profile</DropdownItem>
        <DropdownItem onClick={() => alert('Home clicked')}>🏠 Home</DropdownItem>
        <DropdownItem onClick={() => alert('Playlist clicked')}>🎵 Playlist</DropdownItem>
        <DropdownItem onClick={() => alert('Settings clicked')}>⚙️ Settings</DropdownItem>
        <DropdownItem onClick={onThemeToggle}>
          {isDarkWine ? '🌙' : '☀️'} Theme
        </DropdownItem>
      </Dropdown>
    </>
  );
}

export default Navbar;
