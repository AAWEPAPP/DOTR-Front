import { createRouter, createWebHistory } from "vue-router";
import Login from "./views/Login.vue";
import LandingPage from "./views/LandingPage.vue";
import AdminDashboard from "./views/AdminDashboard.vue";

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
	{
		path: "/adminDashboard",
		name: "AdminDashboard",
		component: AdminDashboard,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
