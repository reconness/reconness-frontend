import { createStore } from 'vuex'

export default createStore({
  state: {
    agentListStore: [
      { name: 'Agente 9', background: '#03DCED', date: '21/02/2020' },
      { name: 'Agente 5', background: '#6610f2', date: '21/03/2020' },
      { name: 'Agente 4', background: '#03DCED', date: '21/04/2020' },
      { name: 'Agente 2', background: '#ff5400', date: '21/05/2020' },
      { name: 'Agente 3', background: '#FF4343', date: '21/06/2020' },
      { name: 'Agente 1', background: '#0ee06a', date: '21/07/2020' },
      { name: 'Agente 7', background: '#03DCED', date: '21/08/2020' },
      { name: 'Agente 8', background: '#6610f2', date: '21/09/2020' },
      { name: 'Agente 6', background: '#6610f2', date: '21/09/2020' },
      { name: 'Agente 9', background: '#03DCED', date: '21/02/2020' },
      { name: 'Agente 4', background: '#03DCED', date: '21/04/2020' },
      { name: 'Agente 8', background: '#6610f2', date: '21/09/2020' },
      { name: 'Agente 6', background: '#6610f2', date: '21/09/2020' },
      { name: 'Agente 9', background: '#03DCED', date: '21/02/2020' },
      { name: 'Agente 4', background: '#03DCED', date: '21/04/2020' }
    ],
    filterColour: ''
  },
  getters: {
    filterByColor (state) {
      return function (colour) {
        return state.agentListStore.filter(item => item.background.includes(colour))
      }
    }
  },
  mutations: {
    isFilter (state, backg) {
      state.filterColour = backg
    }
  },
  actions: {
  },
  modules: {
  }
})
