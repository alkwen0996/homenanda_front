<template>
  <b-container class="bv-example-row mt-3">
    <div class="py-5 text-center">
      <img class="d-block mx-auto mb-4" src="img/notice.png" style="width:120px; height:120px">
      <h1><b>공지사항</b></h1>
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
            [{{ article.articleId }}] &nbsp; {{ article.subject }}
          </h3>
          <p class="blog-post-meta">{{ article.createdDate }}&nbsp; 작성자 : {{ article.userId }}</p>
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
import { getArticle } from "@/api/board";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "BoardDetail",
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
    let param = this.$route.params.articleId;
    getArticle(
      param,
      ({ data }) => {
        this.article = data;

      },
      (error) => {
        console.log(error);
      },
    );
  },

  methods: {
    moveModifyArticle() {
      this.$router.replace({
        name: "boardmodify",
        params: { articleId: this.article.articleId },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleId}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        this.$router.replace({
          name: "boarddelete",
          params: { articleId: this.article.articleId },
        });
      }
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
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
</style>
