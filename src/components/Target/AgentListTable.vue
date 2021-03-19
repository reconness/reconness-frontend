<template>
<div>
    <h6 class="text-center mt-2">List of Agents</h6>
  <div class="card card-style">
    <div class="card-body">
      <div class="card card-table">
        <div class=" row mb-2"  >
          <div class="col-2 border-left-radius border-right text-light-white p-2" v-bind:style ="{'background':gradient}"> <p class="ml-2 m-0"> Name</p> </div>
          <div class="col border-right text-light-white p-2 text-center" v-bind:style ="{'background':gradient}"> Categories</div>
          <div class="col-3 mr-3 border-right-radius text-light-white p-2 text-center" v-bind:style ="{'background':gradient}"> Last Run</div>
          <div class="col-2 p-0" >
          <button class="border-table text-light-white p-2 text-center w-100" v-bind:style ="{'background':gradient}"> Actions</button></div>
        </div>
      <div class="row mb-2" v-for="item of this.getLastAgentSubdom" :key="item.id">
        <div class="col-2  border-left-radius border">
           <p class="m-2 mb-2"> {{item.name}}</p>
        </div>
        <div class="col border-top border-bottom">
        </div>
        <div class="col-3 mr-3 border border-right-radius">
        </div>
        <div class="col-2 border-table abs-center border p-0">
            <button type="button" style="color: rgb(0, 177, 255);" class="agent-border btn create-agent-buttons-main-action m-1 p-0">Run</button>
        </div>
      </div>
      </div>
    </div>
  </div></div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AgentListTable',
  props: {
    gradient: String
  },
  computed: {
    ...mapGetters(['getLastAgentSubdom'])
  }
}
</script>
<style scoped>
.agent-border {
    border: 1px solid #e3e5e8;
    border-radius: 12px;
    width: 60px;
    height: 30px;
}

</style>
