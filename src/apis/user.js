import http from "@/utils/http.js";

/**
 * 用户登录，传入user对象
 * @param user
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function loginAPI(user){
    return http.post('/login',user);
}