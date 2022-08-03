<template>
  <div>
  <!-- Contains navs-bar -->
  <NavBarTwoDetailTarget :TargetName = "loadedTarget.name"
  :gradient = "LinearGradient" :rootName = "loadedRootdomain.root" :showRootDomains = "showRoot"/>
      <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <div class="container-fluid">
        <hr class="reset-margin-top" />
        <div class="content">
          <button type="button" class="btn ml-4 border-grad" v-bind:style ="{background: 'linear-gradient(#f2f4f6, #f2f4f6) padding-box,' + buttonGradSubd + 'border-box', 'box-shadow': shadowSubd}" v-on:click="activeTabButton(true)">
            Subdomains
            <span  class="text-muted-b3"> ({{ loadedRootdomain.subdomain.length }})</span>
          </button>
          <button type="button" class="btn  ml-5 border-grad " v-bind:style ="{background: 'linear-gradient(#f2f4f6, #f2f4f6) padding-box,' + buttonGradAg + 'border-box', 'box-shadow': shadowAg}" v-on:click="activeTabButton(false)">
            Agents <span class="text-muted-b3">({{getAgentsByType(this.$agentType.ROOTDOMAIN).length}})</span>
          </button>
          <SubdomainListTable v-if="this.$store.state.target.isTableList" :color= "loadedTarget.secondaryColor" :gradient = "LinearGradient" :rootDomain = "loadedRootdomain" :routeParams="routeParams" />
          <AgentListTable v-else :color = "loadedTarget.secondaryColor"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import NavBarTwoDetailTarget from '@/components/Target/NavBarTwoDetailTarget.vue'
import SubdomainListTable from '@/components/Target/SubdomainListTable.vue'
import AgentListTable from '@/components/Target/AgentListTable.vue'
import { GeneralMixin } from '@/mixins/GeneralMixin'
export default {
  name: 'RootDomainDetailsView',
  components: {
    NavBarTwoDetailTarget,
    SubdomainListTable,
    AgentListTable
  },
  props: {
    id: String,
    idTarget: String
  },
  data: function () {
    return {
      showRoot: true,
      buttonGradSubd: '',
      buttonGradAg: '',
      shadowSubd: '3px 12px 23px #d6d6d6',
      shadowAg: '',
      secondaryColor: '',
      routeParams: {
        targetName: this.$route.params.targetName,
        rootDomainName: this.$route.params.rootdomainName
      }
    }
  },
  mixins: [GeneralMixin],
  computed: {
    ...mapState('target', ['countSubdomainList', 'isTableList']),
    ...mapGetters('target', ['getTargetById', 'getSubdomainSize', 'getSubdomainSizeByReferencesName', 'getTargetByName', 'getRootDomainByTargetNameAndRootDomainName']),
    ...mapGetters('agent', ['getLastAgentRootDomain', 'getAgentsByType']),
    loadedRootdomain () {
      const rootdomainEmpty = this.createRootDomain()
      return (this.getRootDomainByTargetNameAndRootDomainName(this.routeParams)) || rootdomainEmpty
    },
    loadedTarget () {
      const targetName = this.$route.params.targetName
      const targetEmpty = this.createTarget()
      return this.getTargetByName(targetName) || targetEmpty
    },
    LinearGradient () {
      return 'linear-gradient(160deg,' + this.loadedTarget.primaryColor + ' ' + '0%,' + this.loadedTarget.secondaryColor + ' ' + '100%)'
    }
  },
  watch: {
    $route (to, from) {
      this.setIsDefaultTabButton(true)
    }
  },
  mounted () {
    this.loadTargets()
    this.$store.commit('agent/updateLocView', 'Targets', true)
    this.buttonGradSubd = this.LinearGradient
    this.setCurrentView(this.$route.name)
    this.updateSubDomainsByTargetAndRootDomainFromServer(this.routeParams)
  },
  methods: {
    ...mapMutations('target', ['setIsDefaultTabButton', 'setCurrentView']),
    ...mapActions('target', ['loadTargets', 'updateSubDomainsByTargetAndRootDomainFromServer']),
    activeTabButton: function (valueIn) {
      this.setIsDefaultTabButton(valueIn)
      if (valueIn) {
        this.buttonGradSubd = this.LinearGradient
        this.buttonGradAg = 'linear-gradient(#f2f4f6, #f2f4f6)'
        this.shadowSubd = '13px 19px 41px #d6d6d6'
        this.shadowAg = ''
      } else {
        this.buttonGradSubd = 'linear-gradient(#f2f4f6, #f2f4f6)'
        this.buttonGradAg = this.LinearGradient
        this.shadowSubd = ''
        this.shadowAg = '13px 19px 41px #d6d6d6'
      }
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
