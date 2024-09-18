import http from "@/utils/http.js";

/**
 * 结算页生成订单
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function checkOutOrderAPI() {
    return http.get('/member/order/pre')
}

/**
 * 添加地址
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function addAddressAPI(data) {
    return http.post('/member/address', data)
}

/**
 * 创建订单
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const createOrderAPI = (data) => {
    return http.post('/member/order',data)
}
/**
 *  获取支付订单详情接口
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getOrderPayInfoAPI = (id) => {
    return http.get(`/member/order/${id}`);
}

/**
 * @description: 获取用户相关的订单数据
 * @params: {
 *   orderState:0,
 *   page:1,
 *   pageSize:2
 * }
 * @return {*}
 */
export const getUserOrder = (params) => {
    return http.get('/member/order', {params:params});
}