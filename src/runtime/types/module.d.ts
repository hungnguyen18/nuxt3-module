/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface BaseRuntimeConfig {}
export interface BasePublicRuntimeConfig {}

declare module 'nuxt/schema' {
    interface RuntimeConfig {
        // Define properties specific to RuntimeConfig here
        'nuxt3-module-chart': BaseRuntimeConfig
    }

    interface PublicRuntimeConfig {
        // Define properties specific to PublicRuntimeConfig here
        'nuxt3-module-chart': BasePublicRuntimeConfig
    }
}

export interface ModuleOptions {
    // Options passed directly
    prefix?: string
}
