<template>
    <div class="row ml-3 mr-3 mt-4">
            <div class="col-10 col-xl-11">
              <div class="d-flex justify-content-between">
                <span class="info-box-text agent-mini-color-gray">Process status</span>
                <span class="info-box-text agent-mini-color-gray">{{ time }}</span>
              </div>
              <div class="progress pipeline-run-progress">
                <div :style="{ width: progressValue+'%' }" class="progress-bar agent_exec_progress_bar main_reconnes_bg-color"></div>
              </div>
              <span v-if="pipeline.statusRun === $entityStatus.RUNNING" class="float-right agent-mini-color-gray">running</span>
              <span v-else-if="pipeline.statusRun === $entityStatus.WAITING" class="float-right agent-mini-color-gray">waiting</span>
              <span v-else class="float-right agent-mini-color-gray">finished</span>
            </div><!-- /.col-9 col-sm-10 col-lg-11 m-auto -->
            <div class="col-2 col-xl-1 action-panel">
            <!-- <div class="col-3 col-sm-2 col-lg-1 action-panel"> -->
              <div v-if="this.pipeline.statusRun === $entityStatus.RUNNING" class="action-panel-container action-panel-container-stop d-flex w-100 flex-column">
                <span class="cursor-pointer material-icons red-font-color m-auto" @click="executeOrStopPipeline">stop</span>
                <span class="pb-2 m-auto red-font-color">STOP</span>
              </div>
              <div v-else @mouseover="toggle" class="action-panel-container action-panel-container-run d-flex w-100 flex-column start-btn">
                <div class="m-auto">
                <span :class="{isLinkDisabled: !areLocationsAssigned, 'cursor-pointer': areLocationsAssigned }" @click="executeOrStopPipeline"><RocketIco /></span>
                </div>
                <div :class="{isLinkDisabled: !areLocationsAssigned, 'cursor-pointer': areLocationsAssigned }" class="m-auto pb-2">
                <span class="white-font-color">RUN</span>
                </div>
              </div>
            </div> <!-- /.col-3 col-sm-2 col-lg-1 action-panel -->
            <OverlayPanel :baseZIndex=100 ref="op" appendTo="body" id="overlay_panel_disabled"  >
              <small class="font-weight-bold">You need to define a location before execute the pipeline</small>
            </OverlayPanel>
          </div> <!-- /.row -->
</template>
<script>
import RocketIco from '@/components/Icons/RocketIco.vue'
import OverlayPanel from 'primevue/overlaypanel'
import { mapMutations, mapState } from 'vuex'
import { ProgressBarMixin } from '@/mixins/ProgressBarMixin'
export default {
  name: 'GeneralProgressBar',
  components: {
    RocketIco,
    OverlayPanel
  },
  mixins: [ProgressBarMixin],
  computed: {
    ...mapState('pipelines', ['agentParentRunningIndex']),
    areLocationsAssigned () {
      return (this.pipeline.locations.length > 1 || !this.$validateIsBlank(this.pipeline.locations[0].name))
    }
  },
  watch: {
    agentParentRunningIndex: function (parentIndex) {
      if (this.agentParentRunningIndex >= this.pipeline.agent.length) {
        this.stopClock()
        this.setPipelineAgentParentIndex(-1)
      }
    },
    pipeline: {
      handler: function (data) {
        if (data.statusRun !== this.$entityStatus.RUNNING) {
          this.stopClock()
        }
      },
      deep: true
    }
  },
  props: {
    pipeline: Object
  },
  methods: {
    ...mapMutations('pipelines', ['setPipelineStatus', 'setPipelineAgentParentIndex', 'setStatusToAllAgentsByPipeline']),
    executeOrStopPipeline () {
      if (this.pipeline.statusRun === this.$entityStatus.RUNNING) {
        this.setPipelineStatus({
          idPipeline: this.pipeline.id,
          status: this.$entityStatus.WAITING
        })
        this.setStatusToAllAgentsByPipeline({
          pipeline: this.pipeline,
          status: this.$entityStatus.WAITING
        })
        this.stopClock()
        this.setPipelineAgentParentIndex(-1)
      } else {
        this.setPipelineStatus({
          idPipeline: this.pipeline.id,
          status: this.$entityStatus.RUNNING
        })
        this.setStatusToAllAgentsByPipeline({
          pipeline: this.pipeline,
          status: this.$entityStatus.WAITING
        })
        this.playClock()
        this.setPipelineAgentParentIndex(this.agentParentRunningIndex + 1)
      }
    },
    toggle (event) {
      if (!this.areLocationsAssigned) {
        this.$refs.op.toggle(event)
      }
    }
  }
}
</script>
<style scoped>
.action-panel span.material-icons.red-font-color{
  font-size: 2.5rem
}
.pipeline-run-progress{
  height: 5px;
}
.action-panel-container{
  border-radius: 17px;
  width: 76%;
  height: 96%;
}
.action-panel-container-stop{
  background-color: #ffffff;
}

.action-panel-container-run{
  background-color: #007bff;
}
div.action-panel-container-run.start-btn svg{
  margin: auto;
  width: 30px;
  height: 35px;
  margin-top: 9px;
  fill: #ffffff;
}

.white-font-color{
  color: #ffffff !important;
}
</style>
