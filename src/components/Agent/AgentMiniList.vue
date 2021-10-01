<template>
    <div class="col-12">
        <div class="row header-bottom-line-shadow">
            <div class="offset-sm-1"></div>
            <div class="col-1 my-2 border-left">Color ID</div>
            <div class="col-2 my-2 border-left">Name</div>
            <div class="col-2 my-2 border-left">Created By</div>
            <div class="col-3 my-2 border-left">Category</div>
            <div class="col-2 my-2 border-left">Agent Type</div>
            <div class="col-1 my-2 border-left">Actions</div>
        </div>
        <div v-for="agent of filteredAgentList" :key="agent.id" class="row border-bottom">
            <div class="col-1">
                <div v-if="check" class="w-100 h-100 target-mini-list d-flex justify-content-center align-items-center custom-control custom-checkbox form-check private-program-container">
                  <input class="form-check-input custom-control-input" type="checkbox" name="checkitem" :id="'remove_customCheckbox'+ agent.id" :checked="this.$isItemOnList(agent.id, entitiesToDelete)">
                  <label class="form-check-label custom-control-label float-right" :for="'remove_customCheckbox'+ agent.id"  :data-id="agent.id" :data-name="agent.name" @click="prepareToDeleteFromMultipleSelections"></label>
                </div>
            </div>
            <div class="col-1 my-auto d-flex justify-content-center">
                <div class="color-id-size" :style="{background: agent.primaryColor}"></div>
            </div>
            <div class="col-2 my-auto d-flex">
                {{agent.name}}
            </div>
            <div class="col-2 my-2">
              <div class="d-inline-flex">
                <AccountCogIco class="fill-with-dark-gray"/>
                <span class="ml-1 agent-mini-color-gray">User</span>
              </div>
            </div>
            <div class="col-3 my-2">
              <span class="agent-mini-color-gray">Category</span>
            </div>
            <div class="col-2 my-2">
              <span class="agent-mini-color-gray">{{this.$getEntityTypeById(parseInt(agent.type)).description}}</span>
            </div>
            <div class="col-1 color-action-column d-flex justify-content-center">
              <span class="d-flex align-items-center mt-auto mb-auto" title="Settings" data-toggle="tooltip" data-placement="bottom">
                <span class="target-minilist-settings-ico cursor-pointer material-icons my-auto icon-size-action-column target-minilist-settings-ico" @click="onEdit" data-toggle="modal" data-target="#targetModalForm" :data-id="agent.id">settings</span>
              </span>
              <span title="Delete" data-toggle="tooltip" data-placement="bottom" class="d-flex align-items-center mt-auto mb-auto">
                <TrashCanIco @click="prepareToDelete($event, this.$agentType.TARGET)" data-toggle="modal" data-target="#message-box-modal" :data-id="agent.id" :data-name="agent.name" class="target-minilist-trash-ico cursor-pointer material-icons my-auto ml-2 icon-size-delete-action-column"/>
              </span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
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
    ...mapState('agent', ['agentListStore', 'filterColour', 'check']),
    ...mapState('target', ['paginator']),
    ...mapGetters('agent', ['filterByColor'])
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
    }
  },
  mounted () {
    this.enableTooltips()
  },
  methods: {
    ...mapMutations('target', ['addEntityToDelete', 'removeTargetEntityToDelete']),
    enableTooltips () {
      jQuery('[data-toggle="tooltip"]').tooltip()
    },
    onEdit (e) {
      this.setTargetId(e)
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
}
.target-mini-list label::after{
    width: 18px;
    height: 18px;
    top: 0;
}

</style>
