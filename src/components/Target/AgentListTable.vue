<template>
<div>
    <h6 class="text-center mt-2">List of Agents</h6>
  <div class="card card-style">
    <div class="card-body">
      <div v-if="rootDomainAgents.length > 0" class="card card-table">
        <div class=" row mb-2"  >
          <div class="col-2 border-left-radius border-right text-light-white domain-names-list p-2" v-bind:style ="{'background':color}"> <p class="ml-2 m-0" v-on:click="orderByName()"> Name
           <i class="material-icons right float-right" v-show="active_arrow_down">keyboard_arrow_down</i>
           <i class="material-icons right float-right" v-show="active_arrow_up">keyboard_arrow_up</i></p>
          </div>
          <div class="col border-right text-light-white p-2 text-center domain-names-list" v-bind:style ="{'background':color}"> Categories </div>
          <div class="col-3 border-right text-light-white p-2 text-center domain-names-list" v-bind:style ="{'background':color}" v-on:click="orderByCalendar()"> Last Run
           <i class="material-icons right float-right" v-show="lastrun_arrow_down">keyboard_arrow_down</i>
           <i class="material-icons right float-right" v-show="lastrun_arrow_up">keyboard_arrow_up</i>
          </div>
        <div class="col-2 p-2 border-right-radius text-light-white text-center domain-names-list" v-bind:style ="{'background':color}">
           Actions</div>
        </div>
        <div class="row mb-2" v-for="item of subDomainAndRootDomainAgents" :key="item.id">
          <div class="col-2  border-left-radius border">
            <p class="m-2"> {{item.name}}</p>
          </div>
          <div class="col border-top border-bottom">
          </div>
          <div class="col-3 border-left border-top border-bottom text-center" v-if="item.lastRun !== null">
            <p class="m-2">{{new Date(item.lastRun).toLocaleDateString('en-ZA')}}</p>
          </div>
          <div v-else  class="col-3 border-left border-top border-bottom text-center">
          <p class="m-2"> Never</p>
          </div>
          <div class="col-2 border border-right-radius text-center">
              <button v-if="parseInt(item.status) === parseInt(this.$entityStatus.RUNNING)" type="button" @click="selectAgent" class="color-rgb-0-177-255 agent-border btn create-agent-buttons-main-action m-1 p-0" data-toggle="modal" data-target="#agentExecutionModalForm" :data-id="item.id" :data-name="item.name" :data-type="item.type">Running...</button>
              <button v-else :disabled="isRunningAgent !== -1 && isRunningAgent !== item.id" type="button" @click="selectAgentData" class="color-rgb-0-177-255 agent-border btn create-agent-buttons-main-action m-1 p-0" data-toggle="modal" data-target="#confirmation-before-run-an-agent" :data-id="item.id" :data-name="item.name" :data-type="item.type">Run</button>
          </div>
          <AgentExecution :id-agent="this.selectedAgentId" :name-agent="selectedAgentName" :type-agent="selectedAgentType"/>
          <ConfirmationBeforeRunAnAgent @run-agent="runAgent"/>
        </div>
      </div>
      <div v-else>
        <p class="lead text-center">
          There are no agents associated with this rootdomain.
        </p>
      </div>
    </div>
  </div></div>
</template>
<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
import AgentExecution from '@/components/Target/AgentExecution.vue'
import ConfirmationBeforeRunAnAgent from '@/components/Target/ConfirmationBeforeRunAnAgent.vue'
import { StatusMessageMixin } from '@/mixins/StatusMessageMixin'
import jQuery from 'jquery'
export default {
  name: 'AgentListTable',
  components: {
    AgentExecution,
    ConfirmationBeforeRunAnAgent
  },
  props: {
    color: String
  },
  data: function () {
    return {
      active_arrow_down: true,
      active_arrow_up: false,
      lastrun_arrow_down: true,
      lastrun_arrow_up: false,
      selectedAgentName: '',
      selectedAgentId: '',
      selectedAgentType: this.$entityTypeData.ROOTDOMAIN.id
    }
  },
  mixins: [StatusMessageMixin],
  computed: {
    ...mapGetters('agent', ['getLastAgentRootDomain', 'getAgentsByType', 'subDomainAndRootDomainAgents']),
    ...mapGetters('target', ['listRootDomainsAgents', 'listCurrentRunningRootDomainsAgent']),
    ...mapState('target', ['agentStatus']),
    ...mapState('agent', ['agentListStore', 'rootDomainAgents']),
    isRunningAgent: function () {
      return this.listCurrentRunningRootDomainsAgent({ idTarget: this.$route.params.targetName, idRoot: this.$route.params.rootdomainName, idAgent: this.selectedAgentId })
    },
    agentsList: function () {
      const rootDomainAgentsType = JSON.parse(JSON.stringify(this.getAgentsByType(this.$agentType.ROOTDOMAIN)))
      const rootDoaminsAgentsCurentView = this.listRootDomainsAgents({
        targetName: this.$route.params.targetName,
        rootDomainName: this.$route.params.rootdomainName
      })
      let searchedAgent = null
      rootDomainAgentsType.forEach(element => {
        searchedAgent = rootDoaminsAgentsCurentView.find(item => item.id === element.id)
        if (searchedAgent) {
          element.status = searchedAgent.status
        }
      })
      return rootDomainAgentsType
    }
  },
  methods: {
    ...mapMutations('target', ['setAgentStatus', 'insertAgentIfNotExistInRootDomain']),
    ...mapMutations('agent', ['updateStatusRootDomainAgent', 'updateStatusSubDomainAgent']),
    ...mapMutations('notification', ['addNewNotification']),
    ...mapActions('agent', ['runAgentToServer']),
    orderByName: function () {
      if (this.active_arrow_down === true) {
        return this.orderByNameDesc()
      } else if (this.active_arrow_up === true) {
        return this.orderByNameAsc()
      }
    },
    selectAgent (e) {
      this.addNewNotification('Running agent' + ' ' + this.selectedAgentName)
      if (this.selectedAgentType === this.$entityTypeData.ROOTDOMAIN.id) {
        this.updateStatusRootDomainAgent({
          status: this.$entityStatus.RUNNING,
          idAgent: this.selectedAgentId
        })
      } else {
        this.updateStatusSubDomainAgent({
          status: this.$entityStatus.RUNNING,
          idAgent: this.selectedAgentId
        })
      }
      this.setAgentStatus({ status: this.$entityStatus.RUNNING, id: this.selectedAgentId })
    },
    orderByNameAsc: function () {
      this.active_arrow_down = true
      this.active_arrow_up = false
      return this.getLastAgentRootDomain.sort(this.$compareNamesAsc)
    },
    orderByNameDesc: function () {
      this.active_arrow_down = false
      this.active_arrow_up = true
      return this.getLastAgentRootDomain.sort(this.$compareNamesDesc)
    },
    orderByCalendar: function () {
      if (this.lastrun_arrow_down) {
        this.lastrun_arrow_down = false
        this.lastrun_arrow_up = true
        return this.getLastAgentRootDomain.sort(function (a, b) {
          const as = a.lastRun.split('/')
          const ad = new Date(as[2], as[1] - 1, as[0])
          const bs = b.lastRun.split('/')
          const bd = new Date(bs[2], bs[1] - 1, bs[0])
          return bd - ad
        })
      } else {
        this.lastrun_arrow_down = true
        this.lastrun_arrow_up = false
        return this.getLastAgentRootDomain.sort(function (a, b) {
          const as = a.lastRun.split('/')
          const ad = new Date(as[2], as[1] - 1, as[0])
          const bs = b.lastRun.split('/')
          const bd = new Date(bs[2], bs[1] - 1, bs[0])
          return ad - bd
        }
        )
      }
    },
    runAgent (e) {
      jQuery('#agentExecutionModalForm').modal('show')
      this.runAgentToServer(
        {
          agent: this.selectedAgentName,
          target: this.$route.params.targetName,
          rootdomain: this.$route.params.rootdomainName,
          command: e.command,
          activateNotification: e.activateNotification
        }
      ).then(response => {
        if (response.status) {
          this.selectAgent(e)
          this.updateOperationStatus(this.$entityStatus.SUCCESS, '')
        } else {
          this.updateOperationStatus(this.$entityStatus.FAILED, response.message)
        }
      })
    },
    selectAgentData (e) {
      this.selectedAgentName = e.currentTarget.getAttribute('data-name')
      this.selectedAgentId = e.currentTarget.getAttribute('data-id')
      this.selectedAgentType = parseInt(e.currentTarget.getAttribute('data-type'))
    }
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
