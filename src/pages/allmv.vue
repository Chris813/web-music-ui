<template>
    <div class="operation">
        <div class="area">
            <div class="title">地区:</div>
            <div class="content">
            <div class="item" :class="{active:activeAreaIndex==index}" v-for="(item,index) in areaList" :key="item" @click="handleAreaSelect(index)">
            <div class="text">{{ item }}</div>
            <span>|</span>
            </div>
            </div>
        </div>
        <div class="order">
        <div class="title">排序:</div>
        <div class="content">
            <div class="item" :class="{active:activeOrderIndex==index}" v-for="(item,index) in orderList" :key="item" @click="handleOrderSelect(index)">
             <div class="text">{{ item }}</div>
            <span>|</span></div>
        </div>
    </div>
    </div>
    <div class="content" v-show="loading"><mvbar :mv="mvList">MV</mvbar></div>
    <div v-show="!loading">Loading...</div>
    
</template>

<script setup lang="ts">
import { getAllMvApi } from "@/api/info";
import { Ref, onMounted, ref, watch } from 'vue';
import {MvItem} from "@/utils/types"
import mvbar from "@components/mv/mvbar.vue";

const areaList=["全部","内地","港台","欧美","日本","韩国"];
const orderList=["上升最快","最热","最新"];
const activeAreaIndex=ref(0);
const activeOrderIndex=ref(0);
const loading=ref(false);
function handleAreaSelect(index: number) {
    activeAreaIndex.value = index;
}
function handleOrderSelect(index: number) {
    activeOrderIndex.value = index;
}
const mvList:Ref<MvItem[]>=ref([]);
async function getMvList(){
    
    const out=await getAllMvApi(areaList[activeAreaIndex.value],orderList[activeOrderIndex.value]);
    mvList.value=out.data;
    loading.value=true;
}
watch([activeAreaIndex,activeOrderIndex],()=>{
    loading.value=false;
    getMvList();
})
onMounted(()=>{
    getMvList();
})
</script>

<style scoped lang="scss">
.operation{
    display: flex;
    border-bottom: 1px solid #ddd;
    flex-direction: column;
    .area,.order{
        margin-right: 20px;
       display: flex;
       align-items: center;
       margin-bottom: 20px;
        .title{
            font-size: 15px;
            padding-right: 20px;
        }
        .content{
            display: flex;
            flex-wrap: wrap;
            .item{
                display: flex;
                font-size: 14px;
                color: #999;
                cursor: pointer;
                .text{
                    border-radius: 5px;
                    margin: 0 10px;
                    padding: 0 5px;
                    &:hover{
                    background-color: #ddd;
                }
                }
               
               
            }
            .active{
                .text{
                    background-color: #ddd;
                }
                }
        }
    }
}

</style>