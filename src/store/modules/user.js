import axios from 'axios'
import md5 from 'md5'
export default ({
  namespaced: true,
  state: {
    users: [],
    loggedUserId: '1',
    showLogsSection: false,
    showUsersSection: true,
    showSettingsSection: false,
    idUserSequence: 10,
    selectedIdUser: '-1',
    manageMyOwnProfile: false,
    userLogsFiles: [],
    errorUpdatingOwnerRole: false
  },
  mutations: {
    updateLoggedUserName (state, username) {
      state.loggedUsername = username
    },
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
      const user = state.users.find(user => user.username === state.loggedUsername)
      const logIndexToRemove = user.logs.findIndex(log => log.name === logName)
      user.logs.splice(logIndexToRemove, 1)
    },
    updateLoggedUserRole (state, idUserAndIdRole) {
      const user = state.users.find(user => user.id === idUserAndIdRole.idUser)
      user.role = idUserAndIdRole.idRole
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
      let promiseResult
      rootState.general.entitiesToDelete.forEach(entity => {
        const index = state.users.findIndex(user => user.id === entity.id)
        if (index !== -1) {
          const idUser = state.users[index].id
          promiseResult = axios.delete('/users/' + idUser)
            .then(function (response) {
              state.users.splice(index, 1)
              return { status: true, message: '' }
            })
            .catch(function (error) {
              return { status: false, message: error.response.data }
            })
        }
      })
      commit('general/clearReferencesToDelete', null, { root: true })
      return promiseResult
    },
    addUserToServer ({ state, rootState, commit, getters, dispatch }, user) {
      if (rootState.auth.authentication_token !== '') {
        return axios.post('/users', getters.mapUserFromLocalToServer(user))
          .then(function (response) {
            user.id = response.data.id
            let userRole
            if (user.role === getters.roles.OWNER.id) {
              userRole = user.role
              user.role = getters.roles.ADMIN.id
            }
            commit('addUserEntity', user)
            if (userRole === getters.roles.OWNER.id) {
              user.role = userRole
              dispatch('assignOwnerRoleToUser', user.id).then(function (response) {
                if (!response.status) {
                  user.role = getters.roles.ADMIN.id
                }
              })
            }
            return { status: true, message: '' }
          })
          .catch(function (error) {
            return { status: false, message: error.response.data }
          })
      }
    },
    updateUserToServer ({ state, rootState, commit, getters, dispatch }, user) {
      if (rootState.auth.authentication_token !== '') {
        return axios.put('/users/' + user.id, getters.mapUserFromLocalToServer(user))
          .then(function (response) {
            let userRole
            if (user.role === getters.roles.OWNER.id) {
              userRole = user.role
              user.role = getters.roles.ADMIN.id
            }
            commit('updateUserEntity', user)
            if (userRole === getters.roles.OWNER.id) {
              user.role = userRole
              dispatch('assignOwnerRoleToUser', user.id)
            }
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
            return { status: true, message: '' }
          })
          .catch(function (error) {
            return { status: false, message: error.response.data }
          })
      }
    },
    assignOwnerRoleToUser ({ state, getters, rootState, commit }, idUser) {
      if (rootState.auth.authentication_token !== '') {
        return axios.put('/users/assignOnwer/' + idUser)
          .then(function (response) {
            const newUserOwner = getters.getUserById(idUser)
            newUserOwner.role = getters.roles.OWNER.id
            commit('updateUserEntity', newUserOwner)
            const loggedUser = getters.getLoggedUserData
            loggedUser.role = getters.roles.ADMIN.id
            commit('updateUserEntity', loggedUser)
            state.errorUpdatingOwnerRole = false
            return { status: true, message: '' }
          })
          .catch(function (error) {
            state.errorUpdatingOwnerRole = true
            return { status: false, message: error.response.data }
          })
      }
    }
  },
  getters: {
    getUserById: (state) => (id) => {
      return state.users.find(user => user.id === id)
    },
    getUserByUsername: (state) => (username) => {
      return state.users.find(user => user.username === username)
    },
    getLogInfoByName: (state) => (logname) => {
      const logFileText = state.userLogsFiles.find(item => item.name === logname).text
      return logFileText
    },
    getLoggedUserData: (state) => {
      return state.users.find(user => user.username === state.loggedUsername)
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
      if (user.role === getters.roles.OWNER.id) {
        mappedUser.role = getters.roles.ADMIN.shortName
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
      let role = getters.getRoleByShortName(user.role).id
      if (user.owner) {
        role = getters.roles.OWNER.id
      }
      const newUser = {
        username: user.userName === null ? '' : user.userName,
        firstname: user.firstName === null ? '' : user.firstName,
        lastname: user.lastName === null ? '' : user.lastName,
        email: user.email === null ? '' : user.email,
        password: user.currentPassword === null ? '' : user.currentPassword,
        oldPassword: '',
        phone: 0,
        role: role,
        profilePicture: user.image === null ? '' : user.image,
        id: user.id,
        notification: {},
        logs: []
      }
      return newUser
    },
    getGravatarUrlByEmail: (state) => (email) => {
      const hashedEmail = md5(email)
      return 'https://www.gravatar.com/avatar/' + hashedEmail
    },
    isLoggedUserOwner: (state, getters) => {
      if (getters.getLoggedUserData) {
        return getters.getLoggedUserData.role === getters.roles.OWNER.id
      }
      return false
    },
    isLoggedUserAdmin: (state, getters) => {
      if (getters.getLoggedUserData) {
        return getters.getLoggedUserData.role === getters.roles.ADMIN.id
      }
      return false
    },
    isLoggedUserMember: (state, getters) => {
      if (getters.getLoggedUserData) {
        return getters.getLoggedUserData.role === getters.roles.MEMBER.id
      }
      return false
    }
  }
})
