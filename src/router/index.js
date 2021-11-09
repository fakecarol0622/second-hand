import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/productlist",
    name: "productlist",
    component: () => import("../views/ProductList.vue"),
  },
  {
    path: "/productdetail",
    name: "productdetail",
    component: () => import("../views/ProductDetail.vue"),
  },
  {
    path: "/publishproduct",
    name: "publishproduct",
    component: () => import("../views/PublishProduct.vue"),
    meta: {
      isLogin:true
    }
  },
  {
    path: "/buyerorderlist",
    name: "buyerorderlist",
    component: () => import("../views/BuyerOrderList.vue"),
    meta: {
      isLogin:true
    }
  },
  {
    path: "/sellerproductlist",
    name: "sellerproductlist",
    component: () => import("../views/SellerProductList.vue"),
    meta: {
      isLogin:true
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      isLogin:true
    }
  },
  {
    path: "/management",
    name: "management",
    component: () => import("../views/Management.vue"),
    meta: {
      isLogin:true
    }
  },
  {
    path: "/editprofile",
    name: "editprofile",
    component: () => import("../views/EditProfile.vue"),
    meta: {
      isLogin:true
    }
  },
  {
    path: "/editproduct",
    name: "editproduct",
    component: () => import("../views/EditProduct.vue"),
    meta: {
      isLogin:true
    }
  },
  {
    path: "/sellerorderlist",
    name: "sellerorderlist",
    component: () => import("../views/SellerOrderList.vue"),
    meta: {
      isLogin:true
    }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
