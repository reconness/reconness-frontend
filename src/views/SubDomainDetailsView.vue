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
          <div class="submenu-details-tab-menu mt-5 mb-4">
            <button type="button" class="btn ml-4 border-grad subdomain-active-tab pl-5 pr-5" v-on:click="activeTabButton(true)">
              Dashboard
            </button>
            <button type="button" class="btn ml-4 border-grad pl-5 pr-5" v-on:click="activeTabButton(true)">
              Agents
            </button>
            <button type="button" class="btn ml-4 border-grad pl-5 pr-5" v-on:click="activeTabButton(true)">
              Services
            </button>
            <button type="button" class="btn ml-4 border-grad pl-5 pr-5" v-on:click="activeTabButton(true)">
              Directories
            </button>
          </div>
          <SubDomainDetailsDashboard/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import NavBarTwoDetailTarget from '@/components/Target/NavBarTwoDetailTarget.vue'
import SubDomainDetailsDashboard from '@/components/Target/SubDomainDetailsDashboard.vue'
// import SubdomainListTable from '@/components/Target/SubdomainListTable.vue'
// import AgentListTable from '@/components/Target/AgentListTable.vue'
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
      //  eliminar esta variable y poner como props
      gradient: '',
      subdomainName: ''
    }
  },
  components: {
    NavBarTwoDetailTarget,
    SubDomainDetailsDashboard
    // SubdomainListTable,
    // AgentListTable
  },
  computed: {
    ...mapGetters('target', ['getTargetById'])
  },
  mounted () {
    this.$store.commit('updateLocView', 'Targets', true)
    this.Target = this.getTargetById(parseInt(this.$route.params.idTarget))
    this.RootDomains = this.Target.rootDomains.find(item => item.id === parseInt(this.$route.params.id))
    this.LinearGradient = 'linear-gradient(160deg,' + this.Target.primaryColor + ' ' + '0%,' + this.Target.secondaryColor + ' ' + '100%)'
    this.buttonGradSubd = this.LinearGradient
    this.secondaryColor = this.Target.secondaryColor
    // poner como props
    this.gradient = 'linear-gradient(160deg,' + this.Target.primaryColor + ' ' + '0%,' + this.Target.secondaryColor + ' ' + '100%)'
    if (this.$route.params.idsubdomain) {
      this.subdomainName = this.RootDomains.subdomain.find(item => item.id === parseInt(this.$route.params.idsubdomain)).name
    }
  },
  methods: {
    ...mapMutations('target', ['setIsDefaultTabButton']),
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
