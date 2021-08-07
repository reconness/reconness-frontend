<template>
  <div>
  <!-- Contains navs-bar -->
   <NavBarTwoPipelines></NavBarTwoPipelines>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <div class="container-fluid">
        <hr class="reset-margin-top mb-0" />
        <div class="content">
          <PipelinesList v-if="this.$store.state.pipelines.isDefaultViewOnPipelines"/>
          <div v-else>
          <PipelinesMiniList></PipelinesMiniList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PipelinesList from '@/components/Pipelines/PipelinesList.vue'
import PipelinesMiniList from '@/components/Pipelines/PipelinesMiniList.vue'
import NavBarTwoPipelines from '@/components/Pipelines/NavBarTwoPipelines.vue'
export default {
  name: 'TargetsListView',
  components: {
    PipelinesList,
    NavBarTwoPipelines,
    PipelinesMiniList
  },
  mounted () {
    this.$store.commit('agent/updateLocView', 'Pipelines', true)
  }
}
</script>
