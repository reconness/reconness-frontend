<template>
  <div class="position-absolute info-box float-left abs-center w-75 pam-container"
        :style ="{background:sonAgent.background}">
        <div class="info-box-content border-right w-75">
            <span class="white-text responsive-fontsize">{{sonAgent.name }}</span>
            <div class="pipeline-run-play-container">
            <span v-if="time !== '00:00:00'" class="mr-2 white-text responsive-fontsize">{{time}}</span>
            <span v-else class="mr-2 white-text">{{ this.$getStringTimeFormat(sonAgent.durationTime.getHours(), sonAgent.durationTime.getMinutes(), sonAgent.durationTime.getSeconds()) }}</span>
            <MotionPlayOutlineIco />
            </div>
            <div class="output-container">
            <span class="mr-2 cursor-pointer white-text responsive-fontsize" data-toggle="modal" data-target="#agentExecutionModalForm" :data-id="sonAgent.id" :data-name="sonAgent.name" @click="setAgentFromTerminal(sonAgent)">Terminal</span><span class="pl-2 border-left cursor-pointer white-text responsive-fontsize" data-toggle="modal" data-target="#agentExecutionModalForm" :data-id="sonAgent.id" :data-name="sonAgent.name" @click="setAgentFromLogs(sonAgent)">Logs</span>
            </div>
        </div><!-- /.info-box-content border-right w-50 -->
        <span class="info-box-icon process_status_panel container-container-circular-bar">
            <span class="border container-circular-bar">
            <div class="circular-bar-container border pipeline-run-execution">
                <CircleProgress v-if="sonAgent.status !== this.$entityStatus.FINISHED" :percent="progressValue" :size="30" :border-width="3" :border-bg-width="3" :empty-color="this.$getEmptyCircularProgressBarColor(sonAgent.primaryColor)" fill-color="#ffffff"/>
                <span v-else class="opacity-02 material-icons white-text">done</span>
            </div>
            </span>
        </span> <!-- /.info-box-icon process_status_panel container-container-circular-bar -->
        <div><!-- /.row w-100 -->
    </div></div>
</template>
<script>
import MotionPlayOutlineIco from '@/components/Icons/MotionPlayOutlineIco.vue'
import CircleProgress from 'vue3-circle-progress'
import { mapMutations } from 'vuex'
import { ProgressBarMixin } from '@/mixins/ProgressBarMixin'
export default {
  name: 'PipelineAgentSecondaryFront',
  components: {
    MotionPlayOutlineIco,
    CircleProgress
  },
  props: {
    sonAgent: Object,
    pipeline: Object,
    index: Number
  },
  mixins: [ProgressBarMixin],
  watch: {
    sonAgent: {
      handler: function (data) {
        if (data.status === this.$entityStatus.RUNNING) {
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
            },
            5000
          )
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations('pipelines', ['setAgent', 'setIsAgentInfoOpenedForTerminal', 'setNumberAgentsProcessing', 'setPipelineAgentParentStatusByIndex', 'setPipelineAgentParentIndex']),
    setAgentFromTerminal (agent) {
      this.setAgent(agent)
      this.setIsAgentInfoOpenedForTerminal(true)
    },
    setAgentFromLogs (agent) {
      this.setAgent(agent)
      this.setIsAgentInfoOpenedForTerminal(false)
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
@media (max-width: 1439px) {
  .responsive-fontsize{
    font-size: inherit
  }
}
@media (min-width: 1440px) and (max-width: 1940px) {
  .responsive-fontsize{
    font-size: 12px
  }
}
@media (min-width: 1941px) {
  .responsive-fontsize{
    font-size: inherit
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
.output-container{
  font-size: 13px;
}
</style>
