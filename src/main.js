import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {getCateGoryApi} from "@/apis/layout.js";

const app = createApp(App)
// getCateGoryApi().then(res=>{
//     console.log(res)
// })
app.use(createPinia())
app.use(router)

app.mount('#app')
