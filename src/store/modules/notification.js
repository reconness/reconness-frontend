import axios from 'axios'
export default ({
  namespaced: true,
  state: {
    notifications: [
      {
        id: 1,
        status: 1,
        created: new Date('11-27-2021'),
        description: 'Completed Pipeline',
        readed: false
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
        created: new Date(),
        description: 'Failed Subdomain',
        readed: false
      }
    ],
    notificationSequence: 34,
    isNotificationMenuActive: false,
    notificationSettingData: {
      url: '',
      method: '',
      payload: '',
      rootDomain: '',
      subDomain: '',
      ipAddress: '',
      isAlive: ''
    }
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
    },
    removeUnreadStatusToAll (state) {
      state.notifications.forEach(notification => {
        if (!notification.readed) {
          notification.readed = true
        }
      })
    },
    removeUnreadStatusTodayAndYesterday (state) {
      const today = new Date()
      const yesterday = new Date()
      yesterday.setDate(today.getDate() - 1)
      const todayAndYesterdayNotifications = state.notifications.filter(item => item.created.getTime() >= yesterday.getTime())
      todayAndYesterdayNotifications.forEach(notification => {
        if (!notification.readed) {
          notification.readed = true
        }
      })
    },
    clearTodayNotifications (state) {
      const today = new Date()
      const todayNotifications = state.notifications.filter(item => item.created.getDate() === today.getDate() && item.created.getMonth() === today.getMonth() && item.created.getYear() === today.getYear())
      for (let index = todayNotifications.length - 1; index >= 0; index--) {
        const notificationIndex = state.notifications.findIndex(notification => notification.id === todayNotifications[index].id)
        state.notifications.splice(notificationIndex, 1)
      }
    },
    clearYesterdayNotifications (state) {
      const today = new Date()
      const yesterday = new Date()
      yesterday.setDate(today.getDate() - 1)
      const yesterdayNotifications = state.notifications.filter(item => item.created.getDate() === yesterday.getDate() && item.created.getMonth() === yesterday.getMonth() && item.created.getYear() === yesterday.getYear())
      for (let index = yesterdayNotifications.length - 1; index >= 0; index--) {
        const notificationIndex = state.notifications.findIndex(notification => notification.id === yesterdayNotifications[index].id)
        state.notifications.splice(notificationIndex, 1)
      }
    },
    clearOlderNotifications (state) {
      const today = new Date()
      const yesterday = new Date()
      yesterday.setDate(today.getDate() - 1)
      const olderNotifications = state.notifications.filter(item => item.created.getDate() !== yesterday.getDate() && item.created.getTime() < yesterday.getTime())
      for (let index = olderNotifications.length - 1; index >= 0; index--) {
        const notificationIndex = state.notifications.findIndex(notification => notification.id === olderNotifications[index].id)
        state.notifications.splice(notificationIndex, 1)
      }
    },
    clearAllNotifications (state) {
      state.notifications.splice(0, state.notifications.length)
    },
    saveNotificationsSettings (state, notificationsSettings) {
      state.notificationSettingData = notificationsSettings
    }
  },
  actions: {
    loadNotificationsSettings ({ state, getters, rootState, commit }) {
      if (rootState.auth.authentication_token !== '') {
        return axios.get('/accounts/notification')
          .then(function (response) {
            const notificationsMapped = getters.mapNotificationsSettingsFromServerToLocal(response.data)
            commit('saveNotificationsSettings', notificationsMapped)
            return { status: true, message: '' }
          })
          .catch(function (error) {
            return { status: false, message: error.response.data }
          })
      }
    },
    saveNotificationsSettingsAction ({ state, getters, rootState, commit, dispatch }, notificationsSettings) {
      if (rootState.auth.authentication_token !== '') {
        return axios.post('/accounts/saveNotification', getters.mapNotificationsSettingsFromLocalToServer(notificationsSettings))
          .then(function (response) {
            commit('saveNotificationsSettings', notificationsSettings)
            return { status: true, message: '' }
          })
          .catch(function (error) {
            return { status: false, message: error.response.data }
          })
      }
    }
  },
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
    },
    mapNotificationsSettingsFromLocalToServer: (state) => (notificationsSettings) => {
      const mappedNotification = {
        url: notificationsSettings.url,
        method: notificationsSettings.method,
        payload: notificationsSettings.payload,
        rootDomainPayload: notificationsSettings.rootDomain,
        subdomainPayload: notificationsSettings.subDomain,
        ipAddressPayload: notificationsSettings.ipAddress,
        isAlivePayload: notificationsSettings.isAlive
      }
      return mappedNotification
    },
    mapNotificationsSettingsFromServerToLocal: (state) => (notificationsSettings) => {
      const mappedNotification = {
        url: notificationsSettings.url,
        method: notificationsSettings.method,
        payload: notificationsSettings.payload,
        rootDomain: notificationsSettings.rootDomainPayload,
        subDomain: notificationsSettings.subdomainPayload,
        ipAddress: notificationsSettings.ipAddressPayload,
        isAlive: notificationsSettings.isAlivePayload
      }
      return mappedNotification
    }
  }
})
