import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Noir from "./presets/Noir";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";

import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

const app = createApp(App);

app.component("TabView", TabView);
app.component("TabPanel", TabPanel);

app.use(router);
app.use(PrimeVue);

app.mount("#app");
