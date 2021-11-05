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
    idWordList: 37
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
    }
  },
  actions: {},
  getters: {}
})
