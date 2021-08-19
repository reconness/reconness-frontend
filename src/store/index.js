import { createStore } from 'vuex'
import target from './modules/target'
import pipelines from './modules/pipelines'
import agent from './modules/agent'
import auth from './modules/auth'
import referent from './modules/referent'

export default createStore({
  modules: {
    target,
    pipelines,
    agent,
    auth,
    referent
  }
})
