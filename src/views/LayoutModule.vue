<template>
  <div class="body">
    <div class="header">
        <el-button size="large"  @click="goPage('pic2pdf')">图片转PDF</el-button>
    </div>
        
    <div class="content">
        <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView, useRouter } from 'vue-router'
// import { useColorStore } from '@/stores/color';
const router = useRouter()
// const colorStore = useColorStore()
const goPage = (pageName) => {
    router.push({ name: pageName })
}
</script>

<style lang="scss">
.body{
    .header{
        height: 80px;
        background-color: var(--pink);
        padding: 0 40px;
        display: flex;
        align-items: center;
    }
    .content{
        height: calc(100vh - 80px);
        background-color: #fff;
    }
}
</style>