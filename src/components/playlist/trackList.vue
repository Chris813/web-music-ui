<template>
  <div class="t-title">
    <h3>当前播放</h3>
    <div class="c-wrapper">
      <span>总{{ trackData.length }}首</span>
      <div class="control">
        <div class="shoucang">
          <i class="iconfont icon-shoucang"></i>收藏全部
        </div>
        <div class="clear">清空列表</div>
      </div>
    </div>
  </div>
  <div class="list-wrapper">
    <ul>
      <li v-for="(item, index) in trackData" :key="index">
        <div class="info">
          <div class="text">
            <span class="name">
              {{ item.name }}
            </span>
            <span class="singer">-{{ item.s_singer }}</span>
          </div>

          <div class="delete"><i class="iconfont icon-shanchu2"></i></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from "vue";
interface SongItem {
  name: string;
  s_singer: string;
  s_al: string;
  s_time: string;
  id: number;
  al_pic: string;
}
const trackData: Ref<SongItem[]> = ref([]);
interface Prop {
  tracks: SongItem[];
}
const props = defineProps<Prop>();
trackData.value = props.tracks;
watch(props, () => {
  trackData.value = props.tracks;
});
</script>

<style scoped lang="scss">
.t-title {
  position: fixed;
  border-bottom: 1px solid #d0d8e6;
  margin: 0 10px;
  width: 430px;
  h3 {
    text-align: initial;
  }
  .c-wrapper {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 15px;
      color: lightgray;
    }
    .control {
      display: flex;
      align-items: center;
      padding-left: 10px;
      cursor: pointer;
      .shoucang {
        padding-right: 10px;
      }
      .clear {
        color: var(--el-color-primary);
      }
    }
  }
}
.list-wrapper {
  padding-top: 85px;
  ul {
    overflow: hidden auto;
    height: 598px;
    margin-bottom: 0;
    padding: 0 20px;
    li {
      list-style: none;
      border-bottom: 1px solid #d0d8e6;
      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        .text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .singer {
            font-size: 14px;
            color: #999ea5;
          }
        }
      }
    }
  }
}
</style>
