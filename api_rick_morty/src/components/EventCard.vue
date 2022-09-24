<template>
    <!-- router-link: Permite crear un enlace. Esto permite que Vue Router cambie la URL sin recargar la página, maneje la generación de URL y su codificación. -->
    <router-link
        class="event-link"
        :to = "{
            name: 'EventDetails',
            params: { id: event.id }
        }"
    >
        <div class="event-card">
            <h4> {{ event.name }}</h4>
            <div class="status">
                <span v-if="statusColorR" class="status-icon-r"></span>
                <span v-else-if="statusColorG" class="status-icon-g"></span>
                <span>Status {{event.status}}</span>
            </div>
            <img :src="event.image" :alt="event.name">
        </div>
    </router-link>
</template>

<script>

import { ref, computed } from "vue";
export default {
    name: "EventCard",
    props: {
		event: {
			type: Object,
			required: true
		}
	},
    setup(props) {
        const status = ref(props.event.status)

        //computed
        const statusColorR = computed (() => {
            if(status.value === "Dead"){
                return 1;
            } else return 0;
        })

        const statusColorG = computed (() => {
            if(status.value === "Alive"){
                return 1;
            } else return 0;
        })


        return {
            status, 
            statusColorR,
            statusColorG
        }
    }


}
</script>

<style>
    .event-card {
	width: 320px;
	height: auto;
	min-height: 450px;
	background: rgb(60, 62, 68);
	border-radius: 20px;
	overflow: hidden;
	padding: 10px 15px;
	margin-bottom: 24px;
	margin-right: 10px;
	transition: all 0.2s linear;
	cursor: pointer;
	color: white;
}
.status {
	display: flex;
	justify-content: center;
}
.status-icon-r,
.status-icon-g {
	margin: auto 0;
	height: 0.5rem;
	width: 0.5rem;
	margin-right: 0.375rem;
	background: rgb(214, 61, 46);
	border-radius: 50%;
}
.status-icon-g {
	background: rgb(92 199 12);
}
img {
	margin-top: 5%;
}
.event-card:hover {
	transform: scale(1.01);
	box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2),
		0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.event-card > .title {
	margin: 0;
}
.event-link {
	color: black;
	text-decoration: none;
	font-weight: 100;
}
</style>