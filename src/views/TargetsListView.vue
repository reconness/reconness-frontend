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
          <TargetMiniList v-for="target of arrayFilterList" :key="target.id" :id="target.id" :name="target.name" :primaryColor="target.primaryColor" :transformedName="target.transformedName" :secondaryColor= "target.secondaryColor" :rootDom="target.rootDomains">
          </TargetMiniList>
          </div>
          <Toast :baseZIndex="200"/>
        </div>
      </div>
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
    ...mapState('target', ['targetListStore', 'filterColour']),
    ...mapState('agent', ['isElementDeleted']),
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
