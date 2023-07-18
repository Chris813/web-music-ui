<template>
    <div class="title">
            <div class="text"><slot></slot></div>
            <div class="more" @click="gotoAll">更多 ></div>
        </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router=useRouter();
function gotoAll(){
    router.push({
        name:"allmv"
    })
}
</script>

<style scoped>
 .title{
        display: flex;
        justify-content: space-between;
        .text{    
        &::before{
        content: '';
        background-color: red;
        height: 20px;
        width: 3px;
        display: inline-block;
        vertical-align: sub;
        margin-right: 5px;
        }
        }
        .more{
            color: #999;
            font-size: 12px;
        }
    }
</style>