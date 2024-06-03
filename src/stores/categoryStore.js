import {getCateGoryApi} from "@/apis/layout.js";

/**
 * 关于defineStore('category'的'category'
 * 标识符：'category'是这个store的唯一标识，它在应用中用于识别和访问这个特定的store。
 * 在Vue组件中，可以通过useStore('category')来获取这个store实例。
 */
export const useCategoryStore = defineStore('category', () => {
    const categoryList = ref([]);//初始化为空数组
// 定义一个获取这个列表的方法 ,异步，需要调用接口，分类
    const getCategorys = async () => {
        let res = (await getCateGoryApi()).result
        //给我们可爱的空数组赋值，我们下面就可以用了，因为const是给常量复制，所以下面我们用到value
        categoryList.value = res
    }
// 组件加载的时候我们就获取这个列表
    onMounted(() => getCategorys())

    return {categoryList, getCategorys}
})
