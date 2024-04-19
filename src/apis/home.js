import http from "@/utils/http.js";

export function getBannerApi(){
    return http.get('/home/banner')
}

export const getNewAPI = () => {
    return http.get('/home/new')
}

/**
 * 人气爆款
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getHotApi(){
    return http.get('/home/hot')
}

export const getHotAPI = () => {
    return http.get('/home/hot')
}

export function getGoodsApi(){
    return http.get('/home/goods')
}