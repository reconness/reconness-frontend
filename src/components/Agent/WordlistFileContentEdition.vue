<template>
<div class="col-12">
  <div class="modal fade" id="wordlist-file-content-edition" tabindex="-1" role="dialog" aria-labelledby="wordlistModal" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content agent-containers">
        <div class="modal-header remove-flex">
          <div class="row">
            <div class="col-12">
              <div class="row">
                <div class="col-12">
                  <div class="d-flex">
                    <div class="d-flex align-items-center">
                      <span class="agent-name-input flex-fill pl-2">Edit Wordlist File</span>
                    </div>
                  </div><!-- /.d-flex -->
                </div><!-- /.col-12 -->
              </div><!-- /.row -->
            </div><!-- /.col-12 -->
          </div><!-- /.row -->
        </div><!-- /.modal-header -->
        <div class="modal-body ligth-gray-background">
          <div class="row" id="middle-section">
            <div class="col-12">
              <!-- <div class="wordlist-files-container wordlist-container-size border px-2 py-1 mt-2">
              </div> -->
              <v-ace-editor v-model:value="wordlistFileContent" lang="csharp" style="height:300px" theme="monokai"/>
            </div>
          </div><!-- /.row -->
        </div>
        <div class="border-top-none modal-footer">
          <button type="button" @click="saveWordListContent" class="blue-text agent-border btn create-agent-buttons-main-action">Accept</button>
          <button @click="openWordListMainWindows" type="button" class="red-text agent-border btn create-agent-buttons-main-action" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import jQuery from 'jquery'
import { VAceEditor } from 'vue3-ace-editor'
import { mapActions, mapState } from 'vuex'
import { TargetMixin } from '@/mixins/TargetMixin'
export default {
  name: 'WordlistFileContentEdition',
  components: {
    VAceEditor
  },
  data () {
    return {
      wordlistFileContent: ''
    }
  },
  mixins: [TargetMixin],
  computed: {
    ...mapState('wordlist', ['selectedWordListContent'])
  },
  watch: {
    selectedWordListContent: function (wordlistContent) {
      if (!this.$validateIsBlank(wordlistContent)) {
        this.wordlistFileContent = wordlistContent
      }
    }
  },
  methods: {
    ...mapActions('wordlist', ['saveWordListFileContent']),
    openWordListMainWindows () {
      jQuery('#wordlistModal').modal()
    },
    saveWordListContent () {
      this.saveWordListFileContent(this.wordlistFileContent).then(response => {
        if (response.status) {
          this.resetWordlistContentForm()
          jQuery('#wordlist-file-content-edition').modal('hide')
          this.openWordListMainWindows()
          this.updateOperationStatus(this.$entityStatus.SUCCESS, this.$message.successMessageForWordlistEdition)
        } else {
          this.updateOperationStatus(this.$entityStatus.FAILED, response.message)
        }
      })
    },
    resetWordlistContentForm () {
      this.wordlistFileContent = ''
    }
  }
}
</script>
<style scoped>
.agent-border{
  border: 1px solid #F1F3F5;
  border-radius: 12px;
  width: 90px;
  height: 47px;
}

.input.invalid input {
    border: 1px solid red;
}
.agent-name-input {
  width: 50%;
}

.form-control {
  border-radius: 0rem;
}

.form-control:disabled, .form-control[readonly] {
    background-color: transparent;
    opacity: 1;
}

div.private-program-container label {
  color: #00B1FF;
}

label {
  color: #495057;
  font-size: 18px;
  font-weight: 100 !important;
  font-size: 1.1rem;
}
.target-color-section{
  background-color: #f2f4f6
}
.private-program-container label::before{
  border: 2px solid #00B1FF;
  box-shadow: unset;
  background-color: #fbfbfb
}
.pills-border-gray{
  border: 1px solid #e5e9ec
}
.wordlist-container-size{
  height: 300px;
}
.break-word{
  word-break: break-all;
}
.wordlist-btn-size{
  width: 83px;
  height: 40px;
}
.wordlist-data-container{
  height: 265px;
  overflow-x: hidden
}
label.wordlists-files-label::after{
  background-color: #FBFBFB;
  color: #B3B3B3 !important
}
label.wordlists-files-label{
  font-size: 1rem !important;
  border: 1px solid #dee2e6!important;
}
button.wordlist-download-btn{
  padding: unset !important
}
</style>
