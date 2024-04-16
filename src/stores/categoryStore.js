import {ref, onMounted} from 'vue'
import { defineStore } from 'pinia'
import {getCateGoryApi} from "@/apis/layout.js";

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref([]);//初始化为空数组
// 定义一个获取这个列表的方法 ,异步，需要调用接口，分类
  const getCategorys = async ()=>{
    let res = (await getCateGoryApi()).result
    //给我们可爱的空数组赋值，我们下面就可以用了，因为const是给常量复制，所以下面我们用到value
    categoryList.value = res
  }
// 组件加载的时候我们就获取这个列表
  onMounted(()=>getCategorys())

  return { categoryList,getCategorys }
})
