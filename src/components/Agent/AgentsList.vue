<template>
    <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-3" @mouseenter="hoverCard( {id} )" @mouseleave="hoverCard(-1)">
        <div class="row">
          <div class="col-10">
        <div class="initial-info-box agent-mini-main-container rounded-corners w-100">
        <input type="checkbox" :id="'remove_customCheckbox'+ id" name="checkitem" :value="id"  v-model="selectedItems" >
        <label class="float-right mb-0" :for="'remove_customCheckbox'+ id" v-show="check" :data-id="id" :data-name="name"></label>
        <div class="p-2">
        <div class="info-box target-detail-popover-reference agent-item-container">
          <div class="info-box-content">
            <span class="text-body info-box-text domain-names-target">
              {{name}}
            </span>
            <a class="nav-link target-detail-popover active agent-mini-agent-details pt-0 pb-0 black-text border-right-0 cursor-pointer" @click="showDetailsPopover" :data-id="id">Details</a>
            <OverlayPanel class="target-list-popover" ref="op">
              <DetailsAgentPopover/>
            </OverlayPanel>
            <div class="d-flex target-mosaic-options align-items-center">
              <a class="nav-link cursor-pointer active agent-mini-agent-details pt-0 pb-0 black-text border-right-0" data-toggle="modal" @click="onEdit"  :data-id="id" data-target="#exampleModalCenter">Settings</a>
              <span class="material-icons cursor-pointer settings-ico" @click="onEdit"  data-toggle="modal"  :data-id="id" data-target="#exampleModalCenter">settings</span>
            </div> <!-- /.d-flex target-mosaic-options -->
          </div> <!-- /.info-box-content -->
          <span class="info-box-icon" :style ="{background: 'linear-gradient(135deg,'+primaryColor+' '+ '0%,' + secondaryColor + ' ' + '100%) 0% 0% no-repeat padding-box'}">
            <img v-if="image" class="fill-logo-image" :src="image">
            <AccountCogIco v-if="!image" class="w-50 h-50"/>
          </span>
          </div> <!-- /.info-box -->
          </div> <!-- /.p2 -->
            <!-- /.info-box-content -->
        </div> <!-- ./initial-info-box agent-mini-main-container rounded-corners -->
        </div>
        <div class="col-2">
          <transition name="slide-fade-cards">
        <div v-if="isSelected(id)" class="mt-4 cursor-pointer delete-btn-circular-container rounded-circle">
          <span @click="prepareToDelete($event, this.$agentType.TARGET)" class="material-icons-outlined red-font-color" data-toggle="modal" data-target="#message-box-modal" :data-id="id" :data-name="name">delete</span>
        </div>
        </transition>
        </div>
        </div>
    </div><!-- /.col -->
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import AccountCogIco from '@/components/Icons/AccountCogIco.vue'
import { AgentMixin } from '@/mixins/AgentMixin'
import { RemoveEntitiesMixin } from '@/mixins/RemoveEntitiesMixin'
import DetailsAgentPopover from '@/components/Agent/DetailsAgentPopover'
import OverlayPanel from 'primevue/overlaypanel'
export default {
  name: 'AgentsList',
  components: {
    AccountCogIco,
    DetailsAgentPopover,
    OverlayPanel
  },
  props: {
    name: String,
    primaryColor: String,
    secondaryColor: String,
    id: String,
    createdBy: String,
    image: String
  },
  data: function () {
    return {
      checkSelected: false,
      checkDeleted: -1,
      selectedTargetName: '',
      selectedCard: -1
    }
  },
  mixins: [AgentMixin, RemoveEntitiesMixin],
  computed: {
    ...mapState('agent', ['check', 'agentIdList', 'selectedAgents']),
    ...mapState('general', ['entitiesToDelete']),
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
    selectedItems: {
      handler: function (value) {
        this.addAndPrepareSelectedAgentIdsToRemove()
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations('general', ['addEntityToDelete', 'removeSelectedEntities']),
    ...mapMutations('agent', ['updateSelectedAgents']),
    ...mapActions('agent', ['addAndPrepareSelectedAgentIdsToRemove']),
    hoverCard (selectedIndex) {
      this.selectedCard = selectedIndex
    },
    isSelected (cardIndex) {
      return this.selectedCard.id === cardIndex
    },
    onEdit (e) {
      this.setAgentId(e)
      this.$store.commit('agent/setDetailsLinks', false)
    },
    setDetailsLink (e) {
      const selectedAgentId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('agent/setIdAgent', selectedAgentId)
      this.$store.commit('agent/setDetailsLinks', true)
    },
    showDetailsPopover (e) {
      const selectedAgentId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('agent/setIdAgent', selectedAgentId)
      this.$refs.op.toggle(e)
    }
  }
}
</script>
<style scoped>
.agent-mini-main-container{
    margin-bottom: 32px;
}

.agent-mini-agent-name{
    font-weight: bold;
    margin-bottom: 5px;
}

.agent-mini-agent-details{
    font-size: 12px;
    padding-top: 5px;
    padding-bottom: 3px;
    padding-right: 5px;
    border-right: 1px solid #F1F3F5;
    margin-right: 6px;
    padding-left: 0px;
}

.agent-mini-agent-edit{
    font-size: 12px;
    padding-top: 5px;
    padding-bottom: 3px;
    padding-left: 0px;
    padding-right: 0px;
}

.agent-mini-color-gray{
  color: #B3B3B3;
}

span.agent-mini-color-gray{
    font-size: 28px;
}

div.initial-info-box.agent-mini-main-container.rounded-corners{
    width: 223px;
}

.agent-mini-main-container {
/* transition: all .25s ease; */
width:100%;
}

input[type="checkbox"] + label:before {
  content: "";
  width: 26px;
  height: 26px;
  float: right;
  border: 2px solid #ccc;
  background: #fff;
  border-radius: .7rem;
  position: absolute;
  right: 0rem;
  z-index: 2;
}
input[type="checkbox"]:checked + label:before {
  border-color: #00B1FF;
}

input[type="checkbox"]:checked + label:after {
    content: "";
    width: 12px;
    height: 6px;
    border: 4px solid #00B1FF;
    float: right;
    margin-right: -1.2em;
    border-right: 0;
    border-top: 0;
    margin-top: .6em;
    transform: rotate(-55deg);
    position: absolute;
    right: 1.6rem;
    z-index: 2;
}

input[type="checkbox"] {
  display: none;
}

.initial-info-box {
    background: #fff;
    min-height: 70px;
    position: relative;
    width: 100%;
    box-shadow: -2px 17px 29px #eaeaea;
    opacity: 1;
}

.info-box {
    box-shadow: none;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 0rem;
    min-height: 60px;
    padding: .0rem;
    position: relative;
    width: 100%;
}
.info-box >span{
  width: 56px;
  height: 56px;
  border-radius: 13px;
  box-shadow: 3px 12px 23px #eae9e9;
  opacity: 1;
}
div.agent-item-container div.info-box-content{
  width: 30%;
}
.logo-image{
  max-width: 1.2rem;
  max-height: 1.2rem;
  width: 1.2rem;
}
</style>
