<template>
    <div class="col-12">
        <div class="row header-bottom-line-shadow position-sticky">
            <div class="w-60px"></div>
            <div class="col-1 my-2 border-left">Color ID</div>
            <div class="col-2 my-2 border-left">Name</div>
            <div class="col-3 my-2 border-left">RootDomains</div>
            <div class="col-1 my-2 border-left border-right">Actions</div>
        </div>
        <div v-for="target of filteredTargetList" :key="target.id" class="row border-bottom">
            <div class="w-60px">
                <div v-if="check" class="w-100 h-100 target-mini-list d-flex justify-content-center align-items-center custom-control custom-checkbox form-check private-program-container">
                  <input class="form-check-input custom-control-input" :value="target.id"  v-model="selectedItems" type="checkbox" name="checkitem" :id="'remove_customCheckbox'+target.id">
                  <label class="form-check-label custom-control-label float-right" :for="'remove_customCheckbox'+target.id"  :data-id="target.id" :data-name="target.name"></label>
                </div>
            </div>
            <div class="col-1 my-auto d-flex justify-content-center">
                <div class="color-id-size" :style="{background: target.primaryColor}"></div>
            </div>
            <div class="col-2 my-auto d-flex">
                <router-link class="black-text text-break" :to="{ name: 'TargetDetail', params: {targetName: target.name} }">
                    {{target.name}}
                </router-link>
            </div>
            <div class="col-3 my-2">
              <router-link class="text-break agent-mini-color-gray target-detail-popover" v-for="(rootDomain, index) in target.rootDomains" :key="rootDomain.id" :to="{ name: 'RootDomainDetails', params: {targetName: target.name,  rootdomainName: rootDomain.root } }">
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
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import TrashCanIco from '@/components/Icons/TrashCanIco.vue'
import jQuery from 'jquery'
import { TargetMixin } from '@/mixins/TargetMixin'
import { RemoveEntitiesMixin } from '@/mixins/RemoveEntitiesMixin'
export default {
  name: 'TargetMiniList',
  components: {
    TrashCanIco
  },
  mixins: [TargetMixin, RemoveEntitiesMixin],
  computed: {
    ...mapState('target', ['targetListStore', 'check', 'filterColour', 'paginator', 'selectedTargets']),
    ...mapState('general', ['entitiesToDelete']),
    ...mapGetters('target', ['filterByColor']),
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
        this.addAndPrepareSelectedTargetIdsToRemove()
      },
      deep: true
    }
  },
  mounted () {
    this.enableTooltips()
  },
  methods: {
    ...mapMutations('target', ['updateSelectedTargets']),
    ...mapMutations('general', ['addEntityToDelete', 'removeSelectedEntities']),
    ...mapActions('target', ['addAndPrepareSelectedTargetIdsToRemove']),
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
    margin-left: 25%
}
.target-mini-list label::after{
    width: 18px;
    height: 18px;
    top: 0;
    margin-left: 25%
}
</style>
