<template>
<div class="col-12">
  <div class="modal fade" id="wordlistModal" tabindex="-1" role="dialog" aria-labelledby="wordlistModal" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
      <div class="modal-content agent-containers">
        <div class="modal-header remove-flex">
          <div class="row">
            <div class="col-12">
              <div class="row">
                <div class="col-12">
                  <div class="d-flex">
                    <div class="d-flex align-items-center">
                      <span class="agent-name-input flex-fill pl-2">Wordlist</span>
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
              <span @click="setSubdomainEnumSelected" class="pills-border-gray p-2 rounded cursor-pointer" :class="{'box-shadow': isSubdomainEnumSelected, 'background-color-white': isSubdomainEnumSelected}">Subdomains Enum</span>
              <span @click="setDirectoryEnumSelected" class="pills-border-gray p-2 ml-4 rounded cursor-pointer" :class="{'box-shadow': isDirectoryEnumSelected, 'background-color-white': isDirectoryEnumSelected}">Directories Enum</span>
              <span @click="setDnsResolverSelected" class="pills-border-gray p-2 ml-4 rounded cursor-pointer" :class="{'box-shadow': isDnsResolverSelected, 'background-color-white': isDnsResolverSelected}">DNS Resolvers</span>
            </div>
            <div class="col-12">
              <div class="form-group mt-4 d-flex align-items-center">
                <div class="custom-file wordlist-file-input">
                  <input type="file" accept=".txt" id="wordlists-files" @click="resetInputFile" @change="getFileMetadata" :placeholder="'Add ' + this.getWordListEnumByType.description + ' Files'"/>
                  <label v-if="loadedFileName === ''" class="agent-mini-color-gray wordlists-files-label ligth-gray-background custom-file-label" for="wordlists-files">Add {{this.getWordListEnumByType.description }} Files</label>
                  <label v-else class="agent-mini-color-gray wordlists-files-label ligth-gray-background custom-file-label" for="wordlists-files">{{loadedFileName}}</label>
                </div>
                <SpinnerCircle addCss="blue-text spinner-circle-size ml-3" :show="isBackgroundProcessRunning"/>
              </div>
            </div>
            <div class="col-12">
              <div class="wordlist-files-container wordlist-container-size border px-2 py-1 mt-2">
                <div class="row">
                  <div class="col-2 border-bottom pb-1"><span class="font-weight-bold">Filename</span></div>
                  <div class="col-1 border-left border-right border-bottom pb-1"><span class="font-weight-bold">Count</span></div>
                  <div class="col-1 border-right border-bottom pb-1"><span class="font-weight-bold">Size</span></div>
                  <div class="col-6 border-right border-bottom pb-1"><span class="font-weight-bold">Path</span></div>
                  <div class="col-2 border-bottom pb-1"><span class="font-weight-bold">Actions</span></div>
                </div>
                <div class=" wordlist-data-container overflow-y-auto w-100">
                <div class="row pt-3" v-for="wordlistItem of getWordListByType" :key="wordlistItem.id">
                  <div class="col-2"><span class="text-wrap break-word">{{wordlistItem.filename}}</span></div>
                  <div class="col-1"><span class="text-wrap break-word">{{wordlistItem.count}}</span></div>
                  <div class="col-1"><span class="text-wrap break-word">{{this.niceBytes(wordlistItem.size)}}</span></div>
                  <div class="col-6"><span class="text-break break-word">{{wordlistItem.path}}</span></div>
                  <div class="col-2">
                    <div>
                      <span title="Download" data-toggle="tooltip" @click="downloadWordlist" :data-id="wordlistItem.id" :data-name="wordlistItem.filename" data-placement="bottom" class="blue-text border-icos-border btn create-agent-buttons-main-action rounded wordlist-download-btn material-icons">download</span>
                      <span @click="openWordListFileContentAndUpdateStatePath" data-toggle="modal" data-target="#wordlist-file-content-edition" :data-id="wordlistItem.id" :data-name="wordlistItem.filename">
                        <span v-if="isWordListFileSizeGreaterThan(parseInt(wordlistItem.size))" title="Edit" data-toggle="tooltip" data-placement="bottom" class="m-1 blue-text border-icos-border btn create-agent-buttons-main-action rounded wordlist-download-btn material-icons">edit</span>
                      </span>
                      <span title="Delete" data-toggle="tooltip" data-placement="bottom" class="m-1 border-icos-border trash-btn" :data-id="wordlistItem.id" :data-name="wordlistItem.filename" @click="removeWordList">
                        <TrashCanIco class="icons-wordlistitems-margin fill-with-red cursor-pointer trash-size"/>
                      </span>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div><!-- /.row -->
        </div>
        <div class="border-top-none modal-footer">
          <button type="button" class="blue-text agent-border btn create-agent-buttons-main-action" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  <WordlistFileContentEdition/>
</div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import jQuery from 'jquery'
import { TargetMixin } from '@/mixins/TargetMixin'
import WordlistFileContentEdition from '@/components/Agent/WordlistFileContentEdition'
import TrashCanIco from '@/components/Icons/TrashCanIco'
import SpinnerCircle from '@/components/General/SpinnerCircle.vue'
export default {
  name: 'WordList',
  components: {
    WordlistFileContentEdition,
    TrashCanIco,
    SpinnerCircle
  },
  data: function () {
    return {
      selectedPill: this.$wordlistType.SUBDOMAIN_ENUM.id,
      loadedFileName: '',
      selectedIdWordlist: -1,
      selectedFileName: '',
      isBackgroundProcessRunning: false
    }
  },
  mixins: [TargetMixin],
  computed: {
    ...mapState('wordlist', ['wordlists']),
    ...mapState('general', ['notificationMessageActionSelected']),
    ...mapState('auth', ['authentication_token']),
    ...mapGetters('wordlist', ['niceBytes']),
    isSubdomainEnumSelected () {
      return this.selectedPill === this.$wordlistType.SUBDOMAIN_ENUM.id
    },
    isDirectoryEnumSelected () {
      return this.selectedPill === this.$wordlistType.DIRECTORIES_ENUM.id
    },
    isDnsResolverSelected () {
      return this.selectedPill === this.$wordlistType.DNS_RESOLVERS.id
    },
    getWordListByType () {
      return this.wordlists.filter(item => item.type === this.selectedPill)
    },
    getWordListEnumByType () {
      if (this.isSubdomainEnumSelected) {
        return this.$wordlistType.SUBDOMAIN_ENUM
      } else if (this.isDirectoryEnumSelected) {
        return this.$wordlistType.DIRECTORIES_ENUM
      } else {
        return this.$wordlistType.DNS_RESOLVERS
      }
    }
  },
  watch: {
    notificationMessageActionSelected: function (value) {
      if (value) {
        this.removeWordListFromServer(
          {
            codeType: this.selectedPill,
            filename: this.selectedFileName,
            id: this.selectedIdWordlist
          }
        ).then(response => {
          if (response.status) {
            this.resetData()
          } else {
            this.updateOperationStatus(this.$entityStatus.FAILED, response.message)
          }
        })
      }
    },
    getWordListByType: {
      handler: function () {
        this.$nextTick(() => {
          this.enableTooltips()
        })
      },
      deep: true
    }
  },
  mounted () {
    this.loadWordlist()
  },
  methods: {
    ...mapMutations('wordlist', ['removeWordListItem', 'addWordListItem', 'updateSelectedWordsContent', 'updateSelectedWordListPath']),
    ...mapMutations('general', ['updateNotificationMessageDescription', 'updateNotificationMessageActionSelected']),
    ...mapActions('wordlist', ['loadWordlist', 'uploadWordListFile', 'removeWordListFromServer', 'downloadWordListFile', 'getWordListFileContent']),
    resetLoadedFileName () {
      this.loadedFileName = ''
    },
    setSubdomainEnumSelected () {
      this.selectedPill = this.$wordlistType.SUBDOMAIN_ENUM.id
      this.resetLoadedFileName()
    },
    setDirectoryEnumSelected () {
      this.selectedPill = this.$wordlistType.DIRECTORIES_ENUM.id
      this.resetLoadedFileName()
    },
    setDnsResolverSelected () {
      this.selectedPill = this.$wordlistType.DNS_RESOLVERS.id
      this.resetLoadedFileName()
    },
    checkIfNoFileHaveBeenSelectedAndResetLoadedName (e) {
      if (e.target.value.length === 0) {
        this.resetLoadedFileName()
      }
    },
    getFileMetadata (e) {
      this.checkIfNoFileHaveBeenSelectedAndResetLoadedName(e)
      this.loadTextFileAndCountLines(e.target.files[0])
    },
    loadTextFileAndCountLines (textfile) {
      const reader = new FileReader()
      const self = this
      reader.onload = function () {
        self.isBackgroundProcessRunning = true
        self.loadedFileName = textfile.name
        const wordlistFormData = new FormData()
        wordlistFormData.append('file', textfile)
        self.upload(wordlistFormData).then(response => {
          if (response.status) {
            const fileSize = response.data.size
            const wordListItem = {
              id: -1,
              filename: textfile.name,
              size: fileSize,
              type: self.selectedPill,
              count: response.data.count,
              path: response.data.path
            }
            self.addWordListItem(wordListItem)
          }
          self.isBackgroundProcessRunning = false
        })
      }
      reader.readAsText(textfile)
    },
    countLinesFromText (text) {
      let nLines = 1
      for (let index = 0; index < text.length; index++) {
        if (text[index] === '\n') {
          nLines++
        }
      }
      return nLines
    },
    removeWordList (e) {
      this.selectedIdWordlist = Number(e.currentTarget.getAttribute('data-id'))
      this.selectedFileName = e.currentTarget.getAttribute('data-name')
      const notificationMessageDesc = 'Are you sure to remove the file: <span class="font-weight-semibold"> ' + this.selectedFileName + ' </span>'
      this.updateNotificationMessageDescription(notificationMessageDesc)
      jQuery('#message-box-notification-modal').modal()
    },
    resetData: function () {
      this.updateNotificationMessageActionSelected(false)
      this.selectedIdWordlist = -1
    },
    upload (fileFormData) {
      return this.uploadWordListFile(
        {
          wordListCode: this.selectedPill,
          formData: fileFormData
        }).then(response => {
        if (response.status) {
          this.updateOperationStatus(this.$entityStatus.SUCCESS, this.$message.successMessageForFileUpload)
        } else {
          this.updateOperationStatus(this.$entityStatus.FAILED, response.message)
        }
        return response
      })
    },
    downloadWordlist (e) {
      this.selectedFileName = e.currentTarget.getAttribute('data-name')
      this.downloadWordListFile({
        codeType: this.selectedPill,
        filename: this.selectedFileName
      }).then(response => {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]))
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', this.selectedFileName)
        document.body.appendChild(fileLink)
        fileLink.click()
      })
    },
    openWordListFileContentAndUpdateStatePath (e) {
      this.openWordListFileContent(e)
      const wordlistId = parseInt(e.currentTarget.getAttribute('data-id'))
      this.updateSelectedWordListPath(wordlistId)
    },
    openWordListFileContent (e) {
      jQuery('#wordlistModal').modal('hide')
      jQuery('#wordlist-file-content-edition').modal('hide')
      const wordlistData = {
        filename: e.currentTarget.getAttribute('data-name'),
        codeType: this.selectedPill
      }
      this.getWordListFileContent(wordlistData)
    },
    isWordListFileSizeGreaterThan (valueInBytes) {
      return valueInBytes < 5000000
    },
    enableTooltips () {
      jQuery('[data-toggle="tooltip"]').tooltip()
    },
    resetInputFile (e) {
      e.target.value = null
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
.border-icos-border{
  border: 1px solid #F1F3F5;
}
.trash-btn{
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.icons-wordlistitems-margin{
  margin: 0.375rem 0.75rem;
}
.wordlist-file-input{
  width: 95%
}
.spinner-circle-size{
  height: 20px;
  width: 20px;
}
</style>
