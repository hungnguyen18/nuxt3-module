# @wellcare/nuxt3-module-starter

> Nơi huyền thoại được sinh ra 🚀

## Introduction

This is a starter kit for developing Nuxt 3 modules. It provides a basic structure and essential tools to help you quickly begin building your own Nuxt 3 module.

## Features

-   Basic Nuxt 3 module structure
-   TypeScript support
-   Built-in testing with Vitest
-   Auto-import components (customizable)
-   Integrated Tailwind CSS and PrimeVue 4 (optional)
-   ESLint and Prettier integration for code quality assurance
-   Basic sign in oidc with keycloak

## Quick Setup

1. Clone this repository
2. Install dependencies:
    ```bash
    pnpm install
    ```
3. Develop your module in the `src` directory

## Usage in a Nuxt Project

1. Add the module to your Nuxt project:
    ```bash
    pnpm add -D @wellcare/nuxt3-module-starter
    ```
2. Add the module to your `nuxt.config.ts`:
    ```js
    export default defineNuxtConfig({
        modules: ['@wellcare/nuxt3-module-starter'],
    })
    ```

## Configuration

You can configure the module by adding a `nuxt3-module-starter` object in your `nuxt.config.ts`:

```js
export default defineNuxtConfig({
    modules: ['@wellcare/nuxt3-module-starter'],
    'nuxt3-module-starter': {
        // Your options here
        prefix: 'custom',
        // ...
    },
})
```

## Development

1. Run the development environment:
    ```bash
    pnpm dev
    ```
2. Run tests:
    ```bash
    pnpm test
    ```
3. Lint code:
    ```bash
    pnpm lint
    ```

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## License

[MIT License](LICENSE)
