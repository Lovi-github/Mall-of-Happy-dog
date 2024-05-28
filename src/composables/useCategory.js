import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {getCategoryByIdAPI} from "@/apis/category";

export function useCategory(){
    const categoryData = ref({})
    const route = useRoute()
    const getCategory = async (id) => {
        // 如何在setup中获取路由参数 useRoute() -> route 等价于this.$route
        //console.log(route.params.id);
        const res = await getCategoryByIdAPI(id)
        categoryData.value = res.result
    }
    /*方式2 钩子函数*/
    onMounted(()=>getCategory(route.params.id))
    //路由改变的时候执行id的精确更新
    onBeforeRouteUpdate((to)=>{
        getCategory(to.params.id)
    })
    return{
        categoryData
    }
}