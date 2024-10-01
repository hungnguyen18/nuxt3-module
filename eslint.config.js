// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
    features: {
        tooling: true,
        stylistic: false,
    },
    dirs: {
        src: ['./playground', './src'],
    },
}).append(
    {
        ignores: ['playground/assets/**'],
    },
    {
        files: ['src/**', 'playground/**'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            'vue/multi-word-component-names': 'off',
        },
    },
)
