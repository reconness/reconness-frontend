import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueApexCharts from 'vue3-apexcharts'

createApp(App).use(store).use(router).use(VueApexCharts).mount('#app')
