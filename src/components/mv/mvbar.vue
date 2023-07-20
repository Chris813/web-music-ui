<template>
        <div class="mv">
            <div class="card" v-for="(item,index) in mv" :key="index" @click="playMv(index)">
                <div class="count">{{ formatCount(item.playCount) }}</div>
                <img class="image" :src="item.cover" alt="">
                <div class="name">{{ item.name }}-{{ item.artistName }}</div>
            </div>
        </div>
</template>

<script setup lang="ts">
import { Ref, onBeforeUpdate,ref } from "vue";
import {MvItem} from "../../utils/types"
import {formatCount} from '../../utils/fommater';
import { useRouter } from "vue-router";
interface Props {
    mv:MvItem[];
}
const router=useRouter();
const prop=defineProps<Props>();
console.log(prop);
let mv:Ref<MvItem[]>=ref([]);
function playMv(index:number){
    router.push({
        name:"video",
        params: {
            id: mv.value[index].id,
        }
    })
}
onBeforeUpdate(()=>{
    mv.value=prop.mv;
})
</script>

<style scoped lang="scss">

   
    .mv{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        .card{
            width: 260px;
            margin: 10px;
            padding: 0;
            position: relative;
            .count{
            position: absolute;
            top: 5px;
            right: 5px;
            color: #fff;
            font-size: 12px;
            background-color: alpha($color: #000000);
        }
            .image{
                width: 100%;
                height: 150px;
            }
            .name{
                font-size: 12px;
                color: #999;
                margin-top: 5px;
            }
        }
    }
</style>