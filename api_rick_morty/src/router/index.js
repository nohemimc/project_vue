import { createRouter, createWebHashHistory } from 'vue-router'
import CardList from "@/views/CardList.vue";
import EventLayout from "@/views/event/EventLayout.vue";
import EventDetails from "@/views/event/EventDetails.vue";
import EventLocation from "@/views/event/EventLocation.vue";
import NotFound from "@/views/NotFound.vue";
import NProgress from "nprogress";

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
    path: "/:catchAll(.*)",
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
  //Historial hash, útil para apps sin servidor
  history: createWebHashHistory(process.env.BASE_URL), //Variables de entorno a un archivo .env.
  routes
});

/* 
  router.beforeEach: Protector de navegación global (Global Before Guards)

    beforeEach:
    Agrega un protector de navegación que se ejecuta antes de cualquier navegación. 
    Devuelve una función que elimina la guardia registrada.

    Parametros que recibe la función:
      1. to - ubicación de la ruta de destino en un formato normalizado a la que se navega
      2. from - ubicación de la ruta actual en un formato normalizado desde el que se está navegando
      3. next - fuente de errores, puede aparecer más de una vez, pero solo si las rutas lógicas no se superponen, de lo contrario, el gancho nunca se resolverá ni producirá errores.
*/
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

export default router
