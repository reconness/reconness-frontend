import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VuelidatePlugin } from '@vuelidate/core'
import PrimeVue from 'primevue/config'

createApp(App).use(store).use(router).use(VuelidatePlugin).use(PrimeVue).mount('#app')
