import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VuelidatePlugin } from '@vuelidate/core'
import PrimeVue from 'primevue/config'
import VueApexCharts from 'vue3-apexcharts'

createApp(App).use(store).use(router).use(VuelidatePlugin).use(VueApexCharts).use(PrimeVue).mount('#app')