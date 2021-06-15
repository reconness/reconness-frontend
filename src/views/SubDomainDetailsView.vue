<template>
  <div>
  <!-- Contains navs-bar -->
  <NavBarTwoDetailTarget :TargetName = "Target.name"
  :gradient = "LinearGradient" :rootName = "RootDomains.root" :showRootDomains = "showRoot" :subDomainName="subdomainName"/>
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
              Agents ({{getAgentsByType(3).length}})
            </button>
            <button type="button" :class="{'subdomain_active_tab' : parseInt(this.selectedTab) === this.activeTab.SERVICES}" class="btn ml-4 border-grad pl-5 pr-5" v-on:click="this.selectedTab = this.activeTab.SERVICES">
              Services ({{this.getSubdomainSize[1]}})
            </button>
            <button type="button" :class="{'subdomain_active_tab' : parseInt(this.selectedTab) === this.activeTab.DIRECTORIES}" class="btn ml-4 border-grad pl-5 pr-5" v-on:click="this.selectedTab = this.activeTab.DIRECTORIES">
              Directories ({{this.getSubdomainSize[2]}})
            </button>
          </div>
          <SubDomainDetailsDashboard v-if="parseInt(this.selectedTab) === this.activeTab.DASHBOARD"/>
          <SubDomainDetailsAgents v-if="parseInt(this.selectedTab) === this.activeTab.AGENTS" :color = "secondaryColor"/>
          <SubDomainDetailsServices v-if="parseInt(this.selectedTab) === this.activeTab.SERVICES" :color = "secondaryColor"/>
          <SubDomainDetailsDirectories v-if="parseInt(this.selectedTab) === this.activeTab.DIRECTORIES" :color = "secondaryColor" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import NavBarTwoDetailTarget from '@/components/Target/NavBarTwoDetailTarget.vue'
import SubDomainDetailsDashboard from '@/components/Target/SubDomainDetailsDashboard.vue'
import SubDomainDetailsAgents from '@/components/Target/SubDomainDetailsAgents.vue'
import SubDomainDetailsServices from '@/components/Target/SubDomainDetailsServices.vue'
import SubDomainDetailsDirectories from '@/components/Target/SubDomainDetailsDirectories.vue'

export default {
  name: 'TargetsDetailsView',
  data: function () {
    return {
      TargetName: String,
      Target: Object,
      RootDomains: {
        type: Object,
        default: () => {}
      },
      Subdomain: {
        type: Object,
        default: () => {}
      },
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
  components: {
    NavBarTwoDetailTarget,
    SubDomainDetailsDashboard,
    SubDomainDetailsAgents,
    SubDomainDetailsDirectories,
    SubDomainDetailsServices
  },
  computed: {
    ...mapGetters(['getLastAgentSubdom', 'getAgentsByType']),
    ...mapGetters('target', ['listSubdDomainsAgents', 'getTargetById', 'getSubDomain']),
    getSubdomainSize () {
      const loadedSubdomain = this.getSubDomain({
        idtarget: parseInt(this.$route.params.idTarget),
        idrootdomain: parseInt(this.$route.params.id),
        idsubdomain: parseInt(this.$route.params.idsubdomain)
      })
      return [loadedSubdomain.agent.length, loadedSubdomain.services.length, loadedSubdomain.directories.length]
    }
  },
  mounted () {
    this.$store.commit('updateLocView', 'Targets', true)
    this.Target = this.getTargetById(parseInt(this.$route.params.idTarget))
    this.RootDomains = this.Target.rootDomains.find(item => item.id === parseInt(this.$route.params.id))
    this.LinearGradient = 'linear-gradient(160deg,' + this.Target.primaryColor + ' ' + '0%,' + this.Target.secondaryColor + ' ' + '100%)'
    this.buttonGradSubd = this.LinearGradient
    this.secondaryColor = this.Target.secondaryColor
    this.gradient = 'linear-gradient(160deg,' + this.Target.primaryColor + ' ' + '0%,' + this.Target.secondaryColor + ' ' + '100%)'
    if (this.$route.params.idsubdomain) {
      this.Subdomain = this.RootDomains.subdomain.find(item => item.id === parseInt(this.$route.params.idsubdomain))
      this.subdomainName = this.Subdomain.name
    }
    this.setCurrentView(this.$route.name)
  },
  methods: {
    ...mapMutations('target', ['setIsDefaultTabButton']),
    ...mapMutations('target', ['setCurrentView']),
    setActiveTabButton: function (tab) {
      this.selectedTab = tab
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
