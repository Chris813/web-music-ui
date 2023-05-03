<template>
  <div class="main">
    <div class="container">
      <banner />
    </div>
  </div>
</template>

<script setup lang="ts">
import banner from "@components/banner.vue";
</script>

<style scoped lang="scss">
.main {
  margin-top: 0;
  width: 100%;
  .container {
    width: 1150px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 270px;
    position: relative;
    margin: 0 auto;
  }
}
</style>
