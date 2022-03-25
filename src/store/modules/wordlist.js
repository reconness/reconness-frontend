import axios from 'axios'
export default ({
  namespaced: true,
  state: {
    wordlists: [
      {
        id: 1,
        filename: 'default.txt',
        type: 3,
        count: 1263,
        size: '17',
        path: '/app/Content/wordlists/dns_resolver_enum'
      },
      {
        id: 2,
        filename: 'default2.txt',
        type: 1,
        count: 1264,
        size: '18',
        path: '/app/Content/wordlists/subdomain_enum'
      },
      {
        id: 3,
        filename: 'default3.txt',
        type: 2,
        count: 1265,
        size: '19',
        path: '/app/Content/wordlists/dir_enum'
      }
    ],
    idWordList: 1,
    selectedWordListContent: '',
    selectedWordListDescriptionType: '',
    selectedWordListFileName: ''
  },
  mutations: {
    removeWordListItem (state, idWordlist) {
      const index = state.wordlists.findIndex(wordlist => wordlist.id === idWordlist)
      if (index !== -1) {
        state.wordlists.splice(index, 1)
      }
    },
    addWordListItem (state, wordlistItem) {
      state.idWordList = state.idWordList + 1
      wordlistItem.id = state.idWordList
      state.wordlists.push(wordlistItem)
    },
    updateWordlist (state, wordlist) {
      state.wordlists.splice(0, state.wordlists.length)
      wordlist.forEach(word => {
        state.idWordList = state.idWordList + 1
        word.id = state.idWordList
        state.wordlists.push(word)
      })
    },
    updateSelectedWordsContent (state, wordlistId) {
      state.selectedWordList = wordlistId
    }
  },
  actions: {
    loadWordlist ({ state, commit, getters, rootState }) {
      if (rootState.auth.authentication_token !== '') {
        return axios.get('/wordlists')
          .then(function (response) {
            const wordlistsMapped = getters.mapWordlists(response.data)
            commit('updateWordlist', wordlistsMapped)
            return true
          })
          .catch(function () {
            return false
          })
      }
    },
    uploadWordListFile ({ getters, rootState }, wordlistData) {
      if (rootState.auth.authentication_token !== '') {
        const wordListDescription = getters.getWordlistType(wordlistData.wordListCode)
        return axios.post('/wordlists/upload/' + wordListDescription, wordlistData.formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(function (response) {
          return { status: true, message: '', data: response.data }
        }).catch(function (error) {
          return { status: false, message: error.response.data }
        })
      }
    },
    removeWordListFromServer ({ state, commit, getters, rootState }, wordlistData) {
      const wordlistDescriptionType = getters.getWordlistType(wordlistData.codeType)
      return axios.delete('/wordlists/' + wordlistDescriptionType + '/' + wordlistData.filename)
        .then(function (response) {
          commit('removeWordListItem', wordlistData.id)
          return { status: true, message: '' }
        })
        .catch(function (error) {
          return { status: false, message: error.response.data }
        })
    },
    downloadWordListFile ({ state, commit, getters, rootState }, wordlistData) {
      const wordlistDescriptionType = getters.getWordlistType(wordlistData.codeType)
      return axios.get('/wordlists/download/', {
        responseType: 'blob',
        params: {
          type: wordlistDescriptionType,
          filename: wordlistData.filename
        }
      })
    },
    getWordListFileContent ({ state, getters }, wordlistData) {
      const wordlistDescriptionType = getters.getWordlistType(wordlistData.codeType)
      state.selectedWordListDescriptionType = wordlistDescriptionType
      state.selectedWordListFileName = wordlistData.filename
      return axios.get('/wordlists/content/', {
        params: {
          type: wordlistDescriptionType,
          filename: wordlistData.filename
        }
      }).then(function (response) {
        state.selectedWordListContent = response.data.data
        return { status: true, message: '' }
      })
        .catch(function (error) {
          return { status: false, message: error.response.data }
        })
    },
    saveWordListFileContent ({ state, getters }, wordlistContent) {
      return axios.put('/wordlists/' + state.selectedWordListDescriptionType + '/' + state.selectedWordListFileName, {
        data: wordlistContent
      }).then(function (response) {
        return { status: true, message: '' }
      })
        .catch(function (error) {
          return { status: false, message: error.response.data }
        })
    }
  },
  getters: {
    mapWordlists: (state, getters) => (wordlistsP) => {
      const newWordList = []
      let newWord
      wordlistsP.subdomainsEnum.forEach(word => {
        newWord = getters.mapWordFromServerToLocal({ word: word, type: 1 })
        newWordList.push(newWord)
      })
      wordlistsP.directoriesEnum.forEach(word => {
        newWord = getters.mapWordFromServerToLocal({ word: word, type: 2 })
        newWordList.push(newWord)
      })
      wordlistsP.dnsResolvers.forEach(word => {
        newWord = getters.mapWordFromServerToLocal({ word: word, type: 3 })
        newWordList.push(newWord)
      })
      return newWordList
    },
    mapWordFromServerToLocal: (state, getters) => (wordContainer) => {
      const newWord = {
        id: 0,
        filename: wordContainer.word.filename,
        type: wordContainer.type,
        count: wordContainer.word.count,
        size: wordContainer.word.size,
        path: wordContainer.word.path
      }
      return newWord
    },
    getWordlistType: (state) => (wordlistCode) => {
      if (wordlistCode === 1) {
        return 'subdomain_enum'
      } else if (wordlistCode === 2) {
        return 'dir_enum'
      } else {
        return 'dns_resolver_enum'
      }
    },
    niceBytes: (state) => (bytes) => {
      const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      let l = 0
      let n = parseInt(bytes, 10) || 0
      while (n >= 1024 && ++l) {
        n = n / 1024
      }
      return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + units[l])
    }
  }
})
