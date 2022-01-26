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
    idWordList: 1
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
    }
  }
})
