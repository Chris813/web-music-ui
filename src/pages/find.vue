<template>
  <my-nav></my-nav>
  <KeepAlive><RouterView></RouterView></KeepAlive>
</template>

<script setup lang="ts">
import MyNav from "@components/nav.vue";
</script>

<style scoped lang="scss"></style>
