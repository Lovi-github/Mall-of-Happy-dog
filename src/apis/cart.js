import http from "@/utils/http.js";

/**
 * 获取要添加到购物车的商品列表
 * @param skuId
 * @param count
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getAddCartListAPI = ({skuId,count})=>{
    return http.post('/member/cart',{skuId,count})
}
