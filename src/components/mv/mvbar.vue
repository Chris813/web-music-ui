<template>
        <div class="mv">
            <div class="card" v-for="item in mv" key="item">
                <div class="count">{{ formatCount(item.playCount) }}</div>
                <img class="image" :src="item.cover" alt="">
                <div class="name">{{ item.name }}-{{ item.artistName }}</div>
            </div>
        </div>
</template>

<script setup lang="ts">
import { Ref, onBeforeUpdate, onUpdated, ref } from "vue";
import {MvItem} from "../../utils/types"
import {formatCount} from '../../utils/fommater';
interface Props {
    mv:Ref<MvItem[]>;
}
const prop=defineProps<Props>();
console.log(prop);
let mv:Ref<MvItem[]>=ref([]);

onBeforeUpdate(()=>{
    mv=prop.mv;
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