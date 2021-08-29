<template>
  <div>
    <!-- Contains navs-bar -->
    <NavBarTwoDetailPipeline :id="this.id" :pipelineName="this.getPipelineById(parseInt(this.id)).name" />
    <div class="content-wrapper">
        <div class="container-fluid pl-0">
        <hr class="mt-1 mb-0" />
          <div class="row border-container ml-3 mr-3 mt-2">
          <div class="col-11 mb-5">
            <PipelineWorkflow :AgentsPipelineList='this.getPipelineById(parseInt(this.id)).agent'
              :startingAgentId= 'this.getPipelineById(parseInt(this.id)).startingAgent' class="p-3 pr-0"/>
          </div>
           <div class="col-1">
              <p class="ml-auto mt-3 mr-3 d-flex flex-column text-right">
            <span class="cursor-pointer material-icons mb-1 clearfix">zoom_in</span>
            <span class="cursor-pointer  material-icons mb-1 ">zoom_out</span>
            <span class="cursor-pointer material-icons">fullscreen</span>
          </p>
           </div>
          </div>
        </div>
      </div>
    <AgentListWorkflow :routeName= 'this.$route.name'></AgentListWorkflow>
  </div>
</template>
<script>

import { mapGetters, mapState } from 'vuex'
import NavBarTwoDetailPipeline from '@/components/Pipelines/NavBarTwoDetailPipeline.vue'
import AgentListWorkflow from '@/components/Pipelines/AgentListWorkflow.vue'
import PipelineWorkflow from '@/components/Pipelines/PipelineWorkflow.vue'

export default {
  name: 'PipelineDetailsView',
  components: {
    NavBarTwoDetailPipeline,
    AgentListWorkflow,
    PipelineWorkflow
  },
  props: {
    id: String
  },
  computed: {
    ...mapGetters('pipelines', ['getPipelineById']),
    ...mapState('pipelines', ['checkDetail']),
    changePading () {
      let padding
      if (this.checkDetail) {
        padding = '.5rem'
      } else {
        padding = '1rem'
      }
      return padding
    }
  },
  mounted () {
    this.$store.commit('agent/updateLocView', 'Pipelines', true)
  },
  methods: {
    collapseDown () {
      document.getElementById('scroll-div').scrollBy({ top: 120, behavior: 'smooth' })
    },
    collapseUp () {
      document.getElementById('scroll-div').scrollBy({ top: -120, behavior: 'smooth' })
    },
    setDetailsLink (e) {
      const selectedAgentId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('agent/setIdAgent', selectedAgentId)
      this.$store.commit('agent/setDetailsLinks', true)
    }
  }
}
</script>
<style scoped>
.info-box {
  border-radius: 16px;
  box-shadow: none;
  opacity: 1;
  border: 1px solid #e8ebef;
  background-color: transparent;
}
.border-container {
    border: 1px solid #e8ebef;
    border-radius: 12px;
    opacity: 1;
}

#scroll-div{
  height: 120px;
  overflow:hidden;
}
div small{
  color: #b3b3b3;
}
.p-edit {

}
</style>
