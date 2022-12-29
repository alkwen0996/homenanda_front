<template>

<div class="modal modal-alert position-static d-block deleteuser" tabindex="-1" role="dialog" id="modalChoice">
  
  <div class="modal-dialog" role="document">
    
    <div class="modal-content rounded-3">

      <div class="modal-body p-5 text-center">
        <h2 class="mb-0">정말 탈퇴하시겠습니까?</h2>
      </div>

      <div class="modal-footer flex">
        <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 rounded-0 border-end" @click="remove"><strong>Yes, enable &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></button>
        <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 rounded-0" data-bs-dismiss="modal" @click="goBack"><strong>No thanks</strong></button>
      </div>

    </div>

  </div>

</div>

</template>

<script>
import { mapActions, mapGetters } from "vuex";

const memberStore = "memberStore";

export default {
  name: "UserDelete",
  data() {
    return {
      userId: null
    }
  },
  computed: {
    ...mapGetters(memberStore, ["checkUserInfo", "isLogin", "userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userRemove", "userLogout"]),
    async remove() {
      console.log('userId: ' + this.checkUserInfo.userId)
      await this.userRemove({
        userId: this.checkUserInfo.userId,
      });

      this.userLogout(this.checkUserInfo.userId);
      sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
      sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기

      this.$router.push("/");
    },

    goBack() {
      this.$router.push("/user/mypage").catch(() => { });
    },
  },
}
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
        height: 3rem;
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

      .deleteuser {
        padding-top : 17rem !important;
        padding-bottom: 17rem !important;
      }

      .modal-content
      .modal-footer {
        justify-content: space-evenly !important;
      }
</style>