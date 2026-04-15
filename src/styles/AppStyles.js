import styled from 'styled-components';
import { colors } from './GlobalStyle';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: ${colors.lightest};
  position: relative;
  overflow: hidden;
`;

export const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 32px 20px;
  padding-bottom: 120px;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 768px) {
    padding: 24px 16px;
    padding-bottom: 100px;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  padding: 32px 20px; 
`;
