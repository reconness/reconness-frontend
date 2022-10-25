<template>
  <div class="row">
    <div v-for="item of pipelinesListStore" :key="item.id" @mouseover="hoverCard(item.id)" @mouseout="hoverCard(-1)"
    class="col-12 col-lg-12 col-xl-6 col-xxl-4 p-4 container-card">
    <span  class="material-icons main_reconnes_text-color mt-1 float-left"> chevron_right </span>
       <div class="card card-custom w-auto mb-3">
        <input type="checkbox" :id="'remove_customCheckbox'+ item.id"  name="checkitem" :value="item.id"  v-model="selectedItems">
        <label :for="'remove_customCheckbox'+ item.id" v-show="check" :data-id="item.id" :data-name="item.name" ></label>
         <div class="p-2">
         <div class="d-flex justify-content-between ml-3 mt-2 mr-2">
           <router-link :to="{ name: 'PipelineDetail', params: {pipelineName: item.name} }">
           <h1 class="domain-names-list">{{item.name}}</h1>
           </router-link>
           <span class="info-box-icon abs-center icon-gray border-bottom pb-2 setting-icon cursor-pointer" data-toggle="modal" data-target="#pipelinesModalFormSettings" :data-id="item.id" @click="openSettings"><GearIcon/></span>
          </div>
           <div class="row pl-2 mt-2">
              <div class="col-10 p-0">
              <div class="card card-custom-container pt-4 pb-4  pr-0 pl-4 position-relative">
                <PipelineWorkflow :AgentsPipelineList= 'item.agent'/>
              </div></div>
               <div class="col abs-center ">
                 <div class="row p-2">
                   <div class="col-12">
                   <router-link  :to="{ name: 'PipelineRunView', params: {pipelineName: item.name}  }">
                     <span class="info-box-icon abs-center listing-run-pipeline-ico"><RocketIco/></span>
                    </router-link>
                   </div>
                   <div class="col-12 border-top mt-1 mb-1">
                     <a href="#" class="abs-center f-size main_reconnes_text-color">Run</a>
                   </div>
                 </div>
               </div>
           </div>
    </div></div></div>
    <div class="col-12">
      <PipelinesForm :routeName="this.$route.name"/>
      <AgentForm :readOnly="true"/>
    </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import RocketIco from '@/components/Icons/RocketIco.vue'
import GearIcon from '@/components/Icons/GearIcon.vue'
import PipelineWorkflow from '@/components/Pipelines/PipelineWorkflow.vue'
import PipelinesForm from '@/components/Pipelines/PipelinesForm.vue'
import AgentForm from '@/components/Agent/AgentForm.vue'
import { PipelineMixin } from '@/mixins/PipelineMixin'
export default {
  name: 'PipelinesList',
  components: {
    RocketIco,
    GearIcon,
    PipelineWorkflow,
    PipelinesForm,
    AgentForm
  },
  data: function () {
    return {
      selectedCard: -1,
      checkSelected: false,
      checkDeleted: -1,
      selectedPipeline: { id: -1 }
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
width:100%;
}
.container-card:hover {
-webkit-transform:scale(1.25);
-moz-transform:scale(1.25);
-ms-transform:scale(1.25);
-o-transform:scale(1.25);
transform:scale(1.05);
transition: all .25s ease;
}
.card-custom{
 background: #ffffff 0% 0% no-repeat padding-box;
 box-shadow: 22px 22px 13px #d6d6d6;
 border-radius: 12px;
 opacity: 1;
}
.f-size{
  font-size: 14px;
}
h1{
  font-size: 18px;
  opacity: 1;
  color: #000000;
}
.card-custom-container{
  background: #f5f6f7 0% 0% no-repeat padding-box;
  border-radius: 12px;
  opacity: 1;
}
.icon-gray{
  fill: #f1f3f5;
  opacity: 1;
  width: 24px;
  height: 24px;
  border-bottom: 1px solid #f1f3f5!important;
}
.info-box-icon svg{
  width: 25px;
  height: 25px;
  opacity: 1;
}

@media (min-width: 1600px){
.col-xxl-4 {
    -ms-flex: 0 0 33.333333%;
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
 }
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
span.info-box-icon.setting-icon:hover, span.listing-run-pipeline-ico:hover{
  fill: #00B1FF;
}
</style>
