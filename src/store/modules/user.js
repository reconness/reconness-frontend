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
        phone: 56823566,
        role: 1,
        profilePicture: '',
        id: 1
      },
      {
        username: 'adam',
        firstname: 'Adam',
        lastname: 'Sandler',
        email: 'adam@gmail.com',
        password: '',
        phone: 51249876,
        role: 3,
        profilePicture: '',
        id: 2
      },
      {
        username: 'angel',
        firstname: 'Angel',
        lastname: 'Johnson',
        email: 'johnson@gmail.com',
        password: '',
        phone: 51228876,
        role: 2,
        profilePicture: '',
        id: 3
      },
      {
        username: 'yanet',
        firstname: 'Yanet',
        lastname: 'Jackson',
        email: 'yanet@gmail.com',
        password: '',
        phone: 51234876,
        role: 1,
        profilePicture: '',
        id: 4
      }
    ],
    loggedUser: {
      username: 'john.doe',
      firstname: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      password: '',
      phone: 56823566,
      role: 1,
      profilePicture: '',
      id: 1
    },
    showLogsSection: false,
    showUsersSection: true,
    showSettingsSection: false,
    idUserSequence: 10
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
      this.idUserSequence = this.idUserSequence++
      state.users.push(user)
    }
  },
  actions: {},
  getters: {}
})
