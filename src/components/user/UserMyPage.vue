<template>

  <div>    
      <div class="info-container">

        <form class="info-form">
          <img src="img/user.png" alt="" style="width:200px; height:200px"/>
    
        <h2 class="title">내 정보</h2>
        <br>

        <p class="category">이름</p>

        <div class="content">
          <div class="social-description">
            <input type="text" class="form-control" id="name" placeholder="이름" v-model="userName" value="" required>

        <p class="category">아이디</p>
          </div>
          <div class="social-description">
            <input type="email" class="form-control" id="id" placeholder="아이디" v-model="userId" value="" required>

            <p class="category">비밀번호</p>
          </div>
          <div class="social-description">
            <input type="password" class="form-control" id="password" placeholder="비밀번호" v-model="userPassword" value="" required>

            <p class="category">전화번호</p>
          </div>
          <div class="social-description">
            <input type="text" class="form-control" id="phone" placeholder="핸드폰번호" v-model="phoneNumber" value="" required>
          </div>

          <div class="gap-2 d-md justify-content-md">
          <button class="btn btn-primary me-md-2" type="button" @click="userUpdate"><b>정보수정</b></button>
          <button class="btn btn-primary" type="button" @click="userDelete"><b>회원탈퇴</b></button>
          </div>
        </div>

      </form>

      <span class="border">
      <div class="card text-center">

        <nav class="navbar navbar-light bg-dark">
          <div class="container">
        <div class="favorite">
          <button type="button" class="btn btn-secondary btn-lg" @click="goFavoriteArea">관심지역</button> 
        </div>
          <b style="color: white;">|</b>
          <div class="favorite">
          <button type="button" class="btn btn-secondary btn-lg"  @click="goFavoriteBuilding">관심건물</button>
          
        </div>
        </div>
        </nav>
        </div>
      </span>


      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "UserMyPage",
  components: {
  },
  data() { 
    return {
      userId: null,
      userName: null,
      userPassword: null,
      phoneNumber: null
    }
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    this.setUser()
  },
  methods: {
    ...mapActions(memberStore, ["updateUserInfo"]),
    goFavoriteArea() {
      this.$router.push("/user/area").catch(() => { });
    },
    goFavoriteBuilding() {
      this.$router.push("/user/building").catch(() => { });
    },
    async userUpdate() {
      await this.updateUserInfo({
        userId: this.userId,
        userName: this.userName,
        userPassword: this.userPassword,
        phoneNumber: this.phoneNumber
      });

      this.$router.push("/");
    },
    userDelete() {
      this.$router.push("/user/delete").catch(() => { });
    },
    setUser() {
      this.userName = this.userInfo.userName;
      this.userId = this.userInfo.userId;
      this.phoneNumber = this.userInfo.phoneNumber;
    }
  }
};
</script>

<style>
  .info-container {
    padding-top: 3rem;
  }

  .info-form {
    text-align: center;
  }

  .form-control {
      width:600px;
      height:50px;
      font-size:20px;
      display: inline;
    }

  .favorite{
    text-align: center;
  }

  .container {
    max-width: 1000px !important;
  }

  .navbar {
    margin-bottom: 0px !important;
  }
</style>
