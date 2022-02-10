<template>
    <div class="card target-details-popover agent-details-popover rounded-corners">
        <div class="card-body">
          <div class="d-flex align-items-center mt-1">
            <span  class="material-icons font-size-16px chevron-gray-color cursor-pointer"> chevron_right </span>
            <span class="text-options-gray-color text-break">{{getAgent.repository}}</span>
          </div>
          <div class="d-flex align-items-center mt-1">
            <span  class="material-icons font-size-16px chevron-gray-color cursor-pointer"> chevron_right </span>
            <span class="text-options-gray-color text-break">{{getAgent.target}}</span>
          </div>
          <div class="d-flex align-items-center mt-1">
            <span  class="material-icons font-size-16px chevron-gray-color cursor-pointer"> chevron_right </span>
            <span class="text-options-gray-color text-break">{{getAgent.command}}</span>
          </div>
          <div class="d-flex align-items-center mt-1">
            <span  class="material-icons font-size-16px chevron-gray-color cursor-pointer"> chevron_right </span>
            <span class="text-options-gray-color text-break">Type: {{this.$getEntityTypeById(getAgent.type).description}}</span>
          </div>
        </div>
        <!-- /.card-body -->
        <div class="card-footer d-flex justify-content-end">
            <span @click="prepareToDelete($event, this.$entityTypeData.AGENT.id)" class="red-text cursor-pointer" data-toggle="modal" data-target="#message-box-modal" :data-id="getAgent.id" :data-name="getAgent.name">Delete</span>
        </div>
        <!-- /.card-footer-->
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import { AgentMixin } from '@/mixins/AgentMixin'
export default {
  name: 'DetailsAgentPopover',
  mixins: [AgentMixin],
  computed: {
    ...mapState('agent', ['idAgent']),
    ...mapGetters('agent', ['getAgentById']),
    getAgent () {
      return this.getAgentById(this.idAgent)
    }
  },
  methods: {
    ...mapMutations('target', ['addEntityToDelete', 'removeTargetEntityToDelete'])

  }
}
</script>
<style scoped>
.target-details-popover .card-footer{
    background-color: transparent;
    border-top: 1px solid rgba(0,0,0,.125);
}
div.target-details-popover.card{
  margin-bottom: 0;
}
.target-details-popover{
    width: 15rem;
}
.target-details-popover div.card-body span.material-icons{
    font-size: 1.2rem
}
.target-details-popover .card-header{
  padding-bottom: 3%;
}
.target-details-popover .card-body{
  padding-top: 3%;
}
.text-options-gray-color{
  color: #ababab;
}
.chevron-gray-color{
  color: #767676;
}
</style>
