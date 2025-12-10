import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import en from "./locales/en.json";
import pt from "./locales/pt.json";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";
import "./assets/css/global.css";

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

app.mount("#app");
