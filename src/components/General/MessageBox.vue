<template>
  <div class="col-12">
    <div class="modal fade" id="message-box-modal" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-md modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-body">
                <div class="row">
                  <div class="col-12">
                    <div class="d-flex justify-content-center mb-3">
                      <HelpIco :variableClass="'mt-5 question-mark-size question-mark-color'"/>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="d-flex justify-content-center">
                      <!-- PARAMETIZABLE -->
                      <p class="question-title-text-width question-title-font-size question-title-font-color text-center font-weight-bold ">Are you sure you want to delete selected target?</p>
                    </div>
                  </div>
                  <div class="col-12">
                    <hr class="mb-4"/>
                  </div>
                  <div class="col-12">
                    <div class="d-flex justify-content-center pl-2 pr-2">
                      <p>Please, confirm the name of the target <b>My Target</b> before delete it</p>
                    </div>
                  </div>
                  <div class="col-12">
                    <input style="border-top: none; border-left: none; border-right: none;" class="form-control" placeholder="Target name">
                  </div>
                </div>
                </div> <!-- /.modal-body -->
              <div class="modal-footer dialog-without-lines-footer d-flex justify-content-center">
                  <button type="button" class="btn message-box-btn message-box-btn-accept-fontcolor" @click="remove()">Delete</button>
                  <button type="button" class="btn message-box-btn message-box-btn-cancel-fontcolor" data-dismiss="modal">Cancel</button>
              </div> <!-- /.modal-footer dialog-without-lines-footer -->
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /#confirmation-modal -->
    </div>
</template>
<script>
import HelpIco from '@/components/Icons/HelpIco.vue'
export default {
  name: 'MessageBox',
  components: {
    HelpIco
  }
}
</script>
<style scoped>
.question-mark-size{
  width: 40%;
  height: 50%
}
.question-mark-color{
  fill: #ff4545;
}
.question-title-font-color{
  color: #707070;
}
.question-title-font-size{
  font-size: 1.4rem;
}
.question-title-text-width{
  width: 60%;
}
.message-box-btn {
  border: 1px solid #e5e9ec;
  border-radius: 8px;
  background-color: transparent;
  width: 88px
}
.message-box-btn-cancel-fontcolor {
  color: #707070;
}
.message-box-btn-accept-fontcolor {
  color: #ff4545;
}
</style>
