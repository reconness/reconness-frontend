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
    path: '/agents',
    name: 'Agent',
    component: () => import('../views/AgentsListView.vue')
  },
  {
    path: '/targets',
    name: 'Targets',
    component: () => import('../views/TargetsListView.vue')
  },
  {
    path: '/target',
    name: 'TargetDetail',
    component: () => import('../views/TargetsDetailsView.vue'),
    props: true
  },
  {
    path: '/target/rootdomain',
    name: 'RootDomainDetails',
    component: () => import('../views/RootDomainDetailsView.vue'),
    props: true
  },
  {
    path: '/target/rootdomain/subdomain',
    name: 'SubDomainDetails',
    component: () => import('../views/SubDomainDetailsView.vue'),
    props: true
  },
  {
    path: '/pipelines',
    name: 'Pipelines',
    component: () => import('../views/PipelinesListView.vue')
  },
  {
    path: '/pipeline',
    name: 'PipelineDetail',
    component: () => import('../views/PipelineDetailsView.vue'),
    props: true
  },
  {
    path: '/pipeline/run',
    name: 'PipelineRunView',
    component: () => import('../views/PipelineRunView.vue'),
    props: true
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
