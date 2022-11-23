<template>
  <b-container class="bv-example-row mt-3">
    <div class="py-5 text-center">
      <img class="d-block mx-auto mb-4" src="img/notice.png" style="width:120px; height:120px">
      <h1><b>공지사항</b></h1>
    </div>
    
    <board-input-item type="modify" />
  </b-container>
</template>

<script>
import BoardInputItem from "@/components/board/item/BoardInputItem";

export default {
  name: "BoardModify",
  components: {
    BoardInputItem,
  },
};
</script>

<style></style>
