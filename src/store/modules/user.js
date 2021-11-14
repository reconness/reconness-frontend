export default ({
  namespaced: true,
  state: {
    users: [
      {
        username: 'john.doe',
        firstname: 'John',
        lastname: 'Doe',
        email: 'johndoe@gmail.com',
        password: '',
        role: [],
        id: 1
      },
      {
        username: 'adam',
        firstname: 'Adam',
        lastname: 'Sandler',
        email: 'adam@gmail.com',
        password: '',
        role: [],
        id: 2
      },
      {
        username: 'angel',
        firstname: 'Angel',
        lastname: 'Johnson',
        email: 'johnson@gmail.com',
        password: '',
        role: [],
        id: 3
      },
      {
        username: 'yanet',
        firstname: 'Yanet',
        lastname: 'Jackson',
        email: 'yanet@gmail.com',
        password: '',
        role: [],
        id: 4
      }
    ],
    loggedUser: {
      firstname: 'John Doe',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      id: 1,
      role: 1
    },
    showLogsSection: false,
    showUsersSection: true,
    showSettingsSection: false
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
    }
  },
  actions: {},
  getters: {}
})
