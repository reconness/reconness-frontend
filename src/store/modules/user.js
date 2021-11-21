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
        ]
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
        logs: []
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
        logs: []
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
        logs: []
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
    showLogsSection: false,
    showUsersSection: true,
    showSettingsSection: false,
    idUserSequence: 10,
    selectedIdUser: -1,
    manageMyOwnProfile: false
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
    updateSelectedIdUser (state, idUser) {
      state.selectedIdUser = idUser
    },
    updateManageMyOwnProfile (state, status) {
      state.manageMyOwnProfile = status
    }
  },
  actions: {},
  getters: {
    getUserById: (state) => (id) => {
      return state.users.find(user => user.id === id)
    },
    getLogInfoByName: (state) => (logname) => {
      if (logname === '3739362293.txt') {
        return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
      } else {
        return 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
      }
    }
  }
})
