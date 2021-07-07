<template>
    <div class="row ml-3 mr-3 mt-4">
            <div class="col-9 col-sm-10 col-lg-11 m-auto">
              <div class="d-flex justify-content-between">
                <span class="info-box-text agent-mini-color-gray">Process status</span>
                <span class="info-box-text agent-mini-color-gray">{{ time }}</span>
              </div>
              <div class="progress pipeline-run-progress">
                <div :style="{ width: progressValue+'%' }" class="progress-bar agent_exec_progress_bar main_reconnes_bg-color"></div>
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
<script>
import RocketIco from '@/components/Icons/RocketIco.vue'
import { mapMutations } from 'vuex'
export default {
  name: 'GeneralProgressBar',
  data: function () {
    return {
      progressValue: 0,
      time: '00:00:00',
      now: 0,
      timer: null
    }
  },
  components: {
    RocketIco
  },
  watch: {
    stopRunnin: function (value) {
      console.log('lester')
      if (value) {
        this.stopClock()
      }
    }
  },
  emits: ['isrunning'],
  props: {
    pipeline: Object,
    stopRunnin: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapMutations('pipelines', ['setPipelineStatus']),
    executePipeline () {
      if (this.pipeline.statusRun === this.$entityStatus.RUNNING) {
        this.setPipelineStatus({
          idPipeline: this.pipeline.id,
          status: this.$entityStatus.FINISHED
        })
        this.stopClock()
        this.$emit('isrunning', false)
      } else {
        this.setPipelineStatus({
          idPipeline: this.pipeline.id,
          status: this.$entityStatus.RUNNING
        })
        this.playClock()
        this.$emit('isrunning', true)
      }
    },
    tick () {
      this.now++
      let remain = this.now
      let hours = Math.floor(remain / 3600)
      let mins = Math.floor(remain / 60)
      remain -= mins * 60
      let secs = remain

      if (hours < 10) {
        hours = '0' + hours
      }
      if (mins < 10) {
        mins = '0' + mins
      }
      if (secs < 10) {
        secs = '0' + secs
      }
      this.time = hours + ':' + mins + ':' + secs
      this.executeProgressBar()
    },
    playClock () {
      this.timer = setInterval(this.tick, 1000)
    },
    stopClock () {
      clearInterval(this.timer)
      this.now = -1
      this.progressValue = 0
      this.time = '00:00:00'
    },
    pauseClock () {
      clearInterval(this.timer)
      this.timer = null
    },
    executeProgressBar () {
      if (this.progressValue <= 100) {
        this.progressValue += 5
      } else {
        this.progressValue = 0
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
  color: #ffffff;
}
</style>
