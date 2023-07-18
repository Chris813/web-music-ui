<template>
     <div class="wrapper">
        <mvtitle>超级面对面</mvtitle>
        <mvbar :mv="dujia"></mvbar>
    </div>
</template>

<script setup lang="ts">
import mvbar from "@components/mv/mvbar.vue";
import mvtitle from "@components/mv/mvtitle.vue";
import {getDujiaMvApi} from "@/api/info";
import {MvItem} from "@/utils/types"
import { Ref, onMounted, ref, } from "vue";
let dujia:Ref<MvItem[]>=ref([]);
const getDujiaMv=async ()=>{
    const out =await getDujiaMvApi();
    console.log(out);
    dujia.value=out.data
}
onMounted(()=>{
    getDujiaMv();
})

</script>

<style scoped>
</style>