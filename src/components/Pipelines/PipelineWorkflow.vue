<template>
<div>
<div class="row" :class="{'force-scroll': this.$route.name === 'PipelineDetail'}">
    <div v-if="this.$route.name === 'PipelineDetail' &&
    (Object.keys(this.AgentsPipelineList).length === 0 ||  this.AgentsPipelineList[0].id !== this.startingAgentId)" class="col-3 p-0">
                  <div class="info-box-background w-85 float-left abs-center" style="position: relative; left: 0px; top: -1px;">
                    <span data-toggle="modal" data-target="#pipelinesModalForm"
                    @click="this.$store.commit('pipelines/changeValueStartPoint', true)"
                    class="cursor-pointer"> Add starting agent</span>
                  </div>
                  <div  :class="{'invisible': Object.keys(this.AgentsPipelineList).length === 0}"  class="mt-3 margin-center abs-center border-top w-15"  style="color:black!important;border: 1px solid; float:left"> </div>
                  <div  :class="{'invisible': Object.keys(this.AgentsPipelineList).length === 0}" class="mt-3 black-circle">  </div>
    </div>

    <div v-for="(fatherAgent,index) of associatedAgents" :key="fatherAgent.id"
                  :class="{'col-4' : this.$route.name === 'Pipelines', 'col-3': this.$route.name === 'PipelineDetail', 'p-0': true}"
                  style="position: relative;">
                  <div :class="{'invisible': this.$isObjectEmpty(fatherAgent)}" @mouseenter="showAdd( index )" @mouseleave="hideAdd(index)">
                    <div class="info-box-background float-left"
                    :class="{'w-85' : this.$route.name === 'Pipelines', 'w-75': this.$route.name === 'PipelineDetail'}"
                    style="position: relative; left: 0px; top: -1px;"></div>
                    <div
                    :class="{ 'invisible': isLastItemOnAgentsListByIndex(index) || isNextItemTheLastInAgentsListByIndex(index), 'w-15' : this.$route.name === 'Pipelines', 'w-25': this.$route.name === 'PipelineDetail'}"
                    class="mt-3 margin-center abs-center border-top"
                    style="color:black!important;border: 1px solid; float:left"> </div>
                    <div v-if="!isLastItemOnAgentsListByIndex(index)" :class="{ 'invisible': isLastItemOnAgentsListByIndex(index) || isNextItemTheLastInAgentsListByIndex(index) }" class="mt-3 black-circle">  </div>

                  <div v-if="this.$route.name === 'PipelineDetail'">
                    <div  class="workflow-tools info-box">
                     <div class="info-box-content">
                      <span data-toggle="modal" data-target="#confirmation-modal" :class="{'disabled' : (this.AgentsPipelineList).length === 1}" class="cursor-pointer material-icons" style="color: #ff4545 " @click="this.$store.commit('pipelines/changeValueToDelete', {idFather: fatherAgent.id, idSon: -1})"><a>cancel</a></span>
                      <span data-toggle="modal" data-target="#pipelinesModalForm" @click="this.$store.commit('pipelines/changeIsBranchFather', -1)" style="color: #00B1FF" class="cursor-pointer material-icons">add_circle</span>
                      <span class="material-icons cursor-pointer" @click="onEdit" data-toggle="modal" data-target="#agentConfiguration" :data-id="fatherAgent.id">settings</span>
                    </div>
                    </div>
                      <button :id="'b' + index"  data-toggle="modal" data-target="#pipelinesModalForm"
                      style="color: #00B1FF;" class="invisible  add-border btn create-agent-buttons-main-action"
                      data-dismiss="modal"  @click="this.$store.commit('pipelines/changeIsBranchFather', index)">Add +
                    </button>
                  </div>

                    <div class="info-box float-left abs-center" :class="{'w-85' : this.$route.name === 'Pipelines', 'w-75': this.$route.name === 'PipelineDetail'}"
                    :style ="{background:fatherAgent.background}" style="position: absolute; left: 7px; top: -4px;">
                      <div class="info-box-content mt-2 mb-2 pl-0 pr-1 border-right">
                        <span class="info-box-text  text-custom agent-mini-agent-name">{{fatherAgent.name }}</span>
                        <a href="#" @click="setDetailsLink" data-toggle="modal" :data-id="fatherAgent.id" data-target="#exampleModalCenter" data-backdrop="false"><small class="small-text">Details</small></a>
                      </div>
                      <span class="number float-right ml-1 abs-center"  :style ="{background:fatherAgent.background}" >
                      <div><AccountCogIco :class="{'change-font-size': this.$route.name === 'PipelineDetail'}"/></div>
                      </span>
                    </div>
                  </div>

            <div v-if="this.$route.name === 'PipelineDetail'">
              <div class="line" v-if="this.getAgentBranch(index).length !== 0"></div>
                <div  v-for="(sonAgent, sonAgentIndex) of this.getAgentBranch(index-1)"  :id="'branch' + sonAgentIndex" :key="sonAgent.id" class= "agent-branch col-lg-12 col-xl-6 float-left p-0" style="position: relative;" >
                  <div class="info-box-background float-left w-75" style="position: relative; left: 0px; top: -1px;"></div>
                     <div :class="{'invisible': sonAgentIndex === this.getAgentBranch(index-1).length}" class="mt-3 w-25 margin-center abs-center border-top" style="color:black!important;border: 1px solid; float:left"> </div>
                    <div v-if="sonAgentIndex !== this.getAgentBranch(index-1).length"  class="mt-3 black-circle">  </div>

                    <div class="info-box float-left abs-center w-75" :style ="{background:sonAgent.background}" style="position: relative; left: 7px; top: -89px;">
                      <div class="info-box-content mt-2 mb-2 pl-0 pr-1 border-right">
                        <span class="info-box-text  text-custom agent-mini-agent-name">{{sonAgent.name }}</span>
                        <a href="#" @click="setDetailsLink" data-toggle="modal" :data-id="sonAgent.id" data-target="#exampleModalCenter" data-backdrop="false"><small class="small-text">Details</small></a>
                      </div>
                      <span class="number float-right ml-1 abs-center"  :style ="{background:sonAgent.background}" >
                      <div><AccountCogIco :class="{'change-font-size': this.$route.name === 'PipelineDetail'}"/></div>
                      </span>
                    </div>
                    <div  class="workflow-tools info-box">
                     <div class="info-box-content">
                      <span data-toggle="modal" data-target="#confirmation-modal" class="cursor-pointer material-icons" style="color: #ff4545 " @click="this.$store.commit('pipelines/changeValueToDelete', {idFather: this.AgentsPipelineList[index-1].id, idSon: sonAgent.id})">cancel</span>
                      <span data-toggle="modal" data-target="#pipelinesModalForm" @click="this.$store.commit('pipelines/changeIsBranchFather', index-1)" style="color: #00B1FF" class="cursor-pointer material-icons">add_circle</span>
                      <span class="material-icons cursor-pointer"  data-toggle="modal" data-target="#agentConfiguration" :data-id="sonAgent.id" @click="onEdit">settings</span>
                    </div>
                    </div>
                    </div>
                    </div>
                  </div>
</div>
                  <ConfirmationAgentPipeline/>
                  <AgentConfiguration />
                </div>
</template>
<script>
import AccountCogIco from '@/components/Icons/AccountCogIco.vue'
import ConfirmationAgentPipeline from '@/components/Pipelines/ConfirmationAgentPipeline.vue'
import AgentConfiguration from '@/components/Pipelines/AgentConfiguration'

export default {
  name: 'PipelineWorkflow',
  components: {
    AccountCogIco,
    ConfirmationAgentPipeline,
    AgentConfiguration
  },
  props: {
    AgentsPipelineList: Object,
    startingAgentId: Number
  },
  data: function () {
    return {
      classResize: ''
    }
  },
  computed: {
    associatedAgents () {
      let agentPipelineList = []
      if (this.$route.name === 'PipelineDetail') {
        agentPipelineList = this.AgentsPipelineList
        const sizeList = agentPipelineList.length
        if (sizeList >= 1 && Object.keys(agentPipelineList[sizeList - 1]).length !== 0) {
          agentPipelineList.push({})
        }
      } else {
        agentPipelineList = this.AgentsPipelineList.slice(0, 3)
      }
      return agentPipelineList
    }
  },
  methods: {
    showAdd (selectedIndex) {
      if (this.$route.name === 'PipelineDetail') {
        document.getElementById('b' + selectedIndex).classList.remove('invisible')
        document.getElementById('b' + selectedIndex).classList.add('visible')
      }
    },
    hideAdd (selectedIndex) {
      if (this.$route.name === 'PipelineDetail') {
        document.getElementById('b' + selectedIndex).classList.remove('visible')
        document.getElementById('b' + selectedIndex).classList.add('invisible')
      }
    },
    setDetailsLink (e) {
      const selectedAgentId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('agent/setIdAgent', selectedAgentId)
      this.$store.commit('agent/setDetailsLinks', true)
    },
    resize () {
      window.onresize = function () {
        alert(window.screen.width)
      }
    },
    getAgentBranch (indexValue) {
      const windowReziseWidth = window.outerWidth
      if (indexValue !== -1 && Object.keys(this.associatedAgents[indexValue]).length !== 0) {
        if (windowReziseWidth < 1200) {
          return (this.AgentsPipelineList[indexValue].agentBranch).slice(0, 1)
        } else if (windowReziseWidth >= 1200) {
          return (this.AgentsPipelineList[indexValue].agentBranch).slice(0, 2)
        }
      }
      return []
    },
    onEdit (e) {
      const selectedAgentId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('agent/setIdAgent', selectedAgentId)
    },
    isLastItemOnAgentsListByIndex (index) {
      return index + 1 === this.associatedAgents.length
    },
    isNextItemTheLastInAgentsListByIndex (index) {
      return Object.keys(this.associatedAgents[index + 1]).length === 0
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

div.line {
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
div.line {
    position: relative;
    z-index: 1;
    left: 65%;
    width: 42%;
    height: 1px;
    top: -2em;
    background-color: #000;
    transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}
}

@media (min-width: 1261px) and (max-width: 1440px) {
div.line {
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

@media (min-width: 1440px) {
div.line {
    position: relative;
    z-index: 1;
    left: 67%;
    width: 40%;
    height: 1px;
    top: -2.3em;
    background-color: #000;
    transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
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
</style>
