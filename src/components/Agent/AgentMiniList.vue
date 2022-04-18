<template>
    <div class="col-12">
        <div class="row header-bottom-line-shadow">
            <div class="w-60px"></div>
            <div class="col-1 my-2 border-left">Color ID</div>
            <div class="col-2 my-2 border-left">Name</div>
            <div class="col-2 my-2 border-left">Created By</div>
            <div class="col-2 my-2 border-left">Agent Type</div>
            <div class="col-1 my-2 border-left border-right">Actions</div>
        </div>
        <div v-for="agent of filteredAgentList" :key="agent.id" class="row border-bottom">
            <div class="w-60px">
                <div v-if="check" class="w-100 h-100 target-mini-list d-flex justify-content-center align-items-center custom-control custom-checkbox form-check private-program-container">
                  <input class="form-check-input custom-control-input" type="checkbox" :value="agent.id"  v-model="selectedItems" name="checkitem" :id="'remove_customCheckbox'+ agent.id">
                  <label class="form-check-label custom-control-label float-right" :for="'remove_customCheckbox'+ agent.id"  :data-id="agent.id" :data-name="agent.name"></label>
                </div>
            </div>
            <div class="col-1 my-auto d-flex justify-content-center">
                <div class="color-id-size" :style="{background: agent.primaryColor}"></div>
            </div>
            <div class="col-2 my-auto d-flex text-break">
                {{agent.name}}
            </div>
            <div class="col-2 my-2">
              <div class="d-inline-flex">
                <AccountCogIco class="fill-with-dark-gray"/>
                <span class="ml-1 agent-mini-color-gray agent-minilist-source-size-user-ico">{{ agent.createdBy }}</span>
              </div>
            </div>
            <div class="col-2 my-2">
              <span class="agent-mini-color-gray">{{this.$getEntityTypeById(parseInt(agent.type)).description}}</span>
            </div>
            <div class="col-1 color-action-column d-flex justify-content-center">
              <span class="d-flex align-items-center mt-auto mb-auto" title="Settings" data-toggle="tooltip" data-placement="bottom">
                <span class="target-minilist-settings-ico cursor-pointer material-icons my-auto icon-size-action-column target-minilist-settings-ico" @click="onEdit" data-toggle="modal" data-target="#exampleModalCenter" :data-id="agent.id">settings</span>
              </span>
              <span title="Delete" data-toggle="tooltip" data-placement="bottom" class="d-flex align-items-center mt-auto mb-auto">
                <TrashCanIco @click="prepareToDelete($event, this.$agentType.TARGET)" data-toggle="modal" data-target="#message-box-modal" :data-id="agent.id" :data-name="agent.name" class="target-minilist-trash-ico cursor-pointer material-icons my-auto ml-2 icon-size-delete-action-column"/>
              </span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import TrashCanIco from '@/components/Icons/TrashCanIco.vue'
import jQuery from 'jquery'
import { AgentMixin } from '@/mixins/AgentMixin'
import AccountCogIco from '@/components/Icons/AccountCogIco.vue'
export default {
  name: 'AgentMiniList',
  components: {
    TrashCanIco,
    AccountCogIco
  },
  mixins: [AgentMixin],
  computed: {
    ...mapState('agent', ['agentListStore', 'filterColour', 'check', 'selectedAgents']),
    ...mapState('target', ['paginator']),
    ...mapState('general', ['entitiesToDelete']),
    ...mapGetters('agent', ['filterByColor']),
    selectedItems: {
      get () {
        return this.selectedAgents
      },
      set (value) {
        this.updateSelectedAgents(value)
      }
    }
  },
  watch: {
    entitiesToDelete: {
      handler: function () {
        if (this.entitiesToDelete.length === 0) {
          var checkboxes = document.getElementsByName('checkitem')
          for (var i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = false
          }
        }
      },
      deep: true
    },
    selectedItems: {
      handler: function (value) {
        this.addAndPrepareSelectedAgentIdsToRemove()
      },
      deep: true
    }
  },
  mounted () {
    this.enableTooltips()
  },
  methods: {
    ...mapMutations('agent', ['updateSelectedAgents']),
    ...mapMutations('target', ['removeTargetEntityToDelete']),
    ...mapMutations('general', ['addEntityToDelete']),
    ...mapActions('agent', ['addAndPrepareSelectedAgentIdsToRemove']),
    enableTooltips () {
      jQuery('[data-toggle="tooltip"]').tooltip()
    },
    onEdit (e) {
      this.setAgentId(e)
      this.$store.commit('agent/setDetailsLinks', false)
    }
  }
}
</script>
<style scoped>
.header-bottom-line-shadow {
    background: #fbfbfb 0% 0% no-repeat padding-box;
    opacity: 1;
    box-shadow: 0px 6px 10px #0000000F
}
.color-id-size {
    width: 18px;
    height: 18px;
}
.color-action-column {
    background: rgba(0, 177, 255, 0.05);
}
.icon-size-action-column {
    font-size: 21px;
}
.icon-size-delete-action-column {
    width: 21px;
    height: 21px;
}
.target-minilist-settings-ico:hover {
    color: #00B1FF;
}
.target-minilist-trash-ico:hover {
    fill: #FF4545
}
.target-mini-list label::before{
    width: 18px;
    height: 18px;
    position: relative;
    top: 0;
    margin-left: 25%
}
.target-mini-list label::after{
    width: 18px;
    height: 18px;
    top: 0;
    margin-left: 25%
}
.agent-minilist-source-size-ico {
    width: 19px
}
.agent-minilist-source-size-user-ico {
    width: 22px
}
</style>
