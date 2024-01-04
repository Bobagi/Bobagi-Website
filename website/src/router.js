import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/HomePage.vue";
import NewPage from "./components/NewPage.vue";
import NotFound from "./components/NotFound.vue";
import SignIn from "./components/SignUp.vue";
import SignUp from "./components/SignUp.vue";

const routes = [
  { path: "/", name: "HomePage", component: HomePage },
  { path: "/newPage", name: "NewPage", component: NewPage },
  { path: "/SignIn", name: "SignIn", component: SignIn },
  { path: "/SignUp", name: "SignUp", component: SignUp },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
