<template>
    <div class="wrapper">
      <card
        v-for="(item, index) in playList"
        :key="index"
        :loading="loading"
        @click="clickPlaylist(index)"
      >
        <template #img
          ><img style="width: 140px" :src="item.coverImgUrl" alt=""
        /></template>
        <template #text>
          <div class="aname">{{ item.name }}</div>
          <div class="creator">{{ item.creator.nickname }}</div>
        </template>
      </card>
      <el-pagination layout="prev, pager, next" :total="1000" @next-click="handleClick" @prev-click="handleClick" @current-change="handleClick"/>
    </div>
  </template>
  
  <script setup lang="ts">
  import { getPlaylistApi, getSearchDataApi, getTopSonglistApi } from "@/api/info";
  import { PlayList } from "@/utils/types";
  import card from "@components/card.vue";
  import { Ref, inject, ref } from "vue";
  import { useRouter } from "vue-router";
  const loading = ref(true);

  const playList: Ref<Array<PlayList>> = ref([]);
  async function getTopSonglist(offset:number=0) {
    const res = await getTopSonglistApi(offset);
    playList.value = res.playlists;
    loading.value = false;
  }
  
  getTopSonglist();

  const handleClick=(number)=>{
    getTopSonglist(number-1)
  }
  const router = useRouter();
  function clickPlaylist(index: number) {
    console.log(playList.value[index].id);
    router.push({
      name: "tracks",
      params: {
        id: playList.value[index].id,
      },
    });
  }
  </script>
  
  <style scoped lang="scss">
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 20px 0 60px 0;
  
    .aname {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: black;
      font: {
        weight: 500;
        size: 16px;
      }
    }
    .creator:hover {
      text-decoration: underline;
    }
  }
  </style>