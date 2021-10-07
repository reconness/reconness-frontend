<template>
    <div class="col-12">
        <div class="row header-bottom-line-shadow" style="position: sticky !important;">
            <div class="offset-sm-1"></div>
            <div class="col-1 my-2 border-left">Color ID</div>
            <div class="col-2 my-2 border-left">Name</div>
            <div class="col-3 my-2 border-left">RootDomains</div>
            <div class="col-1 my-2 border-left border-right">Actions</div>
        </div>
        <div v-for="target of filteredTargetList" :key="target.id" class="row border-bottom">
            <div class="col-1">
                <div v-if="check" class="w-100 h-100 target-mini-list d-flex justify-content-center align-items-center custom-control custom-checkbox form-check private-program-container">
                  <input class="form-check-input custom-control-input" type="checkbox" name="checkitem" :id="'remove_customCheckbox'+target.id" :checked="this.$isItemOnList(target.id, entitiesToDelete)">
                  <label class="form-check-label custom-control-label float-right" :for="'remove_customCheckbox'+target.id"  :data-id="target.id" :data-name="target.name" @click="prepareToDeleteFromMultipleSelections"></label>
                </div>
            </div>
            <div class="col-1 my-auto d-flex justify-content-center">
                <div class="color-id-size" :style="{background: target.primaryColor}"></div>
            </div>
            <div class="col-2 my-auto d-flex">
                <router-link class="black-text" :to="{ name: 'TargetDetail', params: {id: target.id, targetName: target.name} }">
                    {{target.name}}
                </router-link>
            </div>
            <div class="col-3 my-2">
              <router-link class="agent-mini-color-gray target-detail-popover" v-for="(rootDomain, index) in target.rootDomains" :key="rootDomain.id" :to="{ name: 'RootDomainDetails', params: {idTarget: target.id , id: rootDomain.id, targetName: target.name,  rootdomainName: rootDomain.root } }">
                  {{rootDomain.root}}{{showArraySeparatorByIndexAndList(index, target.rootDomains)}}
              </router-link>
            </div>
            <div class="col-1 color-action-column d-flex justify-content-center">
              <span class="d-flex align-items-center mt-auto mb-auto" title="Settings" data-toggle="tooltip" data-placement="bottom">
                <span class="target-minilist-settings-ico cursor-pointer material-icons my-auto icon-size-action-column target-minilist-settings-ico" @click="onEdit" data-toggle="modal" data-target="#targetModalForm" :data-id="target.id">settings</span>
              </span>
              <span title="Delete" data-toggle="tooltip" data-placement="bottom" class="d-flex align-items-center mt-auto mb-auto">
                <TrashCanIco @click="prepareToDelete($event, this.$agentType.TARGET)" data-toggle="modal" data-target="#message-box-modal" :data-id="target.id" :data-name="target.name" class="target-minilist-trash-ico cursor-pointer material-icons my-auto ml-2 icon-size-delete-action-column"/>
              </span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import TrashCanIco from '@/components/Icons/TrashCanIco.vue'
import jQuery from 'jquery'
import { TargetMixin } from '@/mixins/TargetMixin'
export default {
  name: 'TargetMiniList',
  components: {
    TrashCanIco
  },
  mixins: [TargetMixin],
  computed: {
    ...mapState('target', ['targetListStore', 'check', 'filterColour', 'entitiesToDelete', 'paginator']),
    ...mapGetters('target', ['filterByColor'])
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
    },
    showArraySeparatorByIndexAndList (index, itemsList) {
      if ((itemsList.length - 1) === index) {
        return ''
      }
      return ', '
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
