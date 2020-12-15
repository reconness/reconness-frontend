import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AgentsListMiniView from '../views/AgentsListMiniView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/agent/list',
    name: 'Agents',
    component: AgentsListMiniView
  },
  {
    path: '/agents/list',
    name: 'Agent',
    component: () => import(/* webpackChunkName: "about" */ '../views/AgentsListView.vue')
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
