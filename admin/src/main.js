import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
//i18n
import CN from 'element-plus/lib/locale/lang/zh-cn'

createApp(App).use(ElementPlus, {
    'locale' : CN
}).use(router).mount('#app')
