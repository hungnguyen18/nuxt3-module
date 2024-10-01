import { defineI18nConfig } from '#imports'
import localeEn from '../lang/en.json'
import localeVi from '../lang/vi.json'

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
        en: {
            ...localeEn,
        },
        vi: {
            ...localeVi,
        },
    },
}))
