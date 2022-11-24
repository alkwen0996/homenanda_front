<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
      
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label"><b>제목</b></label>
        <input type="text" class="form-control form-control-lg" 
        id="exampleFormControlInput1" 
        v-model="article.subject"
          required placeholder="제목 입력...">
      </div>
      
      <div class="mb-5">
        <label for="exampleFormControlTextarea1" class="form-label"><b>내용</b></label>
        <textarea class="form-control form-control-lg" 
        id="exampleFormControlTextarea1" v-model="article.content"
          placeholder="내용 입력..." rows="10" max-rows="15"></textarea>
      </div>
      <hr class="my-5">
      
      <b-button type="submit" variant="dark" class="m-1" v-if="this.type === 'register'" >글작성</b-button>
      <b-button type="submit" variant="dark" class="m-1" v-else>글수정</b-button>
      <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { modifyArticle, getArticle } from "@/api/board";
import { mapActions, mapState } from "vuex";

const memberStore = "memberStore";
const boardStore = "boardStore";

export default {
  name: "BoardInputItem",
  data() {
    return {
      article: {
        articleId: 0,
        userId: null,
        subject: null,
        content: null,
        type: 'article',
      },
      isuserId: false,
    };
  },
  props: {
    type: { type: String },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    // if (this.type === "modify") {
      let param = this.$route.params.articleId;
      getArticle(
        param,
        ({ data }) => {
          // this.article.articleId = data.article.articleId;
          // this.article.userId = data.article.userId;
          // this.article.subject = data.article.subject;
          // this.article.content = data.article.content;
          this.article = data;
        },
        (error) => {
          console.log(error);
        }
      );
      this.isuserId = true;
    // }
    
  },
  methods: {
    ...mapActions(boardStore, ["writeArticle"]),
    async onSubmit(event) {
      event.preventDefault();

      this.article.userId = this.userInfo.userId;
      console.log(this.article.userId);
      console.log(this.article.subject);
      console.log(this.article.type);
      console.log(this.type);

      let err = true;
      let msg = "";
      !this.article.userId && ((msg = "작성자 입력해주세요"), (err = false), this.article.userId.focus());
      err && !this.article.subject && ((msg = "제목 입력해주세요"), (err = false), this.article.subject.focus());
      err && !this.article.content && ((msg = "내용 입력해주세요"), (err = false), this.article.content.focus());

      if (!err) alert(msg);
      else this.type === "register" ? this.registArticle() : this.modifyArticle();
    },
    onReset(event) {
      event.preventDefault();
      this.article.subject = "";
      this.article.content = "";
      this.article.type = "article";
      this.moveList();
    },
    registArticle() {
      let param = {
        userId: this.article.userId,
        subject: this.article.subject,
        content: this.article.content,
        type: this.article.type,
      };
      this.writeArticle(
        param,
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        },
        (error) => {
          console.log(error);
        }
      );

      this.$router.push({name: "boardlist" });
    },
    modifyArticle() {
      let param = {
        articleId: this.article.articleId,
        userId: this.article.userId,
        subject: this.article.subject,
        content: this.article.content,
      };
      modifyArticle(
        param,
        ({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data.message === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          // 현재 route를 /list로 변경.
          this.moveList();
        },
        (error) => {
          console.log(error);
        }
      );

      this.$router.push({ name: "boardlist" });
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
    },
  },
};
</script>

<style></style>
