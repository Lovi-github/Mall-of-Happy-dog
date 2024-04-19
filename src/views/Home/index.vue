<script>
import HomeCategory from "@/views/Home/components/HomeCategory.vue";
import HomeBanner from "@/views/Home/components/HomeBanner.vue";
import HomeNew from "@/views/Home/components/HomeNew.vue";
import HomeHot from "@/views/Home/components/HomeHot.vue";
import HomeProduct from "@/views/Home/components/HomeProduct.vue";

export default {
  name: "index.vue",
  components: {HomeProduct, HomeHot, HomeNew, HomeBanner, HomeCategory}
}
</script>


<template>
<!--  左侧分类与轮播图-->
<div class="container">
  <HomeCategory></HomeCategory>
  <HomeBanner></HomeBanner>
</div>
<!--  新鲜好物-->
  <HomeNew></HomeNew>
<!--  人气推荐-->
  <HomeHot></HomeHot>
<!--  产品列表-->
  <HomeProduct></HomeProduct>

</template>

<style scoped>

</style>