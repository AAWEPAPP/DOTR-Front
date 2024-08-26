import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Noir from "./presets/Noir";
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
} from "@fortawesome/free-solid-svg-icons";

library.add(faHouse, faX, faUser, faCalendar, faPen, faArrowLeft);

const app = createApp(App);

app.component("TabView", TabView);
app.component("TabPanel", TabPanel);
app.component("font-awesome-icon", FontAwesomeIcon);

library.add(faCalendar, faPen, faUser, faX, faHouse, faArrowLeft);

app.use(router);
app.use(PrimeVue, {
	unstyled: true,
});

app.mount("#app");
