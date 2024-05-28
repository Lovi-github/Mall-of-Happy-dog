import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {getCateGoryApi} from "@/apis/layout.js";
import {useIntersectionObserver} from "@vueuse/core";
import {lazyImgLoading} from "@/directives/index.js";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyImgLoading)

app.mount('#app')
