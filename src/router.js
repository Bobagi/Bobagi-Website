import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/HomePage.vue";
import NotFound from "./components/NotFound.vue";

// Legacy project pages are lazy-loaded so the home page doesn't pay for them.
const routes = [
  { path: "/", name: "HomePage", component: HomePage },
  { path: "/Snowflake", name: "Snowflake", component: () => import("./components/SnowFlake.vue") },
  { path: "/HeroWars", name: "HeroWars", component: () => import("./components/HeroWars.vue") },
  { path: "/Avarice", name: "Avarice", component: () => import("./components/AvariceBot.vue") },
  { path: "/MouseJiggler", name: "MouseJiggler", component: () => import("./components/MouseJiggler.vue") },
  { path: "/OneWayFly", name: "OneWayFly", component: () => import("./components/OneWayFly.vue") },
  { path: "/GodotGame", name: "GodotGame", component: () => import("./components/GodotGame.vue") },
  { path: "/GoldRush", name: "GoldRush", component: () => import("./components/GoldRush.vue") },
  { path: "/CoinAlert", name: "CoinAlert", component: () => import("./components/CoinAlert.vue") },
  { path: "/ProjectZomboid", name: "ProjectZomboid", component: () => import("./components/ProjectZomboid.vue") },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
