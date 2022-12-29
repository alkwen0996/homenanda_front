import Vue from "vue";
import Router from "vue-router";
import Index from "./pages/Index.vue";
// import Landing from './pages/Landing.vue';
import Landing from "./layout/DealContent";
import Login from "./pages/Login.vue";
import Profile from "./pages/Profile.vue";
import MainNavbar from "./layout/MainNavbar.vue";
import MainFooter from "./layout/MainFooter.vue";
import Regist from "./pages/components/SignupForm.vue";
import AppBoard from "@/pages/board/AppBoard";
import AppQna from "@/pages/qna/AppQna";
import AppUser from "@/pages/user/AppUser";
import LandContext from "@/layout/LandContext";

import {
  router
} from "vue-router";
import store from "@/store";

Vue.use(Router);

// https://v3.router.vuejs.org/kr/guide/advanced/navigation-guards.html
const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const checkToken = store.getters["memberStore/checkToken"];
  let token = sessionStorage.getItem("access-token");
  console.log("로그인 처리 전", checkUserInfo, token);

  if (checkUserInfo != null && token) {
    console.log("토큰 유효성 체크하러 가자!!!!");
    await store.dispatch("memberStore/getUserInfo", token);
  }

  if (!checkToken || checkUserInfo === null) {
    console.log('checkuserinfo: ' + checkUserInfo === null);
    console.log('token: ' + checkToken);
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "login" });
    router.push({
      name: "/user/login"
    });
  } else {
    console.log("로그인 했다!!!!!!!!!!!!!.");
    next();
  }
};

export default new Router({
  linkExactActiveClass: "active",
  routes: [{
      path: "/",
      name: "index",
      components: {
        default: Index,
        header: MainNavbar,
        footer: MainFooter,
      },
      props: {
        header: {
          colorOnScroll: 400,
        },
        footer: {
          backgroundColor: "black",
        },
      },
    },
    {
      path: "/landing",
      name: "landing",
      components: {
        default: Landing,
        header: MainNavbar,
        footer: MainFooter,
      },
      props: {
        header: {
          colorOnScroll: 400,
        },
        footer: {
          backgroundColor: "black",
        },
      },
    },
    {
      path: "/login",
      name: "login",
      beforeEnter: onlyAuthUser,
      components: {
        default: Login,
        header: MainNavbar,
        footer: MainFooter,
      },
      props: {
        header: {
          colorOnScroll: 400,
        },
        footer: {
          backgroundColor: "black",
        },
      },
    },
    {
      path: "/regist",
      name: "regist",
      components: {
        default: Regist,
        header: MainNavbar,
        footer: MainFooter,
      },
      props: {
        header: {
          colorOnScroll: 400,
        },
        footer: {
          backgroundColor: "black",
        },
      },
    },
    {
      path: "/profile",
      name: "profile",
      // beforeEnter: onlyAuthUser,
      components: {
        default: Profile,
        header: MainNavbar,
        footer: MainFooter,
      },
      props: {
        header: {
          colorOnScroll: 400,
        },
        footer: {
          backgroundColor: "black",
        },
      },
    },
    {
      path: "/board",
      name: "board",
      // beforeEnter: onlyAuthUser,
      components: {
        default: AppBoard,
        header: MainNavbar,
        footer: MainFooter,
      },
      props: {
        header: {
          colorOnScroll: 400,
        },
        footer: {
          backgroundColor: "black",
        },
      },
      redirect: "/board/list",
      children: [{
          path: "list",
          name: "boardlist",
          component: () => import("@/components/board/BoardList"),
        },
        {
          path: "write",
          name: "boardwrite",
          // beforeEnter: onlyAuthUser,
          component: () => import("@/components/board/BoardWrite"),
        },
        {
          path: "detail/:articleId",
          name: "boarddetail",
          // beforeEnter: onlyAuthUser,
          component: () => import("@/components/board/BoardDetail"),
        },
        {
          path: "modify",
          name: "boardmodify",
          // beforeEnter: onlyAuthUser,
          component: () => import("@/components/board/BoardModify"),
        },
        {
          path: "delete/:articleId",
          name: "boarddelete",
          // beforeEnter: onlyAuthUser,
          component: () => import("@/components/board/BoardDelete"),
        },
      ],
    },
    {
      path: "/qna",
      name: "qna",
      // beforeEnter: onlyAuthUser,
      components: {
        default: AppQna,
        header: MainNavbar,
        footer: MainFooter,
      },
      props: {
        header: {
          colorOnScroll: 400,
        },
        footer: {
          backgroundColor: "black",
        },
      },
      redirect: "/qna/list",
      children: [{
          path: "list",
          name: "qnalist",
          component: () => import("@/components/qna/QnaList"),
        },
        {
          path: "write",
          name: "qnawrite",
          // beforeEnter: onlyAuthUser,
          component: () => import("@/components/qna/QnaWrite"),
        },
        {
          path: "detail/:articleId",
          name: "qnadetail",
          // beforeEnter: onlyAuthUser,
          component: () => import("@/components/qna/QnaDetail"),
        },
        {
          path: "modify",
          name: "qnamodify",
          // beforeEnter: onlyAuthUser,
          component: () => import("@/components/qna/QnaModify"),
        },
        {
          path: "delete/:articleId",
          name: "qnadelete",
          // beforeEnter: onlyAuthUser,
          component: () => import("@/components/qna/QnaDelete"),
        },
      ],
    },
    {
      path: "/user",
      name: "user",
      // beforeEnter: onlyAuthUser,
      components: {
        default: AppUser,
        header: MainNavbar,
        footer: MainFooter,
      },
      props: {
        header: {
          colorOnScroll: 400,
        },
        footer: {
          backgroundColor: "black",
        },
      },
      redirect: "/user/join",
      children: [{
          path: "join",
          name: "join",
          component: () => import("@/components/user/UserRegister"),
        },
        {
          path: "login",
          name: "login",
          component: () => import("@/components/user/UserLogin"),
        },
        {
          path: "mypage",
          name: "mypage",
          // beforeEnter: onlyAuthUser,
          component: () => import("@/components/user/UserMyPage"),
        },
        {
          path: "area",
          name: "area",
          // beforeEnter: onlyAuthUser,
          component: () => import("@/components/user/UserFavoriteArea"),
        },
        {
          path: "building",
          name: "building",
          // beforeEnter: onlyAuthUser,
          component: () => import("@/components/user/UserFavoriteBuilding"),
        },
        {
          path: "findpass",
          name: "findpass",
          // beforeEnter: onlyAuthUser,
          component: () => import("@/components/user/UserFindPass"),
        }, {
          path: "delete",
          name: "delete",
          // beforeEnter: onlyAuthUser,
          component: () => import("@/components/user/UserDelete"),
        },
      ],
    },
    {
      path: "/LandContext",
      name: "LandContext",
      // beforeEnter: onlyAuthUser,
      components: {
        default: LandContext,
        header: MainNavbar,
        footer: MainFooter,
      },
      props: {
        header: {
          colorOnScroll: 400,
        },
        footer: {
          backgroundColor: "black",
        },
      },
    },
  ],
  scrollBehavior: (to) => {
    if (to.hash) {
      return {
        selector: to.hash,
      };
    } else {
      return {
        x: 0,
        y: 0,
      };
    }
  },
});