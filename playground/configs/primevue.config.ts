import path from 'node:path'

export const primevue: any = {
    options: {
        unstyled: true,
    },
    autoImport: true,
    importPT: { from: path.resolve(__dirname, '../assets/presets/aura/') },
}
