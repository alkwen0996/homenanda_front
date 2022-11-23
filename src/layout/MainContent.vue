<template>
  <div class="home">
    <div style="height: 50px"></div>
    <MainMap></MainMap>
    <div style="height: 50px"></div>
    <NewsContent style="z-index: 0"></NewsContent>
    <div style="height: 50px"></div>
    <div style="display: flex">
      <div style="width: 10%"></div>
      <MainBoard style="width: 37%"></MainBoard>
      <div style="width: 6%"></div>
      <MainQnA style="width: 37%"></MainQnA>
      <div style="width: 10%"></div>
    </div>
    <div style="height: 50px"></div>
    <MainChatBot id="front" style="z-index: 1"></MainChatBot>
  </div>
</template>

<script>
import MainMap from "@/pages/components/main/MainMap.vue";
import NewsContent from "@/pages/components/main/NewsContent.vue";
import MainQnA from "@/pages/components/main/MainQnA.vue";
import MainBoard from "@/pages/components/main/MainBoard.vue";
import MainChatBot from "@/pages/components/main/MainChatBot.vue";

export default {
  name: "MainContent",

  data() {
    return {};
  },
  components: { MainChatBot, MainMap, NewsContent, MainQnA, MainBoard },

  mounted() { },

  methods: {},
};
</script>

<style scoped>
#front {
  z-index: 5;
}
</style>
