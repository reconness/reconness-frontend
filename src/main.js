import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import PrimeVue from 'primevue/config'
import VueApexCharts from 'vue3-apexcharts'
import Reconness from './plugins/reconness'
import 'bootstrap'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.min.css'
import 'material-icons/iconfont/material-icons.css'
import Popper from 'popper.js'
import '@hennge/vue3-pagination/dist/vue3-pagination.css'

axios.defaults.baseURL = `https://${process.env.VUE_APP_API_RECONNES_HOST}/api`
Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false

const app = createApp(App)

app.directive('clickOutside', {
  beforeMount (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
})

if (localStorage.getItem('token')) {
  axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token')
}

app.use(store).use(router).use(PrimeVue).use(VueApexCharts).use(Reconness).mount('#app')
