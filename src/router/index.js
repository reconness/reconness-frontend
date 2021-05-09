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
    component: () => import('../views/AgentsListView.vue')
  },
  {
    path: '/targets/list',
    name: 'Targets',
    component: () => import('../views/TargetsListView.vue')
  },
  {
    path: '/targets/details/:id',
    name: 'TargetDetail',
    component: () => import('../views/TargetsDetailsView.vue')
  },
  {
    path: '/targets/details/:idTarget/rootDomainDetails/:id',
    name: 'RootDomainDetails',
    component: () => import('../views/RootDomainDetailsView.vue')
  },
  {
    path: '/targets/details/:idTarget/rootDomainDetails/:id/subDomainDetails/:idsubdomain',
    name: 'SubDomainDetails',
    component: () => import('../views/SubDomainDetailsView.vue')
  },
  {
    path: '/pipelines/list',
    name: 'Pipelines',
    component: () => import('../views/PipelinesListView.vue')
  },
  {
    path: '/pipelines/details/:id',
    name: 'PipelineDetail',
    component: () => import('../views/PipelineDetailsView.vue')
  },
  {
    path: '/logs',
    name: 'Logs',
    component: () => import('../views/Logs.vue')
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('../views/Logs.vue')
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
