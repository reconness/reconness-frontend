export default ({
  namespaced: true,
  state: {
    users: [
      {
        username: 'john.doe',
        name: 'John',
        lastname: 'Doe',
        email: 'johndoe@gmail.com',
        password: '',
        role: [],
        id: 1
      },
      {
        username: 'adam',
        name: 'Adam',
        lastname: 'Sandler',
        email: 'adam@gmail.com',
        password: '',
        role: [],
        id: 2
      },
      {
        username: 'angel',
        name: 'Angel',
        lastname: 'Johnson',
        email: 'johnson@gmail.com',
        password: '',
        role: [],
        id: 3
      },
      {
        username: 'yanet',
        name: 'Yanet',
        lastname: 'Jackson',
        email: 'yanet@gmail.com',
        password: '',
        role: [],
        id: 4
      }
    ],
    loggedUser: {
      name: 'John Doe',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      id: 1
    }
  },
  mutations: {},
  actions: {},
  getters: {}
})
