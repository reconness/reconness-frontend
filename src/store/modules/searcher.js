import axios from 'axios'
export default ({
  namespaced: true,
  state: {
    agentsSearchResult: []
  },
  mutations: {
    updateAgentsSearchResult (state, newList) {
      state.agentsSearchResult = newList
    }
  },
  actions: {
    searchAgentsFromServer ({ state, commit, rootState }, textFilter) {
      if (rootState.auth.authentication_token !== '') {
        return axios.get('/search/agents/' + textFilter)
          .then(function (response) {
            commit('updateAgentsSearchResult', response.data)
            return { status: true, message: response.data, data: response.data }
          })
          .catch(function (error) {
            return { status: false, message: error.response.data }
          })
      }
    }
  },
  getters: {}
})
