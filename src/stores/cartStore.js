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
        const addCart = async (goodDetail)=>{
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
        return{
            addCart,
            cartList

        }
    },
    {
        /*持久化*/
        persist:true
    }


)