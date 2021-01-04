import { createStore } from 'vuex'

export default createStore({
  state: {
    agentListStore: [
      { name: 'Agente 1', background: '#4bd6f2', id: 1, repository: 'repository1.com', target: 'target 1', command: 'command 1', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 1', image: '', date: '21/01/2020' },
      { name: 'Agente 2', background: '#9a25b6', id: 2, repository: 'repository2.com', target: 'target 2', command: 'command 2', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent  2', image: '', date: '21/02/2020' },
      { name: 'Agente 3', background: '#e91013', id: 3, repository: 'repository3.com', target: 'target 3', command: 'command 3', isTargetType: true, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 3', image: '', date: '21/03/2020' },
      { name: 'Agente 4', background: '#f36e1c', id: 4, repository: 'repository4.com', target: 'target 4', command: 'command 4', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 4', image: '', date: '21/04/2020' },
      { name: 'Agente 5', background: '#4cb45f', id: 5, repository: 'repository5.com', target: 'target 5', command: 'command 5', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 5', image: '', date: '21/05/2020' },
      { name: 'Agente 6', background: '#f36e1c', id: 6, repository: 'repository6.com', target: 'target 6', command: 'command 6', isTargetType: true, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 6', image: '', date: '21/06/2020' },
      { name: 'Agente 7', background: '#e91013', id: 7, repository: 'repository7.com', target: 'target 7', command: 'command 7', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 7', image: '', date: '21/07/2020' },
      { name: 'Agente 8', background: '#4bd6f2', id: 8, repository: 'repository8.com', target: 'target 8', command: 'command 8', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 8', image: '', date: '21/08/2020' }
    ],
    resources: [
      { url: 'http://google.com', categories: ['searcher', 'docs'], id: 1 },
      { url: 'http://yahoo.es', categories: ['searcher'], id: 2 }
    ],
    filterColour: '',
    idAgent: -1,
    systemColors: ['8929e0', '8929e0', 'ff1b4c', 'ff7f46', '00eb74'],
    fromDetailsLink: false,
    idResource: -1
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
    },
    isFilter (state, backg) {
      state.filterColour = backg
    },
    removeAgent (state, agentName) {
      const index = state.agentListStore.findIndex(agent => agent.name === agentName)
      if (index !== -1) {
        state.agentListStore.splice(index, 1)
      }
    },
    setDetailsLinks (state, isSelected) {
      state.fromDetailsLink = isSelected
    },
    addResource (state, resource) {
      state.resources.push(resource)
    },
    setSelectedResource (state, idResource) {
      state.idResource = idResource
    },
    removeResource (state, idResource) {
      const index = state.resources.findIndex(resource => resource.id === idResource)
      if (index !== -1) {
        state.resources.splice(index, 1)
      }
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
    },
    filterByColor (state) {
      return function (colour) {
        return state.agentListStore.filter(item => item.background.includes(colour))
      }
    },
    getRandomColor: state => {
      return state.systemColors[Math.floor(Math.random() * state.systemColors.length)]
    }
  }
})
