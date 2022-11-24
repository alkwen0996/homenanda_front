<template>
  
  <div class="py-5 text-center" >
        <card type="login" plain>
            

      <div class="py-5 text-center">
      <img class="d-block mx-auto mb-4" src="img/findpass.png" style="width:250px; height:150px">
      <h1><b>비밀번호 재설정</b></h1>
      <p class="lead"><b>아래 정보 입력 후 인증 메일 받기를 클릭하세요.</b></p>
      </div>

            <h4>이름</h4>
            <fg-input class="no-border input-lg" placeholder="이름" v-model="userName">
            </fg-input>

            <br>
            <h4>아이디</h4>
            <fg-input class="no-border input-lg" placeholder="아이디" v-model="userId">
            </fg-input>

            <template slot="raw-content">
              <div class="card-footer text-center">
                <button id="loginButton" class="btn btn-primary btn-round btn-lg" @click="sendPasswordMail">인증메일 받기</button>
              </div>

              <br>
              <!-- <div class="pull">
                <div>
                <h5>
                  <a href="" class="link footer-link">아이디 찾기</a>
                  &nbsp;
                  <a href="" class="link footer-link">비밀번호 찾기</a>
                </h5>
              </div>
              </div> -->

            </template>
          </card>
        </div>

</template>

<script>
import { mapActions } from "vuex";
import { Card, Button, FormGroupInput } from '@/components';

const memberStore = "memberStore";

export default {
  name: "UserFindPass",
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  },
  data() {
    return {
      userId: null,
      userName: null
    }
  },
  methods: {
    ...mapActions(memberStore, ["userFindPassword"]),
    async sendPasswordMail() { 
      await this.userFindPassword({
        userId: this.userId,
        userName: this.userName
      });

      this.$router.push("/");
    }
  },
}
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