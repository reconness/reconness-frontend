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
        ],
        notification: {
          url: '',
          method: '',
          payload: '',
          rootDomain: '',
          subDomain: '',
          ipAddress: '',
          isAlive: ''
        }
      },
      {
        username: 'adam',
        firstname: 'Adam',
        lastname: 'Sandler',
        email: 'adam@gmail.com',
        password: '123',
        phone: 51249876,
        role: 3,
        profilePicture: '',
        id: 2,
        logs: [],
        notification: {
          url: '',
          method: '',
          payload: '',
          rootDomain: '',
          subDomain: '',
          ipAddress: '',
          isAlive: ''
        }
      },
      {
        username: 'angel',
        firstname: 'Angel',
        lastname: 'Johnson',
        email: 'johnson@gmail.com',
        password: '123',
        phone: 51228876,
        role: 2,
        profilePicture: '',
        id: 3,
        logs: [],
        notification: {
          url: '',
          method: '',
          payload: '',
          rootDomain: '',
          subDomain: '',
          ipAddress: '',
          isAlive: ''
        }
      },
      {
        username: 'yanet',
        firstname: 'Yanet',
        lastname: 'Jackson',
        email: 'yanet@gmail.com',
        password: '123',
        phone: 51234876,
        role: 1,
        profilePicture: '',
        id: 4,
        logs: [],
        notification: {
          url: '',
          method: '',
          payload: '',
          rootDomain: '',
          subDomain: '',
          ipAddress: '',
          isAlive: ''
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
    loggedUserId: 1,
    showLogsSection: false,
    showUsersSection: true,
    showSettingsSection: false,
    idUserSequence: 10,
    selectedIdUser: -1,
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
      state.idUserSequence = state.idUserSequence++
      state.users.push(user)
    },
    updateUserEntity (state, user) {
      const item = state.users.find(item => item.id === user.id)
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
    }
  },
  actions: {},
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
    }
  }
})
