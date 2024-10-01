export const image = {
    provider: 'imaginary',
    densities: [],
    domains: ['https://storage.googleapis.com', 'https://cdn.wellcare.vn'],
    alias: {
        // 'https://storage.googleapis.com': '',
        storage: 'https://storage.googleapis.com', // imaginary
    },
    providers: {
        imaginary: {
            name: 'imaginary', // optional value to overrider provider name
            provider: '../providers/imaginary.ts', // Path to custom provider
            options: {
                // ... provider options
                baseURL: 'https://cdn.wellcare.vn/imaginary',
            },
        },
    },
    presets: {
        avatar: {
            modifiers: {
                width: 60,
                height: 60,
            },
        },
        placeholder: {
            modifiers: {
                format: 'jpeg',
                quality: 1,
                colorspace: 'bw',
                width: 1080,
            },
        },
        thumbnail: {
            modifiers: {
                width: 480,
                format: 'webp',
            },
        },
    },
}
