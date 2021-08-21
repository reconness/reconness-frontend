import axios from 'axios'
export default ({
  namespaced: true,
  state: {
    resources: [],
    idResource: -1
  },
  mutations: {
    mapAndUpdateResources (state, resources) {
      state.resources.splice(0, state.resources.length)
      let newResource
      resources.forEach(resource => {
        newResource = {
          id: resource.id,
          url: resource.url,
          categories: resource.categories.split(', ')
        }
        state.resources.push(newResource)
      })
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
    loadResources ({ state, commit }) {
      if (state.authentication_token !== '') {
        return axios.get('/references')
          .then(function (response) {
            commit('mapAndUpdateResources', response.data)
            return true
          })
          .catch(function () {
            return false
          })
      }
    },
    addResource ({ state, dispatch }, resource) {
      if (state.authentication_token !== '') {
        return axios.post('/references', {
          url: resource.url,
          categories: resource.categories.join(',')
        })
          .then(function (response) {
            dispatch('loadResources')
            return true
          })
          .catch(function () {
            return false
          })
      }
    },
    deleteResource ({ state, dispatch }, idResource) {
      if (state.authentication_token !== '') {
        return axios.delete('/references/' + idResource)
          .then(function (response) {
            dispatch('loadResources')
            return true
          })
          .catch(function () {
            return false
          })
      }
    }
  },
  getters: {}
})
