<template>
  <div class="overflow-y-clip">
  <!-- Contains navs-bar -->
  <NavBarTwo></NavBarTwo>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper screen-height">
      <div class="container-fluid">
        <hr class="reset-margin-top" :class="{'mb-0': isOnAgentMinimalView}"/>
        <div :class="{'content': !isOnAgentMinimalView}">
          <div class="row" v-if="this.$store.state.agent.isDefaultViewOnAgent">
              <AgentsList v-for="agent of filteredAgentList" :key="agent.id" :id="agent.id" :name="agent.name" :image="agent.image" :primaryColor="agent.primaryColor" :secondaryColor="agent.secondaryColor" :createdBy="agent.createdBy"/>
          </div>
          <div class="row" v-else>
            <AgentMiniList/>
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
import { AgentMixin } from '@/mixins/AgentMixin'
import AgentMiniList from '@/components/Agent/AgentMiniList.vue'
import NavBarTwo from '@/components/General/NavBarTwo.vue'
import AgentConfirmation from '@/components/Agent/AgentConfirmation.vue'
import AgentForm from '@/components/Agent/AgentForm.vue'
import { mapState, mapGetters } from 'vuex'
import BottomBar from '@/components/General/BottomBar'

export default {
  name: 'AgentListView',
  components: {
    AgentsList,
    AgentMiniList,
    AgentConfirmation,
    NavBarTwo,
    AgentForm,
    BottomBar
  },
  mounted () {
    this.$store.commit('agent/updateLocView', 'Agents', true)
  },
  mixins: [AgentMixin],
  computed: {
    ...mapState('agent', ['filterColour', 'agentListStore']),
    ...mapGetters('agent', ['filterByColor']),
    ...mapState('target', ['paginator']),
    isOnAgentMinimalView () {
      return (this.$isOnAgentView && !this.$store.state.agent.isDefaultViewOnAgent)
    }
  }
}
</script>
<style>
  body{
    background: #f2f4f6;
    background-size: cover
  }
</style>
<style scoped>
.content-wrapper{
  max-height: 100vh !important;
  min-height: 75vh !important;
}
</style>
