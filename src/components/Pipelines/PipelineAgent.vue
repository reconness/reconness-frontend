<template>
  <div
    class="info-box float-left abs-center"
    :style="{background:pipelineBackground}"
  >
    <div class="info-box-content mt-2 mb-2 pl-0 pr-1 border-right">
      <span class="info-box-text text-custom agent-mini-agent-name">{{pipelineName }}</span>
      <small class="small-text">Details</small>
    </div>
    <span class="number float-right ml-2 abs-center" :style="{background:pipelineBackground}">
      <div>
        <AccountCogIco />
      </div>
    </span>
  </div>
</template>
<script>
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
  }
}
</script>
<style scoped>
.text-custom{
    color: #fff;
    font-size: 15px;
}
.small-text{
  color:rgb(228, 229, 230);
  font-size: 80%;
  opacity: 0.8;
}
.info-box{
 border-radius: 18px;
 box-shadow: 13px 19px 41px #d6d6d6;
 opacity: 1;
}
.info-box span svg {
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
</style>
