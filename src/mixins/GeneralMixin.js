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
        id: -1,
        name: '',
        added: new Date(),
        checking: false,
        interesting: false,
        vulnerable: false,
        boubty: false,
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
