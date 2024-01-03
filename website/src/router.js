import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import NewPage from "./components/NewPage.vue"; // Import your new component

const routes = [
  { path: "/", component: HelloWorld },
  { path: "/newPage", component: NewPage }, // Define the route for your new page
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
