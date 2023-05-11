<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="name" label="歌曲名" width="180" />
    <el-table-column prop="s_singer" label="歌手" width="180" />
    <el-table-column prop="s_al" label="专辑名" />
    <el-table-column prop="s_time" label="时间" />
    <el-table-column label="Operations">
      <template #default="scope">
        <a href="#">收藏</a>
        <a href="#">下载</a>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { formatDuration } from "@/utils/fommater";
interface PropItem {
  name: string;
  ar: { name: string; id: number }[];
  al: { name: string; id: number };
  id: number;
  dt: number;
}
interface Props {
  tracks: PropItem[];
}
const props = defineProps<Props>();
interface SongItem {
  name: string;
  s_singer: string;
  s_al: string;
  s_time: string;
}
const tableData: SongItem[] = [];

props.tracks.forEach((item, index) => {
  const temp = {
    name: item.name,
    s_al: item.al.name,
    s_time: formatDuration(item.dt),
    s_singer: "",
  };
  //把每首歌曲的歌手名拼接成一个字符串
  if (item.ar.length > 1) {
    temp.s_singer = item.ar.map((item) => item.name).join("/");
  } else {
    temp.s_singer = item.ar[0].name;
  }
  tableData[index] = temp;
});
console.log(tableData);
</script>

<style scoped></style>
