<template>
    <div class="col-12">
      <div class="modal fade" :id="modalId" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog modal-dialog-centered modal-md">
                <div class="modal-content">
                <div class="modal-header dialog-without-lines-header">
                    <h4 class="modal-title"><b>{{ modalTitle }}</b></h4>
                </div>
                <div class="modal-body">
                    <slot name="body-content"></slot>
                </div>
                <div class="modal-footer dialog-without-lines-footer">
                    <slot name="footer-content"></slot>
                </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /#debug-modal -->
    </div>
</template>
<script>
export default {
  name: 'BasicModal',
  props: {
    modalTitle: String,
    modalId: String
  }
}
</script>
