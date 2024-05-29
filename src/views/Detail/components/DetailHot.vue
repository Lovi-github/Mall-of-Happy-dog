<script setup>
import { useRoute } from 'vue-router'
import {getHotGoodsAPI} from "@/apis/details.js";

const goodList = ref([])
const route = useRoute()
/*设置props接收传递过来的值*/
const props = defineProps({
  hotType: {
    type: Number
  }
})
/*设置数字对应的map*/
const typeMap = {
  1: '24小时热榜',
  2: '周热榜',
}
/*计算属性直接返回字符串*/
const title = computed(() => {
  return typeMap[props.hotType]
})
const getHotList = async () => {
  const res = await getHotGoodsAPI({
    id: route.params.id,
    type: props.hotType /*需要计算属性*/
  })
  goodList.value = res.result
}
onMounted(()=>getHotList())
</script>


<template>
  <div class="goods-hot">
    <h3> {{ title }} </h3>
    <!-- 商品区块 -->
    <RouterLink :to="`/detail/${item.id}`" class="goods-item" v-for="item in goodList" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>


<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

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
}
</style>