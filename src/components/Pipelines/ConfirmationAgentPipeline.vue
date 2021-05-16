<template>
<div class="row">
  <div class="col-12">
    <Toast :baseZIndex="200"/>
    <div class="modal fade" id="confirmation-modal" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header dialog-without-lines-header">
                <!-- PARAMETERIZABLE -->
                  <h5  class="modal-title">
                     <b>Are you sure you want to delete selected agent</b>
                  </h5>
              </div>
              <div class="modal-body">
                  <p>Please, confirm if you want to remove agent <b>{{getNamePipeline}}</b> from the pipeline's workflow</p>
                  <input autofocus required v-model="nameTyped" style="border-top: none; border-left: none; border-right: none;" class="form-control" placeholder="Agent Name">
            </div>
              <div class="modal-footer dialog-without-lines-footer">
                  <button :disabled="nameTyped !== getNamePipeline"
                  type="button" class="btn btn-primary btn-danger delete_btn" @click="remove(this.nameTyped)">Confirm</button>
                  <button @click="close()" type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
              </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /#confirmation-modal -->
</div>
</div>
</template>
<script>
import jQuery from 'jquery'
import Toast from 'primevue/toast'
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      nameTyped: ''
    }
  },
  components: {
    Toast
  },
  methods: {
    remove: function () {
      // if (this.$randomBooleanResult()) {
      this.$store.commit('pipelines/removeAgentOfPipelineWorkflow', parseInt(this.$route.params.id))
      this.$toast.add({ severity: 'success', sumary: 'Success', detail: 'The target has been deleted successfully', life: 3000 })
      // } else {
      //   this.$toast.add({ severity: 'error', sumary: 'Error', detail: 'An error occured during the removal process', life: 3000 })
      // }
      this.nameTyped = ''
      jQuery('#confirmation-modal').modal('hide')
      jQuery('#targetModalForm').modal('hide')
    },
    close () {
      this.nameTyped = ''
    },
    ...mapMutations(['setIsElementDeleted'])
  },
  computed: {
    ...mapGetters(['getAgentById']),
    ...mapState('pipelines', ['idFather']),
    getNamePipeline () {
      if (this.idFather !== -1) {
        return this.getAgentById(this.idFather).name
      }
      return 0
    }
  }
}
</script>
