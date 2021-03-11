export default ({
  namespaced: true,
  state: {
    targetListStore: [
      {
        id: 1,
        name: 'My target 1',
        primaryColor: '#03dced',
        secondaryColor: '#0cb8e0',
        date: '02/01/2020',
        rootDomains: [
          {
            id: 1,
            root: 'reconnes.com',
            date: '21/09/2018',
            subdomain: [
              {
                id: 1,
                name: 'Yanet',
                added: '2020-12-01',
                checking: true,
                interesting: false,
                vulnerable: true,
                boubty: true,
                ignore: false,
                scope: true,
                agent: [],
                ipAddress: '34.234.345.34',
                http: true
              },
              {
                id: 2,
                name: 'Portraite',
                added: '2020-12-02',
                checking: false,
                interesting: true,
                vulnerable: true,
                boubty: true,
                ignore: false,
                scope: true,
                agent: [],
                ipAddress: '34.234.345.34',
                http: true
              }
            ]
          },
          {
            id: 2,
            root: 'anotherness.com',
            date: '21/08/2018',
            subdomain: [
              {
                id: 1,
                name: 'Yanet',
                added: '2020-12-01',
                checking: true,
                interesting: false,
                vulnerable: true,
                boubty: true,
                ignore: false,
                scope: true,
                agents: [],
                ipAddress: '34.234.345.34',
                http: true
              },
              {
                id: 2,
                name: 'yahoo.com',
                date: '2020-12-02',
                checking: false,
                interesting: true,
                vulnerable: true,
                boubty: true,
                ignore: false,
                scope: true,
                agent: 'Portraite'
              }
            ]
          }
        ],
        bugBountyUrl: 'http://hackerone.com/a',
        isPrivateProgram: true,
        inScope: 'In scope 1',
        outScope: 'In scope 1',
        messages: [
          {
            id: 1,
            sender: 'Michael',
            sendDate: '2020-01-01',
            message: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'
          },
          {
            id: 2,
            sender: 'Belinda',
            sendDate: '2020-12-01',
            message: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
          }
        ]
      },
      {
        id: 2,
        name: 'My target 2',
        primaryColor: '#03dced',
        secondaryColor: '#0cb8e0',
        date: '21/01/2020',
        rootDomains: [
          {
            id: 1,
            root: 'reconnes.com',
            date: '21/09/2018',
            subdomain: [
              {
                id: 1,
                name: 'Yanet',
                added: '2020-12-01',
                checking: true,
                interesting: false,
                vulnerable: true,
                boubty: true,
                ignore: false,
                scope: true,
                agent: [],
                ipAddress: '34.234.345.34',
                http: true
              }
            ]
          },
          {
            id: 2,
            root: 'anotherness.com',
            date: '21/08/2018',
            subdomain: []
          },
          {
            id: 3,
            root: 'anothertest1.com',
            date: '21/07/2018',
            subdomain: []
          },
          {
            id: 4,
            root: 'anothertest2.com',
            date: '21/06/2018',
            subdomain: []
          }
        ],
        bugBountyUrl: 'http://hackerone.com/f',
        isPrivateProgram: false,
        inScope: 'In scope 5',
        outScope: 'In scope 5',
        messages: [
          {
            id: 1,
            sender: 'Michael',
            sendDate: '2020-02-01',
            message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
          }
        ]
      },
      {
        id: 3,
        name: 'My target 3',
        primaryColor: '#F96767',
        secondaryColor: '#FF4343',
        date: '21/02/2020',
        rootDomains: [
          {
            id: 1,
            root: 'reconnes.com',
            date: '21/09/2018',
            subdomain: [
              {
                id: 1,
                name: 'Yanet',
                added: '2020-12-01',
                checking: true,
                interesting: false,
                vulnerable: true,
                boubty: true,
                ignore: false,
                scope: true,
                agent: [],
                ipAddress: '34.234.345.34',
                http: true
              }
            ]
          },
          {
            id: 2,
            root: 'anotherness.com',
            date: '21/08/2018',
            subdomain: []
          }
        ],
        bugBountyUrl: 'http://hackerone.com/b',
        isPrivateProgram: true,
        inScope: 'In scope 2',
        outScope: 'In scope 2',
        messages: [
          {
            id: 1,
            sender: 'Michael',
            sendDate: '2020-02-01',
            message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
          }
        ]
      },
      {
        id: 4,
        name: 'My target 4',
        primaryColor: '#03dced',
        secondaryColor: '#0cb8e0',
        date: '21/04/2020',
        rootDomains: [
          {
            id: 1,
            root: 'reconnes.com',
            date: '21/09/2018',
            subdomain: []
          },
          {
            id: 2,
            root: 'anotherness.com',
            date: '21/08/2018',
            subdomain: []
          }
        ],
        bugBountyUrl: 'http://hackerone.com/c',
        isPrivateProgram: true,
        inScope: 'In scope 3',
        outScope: 'In scope 3',
        messages: [
          {
            id: 1,
            sender: 'Michael',
            sendDate: '2020-02-01',
            message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
          }
        ]
      },
      {
        id: 5,
        name: 'My target 5',
        primaryColor: '#3adb99',
        secondaryColor: '#16c465',
        date: '21/02/2018',
        rootDomains: [
          {
            id: 1,
            root: 'reconnes.com',
            date: '21/09/2018',
            subdomain: []
          },
          {
            id: 2,
            root: 'anotherness.com',
            date: '21/08/2018',
            subdomain: []
          }
        ],
        bugBountyUrl: 'http://hackerone.com/d',
        isPrivateProgram: false,
        inScope: 'In scope 4',
        outScope: 'In scope 4',
        messages: [
          {
            id: 1,
            sender: 'Michael',
            sendDate: '2020-02-01',
            message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
          }
        ]
      },
      {
        id: 6,
        name: 'My target 6',
        // background: 'linear-gradient(130deg, #FF9966 0%, #f36a33 100%)',
        primaryColor: '#FF9966',
        secondaryColor: '#f36a33',
        date: '21/01/2020',
        rootDomains: [
          {
            id: 1,
            root: 'reconnes.com',
            date: '21/09/2018',
            subdomain: []
          },
          {
            id: 2,
            root: 'anotherness.com',
            date: '21/08/2018',
            subdomain: []
          }
        ],
        messages: [
          {
            id: 1,
            sender: 'Michael',
            sendDate: '2020-02-01',
            message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
          }
        ]
      },
      {
        id: 7,
        name: 'My target 7',
        // background: ' linear-gradient(160deg, #737be5 0%, #7159d3 100%)',
        primaryColor: '#737be5',
        secondaryColor: '#7159d3',
        date: '21/06/2020',
        rootDomains: [
          {
            id: 1,
            root: 'reconnes.com',
            date: '21/09/2018',
            subdomain: []
          },
          {
            id: 2,
            root: 'anotherness.com',
            date: '21/08/2018',
            subdomain: []
          }
        ],
        bugBountyUrl: 'http://hackerone.com/a',
        isPrivateProgram: true,
        inScope: 'In scope 1',
        outScope: 'In scope 1',
        messages: [
          {
            id: 1,
            sender: 'Michael',
            sendDate: '2020-02-01',
            message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
          }
        ]
      },
      {
        id: 8,
        name: 'My target 8',
        // background: ' linear-gradient(135deg, #03dced 0%, #0cb8e0 100%)',
        primaryColor: '#03dced',
        secondaryColor: '#0cb8e0',
        date: '21/02/2018',
        rootDomains: [
          {
            id: 1,
            root: 'reconnes.com',
            date: '21/09/2018',
            subdomain: []
          },
          {
            id: 2,
            root: 'anotherness.com',
            date: '21/08/2018',
            subdomain: []
          }
        ],
        isPrivateProgram: true,
        inScope: 'In scope 1',
        outScope: 'In scope 1',
        messages: [
          {
            id: 1,
            sender: 'Michael',
            sendDate: '2020-02-01',
            message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
          }
        ]
      },
      {
        id: 9,
        name: 'My target 9',
        primaryColor: '#03dced',
        secondaryColor: '#0cb8e0',
        date: '21/09/2020',
        rootDomains: [
          {
            id: 1,
            root: 'reconnes.com',
            date: '21/09/2018',
            subdomain: []
          },
          {
            id: 2,
            root: 'anotherness.com',
            date: '21/08/2018',
            subdomain: []
          }
        ],
        isPrivateProgram: true,
        inScope: 'In scope 1',
        outScope: 'In scope 1',
        messages: [
          {
            id: 1,
            sender: 'Michael',
            sendDate: '2020-02-01',
            message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
          }
        ]
      },
      {
        id: 10,
        name: 'My target 10',
        primaryColor: '#3adb99',
        secondaryColor: '#16c465',
        date: '21/02/2020',
        rootDomains: [
          {
            id: 1,
            root: 'reconnes.com',
            date: '21/09/2018',
            subdomain: []
          },
          {
            id: 2,
            root: 'anotherness.com',
            date: '21/08/2018',
            subdomain: []
          }
        ],
        isPrivateProgram: true,
        inScope: 'In scope 1',
        outScope: 'In scope 1',
        messages: [
          {
            id: 1,
            sender: 'Michael',
            sendDate: '2020-02-01',
            message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
          }
        ]
      },
      {
        id: 11,
        name: 'My target 11',
        primaryColor: '#03dced',
        secondaryColor: '#0cb8e0',
        date: '20/01/2020',
        rootDomains: [
          {
            id: 1,
            root: 'reconnes.com',
            date: '21/09/2018',
            subdomain: []
          },
          {
            id: 2,
            root: 'anotherness.com',
            date: '21/08/2018',
            subdomain: []
          }
        ],
        isPrivateProgram: true,
        inScope: 'In scope 1',
        outScope: 'In scope 1',
        messages: [
          {
            id: 1,
            sender: 'Michael',
            sendDate: '2020-02-01',
            message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
          }
        ]
      }
    ],
    idTarget: -1,
    filterColour: '',
    isDefaultViewOnTarget: true,
    check: false,
    targetIdList: [],
    colorDelete: '#000000',
    idMessage: -1,
    loggedUser: { name: 'John Doe' },
    isTargetDeleted: false,
    isTableList: true,
    idSubdomain: 55
  },
  mutations: {
    removebyIdTarget (state, id) {
      const index = state.targetIdList.findIndex(target => target.id === id)
      if (index !== -1) {
        state.targetIdList.splice(index, 1)
        if (state.targetIdList.length === 0) {
          state.colorDelete = '#000000'
        }
      }
    },
    addIdTarget (state, target) {
      state.targetIdList.push(target)
      if (state.targetIdList.length === 1) {
        state.colorDelete = '#ff4545'
      }
    },
    editList (state) {
      state.check = !state.check
      state.styleList = '0px'
    },
    setIdTarget (state, id) {
      state.idTarget = id
    },
    removeTarget (state, targetName) {
      const index = state.targetListStore.findIndex(target => target.name === targetName)
      if (index !== -1) {
        state.targetListStore.splice(index, 1)
        state.nameRoute = ''
        state.valueDelete = ''
      }
    },
    removeRootDomain (state, params) {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const rootsIndex = target.rootDomains.findIndex(roots => roots.id === params.idRootDomain)
      target.rootDomains.splice(rootsIndex, 1)
    },
    removeSubDomain (state, tarjetObj) {
      const target = state.targetListStore.find(item => item.id === tarjetObj.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === tarjetObj.idRoot)
      const subdIndex = roots.subdomain.findIndex(subd => subd.name === tarjetObj.nameSubd)
      roots.subdomain.splice(subdIndex, 1)
      state.nameRoute = ''
      state.valueDelete = ''
    },
    removeSubDomains (state, tarjetObj) {
      const target = state.targetListStore.find(item => item.id === tarjetObj.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === tarjetObj.idRoot)
      roots.subdomain = []
      state.nameRoute = ''
      state.valueDelete = ''
    },
    removeTargets (state) {
      for (var index1 in state.targetIdList) {
        const index = state.targetListStore.findIndex(target => target.id === state.targetIdList[index1].id)
        if (index !== -1) {
          state.targetListStore.splice(index, 1)
        }
      }
      state.targetIdList = []
      state.check = false
      state.styleList = '1.25rem'
      state.colorDelete = '#000000'
    },
    setIsDefaultViewOnTarget (state, value) {
      state.isDefaultViewOnTarget = value
    },
    setIsDefaultTabButton (state, value) {
      state.isTableList = value
    },
    isFilter (state, backg) {
      state.filterColour = backg
    },
    addTarget (state, target) {
      state.targetListStore.push(target)
    },
    updateTarget (state, target) {
      const item = state.targetListStore.find(item => item.id === target.id)
      Object.assign(item, target)
    },
    cancelIdTarget (state) {
      state.targetIdList = []
      state.check = !state.check
      state.styleList = '1.25rem'
      state.colorDelete = '#000000'
    },
    orderDomainsByCalendar (state, id) {
      return state.targetListStore.find(item => item.id === id).rootDomains.sort((a, b) => {
        const as = a.date.split('/')
        const ad = new Date(as[2], as[1] - 1, as[0])
        const bs = b.date.split('/')
        const bd = new Date(bs[2], bs[1] - 1, bs[0])
        return ad - bd
      })
    },
    orderDomainsByNameAsc (state, id) {
      function compare (a, b) {
        if (a.root < b.root) {
          return -1
        }
        if (a.root > b.root) {
          return 1
        }
        return 0
      }
      return (state.targetListStore.find(item => item.id === id)).rootDomains.sort(compare)
    },
    orderDomainByNameDesc (state, id) {
      function compare (a, b) {
        if (b.root < a.root) {
          return -1
        }
        if (b.root > a.root) {
          return 1
        }
        return 0
      }
      return (state.targetListStore.find(item => item.id === id)).rootDomains.sort(compare)
    },
    orderMessagesByCalendar (state, id) {
      return state.targetListStore.find(item => item.id === id).messages.sort((a, b) => {
        const as = a.sendDate.split('-')
        const ad = new Date(as[2], as[1] - 1, as[0])
        const bs = b.sendDate.split('-')
        const bd = new Date(bs[2], bs[1] - 1, bs[0])
        return bd - ad
      })
    },
    orderMessagesByUserNameAsc (state, id) {
      function compare (a, b) {
        if (a.sender < b.sender) {
          return -1
        }
        if (a.sender > b.sender) {
          return 1
        }
        return 0
      }
      return (state.targetListStore.find(item => item.id === id)).messages.sort(compare)
    },
    orderMessagesByUserNameDesc (state, id) {
      function compare (a, b) {
        if (b.sender < a.sender) {
          return -1
        }
        if (b.sender > a.sender) {
          return 1
        }
        return 0
      }
      return (state.targetListStore.find(item => item.id === id)).messages.sort(compare)
    },
    setIdMessage (state, id) {
      state.idMessage = parseInt(id)
    },
    removeMessage (state, idTarget) {
      const target = state.targetListStore.find(item => item.id === parseInt(idTarget))
      const messageIndex = target.messages.findIndex(message => message.id === parseInt(state.idMessage))
      target.messages.splice(messageIndex, 1)
    },
    sendTargetMessage (state, messageInfo, rootGetters) {
      const target = state.targetListStore.find(item => item.id === messageInfo.idTarget)
      const message = {
        id: state.idMessage++,
        message: messageInfo.message,
        sendDate: new Date(),
        sender: state.loggedUser.name
      }
      target.messages.push(message)
    },
    setIsTargetDeleted (state, value) {
      state.isTargetDeleted = value
    },
    addSubdomain (state, params) {
      for (let index = 0; index < params.subdomainsItems; index++) {
        params.subdomainsItems[index].id = state.idSubdomain++
      }
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idRootDomain)
      roots.subdomain = roots.subdomain.concat(params.subdomainsItems)
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    filterByColor (state) {
      return function (colour) {
        return state.targetListStore.filter(item => ('linear-gradient(160deg,' + item.primaryColor + ' ' + '0%,' + item.secondaryColor + ' ' + '100%) 0% 0% no-repeat padding-box').includes(colour))
      }
    },
    getLasTenTargets (state) {
      if (state.targetListStore.length <= 10) {
        return state.targetListStore
      } else {
        return state.targetListStore.slice(state.targetListStore.length - 10)
      }
    },
    idTarget: state => {
      return state.idTarget
    },
    getTargetById: (state) => (id) => {
      return state.targetListStore.find(target => target.id === id)
    },
    getTargetMessages: (state) => (id) => {
      return state.targetListStore.find(target => target.id === id).messages
    },
    checkIfTargetExistsByName: (state) => (targetName) => {
      const currentTarget = state.targetListStore.find(target => target.name === targetName)
      if (currentTarget) {
        return true
      }
      return false
    },
    getSubdomainSize: (state) => (params) => {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idRootDomain)
      return roots.subdomain.length
    }
  }
})
