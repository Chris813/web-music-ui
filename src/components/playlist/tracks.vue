<template>
  <el-table
    :data="tableData"
    ref="singleTableRef"
    highlight-current-row
    @current-change="handleCurrentChange"
    stripe
    style="width: 100%"
  >
    <el-table-column prop="name" label="歌曲名" width="280" />
    <el-table-column prop="s_singer" label="歌手" width="220" />
    <el-table-column prop="s_al" label="专辑名" width="230" />
    <el-table-column prop="s_time" label="时间" width="230" />
    <el-table-column label="操作" width="230">
      <template #default="scope">
        <div class="btn">
          <svg
            t="1683991775445"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1611"
            width="20"
            height="20"
          >
            <path
              d="M908.8 214.4c-9.6-12.8-19.2-22.4-28.8-32-112-115.2-230.4-105.6-342.4-16-9.6 6.4-19.2 16-28.8 25.6-9.6-9.6-19.2-16-28.8-25.6-112-86.4-230.4-99.2-342.4 16-9.6 9.6-19.2 19.2-25.6 32-134.4 195.2-60.8 387.2 137.6 560 44.8 38.4 89.6 73.6 137.6 102.4 16 9.6 32 19.2 44.8 28.8 9.6 6.4 12.8 9.6 19.2 9.6 3.2 3.2 6.4 3.2 12.8 6.4 3.2 3.2 9.6 3.2 16 6.4 25.6 6.4 64 3.2 89.6-12.8 3.2 0 9.6-3.2 16-9.6 12.8-6.4 28.8-16 44.8-28.8 48-28.8 92.8-64 137.6-102.4C969.6 598.4 1043.2 406.4 908.8 214.4zM736 732.8c-41.6 35.2-86.4 70.4-131.2 99.2-16 9.6-28.8 19.2-44.8 25.6-6.4 3.2-12.8 6.4-16 9.6-6.4 3.2-16 6.4-25.6 9.6-3.2 0-6.4 0-9.6 0-6.4 0-12.8 0-16 0-3.2 0-3.2 0-3.2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0-3.2 0-3.2-3.2-3.2 0-6.4-3.2-9.6-3.2-3.2-3.2-9.6-6.4-16-9.6-12.8-6.4-28.8-16-44.8-25.6-44.8-28.8-89.6-60.8-131.2-99.2-179.2-160-243.2-323.2-131.2-489.6 6.4-9.6 16-16 22.4-25.6 89.6-96 182.4-86.4 275.2-12.8 9.6 6.4 16 12.8 22.4 19.2 0 0 0 0 0 0l28.8 32c3.2 3.2 3.2 3.2 6.4 6.4 0 0 0 0 0 0l0 0c3.2-3.2 9.6-9.6 16-16 12.8-12.8 25.6-25.6 41.6-38.4 92.8-73.6 185.6-83.2 275.2 12.8 6.4 9.6 16 16 22.4 25.6C982.4 406.4 918.4 572.8 736 732.8z"
              p-id="1612"
            ></path>
          </svg>

          <svg
            t="1683991793967"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1750"
            width="20"
            height="20"
          >
            <path
              d="M328 576h152V128h64v448h152L512 768 328 576z m568-64h-64v320H192V512h-64v384h768V512z"
              p-id="1751"
            ></path>
          </svg>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { useEventsBus } from "@/utils/useEmitter";
import { formatDuration } from "@/utils/fommater";
import { ElTable } from "element-plus";
import { Ref, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getAllSongApi } from "@/api/info";
const route = useRoute();
const currentRow: Ref<TableItem> = ref({
  name: "",
  s_singer: "",
  s_al: "",
  s_time: "",
  id: 0,
  al_pic: "",
});
const singleTableRef = ref<InstanceType<typeof ElTable>>();
const playId = ref(0);
const { emit } = useEventsBus();
const handleCurrentChange = (val: TableItem) => {
  currentRow.value = val;
  playId.value = val.id;
  emit("playSong", currentRow.value);
};

interface SongItem {
  name: string;
  ar: { name: string; id: number }[];
  al: { name: string; id: number; picUrl: string };
  id: number;
  dt: number;
}
interface TableItem {
  name: string;
  s_singer: string;
  s_al: string;
  s_time: string;
  id: number;
  al_pic: string;
}
const tableData: Ref<TableItem[]> = ref([]);

async function initTableData() {
  let res = await getAllSongApi(Number(route.params.id));
  console.log(res);
  res.songs.forEach((item: SongItem, index: number) => {
    const temp = {
      name: item.name,
      s_al: item.al.name,
      s_time: formatDuration(item.dt),
      s_singer: "",
      id: item.id,
      al_pic: item.al.picUrl,
    };
    //把每首歌曲的歌手名拼接成一个字符串
    if (item.ar.length > 1) {
      temp.s_singer = item.ar.map((item) => item.name).join("/");
    } else {
      temp.s_singer = item.ar[0].name;
    }
    tableData.value[index] = temp;
  });
}
initTableData();
</script>

<style scoped lang="scss">
.btn {
  display: flex;

  align-items: center;
  svg {
    padding-left: 10px;
  }
}
</style>
