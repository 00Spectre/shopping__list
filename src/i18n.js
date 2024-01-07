import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      shoppingLists: 'Shopping Lists',
      owner: 'Owner',
      Delete: 'Delete',
      darkMode: 'Dark Mode',
      'Create List': 'Create List',
      'Create': 'Create',
      'Cancel': 'Cancel',
      'Create List': 'Create List',
      'Enter List Name': 'Enter List Name',
      'Confirm Delete': 'Confirm Delete',
      'List Not Found': 'List Not Found',
      validListName: 'Please enter a valid list name',
    },
  },
  cz: {
    translation: {
      shoppingLists: 'Nákupní seznamy',
      owner: 'Vlastník',
      Delete: 'Smazat',
      darkMode: 'Tmavý režim',
      'Create List': 'Vytvořit seznam',
      'Create': 'Vytvořit',
      'Cancel': 'Zrušit',
      'Create List': 'Vytvořit seznam',
      'Enter List Name': 'Zadejte název seznamu',
      'Confirm Delete': 'Potvrdit smazání',
      'List Not Found': 'Seznam nenalezen',
      validListName: 'Zadejte platný název seznamu',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
