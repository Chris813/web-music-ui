<template>
  <div class="aside-menu">
    <div class="his-menu">
      <div class="btn btn_pre" :passive="!canGoBack" @click="goBack">
        <i class="iconfont icon-left"></i>
      </div>
      <div class="btn btn_next" :passive="!canGoForward" @click="goForward">
        <i class="iconfont icon-right"></i>
      </div>
    </div>
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
import { vLoading } from "element-plus";
import { ref, computed, onMounted, onUpdated } from "vue";
import { useRoute, useRouter } from "vue-router";

let router = useRouter();
let activeIndex = ref(0);
const menuList = [
  { icon: "icon-faxian", title: "发现",name:"recommend"},
  { icon: "icon-bofangMV", title: "MV",name:"mvjingxuan"},
  // { icon: "icon-yinle", title: "我的" },
  // { icon: "icon-zhanghao", title: "账号" },
];
function handleSelect(index: number) {
  activeIndex.value = index;
  router.push({
    name: menuList[index].name,
  });
}
const route = useRoute();
function freshNav(fullPath){
  console.log(fullPath);
  if(fullPath==="/"||fullPath==="/recommend"){
    activeIndex.value=0;
  }else if(fullPath==="/mv/mvjingxuan"){
    activeIndex.value=1;
  }
  console.log(activeIndex.value);
  // if(menuList[activeIndex.value].name!==router.currentRoute.value.name){
  //   activeIndex.value=menuList.findIndex((item)=>item.name===router.currentRoute.value.name);
  // }
};

onMounted(() => {
  console.log("nav mounted");
  console.log(route.fullPath);
  freshNav(route.fullPath);
});
onUpdated(() => {
  console.log("nav updated");
  freshNav(route.fullPath);
});
let canGoBack = computed(() => {
  return router.currentRoute.value.matched.length > 1;
});
let canGoForward = computed(() => {});
const goBack = () => {
  console.log(router.currentRoute.value.matched);
  router.back();
};

const goForward = () => {
  router.go(1);
};
</script>

<style scoped lang="scss">
.aside-menu {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid var(--el-menu-border-color);
  position: relative;
  .his-menu {
    position: absolute;
    top: 0;
    left: 50%;
    display: flex;
    transform: translate(-50%, 100%);
    .btn {
      &.btn_pre {
        padding-right: 20px;
      }
      &.passive {
        color: rgba(0, 0, 0, 0.4);
      }
    }
  }
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
