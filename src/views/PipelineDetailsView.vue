<template>
  <div>
    <!-- Contains navs-bar -->
    <NavBarTwoDetailPipeline
      :pipelineName="this.getPipelineById(parseInt(this.$route.params.id)).name"
    />
    <div class="content-wrapper">
      <div class="container-fluid">
        <hr class="reset-margin-top" />
        <div id='scroll-div'>
        <div class="content" id="content">
          <div class="row">
            <div class="col-12 col-lg-2 p-3">
              <div class="info-box abs-center color-blue">
                <div class="d-flex flex-column text-right">
                  <span data-toggle="modal" data-target="#pipelinesModalForm" class="cursor-pointer material-icons text-center">control_point</span>
                  <span data-toggle="modal" data-target="#pipelinesModalForm" class="cursor-pointer">Add Agent</span>
                </div>
              </div>
            </div>
            <div
              v-for="item of this.getPipelineById(parseInt(this.$route.params.id)).agent" :key="item.id" class="col-12 col-lg-2 p-3">
              <PipelineAgent
                :pipelineName="item.name"
                :pipelineID="item.id"
                :pipelineBackground="item.background"
              />
            </div>
          </div>
        </div></div>
        <hr class="m-2" />
              <div class="row">
          <div class="col-12">
                          <h5 class="mb-0">
                      <div class="float-right">
                        <small class="mr-2 font-italic"> 8 agents added</small>
                        <button type="button" class="btn btn-light btn-sm mr-2 collapsed" aria-expanded="false"  data-target="#collapseWorkflowSection" @click="collapseDown">
                          <span class="material-icons float-right" >arrow_drop_down</span>
                        </button>
                        <button type="button" class="btn btn-light btn-sm collapsed"  aria-expanded="false" data-target="#collapseWorkflowSection" @click="collapseUp">
                          <span class="material-icons float-right" >arrow_drop_up</span>
                        </button>
                      </div>
                  </h5>
                  </div>
                  <div class="col-12">
                <div id="collapseWorkflowSection" >
                  <div class=" border-container mt-2 p-5">
                    <PipelineWorkflow :AgentsPipelineList='this.getPipelineById(parseInt(this.$route.params.id)).agent'/>
                  </div>
                </div>
          </div></div>
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
      document.getElementById('content').scrollIntoView(true)
    },
    collapseUp () {
      // document.getElementById('collapseWorkflowSection').classList.remove('show')
      // document.getElementById('collapseWorkflowSection').classList.add('hide')
      document.getElementById('content').scrollIntoView(false)
    }
  }
}
</script>
<style scoped>
.info-box {
  border-radius: 18px;
  box-shadow: none;
  opacity: 1;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: transparent;
}
.border-container {
    border: 1px solid #22262b33;
    border-radius: 8px;
    opacity: 1;
}

#scroll-div{
  height: 120px;
  overflow:hidden;
}

</style>
