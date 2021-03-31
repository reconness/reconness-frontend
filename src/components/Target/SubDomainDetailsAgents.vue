<template>
<div>
    <h6 class="text-center mt-2">List of Agents</h6>
  <div class="card card-style">
    <div class="card-body">
      <div class="card card-table">
        <div class=" row mb-2"  >
          <div class="col-2 border-left-radius border-right text-light-white domain-names-list p-2" v-bind:style ="{'background':color}"> <p class="ml-2 m-0" v-on:click="orderByName()"> Name
           <i class="material-icons right float-right" v-show="active_arrow_down">keyboard_arrow_down</i>
           <i class="material-icons right float-right" v-show="active_arrow_up">keyboard_arrow_up</i></p>
          </div>
          <div class="col border-right text-light-white p-2 text-center" v-bind:style ="{'background':color}"> Categories
          </div>
         <div class="col-3 border-right text-light-white p-2 text-center domain-names-list" v-bind:style ="{'background':color}" v-on:click="orderByCalendar()"> Last Run
           <i class="material-icons right float-right" v-show="lastrun_arrow_down">keyboard_arrow_down</i>
           <i class="material-icons right float-right" v-show="lastrun_arrow_up">keyboard_arrow_up</i>
          </div>
          <div class="col-2 p-2 border-right-radius text-light-white text-center domain-names-list" v-bind:style ="{'background':color}">
           Actions</div>
        </div>
      <div class="row mb-2" v-for="item of this.listAgents" :key="item.id">
        <div class="col-2  border-left-radius border">
           <p class="m-2"> {{item.name}}</p>
        </div>
        <div class="col border-top border-bottom">
        </div>
        <div class="col-3 border-left border-top border-bottom text-center" v-if="item.lastRun !== '99/99/9999'">
          <p class="m-2">{{new Date(item.lastRun).toLocaleDateString('en-ZA')}}</p>
        </div>
        <div v-else  class="col-3 border-left border-top border-bottom text-center">
        <p class="m-2"> Never</p>
        </div>
        <div class="col-2 border border-right-radius text-center">
            <button v-if="parseInt(agentStatus.status) === parseInt(this.$agentStatus.RUNNING) && parseInt(item.id) === parseInt(agentStatus.id)" type="button" @click="selectAgent" style="color: rgb(0, 177, 255);" class="agent-border btn create-agent-buttons-main-action m-1 p-0" data-toggle="modal" data-target="#agentExecutionModalForm" :data-id="item.id" :data-name="item.name">Running...</button>
            <button v-else type="button" :disabled="parseInt(agentStatus.status) === parseInt(this.$agentStatus.RUNNING) && parseInt(item.id) !== parseInt(agentStatus.id)" @click="selectAgent" style="color: rgb(0, 177, 255);" class="agent-border btn create-agent-buttons-main-action m-1 p-0" data-toggle="modal" data-target="#agentExecutionModalForm" :data-id="item.id" :data-name="item.name">Run</button>
        </div>
        <div class="row">
          <AgentExecution :id-agent="this.selectedAgentId" :name-agent="selectedAgentName"/>
        </div>
      </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import AgentExecution from '@/components/Target/AgentExecution.vue'
export default {
  name: 'AgentListTable',
  data: function () {
    return {
      active_arrow_down: true,
      active_arrow_up: false,
      lastrun_arrow_down: true,
      lastrun_arrow_up: false,
      selectedAgentName: '',
      selectedAgentId: -1
    }
  },
  props: {
    color: String
  },
  computed: {
    ...mapGetters('target', ['getSubDomain']),
    ...mapState('target', ['agentStatus']),
    listAgents () {
      return this.getSubDomain({
        idtarget: parseInt(this.$route.params.idTarget),
        idrootdomain: parseInt(this.$route.params.id),
        idsubdomain: parseInt(this.$route.params.idsubdomain)
      }).agent
    }
  },
  methods: {
    orderByName: function () {
      if (this.active_arrow_down === true) {
        return this.orderByNameDesc()
      } else if (this.active_arrow_up === true) {
        return this.orderByNameAsc()
      }
    },
    orderByNameAsc: function () {
      this.active_arrow_down = true
      this.active_arrow_up = false
      return this.listAgents.sort(this.$compareNamesAsc)
    },
    orderByNameDesc: function () {
      this.active_arrow_down = false
      this.active_arrow_up = true
      return this.listAgents.sort(this.$compareNamesDesc)
    },
    orderByCalendar: function () {
      if (this.lastrun_arrow_down) {
        this.lastrun_arrow_down = false
        this.lastrun_arrow_up = true
        return this.listAgents.sort(function (a, b) {
          const as = a.lastRun.split('/')
          const ad = new Date(as[2], as[1] - 1, as[0])
          const bs = b.lastRun.split('/')
          const bd = new Date(bs[2], bs[1] - 1, bs[0])
          return bd - ad
        })
      } else {
        this.lastrun_arrow_down = true
        this.lastrun_arrow_up = false
        return this.listAgents.sort(function (a, b) {
          const as = a.lastRun.split('/')
          const ad = new Date(as[2], as[1] - 1, as[0])
          const bs = b.lastRun.split('/')
          const bd = new Date(bs[2], bs[1] - 1, bs[0])
          return ad - bd
        })
      }
    },
    selectAgent (e) {
      this.selectedAgentName = e.currentTarget.getAttribute('data-name')
      this.selectedAgentId = parseInt(e.currentTarget.getAttribute('data-id'))
    }
  },
  components: {
    AgentExecution
  }
}
</script>
<style scoped>
.agent-border {
    border: 1px solid #e3e5e8;
    border-radius: 12px;
    width: 80px;
    height: 30px;
}
</style>
