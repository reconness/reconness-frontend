<template>
  <div>
  <!-- Contains navs-bar -->
  <NavBarTwoDetailTarget :TargetName = "Target.name"
  :gradient = "LinearGradient" :rootName = "RootDomains.root" :showRootDomains = "showRoot"/>
      <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <div class="container-fluid">
        <hr class="reset-margin-top" />
        <div class="content">
          <button type="button" class="btn ml-4 border-grad" v-bind:style ="{background: 'linear-gradient(#f2f4f6, #f2f4f6) padding-box,' + buttonGradSubd + 'border-box', 'box-shadow': shadowSubd}" v-on:click="activeTabButton(true)">
            Subdomains
            <span  class="text-muted-b3"> ({{  this.getSubdomainSize(this.routeParams)}})</span>
          </button>
          <button type="button" class="btn  ml-5 border-grad " v-bind:style ="{background: 'linear-gradient(#f2f4f6, #f2f4f6) padding-box,' + buttonGradAg + 'border-box', 'box-shadow': shadowAg}" v-on:click="activeTabButton(false)">
            Agents <span class="text-muted-b3">({{getAgentsByType(this.$agentType.ROOTDOMAIN).length}})</span>
          </button>
          <SubdomainListTable v-if="this.$store.state.target.isTableList" :color= 'secondaryColor' :gradient = "LinearGradient" :rootDomain = 'RootDomains' />
          <AgentListTable v-else :color = "secondaryColor"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import NavBarTwoDetailTarget from '@/components/Target/NavBarTwoDetailTarget.vue'
import SubdomainListTable from '@/components/Target/SubdomainListTable.vue'
import AgentListTable from '@/components/Target/AgentListTable.vue'
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
      LinearGradient: '',
      showRoot: true,
      buttonGradSubd: '',
      buttonGradAg: '',
      shadowSubd: '3px 12px 23px #d6d6d6',
      shadowAg: '',
      secondaryColor: '',
      routeParams: {
        idTarget: parseInt(this.idTarget),
        idRootDomain: parseInt(this.id)
      }
    }
  },
  components: {
    NavBarTwoDetailTarget,
    SubdomainListTable,
    AgentListTable
  },
  computed: {
    ...mapState('target', ['countSubdomainList', 'isTableList']),
    ...mapGetters('target', ['getTargetById', 'getSubdomainSize']),
    ...mapGetters(['getLastAgentRootDomain', 'getAgentsByType']),
    ...mapGetters('target', ['listRootDomainsAgents'])
  },
  mounted () {
    this.$store.commit('updateLocView', 'Targets', true)
    this.Target = this.getTargetById(parseInt(this.idTarget))
    this.RootDomains = this.Target.rootDomains.find(item => item.id === parseInt(this.id))
    this.LinearGradient = 'linear-gradient(160deg,' + this.Target.primaryColor + ' ' + '0%,' + this.Target.secondaryColor + ' ' + '100%)'
    this.buttonGradSubd = this.LinearGradient
    this.secondaryColor = this.Target.secondaryColor
    this.setCurrentView(this.$route.name)
  },
  props: {
    id: String,
    idTarget: String
  },
  methods: {
    ...mapMutations('target', ['setIsDefaultTabButton']),
    ...mapMutations('target', ['setCurrentView']),
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
  },
  watch: {
    $route (to, from) {
      this.setIsDefaultTabButton(true)
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
