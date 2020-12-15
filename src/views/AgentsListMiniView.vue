<template>
  <div>
    <!-- Contains navs-bar -->
    <NavBarTwo></NavBarTwo>
    <div class="content-wrapper">
      <div class="container-fluid">
        <hr class="reset-margin-top" />
        <div class="content">
          <div class="row">
            <AgentMiniView v-for="agent of agentListStore" :key="agent.id" :name="agent.name" :background="agent.background"></AgentMiniView>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AgentMiniView from '@/components/AgentMiniView.vue'
import NavBarTwo from '@/components/NavBarTwo.vue'
import { mapState } from 'vuex'

export default {
  name: 'AgentListMiniView',
  components: {
    AgentMiniView,
    NavBarTwo
  },
  computed: {
    ...mapState(['agentListStore'])
  }
}
</script>
