import 'server-only'

import type { Locale } from '@configs/i18n'

const dictionaries = {
  en: () => import('@/data/dictionaries/en.json').then(module => module.default),
  fr: () => import('@/data/dictionaries/fr.json').then(module => module.default),
  ar: () => import('@/data/dictionaries/ar.json').then(module => module.default),
  fa: () => import('@/data/dictionaries/fa.json').then(module => module.default)
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
