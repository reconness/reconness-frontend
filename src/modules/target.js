export default ({
  namespaced: true,
  state: {
    targetListStore: [
      { id: 1, name: 'My target 1', background: ' linear-gradient(135deg, #03dced 0%, #0cb8e0 100%)', date: '02/01/2020', rootDomains: [{ id: 1, root: 'reconnes.com' }, { id: 2, root: 'anotherness.com' }], bugBountyUrl: 'http://hackerone.com/a', isPrivateProgram: true, inScope: 'In scope 1', outScope: 'In scope 1' },
      { id: 2, name: 'My target 2', background: ' linear-gradient(135deg, #03dced 0%, #0cb8e0 100%)', date: '21/01/2020', rootDomains: [{ id: 1, root: 'reconnes.com' }, { id: 2, root: 'anotherness.com' }, { id: 2, root: 'anothertest1.com' }, { id: 2, root: 'anothertest2.com' }], bugBountyUrl: 'http://hackerone.com/f', isPrivateProgram: false, inScope: 'In scope 5', outScope: 'In scope 5' },
      { id: 3, name: 'My target 3', background: ' linear-gradient(160deg, #F96767 0%, #FF4343 100%)', date: '21/02/2020', rootDomains: [{ id: 1, root: 'reconnes.com' }, { id: 2, root: 'anotherness.com' }], bugBountyUrl: 'http://hackerone.com/b', isPrivateProgram: true, inScope: 'In scope 2', outScope: 'In scope 2' },
      { id: 4, name: 'My target 4', background: ' linear-gradient(135deg, #03dced 0%, #0cb8e0 100%)', date: '21/04/2020', rootDomains: [{ id: 1, root: 'reconnes.com' }, { id: 2, root: 'anotherness.com' }], bugBountyUrl: 'http://hackerone.com/c', isPrivateProgram: true, inScope: 'In scope 3', outScope: 'In scope 3' },
      { id: 5, name: 'My target 5', background: ' linear-gradient(135deg, #3adb99 0%, #16c465 100%)', date: '21/02/2018', rootDomains: [{ id: 1, root: 'reconnes.com' }, { id: 2, root: 'anotherness.com' }], bugBountyUrl: 'http://hackerone.com/d', isPrivateProgram: false, inScope: 'In scope 4', outScope: 'In scope 4' },
      { id: 6, name: 'My target 6', background: 'linear-gradient(130deg, #FF9966 0%, #f36a33 100%)', date: '21/01/2020', rootDomains: [{ id: 1, root: 'reconnes.com' }, { id: 2, root: 'anotherness.com' }] },
      { id: 7, name: 'My target 7', background: ' linear-gradient(160deg, #737be5 0%, #7159d3 100%)', date: '21/06/2020', rootDomains: [{ id: 1, root: 'reconnes.com' }, { id: 2, root: 'anotherness.com' }], bugBountyUrl: 'http://hackerone.com/a', isPrivateProgram: true, inScope: 'In scope 1', outScope: 'In scope 1' },
      { id: 8, name: 'My target 8', background: ' linear-gradient(135deg, #03dced 0%, #0cb8e0 100%)', date: '21/02/2018', rootDomains: [{ id: 1, root: 'reconnes.com' }, { id: 2, root: 'anotherness.com' }], isPrivateProgram: true, inScope: 'In scope 1', outScope: 'In scope 1' },
      { id: 9, name: 'My target 9', background: ' linear-gradient(135deg, #03dced 0%, #0cb8e0 100%)', date: '21/09/2020', rootDomains: [{ id: 1, root: 'reconnes.com' }, { id: 2, root: 'anotherness.com' }], isPrivateProgram: true, inScope: 'In scope 1', outScope: 'In scope 1' },
      { id: 10, name: 'My target 10', background: ' linear-gradient(135deg, #3adb99 0%, #16c465 100%)', date: '21/02/2020', rootDomains: [{ id: 1, root: 'reconnes.com' }, { id: 2, root: 'anotherness.com' }], isPrivateProgram: true, inScope: 'In scope 1', outScope: 'In scope 1' },
      { id: 11, name: 'My target 11', background: ' linear-gradient(135deg, #03dced 0%, #0cb8e0 100%)', date: '20/01/2020', rootDomains: [{ id: 1, root: 'reconnes.com' }, { id: 2, root: 'anotherness.com' }], isPrivateProgram: true, inScope: 'In scope 1', outScope: 'In scope 1' }
    ],
    idTarget: -1,
    filterColour: '',
    isDefaultViewOnTarget: true,
    check: false,
    targetIdList: [],
    colorDelete: '#000000'
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
      }
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
    orderRomainsByCalendar (state, id) {
      return state.targetListStore.find(item => item.id === id).rootDomains.sort((a, b) => {
        const as = a.date.split('/')
        const ad = new Date(as[2], as[1] - 1, as[0])
        const bs = b.date.split('/')
        const bd = new Date(bs[2], bs[1] - 1, bs[0])
        return ad - bd
      })
    },
    orderRomainsByNameAsc (state, id) {
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
    orderRomainByNameDesc (state, id) {
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
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    filterByColor (state) {
      return function (colour) {
        return state.targetListStore.filter(item => item.background.includes(colour))
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
    }
  }
})
