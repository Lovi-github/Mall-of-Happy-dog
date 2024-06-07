/**
 * 购物车，显然涉及到多组件还有持久化，需要pinia
 * 逻辑：
 *
 */
import {useUserStore} from "@/stores/userStore.js";
import {deleteCartAPI, getUserCartListAPI, insertCartAPI} from "@/apis/cart.js";

export const useCartStore = defineStore(
    /*名字*/
    'cart',
    /*函数*/
    ()=>{
        const cartList = ref([])
        const userStore = useUserStore();
        //判断是否登录
        // isLogin 是一个计算属性，它返回的是 userStore.userInfo.token 的值
        const isLogin = computed(()=>userStore.userInfo.token)
        //更新购物车列表（未登录和登录的购物车数据合在一起）
        const updateCartList = async ()=>{
            const res = await getUserCartListAPI()
            cartList.value = res.result
        }
        /*加入购物车*/
        //1. 用户点击加入购物车按钮，就能加入购物车，因此参数是goodDetail（多个商品）
        const addCart = async (goodDetail)=>{
            //如果登录了
            if(isLogin.value){
                //先把当前购物车的数据插入到数据库里
                await insertCartAPI(goodDetail)
                //查询到数据库中的购物车数据
                await updateCartList()
            }else{
                //2. 判断当前商品是否已经在购物车里,findGoodInCart为找到的符合条件的购物车数据项
                const findGoodInCart = cartList.value.find(item=>item.skuId===goodDetail.skuId)
                if(findGoodInCart){
                    //3. 如果在，就数量+1
                    findGoodInCart.count ++
                }else {
                    //4. 如果不在，就添加到购物车里
                    cartList.value.push(goodDetail)
                }
            }
        }
        /*删除购物车*/
        const delCart = async (skuId)=>{
            // 登录后删除的话是删除购物车里的数据
            if(isLogin.value){
                console.log("删除的skuId")
                console.log([skuId])
                await deleteCartAPI([skuId])
                await updateCartList()
            }else {
                //找到要删除的项目的下标
                const index = cartList.value.findIndex((item)=>skuId === item.skuId)
                //删除对应下标的一位
                cartList.value.splice(index,1)
            }

        }
        /*实现全选的方法*/
        const checkAll = (selected)=>{
            //把cartList每一项都设置成全选状态
            cartList.value.forEach(item=>item.selected = selected)
        }
        //登录退出后，清空当前购物车
        const clearCart = ()=>{
            cartList.value = []
        }
        //购物车商品总数
        //(a, c) => a + c.count, 0)
        //a:累加器，c：遍历的元素是，这里我们给累加器的初始值为0
        const allCount = computed(
            () =>cartList.value.reduce((a, c) => a + c.count, 0))
        //购物车总价格
        const allPrice = computed(()=>cartList.value.reduce((a,c)=>a+c.count*c.price,0))
        //判断是否全选的计算属性，every会比较每一项是不是都为selected
        const isAllSelected = computed(()=>cartList.value.every(item=>item.selected))
        //计算已经勾选的购物车商品总件数
        const checkedCount = computed(()=>cartList.value.filter(item=>item.selected)
            .reduce((a,c)=>a+c.count,0))
        //计算已经勾选的购物车总价格
        const checkedPrice = computed(()=>cartList.value.filter(item=>item.selected)
            .reduce((a,c)=>a+c.count*c.price,0))


        return{
            addCart,
            cartList,
            delCart,
            allPrice,
            allCount,
            isAllSelected,
            checkAll,
            checkedPrice,
            checkedCount,
            updateCartList,
            clearCart
        }
    },
    {
        /*持久化*/
        persist:true
    }


)