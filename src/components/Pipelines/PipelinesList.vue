<template>
  <div class="row">
    <div v-for="item of pipelinesListStore" :key="item.id" @mouseover="hoverCard(item.id)" @mouseout="hoverCard(-1)"
    class="col-12 col-lg-12 col-xl-6 col-xxl-4 p-4 container-card">
    <span  class="material-icons main_reconnes_text-color mt-1 float-left"> chevron_right </span>
       <div class="card card-custom w-auto mb-3">
        <input type="checkbox" :id="item.id+1"  name="checkitem" :checked="isChecked(item.id)">
        <label :for="item.id+1" v-show= check  @click="addListPipelinesId" :data-id="item.id" :data-name="item.name" ></label>
         <div class="p-2">
         <div class="d-flex justify-content-between ml-3 mt-2 mr-2">
           <h1 class="domain-names-list">{{item.name}}</h1>
           <span class="info-box-icon abs-center icon-gray border-bottom pb-2"><GearIcon/></span>
          </div>
           <div class="row pl-2 mt-2">
              <div class="col-10 p-0">
              <div class="card card-custom-container pt-4 pb-4  pr-0 pl-4" style="position: relative;">
                <div class="row">
                  <div v-for="(item2,index) of item.agent.slice(0,3)" :key="item2.id" class="col-4 p-0" style="position: relative;">
                    <div class="info-box-background  w-85" style="position: relative; left: 0px; top: -1px;">
                      <div v-if="index !== 2" class="mt-3 w-25 border-top" style="color:black!important;position: absolute;border: 1px solid; float:left"> </div>
                    </div>
                    <div class="info-box float-left w-85 abs-center"  :style ="{background:item2.background}" style="position: absolute; left: 6px; top: -1px;">
                      <div class="info-box-content mt-2 mb-2 pl-0 pr-1 border-right">
                        <span class="info-box-text  text-custom agent-mini-agent-name">{{item2.name }}</span>
                        <small class="small-text">Details</small>
                      </div>
                      <span class="number float-right ml-1 abs-center"  :style ="{background:item2.background}" >
                      <div><AccountCogIco/></div>
                      </span>
                    </div>
                  </div>
                </div></div></div>
               <div class="col abs-center ">
                 <div class="row p-2">
                   <div class="col-12">
                   <span class="info-box-icon abs-center"><RocketIco/></span>
                   </div>
                   <div class="col-12 border-top mt-1 mb-1">
                     <a href="#" class="abs-center f-size main_reconnes_text-color">Run</a>
                   </div>
                 </div>
               </div>
           </div>
       </div>
    </div></div></div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import AccountCogIco from '@/components/Icons/AccountCogIco.vue'
import RocketIco from '@/components/Icons/RocketIco.vue'
import GearIcon from '@/components/Icons/GearIcon.vue'
export default {
  name: 'PipelinesList',
  components: {
    AccountCogIco,
    RocketIco,
    GearIcon
  },
  data: function () {
    return {
      selectedCard: -1,
      checkSelected: false,
      checkDeleted: -1
    }
  },
  computed: {
    ...mapState('pipelines', ['pipelinesListStore', 'pipelinesIdList', 'check'])
  },
  methods: {
    ...mapMutations('pipelines', ['addIdPipeline', 'removebyIdPipelines']),
    hoverCard (selectedIndex) {
      this.selectedCard = selectedIndex
    },
    setPipelinesId (e) {
      const selectedPipelineId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('pipelines/setIdPipelines', selectedPipelineId)
    },
    isChecked (itemID) {
      if (this.checkSelected === false) {
        if (this.pipelinesIdList.find(pipeline => pipeline.id === itemID)) {
          if (this.checkDeleted === itemID) {
            return false
          } else {
            return true
          }
        } else {
          if (this.checkDeleted === itemID) {
            return true
          } else {
            return false
          }
        }
      }
    },
    addListPipelinesId (e) {
      const selectedId = Number(e.currentTarget.getAttribute('data-id'))
      const selectedPipelinesName = e.currentTarget.getAttribute('data-name')
      if (document.getElementById(selectedId + 1).checked === false) {
        if (this.pipelinesIdList.length !== 0 && this.checkSelected === false) {
          this.checkSelected = false
          this.checkDeleted = selectedId
        } else {
          this.checkSelected = true
        }
        this.addIdPipeline({ id: selectedId, name: selectedPipelinesName })
      } else {
        this.removebyIdPipelines(selectedId)
        if (this.checkSelected === false) {
          this.checkDeleted = selectedId
        }
      }
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
.icon-gray{
  fill: #f1f3f5;
  opacity: 1;
  width: 24px;
  height: 24px;
  border-bottom: 1px solid #f1f3f5!important;
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
.info-box{
  overflow: hidden;
  text-overflow: ellipsis;
}
.info-box-icon svg{
  width: 25px;
  height: 25px;
  opacity: 1;
}
.number {
    display: inline-table;
    border-radius: 8px;
}
.info-box-background{
    position: absolute;
    background: transparent;
    border: 1px solid;
    border-radius: 12px;
    opacity: 1;
    height: 85px;
}
.border-right{
  opacity: 1;
}

.info-box span svg {
    fill: #ffffff;
    width: 18px;
    height: 18px;
}
.number div{
    background-color: rgba(255, 255, 255, 0.15);
    padding: 1px 4px;
    border-radius: 4px;
    color: #ffffff;
    font-size: 12px;
    opacity: 1;
    margin: 3px;
}
.text-custom{
    color: #fff;
    font-size: 16px;
}
.small-text{
  color:rgb(228, 229, 230);
}

@media (min-width: 1600px){
.col-xxl-4 {
    -ms-flex: 0 0 33.333333%;
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
 }
}
@media (min-width: 1200px){
.text-custom{
    color: #fff;
    font-size: 12px;
}
.small-text{
  font-size: 70%;
  color:rgb(228, 229, 230);
}
.info-box span svg {
    fill: #ffffff;
    width: 15px;
    height: 15px;
}

.number div {
    background-color: rgba(255, 255, 255, 0.15);
    padding: 1px 1px;
    border-radius: 4px;
    color: #ffffff;
    font-size: 10px;
    opacity: 1;
    margin: 0px;
}
}

.w-85 {
    width: 85%!important;
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
</style>
