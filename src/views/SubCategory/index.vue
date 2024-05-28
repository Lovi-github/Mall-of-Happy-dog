<script setup>

import {useRoute} from "vue-router";
import {getCategoryFilterAPI, getSubCategoryAPI} from "@/apis/category.js";
import GoodsItem from "@/views/Home/components/GoodsItem.vue";

// 获取面包屑导航数据
const filterData = ref({})
const route = useRoute();
const getFilterData = async (id) => {
  const res = await getCategoryFilterAPI(id)
  filterData.value = res.result
}
onMounted(() => getFilterData(route.params.id))
// console.log("==二级分类数据==")
// console.dir(filterData)
// 获取二级分类商品
const goodList = ref([])
/*响应式请求对象*/
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  /*根据发布时间排序*/
  sortField: 'publishTime'
})
const getGoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  goodList.value = res.result.items
}
onMounted(() => getGoodList())


// tab切换回调
const tabChange = () => {
  // console.log('tab切换了', reqData.value.sortField)
  reqData.value.page = 1
  getGoodList()
}
const disabled = ref(false)
//实现加载更多数据
const load = async () => {
  reqData.value.page++
  //打印加载的页数
  console.log("加载页"+reqData.value.page)
  const res = await getSubCategoryAPI(reqData.value)
  //新请求的数据res.result.items拼接上原来的goodList数据
  goodList.value = [...goodList.value, ...res.result.items]

  /*没数据了就禁用重复加载，停止监听*/
  if(res.result.items.length===0){
    disabled.value = true
  }
}


</script>

<template>
  <div class="top-container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <!--一级分类信息-->
        <el-breadcrumb-item :to="{ path: `/category/${filterData.parentId}` }">{{filterData.parentName}}
        </el-breadcrumb-item>
        <!--二级分类信息-->
        <el-breadcrumb-item>{{filterData.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>

  <div class="container sub-container" >
    <div class="tag">
      <!--tab-->
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
    </div>
    <!--v-infinite-scroll为无限滚动，当滚动到距离底部100px时触发load函数-->
    <!--绑定：:infinite-scroll-disabled="disabled" 意思就是禁止无限滚动，disabled就是我们自己定义的flag值-->
    <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">

      <!-- 商品列表-->
      <GoodsItem v-for="good in goodList" :good="good" :key="good.id"></GoodsItem>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.top-container{
  width: 1240px;
  margin: 0 auto;
  position: relative;
  /*面包屑*/
  .bread-container {
    padding: 25px 0;
    color: #666;
  }
}


.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>