export default ({
  namespaced: true,
  state: {
    notifications: [
      {
        id: 1,
        status: 1,
        created: new Date(),
        description: 'Completed Pipeline'
      },
      {
        id: 2,
        status: 4,
        created: new Date(),
        description: 'Started Agent'
      },
      {
        id: 3,
        status: 5,
        created: new Date(),
        description: 'Failed Subdomain'
      }
    ],
    isNotificationMenuActive: false
  },
  mutations: {
    showNotificationsMenu (state) {
      state.isNotificationMenuActive = !state.isNotificationMenuActive
    }
  },
  actions: {},
  getters: {}
})
