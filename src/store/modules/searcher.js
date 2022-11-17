import axios from 'axios'
export default ({
  namespaced: true,
  state: {
    agentsSearchResult: [],
    targetsSearchResult: []
  },
  mutations: {
    updateAgentsSearchResult (state, newList) {
      state.agentsSearchResult = newList
    },
    updateTargetsSearchResult (state, newList) {
      state.targetsSearchResult = newList
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
    },
    searchTargetsFromServer ({ state, commit, rootState }, textFilter) {
      if (rootState.auth.authentication_token !== '') {
        return axios.get('/search/target/' + textFilter)
          .then(function (response) {
            commit('updateTargetsSearchResult', response.data)
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
