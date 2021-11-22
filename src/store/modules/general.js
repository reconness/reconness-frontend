export default ({
  namespaced: true,
  state: {
    notificationMessageType: 1,
    notificationMessageDescription: '',
    notificationMessageActionSelected: false
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
    }
  },
  actions: {},
  getters: {}
})
