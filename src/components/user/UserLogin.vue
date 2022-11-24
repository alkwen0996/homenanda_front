<template>
        <div class="py-5 text-center" >
        <card type="login" plain>
            

      <div class="py-5 text-center">
      <img class="d-block mx-auto mb-4" src="img/login.png" style="width:120px; height:120px">
      <h1><b>로그인</b></h1>
      <p class="lead"><b>HOME NANDA 서비스 이용을 위해 로그인해주세요.</b></p>
      </div>

            <h4>아이디</h4>
            <fg-input class="no-border input-lg" v-model="userId" placeholder="아이디">
            </fg-input>

            <br>
            <h4>비밀번호</h4>
            <fg-input class="no-border input-lg" v-model="userPwd" placeholder="비밀번호" type="password">
            </fg-input>

            <template slot="raw-content">
              <div class="card-footer text-center">
                <button id="loginButton" class="btn btn-primary btn-round btn-lg" @click="confirm">로그인</button>
              </div>

              <br>
              <div class="pull">
                <div>
                  <button type="button" class="btn btn-outline-secondary" @click="goFindPass">비밀번호찾기</button>
              </div>
              </div>

            </template>
          </card>
        </div>

</template>
<script>
import { mapState, mapActions } from "vuex";
import { Card, Button, FormGroupInput } from '@/components';
import userApi from "@/api/Login";

const memberStore = "memberStore";
const MarkInfo = "MarkInfo";
const ApartInfo = "ApartInfo";

export default {
  name: "UserLogin",
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  },
  data() {
    return {
      // isLoginError: false,
        userId: null,
        userPwd: null
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    ...mapActions(MarkInfo, ["getAttInfo"]),
    ...mapActions(ApartInfo, ["getAttHouse"]),
    async confirm() {
      await this.userConfirm({
        userId: this.userId,
        userPassword: this.userPwd
      });
      let token = sessionStorage.getItem("access-token");
      console.log("1. confirm() token >> " + token);
      if (this.isLogin) {
        await this.getUserInfo(token);
        console.log("4. confirm() userInfo :: ", this.userInfo);

        console.log(this.userInfo.userId);
        this.getAttInfo(this.userInfo.userId);
        this.getAttHouse(this.userInfo.userId);

        this.$router.push('/');
      }
    },
    movePage() {
      this.$router.push({ name: "join" });
    },
    login() { 
      userApi.post('/login', {
        userId: this.userId,
        userPassword: this.userPwd
      }).then((data) => {
        console.log(data); 
        this.$router.push('/');
      })
    },
    goFindPass() {
      this.$router.push("/user/findpass").catch(() => { });
    }
  },
};
</script>

<style>
  .py-5 {
    padding-top: 1rem !important;
  }

  .no-border {
              width:600px;
              height:75px;
              font-size:20px;
              display: inline;
        }
        
</style>
