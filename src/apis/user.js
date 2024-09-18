import http from "@/utils/http.js";

/**
 * 用户登录，传入user对象
 * @param user
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function loginAPI(user){
    return http.post('/login',user);
}

/**
 * @description: 获取用户可能喜欢的商品列表
 * @param {{ limit = 4 }}
 * @return {*}
 */
export const getLikeListAPI = ({ limit = 4 }) => {
    return http.get('/goods/relevant',{params:{limit}});
}