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
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import AgentsList from '@/components/AgentsList.vue'
import NavBarTwo from '@/components/NavBarTwo.vue'

export default {
  name: 'AgentListView',
  components: {
    AgentsList,
    NavBarTwo
  }
}
</script>
