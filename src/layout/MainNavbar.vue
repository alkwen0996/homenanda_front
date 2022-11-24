<template>
  <navbar position="fixed" type="primary" :transparent="transparent" :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto">
    <template>
      <router-link v-popover:popover1 class="navbar-brand" to="/">
        <img class="main-logo" src="img/mainlogo.png" width="100px" alt="logo" />
      </router-link>
      <el-popover ref="popover1" popper-class="popover" placement="bottom" width="200" trigger="hover">
        <!-- <div class="popover-body">
          Happy house
        </div> -->
      </el-popover>
    </template>
    <template slot="navbar-menu">
      <li class="nav-item">
        <router-link to="/landing" class="nav-link">
          <!-- <a
          class="nav-link"
          href=""
          target="_blank"
        > -->
          <i class="now-ui-icons location_compass-05"></i>
          <p>Map</p>
          <!-- </a> -->
        </router-link>
      </li>

      <li class="nav-item">
        <router-link to="/LandContext" class="nav-link">
          <i class="now-ui-icons location_map-big"> </i>
          <p>Land Price</p>
        </router-link>
      </li>

      <drop-down tag="li" title="Community" icon="now-ui-icons design_app" class="nav-item">
        <nav-link to="/board"> <i class="now-ui-icons files_paper"></i> 공지사항 </nav-link>

        <nav-link to="/qna"> <i class="now-ui-icons files_paper"></i> 질문게시판 </nav-link>
      </drop-down>

      <drop-down tag="li" title="User" icon="now-ui-icons users_circle-08" class="nav-item">
        <nav-link to="/user/login" v-show="!isLogin">
          <i class="now-ui-icons users_single-02"></i>로그인
        </nav-link>

        <nav-link to="/user/join" v-show="!isLogin">
          <i class="now-ui-icons users_single-02"></i>회원가입
        </nav-link>

        <nav-link to="" v-show="isLogin" @click.native="onClickLogout"> <i class="now-ui-icons users_single-02"></i>로그아웃
        </nav-link>

        <nav-link to="/user/mypage" v-show="isLogin">
          <i class="now-ui-icons users_single-02"></i>마이페이지
        </nav-link>
      </drop-down>
    </template>
  </navbar>
</template>

<script>
import { DropDown, Navbar, NavLink } from "@/components";
import { Popover } from "element-ui";
import { mapState, mapGetters, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "main-navbar",
  data() {
    return {};
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userLogout"]),
    // ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      // this.SET_IS_LOGIN(false);
      // this.SET_USER_INFO(null);
      // sessionStorage.removeItem("access-token");
      // if (this.$route.path != "/") this.$router.push({ name: "main" });
      console.log(this.userInfo)
      console.log(this.userInfo.userId);
      //vuex actions에서 userLogout 실행(Backend에 저장 된 리프레시 토큰 없애기
      //+ satate에 isLogin, userInfo 정보 변경)
      // this.$store.dispatch("userLogout", this.userInfo.userId);
      this.userLogout(this.userInfo.userId);
      sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
      sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push("/");
    },
  },
  props: {
    transparent: Boolean,
    colorOnScroll: Number,
  },
  components: {
    DropDown,
    Navbar,
    NavLink,
    [Popover.name]: Popover,
  },
};
</script>

<style scoped>

</style>
