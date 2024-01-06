import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";
// import GAuth from "vue3-google-oauth2";
import GAuth from "vue3-google-login";
import "./assets/css/global.css";

loadFonts();

const app = createApp(App);

app.use(router);
app.use(vuetify);

const gAuthOptions = {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
};
app.use(GAuth, gAuthOptions);

app.mount("#app");
