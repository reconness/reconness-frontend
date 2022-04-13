import axios from 'axios'
export default ({
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    cleanLogInfoByNameFromServer ({ state, commit, getters, rootState }, logfileName) {
      if (rootState.auth.authentication_token !== '') {
        const logFileNameDto = {
          logFileSelected: logfileName
        }
        return axios.post('/accounts/cleanLogfile', logFileNameDto)
          .then(function (response) {
            return { status: true, message: '' }
          })
          .catch(function (error) {
            return { status: false, message: error.response.data }
          })
      }
    },
    getLogInfoByNameFromServer ({ state, commit, getters, rootState }, logfileName) {
      if (rootState.auth.authentication_token !== '') {
        return axios.get('/accounts/readLogfile/' + logfileName)
          .then(function (response) {
            return { status: true, message: response.data }
          })
          .catch(function (error) {
            return { status: false, message: error.response.data }
          })
      }
    },
    loadLogsNames ({ state, commit, getters, rootState, rootGetters }) {
      if (rootState.auth.authentication_token !== '') {
        return axios.get('/accounts/logfiles')
          .then(function (response) {
            const logAndUserInfo = {
              loggedUser: rootGetters['user/getLoggedUserData'],
              logsNamesResponse: response.data
            }
            commit('user/saveLogsNamesToLoggedUser', logAndUserInfo, { root: true })
            return { status: true, message: '' }
          })
          .catch(function (error) {
            return { status: false, message: error.response.data }
          })
      }
    }
  },
  getters: {}
})
