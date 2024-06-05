/**
 * 购物车，显然涉及到多组件还有持久化，需要pinia
 * 逻辑：
 *
 */

export const useCartStore = defineStore(
    /*名字*/
    'cart',
    /*函数*/
    ()=>{
        const cartList = ref([])
        /*加入购物车*/
        //1. 用户点击加入购物车按钮，就能加入购物车，因此参数是goodDetail（多个商品）
        const addCart = (goodDetail)=>{
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
        /*删除购物车*/
        const delCart = (skuId)=>{
            //找到要删除的项目的下标
            const index = cartList.value.findIndex((item)=>skuId === item.skuId)
            //删除对应下标的一位
            cartList.value.splice(index,1)
        }
        //购物车商品总数
        //(a, c) => a + c.count, 0)
        //a:累加器，c：遍历的元素是，这里我们给累加器的初始值为0
        const allCount = computed(
            () =>cartList.value.reduce((a, c) => a + c.count, 0))
        //购物车总价格
        const allPrice = computed(()=>cartList.value.reduce((a,c)=>a+c.count*c.price,0))
        return{
            addCart,
            cartList,
            delCart,
            allPrice,
            allCount
        }
    },
    {
        /*持久化*/
        persist:true
    }


)