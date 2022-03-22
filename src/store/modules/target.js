import axios from 'axios'
export default ({
  namespaced: true,
  state: {
    targetListStore: [],
    idTarget: -1,
    filterColour: '',
    isDefaultViewOnTarget: true,
    check: false,
    targetIdList: [],
    colorDelete: '#000000',
    idNote: -1,
    loggedUser: {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: ''
    },
    isTargetDeleted: false,
    isTableList: true,
    idSubdomain: 55,
    idRootdomain: 55,
    elementSelectedList: [],
    countElementSelected: 0,
    nameSubDomainOpened: '',
    agentStatus: {
      id: -1,
      status: -1
    },
    currentView: '',
    countSubdomainList: 0,
    entitiesToDelete: [],
    targetEliminationStatus: 3,
    rootDomainEliminationStatus: 3,
    // General Store
    operationStatus: {
      status: 3,
      message: ''
    },
    paginator: {
      page: 0,
      startIndex: 0,
      endIndex: 0
    },
    removeAll: false,
    textToSearch: '',
    routePreviousToSearch: ''
  },
  mutations: {
    updateRoutePreviousToSearch (state, route) {
      if (route !== 'SearchResult') {
        state.routePreviousToSearch = route
        state.textToSearch = ''
      }
    },
    changeCounterSubdom (state, countSubd) {
      state.countSubdomainList = countSubd
    },
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
      for (const index1 in state.targetIdList) {
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
    removeSubdomainChecked (state) {
      for (const index1 in state.elementSelectedList) {
        const target = state.targetListStore.find(target => target.id === state.elementSelectedList[index1].idTarget)
        const roots = target.rootDomains.find(roots => roots.id === state.elementSelectedList[index1].idRoot)
        const subdIndex = roots.subdomain.findIndex(subd => subd.id === state.elementSelectedList[index1].idSubdom)
        roots.subdomain.splice(subdIndex, 1)
      }
      state.elementSelectedList = []
      state.nameRoute = ''
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
    setIdNote (state, id) {
      state.idNote = parseInt(id)
    },
    removeTargetNote (state, idTarget) {
      const target = state.targetListStore.find(item => item.id === parseInt(idTarget))
      const noteIndex = target.messages.findIndex(message => message.id === parseInt(state.idNote))
      target.messages.splice(noteIndex, 1)
    },
    removeRootDomainNote (state, params) {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const rootdomain = target.rootDomains.find(rootdomain => rootdomain.id === params.idRootDomain)
      const noteIndex = rootdomain.messages.findIndex(message => message.id === parseInt(state.idNote))
      rootdomain.messages.splice(noteIndex, 1)
    },
    removeSubDomainNote (state, params) {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const rootdomain = target.rootDomains.find(rootdomain => rootdomain.id === params.idRootDomain)
      const subdomain = rootdomain.subdomain.find(subdomainItem => subdomainItem.id === params.idSubDomain)
      const noteIndex = subdomain.messages.findIndex(message => message.id === parseInt(state.idNote))
      subdomain.messages.splice(noteIndex, 1)
    },
    sendTargetNote (state, messageInfo, rootGetters) {
      const target = state.targetListStore.find(item => item.id === messageInfo.idTarget)
      const note = {
        id: state.idNote++,
        message: messageInfo.message,
        sendDate: new Date(),
        sender: messageInfo.username
      }
      target.messages.push(note)
    },
    sendRootDomainNote (state, messageInfo) {
      const target = state.targetListStore.find(item => item.id === messageInfo.idTarget)
      const rootdomain = target.rootDomains.find(rootdomain => rootdomain.id === messageInfo.idRootDomain)
      const note = {
        id: state.idNote++,
        message: messageInfo.message,
        sendDate: new Date(),
        sender: messageInfo.username
      }
      rootdomain.messages.push(note)
    },
    sendSubDomainNote (state, messageInfo) {
      const target = state.targetListStore.find(item => item.id === messageInfo.idTarget)
      const rootdomain = target.rootDomains.find(rootdomain => rootdomain.id === messageInfo.idRootDomain)
      const subdomain = rootdomain.subdomain.find(subDomain => subDomain.id === messageInfo.idSubDomain)
      const note = {
        id: state.idNote++,
        message: messageInfo.message,
        sendDate: new Date(),
        sender: messageInfo.username
      }
      subdomain.messages.push(note)
    },
    setIsTargetDeleted (state, value) {
      state.isTargetDeleted = value
    },
    addSubdomain (state, params) {
      for (let index = 0; index < params.subdomainsItems.length; index++) {
        params.subdomainsItems[index].id = state.idSubdomain++
      }
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idRootDomain)
      roots.subdomain = roots.subdomain.concat(params.subdomainsItems)
    },
    addRootDomain (state, params) {
      for (let index = 0; index < params.rootdomainsItems.length; index++) {
        params.rootdomainsItems[index].id = state.idRootdomain++
      }
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      target.rootDomains = target.rootDomains.concat(params.rootdomainsItems)
    },
    addSelectedList (state, ObjectIn) {
      state.elementSelectedList.push(ObjectIn)
    },
    cancelElementSelected (state) {
      state.elementSelectedList = []
      state.nameRoute = ''
      state.countElementSelected = 0
    },
    removeCountElementSelected (state, idSub) {
      state.countElementSelected = state.countElementSelected - 1
      const subdIndex = state.elementSelectedList.findIndex(item => item.idSubdom === idSub)
      state.elementSelectedList.splice(subdIndex, 1)
    },
    addCountElementSelected (state) {
      state.countElementSelected = state.countElementSelected + 1
    },
    setNameSubDomainOpened (state, name) {
      state.nameSubDomainOpened = name
      return state.nameSubDomainOpened
    },
    setAgentStatus (state, agentStatus) {
      state.agentStatus = agentStatus
    },
    setCurrentView (state, viewName) {
      state.currentView = viewName
    },
    updateStatusRootDomainAgent (state, params) {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idRoot)
      const agent = roots.agent.find(agentItem => agentItem.id === params.idAgent)
      agent.status = params.status
    },
    updateStatusSubDomainAgent (state, params) {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idRoot)
      const subd = roots.subdomain.find(sub => sub.id === params.idSubDomain)
      const agent = subd.agent.find(agentItem => agentItem.id === params.idAgent)
      agent.status = params.status
    },
    insertAgentIfNotExistInRootDomain (state, params) {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idRoot)
      const agent = roots.agent.find(agentItem => agentItem.id === params.agentData.id)
      if (!agent) {
        roots.agent.push(
          JSON.parse(JSON.stringify(params.agentData))
        )
      }
    },
    insertAgentIfNotExistInSubDomain (state, params) {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idRoot)
      const subd = roots.subdomain.find(sub => sub.id === params.idSubDomain)
      const agent = subd.agent.find(agentItem => agentItem.id === params.agentData.id)
      if (!agent) {
        subd.agent.push(
          JSON.parse(JSON.stringify(params.agentData))
        )
      }
    },
    updateTargets (state, targets) {
      state.targetListStore.splice(0, state.targetListStore.length)
      targets.forEach(target => {
        state.targetListStore.push(target)
      })
    },
    addEntityToDelete (state, entity) {
      state.entitiesToDelete.push(entity)
    },
    removeTargetEntityToDelete (state, idEntity) {
      const index = state.entitiesToDelete.findIndex(target => target.id === idEntity)
      if (index !== -1) {
        state.entitiesToDelete.splice(index, 1)
      }
    },
    clearTargetEntitiesToDelete (state) {
      state.entitiesToDelete.forEach(entity => {
        const index = state.targetListStore.findIndex(target => target.id === entity.id)
        if (index !== -1) {
          state.targetListStore.splice(index, 1)
        }
      })
      state.entitiesToDelete.splice(0, state.entitiesToDelete.length)
    },
    clearRootDomainEntitiesToDelete (state, entities) {
      state.entitiesToDelete.forEach(entity => {
        const target = state.targetListStore.find(target => target.name === entities.targetName)
        const rootsIndex = target.rootDomains.findIndex(roots => roots.id === entity.id)
        if (rootsIndex !== -1) {
          target.rootDomains.splice(rootsIndex, 1)
        }
      })
      state.entitiesToDelete.splice(0, state.entitiesToDelete.length)
    },
    clearSubDomainEntitiesToDelete (state, entities) {
      state.entitiesToDelete.forEach(entity => {
        const target = state.targetListStore.find(target => target.name === entities.targetName)
        const rootdomain = target.rootDomains.find(rootdomain => rootdomain.root === entities.rootDomainName)
        const subDomainIndex = rootdomain.subdomain.findIndex(subdomain => subdomain.id === entity.id)
        if (subDomainIndex !== -1) {
          rootdomain.subdomain.splice(subDomainIndex, 1)
        }
      })
      state.entitiesToDelete.splice(0, state.entitiesToDelete.length)
    },
    clearAllSubDomainEntitiesToDelete (state, entities) {
      const target = state.targetListStore.find(target => target.name === entities.targetName)
      const rootdomain = target.rootDomains.find(rootdomain => rootdomain.root === entities.rootDomainName)
      rootdomain.subdomain.splice(0, rootdomain.subdomain.length)
      state.entitiesToDelete.splice(0, state.entitiesToDelete.length)
    },
    clearReferencesToDelete (state) {
      state.entitiesToDelete.splice(0, state.entitiesToDelete.length)
    },
    updateTargetEliminationStatus (state, status) {
      state.targetEliminationStatus = status
    },
    updateRootDomainEliminationStatus (state, status) {
      state.rootDomainEliminationStatus = status
    },
    updateOperationStatusInfo (state, statusData) {
      state.operationStatus.status = statusData.status
      state.operationStatus.message = statusData.message
    },
    updatePaginator (state, paginatorData) {
      state.paginator.page = paginatorData.page
      state.paginator.startIndex = paginatorData.startIndex
      state.paginator.endIndex = paginatorData.endIndex
    },
    updateRemoveAllOption (state, value) {
      state.removeAll = value
    },
    updateUserPassword (state, newPassword) {
      state.loggedUser.password = newPassword
    },
    updateTextToSearch (state, newFilter) {
      state.textToSearch = newFilter
    }
  },
  actions: {
    loadTargets ({ state, commit, getters }) {
      if (state.authentication_token !== '') {
        return axios.get('/targets')
          .then(function (response) {
            const targetsMapped = getters.mapTargets(response.data)
            commit('updateTargets', targetsMapped)
            return true
          })
          .catch(function () {
            return false
          })
      }
    },
    addTargetToServer ({ state, rootState, getters }, target) {
      if (rootState.auth.authentication_token !== '') {
        return axios.post('/targets', getters.mapTargetFromLocalToServer(target))
          .then(function (response) {
            target.id = response.data.id
            state.targetListStore.push(target)
            return { status: true, message: '' }
          })
          .catch(function (error) {
            return { status: false, message: error.response.data }
          })
      }
    },
    updateTargetToServer ({ state, rootState, getters, commit }, target) {
      if (rootState.auth.authentication_token !== '') {
        return axios.put('/targets/' + target.id, getters.mapTargetFromLocalToServer(target))
          .then(function (response) {
            commit('updateTarget', target)
            return { status: true, message: '' }
          })
          .catch(function (error) {
            return { status: false, message: error.response.data }
          })
      }
    },
    removeTargetsSelected ({ state, commit, rootState }) {
      state.entitiesToDelete.forEach(entity => {
        const index = state.targetListStore.findIndex(target => target.id === entity.id)
        if (index !== -1) {
          state.targetListStore.splice(index, 1)
        }
      })
      commit('clearReferencesToDelete')
    },
    clearTargetEntitiesToDeleteToServer ({ state, dispatch }) {
      const targetNames = []
      state.entitiesToDelete.forEach(entity => {
        let targetName
        const index = state.targetListStore.findIndex(target => target.id === entity.id)
        if (index !== -1) {
          targetName = state.targetListStore[index].name
          targetNames.push(targetName)
        }
      })
      return axios.delete('/targets/batch', {
        data: targetNames
      }).then(function (response) {
        dispatch('removeTargetsSelected')
        return { status: true, message: '' }
      }).catch(function (error) {
        return { status: false, message: error.response.data }
      })
    }
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
    getTargetNotes: (state) => (id) => {
      return state.targetListStore.find(target => target.id === id).messages
    },
    getRootDomainNotes: (state) => (params) => {
      const target = state.targetListStore.find(target => target.id === params.idTarget)
      if (target) {
        return target.rootDomains.find(rootdomain => rootdomain.id === params.idRootDomain).messages
      } else {
        return []
      }
    },
    getSubDomainNotes: (state) => (params) => {
      const target = state.targetListStore.find(target => target.id === params.idTarget)
      if (target) {
        const rootDomain = target.rootDomains.find(rootdomain => rootdomain.id === params.idRootDomain)
        if (rootDomain) {
          const subdomain = rootDomain.subdomain.find(subdomain => subdomain.id === params.idSubDomain)
          if (subdomain) {
            return subdomain.messages
          } else {
            return []
          }
        }
      } else {
        return []
      }
    },
    checkIfTargetExistsByName: (state) => (targetInfo) => {
      const currentTarget = state.targetListStore.find(target => target.name === targetInfo.name)
      if (currentTarget && currentTarget.id !== targetInfo.id) {
        return true
      }
      return false
    },
    getSubdomainSize: (state) => (params) => {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idRootDomain)
      if (roots) {
        return roots.subdomain.length
      }
    },
    getRootDomainByIdTargetAndIdRootDomain: (state) => (params) => {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idRootDomain)
      return roots
    },
    getSubDomain: (state) => (params) => {
      const target = state.targetListStore.find(item => item.id === params.idtarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idrootdomain)
      const subdomain = roots.subdomain.find(subdItem => subdItem.id === params.idsubdomain)
      return subdomain
    },
    checkIfSubdomainExistsByName: (state) => (params) => {
      const target = state.targetListStore.find(item => item.id === params.idtarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idrootdomain)
      const subdomain = roots.subdomain.find(subdItem => subdItem.name === params.name)
      if (subdomain) {
        return true
      }
      return false
    },
    checkIfRootdomainExistsByName: (state) => (params) => {
      const target = state.targetListStore.find(item => item.id === params.idtarget)
      const roots = target.rootDomains.find(roots => roots.root === params.name)
      if (roots) {
        return true
      }
      return false
    },
    filterTargetsByName: (state) => (data) => {
      if (data.name !== '') {
        let temporal = []
        if (!data.strict) {
          temporal = state.targetListStore.filter(item => item.name.toLowerCase().replace(/\s+/g, '').includes(data.name.toLowerCase().replace(/\s+/g, '')))
        } else {
          temporal = state.targetListStore.filter(item => item.name.toLowerCase().replace(/\s+/g, '') === data.name.toLowerCase().replace(/\s+/g, ''))
        }
        const entities = []
        temporal.forEach(element => {
          entities.push(
            {
              name: element.name,
              entityType: 1,
              entityId: element.id
            }
          )
        })
        return entities.filter((item, index) => entities.findIndex(obj => obj.name === item.name) === index)
      } else {
        return []
      }
    },
    getTargetByName: (state) => (targetName) => {
      const target = state.targetListStore.find(item => item.name === targetName)
      return target
    },
    getTargetAndRootDomainByName: (state) => (entityNames) => {
      const target = state.targetListStore.find(item => item.name === entityNames.targetName)
      const rootdomain = target.rootDomains.find(item => item.root === entityNames.rootDomainName)
      return rootdomain
    },
    filterRootDomainsByName: (state) => (data) => {
      let temporal = []
      state.targetListStore.forEach(element => {
        if (!data.strict) {
          temporal = temporal.concat(
            element.rootDomains.filter(item => item.root.includes(data.name))
          )
        } else {
          temporal = temporal.concat(
            element.rootDomains.filter(item => item.root === data.name)
          )
        }
      })
      const entities = []
      temporal.forEach(element => {
        entities.push(
          {
            name: element.root,
            entityType: 2,
            entityId: element.id
          }
        )
      })
      return entities.filter((item, index) => entities.findIndex(obj => obj.name === item.name) === index)
    },
    filterSubDomainsByName: (state) => (data) => {
      let temporal = []
      state.targetListStore.forEach(target => {
        target.rootDomains.forEach(rootDomain => {
          if (!data.strict) {
            temporal = temporal.concat(
              rootDomain.subdomain.filter(item => item.name.includes(data.name))
            )
          } else {
            temporal = temporal.concat(
              rootDomain.subdomain.filter(item => item.name === data.name)
            )
          }
        })
      })
      const entities = []
      temporal.forEach(element => {
        entities.push(
          {
            name: element.name,
            entityType: 3,
            entityId: element.id
          }
        )
      })
      return entities.filter((item, index) => entities.findIndex(obj => obj.name === item.name) === index)
    },
    listRootDomainsAgents: (state) => (params) => {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idRoot)
      return roots.agent.slice(-4)
    },
    listSubdDomainsAgents: (state) => (params) => {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idRoot)
      const subdomain = roots.subdomain.find(subd => subd.id === params.idSubd)
      return subdomain.agent.slice(-4)
    },
    listCurrentRunningRootDomainsAgent: (state) => (params) => {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idRoot)
      const runningAgent = roots.agent.find(agent => agent.status === 1)
      if (runningAgent) {
        return runningAgent.id
      }
      return -1
    },
    listCurrentRunningSubDomainsAgent: (state) => (params) => {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idRoot)
      const subdomain = roots.subdomain.find(subd => subd.id === params.idSubd)
      const runningAgent = subdomain.agent.find(agent => agent.status === 1)
      if (runningAgent) {
        return runningAgent.id
      }
      return -1
    },
    getOpenPorts () {
      return [21, 22, 53, 80, 443, 62]
    },
    getNumberSubDomainsByOpenPorts () {
      return [62, 44, 38, 50, 78, 57]
    },
    getNumberOfRunningTargets () {
      return 110
    },
    getPercentOfRunningTargets () {
      return 87
    },
    getLatestThingsFoundedInRootDomains () {
      return [
        {
          entity: 'yanet',
          date: new Date('06/24/2020')
        },
        {
          subdomain: 'yanet',
          date: new Date('06/24/2020')
        },
        {
          subdomain: 'yanet',
          date: new Date('06/24/2020')
        },
        {
          subdomain: 'yanet',
          date: new Date('06/24/2020')
        },
        {
          subdomain: 'yanet',
          date: new Date('06/24/2020')
        },
        {
          subdomain: 'yanet',
          date: new Date('06/24/2020')
        }
      ]
    },
    mapTargets: (state, getters) => (targets) => {
      const newTargets = []
      let newTarget
      targets.forEach(target => {
        newTarget = getters.mapTargetFromServerToLocal(target)
        newTargets.push(newTarget)
      })
      return newTargets
    },
    mapRootDomainsFromServerToLocal: (state) => (rootDomains) => {
      const newRootDomains = []
      let newRootDomain
      rootDomains.forEach(rootDomain => {
        newRootDomain = {
          id: rootDomain.id,
          root: rootDomain.name,
          date: rootDomain.createdAt,
          subdomain: [],
          messages: [],
          agent: []
        }
        newRootDomains.push(newRootDomain)
      })
      return newRootDomains
    },
    isEntityOnListToRemove: (state) => (idItem) => {
      setTimeout(
        function () {
          const searchedElement = state.entitiesToDelete.find(item => parseInt(item.id) === parseInt(idItem))
          if (searchedElement) {
            return true
          }
          return false
        },
        1000
      )
    },
    getFilteredTargetsByName: (state) => (name) => {
      return state.targetListStore.filter(target => target.name.includes(name))
    },
    getFilteredOthers: (state) => {
      return [{ name: 'Completed repository 2' }]
    },
    getFilteredRootDomainsByName: (state) => (name) => {
      let searchResult = []
      state.targetListStore.forEach(target => {
        searchResult = searchResult.concat(
          target.rootDomains.filter(rootDomains => rootDomains.root.includes(name))
        )
      })
      let sequence = 0
      const finalSearchResult = []
      searchResult.forEach(element => {
        sequence++
        const elementClone = Object.assign({ idSearch: sequence }, element)
        finalSearchResult.push(elementClone)
      })
      return {
        result: finalSearchResult,
        size: finalSearchResult.length
      }
    },
    getFilteredSubDomainsByName: (state) => (name) => {
      let searchResult = []
      state.targetListStore.forEach(target => {
        target.rootDomains.forEach(rootdomain => {
          searchResult = searchResult.concat(
            rootdomain.subdomain.filter(subdomain => subdomain.name.includes(name))
          )
        })
      })
      let sequence = 0
      const finalSearchResult = []
      searchResult.forEach(element => {
        sequence++
        const elementClone = Object.assign({ idSearch: sequence }, element)
        finalSearchResult.push(elementClone)
      })
      return {
        result: finalSearchResult,
        size: finalSearchResult.length
      }
    },
    mapTargetFromServerToLocal: (state, getters) => (target) => {
      const newTarget = {
        id: target.id,
        name: target.name,
        primaryColor: target.primaryColor ? target.primaryColor : '#737be5',
        secondaryColor: target.secondaryColor ? target.secondaryColor : '#7159d3',
        date: new Date(),
        rootDomains: getters.mapRootDomainsFromServerToLocal(target.rootDomains), // getters.mapRootDomains(target.rootDomains),
        isPrivateProgram: target.isPrivate,
        inScope: target.inScope,
        outScope: target.outOfScope,
        messages: [],
        bugBountyUrl: target.bugBountyProgramUrl
      }
      return newTarget
    },
    mapTargetFromLocalToServer: (state, getters) => (target) => {
      const mappedTarget = {
        name: target.name,
        primaryColor: target.primaryColor,
        secondaryColor: target.secondaryColor,
        rootDomains: getters.mapRootDomainsListFromLocalToServer(target.rootDomains),
        isPrivate: target.isPrivateProgram,
        inScope: target.inScope,
        outScope: target.outOfScope,
        messages: [],
        bugBountyProgramUrl: target.bugBountyUrl
      }
      return mappedTarget
    },
    mapRootDomainFromLocalToServer: (state, getters) => (rootDomain) => {
      const newRootDomain = {
        name: rootDomain.root
      }
      return newRootDomain
    },
    mapRootDomainsListFromLocalToServer: (state, getters) => (rootDomainList) => {
      const mappedRootDomains = []
      rootDomainList.forEach(element => {
        const newRootDomain = getters.mapRootDomainFromLocalToServer(element)
        mappedRootDomains.push(newRootDomain)
      })
      return mappedRootDomains
    }
  }
})
