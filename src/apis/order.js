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

export const getOrderPayInfoAPI = (id) => {
    return http.get(`/member/order/${id}`);
}