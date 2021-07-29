<template>
  <div class="row">
    <div class="col-12">
      <div class="modal fade" id="pipelinesModalForm"  tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-lg modal-dialog-top modal-dialog-centered" role="document" >
          <div class="modal-content agent-containers">
            <div class="modal-header">
              <blockquote class="blockquote-style">
                <h5 >Select one agent to insert into your pipeline workflow</h5>
              </blockquote>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-12 col-lg-3 p-3" v-for="item of iterList" :key="item.id" v-show="this.step !== 3">
                   <div class="info-box float-left  abs-center"   :style ="{background:item.background}" @click="selectAndDeselectedItem(item.id)" :id="'agent' + item.id">
                      <div class="info-box-content mt-2 mb-2 pl-0 pr-1 border-right">
                        <span class="info-box-text  text-custom agent-mini-agent-name">{{item.name }}</span>
                        <a class="active agent-mini-agent-details agent-mini-color-gray" @click="setDetailsLink" href="#" data-toggle="modal" :data-id="item.id" data-target="#exampleModalCenter" data-backdrop="false"><small class="small-text cursor-pointer">Details</small></a>
                      </div>
                      <span class="number float-right ml-2 abs-center"  :style ="{background:item.background}" >
                      <div><AccountCogIco/></div>
                      </span>
                    </div>
                </div>
              </div>
            </div>
            <div class="modal-footer" >
               <button @click="save(this.routeName)" :class="{'isLinkDisabled' : statusButton}" style="color: #00B1FF;" class="agent-border btn create-agent-buttons-main-action" data-dismiss="modal">DONE</button>
               <button @click="cancel()" style="color: #FF4545;" type="button" class="agent-border btn create-agent-buttons-main-action" data-dismiss="modal">CANCEL</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AgentForm :readOnly="true"/>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import AccountCogIco from '@/components/Icons/AccountCogIco.vue'
import AgentForm from '@/components/Agent/AgentForm.vue'
export default {
  name: 'AgentListWorkflow',
  data: function () {
    return {
      step: 1,
      agentStartingPoint: 0,
      settings_data: null,
      AgentStarting: {
        name: '',
        background: '',
        id: -1,
        agentBranch: []
      }
    }
  },
  props: {
    routeName: String
  },
  computed: {
    ...mapState(['agentListStore', 'autoId']),
    ...mapState('pipelines', ['autoId', 'branchFather', 'addStartingAgent']),
    ...mapGetters('pipelines', ['getPipelineById']),
    ...mapGetters(['getAgentById']),
    iterList () {
      if (this.addStartingAgent) {
        return this.agentListStore.filter(item => item.type === this.getPipelineById(parseInt(this.$route.params.id)).type)
      } else {
        return this.agentListStore
      }
    },
    statusButton () {
      if (this.agentStartingPoint === 0) {
        return true
      } else {
        return false
      }
    }
  },
  components: {
    AccountCogIco,
    AgentForm
  },
  methods: {
    ...mapMutations('pipelines', ['addPipeline']),
    selectAndDeselectedItem (itemID) {
      if (this.agentStartingPoint === itemID) {
        this.agentStartingPoint = 0
        document.getElementById('agent' + itemID).classList.toggle('style-border-item')
      } else
      if (this.agentStartingPoint !== itemID && this.agentStartingPoint === 0) {
        this.agentStartingPoint = itemID
        document.getElementById('agent' + itemID).classList.toggle('style-border-item')
      }
    },
    cancel () {
      if (this.agentStartingPoint !== 0) {
        document.getElementById('agent' + this.agentStartingPoint).classList.remove('style-border-item')
        this.agentStartingPoint = 0
      }
    },
    save () {
      const Pipeline = this.getPipelineById(parseInt(this.$route.params.id))
      const Agent = this.$store.getters.getAgentById(this.agentStartingPoint)
      Pipeline.agent.splice(Pipeline.agent.length - 1, 1)
      if (this.branchFather === -1) {
        if (Pipeline.startingAgent === -1 && this.addStartingAgent) {
          Pipeline.startingAgent = Agent.id
          Pipeline.agent.unshift({ name: Agent.name, background: Agent.background, id: Agent.id, agentBranch: [] })
          this.$store.commit('pipelines/changeValueStartPoint', false)
        } else {
          Pipeline.agent.push({ name: Agent.name, background: Agent.background, id: Agent.id, agentBranch: [] })
        }
      } else {
        Pipeline.agent[this.branchFather].agentBranch.push({ name: Agent.name, background: Agent.background, id: Agent.id })
      }
      this.$store.commit('pipelines/changeIsBranchFather', -1)
      document.getElementById('agent' + this.agentStartingPoint).classList.remove('style-border-item')
      this.agentStartingPoint = 0
    },
    setDetailsLink (e) {
      const selectedAgentId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('setIdAgent', selectedAgentId)
      this.$store.commit('setDetailsLinks', true)
    }
  }
}
</script>
<style scoped>
.text-custom{
    color: #fff;
    font-size: 15px;
}
.small-text{
  color:rgb(228, 229, 230);
  font-size: 80%;
  opacity: 0.8;
}
.info-box{
 border-radius: 18px;
 box-shadow: 13px 19px 41px #d6d6d6;
 opacity: 1;
}
.info-box span svg {
    fill: #ffffff;
    width: 25px;
    height: 25px;
}
.blockquote-style {
  background: none;
  border-left: 4px solid;
  margin:0;
  opacity: 1;
  padding: 0px;
  padding-left: .5rem !important;
  color: #00B1FF;
}
blockquote > h5{
    color: #000;
    margin-bottom: auto;
    opacity: 1;
}
.style-border-item{
    border: 3px solid #fff;
}
.isLinkDisabled {
  color: currentColor;
  pointer-events: none;
  opacity: 0.5 !important;
  cursor: not-allowed;
}
.modal-header{
  border-bottom: 1px solid #f1f3f5;
  opacity: 1;
}
.modal-footer{
  border-top: 1px solid #f1f3f5;
  opacity: 1;
}
.card-tools > a{
  font-size: 14px;
  opacity: 1;
}
.card-tools .border-right{
  border-right: 1px solid #f1f3f5!important;
}
.info-box {
transition: all .25s ease;
width:100%;
}
.info-box:hover {
-webkit-transform:scale(1.25);
-moz-transform:scale(1.25);
-ms-transform:scale(1.25);
-o-transform:scale(1.25);
transform:scale(1.05);
transition: all .25s ease;
}
.agent-mini-agent-details{
  width: fit-content;
}
</style>
