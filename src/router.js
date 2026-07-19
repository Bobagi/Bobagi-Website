import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/HomePage.vue";
import NotFound from "./components/NotFound.vue";

const routes = [
  { path: "/", name: "HomePage", component: HomePage },
  { path: "/p/:slug", name: "CaseStudy", component: () => import("./components/CaseStudy.vue") },
  { path: "/Snowflake", name: "Snowflake", component: () => import("./components/SnowFlake.vue") },
  { path: "/HeroWars", name: "HeroWars", component: () => import("./components/HeroWars.vue") },
  { path: "/MouseJiggler", name: "MouseJiggler", component: () => import("./components/MouseJiggler.vue") },
  // Retired pages — superseded by the portfolio home / case studies.
  { path: "/Avarice", redirect: "/" },
  { path: "/OneWayFly", redirect: "/" },
  { path: "/GodotGame", redirect: "/" },
  { path: "/GoldRush", redirect: "/" },
  { path: "/CoinAlert", redirect: "/" },
  { path: "/ProjectZomboid", redirect: "/" },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
