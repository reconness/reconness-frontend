<template>
<div class="row">
                  <div v-for="(item2,index) of associatedAgents" :key="item2.id" class="col-4 p-0" style="position: relative;">
                    <div class="info-box-background  w-85 float-left" style="position: relative; left: 0px; top: -1px;">
                  </div>
                    <div v-if="index+1 !== associatedAgents.length" class="mt-3 w-15 margin-center abs-center border-top" style="color:black!important;border: 1px solid; float:left"> </div>
                    <div v-if="index+1 !== associatedAgents.length" class="mt-3 black-circle">  </div>
                    <div class="info-box float-left w-85 abs-center"  :style ="{background:item2.background}" style="position: absolute; left: 7px; top: -4px;">
                      <div class="info-box-content mt-2 mb-2 pl-0 pr-1 border-right">
                        <span class="info-box-text  text-custom agent-mini-agent-name">{{item2.name }}</span>
                        <a href="#" @click="setDetailsLink" data-toggle="modal" :data-id="item2.id" data-target="#exampleModalCenter" data-backdrop="false"><small class="small-text">Details</small></a>
                      </div>
                      <span class="number float-right ml-1 abs-center"  :style ="{background:item2.background}" >
                      <div><AccountCogIco/></div>
                      </span>
                    </div>
                  </div>
                </div>
</template>
<script>
import AccountCogIco from '@/components/Icons/AccountCogIco.vue'
export default {
  components: {
    AccountCogIco
  },
  props: {
    AgentsPipelineList: Object
  },
  computed: {
    associatedAgents () {
      return this.AgentsPipelineList.slice(0, 3)
    }
  },
  methods: {
    setDetailsLink (e) {
      const selectedAgentId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('setIdAgent', selectedAgentId)
      this.$store.commit('setDetailsLinks', true)
    }
  }
}
</script>
<style scoped>

.info-box{
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 18px;
}
.number {
    display: inline-table;
    border-radius: 8px;
}
.info-box-background{
    position: absolute;
    background: transparent;
    border: 1px solid;
    border-radius: 18px;
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
.w-15 {
    width: 15%!important;
}
.black-circle{
    height: 8px;
    width: 8px;
    position: absolute;
    left: 98%;
    background: black;
    border-color: black;
    border-radius: 100%;
    margin-top: 2.3rem!important;
    z-index: 10;
}
.text-custom{
    color: #fff;
    font-size: 16px;
}
.small-text{
  color:rgb(228, 229, 230);
}
.margin-center{
  margin-top: 2.5rem!important;
}
</style>
