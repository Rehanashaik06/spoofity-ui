import React, { useState } from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2.5rem;
  background: ${props => props.theme.navBg};
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(29, 185, 84, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background 0.3s ease;
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1.6rem;
  font-weight: 800;
  color: white;
  cursor: pointer;
  
  span {
    color: #1DB954;
    transition: transform 0.3s ease;
  }
  
  &:hover span {
    transform: rotate(15deg) scale(1.1);
  }
`;

const MenuLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuLink = styled.a`
  color: #b3b3b3;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.2s ease;
  
  &:hover {
    color: #1DB954;
    transform: translateY(-1px);
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 576px) {
    display: none;
  }
`;

const SignUpButton = styled.button`
  background: transparent;
  color: #b3b3b3;
  border: none;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  padding: 0.6rem 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: white;
    transform: scale(1.04);
  }
`;

const LogInButton = styled.button`
  background: white;
  color: black;
  border: none;
  border-radius: 500px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  padding: 0.8rem 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f6f6f6;
    transform: scale(1.04);
  }
`;

const HamburgerBtn = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease, transform 0.2s ease;
  padding: 0.4rem;
  border-radius: 50%;
  
  &:hover {
    color: #1DB954;
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const DropdownWrapper = styled.div`
  position: absolute;
  top: 75px;
  right: 2rem;
  background: rgba(18, 18, 18, 0.95);
  border: 1px solid rgba(29, 185, 84, 0.3);
  border-radius: 12px;
  padding: 0.6rem;
  min-width: 230px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: ${props => (props.isOpen ? 'block' : 'none')};
  transform-origin: top right;
  animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  z-index: 101;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const DropdownItem = styled.div`
  color: #e5e5e5;
  padding: 0.75rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(29, 185, 84, 0.15);
    color: white;
    padding-left: 1.25rem;
  }
`;

const DropdownDivider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.15);
  margin: 0.4rem 0.5rem;
`;

const SwitchContainer = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ToggleSwitch = styled.div`
  width: 40px;
  height: 20px;
  background: ${props => props.active ? '#1DB954' : '#555'};
  border-radius: 20px;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
`;

const ToggleKnob = styled.div`
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: ${props => props.active ? '22px' : '2px'};
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
`;

const AlertToast = styled.div`
  position: fixed;
  top: 90px;
  right: 2rem;
  background: #1DB954;
  color: black;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  display: ${props => props.show ? 'block' : 'none'};
  box-shadow: 0 4px 15px rgba(29, 185, 84, 0.3);
  font-weight: 700;
  z-index: 1000;
  animation: slideIn 0.3s ease forwards;
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

function Navbar({ isDarkWine, onThemeToggle }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  return (
    <>
      <Nav>
        <NavLeft>
          <LogoContainer onClick={() => triggerToast("Welcome back to Spoofity! 🎵")}>
            <svg viewBox="0 0 168 168" width="38" height="38" fill="#1DB954">
              <path d="M83.996.002C37.607.002 0 37.612 0 84.002s37.607 84 83.996 84c46.39 0 84.004-37.61 84.004-84.002S130.386.002 83.996.002zm38.402 121.2a5.22 5.22 0 0 1-7.18 1.73c-19.86-12.14-44.86-14.89-74.3-8.16a5.242 5.242 0 1 1-2.29-10.23c32.22-7.37 59.7-4.26 81.99 9.38a5.212 5.212 0 0 1 1.78 7.28zm10.25-22.8c-2.48 4.04-7.77 5.34-11.83 2.87-22.75-13.99-57.41-18.02-84.28-9.88a6.574 6.574 0 0 1-8.15-4.49 6.567 6.567 0 0 1 4.5-8.15c30.73-9.33 69.04-4.8 95.14 11.23a6.56 6.56 0 0 1 2.62 8.42zm.89-23.75C108.62 59.4 61.12 57.8 33.6 66.1a7.886 7.886 0 1 1-4.52-15.11c31.81-9.66 84.28-7.85 113.88 9.72a7.892 7.892 0 1 1-7.85 13.63z" />
            </svg>
            <span>Spoofity</span>
          </LogoContainer>
          <MenuLinks>
            <MenuLink href="#premium" onClick={() => triggerToast("Premium features loading...")}>Premium</MenuLink>
            <MenuLink href="#support" onClick={() => triggerToast("Customer support opening...")}>Support</MenuLink>
            <MenuLink href="#download" onClick={() => triggerToast("Starting App Download...")}>Download</MenuLink>
          </MenuLinks>
        </NavLeft>

        <NavRight>
          <NavButtons>
            <SignUpButton onClick={() => triggerToast("Signing up screen simulation")}>Sign up</SignUpButton>
            <LogInButton onClick={() => triggerToast("Logging in screen simulation")}>Log in</LogInButton>
          </NavButtons>
          <HamburgerBtn onClick={() => setDropdownOpen(!dropdownOpen)}>
            ☰
          </HamburgerBtn>
        </NavRight>

        <DropdownWrapper isOpen={dropdownOpen} onMouseLeave={() => setDropdownOpen(false)}>
          <DropdownItem onClick={() => { setDropdownOpen(false); triggerToast("👤 Navigating to Profile details"); }}>
            <span>👤 Profile</span>
          </DropdownItem>
          <DropdownItem onClick={() => { setDropdownOpen(false); triggerToast("🏠 Scrolling to Home"); }}>
            <span>🏠 Home</span>
          </DropdownItem>
          <DropdownItem onClick={() => { setDropdownOpen(false); triggerToast("🎵 Heading to Playlists"); }}>
            <span>🎵 Playlist</span>
          </DropdownItem>
          <DropdownItem onClick={() => { setDropdownOpen(false); triggerToast("⚙️ Opening Settings Menu"); }}>
            <span>⚙️ Settings</span>
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={onThemeToggle}>
            <span>🎨 Theme</span>
            <SwitchContainer>
              <ToggleSwitch active={isDarkWine}>
                <ToggleKnob active={isDarkWine} />
              </ToggleSwitch>
            </SwitchContainer>
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem style={{ fontSize: '0.8rem', color: '#888', pointerEvents: 'none', justifyContent: 'center' }}>
            Mode: {isDarkWine ? 'Wine Dark 🍷' : 'Spotify Classic 🥦'}
          </DropdownItem>
        </DropdownWrapper>
      </Nav>

      <AlertToast show={showToast}>
        {toastMessage}
      </AlertToast>
    </>
  );
}

export default Navbar;

