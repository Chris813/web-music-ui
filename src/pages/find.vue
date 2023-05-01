<template>
  <my-nav></my-nav>
  <div class="main">
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import MyNav from "@components/nav.vue";
</script>

<style scoped lang="scss">
.main {
  width: 100%;
}
</style>
