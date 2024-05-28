<script setup>
import {useCategory} from "@/composables/useCategory.js";
import GoodsItem from "@/views/Home/components/GoodsItem.vue";
import {useBanner} from "@/composables/useBanner.js";
const {categoryData} = useCategory();
const {bannerList} = useBanner();

</script>

<template>
  <!--顶部面包屑和轮播图-->
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <!--路由会给我们提供id，我们需要根据id绑定，然后显示那个文字，也就是分类名字-->
          <el-breadcrumb-item >{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--轮播图-->
      <div class="home-banner">
        <el-carousel height="500px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src="item.imgUrl" alt="轮播图">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
  <div class="good-list">
    <!-- 分类产品图片 -->
    <div class="sub-list">
      <h3>全部分类</h3>
      <ul>
        <li v-for="i in categoryData.children" :key="i.id">
          <RouterLink :to="`/category/sub/${i.id}`">
            <img :src="i.picture" />
            <p>{{ i.name }}</p>
          </RouterLink>
        </li>
      </ul>
    </div>
    <!-- 分类产品列表 -->
    <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
      <div class="head">
        <h3>- {{ item.name }}-</h3>
      </div>
      <div class="body">
        <GoodsItem v-for="good in item.goods" :good="good" :key="good.id" />
      </div>
    </div>
  </div>

</template>
  
<style scoped lang="scss">
/*一整个顶部，包括了轮播图面包屑和*/
.top-category {
  display: flex;
  flex-direction: column; /* 如果希望内容垂直堆叠 */


  /*面包屑*/
  .bread-container {
    padding: 25px 0;
  }

  /*轮播图*/
  .home-banner {
    width: 1240px;
    height: 500px;
    img {
      width: 100%;
      height: 500px;
    }
  }
}
.sub-list {
  justify-content: space-around;
  //margin-top: 20px;
  margin:0 auto;
  background-color: #fff;

  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  ul {
    display: flex;
    padding: 0 32px;
    /*水平居中*/
    //justify-content: center;
    /*可以让子元素在父元素中均匀分布，第一个和最后一个子元素分别紧贴父元素的起始和结束位置。*/
    justify-content: space-between;
    //flex-wrap: wrap;//当行不够位置允许换行

    li {
      width: 168px;
      height: 160px;


      a {
        text-align: center;
        display: block;
        font-size: 16px;

        img {
          width: 100px;
          height: 100px;
        }

        p {
          line-height: 40px;
        }

        &:hover {
          color: $xtxColor;
        }
      }
    }
  }
}
/*商品列父元素*/
.good-list{
  width: 1240px;
  margin: 0 auto;/*让商品详情居中*/
  position: relative;
}
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;

  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }

    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }

  .body {
    display: flex;
    justify-content: space-around;
    padding: 0 40px 30px;
  }
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
}
</style>