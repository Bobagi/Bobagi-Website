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

const supportedLocales = ["en", "pt"];

function normalizePreferredLocale(localeCode) {
  if (!localeCode) {
    return null;
  }

  const baseLocale = localeCode.split("-")[0];
  return supportedLocales.includes(baseLocale) ? baseLocale : null;
}

function getPersistedLocale() {
  if (typeof window === "undefined") {
    return null;
  }

  return normalizePreferredLocale(localStorage.getItem("preferredLocale"));
}

function detectNavigatorLocale() {
  if (typeof navigator === "undefined") {
    return null;
  }

  const navigatorLocales = navigator.languages || [navigator.language];

  for (const navigatorLocale of navigatorLocales) {
    const normalizedLocale = normalizePreferredLocale(navigatorLocale);
    if (normalizedLocale) {
      return normalizedLocale;
    }
  }

  return null;
}

const resolvedLocale =
  getPersistedLocale() || detectNavigatorLocale() || supportedLocales[0];

const i18n = createI18n({
  locale: resolvedLocale,
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
