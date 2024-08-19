import { createRouter, createWebHistory } from "vue-router";
import Login from "./views/Login.vue";
import LandingPage from "./views/LandingPage.vue";

const routes = [
	{
		path: "/",
		name: "LandingPage",
		component: LandingPage,
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
