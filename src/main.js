import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import PrimeVue from 'primevue/config'
import VueApexCharts from 'vue3-apexcharts'
import ToastService from 'primevue/toastservice'
import Reconness from './plugins/reconness'
import 'bootstrap'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.min.css'
import 'material-icons/iconfont/material-icons.css'
import Popper from 'popper.js'

axios.defaults.baseURL = `http://${process.env.VUE_APP_API_RECONNES_HOST}/api`
Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false

createApp(App).use(store).use(router).use(PrimeVue).use(VueApexCharts).use(ToastService).use(Reconness).mount('#app')
