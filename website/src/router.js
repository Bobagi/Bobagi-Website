import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/HomePage.vue";
import NewPage from "./components/NewPage.vue";
import NotFound from "./components/NotFound.vue";

const routes = [
  { path: "/", name: "HomePage", component: HomePage },
  { path: "/newPage", name: "NewPage", component: NewPage },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
