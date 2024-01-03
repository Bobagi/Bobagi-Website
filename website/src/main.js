import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/global.css";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

const app = createApp(App);

app.use(router);
app.use(Vuetify);

app.mount("#app");
