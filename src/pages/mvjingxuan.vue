<template>
    <div class="wrapper">
        <div class="zuixin">
        <mvtitle>最新MV</mvtitle>
        <mvbar :mv="zuixin"></mvbar>
    </div>
    <div class="paihang">
        <mvtitle>推荐MV</mvtitle>
        <mvbar :mv="paihang"></mvbar>
    </div>
</div>
    
</template>

<script setup lang="ts">
import mvbar from "@components/mv/mvbar.vue";
import mvtitle from "@components/mv/mvtitle.vue";
import {getZuixinMvApi,getPaihangMvApi} from "@/api/info";
import {MvItem} from "@/utils/types"
import { Ref, nextTick, onMounted, ref, watch } from "vue";
let zuixin:Ref<MvItem[]>=ref([]);
const getZuixinMv=async ()=>{
    const out =await getZuixinMvApi(8);
    console.log(out);
    zuixin.value=out.data
}
let paihang:Ref<MvItem[]>=ref([]);
const getTuijianMv=async ()=>{
    const out =await getPaihangMvApi();
    console.log(out);
    paihang.value=out.data
}
onMounted(()=>{
    getZuixinMv();
    getTuijianMv();
})


</script>

<style scoped lang="scss">


</style>