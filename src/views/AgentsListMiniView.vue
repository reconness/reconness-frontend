<template>
  <div>
    <!-- Contains navs-bar -->
    <NavBarTwo></NavBarTwo>
    <div class="content-wrapper">
      <div class="container-fluid">
        <hr class="reset-margin-top" />
        <div class="content">
          <div class="row">
            <AgentMiniView v-for="agent of arrayFilterList" :key="agent.id" :name="agent.name" :background="agent.background"></AgentMiniView>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AgentMiniView from '@/components/AgentMiniView.vue'
import NavBarTwo from '@/components/NavBarTwo.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'AgentListMiniView',
  components: {
    AgentMiniView,
    NavBarTwo
  },
  computed: {
    ...mapState(['agentListStore']),
    ...mapState(['filterColour']),
    ...mapGetters(['filterByColor']),
    arrayFilterList () {
      if (this.filterColour === '') {
        return this.agentListStore
      } else {
        return this.filterByColor(this.filterColour)
      }
    }
  }
}
</script>
