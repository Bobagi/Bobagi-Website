import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import en from "./locales/en.json";
import pt from "./locales/pt.json";
import router from "./router";
import "./assets/css/global.css";

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

app.mount("#app");
