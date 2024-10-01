<script lang="ts" setup>
const color = useColorMode()

useHead({
    meta: [
        {
            id: 'theme-color',
            name: 'theme-color',
            content: () => (color.value === 'dark' ? '#222222' : '#ffffff'),
        },
    ],
})

const toggleDark = () => {
    color.preference = color.value === 'dark' ? 'light' : 'dark'
}

const icon = computed(() => {
    return color.value === 'dark' ? 'pi pi-sun' : 'pi pi-moon'
})
</script>

<template>
    <Button :icon="icon" @click="toggleDark" />
</template>
