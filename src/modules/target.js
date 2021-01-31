export default ({
  namespaced: true,
  state: {
    targetListStore: [
      { id: 1, name: 'My target 1', background: 'transparent linear-gradient(135deg, #03dced 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box', date: '02/01/2020', rootDomains: [{ id: 1, root: 'reconnes.com' }, { id: 2, root: 'anotherness.com' }], bugBountyUrl: '', isPrivateProgram: false, inScope: '', outScope: '' },
      { id: 2, name: 'My target 2', background: 'transparent linear-gradient(135deg, #03dced 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box', date: '21/01/2020', rootDomains: [{ id: 1, root: 'reconnes.com' }, { id: 2, root: 'anotherness.com' }, { id: 2, root: 'anothertest1.com' }, { id: 2, root: 'anothertest2.com' }], bugBountyUrl: '', isPrivateProgram: false, inScope: '', outScope: '' },
      { id: 3, name: 'My target 3', background: 'transparent linear-gradient(160deg, #F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box', date: '21/02/2020', rootDomains: [{ id: 1, root: 'reconnes.com' }, { id: 2, root: 'anotherness.com' }], bugBountyUrl: '', isPrivateProgram: true, inScope: '', outScope: '' },
      { id: 4, name: 'My target 4', background: 'transparent linear-gradient(135deg, #03dced 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box', date: '21/04/2020', rootDomains: [{ id: 1, root: 'reconnes.com' }, { id: 2, root: 'anotherness.com' }], bugBountyUrl: '', isPrivateProgram: true, inScope: '', outScope: '' },
      { id: 5, name: 'My target 5', background: 'transparent linear-gradient(135deg, #3adb99 0%, #16c465 100%) 0% 0% no-repeat padding-box', date: '21/02/2018', rootDomains: [{ id: 1, root: 'reconnes.com' }, { id: 2, root: 'anotherness.com' }], bugBountyUrl: '', isPrivateProgram: false, inScope: '', outScope: '' },
      { id: 6, name: 'My target 6', background: '#FF8650 0% 0% no-repeat padding-box', date: '21/01/2020', rootDomains: [{ id: 1, root: 'reconnes.com' }, { id: 2, root: 'anotherness.com' }] },
      { id: 7, name: 'My target 7', background: 'transparent linear-gradient(160deg, #737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box', date: '21/06/2020', rootDomains: [{ id: 1, root: 'reconnes.com' }, { id: 2, root: 'anotherness.com' }] },
      { id: 8, name: 'My target 8', background: 'transparent linear-gradient(135deg, #03dced 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box', date: '21/02/2018', rootDomains: [{ id: 1, root: 'reconnes.com' }, { id: 2, root: 'anotherness.com' }] },
      { id: 9, name: 'My target 9', background: 'transparent linear-gradient(135deg, #03dced 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box', date: '21/09/2020', rootDomains: [{ id: 1, root: 'reconnes.com' }, { id: 2, root: 'anotherness.com' }] },
      { id: 10, name: 'My target 10', background: 'transparent linear-gradient(135deg, #3adb99 0%, #16c465 100%) 0% 0% no-repeat padding-box', date: '21/02/2020', rootDomains: [{ id: 1, root: 'reconnes.com' }, { id: 2, root: 'anotherness.com' }] },
      { id: 11, name: 'My target 11', background: 'transparent linear-gradient(135deg, #03dced 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box', date: '20/01/2020', rootDomains: [{ id: 1, root: 'reconnes.com' }, { id: 2, root: 'anotherness.com' }] }
    ],
    idTarget: -1,
    filterColour: '',
    isDefaultViewOnTarget: true
  },
  mutations: {
    setIdTarget (state, id) {
      state.idTarget = id
    },
    removeTarget (state, targetName) {
      const index = state.targetListStore.findIndex(target => target.name === targetName)
      if (index !== -1) {
        state.targetListStore.splice(index, 1)
      }
    },
    setIsDefaultViewOnTarget (state) {
      state.isDefaultViewOnTarget = !state.isDefaultViewOnTarget
    },
    addTarget (state, target) {
      state.targetListStore.push(target)
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
