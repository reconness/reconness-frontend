<template>
<div class="row">
  <div class="col-12">
    <Toast :baseZIndex="200"/>
    <div class="modal fade" id="confirmation-modal" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header dialog-without-lines-header">
                <!-- PARAMETERIZABLE -->
                  <h5 class="modal-title"><b>Are you sure you want to delete selected target?</b></h5>
              </div>
              <div class="modal-body">
                <!-- PARAMETERIZABLE -->
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
import { mapGetters, mapMutations } from 'vuex'
import Toast from 'primevue/toast'
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
  components: {
    Toast
  },
  methods: {
    ...mapMutations('target', ['setIdTarget']),
    removeTarget: function () {
      if (this.nameTyped === this.selectedTargetName) {
        if (this.$randomBooleanResult()) {
          this.$store.commit('target/removeTarget', this.nameTyped)
          this.$toast.add({ severity: 'success', sumary: 'Success', detail: 'The target has been deleted successfully', life: 3000 })
        } else {
          this.$toast.add({ severity: 'error', sumary: 'Error', detail: 'An error occured during the removal process', life: 3000 })
        }
        this.nameTyped = ''
        jQuery('#confirmation-modal').modal('hide')
        jQuery('#targetModalForm').modal('hide')
      }
      this.setIdTarget(-1)
    },
    close () {
      this.nameTyped = ''
      this.setIdTarget(-1)
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
