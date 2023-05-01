<template>
  <div class="aside-menu">
    <div
      class="menu-link"
      v-for="(item, index) in menuList"
      :class="{ iconfont: true, active: activeIndex === index }"
      :key="index"
      @click="handleSelect(index)"
    >
      <div class="icon"><i :class="item.icon"></i></div>
      <div class="text">{{ item.title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

let activeIndex = ref(0);
const menuList = [
  { icon: "icon-faxian", title: "发现" },
  { icon: "icon-bofangMV", title: "MV" },
  { icon: "icon-yinle", title: "我的" },
  { icon: "icon-zhanghao", title: "账号" },
];
function handleSelect(index: number) {
  activeIndex.value = index;
}
</script>

<style scoped lang="scss">
.aside-menu {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid var(--el-menu-border-color);
  .menu-link {
    display: flex;
    flex-direction: column;
    padding: 20px;
    font-size: 4px;
    .icon {
      font-size: 35px;
      padding-bottom: -5px;
    }
    &.active,
    &:hover {
      color: var(--el-color-menu-active);
    }
  }
}
</style>
