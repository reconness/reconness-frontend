<template>
    <div class="card target-details-popover rounded-corners">
        <div class="card-header">
            <h3 class="card-title">Root Domains</h3>
            <!-- /.card-tools -->
        </div>
        <!-- /.card-header -->
        <div class="card-body">
            <div v-for="rootdomain in getTarget.rootDomains" :key="rootdomain.id" class="d-flex target-details-root-links">
                <span  class="material-icons font-size-16px mt-1 dark-gray-text"> chevron_right </span>
                <router-link class="dark-gray-text text-break" :to="{ name: 'RootDomainDetails', params: {idTarget: getTarget.id , id: rootdomain.id, targetName: getTarget.name, rootdomainName: rootdomain.root} }">
                    {{rootdomain.root}}
                </router-link>
            </div>
        </div>
        <!-- /.card-body -->
        <div class="card-footer d-flex justify-content-end">
            <span class="red-text cursor-pointer" @click="prepareToDelete($event, this.$agentType.TARGET)" data-toggle="modal" data-target="#message-box-modal" :data-id="getTarget.id" :data-name="getTarget.name">Delete</span>
        </div>
        <!-- /.card-footer-->
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import { RemoveEntitiesMixin } from '@/mixins/RemoveEntitiesMixin'
export default {
  name: 'DetailsTargetPopover',
  data () {
    return {
      target: {}
    }
  },
  mixins: [RemoveEntitiesMixin],
  computed: {
    ...mapState('target', ['idTarget']),
    ...mapGetters('target', ['getTargetById']),
    getTarget () {
      return this.getTargetById(this.idTarget)
    }
  },
  methods: {
    ...mapMutations('general', ['addEntityToDelete', 'removeSelectedEntities'])
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
</style>
