<template>
<div class="container">
  <main>
    <div class="py-5 text-center">
      <img class="d-block mx-auto mb-4" src="img/signup.png" style="width:150px; height:150px">
      <h1><b>회원가입</b></h1>
      <p class="lead"><b>HOME NANDA 서비스 이용을 위해 아래 정보를 입력해주세요.</b></p>
    </div>


    <div class="py-5 text-center">
      <div class="row">
        <form class="needs-validation" v-on:submit="submitUser">
            <div class="col align-center">
              <h4>이름</h4>
              <input type="text" class="form-control" id="firstName" placeholder="이름 입력" v-model="userName" value="" required>
            </div>

            <br>
            <div class="col align-self-center">
              <h4>아이디</h4>
              <input type="text" class="form-control" id="address" placeholder="이메일 주소 입력" v-model="userId" required>
            </div>

            <br>
            <div class="col align-self-center">
              <h4>비밀번호</h4>
              <input type="password" class="form-control" id="password" placeholder="8자리 이상 영문, 숫자, 특수문자 포함" v-model="userPwd">  
              <div>&nbsp;</div>
              <input type="password" class="form-control" id="password" placeholder="비밀번호 확인">
            </div>

            <br>
            <div class="col align-self-center">
              <h4>전화번호</h4>
              <input type="text" class="form-control" id="address2" placeholder="010-****-**** 형식으로 입력" v-model="userPhone">
            </div>
            <br>
            <br>
            <br>
            
          <button class="w-50 btn btn-primary btn-lg" type="submit"><b>확인</b></button>
        </form>
      </div>
      </div>
  </main>

</div>
</template>

<script>
import { mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "",
  data() { 
    return {
      userId: null,
      userName: null,
      userPwd: null,
      userPhone: null,
    }
  },
  methods: {
    ...mapActions(memberStore, ["userRegister"]),
    async submitUser() { 
      await this.userRegister({
        userId: this.userId,
        userPassword: this.userPwd,
        userName: this.userName,
        phoneNumber: this.userPhone
      });

      this.$router.push("/");
      },
  },
};
</script>

<style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }

      .b-example-divider {
        height: 1rem;
        background-color: rgba(0, 0, 0, .1);
        border: solid rgba(0, 0, 0, .15);
        border-width: 1px 0;
        box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
      }

      .b-example-vr {
        flex-shrink: 0;
        width: 1.5rem;
        height: 100vh;
      }

      .bi {
        vertical-align: -.125em;
        fill: currentColor;
      }

      .nav-scroller {
        position: relative;
        z-index: 2;
        height: 2.75rem;
        overflow-y: hidden;
      }

      .nav-scroller .nav {
        display: flex;
        flex-wrap: nowrap;
        padding-bottom: 1rem;
        margin-top: -1px;
        overflow-x: auto;
        text-align: center;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
      }

      .form-control {
      width:600px;
      height:75px;
      font-size:20px;
      display: inline;
    }

    #sform {
          display: inline-block;
          text-align: center;
        }


</style>
