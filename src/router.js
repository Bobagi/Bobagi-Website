import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/HomePage.vue";
import NotFound from "./components/NotFound.vue";
import Snowflake from "./components/SnowFlake.vue";
import HeroWars from "./components/HeroWars.vue";
import ProjectZomboid from "./components/ProjectZomboid.vue";
import AvariceBot from "./components/AvariceBot.vue";
import MouseJiggler from "./components/MouseJiggler.vue";
import GoldRush from "./components/GoldRush.vue";
import OneWayFly from "./components/OneWayFly.vue";
import GodotGame from "./components/GodotGame.vue";
import CoinAlert from "./components/CoinAlert.vue";
import ChatTrainer from "./components/ChatTrainer.vue";

const routes = [
  { path: "/", name: "HomePage", component: HomePage },
  { path: "/Snowflake", name: "Snowflake", component: Snowflake },
  { path: "/HeroWars", name: "HeroWars", component: HeroWars },
  { path: "/Avarice", name: "Avarice", component: AvariceBot },
  { path: "/MouseJiggler", name: "MouseJiggler", component: MouseJiggler },
  { path: "/OneWayFly", name: "OneWayFly", component: OneWayFly },
  { path: "/GodotGame", name: "GodotGame", component: GodotGame },
  { path: "/GoldRush", name: "GoldRush", component: GoldRush },
  { path: "/CoinAlert", name: "CoinAlert", component: CoinAlert },
  { path: "/ChatTrainer", name: "ChatTrainer", component: ChatTrainer },
  { path: "/ProjectZomboid", name: "ProjectZomboid", component: ProjectZomboid },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
