<template>
<div class="col-12">
  <div class="modal fade" id="wordlistModal" tabindex="-1" role="dialog" aria-labelledby="wordlistModal" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
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
              <div class="form-group mt-4">
                <div class="custom-file">
                  <input type="file" accept=".txt" id="wordlists-files" @change="getFileMetadata" :placeholder="'Add ' + this.getWordListEnumByType.description + ' Files'"/>
                  <label v-if="loadedFileName === ''" class="agent-mini-color-gray wordlists-files-label ligth-gray-background custom-file-label" for="wordlists-files">Add {{this.getWordListEnumByType.description }} Files</label>
                  <label v-else class="agent-mini-color-gray wordlists-files-label ligth-gray-background custom-file-label" for="wordlists-files">{{loadedFileName}}</label>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="wordlist-files-container wordlist-container-size border px-2 py-1 mt-2">
                <div class="row">
                  <div class="col-2 border-bottom pb-1"><span class="font-weight-bold">Filename</span></div>
                  <div class="col-2 border-left border-right border-bottom pb-1"><span class="font-weight-bold">Count</span></div>
                  <div class="col-1 border-right border-bottom pb-1"><span class="font-weight-bold">Size</span></div>
                  <div class="col-4 border-right border-bottom pb-1"><span class="font-weight-bold">Path</span></div>
                  <div class="col-3 border-bottom pb-1"><span class="font-weight-bold">Actions</span></div>
                </div>
                <div class=" wordlist-data-container overflow-y-auto w-100">
                <div class="row pt-3" v-for="wordlistItem of getWordListByType" :key="wordlistItem.id">
                  <div class="col-2"><span class="text-wrap break-word">{{wordlistItem.filename}}</span></div>
                  <div class="col-2"><span class="text-wrap break-word">{{wordlistItem.count}}</span></div>
                  <div class="col-1"><span class="text-wrap break-word">{{this.$niceBytes(wordlistItem.size)}}</span></div>
                  <div class="col-4"><span class="text-break break-word">{{wordlistItem.path}}/{{wordlistItem.filename}}</span></div>
                  <div class="col-3">
                    <div class="d-flex justify-content-between">
                      <button @click="downloadWordlist" type="button" :data-id="wordlistItem.id" :data-name="wordlistItem.filename" class="wordlist-btn-size blue-text agent-border btn create-agent-buttons-main-action rounded wordlist-download-btn">Download</button>
                      <button @click="removeWordList" type="button" :data-id="wordlistItem.id" :data-name="wordlistItem.filename" class="wordlist-btn-size red-text agent-border btn create-agent-buttons-main-action rounded">Delete</button>
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
</div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import jQuery from 'jquery'
export default {
  name: 'WordList',
  data: function () {
    return {
      selectedPill: this.$wordlistType.SUBDOMAIN_ENUM.id,
      loadedFileName: '',
      selectedIdWordlist: -1,
      selectedFileName: ''
    }
  },
  computed: {
    ...mapState('wordlist', ['wordlists']),
    ...mapState('general', ['notificationMessageActionSelected']),
    ...mapState('auth', ['authentication_token']),
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
        ).then(success => {
          this.resetData()
        })
      }
    }
  },
  mounted () {
    this.loadWordlist()
  },
  methods: {
    ...mapMutations('wordlist', ['removeWordListItem', 'addWordListItem']),
    ...mapMutations('general', ['updateNotificationMessageDescription', 'updateNotificationMessageActionSelected']),
    ...mapActions('wordlist', ['loadWordlist', 'uploadWordListFile', 'removeWordListFromServer', 'downloadWordListFile']),
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
        const fileSize = self.$niceBytes(textfile.size)
        self.loadedFileName = textfile.name
        const wordlistFormData = new FormData()
        wordlistFormData.append('file', textfile)
        self.upload(wordlistFormData).then(success => {
          if (success) {
            const wordListItem = {
              id: -1,
              filename: textfile.name,
              size: fileSize,
              type: self.selectedPill,
              count: self.countLinesFromText(reader.result),
              path: ''
            }
            self.addWordListItem(wordListItem)
          }
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
