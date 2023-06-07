<template>
    <div class="card-item">
        <el-skeleton style="width: 240px" :loading="loading" animated></el-skeleton>
<div class="img"></div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props= defineProps({
    loading:Boolean,
})
const loading=ref(props.loading)
</script>

<style scoped>

</style>