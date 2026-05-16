'use client'

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'
import { DEFAULT_LOCALE, Locale, LOCALE_STORAGE_KEY } from '@/i18n/config'

interface LocaleContextValue {
    locale: Locale
    setLocale: (locale: Locale) => void
    toggleLocale: () => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)

    useEffect(() => {
        try {
            const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null
            if (stored && (stored === 'en' || stored === 'vi')) {
                setLocaleState(stored)
            }
        } catch {
        }
    }, [])

    const setLocale = useCallback((next: Locale) => {
        try {
            localStorage.setItem(LOCALE_STORAGE_KEY, next)
        } catch { }
        setLocaleState(next)
    }, [])

    const toggleLocale = useCallback(() => {
        setLocale(locale === 'en' ? 'vi' : 'en')
    }, [locale, setLocale])

    return (
        <LocaleContext.Provider value={{ locale, setLocale, toggleLocale }}>
            {children}
        </LocaleContext.Provider>
    )
}

export function useLocale() {
    const ctx = useContext(LocaleContext)
    if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider>')
    return ctx
}