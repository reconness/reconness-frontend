<template>
<div class="row">
    <div v-for="item of pipelinesListStore" :key="item.id"
    class=" col-12 col-sm-4 col-md-4 col-lg-4 col-xl-3 p-3">
        <div class="card initial-info-box agent-mini-main-container rounded-corners container-card" @mouseover="hoverCard(item.id)" @mouseout="hoverCard(-1)">
        <input type="checkbox" :id="'remove_customCheckbox'+ item.id" :value="item.id"  v-model="selectedItems" name="checkitem">
        <label :for="'remove_customCheckbox'+ item.id" v-show="check" :data-id="item.id" :data-name="item.name" class="mb-0"></label>
        <div class="card-header border-bottom-0 mb-1 mt-3 p-0 pl-2 pr-3 ">
           <span  class="material-icons main_reconnes_text-color mr-1 float-left"> chevron_right </span>
            <router-link :to="{ name: 'PipelineDetail', params: {pipelineName: item.name} }" class="text-body card-title domain-names-target">
           {{item.name}}
           </router-link>
            <div class="card-tools mr-0">
               <ul class="nav nav-pills ml-auto">
                   <li class="nav-item icon-gray mr-1 setting-icon cursor-pointer" data-toggle="modal" data-target="#pipelinesModalFormSettings" :data-id="item.id" @click="openSettings">
                      <GearIcon/>
                    </li>
                    <li class="nav-item">
                     <router-link class="icon-gray rocket-icon cursor-pointer"  :to="{ name: 'PipelineRunView', params: {pipelineName: item.name}  }">
                     <RocketIco/>
                     </router-link>
                    </li>
                  </ul>
            </div>
              </div>
            <!-- /.card-header -->
            <div class="card-body ml-3 pt-0 pr-3">
                <div class="d-flex">
                       <div class="card-tools">
                  <ul class="nav nav-pills ml-auto">
                    <li class="nav-item border-right mr-1 pr-1">
                      <small class="text-muted">Last run {{ new Date(item.date).toLocaleDateString('en-US') }}</small>
                    </li>
                    <li class="nav-item">
                    <small class="main_reconnes_text-color font-weight-bold" v-if ="item.statusRun === this.$entityStatus.RUNNING">Success
                    </small>
                    <small v-else class="color-delete font-weight-bold">Failed</small>
                    </li>
                  </ul>
                </div>
               </div>
                <!-- /.d-flex -->
                <div v-if="item.agent.length > 0">
                  <div v-for="fatherAgent of item.agent.slice(0,3)" :key="fatherAgent.id" class="circle-color float-left mr-1" :style ="{background:fatherAgent.background}">
                </div>
               </div>
              </div>
              <!-- /.card-body -->
        </div>
    </div><!-- /.col -->
    <div class="col-12">
      <PipelinesForm :routeName="this.$route.name"/>
    </div>
</div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import RocketIco from '@/components/Icons/RocketIco.vue'
import GearIcon from '@/components/Icons/GearIcon.vue'
import PipelinesForm from '@/components/Pipelines/PipelinesForm.vue'
import { PipelineMixin } from '@/mixins/PipelineMixin'
export default {
  name: 'PipelinesMiniList',
  components: {
    RocketIco,
    GearIcon,
    PipelinesForm
  },
  data: function () {
    return {
      selectedCard: -1,
      checkSelected: false,
      checkDeleted: -1
    }
  },
  mixins: [PipelineMixin],
  computed: {
    ...mapState('pipelines', ['pipelinesListStore', 'pipelinesIdList', 'check', 'selectedPipelines']),
    selectedItems: {
      get () {
        return this.selectedPipelines
      },
      set (value) {
        this.updateSelectedPipelines(value)
      }
    }
  },
  watch: {
    selectedItems: {
      handler: function (value) {
        this.addAndPrepareSelectedPipelineIdsToRemove()
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations('pipelines', ['addIdPipeline', 'removebyIdPipelines', 'updateSelectedPipelines']),
    ...mapMutations('general', ['addEntityToDelete', 'removeSelectedEntities']),
    ...mapActions('pipelines', ['addAndPrepareSelectedPipelineIdsToRemove']),
    hoverCard (selectedIndex) {
      this.selectedCard = selectedIndex
    },
    setPipelinesId (e) {
      const selectedPipelineId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('pipelines/setIdPipelines', selectedPipelineId)
    },
    openSettings (e) {
      const selectedId = Number(e.currentTarget.getAttribute('data-id'))
      this.$store.commit('pipelines/setIdPipeline', selectedId)
    }
  }
}
</script>
<style scoped>
.card {
transition: all .25s ease;
box-shadow: -2px 17px 29px #eaeaea;
opacity: 1;
}
.container-card:hover {
-webkit-transform:scale(1.25);
-moz-transform:scale(1.25);
-ms-transform:scale(1.25);
-o-transform:scale(1.25);
transform:scale(1.05);
transition: all .25s ease;
}
input[type="checkbox"] + label:before {
  content: "";
  width: 26px;
  height: 26px;
  float: right;
  border: 2px solid #ccc;
  background: #fff;
  border-radius: .7rem;
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
}
input[type="checkbox"] {
  display: none;
}

 .icon-gray{
  fill: #f1f3f5;
  opacity: 1;
  width: 20px!important;
  height: 20px!important;
}
.color-delete{
    color: rgb(255, 69, 69);
}
.font-weight-bold {
    font-weight: 500!important;
}
.text-muted{
    color: rgba(108, 117, 125, 0.59)!important;
}
.circle-color{
    width: 8px;
    height: 8px;
    border-radius: 100%;
}
.card-title {
    font-size: 0.9rem;
}
div.card-header span{
  font-size: 20px;
}
a.setting-icon:hover, a.rocket-icon:hover, li.setting-icon:hover, li.rocket-icon:hover{
  fill: #00B1FF;
}
</style>
