import { createStore } from 'vuex'

export default createStore({
  state: {
    agentListStore: [
      { name: 'Agente 1', background: '#03DCED' },
      { name: 'Agente 2', background: '#6610f2' },
      { name: 'Agente 3', background: '#03DCED' },
      { name: 'Agente 4', background: '#ff5400' },
      { name: 'Agente 5', background: '#FF4343' },
      { name: 'Agente 6', background: '#0ee06a' },
      { name: 'Agente 7', background: '#03DCED' },
      { name: 'Agente 8', background: '#6610f2' }
    ]
  },
  mutations: {
    addAgent (state, agent) {
      state.agentListStore.push(agent)
    }
  },
  actions: {
  },
  modules: {
  }
})
