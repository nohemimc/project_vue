import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import  HomeView  from "../view/HomeView.vue";
import  CounterView  from "../view/CounterView.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/counter',
        name: 'Counter',
        component: CounterView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router;