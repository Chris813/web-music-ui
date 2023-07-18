<template>
    <my-nav :menu-list="menuList"></my-nav>
    <KeepAlive
    ><div class="main"><div class="wrapper"><RouterView></RouterView></div></div
  ></KeepAlive>
</template>

<script setup lang="ts">
import MyNav from "@components/nav.vue";
const menuList=[
  { title: "MV 精选", name: "mvjingxuan" },
  { title: "网易独家", name: "special" },
  { title: "全部MV", name: "allmv" },
];
</script>

<style scoped>
.main {
  margin-top: 0;
  width: 100%;
  position: relative;
  top: 60px;
  overflow: scroll;
  height: 100%;
  .wrapper{
    width: 98%;
    margin: 20px auto;
}
}
</style>