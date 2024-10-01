import { acceptHMRUpdate, computed, defineStore, ref } from '#imports'

export const useCounterStore = defineStore('counter', () => {
    const count = ref(0)
    const name = ref('Eduardo')
    const doubleCount = computed(() => count.value * 2)

    function increment() {
        count.value++
    }

    function decrement() {
        count.value--
    }

    return { count, name, doubleCount, increment, decrement }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot))
}
