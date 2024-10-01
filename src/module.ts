/* eslint-disable @typescript-eslint/no-require-imports */
import {
    addComponentsDir,
    addImportsDir,
    addPlugin,
    addTemplate,
    createResolver,
    defineNuxtModule,
    installModule,
    useLogger,
} from '@nuxt/kit'
import {
    copyFileSync,
    existsSync,
    mkdirSync,
    readdirSync,
    statSync,
    writeFileSync,
} from 'node:fs'
import { join } from 'node:path'
import { namespace } from './runtime/configs'
import type { ModuleOptions } from './runtime/types'

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: namespace,
        configKey: namespace,
    },
    defaults: {
        prefix: 'w',
    },
    async setup(options, nuxt) {
        const logger = useLogger(namespace)
        const log = (
            message: string,
            type: 'info' | 'success' | 'error' | 'warn' = 'info',
        ) => logger[type](`[${namespace}] ${message}`)
        const { resolve } = createResolver(import.meta.url)
        const runtimeDir = resolve('./runtime')

        // ==================== CONFIG VALIDATION ====================
        // if (nuxt.options.dev || nuxt.options._start || nuxt.options._generate) {
        //     validate({
        //         buildConfig: options,
        //         runtimeConfig: nuxt.options.runtimeConfig[namespace] as any,
        //         publicRuntimeConfig: nuxt.options.runtimeConfig.public[
        //             namespace
        //         ] as any,
        //     })
        // }

        nuxt.options.css.push(resolve('./runtime/assets/styles.css'))

        await installModule('@nuxtjs/tailwindcss', {
            // module configuration
            exposeConfig: true,
            config: {
                darkMode: ['selector', '[class*="p-dark"]'],
                content: {
                    files: [
                        resolve('./runtime/components/**/*.{vue,mjs,ts}'),
                        resolve('./runtime/pages/**/*.{vue,mjs,ts}'),
                        resolve('./runtime/*.{mjs,js,ts}'),
                    ],
                },
            },
        })

        // ==================== RUNTIME SETUP ====================
        nuxt.options.build.transpile.push(runtimeDir)
        log('Runtime directory transpiled', 'success')

        // ==================== PLUGINS ====================
        const addPlugins = () => {
            const pluginsDir = resolve('./runtime/plugins')
            if (existsSync(pluginsDir) && statSync(pluginsDir).isDirectory()) {
                readdirSync(pluginsDir)
                    .filter((file) => !file.match('.d.ts'))
                    .forEach((file) => {
                        addPlugin(join(pluginsDir, file))
                        log(`Plugin added: plugins/${file}`)
                    })
            }
            log('Plugins added', 'success')
        }
        addPlugins()

        // ==================== LANGUAGE FILES ====================
        const mergeLangFiles = () => {
            const langDir = resolve('./runtime/lang')
            const appLangDir = resolve(nuxt.options.srcDir, 'lang')

            if (
                !existsSync(appLangDir) ||
                !statSync(appLangDir).isDirectory()
            ) {
                mkdirSync(appLangDir)
                log(`Created lang folder in the app`)
            }

            if (existsSync(langDir) && statSync(langDir).isDirectory()) {
                const langFiles = readdirSync(langDir)

                if (langFiles.length === 0) {
                    ;['en', 'vi'].forEach((lang) => {
                        copyFileSync(
                            resolve(langDir, `${lang}.json`),
                            resolve(appLangDir, `${lang}.json`),
                        )
                    })
                    log(
                        `Pushed default language files into the app's lang folder`,
                    )
                } else {
                    langFiles.forEach((file) => {
                        const moduleLangContent = require(join(langDir, file))
                        const appLangPath = join(appLangDir, file)
                        const appLangContent = existsSync(appLangPath)
                            ? require(appLangPath)
                            : {}
                        const mergedContent = {
                            ...appLangContent,
                            ...Object.fromEntries(
                                Object.entries(moduleLangContent).filter(
                                    ([key]) => !(key in appLangContent),
                                ),
                            ),
                        }
                        writeFileSync(
                            appLangPath,
                            JSON.stringify(mergedContent, null, 2),
                        )
                        log(
                            `Module merged into file "${file}" in the app's lang folder`,
                            'success',
                        )
                    })
                }
            }
        }
        mergeLangFiles()

        // ==================== DIRECTORIES ====================
        const addDirs = () => {
            addComponentsDir({
                global: true,
                prefix: options.prefix,
                path: resolve('./runtime/components/global'),
            })
            ;['composables', 'stores'].forEach((dir) => {
                addImportsDir(resolve(`./runtime/${dir}`))
                // addServerImportsDir(resolve(`./runtime/services`))
                log(`${dir} added`, 'success')
            })
        }
        addDirs()

        // ==================== TYPE EXPORTS ====================
        const templateClient = addTemplate({
            filename: `types/${namespace}.d.ts`,
            getContents: () => `
                import type * as types from '${resolve('./runtime/types')}'

                declare module '@nuxt/schema' {
                    interface NuxtConfig {
                        nuxt3ModuleStarter?: types.ModuleOptions
                    }
                }

                declare global {
                    export type ModuleOptions = types.ModuleOptions
                }`,
        })

        nuxt.hook('prepare:types', ({ references }) => {
            references.push({ path: templateClient.dst })
        })

        // ==================== NITRO CONFIG ====================
        nuxt.hook('nitro:config', (nitroConfig) => {
            nitroConfig.publicAssets ||= []
            nitroConfig.publicAssets.push({
                dir: resolve('./runtime/public'),
                maxAge: 60 * 60 * 24 * 365, // 1 year
            })
            log('Nitro config updated', 'success')
        })

        log('Module setup complete', 'success')
    },
}) as any
