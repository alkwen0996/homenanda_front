<template>
  <b-container class="bv-example-row mt-3">

    <div class="py-5 text-center">
      <img class="d-block mx-auto mb-4" src="img/qna.png" style="width:120px; height:120px">
      <h1><b>질문게시판</b></h1>
    </div>

    <div class="regist-board">
      <qna-input-item type="register" />
    </div>
  </b-container>

</template>

<script>
import QnaInputItem from "@/components/qna/item/QnaInputItem";

export default {
  name: "QnaWrite",
  components: {
    // eslint-disable-next-line
    QnaInputItem,
  },
};
</script>

<style>

</style>
