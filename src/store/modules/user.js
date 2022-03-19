import axios from 'axios'
export default ({
  namespaced: true,
  state: {
    users: [
      {
        username: 'john.doe',
        firstname: 'John',
        lastname: 'Doe',
        email: 'johndoe@gmail.com',
        password: '123',
        phone: 56823566,
        role: 1,
        profilePicture: '',
        id: '1',
        logs: [
          {
            id: 1,
            name: '3739362293.txt'
          },
          {
            id: 2,
            name: '37sh2362293.txt'
          }
        ],
        notification: {
          url: '10.45.56.34',
          method: 'method',
          payload: 'payload',
          rootDomain: 'rootDomain',
          subDomain: 'subDomain',
          ipAddress: '10.45.56.34',
          isAlive: 'alive'
        }
      }
    ],
    loggedUsername: 'john.doe',
    loggedUser: {
      username: 'john.doe',
      firstname: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      password: '123',
      phone: 56823566,
      role: 1,
      profilePicture: '',
      id: 1,
      logs: [
        {
          id: 1,
          name: '3739362293.txt'
        },
        {
          id: 2,
          name: '37sh2362293.txt'
        }
      ]
    },
    loggedUserId: '1',
    showLogsSection: false,
    showUsersSection: true,
    showSettingsSection: false,
    idUserSequence: 10,
    selectedIdUser: '-1',
    manageMyOwnProfile: false,
    userLogsFiles: [
      {
        name: '3739362293.txt',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
      },
      {
        name: '37sh2362293.txt',
        text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
      }
    ]
  },
  mutations: {
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
    },
    addUserEntity (state, user) {
      state.users.push(user)
    },
    updateUserEntity (state, user) {
      const item = state.users.find(item => item.id === user.id)
      if (user.password.match(/^ *$/) !== null) {
        user.password = item.password
      }
      Object.assign(item, user)
    },
    updateSelectedIdUser (state, idUser) {
      state.selectedIdUser = idUser
    },
    updateManageMyOwnProfile (state, status) {
      state.manageMyOwnProfile = status
    },
    removeUserLogByName (state, logName) {
      const user = state.users.find(user => user.id === state.loggedUser.id)
      const logIndexToRemove = user.logs.findIndex(log => log.name === logName)
      user.logs.splice(logIndexToRemove, 1)
    },
    updateLoggedUserRole (state, idUserAndIdRole) {
      const user = state.users.find(user => user.id === idUserAndIdRole.idUser)
      user.role = idUserAndIdRole.idRole
    },
    saveNotificationsSettingsToLoggedUser (state, notificationsSettings) {
      const userItem = state.users.find(item => item.id === state.loggedUserId)
      Object.assign(userItem.notification, notificationsSettings)
    },
    updateUsers (state, users) {
      state.users.splice(1, state.users.length)
      users.forEach(user => {
        state.users.push(user)
      })
    }
  },
  actions: {
    clearUserEntitiesToDelete ({ state, commit, rootState }) {
      rootState.target.entitiesToDelete.forEach(entity => {
        const index = state.users.findIndex(user => user.id === entity.id)
        if (index !== -1) {
          state.users.splice(index, 1)
        }
      })
      commit('target/clearReferencesToDelete', null, { root: true })
    },
    saveNotificationsSettingsToLoggedUserAction ({ state, commit, rootState }, notificationsSettings) {
      if (Math.random() < 0.5) {
        commit('saveNotificationsSettingsToLoggedUser', notificationsSettings)
        commit('target/updateOperationStatusInfo', { status: 5, message: '' }, { root: true })
      } else {
        commit('target/updateOperationStatusInfo', { status: 4, message: '' }, { root: true })
      }
    },
    addUserToServer ({ state, rootState, commit, getters }, user) {
      if (rootState.auth.authentication_token !== '') {
        return axios.post('/users', getters.mapUserFromLocalToServer(user))
          .then(function (response) {
            user.id = response.data.id
            commit('addUserEntity', user)
            return { status: true, message: '' }
          })
          .catch(function (error) {
            return { status: false, message: error.response.data }
          })
      }
    },
    updateUserToServer ({ state, rootState, commit, getters }, user) {
      if (rootState.auth.authentication_token !== '') {
        return axios.put('/users/' + user.id, getters.mapUserFromLocalToServer(user))
          .then(function (response) {
            commit('updateUserEntity', user)
            return { status: true, message: '' }
          })
          .catch(function (error) {
            return { status: false, message: error.response.data }
          })
      }
    },
    loadUsers ({ state, commit, getters, rootState }) {
      if (rootState.auth.authentication_token !== '') {
        return axios.get('/users')
          .then(function (response) {
            const usersMapped = getters.mapUsers(response.data)
            commit('updateUsers', usersMapped)
            return true
          })
          .catch(function () {
            return false
          })
      }
    }
  },
  getters: {
    getUserById: (state) => (id) => {
      return state.users.find(user => user.id === id)
    },
    getLogInfoByName: (state) => (logname) => {
      const logFileText = state.userLogsFiles.find(item => item.name === logname).text
      return logFileText
    },
    getLoggedUserData: (state) => {
      return state.users.find(user => user.id === state.loggedUserId)
    },
    getRoleByShortName: (state, getters) => (roleShortName) => {
      switch (roleShortName) {
        case 'Owner':
          return getters.roles.OWNER
        case 'Admin':
          return getters.roles.ADMIN
        case 'Member':
          return getters.roles.MEMBER
        default:
          return -1
      }
    },
    getRoleById: (state, getters) => (idRole) => {
      switch (idRole) {
        case 1:
          return getters.roles.OWNER
        case 2:
          return getters.roles.ADMIN
        default:
          return getters.roles.MEMBER
      }
    },
    mapUserFromLocalToServer: (state, getters) => (user) => {
      const mappedUser = {
        userName: user.username,
        email: user.email,
        firstName: user.firstname,
        lastName: user.lastname,
        role: getters.getRoleById(user.role).shortName,
        currentPassword: user.oldPassword,
        newPassword: user.password,
        confirmationPassword: user.password,
        image: user.profilePicture
      }
      return mappedUser
    },
    roles: (state) => {
      return {
        OWNER: { id: 1, longName: 'Administrator Owner', shortName: 'Owner' },
        ADMIN: { id: 2, longName: 'Administrator', shortName: 'Admin' },
        MEMBER: { id: 3, longName: 'Member', shortName: 'Member' }
      }
    },
    mapUsers: (state, getters) => (users) => {
      const newUsers = []
      let newUser
      users.forEach(user => {
        newUser = getters.mapUserFromServerToLocal(user)
        newUsers.push(newUser)
      })
      return newUsers
    },
    mapUserFromServerToLocal: (state, getters) => (user) => {
      const newUser = {
        username: user.userName === null ? '' : user.userName,
        firstname: user.firstName === null ? '' : user.firstName,
        lastname: user.lastName === null ? '' : user.lastName,
        email: user.email === null ? '' : user.email,
        password: user.currentPassword === null ? '' : user.currentPassword,
        oldPassword: '',
        phone: 0,
        role: getters.getRoleByShortName(user.role).id,
        profilePicture: user.image === null ? '' : user.image,
        id: user.id
      }
      return newUser
    }
  }
})
