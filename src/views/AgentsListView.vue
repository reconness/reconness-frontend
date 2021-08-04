<template>
  <div>
  <!-- Contains navs-bar -->
  <NavBarTwo></NavBarTwo>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <div class="container-fluid">
        <hr class="reset-margin-top" />
        <div class="content">
          <AgentsList v-if="$store.state.isDefaultViewOnAgent"></AgentsList>
          <div class="row" v-else>
            <AgentMiniView v-for="agent of arrayFilterList" :key="agent.id" :id="agent.id" :name="agent.name" :background="agent.background"></AgentMiniView>
          </div>
          <AgentConfirmation></AgentConfirmation>
         </div>
      </div>
    </div>
    <AgentForm></AgentForm>
  </div>
</template>

<script>
import AgentsList from '@/components/Agent/AgentsList.vue'
import AgentMiniView from '@/components/Agent/AgentMiniView.vue'
import NavBarTwo from '@/components/General/NavBarTwo.vue'
import AgentConfirmation from '@/components/Agent/AgentConfirmation.vue'
import AgentForm from '@/components/Agent/AgentForm.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'AgentListView',
  components: {
    AgentMiniView,
    AgentConfirmation,
    AgentsList,
    NavBarTwo,
    AgentForm
  },
  mounted () {
    this.$store.commit('agent/updateLocView', 'Agents', true)
  },
  computed: {
    ...mapState('agent', ['agentListStore']),
    ...mapState('agent', ['filterColour']),
    ...mapGetters('agent', ['filterByColor']),
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
