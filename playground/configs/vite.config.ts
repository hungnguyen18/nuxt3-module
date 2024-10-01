import type { ViteConfig } from '@nuxt/schema'

export const vite: Partial<ViteConfig> = {
    optimizeDeps: {
        exclude: ['primevue'],
    },
}
