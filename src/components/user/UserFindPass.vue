<template>
  
  <div class="py-5 text-center" >
        <card type="login" plain>
            

      <div class="py-5 text-center">
      <img class="d-block mx-auto mb-4" src="img/findpass.png" style="width:250px; height:150px">
      <h1><b>비밀번호 재설정</b></h1>
      <p class="lead"><b>아래 정보 입력 후 인증 메일 받기를 클릭하세요.</b></p>
      </div>

            <h4>이름</h4>
            <fg-input class="no-border input-lg" placeholder="아이디">
            </fg-input>

            <br>
            <h4>아이디</h4>
            <fg-input class="no-border input-lg" placeholder="비밀번호">
            </fg-input>

            <template slot="raw-content">
              <div class="card-footer text-center">
                <a href="" id="loginButton" class="btn btn-primary btn-round btn-lg" >인증메일 받기</a>
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
import { Card, Button, FormGroupInput } from '@/components';

export default {
  name: "UserFindPass",
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
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