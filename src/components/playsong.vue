<template>
  <div class="wrapper" v-if="songUrl">
    <div class="info">
      <img :src="song.al_pic" alt="" />
      <div class="text">
        <span class="name">{{ song.name }}</span
        ><span class="artist">{{ song.s_singer }}</span>
      </div>
    </div>
    <div class="control">
      <div class="prev" @click="clickPrev">
        <i class="iconfont icon-shangyishou"></i>
      </div>
      <div class="play" @click="clickPlay">
        <i
          class="iconfont"
          :class="isPlay ? 'icon-24gf-pauseCircle' : 'icon-24gf-playCircle'"
        ></i>
      </div>
      <div class="next" @click="clickNext">
        <i class="iconfont icon-xiayishou"></i>
      </div>
    </div>
    <div class="progress">
      <span class="time" v-if="song.id"
        >{{ currentTime }}/{{ song.s_time }}</span
      >
      <div class="progress-bar">
        <div class="pro-btn"></div>
        <div class="progress__current" :style="{ width: barWidth }"></div>
      </div>
    </div>
    <div class="btn">
      <div class="volume"><i class="iconfont icon-yinliang"></i></div>
      <div class="tracklist"><i class="iconfont icon-musiclist"></i></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSongUrlApi } from "@/api/info";
import { useEventsBus } from "@/utils/useEmitter";
import { emit } from "process";
import { Ref, ref, watch } from "vue";

const audio: Ref<HTMLAudioElement> = ref(new Audio());

const barWidth = ref("0");
const circleLeft = ref("");
const currentTime = ref("00:00");
function generateTime() {
  if (audio) {
    let width = (100 / audio.value.duration) * audio.value.currentTime;
    barWidth.value = width + "%";
    circleLeft.value = width + "%";
    let curmin = Math.floor(audio.value.currentTime / 60);
    let cursec = Math.floor(audio.value.currentTime - curmin * 60);
    currentTime.value =
      String(curmin).padStart(2, "0") + ":" + String(cursec).padStart(2, "0");
  }
}
function resetAudio() {
  barWidth.value = "0";
  currentTime.value = "00:00";
  if (songUrl.value !== "") {
    audio.value.src = songUrl.value;
    audio.value.ontimeupdate = () => {
      generateTime();
    };
    audio.value.onloadedmetadata = () => {
      generateTime();
    };
  }
  setTimeout(clickPlay, 200);
}

let isPlay = ref(false);
function clickPlay() {
  if (isPlay.value) {
    //正在播放
    console.log("pause");
    audio.value.pause();
  } else {
    console.log("play");
    audio.value.play();
  }
  isPlay.value = !isPlay.value;
  console.log(isPlay.value);
}

function clickPrev() {}

function clickNext() {}

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
    //切换，如果当前正在放歌就暂停
    if (song.value.id) {
      audio.value.pause();
      isPlay.value = false;
    }
    song.value = val[0];
    getSongUrl(song.value.id);
  }
);
async function getSongUrl(sid: number) {
  const res = await getSongUrlApi(sid);
  songUrl.value = res.data[0].url;
  // isPlay.value = true;
  resetAudio();
}
</script>

<style scoped lang="scss">
.wrapper {
  transition: all 2s;
  display: flex;
  align-items: center;
  position: fixed;
  background-color: #fff;
  width: 100%;
  bottom: 43px;
  height: 100px;
  max-width: 1280px;
  border-radius: 0 0 15px 15px;
  backdrop-filter: blur(15px);
  background-color: rgba(255, 255, 255, 0.75);
  z-index: 10;
  .info {
    display: flex;
    padding: 0 20px;
    align-items: center;
    img {
      width: 70px;
      height: 70px;
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
    padding-left: 50px;
    position: relative;
    .time {
      position: absolute;
      right: -100px;
      top: -10px;
      color: #71829e;
      font-weight: 500;
    }
    .progress-bar {
      width: 600px;
      background-color: #d0d8e6;
      height: 6px;
      border-radius: 10px;
      cursor: pointer;
      .progress__current {
        background-color: darkred;
        height: inherit;
        border-radius: 10px;
      }
    }
  }
  .btn {
    display: flex;
    padding-left: 220px;
    align-items: center;
    .iconfont {
      font-size: 32px;
      color: #71829e;
    }
    .volume {
      padding-right: 10px;
      .iconfont {
        font-size: 26px;
      }
    }
  }
}
</style>
