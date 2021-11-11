import axios from 'axios'
export default ({
  namespaced: true,
  state: {
    authentication_token: '',
    showForgottenPasswordForm: false,
    showResetPasswordForm: false,
    showLoginForm: true,
    showLogsSection: false,
    showUsersSection: true,
    showSettingsSection: false

  },
  mutations: {
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
    },
    goToLogsSection (state) {
      state.showLogsSection = true
      state.showUsersSection = false
      state.showSettingsSection = false
    },
    goToUsersSection (state) {
      state.showLogsSection = false
      state.showUsersSection = true
      state.showSettingsSection = false
    },
    goToSettingsSection (state) {
      state.showLogsSection = false
      state.showUsersSection = false
      state.showSettingsSection = true
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
  getters: {}
})
