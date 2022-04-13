export default ({
  namespaced: true,
  state: {
    notificationMessageType: 1,
    notificationMessageDescription: '',
    notificationMessageActionSelected: false,
    notificationTimeSelected: {
      today: false,
      yesterday: false,
      olders: false
    },
    entitiesToDelete: []
  },
  mutations: {
    updateNotificationMessageType (state, type) {
      state.notificationMessageType = type
    },
    updateNotificationMessageDescription (state, description) {
      state.notificationMessageDescription = description
    },
    updateNotificationMessageActionSelected (state, action) {
      state.notificationMessageActionSelected = action
    },
    updateNotificationTimeSelected (state, timeSelected) {
      state.notificationTimeSelected.today = timeSelected.today
      state.notificationTimeSelected.yesterday = timeSelected.yesterday
      state.notificationTimeSelected.olders = timeSelected.olders
    },
    clearReferencesToDelete (state) {
      state.entitiesToDelete.splice(0, state.entitiesToDelete.length)
    },
    addEntityToDelete (state, entity) {
      const exist = state.entitiesToDelete.findIndex(element => element.id === entity.id)
      if (exist < 0) {
        state.entitiesToDelete.push(entity)
      }
    }
  },
  actions: {},
  getters: {
    entityTypeData (state) {
      return {
        TARGET: { id: 1, description: 'Target' },
        ROOTDOMAIN: { id: 2, description: 'Root Domain' },
        SUBDOMAIN: { id: 3, description: 'SubDomain' },
        AGENT: { id: 4, description: 'Agent' },
        PIPELINE: { id: 5, description: 'Pipeline' },
        USER: { id: 6, description: 'User' }
      }
    }
  }
})
