import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";
// import GAuth from "vue3-google-oauth2";
import GAuth from "vue3-google-login";
import store from "./store";
import "./assets/css/global.css";

loadFonts();

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(store);

// Check for existing user session
const userToken = localStorage.getItem("userToken");
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

if (userToken && userInfo) {
  store.dispatch("login", { user: userInfo, token: userToken });
}

const gAuthOptions = {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
};
app.use(GAuth, gAuthOptions);

app.mount("#app");
