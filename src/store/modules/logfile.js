import axios from 'axios'
export default ({
  namespaced: true,
  state: {
    logs: []
  },
  mutations: {
    saveLogsNamesToLogsList (state, logsListResponse) {
      state.logs.splice(0, state.logs.length)
      state.logs = logsListResponse
    }
  },
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
            commit('saveLogsNamesToLogsList', response.data)
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
