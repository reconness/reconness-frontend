<template>
    <div class="col-12" style="z-index: 20001;">
        <div class="modal fade" id="note-confirmation-modal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header dialog-without-lines-header">
                  <!-- PARAMETERIZABLE -->
                    <h5 class="modal-title"><b>Are you sure you want to delete the selected note?</b></h5>
                </div>
                <div class="modal-footer dialog-without-lines-footer">
                    <button type="button" class="btn btn-primary btn-danger delete_btn" @click="removeNoteFn">Delete</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /#confirmation-modal -->
    </div><!--/.col-12-->
</template>
<script>
import jQuery from 'jquery'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'NoteConfirmation',
  computed: {
    ...mapState('target', ['idNote'])
  },
  methods: {
    ...mapActions('target', ['removeTargetNoteFromServer']),
    removeNoteFn: function () {
      if (this.$route.name === 'TargetDetail') {
        this.removeTargetNoteFromServer(this.$route.params.targetName)
      } else if (this.$route.name === 'RootDomainDetails') {
        this.removeRootDomainNote({
          targetName: this.$route.params.targetName,
          rootdomainName: this.$route.params.rootdomainName
        })
      } else if (this.$route.name === 'SubDomainDetails') {
        this.removeSubDomainNote({
          targetName: this.$route.params.targetName,
          rootdomainName: this.$route.params.rootdomainName,
          subdomainName: this.$route.params.subdomainName
        })
      }
      jQuery('#note-confirmation-modal').modal('hide')
    },
    setSelectedNote (e) {
      this.$store.commit('agent/setIdNote', '')
    },
    ...mapMutations('target', ['setIdNote', 'removeTargetNote', 'removeRootDomainNote', 'removeSubDomainNote'])
  }
}
</script>
