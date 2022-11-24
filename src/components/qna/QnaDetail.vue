<template>
  <b-container class="bv-example-row mt-3">
    <div class="py-5 text-center">
      <img class="d-block mx-auto mb-4" src="img/qna.png" style="width:120px; height:120px">
      <h1><b>질문게시판</b></h1>
    </div>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="moveList">목록</b-button>
      </b-col>

    </b-row>
    <hr class="my-5">

    <div class="row">
      <div class="col">

        <article class="blog-post">
          <h3 class="blog-post-title">
            [{{ article.articleno }}] &nbsp; {{ article.subject }}
          </h3>
          <p class="blog-post-meta">{{ article.regtime }}&nbsp; 작성자 : {{ article.userId }}</p>
          <hr class="my-0">
          <hr class="my-0">
          <h4>{{ article.content }}</h4>

        </article>

      </div>


    </div>

    <hr class="my-5">
    <b-col class="text-right">
      <b-button variant="outline-primary" @click="moveModifyArticle" class="mr-2">글수정</b-button>
      <b-button variant="outline-primary" @click="deleteArticle" class="mr-2">글삭제</b-button>
    </b-col>

  </b-container>
</template>

<script>
// import moment from "moment";
// import { getQna } from "@/api/qna";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "QnaDetail",
  data() {
    return {
      article: {},
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    message() {
      if (this.article.content) return this.article.content.split("\n").join("<br>");
      return "";
    },
  },
  created() {
    // let param = this.$route.params.articleno;
    this.article = {
      articleno: 1,
      subject: "바보",
      content: "안녕하세요",
      userId: "정지은",
      regtime: '2022.11.24 14:42',
      hit: '1'
    }
  },
  methods: {
    moveModifyArticle() {
      this.$router.replace({
        name: "qnamodify",
        params: { articleno: this.article.articleno },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        this.$router.replace({
          name: "qnadelete",
          params: { articleno: this.article.articleno },
        });
      }
    },
    moveList() {
      this.$router.push({ name: "qnalist" });
    },
  },
  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style>

</style>

