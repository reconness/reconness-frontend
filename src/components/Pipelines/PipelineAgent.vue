<template>
<div class="card float-right initial-info-box agent-mini-main-container rounded-corners container-card" :style="{background:pipelineBackground}">
  <input type="checkbox" :id="pipelineID+1"  name="checkitem">
  <label :for="pipelineID+1" v-show="checkDetail"  @click="addListPipelinesId" :data-id="pipelineID" :data-name="pipelineName" class="mb-0 float-right"></label>
  <div class=" car-body m-2 " >
    <div class="row">
     <div class="col-7 border-right">
        <div class=" mt-2 mb-2">
          <span class="info-box-text text-custom agent-mini-agent-name clearfix">{{pipelineName }}</span>
          <a href="#" @click="setDetailsLink" data-toggle="modal" :data-id="pipelineID" data-target="#exampleModalCenter" data-backdrop="false"><small class="small-text">Details</small></a>
        </div>
     </div>
     <div class="col-5 abs-center">
        <span class="number" :style="{background:pipelineBackground}"> <div> <AccountCogIco /></div> </span>
    </div>
    </div>
  </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import AccountCogIco from '@/components/Icons/AccountCogIco.vue'
export default {
  name: 'PipelineAgent',
  props: {
    pipelineName: String,
    pipelineID: Number,
    pipelineBackground: String
  },
  components: {
    AccountCogIco
  },
  computed: {
    ...mapState('pipelines', ['checkDetail'])
  },
  methods: {
    ...mapMutations('pipelines', ['addIdAgentPipelineDetail', 'removebyIdAgentPipelinesDetail']),
    addListPipelinesId (e) {
      const selectedId = Number(e.currentTarget.getAttribute('data-id'))
      const selectedPipelinesName = e.currentTarget.getAttribute('data-name')
      if (document.getElementById(selectedId + 1).checked === false) {
        this.addIdAgentPipelineDetail({ id: selectedId, name: selectedPipelinesName })
      } else {
        this.removebyIdAgentPipelinesDetail(selectedId)
      }
    },
    setDetailsLink (e) {
      const selectedAgentId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('agent/setIdAgent', selectedAgentId)
      this.$store.commit('agent/setDetailsLinks', true)
    }
  }
}
</script>
<style scoped>
.text-custom{
    color: #fff;
    font-size: 14px;
}
.small-text{
  color:#fff;
  font-size: 80%;
  opacity: 0.8;
}
.initial-info-box {
    min-height: 70px;
    position: relative;
    width: 100%;
    /*box-shadow: 13px 19px 41px #d6d6d6;*/
    box-shadow: 13px 8px 21px #d6d6d6;
    opacity: 1;
}
.info-box{
 border-radius: 18px;
 box-shadow: none;
 border: 0px transparent;
}
div span svg {
    fill: #ffffff;
    width: 25px;
    height: 25px;
}
.card-tools > a{
  font-size: 14px;
  opacity: 1;
}
.card-tools .border-right{
  border-right: 1px solid #f1f3f5!important;
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

.card{
transition: all .25s ease;
width:100%;
margin-bottom: 0px;
}
.card:hover {
-webkit-transform:scale(1.25);
-moz-transform:scale(1.25);
-ms-transform:scale(1.25);
-o-transform:scale(1.25);
transform:scale(1.05);
transition: all .25s ease;
}
.number {
    border-radius: 10px;
    padding: 0px;
}
.number div {
    background-color: rgba(255, 255, 255, 0.15);
    padding: 1px 3px;
    border-radius: 10px;
    color: #ffffff;
    font-size: 17px;
    opacity: 1;
    margin: 2px;
}
</style>
