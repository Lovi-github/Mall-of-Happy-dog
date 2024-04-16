<script>
import LayoutNav from "@/views/Layout/components/LayoutNav.vue";
import LayoutHeader from "@/views/Layout/components/LayoutHeader.vue";
import LayoutFooter from "@/views/Layout/components/LayoutFooter.vue";
import LayoutFixed from "@/views/Layout/components/LayoutFixed.vue";

export default {
  name: "index.vue",
  components: {LayoutFixed, LayoutFooter, LayoutHeader, LayoutNav}
}
</script>

<template>
  <layout-fixed></layout-fixed>
  <LayoutNav></LayoutNav>
  <LayoutHeader></LayoutHeader>
<!--和路由配合，这里是展示首页，说白了就是展示当前页的子组件  -->
  <router-view></router-view>
  <LayoutFooter></LayoutFooter>

</template>

<style scoped>

</style>