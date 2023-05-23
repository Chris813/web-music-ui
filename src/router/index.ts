import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  createMemoryHistory,
  RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/recommend",
    name: "find",
    component: () => import("@/pages/find.vue"),
    children: [
      {
        path: "recommend",
        name: "recommend",
        component: () => import("@components/recommend.vue"),
      },
      {
        path: "/playlist/:id",
        component: () => import("@/pages/playlistDetail.vue"),
        children: [
          {
            path: "tracks",
            name: "tracks",
            component: () => import("@components/playlist/tracks.vue"),
          },
          {
            path: "comments",
            name: "comments",
            component: () => import("@components/playlist/comments.vue"),
          },
          {
            path: "subscribers",
            name: "subscribers",
            component: () => import("@components/playlist/subscribers.vue"),
          },
        ],
      },
      {
        path: "search",
        name: "search",
        component: () => import("@/pages/search.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
