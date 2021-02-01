<template>
<div class="row">
  <div class="col-12">
    <div class="modal fade" id="confirmation-modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header dialog-without-lines-header">
                  <!-- PARAMETIZABLE -->
                  <h5 class="modal-title"><b>Are you sure you want to delete selected target?</b></h5>
              </div>
              <div class="modal-body">
                  <!-- PARAMETIZABLE -->
                  <p>Please, confirm the name of the Target {{selectedTargetName}} before delete it</p>
                  <input autofocus required v-model="nameTyped"  class="form-control input-line" placeholder="Target Name">
              </div>
              <div class="modal-footer dialog-without-lines-footer">
                  <button :disabled="nameTyped !== selectedTargetName" type="button" class="btn btn-primary btn-danger delete_btn" @click="removeTarget(this.nameTyped)">Delete</button>
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
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      nameTyped: '',
      selectedTargetName: ''
    }
  },
  props: {
    type: String
  },
  methods: {
    removeTarget: function () {
      if (this.nameTyped === this.selectedTargetName) {
        this.$store.commit('target/removeTarget', this.nameTyped)
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
    ...mapGetters('target', ['idTarget', 'getTargetById']),
    loadSelectedTarget () {
      const id = this.idTarget
      return this.getTargetById(parseInt(id))
    }
  },
  watch: {
    loadSelectedTarget: function (value) {
      if (value !== undefined) {
        this.selectedTargetName = value.name
      }
    }
  }
}
</script>
