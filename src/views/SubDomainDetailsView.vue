<template>
  <div>
  <!-- Contains navs-bar -->
  <NavBarTwoDetailTarget :TargetName = "Target.name"
  :gradient = "LinearGradient" :rootName = "RootDomains.root" :showRootDomains = "showRoot" :subDomainName="Subdomain.name"/>
      <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <div class="container-fluid">
        <hr class="reset-margin-top" />
        <div class="content">
          <div class="submenu-details-tab-menu mt-4 mb-4">
            <button type="button" :class="{'subdomain_active_tab' : parseInt(this.selectedTab) === this.activeTab.DASHBOARD}" class="btn ml-4 border-grad pl-5 pr-5" v-on:click="this.selectedTab = this.activeTab.DASHBOARD">
              Dashboard
            </button>
            <button type="button" :class="{'subdomain_active_tab' : parseInt(this.selectedTab) === this.activeTab.AGENTS}" class="btn ml-4 border-grad pl-5 pr-5" v-on:click="setActiveTabButton(activeTab.AGENTS)">
              Agents ({{subDomainAgents.length}})
            </button>
            <button type="button" :class="{'subdomain_active_tab' : parseInt(this.selectedTab) === this.activeTab.SERVICES}" class="btn ml-4 border-grad pl-5 pr-5" v-on:click="this.selectedTab = this.activeTab.SERVICES">
              Services ({{Subdomain.services.length}})
            </button>
            <button type="button" :class="{'subdomain_active_tab' : parseInt(this.selectedTab) === this.activeTab.DIRECTORIES}" class="btn ml-4 border-grad pl-5 pr-5" v-on:click="this.selectedTab = this.activeTab.DIRECTORIES">
              Directories ({{Subdomain.directories.length}})
            </button>
          </div>
          <SubDomainDetailsDashboard v-if="parseInt(this.selectedTab) === this.activeTab.DASHBOARD" :targetInstance="Target" :subdomainInstance="Subdomain"/>
          <SubDomainDetailsAgents v-if="parseInt(this.selectedTab) === this.activeTab.AGENTS" :color = "secondaryColor"/>
          <SubDomainDetailsServices v-if="parseInt(this.selectedTab) === this.activeTab.SERVICES" :color = "secondaryColor"/>
          <SubDomainDetailsDirectories v-if="parseInt(this.selectedTab) === this.activeTab.DIRECTORIES" :color = "secondaryColor" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import NavBarTwoDetailTarget from '@/components/Target/NavBarTwoDetailTarget.vue'
import SubDomainDetailsDashboard from '@/components/Target/SubDomainDetailsDashboard.vue'
import SubDomainDetailsAgents from '@/components/Target/SubDomainDetailsAgents.vue'
import SubDomainDetailsServices from '@/components/Target/SubDomainDetailsServices.vue'
import SubDomainDetailsDirectories from '@/components/Target/SubDomainDetailsDirectories.vue'
import { GeneralMixin } from '@/mixins/GeneralMixin'

export default {
  name: 'SubDomainDetailsView',
  components: {
    NavBarTwoDetailTarget,
    SubDomainDetailsDashboard,
    SubDomainDetailsAgents,
    SubDomainDetailsDirectories,
    SubDomainDetailsServices
  },
  data: function () {
    return {
      Target: this.createTarget(),
      RootDomains: this.createRootDomain(),
      Subdomain: this.createSubdomain(),
      LinearGradient: '',
      showRoot: true,
      buttonGradSubd: '',
      buttonGradAg: '',
      shadowSubd: '3px 12px 23px #d6d6d6',
      shadowAg: '',
      secondaryColor: '',
      gradient: '',
      subdomainName: '',
      selectedTab: 1,
      activeTab: Object.freeze(
        {
          DASHBOARD: 1,
          AGENTS: 2,
          SERVICES: 3,
          DIRECTORIES: 4
        }
      ),
      serviceCount: 0,
      agentCount: 0,
      directoriesCount: 0
    }
  },
  mixins: [GeneralMixin],
  computed: {
    ...mapState('agent', ['subDomainAgents']),
    ...mapGetters('agent', ['getLastAgentSubdom', 'getAgentsByType']),
    ...mapGetters('target', ['listSubdDomainsAgents', 'getTargetById', 'getSubDomain', 'getTargetByName', 'getSubDomainByTargetNameAndRootDomainName'])
  },
  watch: {
    RootDomains: {
      handler: function (value) {
        this.Subdomain = this.RootDomains.subdomain.find(item => item.name === this.$route.params.subdomainName) || this.createSubdomain()
      },
      deep: true
    }
  },
  created () {
    this.loadTargets()
    this.updateSubDomainsByTargetAndRootDomainFromServer({
      targetName: this.$route.params.targetName,
      rootDomainName: this.$route.params.rootdomainName
    })
    const targetName = this.$route.params.targetName
    this.Target = this.getTargetByName(targetName) || this.createTarget()
  },
  mounted () {
    this.$store.commit('agent/updateLocView', 'Targets', true)
    this.RootDomains = this.Target.rootDomains.find(item => item.root === this.$route.params.rootdomainName) || this.createRootDomain()
    this.LinearGradient = 'linear-gradient(160deg,' + this.Target.primaryColor + ' ' + '0%,' + this.Target.secondaryColor + ' ' + '100%)'
    this.buttonGradSubd = this.LinearGradient
    this.secondaryColor = this.Target.secondaryColor
    this.gradient = 'linear-gradient(160deg,' + this.Target.primaryColor + ' ' + '0%,' + this.Target.secondaryColor + ' ' + '100%)'
    this.setCurrentView(this.$route.name)
    this.loadSubdomainAgents()
  },
  methods: {
    ...mapMutations('target', ['setIsDefaultTabButton', 'setCurrentView']),
    ...mapActions('target', ['loadTargets', 'updateSubDomainsByTargetAndRootDomainFromServer']),
    ...mapActions('agent', ['loadAgentsFromServer', 'updateFilteredAgentsByType']),
    setActiveTabButton: function (tab) {
      this.selectedTab = tab
    },
    loadSubdomainAgents: function () {
      const self = this
      this.loadAgentsFromServer().then(function (response) {
        if (response) {
          self.updateFilteredAgentsByType({
            type: self.$entityTypeData.SUBDOMAIN.id,
            list: response
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.border-grad {
    color: #000000;
    border: 2px solid transparent;
    border-radius: 12px;
    opacity: 1;
}
</style>
