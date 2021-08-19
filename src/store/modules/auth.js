import axios from 'axios'
export default ({
  namespaced: true,
  state: {
    authentication_token: ''
  },
  mutations: {
    updateAuthenticationToken (state, token) {
      state.authentication_token = token
    }
  },
  actions: {
    login ({ commit, state }, credentials) {
      return axios.post('/auth/login',
        {
          userName: credentials.username,
          password: credentials.password
        })
        .then(function (response) {
          commit('updateAuthenticationToken', response.data.auth_token)
          axios.defaults.headers.common.Authorization = 'Bearer ' + state.authentication_token
          return true
        })
        .catch(function () {
          return false
        })
    }
  },
  getters: {

  }
})
