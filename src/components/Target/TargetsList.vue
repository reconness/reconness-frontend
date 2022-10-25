<template>
    <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-3" @mouseenter="hoverCard( {id} )" @mouseleave="hoverCard(-1)">
        <div class="row">
          <div class="col-10">
        <div class="initial-info-box agent-mini-main-container infobox-radius w-100">
        <input type="checkbox" :id="'remove_customCheckbox'+ id" name="checkitem" :value="id"  v-model="selectedItems">
        <label class="float-right mb-0" :for="'remove_customCheckbox'+ id" v-show="check" :data-id="id" :data-name="name"></label>
          <div class="infobox-padding-bordered infobox-radius">
        <div class="info-box target-detail-popover-reference infobox-border-line infobox-radius infobox-padding-bordered">
          <span class="info-box-icon icon-style" :style ="{background: 'linear-gradient(135deg,'+primaryColor+' '+ '0%,' + secondaryColor + ' ' + '100%) 0% 0% no-repeat padding-box'}"><BullseyeArrowIco :variableClass="'w-50 h-50'"/></span>
          <div class="info-box-content">
          <span class="info-box-text domain-names-target">
           <router-link :to="{ name: 'TargetDetail', params: {targetName: name} }" class="text-body" >
            {{name}}</router-link>
          </span>
          <a class="nav-link target-detail-popover active agent-mini-agent-details pt-0 pb-0 black-text border-right-0 cursor-pointer" @click="showDetailsPopover" :data-id="id" :data-name="name">Details</a>
            <OverlayPanel class="target-list-popover" ref="op">
              <DetailsTargetPopover/>
            </OverlayPanel>
            <div class="d-flex target-mosaic-options align-items-center">
              <a class="nav-link active agent-mini-agent-details pt-0 pb-0 black-text border-right-0" @click="onEdit" href="#" data-toggle="modal"  :data-id="id" data-target="#targetModalForm">Settings</a>
              <span class="material-icons cursor-pointer settings-ico" @click="onEdit" data-toggle="modal" data-target="#targetModalForm" :data-id="id">settings</span>
            </div> <!-- /.d-flex target-mosaic-options -->
          </div> <!-- /.info-box-content -->
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
        <TargetForm/>
    </div><!-- /.col -->
</template>
<script>
import DetailsTargetPopover from '@/components/Target/DetailsTargetPopover'
import { mapState, mapMutations, mapActions } from 'vuex'
import BullseyeArrowIco from '@/components/Icons/BullseyeArrowIco.vue'
import TargetForm from '@/components/Target/TargetForm.vue'
import { TargetMixin } from '@/mixins/TargetMixin'
import { RemoveEntitiesMixin } from '@/mixins/RemoveEntitiesMixin'
import OverlayPanel from 'primevue/overlaypanel'
export default {
  name: 'TargetMiniList',
  components: {
    BullseyeArrowIco,
    TargetForm,
    OverlayPanel,
    DetailsTargetPopover
  },
  props: {
    name: String,
    primaryColor: String,
    secondaryColor: String,
    id: String,
    rootDom: Array
  },
  data: function () {
    return {
      checkSelected: false,
      checkDeleted: -1,
      selectedTargetName: '',
      selectedCard: -1
    }
  },
  mixins: [TargetMixin, RemoveEntitiesMixin],
  computed: {
    ...mapState('target', ['check', 'targetIdList', 'selectedTargets']),
    ...mapState('general', ['entitiesToDelete']),
    selectedItems: {
      get () {
        return this.selectedTargets
      },
      set (value) {
        this.updateSelectedTargets(value)
      }
    }
  },
  watch: {
    selectedItems: {
      handler: function (value) {
        this.addAndPrepareSelectedTargetIdsToRemove()
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations('target', ['addIdTarget', 'removebyIdTarget', 'updateSelectedTargets']),
    ...mapMutations('general', ['addEntityToDelete', 'removeSelectedEntities']),
    ...mapActions('target', ['addAndPrepareSelectedTargetIdsToRemove']),
    hoverCard (selectedIndex) {
      this.selectedCard = selectedIndex
    },
    isSelected (cardIndex) {
      return this.selectedCard.id === cardIndex
    },
    onEdit (e) {
      this.setTargetId(e)
      this.$store.commit('agent/setDetailsLinks', false)
    },
    setDetailsLink (e) {
      const selectedAgentId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('agent/setIdAgent', selectedAgentId)
      this.$store.commit('agent/setDetailsLinks', true)
    },
    setTargetName (e) {
      this.selectedTargetName = e.currentTarget.getAttribute('data-name')
    },
    showDetailsPopover (e) {
      this.setTargetId(e)
      this.$refs.op.toggle(e)
    }
  }
}
</script>
<style scoped>
.agent-mini-main-container{
    margin-bottom: 32px;
}
.agent-mini-main-container {
/* transition: all .25s ease; */
width:100%;
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

.text-truncate {
    max-width: 100px;
}

.domain-names-list .material-icons{
font-size: 17px;
}

.info-box >span{
  width: 56px;
  height: 56px;
  border-radius: 13px;
  box-shadow: 3px 12px 23px #eae9e9;
  opacity: 1;
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

div.target-detail-popover-reference div.info-box-content{
  width: 30%;
}

</style>
