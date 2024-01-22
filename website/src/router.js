import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/HomePage.vue";
import TicTacToe from "./components/TicTacToe.vue";
import NotFound from "./components/NotFound.vue";
import SignIn from "./components/SignIn.vue";
import SignUp from "./components/SignUp.vue";
import UserConfig from "./components/UserConfig.vue";
import ForgotPassword from "./components/ForgotPassword.vue";
import Snowflake from "./components/SnowFlake.vue";
import HeroWars from "./components/HeroWars.vue";
import ProjectZomboid from "./components/ProjectZomboid.vue";
import AvariceBot from "./components/AvariceBot.vue";
import GoldRush from "./components/GoldRush.vue";

import store from "./store";

const routes = [
  { path: "/", name: "HomePage", component: HomePage },
  { path: "/TicTacToe", name: "TicTacToe", component: TicTacToe },
  { path: "/SignIn", name: "SignIn", component: SignIn },
  { path: "/SignUp", name: "SignUp", component: SignUp },
  { path: "/UserConfig", name: "UserConfig", component: UserConfig },
  { path: "/Snowflake", name: "Snowflake", component: Snowflake },
  { path: "/HeroWars", name: "HeroWars", component: HeroWars },
  { path: "/Avarice", name: "Avarice", component: AvariceBot },
  { path: "/GoldRush", name: "GoldRush", component: GoldRush },
  {
    path: "/ProjectZomboid",
    name: "ProjectZomboid",
    component: ProjectZomboid,
  },
  {
    path: "/ForgotPassword",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  store.dispatch("checkTokenValidity");
  next();
});

export default router;
