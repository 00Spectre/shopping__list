import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    transition: background-color 0.5s, color 0.5s;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 16px;
  }
`;

export default GlobalStyle;
