<template>
  <div class="wrapper">
    <div class="info">
      <img v-if="song.al_pic" :src="song.al_pic" alt="" />
      <div class="text">
        <span class="name">{{ song.name }}</span
        ><span class="artist">{{ song.s_singer }}</span>
      </div>
    </div>
    <div class="control">
      <div class="prev"><i class="iconfont icon-shangyishou"></i></div>
      <div class="play" @click="clickPlay">
        <i
          class="iconfont"
          :class="isPlay ? 'icon-24gf-pauseCircle' : 'icon-24gf-playCircle'"
        ></i>
      </div>
      <div class="next"><i class="iconfont icon-xiayishou"></i></div>
    </div>
    <div class="progress">
      <div class="progress-bar">
        <div class="pro-btn"></div>
        <!-- <div class="progress__current" :style="{ width: barWidth }"></div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSongUrlApi } from "@/api/info";
import { useEventsBus } from "@/utils/useEmitter";
import { Ref, ref, watch } from "vue";
let isPlay = ref(false);
function clickPlay() {
  isPlay.value = !isPlay.value;
}

interface SongItem {
  name: string;
  s_singer: string;
  s_al: string;
  s_time: string;
  id: number;
  al_pic: string;
}
const song: Ref<SongItem> = ref({
  name: "",
  s_singer: "",
  s_al: "",
  s_time: "",
  id: 0,
  al_pic: "",
});
const { bus } = useEventsBus();
const songUrl = ref("");
watch(
  () => bus.value.get("playSong"),
  (val) => {
    song.value = val[0];
    getSongUrl(song.value.id);
  }
);

async function getSongUrl(sid: number) {
  const res = await getSongUrlApi(sid);
  songUrl.value = res.data[0].url;
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  position: fixed;
  background-color: #fff;
  width: 100%;
  bottom: 43px;
  height: 100px;
  max-width: 1280px;
  border-radius: 0 0 15px 15px;
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 10;
  .info {
    display: flex;
    padding: 0 20px;
    align-items: center;
    img {
      width: 80px;
      height: 80px;
    }
    .text {
      padding-left: 20px;
      .name {
        font: {
          size: 16px;
        }
      }
      .artist {
        display: block;
        font: {
          size: 14px;
        }
        color: lightslategrey;
      }
    }
  }
  .control {
    display: flex;
    align-items: center;
    div {
      padding-left: 20px;
    }
    .iconfont {
      color: red;
      font-size: 25px;
    }
    .play {
      .iconfont {
        font-size: 40px;
      }
    }
  }
  .progress {
    padding-left: 20px;
    .progress-bar {
      width: 500px;
      background-color: #d0d8e6;
      height: 6px;
      border-radius: 10px;
      cursor: pointer;
    }
  }
}
</style>
