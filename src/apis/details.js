import http from "@/utils/http.js";

/**
 * 获取商品详情的方法
 * @param id 商品id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getDetailAPI(id){
    return http.get("/goods",{params:{id}});
}

/**
 * 获取热榜商品
 * @param {Number} id - 商品id
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜
 * @param {Number} limit - 获取个数
 */
export const getHotGoodsAPI = ({ id, type, limit = 3 }) => {
    return http.get('/goods/hot',{params:{
            id,
            type,
            limit
        }});
}