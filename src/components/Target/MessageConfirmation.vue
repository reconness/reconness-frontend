<template>
    <div class="col-12" style="z-index: 20001;">
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
      if (this.$route.name === 'TargetDetail') {
        this.removeTargetMessage(parseInt(this.$route.params.id))
      } else if (this.$route.name === 'RootDomainDetails') {
        this.removeRootDomainMessage({
          idTarget: parseInt(this.$route.params.idTarget),
          idRootDomain: parseInt(this.$route.params.id)
        })
      } else if (this.$route.name === 'SubDomainDetails') {
        this.removeSubDomainMessage({
          idTarget: parseInt(this.$route.params.idTarget),
          idRootDomain: parseInt(this.$route.params.id),
          idSubDomain: parseInt(this.$route.params.idsubdomain)
        })
      }
      jQuery('#message-confirmation-modal').modal('hide')
    },
    setSelectedMessage (e) {
      this.$store.commit('agent/setIdMessage', -1)
    },
    ...mapMutations('target', ['setIdMessage', 'removeTargetMessage', 'removeRootDomainMessage', 'removeSubDomainMessage'])
  },
  computed: {
    ...mapState('target', ['idMessage'])
  }
}
</script>
