<template>
  <div class="row force-scroll mt-4">
    <div v-for="(fatherAgent,index) of associatedAgents" :key="fatherAgent.id" class="col-5 col-lg-4 col-xl-3 position-relative"
      :class="{'p-0': true}">
      <div :class="{'invisible': this.$isObjectEmpty(fatherAgent)}">
        <div class="execution-area-divider position-relative info-box-background float-left w-65">
        </div>
        <div :class="{ 'invisible': isNextElementLastItem(index)}"
          class="mt-3 margin-center execarea-borderline-colorless abs-center border-top black-text w-35 float-left"> </div>
          <div v-if="index !== associatedAgents.length" :class="{ 'invisible': isNextElementLastItem(index) }" class="mt-3 black-circle">  </div>
          <div>
          <div  class="workflow-tools info-box invisible">
            <div class="info-box-content">
              <span data-toggle="modal" data-target="#confirmation-modal" :class="{'disabled' : (this.AgentsPipelineList).length === 1}" class="cursor-pointer material-icons red-text" @click="this.$store.commit('pipelines/changeValueToDelete', {idFather: fatherAgent.id, idSon: -1})"><a>cancel</a></span>
              <span data-toggle="modal" data-target="#pipelinesModalForm" @click="this.$store.commit('pipelines/changeIsBranchFather', -1)" class="blue-text cursor-pointer material-icons">add_circle</span>
              <span class="material-icons cursor-pointer" @click="onEdit" data-toggle="modal" data-target="#agentConfiguration" :data-id="fatherAgent.id">settings</span>
            </div>
          </div>
          <button :id="'b' + index"  data-toggle="modal" data-target="#pipelinesModalForm"
                      class="blue-text invisible  add-border btn create-agent-buttons-main-action"
                      data-dismiss="modal"  @click="this.$store.commit('pipelines/changeIsBranchFather', index)">Add +
                    </button>
        </div>
        <PipelineAgentMainFront :index="index" :fatherAgent="fatherAgent" :pipeline="pipeline" @agenttimechange="onAgentTimeChange"/>
        <div>
          <div>
          <div class="pipeline-run-line" v-if="this.getAgentBranch(index).length !== 0"></div>
            <div  v-for="(sonAgent, sonAgentIndex) of this.getAgentBranch(index-1)"  :id="'branch' + sonAgentIndex" :key="sonAgent.id" class= "agent-branch col-lg-12 col-xl-6 float-left p-0 position-relative">
              <div class="info-box-background float-left w-75 position-relative execution-area-divider"></div>
                <div :class="{'invisible': sonAgentIndex === this.getAgentBranch(index-1).length}" class="mt-3 w-25 margin-center abs-center border-top black-text execarea-borderline-colorless float-left"> </div>
                  <div v-if="sonAgentIndex !== this.getAgentBranch(index-1).length"  class="mt-3 black-circle">  </div>
                      <PipelineAgentSecondaryFront :index="sonAgentIndex" :sonAgent="sonAgent" :pipeline="pipeline"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
                  </div>
</template>
<script>
import PipelineAgentMainFront from '@/components/Pipelines/PipelineAgentMainFront.vue'
import PipelineAgentSecondaryFront from '@/components/Pipelines/PipelineAgentSecondaryFront.vue'
export default {
  name: 'ExecutionAreaPipelineAgent',
  components: {
    PipelineAgentMainFront,
    PipelineAgentSecondaryFront
  },
  props: {
    AgentsPipelineList: Array,
    startingAgentId: Number,
    startMainProcess: Boolean,
    pipeline: Object
  },
  data: function () {
    return {
      indexRunningAgent: 0,
      indexRunningSecondaryAgent: 0,
      isRunningSecondaryProcess: false
    }
  },
  computed: {
    associatedAgents () {
      let agentPipelineList = []
      agentPipelineList = this.AgentsPipelineList
      return agentPipelineList
    }
  },
  emits: ['agenttimechange'],
  watch: {
    startMainProcess: function (value) {
      if (value) {
        this.indexRunningSecondaryAgent = 0
        this.indexRunningAgent = 0
      }
    }
  },
  created () {
    if (this.associatedAgents.length > 1 && this.associatedAgents[this.associatedAgents.length - 1]) {
      if (this.$isObjectEmpty(this.associatedAgents[this.associatedAgents.length - 1])) {
        this.associatedAgents.splice(this.associatedAgents.length - 1, 1)
      }
    }
  },
  methods: {
    getAgentBranch (indexValue) {
      const windowReziseWidth = window.outerWidth
      if (indexValue !== -1) {
        return []
      }
      if (this.isAgentOrAgentSongsUndefined(indexValue)) {
        return []
      }
      if (windowReziseWidth < 1200) {
        return (this.AgentsPipelineList[indexValue].agentBranch).slice(0, 1)
      }
      return (this.AgentsPipelineList[indexValue].agentBranch).slice(0, 2)
    },
    processSecondaryAgentExecution () {
      this.indexRunningSecondaryAgent++
      if (this.indexRunningSecondaryAgent >= this.getAgentBranch(this.indexRunningAgent).length) {
        this.indexRunningSecondaryAgent = 0
      }
    },
    secondaryProcessAgentsExecution (result) {
      this.isRunningSecondaryProcess = result
    },
    isNextElementLastItem (arrayIndex) {
      return arrayIndex + 1 === this.associatedAgents.length
    },
    onAgentTimeChange (agentTime) {
      this.$emit('agenttimechange', agentTime)
    },
    isAgentOrAgentSongsUndefined (pipelineIndex) {
      return (this.AgentsPipelineList[pipelineIndex] === undefined || this.AgentsPipelineList[pipelineIndex].agentBranch === undefined)
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
.output-container{
  font-size: 13px;
}
</style>
