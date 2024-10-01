import type { NuxtI18nOptions } from '@nuxtjs/i18n'

export const i18n = {
    baseUrl: 'https://wellcare.vn',
    // lazy: false,
    locales: [
        {
            code: 'en',
            iso: 'en-US',
            name: 'English',
        },
        {
            code: 'vi',
            iso: 'vi-VN',
            name: 'Tiếng Việt',
        },
    ],
    strategy: 'no_prefix',
    detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_locale',
        redirectOn: 'root',
    },
    vueI18nLoader: true,
    defaultLocale: 'en',
    vueI18n: './configs/vueI18n.config.ts',
} as NuxtI18nOptions
