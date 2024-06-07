import {loginAPI} from "@/apis/user.js";
import {useCartStore} from "@/stores/cartStore.js";

export const useUserStore = defineStore('user', () => {
    // 1. 定义管理用户数据的state
    const userInfo = ref({})
    const cartStore = useCartStore()
    // 2. 定义获取接口数据的action函数
    const getUserInfo = async (user) => {
        const res = await loginAPI(user)
        userInfo.value = res.result
        //从数据库中拿到最新的购物车数据
        await cartStore.updateCartList()
    }
    // 退出时清除用户信息
    const clearUserInfo = () => {
        userInfo.value = {}
    }
    // 3. 以对象的格式把state和action return
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},{
    // 开启持久化
    persist: true
})