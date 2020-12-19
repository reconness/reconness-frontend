import { createStore } from 'vuex'

export default createStore({
  state: {
    agentListStore: [
      { name: 'Agente 1', background: '#03DCED', id: 1, repository: '123', target: '234', command: '4324', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'asdasdad' },
      { name: 'Agente 2', background: '#6610f2', id: 2, repository: '123', target: '234', command: '4324', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'asdasdad' },
      { name: 'Agente 3', background: '#03DCED', id: 3, repository: '123', target: '234', command: '4324', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'asdasdad' },
      { name: 'Agente 4', background: '#ff5400', id: 4, repository: '123', target: '234', command: '4324', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'asdasdad' },
      { name: 'Agente 5', background: '#FF4343', id: 5, repository: '123', target: '234', command: '4324', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'asdasdad' },
      { name: 'Agente 6', background: '#0ee06a', id: 6, repository: '123', target: '234', command: '4324', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'asdasdad' },
      { name: 'Agente 7', background: '#03DCED', id: 7, repository: '123', target: '234', command: '4324', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'asdasdad' },
      { name: 'Agente 8', background: '#6610f2', id: 8, repository: '123', target: '234', command: '4324', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'asdasdad' }
    ],
    idAgent: -1
  },
  mutations: {
    addAgent (state, agent) {
      state.agentListStore.push(agent)
    },
    setIdAgent (state, id) {
      state.idAgent = id
    },
    updateAgent (state, agent) {
      const item = state.agentListStore.find(item => item.id === agent.id)
      Object.assign(item, agent)
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    idAgent: state => {
      return state.idAgent
    },
    getAgentById: (state) => (id) => {
      return state.agentListStore.find(agent => agent.id === id)
    }
  }
})
