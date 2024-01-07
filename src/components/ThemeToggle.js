import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-right: 16px;
`;

const ToggleLabel = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.text}; // Ensure text color matches the theme
`;

const ToggleInput = styled.input`
  cursor: pointer;
`;

const LanguageButton = styled.button`
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.text};
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.text};
    color: ${(props) => props.theme.body};
  }
`;

const ThemeToggle = ({ theme, toggleTheme }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <ToggleContainer>
      <ToggleLabel>{t('darkMode')}</ToggleLabel>
      <ToggleInput type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
      <LanguageButton onClick={() => changeLanguage('en')}>EN</LanguageButton>
      <LanguageButton onClick={() => changeLanguage('cz')}>CZ</LanguageButton>
    </ToggleContainer>
  );
};

export default ThemeToggle;
