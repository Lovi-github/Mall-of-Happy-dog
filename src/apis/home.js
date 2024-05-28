import http from "@/utils/http.js";

/**
 *
 * @param distributionSite 默认=1，为首页的轮播图数据,2为分类商品页
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getBannerAPI(distributionSite='1'){
    return http.get('/home/banner',{params:{distributionSite}});
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
