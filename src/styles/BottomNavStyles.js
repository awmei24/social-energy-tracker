import styled from 'styled-components';
import { colors } from './GlobalStyle';

export const NavBar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${colors.dark};
  padding: 0px 0;
  gap: 0;
  z-index: 1000;
  box-shadow: 0 -2px 12px rgba(13, 19, 33, 0.15);

  @media (max-width: 390px) {
    padding: 16px 0;
  }
`;

export const NavButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${colors.light};
  transition: all 0.3s ease;
  flex: 1;
  height: 120px;
  position: relative;

  .icon {
    width: 28px;
    height: 28px;
    display: block;
  }

  .label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }

  &:hover {
    background-color: rgba(116, 140, 171, 0.1);
    color: ${colors.lightest};
  }

  ${({ isActive }) =>
    isActive &&
    `
    background-color: rgba(116, 140, 171, 0.15);
    color: ${colors.lightest};
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background-color: ${colors.medium};
    }
  `}

  @media (max-width: 768px) {
    height: 120px;
    gap: 4px;
    padding: 8px 12px;

    .icon {
      width: 24px;
      height: 24px;
    }

    .label {
      font-size: 10px;
    }
  }
`;
