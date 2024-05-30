//components中的组件全局化注册
import ImageView from "@/components/ImageView/index.vue"
import Sku from "@/components/sku/index.vue"
//插件方式
export const componentPlugin = {
    install(app){
        // app.component('组件名字'，组件配置对象)
        app.component('ImageView',ImageView)
        app.component('Sku',Sku)
    }
}