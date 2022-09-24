<template>
    <div>
        <div class="btn-container">
            <button @click="prevPage">PREV</button>
            <button @click="nextPage">NEXT</button>
        </div>
        <div class="container">
            <EventCard v-for="event in events" :key="event.id" :event="event"/>
        </div>
    </div>
</template>

<script>
// @ un alias para /src
import { ref } from "vue";
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService.js"

export default {
    name: "CardList",
    setup() {
        const events = ref(null);
        const page = ref(1);
        //created
        EventService.getEvents()
            .then((response) => {
            // console.log("events:", response.data.results);
            events.value = response.data.results;
            })
            .catch();
        //methods
        function nextPage() {
            page.value++;
            getPage();
        }
        function prevPage() {
            page.value < 2 ? page.value : page.value--;
            getPage();
        }
        function getPage() {
            EventService.getEventsPage(page.value)
                .then((response) => {
                events.value = response.data.results;
                console.log("events:", response.data.results);
                })
                .catch();
        }
        return {
            events,
            page,
            prevPage,
            nextPage
        };
    },
    components: { EventCard }
};
</script>

<style lang="scss"> 
    @import "../assets/styles.scss";
    .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>