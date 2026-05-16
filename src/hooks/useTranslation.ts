'use client'

import { useMemo } from 'react'
import en from '@/language/en.json'
import vi from '@/language/vi.json'
import { useLocale } from '../context/LocaleContext'

type Messages = typeof en
type TranslationKey = string

const dictionaries: Record<string, Messages> = { en, vi }

/**
 * useTranslation()
 *
 * Returns:
 *  - `t(key)`   — get a translated string by dot-notation key
 *  - `messages` — the full translation object for the current locale
 *  - `locale`   — current locale string ('en' | 'vi')
 *
 * @example
 * const { t, messages, locale } = useTranslation()
 *
 * t('ui.nav.about')           // "About" | "Giới thiệu"
 * messages.projects[0].subtitle
 */
export function useTranslation() {
    const { locale } = useLocale()

    const messages = useMemo<Messages>(
        () => dictionaries[locale] ?? vi,
        [locale]
    )

    const t = useMemo(() => {
        return (key: TranslationKey): string => {
            const parts = key.split('.')
            let result: any = messages
            for (const part of parts) {
                result = result?.[part]
                if (result === undefined) return key
            }
            return typeof result === 'string' ? result : key
        }
    }, [messages])

    return { t, messages, locale }
}