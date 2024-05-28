
//定义图片懒加载指令,并导出
import {useIntersectionObserver} from "@vueuse/core";

export const lazyImgLoading = {
    install(app){
        /*图片懒加载*/
        app.directive('img-lazy',{
            //el:指令绑定元素 img
            //binding:binding.value 指令=后面表达式的值 图片url
            mounted(el,binding){
                //定位到懒加载的元素，对图片url进行懒加载
                // console.log(el,binding.value)
                //判断图片是否在视口区域（能看见的区域）
                const {stop} = useIntersectionObserver(
                    el,
                    ([{isIntersecting}])=>{
                        //isIntersecting的值：能看见就是true，不能为false
                        // console.log(isIntersecting)
                        if(isIntersecting){
                            el.src = binding.value;
                            stop();
                        }

                    }
                )
            }
        })
    }
}
