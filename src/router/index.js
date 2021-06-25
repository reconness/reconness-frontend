import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/agent/list',
    name: 'Agents',
    component: () => import('../views/AgentsListMiniView.vue')
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
    path: '/targets/details/:idTarget/rootdomain-details/:id',
    name: 'RootDomainDetails',
    component: () => import('../views/RootDomainDetailsView.vue')
  },
  {
    path: '/targets/details/:idTarget/rootdomain-details/:id/subdomain-details/:idsubdomain',
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
    component: () => import('../views/Notifications.vue')
  },
  {
    path: '/login',
    name: 'LogIn',
    component: () => import('../views/LogIn.vue')
  },
  {
    path: '/logout',
    name: 'LogOut',
    redirect: { name: 'LogIn' }
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
