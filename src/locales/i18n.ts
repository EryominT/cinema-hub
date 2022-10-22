import { createI18n } from 'vue-i18n';
import { customRule } from '@/locales/pluralization-rules';
import ru from '@/locales/ru.json';
import en from '@/locales/en.json';

export const i18n = createI18n({
  legacy: false,
  locale: 'ru-RU',
  fallbackLocale: 'ru-RU',
  pluralRules: {
    'ru-RU': customRule,
  },
  messages: {
    'ru-RU': ru,
    'en-EN': en,
  },
});
