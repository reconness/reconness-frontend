export default ({
  namespaced: true,
  state: {
    notifications: [
      {
        id: 1,
        status: 1,
        created: new Date('11-26-2021'),
        description: 'Completed Pipeline',
        readed: true
      },
      {
        id: 2,
        status: 4,
        created: new Date('11-25-2021'),
        description: 'Started Agent',
        readed: false
      },
      {
        id: 3,
        status: 5,
        created: new Date('11-24-2021'),
        description: 'Failed Subdomain',
        readed: false
      }
    ],
    notificationSequence: 34,
    isNotificationMenuActive: false
  },
  mutations: {
    showNotificationsMenu (state) {
      state.isNotificationMenuActive = !state.isNotificationMenuActive
    },
    addNewNotification (state, description) {
      state.notificationSequence = state.notificationSequence + 1
      const notification = {
        id: state.notificationSequence,
        status: 1,
        created: new Date(),
        description: description,
        readed: false
      }
      state.notifications.push(notification)
    }
  },
  actions: {},
  getters: {
    getTodaysNotifications (state) {
      const today = new Date()
      return state.notifications.filter(item => item.created.getDate() === today.getDate() && item.created.getMonth() === today.getMonth() && item.created.getYear() === today.getYear())
    },
    getTodaysTotalUnreadNotifications (state) {
      const today = new Date()
      const todayNotifications = state.notifications.filter(item => item.created.getDate() === today.getDate() && item.created.getMonth() === today.getMonth() && item.created.getYear() === today.getYear())
      return todayNotifications.filter(item => item.readed === false).length
    },
    getYesterdayNotifications (state) {
      const today = new Date()
      const yesterday = new Date()
      yesterday.setDate(today.getDate() - 1)
      return state.notifications.filter(item => item.created.getDate() === yesterday.getDate() && item.created.getMonth() === yesterday.getMonth() && item.created.getYear() === yesterday.getYear())
    },
    getYesterdayTotalUnreadNotifications (state) {
      const today = new Date()
      const yesterday = new Date()
      yesterday.setDate(today.getDate() - 1)
      const yesterdayNotifications = state.notifications.filter(item => item.created.getDate() === yesterday.getDate() && item.created.getMonth() === yesterday.getMonth() && item.created.getYear() === yesterday.getYear())
      return yesterdayNotifications.filter(item => item.readed === false).length
    },
    getOlderNotifications (state) {
      const today = new Date()
      const yesterday = new Date()
      yesterday.setDate(today.getDate() - 1)
      return state.notifications.filter(item => item.created.getDate() !== yesterday.getDate() && item.created.getTime() < yesterday.getTime())
    },
    getAllNewNotifications (state) {
      return state.notifications.filter(item => item.readed === false)
    }
  }
})
