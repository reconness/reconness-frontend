<template>
  <div>
    <!-- Contains navs-bar -->
    <NavBarTwoDetailPipeline :pipelineName= 'this.getPipelineById(parseInt(this.$route.params.id)).name '/>
    <div class="content-wrapper">
      <div class="container-fluid">
        <hr class="reset-margin-top" />
        <div class="content">
          <div class="row">
          <div class="col-12 col-lg-2 p-3">
            <div class="info-box abs-center color-blue">
              <div class="d-flex flex-column text-right">
                <span class="material-icons text-center">control_point</span>
                <span>Add Agent</span>
              </div>
            </div>
          </div>
          <div v-for="item of this.getPipelineById(parseInt(this.$route.params.id)).agent" :key="item.id" class="col-12 col-lg-2 p-3">
            <PipelineAgent :pipelineName= 'item.name' :pipelineID='item.id'  :pipelineBackground='item.background'/>
           </div>
        </div>
        </div>
      </div>
      </div> <!-- container-fluid -->
    </div> <!-- content-wrapper -->
</template>
<script>
import { mapGetters } from 'vuex'
import NavBarTwoDetailPipeline from '@/components/Pipelines/NavBarTwoDetailPipeline.vue'
import PipelineAgent from '@/components/Pipelines/PipelineAgent.vue'
export default {
  name: 'PipelineDetailsView',
  components: {
    NavBarTwoDetailPipeline,
    PipelineAgent
  },
  computed: {
    ...mapGetters('pipelines', ['getPipelineById'])
  }
}
</script>
<style scoped>
.info-box{
 border-radius: 18px;
 box-shadow: none;
 opacity: 1;
 border: 1px solid rgba(0,0,0,.1);
 background-color: transparent;
}
</style>
