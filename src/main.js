import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VuelidatePlugin } from '@vuelidate/core'
import PrimeVue from 'primevue/config'
import VueApexCharts from 'vue3-apexcharts'
import 'bootstrap'

createApp(App).use(store).use(router).use(VuelidatePlugin).use(PrimeVue).use(VueApexCharts).mount('#app')
