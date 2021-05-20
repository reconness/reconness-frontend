<template>
    <div class="col-12">
            <div class="modal fade" id="agentConfiguration" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div class="modal-content root-domain-window custom-border-radius ">
                        <div class="modal-body">
                             <button type="button" @click="resetForm" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div class="d-flex justify-content-between">
                              <p class="agent-placeholder agent-name-input root-domain-name mt-3 pl-2">My Agent</p>
                              <p style="margin-top: 4%;" class="agent-mini-color-gray">Configuration</p>
                            </div>
                            <div class="row">
                              <div class="col-12">
                                <p class="ml-3">Combobox</p>
                                <div class="d-flex">
                                  <div class="rectangle-empty mr-4 rounded-corners"></div>
                                  <div class="rectangle-empty rounded-corners"></div>
                                </div>
                              </div>
                              <div class="col-12">
                                <p class="mt-3">Textbox</p>
                                <input class="form-control target-input-borders input-textbox">
                              </div>
                            </div>
                        </div>
                        <div style="border-top: none;" class="modal-footer">
                          <button type="button" style="color: #00B1FF;" class="agent-border btn create-agent-buttons-main-action mt-5" data-dismiss="modal">Done</button>
                          <button style="color: #FF4545;" type="button" class="agent-border btn create-agent-buttons-main-action mt-5 " data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>
<style scoped>
.root-domain-window {
  height: 434px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
}
.root-domain-name {
  border-radius: 0;
}
  .custom-border-radius {
  border-radius: 25px !important;
}
div.modal-content.root-domain-window {
  padding:  0 3% 3% 3%;
}
.form-container {
  height: 159px;
  overflow: auto;
  padding-right: 10px;
  bottom: 0 !important;
}
.rectangle-empty{
  border: 1px solid #F8F8F8;
  height: 100px;
  width: 30%;
}
.rectangle-textbox{
  border-radius: 15px !important;
}
.input-textbox{
  height: 42px;
  border-radius: 12px;
  border: 1px solid #F8F8F8;
}
</style>
