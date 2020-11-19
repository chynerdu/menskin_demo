import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AllProductPage from "@/pages/all-product";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "AllProductPage",
    component: AllProductPage,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
