import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/sc",
    name: "SC",
    component: () =>import("../views/SC")
  },
  {
    path: "/sc/:id",
    name: "SCDET",
    component: () =>import("../views/SC/Detalhe.vue")
  },
  {
    path: "/pc",
    name: "PC",
    component: () =>import("../views/PC"),
    children:[
      {
        path: ":id",
        name: "PCDET",
        component: () =>import("../views/PC/Detalhe.vue")
      },
      {
        path: ":id/:nome",
        name: "PCDET2",
        component: () =>import("../views/PC/Detalhe2.vue")
      }          
    ]
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
