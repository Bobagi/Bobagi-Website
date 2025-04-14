import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import en from "./locales/en.json";
import pt from "./locales/pt.json";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";
// import GAuth from "vue3-google-oauth2";
import GAuth from "vue3-google-login";
import "./assets/css/global.css";
import store from "./store";

loadFonts();

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en,
    pt,
  },
  legacy: false,
  globalInjection: true,
});

const app = createApp(App);

app.use(i18n);
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
