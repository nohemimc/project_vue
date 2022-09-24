<template>
    <div>
        <p>Especie: {{ event ? event.species : "" }}</p>
        <p>Origin: {{ event ? event.origin.name : "" }}</p>
    </div>
</template>

<script>
    export default {
        props: ["event"]
    }
</script>