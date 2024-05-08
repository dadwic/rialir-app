import 'intl-pluralrules';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import faTranslation from './locales/fa/translation.json';
import Storage from './storage';

i18n
  .use({
    type: 'languageDetector',
    async: false,
    init: () => {},
    detect: () => Storage.getString('language'),
  })
  .use(initReactI18next)
  .init({
    fallbackLng: 'fa',
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

export default i18n;
