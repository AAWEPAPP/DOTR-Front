import { createRouter, createWebHistory } from "vue-router";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import LandingPage from "./views/LandingPage.vue";
import AdminDashboard from "./views/AdminDashboard.vue";
import Dashboard from "./views/Dashboard.vue";
import axios from "axios";

const routes = [
	{ path: "/", name: "LandingPage", component: LandingPage },
	{ path: "/login", name: "Login", component: Login },
	{ path: "/register", name: "Register", component: Register },
	{
		path: "/adminDashboard",
		name: "AdminDashboard",
		component: AdminDashboard,
		meta: { requiresAuth: true },
	},
	{
		path: "/dashboard",
		name: "Dashboard",
		component: Dashboard,
		meta: { requiresAuth: true },
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach(async (to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		try {
			const response = await axios.get(
				"https://dotr.jhanson.us/api/Auth/auth",
				{
					withCredentials: true,
				}
			);

			console.log("Validation successful:", response.data);

			if (response.status === 200) {
				console.log("User is authenticated");
				next();
			}
		} catch (error) {
			console.error("User is not authenticated:", error);
			next({ path: "/" });
		}
	} else {
		next();
	}
});

export default router;
