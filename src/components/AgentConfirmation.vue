<template>
<div class="row">
  <div class="col-12">
    <div class="modal fade" id="confirmation-modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header dialog-without-lines-header">
                  <!-- PARAMETIZABLE -->
                  <h5 class="modal-title"><b>Are you sure you want to delete selected agent?</b></h5>
              </div>
              <div class="modal-body">
                  <!-- PARAMETIZABLE -->
                  <p>Please, confirm the name of the Agent {{selectedAgentName}} before delete it</p>
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
export default {
  data () {
    return {
      nameTyped: '',
      selectedAgentName: ''
    }
  },
  methods: {
    removeAgent: function () {
      if (this.nameTyped === this.selectedAgentName) {
        this.$store.commit('removeAgent', this.nameTyped)
        this.nameTyped = ''
        jQuery('#confirmation-modal').modal('hide')
        jQuery('#exampleModalCenter').modal('hide')
      }
    },
    close () {
      this.nameTyped = ''
    }
  },
  computed: {
    loadSelectedAgent2 () {
      const id = this.$store.getters.idAgent
      return this.$store.getters.getAgentById(parseInt(id))
    }
  },
  watch: {
    loadSelectedAgent2: function (value) {
      if (value !== undefined) {
        this.selectedAgentName = value.name
      }
    }
  }
}
</script>
