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
            <TargetsList v-for="target of filteredTargetList" :key="target.id" :id="target.id" :name="target.name" :primaryColor="target.primaryColor" :transformedName="target.transformedName" :secondaryColor= "target.secondaryColor" :rootDom="target.rootDomains"/>
          </div>
          <div class="row" v-else>
          <TargetMiniList/>
          </div>
          <Toast :baseZIndex="200"/>
        </div>
      </div>
    </div>
    <BottomBar/>
  </div>
</template>
<script>
import TargetsList from '@/components/Target/TargetsList.vue'
import NavBarTwoTarget from '@/components/Target/NavBarTwoTarget.vue'
import { mapState, mapGetters, mapMutations } from 'vuex'
import TargetMiniList from '@/components/Target/TargetMiniList.vue'
import Toast from 'primevue/toast'
import BottomBar from '@/components/General/BottomBar'
export default {
  name: 'TargetsListView',
  components: {
    TargetsList,
    NavBarTwoTarget,
    TargetMiniList,
    Toast,
    BottomBar
  },
  computed: {
    ...mapState('target', ['targetListStore', 'filterColour', 'targetEliminationStatus', 'paginator']),
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
    },
    filteredTargetList () {
      return this.arrayFilterList.slice(this.paginator.startIndex, this.paginator.endIndex)
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
