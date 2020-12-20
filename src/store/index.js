import { createStore } from 'vuex'

export default createStore({
  state: {
    agentListStore: [
      { name: 'Agente 1', background: '#03DCED', id: 1, repository: 'repository1.com', target: 'target 1', command: 'command 1', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 1', image: '' },
      { name: 'Agente 2', background: '#6610f2', id: 2, repository: 'repository2.com', target: 'target 2', command: 'command 2', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent  2', image: '' },
      { name: 'Agente 3', background: '#03DCED', id: 3, repository: 'repository3.com', target: 'target 3', command: 'command 3', isTargetType: true, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 3', image: '' },
      { name: 'Agente 4', background: '#ff5400', id: 4, repository: 'repository4.com', target: 'target 4', command: 'command 4', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 4', image: '' },
      { name: 'Agente 5', background: '#FF4343', id: 5, repository: 'repository5.com', target: 'target 5', command: 'command 5', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 5', image: '' },
      { name: 'Agente 6', background: '#0ee06a', id: 6, repository: 'repository6.com', target: 'target 6', command: 'command 6', isTargetType: true, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 6', image: '' },
      { name: 'Agente 7', background: '#03DCED', id: 7, repository: 'repository7.com', target: 'target 7', command: 'command 7', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 7', image: '' },
      { name: 'Agente 8', background: '#6610f2', id: 8, repository: 'repository8.com', target: 'target 8', command: 'command 8', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 8', image: '' }
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
