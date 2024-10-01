import type { RuntimeConfig } from '@nuxt/schema'
import dotEnv from 'dotenv'

dotEnv.config({ path: '../../.env' })
const env: any = process.env

export const runtimeConfig: Partial<RuntimeConfig> = {
    consola: {
        level: env.NUXT_CONSOLA_LEVEL,
    },
    public: {
        'nuxt3-module-data-layer': {
            accountBaseUrl:
                env.NUXT_PUBLIC_NUXT3_MODULE_DATA_LAYER_ACCOUNT_BASE_URL,
            baseUrl: env.NUXT_PUBLIC_NUXT3_MODULE_DATA_LAYER_BASE_URL,
            xTenantId: env.NUXT_PUBLIC_NUXT3_MODULE_DATA_LAYER_X_TENANT_ID,
        },
        auth: {
            redirectUri: env.NUXT_PUBLIC_AUTH_REDIRECT_URI,
            keycloakClientId: env.NUXT_PUBLIC_AUTH_KEYCLOAK_CLIENT_ID,
            keycloakIssuer: env.NUXT_PUBLIC_AUTH_KEYCLOAK_ISSUER,
            secret: env.NUXT_PUBLIC_AUTH_SECRET,
        },
    },
}
