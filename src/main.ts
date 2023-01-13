import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-message-box.css';
import 'element-plus/es/components/notification/style/css'

// /*declare module 'vue' {
//     interface ComponentCustomProperties {
//         $echarts: typeof echarts
//     }
// }*/

const app = createApp(App)

// app.config.globalProperties.$echarts = echarts
// app.component('Echarts', ECharts)
app.use(router)
app.mount('#app')
