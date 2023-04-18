import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  createMemoryHistory,
  RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/hello",
    component: () => import("@components/HelloWorld.vue"),
  },
  {
    path: "/register",
    component: () => import("@components/register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
