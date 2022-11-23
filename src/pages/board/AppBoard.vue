<template>
  <div>
    <h1>게시판 보기</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "AppBoard",
}
</script>

<style>
.underline-hotpink {
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(231, 27, 139, 0.3) 30%);
}
</style>