import 'intl-pluralrules';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import enTranslation from './locales/en/translation.json';
import faTranslation from './locales/fa/translation.json';

i18n
  .use({
    type: 'languageDetector',
    async: true,
    init: () => {},
    detect: async () => {
      try {
        return await AsyncStorage.getItem('language');
      } catch (error) {
        console.log(error);
        return 'en';
      }
    },
  })
  .use(initReactI18next)
  .init({
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
