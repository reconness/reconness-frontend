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
    idNote: '',
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
    routePreviousToSearch: '',
    selectedTargets: [],
    targetLoadingProcessStatus: 1,
    rootdomainLoadingProcessStatus: 1,
    subDomainLoadingProcessStatus: 1
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
      state.idNote = id
    },
    removeTargetNote (state, targetName) {
      const target = state.targetListStore.find(item => item.name === targetName)
      const noteIndex = target.messages.findIndex(message => message.id === state.idNote)
      target.messages.splice(noteIndex, 1)
    },
    removeRootDomainNote (state, params) {
      const target = state.targetListStore.find(item => item.name === params.targetName)
      const rootdomain = target.rootDomains.find(rootdomain => rootdomain.root === params.rootdomainName)
      const noteIndex = rootdomain.messages.findIndex(message => message.id === state.idNote)
      rootdomain.messages.splice(noteIndex, 1)
    },
    removeSubDomainNote (state, params) {
      const target = state.targetListStore.find(item => item.name === params.targetName)
      const rootdomain = target.rootDomains.find(rootdomain => rootdomain.root === params.rootdomainName)
      const subdomain = rootdomain.subdomain.find(subdomainItem => subdomainItem.subdomainName === params.subdomainName)
      const noteIndex = subdomain.messages.findIndex(message => message.id === state.idNote)
      subdomain.messages.splice(noteIndex, 1)
    },
    sendTargetNote (state, messageInfo) {
      const target = state.targetListStore.find(item => item.name === messageInfo.targetName)
      const note = {
        id: messageInfo.id,
        message: messageInfo.message,
        sendDate: new Date(),
        sender: messageInfo.username
      }
      target.messages.push(note)
    },
    sendRootDomainNote (state, messageInfo) {
      const target = state.targetListStore.find(item => item.name === messageInfo.targetName)
      const rootdomain = target.rootDomains.find(rootdomain => rootdomain.root === messageInfo.rootDomainName)
      const note = {
        id: messageInfo.id,
        message: messageInfo.message,
        sendDate: new Date(),
        sender: messageInfo.username
      }
      rootdomain.messages.push(note)
    },
    sendSubDomainNote (state, messageInfo) {
      const target = state.targetListStore.find(item => item.name === messageInfo.targetName)
      const rootdomain = target.rootDomains.find(rootdomain => rootdomain.root === messageInfo.rootdomainName)
      const subdomain = rootdomain.subdomain.find(subDomain => subDomain.name === messageInfo.subdomainName)
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
    addSubdomainsByTargetNameAndRootDomainName (state, params) {
      const target = state.targetListStore.find(item => item.name === params.targetName)
      if (target) {
        const roots = target.rootDomains.find(roots => roots.root === params.rootDomainName)
        roots.subdomain = roots.subdomain.concat(params.subDomainData)
      }
    },
    addRootDomain (state, params) {
      for (let index = 0; index < params.rootdomainsItems.length; index++) {
        params.rootdomainsItems[index].id = (state.idRootdomain++).toString()
      }
      const target = state.targetListStore.find(item => item.id === params.targetId)
      target.rootDomains = target.rootDomains.concat(params.rootdomainsItems)
    },
    addSingleRootDomain (state, params) {
      const target = state.targetListStore.find(item => item.id === params.targetId)
      target.rootDomains.push(params.rootdomain)
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
    clearTargetEntitiesToDelete ({ state, rootState }) {
      rootState.general.entitiesToDelete.forEach(entity => {
        const index = state.targetListStore.findIndex(target => target.id === entity.id)
        if (index !== -1) {
          state.targetListStore.splice(index, 1)
        }
      })
      rootState.general.entitiesToDelete.splice(0, rootState.general.entitiesToDelete.length)
    },
    clearRootDomainEntitiesToDelete ({ state, rootState }, entities) {
      rootState.general.entitiesToDelete.forEach(entity => {
        const target = state.targetListStore.find(target => target.name === entities.targetName)
        const rootsIndex = target.rootDomains.findIndex(roots => roots.id === entity.id)
        if (rootsIndex !== -1) {
          target.rootDomains.splice(rootsIndex, 1)
        }
      })
      rootState.general.entitiesToDelete.splice(0, rootState.general.entitiesToDelete.length)
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
    },
    updateSelectedTargets (state, targets) {
      state.selectedTargets = targets
    },
    clearSelectedTargetsList (state) {
      state.selectedTargets.splice(0, state.selectedTargets.length)
    },
    updateIdOfMultipleSubdomainFromServerToLocal: (state, getters) => (subdomainsData) => {
      subdomainsData.remoteData.forEach(element => {
        if (element.name === subdomainsData.localData.name) {
          subdomainsData.localData.id = element.id
        }
      })
    },
    updateTargetLoadingProcessStatus: (state) => (loadingStatus) => {
      state.targetLoadingProcessStatus = loadingStatus
    },
    updateSubdomainLoadingProcessStatus: (state) => (loadingStatus) => {
      state.subDomainLoadingProcessStatus = loadingStatus
    }
  },
  actions: {
    loadTargets ({ state, commit, getters }) {
      if (state.authentication_token !== '') {
        commit('updateTargetLoadingProcessStatus', 1)
        return axios.get('/targets')
          .then(function (response) {
            const targetsMapped = getters.mapTargets(response.data)
            commit('updateTargets', targetsMapped)
            commit('updateTargetLoadingProcessStatus', 2)
            return true
          })
          .catch(function () {
            commit('updateTargetLoadingProcessStatus', 4)
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
      rootState.general.entitiesToDelete.forEach(entity => {
        const index = state.targetListStore.findIndex(target => target.id === entity.id)
        if (index !== -1) {
          state.targetListStore.splice(index, 1)
        }
      })
      commit('general/clearReferencesToDelete', null, { root: true })
    },
    clearTargetEntitiesToDeleteToServer ({ rootState, state, dispatch, commit }) {
      const targetNames = []
      rootState.general.entitiesToDelete.forEach(entity => {
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
        commit('general/clearReferencesToDelete', null, { root: true })
        commit('clearSelectedTargetsList')
        return { status: false, message: error.response.data }
      })
    },
    clearSingleTargetEntityToDeleteToServer ({ state, commit, rootState, dispatch }) {
      let promiseResult
      const entityId = rootState.general.entitiesToDelete[0].id
      const index = state.targetListStore.findIndex(agent => agent.id === entityId)
      if (index !== -1) {
        const targetName = state.targetListStore[index].name
        promiseResult = axios.delete('/targets/' + targetName)
          .then(function (response) {
            dispatch('removeTargetsSelected')
            return { status: true, message: '' }
          })
          .catch(function (error) {
            commit('general/clearReferencesToDelete', null, { root: true })
            commit('clearSelectedTargetsList')
            return { status: false, message: error.response.data }
          })
      }
      return promiseResult
    },
    addAndPrepareSelectedTargetIdsToRemove ({ state, rootGetters, getters, commit }) {
      commit('general/clearReferencesToDelete', null, { root: true })
      state.selectedTargets.forEach(element => {
        const name = getters.getTargetById(element).name
        const entity = {
          id: element,
          name: name,
          type: rootGetters['general/entityTypeData'].TARGET
        }
        commit('general/addEntityToDelete', entity, { root: true })
      })
    },
    clearMultipleSubDomainEntitiesToServer ({ state, commit, dispatch, getters }, entities) {
      if (state.authentication_token !== '') {
        return axios.delete('/subdomains/multiples/', {
          data: getters.getSubDomainsIdsToDelete
        })
          .then(function () {
            dispatch('clearSubDomainEntitiesToDelete', entities)
            commit('cancelElementSelected')
            return { status: true, message: '' }
          })
          .catch(function (error) {
            return { status: false, message: error.response }
          })
      }
    },
    clearSubDomainEntitiesToDelete ({ state, rootState }, entities) {
      rootState.general.entitiesToDelete.forEach(entity => {
        const target = state.targetListStore.find(target => target.name === entities.targetName)
        const rootdomain = target.rootDomains.find(rootdomain => rootdomain.root === entities.rootDomainName)
        const subDomainIndex = rootdomain.subdomain.findIndex(subdomain => subdomain.id === entity.id)
        if (subDomainIndex !== -1) {
          rootdomain.subdomain.splice(subDomainIndex, 1)
        }
      })
      rootState.general.entitiesToDelete.splice(0, rootState.general.entitiesToDelete.length)
    },
    removeSingleSubDomainFromServer ({ state, dispatch, rootState }, entityReference) {
      if (state.authentication_token !== '') {
        const entity = rootState.general.entitiesToDelete[0]
        return axios.delete('/subdomains/' + entity.id)
          .then(function () {
            dispatch('clearSubDomainEntitiesToDelete', entityReference)
            return { status: true, message: '' }
          })
          .catch(function (error) {
            return { status: false, message: error.response }
          })
      }
    },
    getTargetNotesFromServer ({ state, getters }, targetName) {
      if (state.authentication_token !== '') {
        return axios.get('/notes/target/' + targetName)
          .then(function (response) {
            const targetNotesMapped = getters.mapNotesFromServerToLocal(response.data)
            const targetEntity = getters.getTargetByName(targetName)
            targetEntity.messages = targetNotesMapped
            return { status: true, message: '' }
          })
          .catch(function (error) {
            return { status: false, message: error.response }
          })
      }
    },
    getRootDomainNotesFromServer ({ state, getters }, entitiesName) {
      if (state.authentication_token !== '') {
        return axios.get('/notes/rootdomain/' + entitiesName.targetName + '/' + entitiesName.rootDomainName)
          .then(function (response) {
            const rootDomainNotesMapped = getters.mapNotesFromServerToLocal(response.data)
            const rootDomainEntity = getters.getRootDomainByTargetNameAndRootDomainName(entitiesName)
            rootDomainEntity.messages = rootDomainNotesMapped
            return { status: true, message: '' }
          })
          .catch(function (error) {
            return { status: false, message: error.response }
          })
      }
    },
    removeSingleRootDomainFromServer ({ state, commit, rootState }, targetName) {
      if (state.authentication_token !== '') {
        const entity = rootState.general.entitiesToDelete[0]
        return axios.delete('/rootdomains/' + targetName + '/' + entity.name)
          .then(function () {
            const target = state.targetListStore.find(target => target.name === targetName)
            const rootsIndex = target.rootDomains.findIndex(roots => roots.id === entity.id)
            if (rootsIndex !== -1) {
              target.rootDomains.splice(rootsIndex, 1)
            }
            rootState.general.entitiesToDelete.splice(0, rootState.general.entitiesToDelete.length)
            return { status: true, message: '' }
          })
          .catch(function (error) {
            rootState.general.entitiesToDelete.splice(0, rootState.general.entitiesToDelete.length)
            return { status: false, message: error.response }
          })
      }
    },
    removeTargetNoteFromServer ({ state, commit }, targetName) {
      if (state.authentication_token !== '') {
        return axios.delete('/notes/' + state.idNote + '/target/' + targetName)
          .then(function (response) {
            commit('removeTargetNote', targetName)
            return { status: true, message: '' }
          })
          .catch(function (error) {
            return { status: false, message: error.response }
          })
      }
    },
    sendNoteToServer ({ state, commit }, noteData) {
      if (state.authentication_token !== '') {
        return axios.post('/notes/target/' + noteData.targetName, {
          comment: noteData.message
        }).then(function (response) {
          noteData.id = response.data.id
          commit('sendTargetNote', noteData)
          return { status: true, message: '' }
        })
          .catch(function (error) {
            return { status: false, message: error.response.data }
          })
      }
    },
    addRootDomainsToServer ({ state, commit, getters }, rootDomainData) {
      if (state.authentication_token !== '') {
        const mappedRootDomains = getters.mapRootDomainsListFromLocalToServer(rootDomainData.rootdomainsItems)
        return axios.put('/targets/' + rootDomainData.targetId, {
          rootDomains: mappedRootDomains,
          name: rootDomainData.targetName
        }).then(function (response) {
          return { status: true, message: '' }
        })
          .catch(function (error) {
            return { status: false, message: error.response.data }
          })
      }
    },
    uploadRootDomainFileToServer ({ state, getters, commit }, targetAndRootData) {
      return axios.post('rootdomains/import/' + targetAndRootData.targetName, targetAndRootData.formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        commit('addSingleRootDomain', {
          rootdomain: getters.mapSingleRootDomainFromServerToLocal(response.data),
          targetId: getters.getTargetByName(targetAndRootData.targetName).id
        })
        return { status: true, message: '' }
      }).catch(function (error) {
        return { status: false, message: error.response.data }
      })
    },
    updateSubDomainsByTargetAndRootDomainFromServer ({ state, commit, getters }, subdomainReference) {
      if (state.authentication_token !== '') {
        commit('updateSubdomainLoadingProcessStatus', 1)
        return axios.get('/subdomains/getpaginate/' + subdomainReference.targetName + '/' + subdomainReference.rootDomainName,
          {
            params: {
              limit: 10,
              page: 1
            }
          }).then(function (response) {
          const subdomainsMapped = getters.mapMultipleSubdomainsFromServerToLocal(response.data.data)
          const subDomainData = {
            targetName: subdomainReference.targetName,
            rootDomainName: subdomainReference.rootDomainName,
            subDomainData: subdomainsMapped
          }
          commit('addSubdomainsByTargetNameAndRootDomainName', subDomainData)
          commit('updateSubdomainLoadingProcessStatus', 2)
          return { status: true, message: '' }
        })
          .catch(function (error) {
            commit('updateSubdomainLoadingProcessStatus', 4)
            return { status: false, message: error.response.data }
          })
      }
    },
    addSubDomainToServer ({ state, commit, getters }, subdomainReferenceAndData) {
      if (state.authentication_token !== '') {
        const subDomainParams = {
          targetName: subdomainReferenceAndData.targetName,
          rootDomainName: subdomainReferenceAndData.rootDomainName,
          subDomainData: []
        }
        if (subdomainReferenceAndData.subDomainData instanceof Array) {
          return axios.post('/subdomains/multiples', getters.mapMultipleSubdomainFromLocalToServer(subdomainReferenceAndData))
            .then(function (response) {
              subDomainParams.subDomainData = getters.mapMultipleSubdomainsFromServerToLocal(response.data)
              commit('addSubdomainsByTargetNameAndRootDomainName', subDomainParams)
              return { status: true, message: '' }
            })
            .catch(function (error) {
              return { status: false, message: error.response.data }
            })
        } else {
          return axios.post('/subdomains', getters.mapSingleSubdomainFromLocalToServer(subdomainReferenceAndData))
            .then(function (response) {
              subDomainParams.subDomainData = getters.mapSingleSubdomainFromServerToLocal(response.data)
              commit('addSubdomainsByTargetNameAndRootDomainName', subDomainParams)
              return { status: true, message: '' }
            })
            .catch(function (error) {
              return { status: false, message: error.response.data }
            })
        }
      }
    },
    removeRootDomainNoteFromServer ({ state, commit }, entityNames) {
      if (state.authentication_token !== '') {
        return axios.delete('/notes/' + state.idNote + '/rootdomain/' + entityNames.targetName + '/' + entityNames.rootdomainName)
          .then(function (response) {
            commit('removeRootDomainNote', entityNames)
            return { status: true, message: '' }
          })
          .catch(function (error) {
            return { status: false, message: error.response }
          })
      }
    },
    sendRootDomainNoteToServer ({ state, commit }, noteData) {
      if (state.authentication_token !== '') {
        return axios.post('/notes/rootdomain/' + noteData.targetName + '/' + noteData.rootDomainName, {
          comment: noteData.message
        }).then(function (response) {
          noteData.id = response.data.id
          commit('sendRootDomainNote', noteData)
          return { status: true, message: '' }
        })
          .catch(function (error) {
            return { status: false, message: error.response.data }
          })
      }
    },
    downloadAllSubDomainsNameInCsvFileFromServer ({ state }, referenceData) {
      if (state.authentication_token !== '') {
        return axios.post('/rootdomains/exportSubdomains/' + referenceData.targetName + '/' + referenceData.rootDomainName, {
          responseType: 'blob'
        })
      }
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
    getTargetNotes: (state) => (targetName) => {
      const searchedTarget = state.targetListStore.find(target => target.name === targetName)
      if (searchedTarget) {
        return searchedTarget.messages
      }
      return []
    },
    getRootDomainNotes: (state) => (params) => {
      const target = state.targetListStore.find(target => target.name === params.targetName)
      if (target) {
        return target.rootDomains.find(rootdomain => rootdomain.root === params.rootdomainName).messages
      } else {
        return []
      }
    },
    getSubDomainNotes: (state) => (params) => {
      const target = state.targetListStore.find(target => target.name === params.targetName)
      if (target) {
        const rootDomain = target.rootDomains.find(rootdomain => rootdomain.root === params.rootdomainName)
        if (rootDomain) {
          const subdomain = rootDomain.subdomain.find(subdomain => subdomain.name === params.subdomainName)
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
      if (target) {
        const roots = target.rootDomains.find(roots => roots.id === params.idRootDomain)
        if (roots) {
          return roots.subdomain.length
        }
      }
      return 0
    },
    getSubdomainSizeByReferencesName: (state) => (params) => {
      const target = state.targetListStore.find(item => item.name === params.targetName)
      if (target) {
        const roots = target.rootDomains.find(roots => roots.root === params.rootDomainName)
        if (roots) {
          return roots.subdomain.length
        }
      }
      return 0
    },
    getRootDomainByIdTargetAndIdRootDomain: (state) => (params) => {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idRootDomain)
      return roots
    },
    getRootDomainByTargetNameAndRootDomainName: (state) => (params) => {
      const target = state.targetListStore.find(item => item.name === params.targetName)
      if (target) {
        const roots = target.rootDomains.find(roots => roots.root === params.rootDomainName)
        return roots
      }
      return null
    },
    getSubDomain: (state) => (params) => {
      const target = state.targetListStore.find(item => item.id === params.idtarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idrootdomain)
      const subdomain = roots.subdomain.find(subdItem => subdItem.id === params.idsubdomain)
      return subdomain
    },
    getSubDomainByTargetNameAndRootDomainName: (state) => (subdomainReference) => {
      const target = state.targetListStore.find(item => item.name === subdomainReference.targetName)
      const roots = target.rootDomains.find(roots => roots.root === subdomainReference.rootDomainName)
      const subdomain = roots.subdomain.find(subdItem => subdItem.name === subdomainReference.subDomainName)
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
          date: new Date(),
          subdomain: [],
          messages: [],
          agent: []
        }
        if (rootDomain.createdAt) {
          newRootDomain.date = rootDomain.createdAt
        }
        newRootDomains.push(newRootDomain)
      })
      return newRootDomains
    },
    mapSingleRootDomainFromServerToLocal: (state) => (rootDomain) => {
      const newRootDomain = {
        id: rootDomain.id,
        root: rootDomain.name,
        date: new Date(),
        subdomain: [],
        messages: [],
        agent: []
      }
      if (rootDomain.createdAt) {
        newRootDomain.date = rootDomain.createdAt
      }
      return newRootDomain
    },
    isEntityOnListToRemove: ({ state, rootState }) => (idItem) => {
      setTimeout(
        function () {
          const searchedElement = rootState.general.entitiesToDelete.find(item => item.id === idItem)
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
        rootDomains: getters.mapRootDomainsFromServerToLocal(target.rootDomains),
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
    },
    mapNotesFromServerToLocal: (state, getters) => (targetNotes) => {
      const mappedNotes = []
      targetNotes.forEach(note => {
        const mappedNote = getters.mapSingleNoteFromServerToLocal(note)
        mappedNotes.push(mappedNote)
      })
      return mappedNotes
    },
    mapSingleNoteFromServerToLocal: (state) => (serverNote) => {
      const localNote = {
        id: serverNote.id,
        message: serverNote.comment,
        sendDate: new Date(),
        sender: serverNote.createdBy
      }
      return localNote
    },
    mapMultipleSubdomainsFromServerToLocal: (state, getters) => (subdomains) => {
      const mappedSubdomains = []
      subdomains.forEach(subdomain => {
        const mappedSubdomain = getters.mapSingleSubdomainFromServerToLocal(subdomain)
        mappedSubdomains.push(mappedSubdomain)
      })
      return mappedSubdomains
    },
    mapSingleSubdomainFromServerToLocal: (state) => (subdomain) => {
      const createdDate = new Date(subdomain.createdAt)
      const newSubDomain = {
        id: subdomain.id,
        name: subdomain.name,
        added: createdDate.getFullYear() + '-' + (createdDate.getMonth() + 1) + '-' + createdDate.getDate(),
        checking: false,
        interesting: false,
        vulnerable: false,
        bounty: false,
        ignore: false,
        scope: false,
        agent: [],
        ipAddress: subdomain.ipAddress,
        http: subdomain.hasHttpOpen,
        isAlive: subdomain.isAlive,
        ports: [],
        services: [],
        directories: [],
        labels: subdomain.labels
      }
      return newSubDomain
    },
    mapSingleSubdomainFromLocalToServer: (state) => (subdomain) => {
      const newSubDomain = {
        name: subdomain.subDomainData.name,
        target: subdomain.targetName,
        rootDomain: subdomain.rootDomainName,
        agent: [],
        ipAddress: subdomain.subDomainData.ipAddress,
        hasHttpOpen: subdomain.subDomainData.hasHttpOpen,
        isAlive: subdomain.subDomainData.isAlive,
        services: [],
        directories: [],
        labels: []
      }
      return newSubDomain
    },
    mapMultipleSubdomainFromLocalToServer: (state, getters) => (subdomain) => {
      const newMappedSubdomains = []
      subdomain.subDomainData.forEach(item => {
        newMappedSubdomains.push(
          getters.mapSingleSubdomainFromLocalToServer({
            subDomainData: item,
            targetName: subdomain.targetName,
            rootDomainName: subdomain.rootDomainName
          })
        )
      })
      return newMappedSubdomains
    },
    getSubDomainsIdsToDelete (state, getters, rootState) {
      const subDomainsNames = []
      rootState.general.entitiesToDelete.forEach(entity => {
        subDomainsNames.push(entity.id)
      })
      return subDomainsNames
    }
  }
})
