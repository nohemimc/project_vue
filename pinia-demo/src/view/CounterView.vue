<template>
    <h1>
        Counter View: {{ counterStore.counter }}
    </h1>

    <button @click="incremenBy(1)">+1</button>
    <button @click="incremenBy(2)">+2</button>
    <button @click="incremenBy(5)">+5</button>
</template>

<script lang="ts" setup>
    import { useCounterStore } from "../stores/counter";

    const counterStore = useCounterStore();

    const incremenBy = ( value: number) => {
        counterStore.incremenBy(value)
    }
</script>