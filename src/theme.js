// src/Theme.js
import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#fff',
  text: '#333',
  shoppingListName: '#025ab3',
  // Add more styles as needed
};

export const darkTheme = {
  body: '#333',
  text: '#fff',
  primary: '#007bff',
  background: '#222',
  shoppingListName: '#bb86fc',
  // Add more styles as needed
};

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    // Add more styles as needed
  }
`;
