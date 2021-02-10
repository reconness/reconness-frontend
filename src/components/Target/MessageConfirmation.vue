<template>
    <div class="col-12">
        <div class="modal fade" id="message-confirmation-modal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header dialog-without-lines-header">
                  <!-- PARAMETERIZABLE -->
                    <h5 class="modal-title"><b>Are you sure you want to delete the selected message?</b></h5>
                </div>
                <div class="modal-footer dialog-without-lines-footer">
                    <button type="button" class="btn btn-primary btn-danger delete_btn" @click="removeMessageFn">Delete</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /#confirmation-modal -->
    </div><!--/.col-12-->
</template>
<script>
import jQuery from 'jquery'
import { mapState, mapMutations } from 'vuex'
export default {
  methods: {
    removeMessageFn: function () {
      this.removeMessage(parseInt(this.$route.params.id))
      jQuery('#message-confirmation-modal').modal('hide')
    },
    setSelectedMessage (e) {
      this.$store.commit('setIdMessage', -1)
    },
    ...mapMutations('target', ['setIdMessage', 'removeMessage'])
  },
  computed: {
    ...mapState('target', ['idMessage'])
  }
}
</script>
