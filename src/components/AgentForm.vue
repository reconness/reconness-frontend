<template>
    <div class="col-12">
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content agent-containers">
                <!-- <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div> -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 collapse multi-collapse" id="top-section" style="margin-bottom: 20px;">
                        <div style="float: left;" class="d-flex flex-row justify-content-end">
                            <input v-model="agent.name" style="font-size: 24px; font-weight: bold; color: #000000; border-left: 4px solid #00B1FF; border-top: none; border-bottom: none;  border-right: none;" class="form-control agent-placeholder" placeholder="My agent">
                            <span style="margin: auto" class="material-icons blue-text">edit</span>
                        </div><!-- /.d-flex -->
                    </div><!-- /.col-12 -->
                </div>
                <div class="row show multi-collapse" id="middle-section">
                    <div class="col-12 col-sm-8">
                    <div class="row">
                        <div class="col-12">
                        <div style="float: left;" class="d-flex flex-row justify-content-end">
                            <input v-model="agent.name" style="font-size: 24px; font-weight: bold; color: #000000; border-left: 4px solid #00B1FF; border-top: none; border-bottom: none;  border-right: none;" class="form-control agent-placeholder" placeholder="My agent">
                            <span style="margin: auto" class="material-icons blue-text">edit</span>
                        </div><!-- /.d-flex -->
                        </div><!-- /.col-12 -->
                        <div class="col-12">
                        <div class="d-flex flex-row justify-content-end">
                            <span style="text-align: right; opacity: 1; font-size: 14px;" class="mr-2">
                            Add
                            <br>
                            your logo
                            </span>
                            <span style="opacity: 1; color: #B3B3B3; font-size: 50px;" class="material-icons">note</span>
                        </div><!-- /.d-flex -->
                        </div><!-- /.col-12 -->
                        <div class="col-12">
                        <input v-model="agent.repository" style="border-top: none; border-left: none; border-right: none;" class="form-control" placeholder="Repository">
                        </div><!-- /.col-12 -->
                        <div class="col-12">
                        <input v-model="agent.target" style="border-top: none; border-left: none; border-right: none;" class="form-control" placeholder="Target">
                        </div><!-- /.col-12 -->
                        <div class="col-12">
                        <input v-model="agent.command" style="border-top: none; border-left: none; border-right: none;" class="form-control" placeholder="Command">
                        </div><!-- /.col-12 -->
                        <div class="col-12">
                        <a href="#" style="margin-bottom: 1rem;" class="blue-text float-right">Learn more</a>
                        </div><!-- /.col-12 -->
                        <div class="col-12 col-md-6">
                        <div class="card agent-containers">
                            <div class="card-header" style="border-bottom: none;">
                            <div style="overflow: hidden; padding-bottom: 15px; border-bottom: 1px solid rgba(0,0,0,.125);">
                                <h3 style="font-weight: bold;" class="card-title">
                                Agent Type
                                </h3>
                            </div>
                            </div><!-- /.card-header -->
                            <div class="card-body">
                            <div class="form-group">
                                <div class="custom-control custom-checkbox form-check">
                                <input class="form-check-input custom-control-input" type="checkbox" id="agent_customCheckbox1" v-model="agent.isTargetType">
                                <label class="form-check-label custom-control-label" for="agent_customCheckbox1">Target</label>
                                </div>
                                <div class="custom-control custom-checkbox form-check">
                                <input class="form-check-input custom-control-input" type="checkbox" id="agent_customCheckbox2" v-model="agent.isRootDomainType">
                                <label class="form-check-label custom-control-label" for="agent_customCheckbox2">RootDomain</label>
                                </div>
                                <div class="custom-control custom-checkbox form-check">
                                <input class="form-check-input custom-control-input" type="checkbox" id="agent_customCheckbox3" v-model="agent.isSubDomainType">
                                <label class="form-check-label custom-control-label" for="agent_customCheckbox3">Subdomain</label>
                                </div>
                            </div>
                            </div><!-- /.card-body -->
                        </div><!-- /.card-->
                        </div>
                        <div class="col-12 col-md-6">
                        <div class="card agent-containers">
                            <div class="card-header" style="border-bottom: none;">
                            <div style="overflow: hidden; padding-bottom: 15px; border-bottom: 1px solid rgba(0,0,0,.125);">
                                <h3 style="font-weight: bold;" class="card-title">
                                Triggers
                                </h3>
                            </div>
                            </div><!-- /.card-header -->
                            <div class="card-body">
                            <div class="form-group">
                                <div class="custom-control custom-checkbox form-check">
                                <input class="form-check-input custom-control-input" type="checkbox" id="agent_customCheckbox4" v-model="agent.isAliveTrigger">
                                <label class="form-check-label custom-control-label" for="agent_customCheckbox4">Run Only if it is Alive</label>
                                </div>
                                <div class="custom-control custom-checkbox form-check">
                                <input class="form-check-input custom-control-input" type="checkbox" id="agent_customCheckbox5" v-model="agent.isHttpOpenTrigger">
                                <label class="form-check-label custom-control-label" for="agent_customCheckbox5">Run Only if has Http Open</label>
                                </div>
                                <div style="text-align: right;"  class="form-check">
                                <a href="#"><span class="form-check-label blue-text">More Options</span></a>
                                </div>
                            </div>
                            </div><!-- /.card-body -->
                        </div><!-- /.card-->
                        </div>
                    </div><!-- /.row -->
                    </div><!-- /.col-12 -->
                    <div class="col-12 col-sm-4">
                    <div class="row">
                        <div class="col-12 container-card">
                            <div v-bind:style="{background: agent.background}" class="card text-white card-style  mb-3 agentform-default-color-box">
                                <div class="card-body link-color">
                                <div class="d-flex justify-content-between">
                                    <h3 class="card-title">{{agent.name}}</h3>
                                    <span class="material-icons">person</span>
                                </div>
                                <hr />
                                <div class="direct-chat-infos clearfix">
                                    <em>
                                        <a href="#" class="float-left">Category</a>
                                    </em>
                                </div>
                                <div class="card-body-inside">
                                    <ul class="list-unstyled">
                                        <li>
                                            <a href="#">...</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="row">
                                    <div class="col-12" style="height: 85px">
                                        <span class="float-right text-white agentform-action">Creating Agent...</span>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="text-center">
                                <b>Pick a Color</b>
                            </div>
                            <!-- <div> -->
                            <div style="margin-top: 20px; box-shadow: 0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2); padding: 20px">
                              <div class="row">
                                  <div class="col-4">
                                      <button type="button" class="agent-colorpicker btn btn-block btn-default agentform-color-components agentform-color-components-align image-button"></button>
                                  </div>
                                  <div class="col-4">
                                      <button type="button" @click="setBlueColor" style="background-color: #4bd6f2;" class="btn btn-block btn-default agentform-color-components agentform-color-components-align"></button>
                                  </div>
                                  <div class="col-4">
                                      <button type="button" @click="setVioletColor" style="background-color: #9a25b6;" class="btn btn-block btn-default agentform-color-components agentform-color-components-align"></button>
                                  </div>
                                  <div class="col-4">
                                      <button type="button" @click="setRedColor" style="background-color: #e91013;" class="btn btn-block btn-default agentform-color-spacing-bottom agentform-color-components agentform-color-components-align"></button>
                                  </div>
                                  <div class="col-4">
                                      <button type="button" @click="setOrangeColor" style="background-color: #f36e1c;" class="btn btn-block btn-default agentform-color-spacing-bottom agentform-color-components agentform-color-components-align"></button>
                                  </div>
                                  <div class="col-4">
                                      <button type="button" @click="setGreenColor" style="background-color: #4cb45f;" class="btn btn-block btn-default agentform-color-spacing-bottom agentform-color-components agentform-color-components-align"></button>
                                  </div>
                              </div>
                            </div>
                        </div>
                    </div>
                    </div><!-- /.col-12 -->
                </div><!-- /.row -->
                <div class="row">
                    <div class="col-12">
                    <div style="min-height: auto;" class="info-box mb-3 agent-containers">
                        <div class="info-box-content">
                        <span class="info-box-text"><b style="padding-right: 10px;">Script</b><a href="#" class="blue-text">Learn more</a></span><a href="#" aria-controls="top-section middle-section bottom-section" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false"><span style="position: absolute; right: 1rem; top: .5rem;" class="material-icons">keyboard_arrow_down</span></a>
                        </div>
                        <!-- /.info-box-content -->
                    </div>
                    </div><!-- /.col-12 -->
                    <div id="bottom-section" class="col-12 collapse multi-collapse">
                    <textarea style="color: #0af31dce; background-color: #000000;" class="form-control" rows="11"></textarea>
                    </div>
                </div>
                </div><!-- /.modal-body -->
                <div style="border-top: none;" class="modal-footer">
                  <button @click="addAgent(this.agent)" style="color: #00B1FF;" type="button" class="agent-border btn create-agent-buttons-main-action" data-dismiss="modal">Done</button>
                  <button @click="close()" style="color: #FF4545;" type="button" class="agent-border btn create-agent-buttons-main-action" data-dismiss="modal">Cancel</button>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>
<style>
    .agentform-action{
        bottom: 0px;
        position: absolute;
        right: 0;
    }

    .agentform-color-components{
        width: 30px;
        height: 30px;
    }

    .custom-control-input:checked~.custom-control-label::before {
      color: #fff;
      border-color: #00B1FF;
      background-color: #00B1FF;
      box-shadow: none;
    }

    .agentform-color-spacing-bottom{
        margin-top: 30px !important;
    }

    .agentform-color-components-align{
        margin: auto;
    }

    .image-button{
      background-image: url('~@/assets/Rect.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }

    .agent-border{
        border: 1px solid #F1F3F5;
        border-radius: 12px;
        width: 90px;
        height: 47px;
    }

</style>
<script>
export default {
  methods: {
    setBlueColor: function () {
      this.agent.background = '#4bd6f2'
    },
    setVioletColor: function () {
      this.agent.background = '#9a25b6'
    },
    setRedColor: function () {
      this.agent.background = '#e91013'
    },
    setOrangeColor: function () {
      this.agent.background = '#f36e1c'
    },
    setGreenColor: function () {
      this.agent.background = '#4cb45f'
    },
    addAgent () {
      this.$store.commit('addAgent', this.agent)
    },
    close () {
      this.resetAgentForm()
    },
    resetAgentForm () {
      this.agent = {
        background: '#7159D3'
      }
    }
  },
  data () {
    return {
      agent: {
        name: '',
        background: '#7159D3',
        repository: '',
        target: '',
        command: '',
        isTargetType: false,
        isRootDomainType: false,
        isSubDomainType: false,
        isAliveTrigger: false,
        isHttpOpenTrigger: false,
        category: ''
      }
    }
  }
}
</script>
