import dotEnv from 'dotenv'
import { defineNuxtConfig } from 'nuxt/config'
import {
    app,
    googleFont,
    i18n,
    image,
    module,
    nitro,
    primevue,
    runtimeConfig,
    tailwindcss,
    vite,
} from './configs'

dotEnv.config({ path: '../.env' })
const env: any = process.env

export default defineNuxtConfig({
    ssr: false,

    runtimeConfig,

    devtools: {
        enabled: env.NUXT_DEVTOOLS_ENABLED === 'true',
        timeline: {
            enabled: env.NUXT_DEVTOOLS_TIMELINE_ENABLED === 'true',
        },
    },

    colorMode: {
        classPrefix: 'p-',
        classSuffix: '',
    },

    css: ['~/assets/css/index.css', 'primeicons/primeicons.css'],

    modules: [
        '@wellcare/nuxt3-module-data-layer',
        '@vueuse/nuxt',
        'nuxt-jsonld',
        'dayjs-nuxt',
        '@nuxt/test-utils/module',
        ['@nuxtjs/google-fonts', googleFont],
        ['../src/module', module],
        '@nuxtjs/i18n',
        'nuxt-marquee',
        '@primevue/nuxt-module',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/color-mode',
        '@nuxt/image',
        '@pinia/nuxt',
    ],

    i18n,

    app,

    nitro,

    tailwindcss,

    primevue,

    image,

    vite,

    compatibilityDate: '2024-09-25',
})
