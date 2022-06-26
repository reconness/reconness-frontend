import axios from 'axios'
export default ({
  namespaced: true,
  state: {
    authentication_token: localStorage.getItem('token') || '',
    showForgottenPasswordForm: false,
    showResetPasswordForm: false,
    showLoginForm: true,
    isUserLogged: false
  },
  mutations: {
    updateIsUserLogged (state, isLogged) {
      state.isUserLogged = isLogged
    },
    updateAuthenticationToken (state, token) {
      state.authentication_token = token
    },
    goToForgotPasswordForm (state) {
      state.showForgottenPasswordForm = true
      state.showResetPasswordForm = false
      state.showLoginForm = false
    },
    goToResetPasswordForm (state) {
      state.showForgottenPasswordForm = false
      state.showResetPasswordForm = true
      state.showLoginForm = false
    },
    goToLoginForm (state) {
      state.showForgottenPasswordForm = false
      state.showResetPasswordForm = false
      state.showLoginForm = true
    }
  },
  actions: {
    login ({ commit, state, dispatch }, credentials) {
      return axios.post('/auth/login',
        {
          userName: credentials.username,
          password: credentials.password
        })
        .then(function (response) {
          commit('updateAuthenticationToken', response.data.auth_token)
          localStorage.setItem('token', response.data.auth_token)
          localStorage.setItem('loggedUsername', credentials.username)
          localStorage.setItem('loginDate', new Date().getTime())
          axios.defaults.headers.common.Authorization = 'Bearer ' + state.authentication_token
          if (response.data.auth_token) {
            dispatch('referent/loadResources', null, { root: true })
            dispatch('agent/loadAgents', null, { root: true })
            dispatch('target/loadTargets', null, { root: true })
          }
          return { status: true, message: response.data }
        })
        .catch(function (error) {
          localStorage.setItem('token', '')
          if (!error.response) {
            return { status: false, message: 'unknownError' }
          }
          return { status: false, message: error.response.data }
        })
    },
    updateUserLogFlagAfterSeconds ({ state, commit }, loggedFlag) {
      setTimeout(
        function () {
          commit('updateIsUserLogged', loggedFlag)
        },
        2000
      )
    }
  },
  getters: {}
})
