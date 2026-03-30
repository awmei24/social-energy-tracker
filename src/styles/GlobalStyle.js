import { createGlobalStyle } from 'styled-components';

export const colors = {
  darkest: '#0D1321',
  dark: '#1D2D44',
  medium: '#3E5C76',
  light: '#748CAB',
  lightest: '#F0EBD8',
};

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${colors.lightest};
    color: ${colors.darkest};
    line-height: 1.6;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    padding: 0;
    margin: 0;
  }

  input, textarea {
    font-family: inherit;
  }

  @media (max-width: 768px) {
    html {
      font-size: 16px;
    }
  }
`;
