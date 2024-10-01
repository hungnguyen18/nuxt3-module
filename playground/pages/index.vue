<!-- pages/index.vue -->
<template>
    <Card class="shadow-lg">
        <template #title>
            <h1
                class="text-4xl font-bold uppercase text-gray-900 dark:text-white">
                {{ $t('welcome') }} Nuxt3-module-starter
            </h1>
        </template>
        <template #content>
            <p class="mb-4 text-xl text-gray-600 dark:text-gray-400">
                This is a simple example of a home page using Nuxt 3, Tailwind
                CSS, and PrimeVue.
            </p>
            <Divider />
            <p class="text-sm text-gray-500 dark:text-gray-400">
                Current language: {{ $i18n.locale }}
            </p>
        </template>
    </Card>
</template>
