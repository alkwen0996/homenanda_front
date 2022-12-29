<template>
  <b-tr>
    <b-td>{{ articleId }}</b-td>
    <b-th class="text-left">
      <router-link :to="{ name: 'qnadetail', params: { articleId: articleId } }">{{ subject }}</router-link>
    </b-th>
    <b-td>{{ hit }}</b-td>
    <b-td>{{ userId }}</b-td>
    <b-td>{{ regtime | dateFormat }}</b-td>
  </b-tr>
</template>

<script>
import moment from "moment";

export default {
  name: "QnaListItem",
  props: {
    articleId: Number,
    userId: String,
    subject: String,
    content: String,
    hit: Number,
    regtime: String,
  },
  filters: {
    dateFormat(regtime) {
      return moment(new Date(regtime)).format("YY.MM.DD");
    },
  },
};
</script>

<style></style>
