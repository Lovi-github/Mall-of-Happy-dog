<script setup>

import {getBannerAPI} from "@/apis/home.js";
//创建响应式轮播图数据
const bannerList = ref([])
//定义异步请求后端接口的方法
const getBanners = async ()=>{
  bannerList.value = (await getBannerAPI()).result
}
onMounted(()=>getBanners())

// console.dir(bannerList)
</script>

<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="轮播图">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang='scss'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>