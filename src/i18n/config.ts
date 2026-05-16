export type Locale = 'en' | 'vi'
export const LOCALES = ['en', 'vi'] as const
export const DEFAULT_LOCALE: Locale = 'en'
export const LOCALE_STORAGE_KEY = 'SW-locale'