<template>
  <b-tr>
    <b-td>{{ articleId }}</b-td>
    <b-th class="text-left">
      <router-link :to="{ name: 'BoardDetail', params: { articleId: articleId } }">{{ subject }}</router-link>
    </b-th>
    <b-td>{{ hit }}</b-td>
    <b-td>{{ userId }}</b-td>
    <b-td>{{ createdDate | dateFormat }}</b-td>
  </b-tr>
</template>

<script>
import moment from "moment";

export default {
  name: "BoardListItem",
  props: {
    articleId: Number,
    userId: String,
    subject: String,
    content: String,
    hit: Number,
    createdDate: String,
  },
  filters: {
    dateFormat(createdDate) {
      return moment(new Date(createdDate)).format("YY.MM.DD");
    },
  },
};
</script>

<style></style>
