import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/SystemHome.vue'),
    meta: {
      guest: false
    }
  },
  {
    path: '/agents',
    name: 'Agent',
    component: () => import('../views/AgentsListView.vue'),
    meta: {
      guest: false
    }
  },
  {
    path: '/targets',
    name: 'Targets',
    component: () => import('../views/TargetsListView.vue'),
    meta: {
      guest: false
    }
  },
  {
    path: '/targets/:targetName',
    name: 'TargetDetail',
    component: () => import('../views/TargetsDetailsView.vue'),
    props: true,
    meta: {
      guest: false
    }
  },
  {
    path: '/targets/:targetName/:rootdomainName',
    name: 'RootDomainDetails',
    component: () => import('../views/RootDomainDetailsView.vue'),
    props: true,
    meta: {
      guest: false
    }
  },
  {
    path: '/targets/:targetName/:rootdomainName/:subdomainName',
    name: 'SubDomainDetails',
    component: () => import('../views/SubDomainDetailsView.vue'),
    props: true,
    meta: {
      guest: false
    }
  },
  {
    path: '/pipelines',
    name: 'Pipelines',
    component: () => import('../views/PipelinesListView.vue'),
    meta: {
      guest: false
    }
  },
  {
    path: '/pipelines/:pipelineName',
    name: 'PipelineDetail',
    component: () => import('../views/PipelineDetailsView.vue'),
    props: true,
    meta: {
      guest: false
    }
  },
  {
    path: '/pipelines/:pipelineName/run',
    name: 'PipelineRunView',
    component: () => import('../views/PipelineRunView.vue'),
    props: true,
    meta: {
      guest: false
    }
  },
  {
    path: '/notifications',
    name: 'NotificationsCenter',
    component: () => import('../views/NotificationsCenter.vue'),
    meta: {
      guest: false
    }
  },
  {
    path: '/login',
    name: 'LogIn',
    component: () => import('../views/LogIn.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/user',
    name: 'Users',
    component: () => import('../views/UserManagementView.vue'),
    meta: {
      guest: false
    }
  },
  {
    path: '/logout',
    name: 'LogOut',
    redirect: { name: 'LogIn' },
    meta: {
      guest: false
    }
  },
  {
    path: '/searcher',
    name: 'SearchResult',
    component: () => import('../views/SearchResult.vue'),
    meta: {
      guest: false
    }
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.guest) {
    next()
  } else {
    if (store.state.auth.isUserLogged) {
      return next()
    } else {
      return next({ name: 'LogIn' })
    }
  }
})
export default router
