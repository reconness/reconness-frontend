<template>
<div class="row">
                  <div v-if="this.$route.name === 'PipelineDetail' && associatedAgents.length === 0" class="col-3 p-0">
                  <div class="info-box-background w-85 float-left abs-center" style="position: relative; left: 0px; top: -1px;">
                    <span data-toggle="modal" data-target="#pipelinesModalForm" class="cursor-pointer">Add starting agent</span>
                  </div>
                  </div>
                  <div v-for="(item2,index) of associatedAgents" :key="item2.id"
                  :class="{'col-4' : this.$route.name === 'Pipelines', 'col-3': this.$route.name === 'PipelineDetail', 'p-0': true}"
                  style="position: relative;">
                  <div :class="{'invisible': Object.keys(item2).length === 0}" @mouseenter="showAdd( item2.id )" @mouseleave="hideAdd( item2.id)">
                    <div class="info-box-background float-left"
                    :class="{'w-85' : this.$route.name === 'Pipelines', 'w-75': this.$route.name === 'PipelineDetail'}"
                    style="position: relative; left: 0px; top: -1px;"></div>
                    <div
                    :class="{'invisible': index+1 === associatedAgents.length || Object.keys(associatedAgents[index+1]).length === 0,'w-15' : this.$route.name === 'Pipelines', 'w-25': this.$route.name === 'PipelineDetail'}"
                    class="mt-3 margin-center abs-center border-top"
                    style="color:black!important;border: 1px solid; float:left"> </div>
                    <div v-if="index+1 !== associatedAgents.length" :class="{'invisible': index+1 === associatedAgents.length || Object.keys(associatedAgents[index+1]).length === 0}" class="mt-3 black-circle">  </div>

                  <div v-if="this.$route.name === 'PipelineDetail'">
                    <div  class="workflow-tools info-box">
                     <div class="info-box-content">
                      <span data-toggle="modal" data-target="#confirmation-modal" class="cursor-pointer material-icons" style="color: #ff4545 " @click="this.$store.commit('pipelines/changeValueToDelete', {idFather: item2.id, idSon: -1})">cancel</span>
                      <span data-toggle="modal" data-target="#pipelinesModalForm" @click="this.$store.commit('pipelines/changeIsBranchFather', -1)" style="color: #00B1FF" class="cursor-pointer material-icons">add_circle</span>
                      <span class="material-icons cursor-pointer" data-toggle="modal" data-target="#agentConfiguration">settings</span>
                    </div>
                    </div>
                      <button   :id="'b' + item2.id"  data-toggle="modal" data-target="#pipelinesModalForm"
                      style="color: #00B1FF;" class="invisible  add-border btn create-agent-buttons-main-action"
                      data-dismiss="modal"  @click="this.$store.commit('pipelines/changeIsBranchFather', index)">Add +
                    </button>
                  </div>

                    <div class="info-box float-left abs-center"
                    :class="{'w-85' : this.$route.name === 'Pipelines', 'w-75': this.$route.name === 'PipelineDetail'}"
                    :style ="{background:item2.background}" style="position: absolute; left: 7px; top: -4px;">
                      <div class="info-box-content mt-2 mb-2 pl-0 pr-1 border-right">
                        <span class="info-box-text  text-custom agent-mini-agent-name">{{item2.name }}</span>
                        <a href="#" @click="setDetailsLink" data-toggle="modal" :data-id="item2.id" data-target="#exampleModalCenter" data-backdrop="false"><small class="small-text">Details</small></a>
                      </div>
                      <span class="number float-right ml-1 abs-center"  :style ="{background:item2.background}" >
                      <div><AccountCogIco :class="{'change-font-size': this.$route.name === 'PipelineDetail'}"/></div>
                      </span>
                    </div>
                  </div>
                  <div class="line" v-if="this.getAgentBranch(index) !== undefined"></div>
                    <div v-if="this.$route.name === 'PipelineDetail'">
                      <div v-if="this.getAgentBranch(index-1) !== undefined">
                    <div class="info-box-background float-left w-75" style="position: relative; left: 0px; top: -1px;"></div>
                    <div class="info-box float-left abs-center w-75"
                    :style ="{background:this.getAgentBranch(index-1).background}" style="position: relative; left: 7px; top: -89px;">
                      <div class="info-box-content mt-2 mb-2 pl-0 pr-1 border-right">
                        <span class="info-box-text  text-custom agent-mini-agent-name">{{this.getAgentBranch(index-1).name }}</span>
                        <a href="#" @click="setDetailsLink" data-toggle="modal" :data-id="this.getAgentBranch(index-1).id" data-target="#exampleModalCenter" data-backdrop="false"><small class="small-text">Details</small></a>
                      </div>
                      <span class="number float-right ml-1 abs-center"  :style ="{background:this.getAgentBranch(index-1).background}" >
                      <div><AccountCogIco :class="{'change-font-size': this.$route.name === 'PipelineDetail'}"/></div>
                      </span>
                    </div>
                    <div  class="workflow-tools info-box" style="top:0px;">
                     <div class="info-box-content">
                      <span data-toggle="modal" data-target="#confirmation-modal" class="cursor-pointer material-icons" style="color: #ff4545 " @click="this.$store.commit('pipelines/changeValueToDelete', {idFather: this.AgentsPipelineList[index-1].id, idSon: this.getAgentBranch(index-1).id})">cancel</span>
                      <span data-toggle="modal" data-target="#pipelinesModalForm" @click="this.$store.commit('pipelines/changeIsBranchFather', -1)" style="color: #00B1FF" class="cursor-pointer material-icons">add_circle</span>
                      <span class="material-icons cursor-pointer"  data-toggle="modal" data-target="#agentConfiguration">settings</span>
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
  data: function () {
    return {
    }
  },
  components: {
    AccountCogIco,
    ConfirmationAgentPipeline,
    AgentConfiguration
  },
  props: {
    AgentsPipelineList: Object
  },
  computed: {
    associatedAgents () {
      const agentPipelineList = this.AgentsPipelineList.slice(0, 3)
      const sizeList = agentPipelineList.length
      if (sizeList >= 1 && agentPipelineList[sizeList - 1].agentBranch !== undefined && Object.keys(agentPipelineList[sizeList - 1].agentBranch).length !== 0) {
        agentPipelineList.push({})
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
      this.$store.commit('setIdAgent', selectedAgentId)
      this.$store.commit('setDetailsLinks', true)
    },
    getAgentBranch (indexValue) {
      if (indexValue !== -1) {
        const branch = this.AgentsPipelineList[indexValue].agentBranch
        if (branch !== undefined && Object.keys(branch).length !== 0) {
          return branch
        } else {
          return undefined
        }
      }
      return undefined
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
div.line
{
    position: relative;
    z-index: 1;
    left: 70%;
    width: 35%;
    height: 1px;
    top: -5%;
    background-color: #000;
    transform: rotate(45deg);
    -ms-transform: rotate(45deg); /* IE 9 */
    -webkit-transform: rotate(45deg); /* Safari and Chrome */
}
</style>
