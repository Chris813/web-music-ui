<template>
  <my-nav :menu-list="menuList"></my-nav>
  <KeepAlive
    ><div class="main"><RouterView></RouterView></div
  ></KeepAlive>
</template>

<script setup lang="ts">
import MyNav from "@components/nav.vue";
const menuList=[
  { title: "推荐", name: "recommend" },
  { title: "歌单", name: "gedan" },
  { title: "搜索", name: "search" },
];
</script>

<style scoped lang="scss">
.main {
  margin-top: 0;
  width: 100%;
  position: relative;
  top: 60px;
  height: 100%;
  overflow-y: scroll;
}
</style>
