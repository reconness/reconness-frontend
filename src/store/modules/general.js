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
    }
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
    }
  },
  actions: {},
  getters: {}
})
