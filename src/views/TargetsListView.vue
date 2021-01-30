<template>
  <div>
  <!-- Contains navs-bar -->
    <NavBarTwoTarget/>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <div class="container-fluid">
        <hr class="reset-margin-top" />
        <div class="content">
          <TargetsList v-if="this.$store.state.target.isDefaultViewOnTarget"/>
          <div class="row" v-else>
            <!-- <TargetMiniView v-for="agent of arrayFilterList" :key="agent.id" :id="agent.id" :name="agent.name" :background="agent.background" /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TargetsList from '@/components/Target/TargetsList.vue'
import NavBarTwoTarget from '@/components/Target/NavBarTwoTarget.vue'
// import TargetMiniView from '@/components/Target/TargetMiniView.vue'
export default {
  name: 'TargetsListView',
  components: {
    TargetsList,
    NavBarTwoTarget
    // TargetMiniView
  },
  // data: function () {
  //   return {
  //     isDefaultView: false
  //   }
  // },
  mounted () {
    this.$store.commit('updateLocView', 'Targets', true)
  }
}
</script>
