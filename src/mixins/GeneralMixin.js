const GeneralMixin = {
  methods: {
    createTarget () {
      return {
        id: -1,
        name: '',
        primaryColor: '',
        secondaryColor: '',
        date: new Date().toString(),
        rootDomains: [],
        bugBountyUrl: '',
        isPrivateProgram: false,
        inScope: '',
        outScope: ''
      }
    },
    createRootDomain () {
      return {
        id: -1,
        root: '',
        date: new Date().toISOString().slice(0, 10),
        subdomain: [],
        messages: [],
        agent: []
      }
    },
    createSubdomain () {
      return {
        name: '',
        added: new Date().toISOString().slice(0, 10),
        checking: false,
        interesting: false,
        vulnerable: false,
        bounty: false,
        ignore: false,
        scope: false,
        agent: [],
        ipAddress: '',
        http: false,
        isAlive: false,
        ports: [],
        services: [],
        directories: []
      }
    }
  }
}
export { GeneralMixin }
