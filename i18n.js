import 'intl-pluralrules';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import faTranslation from './locales/fa/translation.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  supportedLngs: ['en', 'fa'],
  resources: {
    en: {
      translation: enTranslation,
    },
    fa: {
      translation: faTranslation,
    },
  },
});