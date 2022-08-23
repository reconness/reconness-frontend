<template>
    <div class="card target-details-popover agent-details-popover rounded-corners">
        <div class="card-body">
          <div v-if="isEmpty(getAgent.repository)" class="d-flex align-items-start mt-1">
            <span  class="material-icons mt-1 font-size-16px chevron-gray-color cursor-pointer"> chevron_right </span>
            <span class="text-options-gray-color text-break">{{getAgent.repository}}</span>
          </div>
          <div v-if="isEmpty(getAgent.categories)" class="d-flex align-items-start mt-1">
            <span  class="material-icons mt-1 font-size-16px chevron-gray-color cursor-pointer"> chevron_right </span>
            <span class="text-options-gray-color text-break">{{getAgent.categories.toString()}}</span>
          </div>
          <div v-if="isEmpty(getAgent.command)" class="d-flex align-items-start mt-1">
            <span  class="material-icons mt-1 font-size-16px chevron-gray-color cursor-pointer"> chevron_right </span>
            <span class="text-options-gray-color text-break">{{getAgent.command}}</span>
          </div>
          <div v-if="isEmpty(this.$getEntityTypeById(getAgent.type).description)" class="d-flex align-items-start mt-1">
            <span  class="material-icons mt-1 font-size-16px chevron-gray-color cursor-pointer"> chevron_right </span>
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
import { RemoveEntitiesMixin } from '@/mixins/RemoveEntitiesMixin'
export default {
  name: 'DetailsAgentPopover',
  mixins: [RemoveEntitiesMixin],
  computed: {
    ...mapState('agent', ['idAgent']),
    ...mapGetters('agent', ['getAgentById']),
    getAgent () {
      return this.getAgentById(this.idAgent)
    }
  },
  methods: {
    ...mapMutations('general', ['addEntityToDelete', 'removeTargetEntityToDelete']),
    isEmpty (field) {
      if (field === null) {
        return false
      }
      if (typeof (field) === 'object') {
        return field.length > 0
      }
      return !this.$validateIsBlank(field)
    }

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
