import { createRouter, createWebHistory } from "vue-router";
import Login from "./views/Login.vue";
import LandingPage from "./views/LandingPage.vue";
import AdminDashboard from "./views/AdminDashboard.vue";
import Dashboard from "./views/Dashboard.vue";

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
	{
		path: "/dashboard",
		name: "Dashboard",
		component: Dashboard,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
