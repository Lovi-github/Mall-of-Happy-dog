import http from "@/utils/http.js";

/**
 * 结算页生成订单
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function createOrderAPI() {
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