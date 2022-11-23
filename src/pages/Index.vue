<template>
  <div>
    <div class="page-header clear-filter" filter-color="white">
      <parallax class="page-header-image" style="background-image: url('img/house.jpg')">
      </parallax>
      <div class="container">
        <div class="content-center brand">
          <h1 class="h1-seo">HOME</h1>
          <h1 class="h1-seo"><img class="n-logo" src="img/logo.png" alt="logo" />ANDA</h1>
          <h2 class="h2-seo">우리집은 어디에</h2>
        </div>
        <!-- <h4 class="category category-absolute">
          Designed by
          <a href="http://invisionapp.com/" target="_blank">
            </a>Team 9 이민수 오의석 정지은
        </h4> -->
      </div>
    </div>
    <MainContent></MainContent>
    <!--   
    <div class="section">
      <div class="container text-center">
        <div class="row justify-content-md-center">
          <div class="col-md-12 col-lg-8">
            <h2 class="title">컴포넌트 들어갈 자리</h2>
            <h5 class="description">
              집 구하자
            </h5>
          </div>
        </div>
      </div>
    </div>
     -->
  </div>
</template>

<script>
import { Parallax } from "@/components";
import MainContent from "@/layout/MainContent.vue";

export default {
  name: "index",
  bodyClass: "index-page",
  components: {
    Parallax,
    MainContent,
  },
};
</script>
<style></style>
