<template>
  <div class="row force-scroll mt-4">
    <div v-for="(item2,index) of associatedAgents" :key="item2.id" class="col-5"
      :class="{'p-0': true}"
      style="position: relative;">
      <div :class="{'invisible': Object.keys(item2).length === 0}">
        <div class="info-box-background float-left w-65"
          style="position: relative; left: 0px; top: -1px;">
        </div>
        <div :class="{ 'invisible': index+1 === associatedAgents.length || Object.keys(associatedAgents[index+1]).length === 0}"
          class="mt-3 margin-center abs-center border-top w-35"
          style="color:black!important;border: 1px solid; float:left"> </div>
          <div v-if="index+1 !== associatedAgents.length" :class="{ 'invisible': index+1 === associatedAgents.length || Object.keys(associatedAgents[index+1]).length === 0 }" class="mt-3 black-circle">  </div>
          <div>
          <div  class="workflow-tools info-box invisible">
            <div class="info-box-content">
              <span data-toggle="modal" data-target="#confirmation-modal" :class="{'disabled' : (this.AgentsPipelineList).length === 1}" class="cursor-pointer material-icons" style="color: #ff4545 " @click="this.$store.commit('pipelines/changeValueToDelete', {idFather: item2.id, idSon: -1})"><a>cancel</a></span>
              <span data-toggle="modal" data-target="#pipelinesModalForm" @click="this.$store.commit('pipelines/changeIsBranchFather', -1)" style="color: #00B1FF" class="cursor-pointer material-icons">add_circle</span>
              <span class="material-icons cursor-pointer" @click="onEdit" data-toggle="modal" data-target="#agentConfiguration" :data-id="item2.id">settings</span>
            </div>
          </div>
          <button :id="'b' + index"  data-toggle="modal" data-target="#pipelinesModalForm"
                      style="color: #00B1FF;" class="invisible  add-border btn create-agent-buttons-main-action"
                      data-dismiss="modal"  @click="this.$store.commit('pipelines/changeIsBranchFather', index)">Add +
                    </button>
        </div>
        <!-- <PipelineAgentMainFront @startRunningSons="secondaryProcessAgentsExecution" @pipelineAgentDone="processAgentsExecution" :totalItems="AgentsPipelineList.length" :index="index" :indexRunningAgent="indexRunningAgent" :startMainProcess="startMainProcess" :item2="item2"/> -->
        <PipelineAgentMainFront :index="index" :item2="item2" :pipeline="pipeline"/>
        <div>
          <div>
          <div class="pipeline-run-line" v-if="this.getAgentBranch(index).length !== 0"></div>
            <div  v-for="(item3, index1) of this.getAgentBranch(index-1)"  :id="'branch' + index1" :key="item3.id" class= "agent-branch col-lg-12 col-xl-6 float-left p-0" style="position: relative;" >
              <div class="info-box-background float-left w-75" style="position: relative; left: 0px; top: -1px;"></div>
                <div :class="{'invisible': index1+1 === this.getAgentBranch(index-1).length}" class="mt-3 w-25 margin-center abs-center border-top" style="color:black!important;border: 1px solid; float:left"> </div>
                  <div v-if="index1+1 !== this.getAgentBranch(index-1).length"  class="mt-3 black-circle">  </div>
                      <PipelineAgentSecondaryFront :index="index1" :item3="item3" />
                      <!-- <PipelineAgentSecondaryFront :index="index1" :item3="item3" :indexParent="index-1" :totalItems="this.getAgentBranch(index-1).length" :indexRunningAgent="indexRunningSecondaryAgent" @pipelineSecondaryAgentDone="processSecondaryAgentExecution" :startSecondaryProcess="isRunningSecondaryProcess"/> -->
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
  data: function () {
    return {
      indexRunningAgent: 0,
      indexRunningSecondaryAgent: 0,
      isRunningSecondaryProcess: false
    }
  },
  props: {
    AgentsPipelineList: Array,
    startingAgentId: Number,
    startMainProcess: Boolean,
    pipeline: Object
  },
  components: {
    PipelineAgentMainFront,
    PipelineAgentSecondaryFront
  },
  watch: {
    startMainProcess: function (value) {
      if (value) {
        this.indexRunningSecondaryAgent = 0
        this.indexRunningAgent = 0
      }
    }
  },
  computed: {
    associatedAgents () {
      let agentPipelineList = []
      agentPipelineList = this.AgentsPipelineList
      const sizeList = agentPipelineList.length
      if (sizeList >= 1 && Object.keys(agentPipelineList[sizeList - 1]).length !== 0) {
        if (Object.entries(agentPipelineList[sizeList - 1]).length > 0) {
          agentPipelineList.push({})
        }
      }
      return agentPipelineList
    }
  },
  methods: {
    getAgentBranch (indexValue) {
      const windowReziseWidth = window.outerWidth
      if (indexValue !== -1 && Object.keys(this.associatedAgents[indexValue]).length !== 0) {
        if (this.AgentsPipelineList[indexValue].agentBranch) {
          if (windowReziseWidth < 1200) {
            return (this.AgentsPipelineList[indexValue].agentBranch).slice(0, 1)
          } else {
            if (windowReziseWidth >= 1200) {
              return (this.AgentsPipelineList[indexValue].agentBranch).slice(0, 2)
            }
          }
        } else {
          return []
        }
      }
      return []
    },
    processSecondaryAgentExecution () {
      this.indexRunningSecondaryAgent++
      if (this.indexRunningSecondaryAgent >= this.getAgentBranch(this.indexRunningAgent).length) {
        this.indexRunningSecondaryAgent = 0
      }
    },
    secondaryProcessAgentsExecution (result) {
      this.isRunningSecondaryProcess = result
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
