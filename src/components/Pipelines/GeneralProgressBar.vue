<template>
    <div class="row ml-3 mr-3 mt-4">
            <div class="col-9 col-sm-10 col-lg-11 m-auto">
              <div class="d-flex justify-content-between">
                <span class="info-box-text agent-mini-color-gray">Process status</span>
                <span class="info-box-text agent-mini-color-gray">00:06:00</span>
              </div>
              <div class="progress pipeline-run-progress">
                <div :style="{ width: progressValue+'10%' }" class="progress-bar agent_exec_progress_bar main_reconnes_bg-color"></div>
              </div>
              <span class="float-right agent-mini-color-gray">waiting</span>
            </div><!-- /.col-9 col-sm-10 col-lg-11 m-auto -->
            <div class="col-3 col-sm-2 col-lg-1 action-panel">
              <div v-if="this.pipeline.statusRun === $entityStatus.RUNNING" class="action-panel-container action-panel-container-stop d-flex flex-column">
                <span class="cursor-pointer material-icons red-font-color m-auto" @click="executePipeline">stop</span>
                <span class="pb-2 m-auto red-font-color">STOP</span>
              </div>
              <div v-else class="action-panel-container action-panel-container-run d-flex flex-column start-btn">
                <div class="m-auto">
                <span class="cursor-pointer" @click="executePipeline"><RocketIco /></span>
                </div>
                <span class="pb-2 m-auto white-font-color">RUN</span>
              </div>
            </div> <!-- /.col-3 col-sm-2 col-lg-1 action-panel -->
          </div> <!-- /.row -->
</template>
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
  color: #ffffff;
}
</style>
<script>
import RocketIco from '@/components/Icons/RocketIco.vue'
import { mapMutations } from 'vuex'
export default {
  name: 'GeneralProgressBar',
  data: function () {
    return {
      progressValue: 0,
      showStopBtn: false,
      time: '00:00:00',
      now: 0,
      timer: null
    }
  },
  components: {
    RocketIco
  },
  props: {
    // id: String
    pipeline: Object
  },
  methods: {
    ...mapMutations('pipelines', ['setPipelineStatus']),
    executePipeline () {
      if (this.pipeline.statusRun === this.$entityStatus.RUNNING) {
        this.setPipelineStatus({
          idPipeline: this.pipeline.id,
          status: this.$entityStatus.FINISHED
        })
      } else {
        this.setPipelineStatus({
          idPipeline: this.pipeline.id,
          status: this.$entityStatus.RUNNING
        })
      }
    }
  }
}
</script>
