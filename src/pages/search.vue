<template>
  <div class="s-wrapper">
    <div class="title">搜索“{{ route.query.keyword }}”</div>
    <div class="s-nav">
      <div
        v-for="(item, index) in snav"
        :key="index"
        class="item"
        :class="{ active: activeIndex === index }"
        @click="handleSelect(index)"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="s-content">
      <component
        :is="snav[activeIndex].currentCom"
        track-type="search"
      ></component>
      <!-- <tracks ></tracks> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSearchDataApi } from "@/api/info";
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import tracks from "@components/playlist/tracks.vue";
import { formatSongData } from "@/utils/fommater";
import { useSongStore } from "@/stores";
import { useEventsBus } from "@/utils/useEmitter";
const route = useRoute();
const songStore = useSongStore();
const snav = [
  { title: "单曲", currentCom: tracks },
  { title: "专辑", currentCom: "album" },
  { title: "艺人", currentCom: "artist" },
  { title: "歌单", currentCom: "songlist" },
];
async function initSearchData(keyword: string, type: number = 1) {
  songStore.searchSongList = [];
  const res = await getSearchDataApi(keyword);
  formatSongData(res.result.songs, songStore.searchSongList);
}
const activeIndex = ref(0);
function handleSelect(index: number) {
  activeIndex.value = index;
  console.log(snav[activeIndex.value].currentCom);
}

onMounted(() => {
  watch(
    () => route.query.keyword,
    (newval, oldval) => {
      if (!newval) {
        initSearchData(oldval as string);
      } else {
        if (newval !== oldval) {
          initSearchData(newval as string);
        }
      }
    }
  );
  initSearchData(route.query.keyword as string);
});
</script>

<style scoped lang="scss">
.s-wrapper {
  padding: 20px;
  .title {
    text-align: start;
    padding-bottom: 20px;
    font: {
      size: 20px;
      weight: 700;
    }
  }
  .s-nav {
    display: flex;
    align-items: center;
    .item {
      padding: 8px 16px;
      background-color: #f7f8f9;

      //   color: rgb(232, 39, 90);
      //   color: #fff;
      margin-right: 20px;
      border-radius: 20px;
      font-size: 14px;
      &.active {
        background-color: rgb(253, 209, 209);
      }
    }
  }
}
</style>
