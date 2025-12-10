import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/HomePage.vue";

const routes = [
  { path: "/", name: "HomePage", component: HomePage },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
