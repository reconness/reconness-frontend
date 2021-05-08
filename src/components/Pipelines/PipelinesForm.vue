<template>
  <div class="row">
    <div class="col-12">
      <div class="modal fade" id="pipelinesModalForm"  tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-lg modal-dialog-top modal-dialog-centered" role="document" :class="{'modal-xl': thirdStep}">>
          <div class="modal-content agent-containers">
            <div class="modal-header"  :class="{'border-0' : thirdStep}">
              <blockquote class="blockquote-style">
                <h5 v-show="this.step === 1 && this.routeName === 'Pipelines'">Select some agents to create your Pipeline</h5>
                <h5 v-show="this.step === 1 && this.routeName === 'PipelineDetail'">Add agents to pipeline</h5>
                <h5 v-show="this.step === 2">Select one to start your pipeline</h5>
                <h5 v-show="this.step === 3">Pipeline Settings</h5>
              </blockquote>
              <div class="card-tools" v-show="this.step === 1">
                <a class="domain-names-list mr-2 pr-2 border-right">Selected {{listAgents.length}}</a>
                <a v-if="listAgents.length === 0" class="domain-names-list" @click="selectedAll()" style="color: #00B1FF">Selected All</a>
                <a v-else class="domain-names-list" @click="deSelectedAll()" style="color: #00B1FF">Deselected All</a>
              </div>
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
                <div class="col-12" v-show="this.step === 3">
                  <PipelinesFormStepSettings @pipelineSettingsDone="updatePipelineSettings"/>
                </div>
              </div>
            </div>
            <div class="modal-footer" :class="{'border-0' : thirdStep}">
               <button v-if="this.step !== 3 && this.routeName === 'Pipelines'" @click="nextPage()" :class="{'isLinkDisabled' : statusButton}" style="color: #00B1FF;" class="agent-border btn create-agent-buttons-main-action">NEXT</button>
               <button v-else @click="save(this.routeName)" :class="{'isLinkDisabled' : statusButton}" style="color: #00B1FF;" class="agent-border btn create-agent-buttons-main-action" data-dismiss="modal" :disabled="!pipelineFormIsValid">DONE</button>
               <button @click="cancelAll()" style="color: #FF4545;" type="button" class="agent-border btn create-agent-buttons-main-action" data-dismiss="modal">CANCEL</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AgentForm/>
  </div>
</template>

<script>
import jQuery from 'jquery'
import { mapState, mapGetters, mapMutations } from 'vuex'
import AccountCogIco from '@/components/Icons/AccountCogIco.vue'
import PipelinesFormStepSettings from '@/components/Pipelines/PipelinesFormStepSettings.vue'
import AgentForm from '@/components/AgentForm.vue'
export default {
  name: 'PipelinesForm',
  data: function () {
    return {
      listAgents: [],
      step: 1,
      agentStartingPoint: 0,
      settings_data: null
    }
  },
  props: {
    routeName: String
  },
  computed: {
    ...mapState(['agentListStore']),
    ...mapGetters('pipelines', ['getPipelineById']),
    ...mapGetters(['getAgentById']),
    iterList () {
      if (this.step === 1) {
        return this.agentListStore
      }
      if (this.step === 2) {
        const list = this.agentListStore.filter(item2 => ((this.listAgents).includes(item2.id)))
        for (const item of list) {
          document.getElementById('agent' + item.id).classList.remove('style-border-item')
        }
        return list
      }
      return 0
    },
    statusButton () {
      if (this.listAgents.length === 0 && this.step === 1) {
        return true
      } else
      if (this.agentStartingPoint === 0 && this.step === 2) {
        return true
      } else {
        return false
      }
    },
    thirdStep () {
      return this.step === 3
    },
    pipelineFormIsValid () {
      if (this.settings_data && ((this.settings_data.locations.length === 1 && this.settings_data.locations[0].entity.name === undefined) ||
        (this.settings_data.locations.length === 1 && this.$validateIsBlank(this.settings_data.locations[0].entity.name)))) {
        return false
      }
      return true
    }
  },
  components: {
    AccountCogIco,
    PipelinesFormStepSettings,
    AgentForm
  },
  methods: {
    ...mapMutations('pipelines', ['addPipeline']),
    selectAndDeselectedItem (itemID) {
      if (this.step === 1) {
        if (this.listAgents.includes(itemID)) {
          const index = this.listAgents.indexOf(itemID)
          if (index !== -1) {
            this.listAgents.splice(index, 1)
          }
        } else {
          this.listAgents.push(itemID)
        }
        document.getElementById('agent' + itemID).classList.toggle('style-border-item')
      }
      if (this.step === 2) {
        if (this.agentStartingPoint === itemID) {
          this.agentStartingPoint = 0
          document.getElementById('agent' + itemID).classList.toggle('style-border-item')
        } else
        if (this.agentStartingPoint !== itemID && this.agentStartingPoint === 0) {
          this.agentStartingPoint = itemID
          document.getElementById('agent' + itemID).classList.toggle('style-border-item')
        }
      }
    },
    deSelectedAll () {
      this.listAgents = []
      for (const item of this.agentListStore) {
        if (document.getElementById('agent' + item.id)) {
          document.getElementById('agent' + item.id).classList.remove('style-border-item')
        }
      }
    },
    selectedAll () {
      for (const item of this.agentListStore) {
        document.getElementById('agent' + item.id).classList.add('style-border-item')
        this.listAgents.push(item.id)
      }
    },
    nextPage () {
      switch (this.step) {
        case 1:
          this.step = 2
          break
        case 2:
          this.step = 3
          break
        case 3:
          this.step = 1
          this.$router.push({ name: 'PipelineDetail', params: { id: 1 } })
          jQuery('#pipelinesModalForm').modal('hide')
          break
      }
    },
    cancelAll () {
      if (this.step === 1) {
        this.deSelectedAll()
        this.step = 1
      }
      if (this.step === 2 && this.agentStartingPoint !== 0) {
        document.getElementById('agent' + this.agentStartingPoint).classList.remove('style-border-item')
      }
      if (this.step === 3 || this.step === 2) {
        this.listAgents = []
        this.agentStartingPoint = 0
        this.step = 1
      }
    },
    save () {
      if (this.routeName === 'PipelineDetail') {
        const Pipeline = this.getPipelineById(parseInt(this.$route.params.id))
        for (const index of this.listAgents) {
          Pipeline.agent.push(this.$store.getters.getAgentById(parseInt(index)))
        }
      }
      const fullDataAgents = []
      let agentData = null
      this.listAgents.forEach(idAgent => {
        agentData = this.getAgentById(parseInt(idAgent))
        fullDataAgents.push(agentData)
      })
      const pipelineEntity = {
        name: '',
        date: new Date().toLocaleDateString('es-Es'),
        statusRun: false,
        agent: fullDataAgents
      }
      this.addPipeline(pipelineEntity)

      jQuery('#pipelinesModalForm').modal('hide')

      this.deSelectedAll()
      this.step = 1
    },
    setDetailsLink (e) {
      const selectedAgentId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('setIdAgent', selectedAgentId)
      this.$store.commit('setDetailsLinks', true)
    },
    updatePipelineSettings (e) {
      this.settings_data = e
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
