import { createI18n } from 'vue-i18n'
import ua from './ua.json'
import en from './en.json'

const savedLocale = localStorage.getItem('bts-learn-locale') || 'ua'

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { ua, en }
})
