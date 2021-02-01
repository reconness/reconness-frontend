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
          <TargetMiniList v-for="target of arrayFilterList" :key="target.id" :id="target.id" :name="target.name" :background="target.background" :rootDom="target.rootDomains">
          </TargetMiniList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TargetsList from '@/components/Target/TargetsList.vue'
import NavBarTwoTarget from '@/components/Target/NavBarTwoTarget.vue'
import { mapState, mapGetters } from 'vuex'
import TargetMiniList from '@/components/Target/TargetMiniList.vue'
export default {
  name: 'TargetsListView',
  components: {
    TargetsList,
    NavBarTwoTarget,
    TargetMiniList
  },
  computed: {
    ...mapState('target', ['targetListStore', 'filterColour']),
    ...mapGetters('target', ['filterByColor']),
    arrayFilterList () {
      if (this.filterColour === '') {
        return this.targetListStore
      } else {
        return this.filterByColor(this.filterColour)
      }
    }
  },
  mounted () {
    this.$store.commit('updateLocView', 'Targets', true)
  }
}
</script>
