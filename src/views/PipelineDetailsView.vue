<template>
  <div>
    <!-- Contains navs-bar -->
    <NavBarTwoDetailPipeline
      :pipelineName="this.getPipelineById(parseInt(this.$route.params.id)).name"
    />
    <div class="content-wrapper">
      <div class="container-fluid pl-0">
        <hr class="mt-1 mb-0" />
        <div id='scroll-div'>
        <div class="content" id="content">
          <div class="row">
            <div class="col-12 col-md-3 col-xl-2 p-3">
              <div class="info-box abs-center color-blue">
                <div class="d-flex flex-column text-right">
                  <span data-toggle="modal" data-target="#pipelinesModalForm" class="cursor-pointer material-icons text-center">control_point</span>
                  <span data-toggle="modal" data-target="#pipelinesModalForm" class="cursor-pointer">Add Agent</span>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-3 col-xl-2 p-3 order-12"
              v-for="item of this.getPipelineById(parseInt(this.$route.params.id)).agent" :key="item.id" >
              <PipelineAgent
                :pipelineName="item.name"
                :pipelineID="item.id"
                :pipelineBackground="item.background"
              />
            </div>
          </div>
        </div></div>
        <hr class="mb-2 mt-0" />
              <div class="row">
          <div class="col-12">
                      <div class="float-right mr-5">
                        <small class="mr-2 font-italic"> 8 agents added</small>
                        <button type="button" class="btn btn-light p-0 mr-1 "    @click="collapseDown">
                          <span class="material-icons float-right" >arrow_drop_down</span>
                        </button>
                        <button type="button" class="btn btn-light  p-0 "    @click="collapseUp">
                          <span class="material-icons float-right" >arrow_drop_up</span>
                        </button>
                      </div>
                  </div></div>
                  <div class="row border-container ml-3 mr-3 mt-2">
                  <div class="col-11">
                    <PipelineWorkflow :AgentsPipelineList='this.getPipelineById(parseInt(this.$route.params.id)).agent' class="w-50 p-3 pr-0"/>
                  </div>
                   <div class="col">
                      <p class="ml-auto mt-3 mr-3 d-flex flex-column text-right">
                    <span class="cursor-pointer material-icons mb-1 clearfix">zoom_in</span>
                    <span class="cursor-pointer  material-icons mb-1 ">zoom_out</span>
                    <span class="cursor-pointer material-icons">fullscreen</span>
                  </p>
                   </div>
                  </div>
        </div>
      </div>
    <!-- container-fluid -->
    <PipelinesForm :routeName= 'this.$route.name'></PipelinesForm>
  </div>
  <!-- content-wrapper -->
</template>
<script>

import { mapGetters } from 'vuex'
import NavBarTwoDetailPipeline from '@/components/Pipelines/NavBarTwoDetailPipeline.vue'
import PipelineAgent from '@/components/Pipelines/PipelineAgent.vue'
import PipelinesForm from '@/components/Pipelines/PipelinesForm.vue'
import PipelineWorkflow from '@/components/Pipelines/PipelineWorkflow.vue'

export default {
  name: 'PipelineDetailsView',
  data: function () {
    return {
    }
  },
  components: {
    NavBarTwoDetailPipeline,
    PipelineAgent,
    PipelinesForm,
    PipelineWorkflow
  },
  computed: {
    ...mapGetters('pipelines', ['getPipelineById'])
  },
  methods: {
    collapseDown () {
      // document.getElementById('collapseWorkflowSection').classList.add('show')
      // document.getElementById('collapseWorkflowSection').classList.remove('hide')
      document.getElementById('content').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
      // document.getElementById('content').style.top = 120 + 'px'
    },
    collapseUp () {
      // document.getElementById('collapseWorkflowSection').classList.remove('show')
      // document.getElementById('collapseWorkflowSection').classList.add('hide')
      document.getElementById('content').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'end' })
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

</style>
