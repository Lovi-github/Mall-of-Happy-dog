import http from "@/utils/http.js";

export function getCateGoryApi(){
    return http.get('/home/category/head')
}


