import http from "@/utils/http.js";

/**
 * 获取登录用户的购物车列表
 * @param skuId
 * @param count
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getUserCartListAPI = ()=>{
    return http.get('/member/cart',)
}

/**
 * 根据sku对象把购物车数据插入数据库里
 * @param sku 用户对象
 */
export function insertCartAPI(sku){
    return http.post('/member/cart',sku)
}

/**
 * 删除购物车商品
 * @param ids
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function deleteCartAPI(ids){
    return http.delete('/member/cart/', {data:{ids}})
}

/**
 * 合并购物车
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function mergeCartAPI(data){
    return http.post('/member/cart/merge',data)
}

/**
 *
 * @param id
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateCartAPI(id,data){
    return http.put(`/member/cart/${id}`,data)

}