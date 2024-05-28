import http from "@/utils/http.js";

/**
 *  根据id获取具体的分类数据
 */
export function getCategoryByIdAPI(id){
    return http.get('/category',{params:{id}});
}

/**
 * 二级分类对象信息
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getCategoryFilterAPI(id){
    return http.get('/category/sub/filter',{params:{id}});
}

/**
 * 获取二级分类商品列表
 * @param data 【参数的新用法】
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getSubCategoryAPI = (data) => {
    return http.post('/category/goods/temporary',data);
}