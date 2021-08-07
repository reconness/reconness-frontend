<template>
<div class="row">
  <div class="col-12">
    <Toast :baseZIndex="200"/>
    <div class="modal fade" id="confirmation-modal" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header dialog-without-lines-header">
                  <!-- PARAMETERIZABLE -->
                  <h5 class="modal-title"><b>Are you sure you want to delete selected agent?</b></h5>
              </div>
              <div class="modal-body">
                <!-- PARAMETERIZABLE -->
                  <p>Please, confirm the name of the Agent <b>{{selectedAgentName}}</b> before delete it</p>
                  <input autofocus required v-model="nameTyped" style="border-top: none; border-left: none; border-right: none;" class="form-control" placeholder="Agent Name">
              </div>
              <div class="modal-footer dialog-without-lines-footer">
                  <button :disabled="nameTyped !== selectedAgentName" type="button" class="btn btn-primary btn-danger delete_btn" @click="removeAgent(this.nameTyped)">Delete</button>
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
import { mapState } from 'vuex'
export default {
  name: 'AgentConfirmation',
  components: {
    Toast
  },
  data () {
    return {
      nameTyped: '',
      selectedAgentName: ''
    }
  },
  computed: {
    ...mapState('agent', ['isDeletetFromForm']),
    loadSelectedAgent2 () {
      const id = this.$store.getters['agent/idAgent']
      return this.$store.getters['agent/getAgentById'](parseInt(id))
    }
  },
  watch: {
    loadSelectedAgent2: function (value) {
      if (value !== undefined) {
        this.selectedAgentName = value.name
      }
    }
  },
  methods: {
    removeAgent: function () {
      if (this.nameTyped === this.selectedAgentName) {
        if (this.$randomBooleanResult()) {
          this.$store.commit('agent/removeAgent', this.nameTyped)
          this.$toast.add({ severity: 'success', sumary: 'Success', detail: 'The agent has been deleted successfully', life: 3000 })
        } else {
          this.$toast.add({ severity: 'error', sumary: 'Error', detail: 'An error occured during the removal process', life: 3000 })
        }
        this.nameTyped = ''
        jQuery('#confirmation-modal').modal('hide')
        jQuery('#exampleModalCenter').modal('hide')
      }
      this.$store.commit('agent/setIdAgent', -1)
    },
    close () {
      this.nameTyped = ''
      if (!this.isDeletetFromForm) {
        this.$store.commit('agent/setIdAgent', -1)
      } else {
        this.$store.commit('agent/setIsDeletetFromForm', false)
      }
    }
  }
}
</script>
