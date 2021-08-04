import { createStore } from 'vuex'
import target from './modules/target'
import pipelines from './modules/pipelines'
import agent from './modules/agent'

export default createStore({
  modules: {
    target,
    pipelines,
    agent
  }
})
