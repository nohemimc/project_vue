import { createRouter, createWebHashHistory } from 'vue-router'
import CardList from "@/views/CardList.vue";
import EventLayout from "@/views/event/EventLayout.vue";
import EventDetails from "@/views/event/EventDetails.vue";
import EventLocation from "@/views/event/EventLocation.vue";
import NotFound from "@/views/event/NotFound.vue";
import NProgress from "nprogress.vue";

const routes = [
  {
    path: '/',
    name: 'CardList',
    component: CardList
  },
  {
		path: "/Character/:id", //Pasar props al router (rutas dinámicas)
		name: "EventLayout",
		props: true, //Activa "route.params" como props del componente
		component: EventLayout,
		children: [
			{
				path: "",
				name: "EventDetails",
				component: EventDetails
			},
			{
				path: "Location",
				name: "EventLocation",
				component: EventLocation
			}
		]
	},
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: "/:catchAll(*)",
    name: "NotFound",
    component: NotFound
  },
  {
    path: "/404/:resource",
    name: "404Resource",
    component: NotFound,
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

export default router
