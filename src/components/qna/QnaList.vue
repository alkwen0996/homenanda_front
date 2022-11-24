<template>
  <div class="container-mt" style="height: 84vh;">
    <div class="py-5 text-center">
      <img class="d-block mx-auto mb-4" src="img/qna.png" style="width:120px; height:120px">
      <h1><b>질문게시판</b></h1>
    </div>
    <b-row>
      <b-col>
        <b-table striped hover :items="articles" :fields="fields" @row-clicked="viewArticle"> </b-table>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-primary" @click="moveWrite()">글쓰기</b-button>
      </b-col>
    </b-row>


        <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">4</a></li>
        <li class="page-item"><a class="page-link" href="#">5</a></li>
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
        </nav>

  </div>
</template>

<script>
import { listQna } from "@/api/qna";

export default {
  name: "QnaList",
  data() {
    return {
      articles: [],
      fields: [
        { key: "articleId", label: "글번호", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "content", label: "내용", tdClass: "tdContent"},
        { key: "userId", label: "작성자", tdClass: "tdClass" },
        { key: "createdDate", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
      ],
    };
  },
  created() {
    let param = {
      pg: 1,
      spp: 20,
      key: null,
      word: null,
    };
    // eslint-disable-next-line
    listQna(
      param,
      ({ data }) => {
        this.articles = data;
      },
      (error) => {
        console.log(error);
      }

  
    );
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "qnawrite" });
    },
    viewArticle(article) {
      this.$router.push({
        name: "qnadetail",
        params: { articleId: article.articleId },
      });
    },
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
</style>
