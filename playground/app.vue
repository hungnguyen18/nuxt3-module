<script setup lang="ts">
import { useHead } from '#imports'
import { appName } from './constants'

const localeHead = useLocaleHead({
    addDirAttribute: true,
    identifierAttribute: 'id',
    addSeoAttributes: true,
})

useHead({
    title: appName,
    titleTemplate: (t) => (t ? `${t} | Wellcare` : 'Wellcare'),
    htmlAttrs: {
        lang: localeHead.value.htmlAttrs.lang,
        dir: localeHead.value.htmlAttrs.dir,
    },

    meta: [
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'theme-color', content: '#ffffff' },
    ],
})
</script>

<template>
    <NuxtLayout />
    <Toast />
</template>

<style>
html,
body,
#__nuxt {
    height: 100vh;
    margin: 0;
    padding: 0;
}

html.p-light {
    background-color: white;
    color: black;
}

html.p-dark {
    background-color: black;
    color: white;
}
</style>
