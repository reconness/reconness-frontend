<template>
    <div class="col-12">
        <div class="modal fade" id="simple-confirmation-modal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header dialog-without-lines-header">
                    <!-- PARAMETIZABLE -->
                    <h5 class="modal-title"><b>Are you sure you want to delete the selected reference?</b></h5>
                </div>
                <!-- <div class="modal-body"> -->
                    <!-- PARAMETIZABLE -->
                    <!-- <p>Please, confirm the name of the Agent before delete it</p>
                    <input autofocus required v-model="nameTyped" style="border-top: none; border-left: none; border-right: none;" class="form-control" placeholder="Agent Name"> -->
                <!-- </div> -->
                <div class="modal-footer dialog-without-lines-footer">
                    <button type="button" class="btn btn-primary btn-danger delete_btn" @click="removeResource">Delete</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /#confirmation-modal -->
    </div><!--/.col-12-->
</template>
<script>
import jQuery from 'jquery'
export default {
  methods: {
    removeResource: function () {
      this.$store.commit('removeResource', parseInt(this.$store.state.idResource))
      jQuery('#simple-confirmation-modal').modal('hide')
    },
    setSelectedReference (e) {
      const selectedId = e.currentTarget.getAttribute('data-id')
      console.log(selectedId)
      this.$store.commit('setSelectedResource', selectedId)
    }
  }
}
</script>
