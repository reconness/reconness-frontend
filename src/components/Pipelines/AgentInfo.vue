<template>
    <div :style="{background: agent.background}" class="info-box agent_info_panel">
        <div class="info-box-content">
        <div class="border-right">
            <span class="info-box-text mb-2 font-weight-bold overflow-visible white-text">{{agent.name}}</span>
            <span class="mr-1 white-text">{{time}}</span>
            <MotionPlayOutlineIco />
            <div class="mt-2 output-selector pr-2">
            <span class="mr-2 cursor-pointer white-text" data-toggle="modal" data-target="#agentExecutionModalForm" @click="setAgent(agent)">Terminal</span><span class="pl-2 border-left cursor-pointer white-text" data-toggle="modal" data-target="#agentExecutionModalForm" @click="setAgent(agent)">Logs</span>
            </div>
        </div>
        </div>
        <span class="info-box-icon elevation-1 process_status_panel container-container-circular-bar">
        <span class="border container-circular-bar">
        <div class="circular-bar-container border pipeline-run-terminal">
        <CircleProgress v-if="!isDone" :percent="progressValue" :size="30" :border-width="3" :border-bg-width="3" empty-color="#ff959e" fill-color="#ffffff"/>
        <span style="opacity:0.2" v-else class="material-icons white-text">done</span>
        </div>
    </span>
    </span>
    <!-- /.info-box-content -->
</div>
</template>
<script>
import CircleProgress from 'vue3-circle-progress'
import { mapState, mapMutations, mapGetters } from 'vuex'
import MotionPlayOutlineIco from '@/components/Icons/MotionPlayOutlineIco.vue'

export default {
  name: 'AgentInfo',
  components: {
    CircleProgress,
    MotionPlayOutlineIco
  },
  data: function () {
    return {
      progressValue: 0,
      time: '00:00:00',
      now: 0,
      timer: null,
      isDone: false
    }
  },
  watch: {
    agentParentRunningIndex: function (indexParentAgent) {
      if (this.pipeline.statusRun === this.$entityStatus.RUNNING) {
        if (this.index === this.agentParentRunningIndex) {
          this.setPipelineAgentParentStatusByIndex({
            idPipeline: this.pipeline.id,
            index: this.getOriginalPipelineAgentParentIndex(this.pipeline, this.index),
            status: this.$entityStatus.RUNNING
          })
          this.playClock()
          if (this.agent.agentBranch && this.agent.agentBranch.length > 0) {
            this.updateStatusAllChildren({ idPipeline: this.pipeline.id, idAgent: this.agent.id })
          } else {
            const self = this
            setTimeout(
              function () {
                self.setPipelineAgentParentStatusByIndex({
                  idPipeline: self.pipeline.id,
                  index: self.getOriginalPipelineAgentParentIndex(self.pipeline, self.index),
                  status: self.$entityStatus.FINISHED
                })
                if (self.pipeline.statusRun === self.$entityStatus.RUNNING) {
                  self.setPipelineAgentParentIndex(self.agentParentRunningIndex + 1)
                }
                self.stopClock()
                self.isDone = true
                if (self.pipeline.agent.length - 2 === self.index) {
                  self.setPipelineStatus({
                    idPipeline: self.pipeline.id,
                    status: self.$entityStatus.FINISHED
                  })
                }
              },
              5000
            )
          }
        } else {
          if (this.agent.status === this.$entityStatus.RUNNING) {
            if (this.isSonOfAgent()) {
              this.playClock()
              const self = this
              setTimeout(
                function () {
                  self.stopClock()
                  self.setPipelineAgentParentStatusByIndex({
                    idPipeline: self.pipeline.id,
                    index: self.index,
                    status: self.$entityStatus.FINISHED
                  })
                  self.setNumberAgentsProcessing(1)
                  self.isDone = true
                },
                5000
              )
            }
          }
        }
      }
    },
    numberAgentsProcessing: function (value) {
      if (this.index === this.agentParentRunningIndex && this.index < (this.pipeline.agent.length - 1)) {
        if (this.agent.agentBranch && value === this.agent.agentBranch.length) {
          this.stopClock()
          this.isDone = true
          if (this.pipeline.agent[this.agentParentRunningIndex].agentBranch) {
            this.setPipelineAgentParentIndex(this.pipeline.agent[this.agentParentRunningIndex].agentBranch.length + 1)
          } else {
            this.setPipelineAgentParentIndex(this.agentParentRunningIndex + 1)
          }
          if (this.index === (this.pipeline.agent.length - 2)) {
            this.setPipelineStatus({
              idPipeline: this.pipeline.id,
              status: this.$entityStatus.FINISHED
            })
          }
        }
      }
    }
  },
  props: {
    agent: Object,
    pipeline: Object,
    index: {
      type: Number,
      default: -1
    }
  },
  computed: {
    ...mapState('pipelines', ['agentParentRunningIndex', 'agentChildRunningIndex', 'numberAgentsProcessing']),
    ...mapGetters('pipelines', ['getPipelineById'])
  },
  methods: {
    ...mapMutations('pipelines', ['setPipelineAgentParentStatusByIndex', 'setPipelineAgentChildStatusByIndex', 'setPipelineAgentParentIndex', 'setPipelineAgentChildIndex', 'setAgent', 'setPipelineStatus', 'updateStatusAllChildren', 'setNumberAgentsProcessing']),
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
    executeProgressBar () {
      if (this.progressValue <= 100) {
        this.progressValue += 5
      } else {
        this.progressValue = 0
      }
    },
    calculateOriginalIndexAgent (currentIndex) {
      let counter = -1
      let i = 0
      let j
      const agents = this.getPipelineById(this.pipeline.id).agent
      while (i < agents.length && counter !== currentIndex) {
        counter++
        if (agents[i].agentBranch.length > 0) {
          j = 0
          while (j < agents[i].agentBranch.length && counter !== currentIndex) {
            j++
            counter++
          }
          if (j < agents[i].agentBranch.length) {
            return j
          }
        }
        i++
      }
      if (i < agents.length) {
        return i
      } else {
        return -1
      }
    },
    isSonOfAgent () {
      if (this.pipeline.agent[this.agentParentRunningIndex]) {
        if (this.pipeline.agent[this.agentParentRunningIndex].agentBranch) {
          if (this.pipeline.agent[this.agentParentRunningIndex].agentBranch.find(element => element.id === this.agent.id)) {
            return true
          }
        }
      }
      return false
    },
    getOriginalPipelineAgentParentIndex (pipeline, newIndex) {
      if (newIndex === 0) {
        return 0
      }
      let sonsCounter = 0
      let generalCounter = -1
      let i = 0
      while (i < pipeline.agent.length && generalCounter < newIndex) {
        if (pipeline.agent[i].agentBranch && pipeline.agent[i].agentBranch.length > 0) {
          sonsCounter += pipeline.agent[i].agentBranch.length
        }
        i++
        generalCounter = generalCounter + 1
      }
      return newIndex - sonsCounter
    }
  }
}
</script>
<style scoped>
.agent_info_panel{
  background: #FF5A5A 0% 0% no-repeat padding-box;
  border-radius: 18px;
  box-shadow: 13px 19px 41px #0C1F6A3B;
  opacity: 1;
}
.process_status_panel{
  box-shadow: none !important;
}
.container-circular-bar{
  width: 3rem;
  height: 3rem;
  border: 2px solid #dee2e6 !important;
  border-radius: 10px;
}
.agent_info_panel .info-box-text{
  font-size: 20px;
}
.agent_info_panel svg{
  fill: #ffffff;
}
.process_status_panel .space_between span, .align_left-ordered_columns .processbar-text{
  color: #b3b3b3;
}
.output-selector{
  font-size: 14px;
}
.circular-bar-container{
  width: 40px;
  height: 40px;
  margin: 2px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 10px;
  background-color: rgba(255,255,255,0.3);
}
/* .vue3-circular-progressbar{
  margin-left: 10%;
}
.vue3-circular-progressbar svg{
  margin-bottom: 27%;
} */
.terminal-container .vue3-circular-progressbar{
    top: -11%
}
.progress{
  height: 5px !important;
}
</style>
