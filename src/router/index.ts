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
        ],
      },
      {
        path: "search",
        name: "search",
        component: () => import("@/pages/search.vue"),
      },
      {
        path:"songlist",
        name:"gedan",
        component:()=>import("@/pages/gedan.vue")
      }
    ],
  },
  {
    path: "/mv",
    name: "mv",
    redirect:'/mv/mvjingxuan',
    component: () => import("@/pages/mv.vue"),
    children:[
      {
        path:'mvjingxuan',
        name:'mvjingxuan',
        component:()=>import("@/pages/mvjingxuan.vue")
      },
      {
        path:'special',
        name:'special',
        component:()=>import("@/pages/special.vue")
      },
      {
        path:'allmv',
        name:'allmv',
        component:()=>import("@/pages/allmv.vue")
      }
    ]
  },
  {
    path: "/video/:id",
    name: "video",
    component: () => import("@/pages/video.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
