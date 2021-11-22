import { createStore } from 'vuex'
import target from './modules/target'
import pipelines from './modules/pipelines'
import agent from './modules/agent'
import auth from './modules/auth'
import wordlist from './modules/wordlist'
import referent from './modules/referent'
import general from './modules/general'
import user from './modules/user'

export default createStore({
  modules: {
    target,
    pipelines,
    agent,
    auth,
    referent,
    wordlist,
    user,
    general
  }
})
