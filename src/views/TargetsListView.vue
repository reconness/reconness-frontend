<template>
  <div>
  <!-- Contains navs-bar -->
    <NavBarTwoTarget/>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <div class="container-fluid">
        <hr class="reset-margin-top" :class="{'mb-0': isOnTargetMinimalView}" />
        <div :class="{'content': !isOnTargetMinimalView}">
          <div class="row" v-if="this.$store.state.target.isDefaultViewOnTarget">
            <TargetsList v-for="target of arrayFilterList" :key="target.id" :id="target.id" :name="target.name" :primaryColor="target.primaryColor" :transformedName="target.transformedName" :secondaryColor= "target.secondaryColor" :rootDom="target.rootDomains"/>
          </div>
          <div class="row" v-else>
          <TargetMiniList/>
          </div>
          <Toast :baseZIndex="200"/>
        </div>
      </div>
    </div>
    <div class="w-100 h-50 d-flex justify-content-center left-aside">
      <span class="font-weight-bold">241 - 300 de 1050 elementos</span>
    </div>
  </div>
</template>
<script>
import TargetsList from '@/components/Target/TargetsList.vue'
import NavBarTwoTarget from '@/components/Target/NavBarTwoTarget.vue'
import { mapState, mapGetters, mapMutations } from 'vuex'
import TargetMiniList from '@/components/Target/TargetMiniList.vue'
import Toast from 'primevue/toast'
export default {
  name: 'TargetsListView',
  components: {
    TargetsList,
    NavBarTwoTarget,
    TargetMiniList,
    Toast
  },
  computed: {
    ...mapState('target', ['targetListStore', 'filterColour', 'targetEliminationStatus']),
    ...mapState('agent', ['isElementDeleted']),
    ...mapGetters('target', ['filterByColor']),
    arrayFilterList () {
      if (this.filterColour === '') {
        return this.targetListStore
      } else {
        return this.filterByColor(this.filterColour)
      }
    },
    isOnTargetView () {
      return this.$route.name === 'Targets'
    },
    isOnTargetMinimalView () {
      return (this.isOnTargetView && !this.$store.state.target.isDefaultViewOnTarget)
    }
  },
  mounted () {
    this.$store.commit('agent/updateLocView', 'Targets', true)
    if (this.isElementDeleted) {
      this.$toast.add({ severity: 'success', sumary: 'Success', detail: 'The target has been deleted successfully', life: 3000 })
      this.setIsElementDeleted(false)
    }
  },
  methods: {
    ...mapMutations('agent', ['setIsElementDeleted'])
  }
}
</script>
