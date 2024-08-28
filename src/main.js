import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";

import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

import { library } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
	faCalendar,
	faPen,
	faUser,
	faX,
	faHouse,
	faArrowLeft,
	faTrashCan,
	faCheck,
} from "@fortawesome/free-solid-svg-icons";

import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";

library.add(
	faHouse,
	faX,
	faUser,
	faCalendar,
	faPen,
	faArrowLeft,
	faSquarePlus,
	faTrashCan,
	faCheck
);

const app = createApp(App);

app.component("TabView", TabView);
app.component("TabPanel", TabPanel);
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.use(PrimeVue, {
	unstyled: true,
});

app.mount("#app");
