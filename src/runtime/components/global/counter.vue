<script setup lang="ts">
import { useCounterStore } from '#imports'

const counter = useCounterStore()
</script>

<template>
    <div class="flex flex-col items-center gap-4">
        <h1 class="text-2xl font-bold">Counter</h1>
        <span>{{ counter.count }}</span>

        <Button @click="counter.increment">Increase</Button>
        <Button severity="danger" @click="counter.decrement">Decrease</Button>
    </div>
</template>
