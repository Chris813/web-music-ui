<template>
  <div class="p-title">
    <el-skeleton style="width: 240px" :loading="loading" animated>
      <template #template>
        <el-skeleton-item
          variant="image"
          style="width: 180px; height: 180px; border-radius: 6px"
        />
      </template>
      <template #default>
        <div class="p-img"><img :src="pDetail.coverImgUrl" alt="" /></div>
      </template>
    </el-skeleton>

    <el-skeleton style="width: 240px" :loading="loading" animated>
      <template #template>
        <el-skeleton-item variant="h2" style="width: 100%" />
        <el-skeleton-item variant="text" />
        <el-skeleton-item variant="text" />
        <el-skeleton-item variant="text" />
        <el-skeleton-item variant="text" />
      </template>
      <template #default>
        <div class="detail">
          <div class="title">{{ pDetail.name }}</div>
          <div class="create">
            <span class="c-time">{{ formatDate(pDetail.createTime) }}创建</span>
          </div>
          <div class="btn"></div>
          <div class="tags">
            <div class="tag" v-for="(item, index) in pDetail.tags" :key="index">
              <a href="#">{{ item }}</a>
            </div>
          </div>
          <div class="p-num">
            歌曲：<span>{{ pDetail.trackCount }}</span
            >播放：<span>{{ formatCount(pDetail.playCount) }}</span>
          </div>
          <div class="p-des">
            <div class="des">简介：{{ pDetail.description }}</div>
            <div class="toggle-button" @click="toggleDes"></div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
  <div class="tracks">
    <div class="nav">
      <a
        class="menu-link"
        v-for="(item, index) in playNav"
        :class="{ current: activeIndex === index }"
        :key="index"
        @click="handleSelect(index)"
        >{{ item.title }}</a
      >
    </div>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { useRoute } from "vue-router";
import { getPlaylistDetailApi } from "@/api/info";
import { ta } from "element-plus/es/locale";
import router from "@/router";
const route = useRoute();

function formatDate(time: any): string {
  let date = new Date(time);

  let YY = date.getFullYear();
  let MM =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

  // 这里修改返回时间的格式
  return YY + "-" + MM + "-" + DD;
}
function formatCount(count: number): string {
  if (count > 9999) {
    return (count / 10000).toFixed(1) + "万";
  } else {
    return count.toString();
  }
}

interface songItem {
  name: string;
  ar: { name: string; id: number }[];
  al: { name: string; id: number }[];
  id: number;
  publishTime: number;
}

interface playlistItem {
  name: string;
  coverImgUrl: string;
  createTime: number;
  trackCount: number;
  subscribedCount: number;
  description: string;
  tags: string[];
  tracks: songItem[];
  playCount: number;
}
let pDetail: Ref<playlistItem> = ref({
  name: "",
  coverImgUrl: "",
  createTime: 0,
  trackCount: 0,
  subscribedCount: 0,
  description: "",
  tags: [],
  tracks: [],
  playCount: 0,
});
let loading = ref(true);
async function getPlaylistDetail() {
  const res = await getPlaylistDetailApi(Number(route.params.id));
  if (res.code === 200) {
    pDetail.value = res.playlist;
    loading.value = false;
    console.log(pDetail.value);
  }
}
function toggleDes(event: Event) {
  const btn = event.target as HTMLElement;
  btn.classList.toggle("expanded");
  btn.parentElement?.children[0].classList.toggle("expanded");
}
const playNav = [
  { title: "歌曲列表", name: "tracks" },
  { title: "评论", name: "comments" },
  { title: "收藏者", name: "subscribers" },
];
let activeIndex = ref(0);
function handleSelect(index: number) {
  if (index !== activeIndex.value) {
    activeIndex.value = index;
    router.push({
      path: `${route.fullPath}/${playNav[index].name}`,
    });
  }
}

getPlaylistDetail();
</script>

<style scoped lang="scss">
.p-title {
  width: 100%;
  padding-top: 20px;
  display: flex;
  .p-img {
    padding-left: 20px;
    img {
      width: 180px;
      height: 180px;
      border-radius: 6px;
    }
  }
  .detail {
    padding-left: 20px;
    text-align: start;
    span {
      color: rgb(75, 73, 73);
    }
    font: {
      size: 0.8rem;
    }
    .title {
      font: {
        size: 1.2rem;
        weight: 600;
      }
      padding-bottom: 10px;
    }
    .create {
      padding-bottom: 10px;
    }
    .tags {
      display: flex;
      padding-bottom: 10px;
      .tag {
        background-color: rgba($color: #000000, $alpha: 0.4);
        margin-left: 10px;
        border-radius: 20px;
        padding: 2px 10px;
        a {
          color: #fff;
        }
      }
    }
    .p-num {
      span {
        padding-right: 10px;
      }
      padding-bottom: 10px;
    }
    .p-des {
      position: relative;
      .des {
        width: 800px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &.expanded {
          white-space: normal;
        }
      }

      .toggle-button {
        cursor: pointer;
        position: absolute;
        top: 5px;
        right: -50px;
        width: 0;
        height: 0;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-top: 7px solid #000;
        transition: transform 0.4s;
        &.expanded {
          transform: rotate(180deg);
          transform-origin: center;
        }
      }
    }
  }
}
.tracks {
  padding-top: 20px;

  .nav {
    display: flex;
    padding-left: 20px;
    a {
      margin-right: 25px;
      color: #424141;
      padding-bottom: 5px;
      font: {
        size: 1rem;
        weight: 300;
      }
      &.current {
        font: {
          size: 1.2rem;
          weight: 500;
        }
        border-bottom: 2px solid red;
      }
    }
  }
}
</style>
