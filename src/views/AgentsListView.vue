<template>
  <div>
  <!-- Contains navs-bar -->
  <NavBarTwo></NavBarTwo>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper screen-height">
      <div class="container-fluid">
        <hr class="reset-margin-top" :class="{'mb-0': isOnAgentMinimalView}"/>
        <div :class="{'content': !isOnAgentMinimalView}">
          <AgentsList v-if="this.$store.state.agent.isDefaultViewOnAgent"></AgentsList>
          <div class="row" v-else>
            <AgentMiniList2/>
          </div>
          <AgentConfirmation></AgentConfirmation>
         </div>
      </div>
    </div>
    <BottomBar/>
    <AgentForm></AgentForm>
  </div>
</template>

<script>
import AgentsList from '@/components/Agent/AgentsList.vue'
// import AgentMiniView from '@/components/Agent/AgentMiniView.vue'
import { AgentMixin } from '@/mixins/AgentMixin'
import AgentMiniList2 from '@/components/Agent/AgentMiniList2.vue'
import NavBarTwo from '@/components/General/NavBarTwo.vue'
import AgentConfirmation from '@/components/Agent/AgentConfirmation.vue'
import AgentForm from '@/components/Agent/AgentForm.vue'
import BottomBar from '@/components/General/BottomBar'

export default {
  name: 'AgentListView',
  components: {
    // AgentMiniView,
    AgentMiniList2,
    AgentConfirmation,
    AgentsList,
    NavBarTwo,
    AgentForm,
    BottomBar
  },
  mounted () {
    this.$store.commit('agent/updateLocView', 'Agents', true)
  },
  mixins: [AgentMixin],
  computed: {
    isOnAgentMinimalView () {
      return (this.isOnAgentView && !this.$store.state.target.isDefaultViewOnAgent)
    }
  }
}
</script>
