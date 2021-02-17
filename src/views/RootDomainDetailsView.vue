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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavBarTwoDetailTarget from '@/components/Target/NavBarTwoDetailTarget.vue'
export default {
  name: 'TargetsDetailsView',
  data: function () {
    return {
      TargetName: String,
      Target: Object,
      RootDomains: Object,
      LinearGradient: '',
      showRoot: true
    }
  },
  components: {
    NavBarTwoDetailTarget
  },
  computed: {
    ...mapGetters('target', ['getTargetById'])
  },
  mounted () {
    this.$store.commit('updateLocView', 'Targets', true)
    this.Target = this.getTargetById(parseInt(this.$route.params.idTarget))
    this.RootDomains = this.Target.rootDomains.find(item => item.id === parseInt(this.$route.params.id))
    this.LinearGradient = 'linear-gradient(160deg,' + this.Target.primaryColor + ' ' + '0%,' + this.Target.secondaryColor + ' ' + '100%)'
  }
}
</script>
