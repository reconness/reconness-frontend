<template>
    <div class="info-box float-left abs-center w-65"
          :style ="{background:fatherAgent.background}" style="position: absolute; left: 7px; top: -4px;">
          <div class="row w-100">
            <div class="info-box-content border-right w-50">
              <span class="white-text">{{fatherAgent.name }}</span>
              <div class="pipeline-run-play-container">
                <span class="mr-2 white-text">{{time}}</span>
                <MotionPlayOutlineIco />
              </div> <!-- /.pipeline-run-play-container -->
              <div class="output-container">
                <span class="mr-2 cursor-pointer white-text" data-toggle="modal" data-target="#agentExecutionModalForm" :data-id="fatherAgent.id" :data-name="fatherAgent.name" @click="setAgentFromTerminal(fatherAgent)">Terminal</span><span class="pl-2 border-left cursor-pointer white-text" data-toggle="modal" data-target="#agentExecutionModalForm" :data-id="fatherAgent.id" :data-name="fatherAgent.name" @click="setAgentFromLogs(fatherAgent)">Logs</span>
              </div>
            </div> <!-- /.info-box-content border-right w-50 -->
            <span class="info-box-icon process_status_panel container-container-circular-bar">
              <span class="border container-circular-bar">
                <div class="circular-bar-container border pipeline-run-execution">
                  <CircleProgress v-if="!isDone" :percent="progressValue" :size="30" :border-width="3" :border-bg-width="3" empty-color="#ff959e" fill-color="#ffffff"/>
                  <span style="opacity:0.2" v-else class="material-icons white-text">done</span>
                </div>
              </span>
            </span> <!-- ./ info-box-icon process_status_panel container-container-circular-bar -->
          </div> <!-- ./ row w-100 -->
        </div> <!-- ./info-box float-left abs-center w-65 -->
</template>
<script>
import MotionPlayOutlineIco from '@/components/Icons/MotionPlayOutlineIco.vue'
import CircleProgress from 'vue3-circle-progress'
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'PipelineAgentMainFront',
  data: function () {
    return {
      progressValue: 0,
      time: '00:00:00',
      now: 0,
      timer: null,
      isDone: false
    }
  },
  props: {
    fatherAgent: Object,
    index: {
      type: Number,
      default: -1
    },
    pipeline: Object
  },
  components: {
    MotionPlayOutlineIco,
    CircleProgress
  },
  computed: {
    ...mapState('pipelines', ['agentParentRunningIndex', 'agentChildRunningIndex', 'numberAgentsProcessing']),
    ...mapGetters('pipelines', ['getPipelineById'])
  },
  methods: {
    ...mapMutations('pipelines', ['setPipelineAgentStatus', 'setAgent', 'setPipelineAgentParentStatusByIndex', 'setPipelineAgentChildStatusByIndex', 'setPipelineAgentParentIndex', 'setPipelineAgentChildIndex', 'setPipelineStatus', 'setIsAgentInfoOpenedForTerminal', 'updateStatusAllChildren']),
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
    setAgentFromTerminal (agent) {
      this.setAgent(agent)
      this.setIsAgentInfoOpenedForTerminal(true)
    },
    setAgentFromLogs (agent) {
      this.setAgent(agent)
      this.setIsAgentInfoOpenedForTerminal(false)
    }
  },
  watch: {
    agentParentRunningIndex: function (indexParentAgent) {
      if (this.pipeline.statusRun === this.$entityStatus.RUNNING) {
        if (this.index === this.agentParentRunningIndex && this.index < (this.pipeline.agent.length - 1)) {
          this.setPipelineAgentParentStatusByIndex({
            idPipeline: this.pipeline.id,
            index: this.index,
            status: this.$entityStatus.RUNNING
          })
          this.playClock()
          if (this.fatherAgent.agentBranch && this.fatherAgent.agentBranch.length > 0) {
            this.updateStatusAllChildren({ idPipeline: this.pipeline.id, idAgent: this.fatherAgent.id })
          } else {
            const self = this
            setTimeout(
              function () {
                self.setPipelineAgentParentStatusByIndex({
                  idPipeline: self.pipeline.id,
                  index: self.index,
                  status: self.$entityStatus.FINISHED
                })
                if (self.pipeline.statusRun === self.$entityStatus.RUNNING) {
                  self.setPipelineAgentParentIndex(self.agentParentRunningIndex + 1)
                }
                self.stopClock()
                self.isDone = true
                if (self.index === (self.pipeline.agent.length - 2)) {
                  self.setPipelineStatus({
                    idPipeline: self.pipeline.id,
                    status: self.$entityStatus.FINISHED
                  })
                }
              },
              5000
            )
          }
        }
      }
    },
    numberAgentsProcessing: function (value) {
      if (this.index === this.agentParentRunningIndex && this.index < (this.pipeline.agent.length - 1)) {
        if (value === this.fatherAgent.agentBranch.length) {
          this.stopClock()
          this.isDone = true
          this.setPipelineAgentParentIndex(this.agentParentRunningIndex + 1)
          if (this.index === (this.pipeline.agent.length - 2)) {
            this.setPipelineStatus({
              idPipeline: this.pipeline.id,
              status: this.$entityStatus.FINISHED
            })
          }
        }
      }
    }
  }
}
</script>
<style scoped>
.info-box{
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 18px;
}
.number {
    display: inline-table;
    border-radius: 8px;
}
.info-box-background{
    position: absolute;
    background: transparent;
    border: 1px solid;
    border-radius: 18px;
    opacity: 1;
    height: 85px;
}
.border-right{
  opacity: 1;
}
.info-box span svg {
    fill: #ffffff;
    width: 18px;
    height: 18px;
}
.change-font-size{
    width: 25px!important;
    height: 25px!important;
}
.number div{
    background-color: rgba(255, 255, 255, 0.15);
    padding: 1px 4px;
    border-radius: 4px;
    color: #ffffff;
    font-size: 12px;
    opacity: 1;
    margin: 3px;
}

@media (min-width: 1200px){
.text-custom{
    color: #fff;
    font-size: 12px;
}
.small-text{
  font-size: 70%;
  color:rgb(228, 229, 230);
}
.number div {
    background-color: rgba(255, 255, 255, 0.15);
    padding: 1px 1px;
    border-radius: 4px;
    color: #ffffff;
    font-size: 10px;
    opacity: 1;
    margin: 0px;
}
}
.w-85 {
    width: 85%!important;
}
.w-15 {
    width: 15%!important;
}
.black-circle{
    height: 8px;
    width: 8px;
    position: absolute;
    left: 98%;
    background: black;
    border-color: black;
    border-radius: 100%;
    margin-top: 2.3rem!important;
    z-index: 10;
}
.text-custom{
    color: #fff;
    font-size: 16px;
}
.small-text{
  color:rgb(228, 229, 230);
}
.margin-center{
  margin-top: 2.5rem!important;
}
.workflow-tools{
  background-color: #fffc;
  width: 1em;
  top: -2.4em;
  padding: 0px;
  left: 1.1em;
  opacity: .5;
}
.workflow-tools span{
 font-size: .9em;
 display: grid;
 padding: 0px;
margin-top: .5em;
justify-content:center;
}
.workflow-tools .info-box-content{
  padding: 0px;
  justify-content: initial;
}
.workflow-tools{
transition: all .25s ease;
margin-bottom: -30px;
}
.workflow-tools:hover {
-webkit-transform:scale(1.25);
-moz-transform:scale(1.25);
-ms-transform:scale(1.25);
-o-transform:scale(1.25);
transform:scale(1.05);
transition: all .25s ease;
opacity: 5;
}
.add-border{
border: 1px solid #E3E3E3;
border-radius: 12px;
padding: 5px 8px;
margin-top: 5px;
margin-bottom: 15px;
}

div.pipeline-run-line {
    position: relative;
    z-index: 1;
    left: 60%;
    width: 54%;
    height: 1px;
    top: -2em;
    background-color: #000;
    transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}

@media (min-width: 768px) {
div.pipeline-run-line {
    position: relative;
    z-index: 1;
    left: 59%;
    width: 47%;
    height: 1px;
    top: -1em;
    background-color: #000;
    transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}
}
@media (min-width: 1261px) and (max-width: 1263px) {
div.pipeline-run-line {
    position: relative;
    z-index: 1;
    left: 70%;
    width: 40%;
    height: 1px;
    top: -2em;
    background-color: #000;
    transform: rotate(45deg);
    -ms-transform: rotate(45deg); /* IE 9 */
    -webkit-transform: rotate(45deg);  /* Safari and Chrome */
}
}
@media (min-width: 1263px) and (max-width: 1440px) {
div.pipeline-run-line {
    position: relative;
    z-index: 1;
    left:61%;
    width: 43%;
    height: 1px;
    top: -1em;
    background-color: #000;
    transform: rotate(36deg);
    -ms-transform: rotate(36deg); /* IE 9 */
    -webkit-transform: rotate(36deg);  /* Safari and Chrome */
}
}

@media (min-width: 1440px) and (max-width: 2560px) {
div.pipeline-run-line {
    position: relative;
    z-index: 1;
    left: 59%;
    width: 48%;
    height: 1px;
    top: -1.3em;
    background-color: #000;
    transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}
}
@media (min-width: 2560px) {
div.pipeline-run-line {
    position: relative;
    z-index: 1;
    left: 62%;
    width: 39%;
    height: 1px;
    top: -1.3em;
    background-color: #000;
    transform: rotate(45deg);
    -ms-transform: rotate(15deg);
    -webkit-transform: rotate(15deg);
}
}

.disabled{
   color: currentColor;
   pointer-events: none;
   opacity: 0.5 !important;
   cursor: not-allowed;
}
.force-scroll{
  overflow-x: scroll!important;
  flex-wrap: inherit;
  padding-bottom: 5em;
  padding-top: 2em;
}
.w-65{
  width: 65% !important;
}
.w-35{
  width: 35% !important;
}
.w-131{
  width: 131% !important;
}
.container-circular-bar{
  width: 3rem;
  height: 3rem;
  border: 2px solid #dee2e6 !important;
  border-radius: 10px;
}
.circular-bar-container{
  width: 40px;
  height: 40px;
  margin: 2px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 10px;
  background-color: rgba(255,255,255,0.3);
}
.vue3-circular-progressbar{
  margin-left: 10%;
}
/* .vue3-circular-progressbar svg{
  margin-bottom: 27%;
} */
.output-container{
  font-size: 13px;
}
</style>
