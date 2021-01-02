<template>
  <div>
  <!-- Contains navs-bar -->
  <NavBarTwo></NavBarTwo>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <div class="container-fluid">
        <hr class="reset-margin-top" />
        <div class="content">
          <AgentsList></AgentsList>
          <AgentConfirmation></AgentConfirmation>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import AgentsList from '@/components/AgentsList.vue'
import NavBarTwo from '@/components/NavBarTwo.vue'
import AgentConfirmation from '@/components/AgentConfirmation.vue'

export default {
  name: 'AgentListView',
  components: {
    AgentConfirmation,
    AgentsList,
    NavBarTwo
  }
}
</script>
