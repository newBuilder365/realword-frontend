import { createApp } from 'vue'
import App from './App.vue'
import moment from 'moment'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import { store, key } from './store'
import '@/styles/index.scss'

const app = createApp(App)

app.config.globalProperties.$moment = moment

app.use(store, key).use(router).use(ElementPlus).mount('#app')
