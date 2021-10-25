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
              <span class="pills-border-gray p-1 rounded">Subdomains Enum</span>
              <span class="pills-border-gray p-1 ml-4 rounded">Directories Enum</span>
              <span class="pills-border-gray p-1 ml-4 rounded">DNS Resolvers</span>
            </div>
            <div class="col-12">
              <input type="file" id="wordlists-files" placeholder="Add Subdomain Enum Files"/>
            </div>
            <div class="col-12">
              <div class="wordlist-files-container wordlist-container-size border px-2 py-1 mt-3">
                <div class="row">
                  <div class="col-2 border-bottom pb-1"><span class="font-weight-bold">Filename</span></div>
                  <div class="col-2 border-left border-right border-bottom pb-1"><span class="font-weight-bold">Count</span></div>
                  <div class="col-1 border-right border-bottom pb-1"><span class="font-weight-bold">Size</span></div>
                  <div class="col-4 border-right border-bottom pb-1"><span class="font-weight-bold">Path</span></div>
                  <div class="col-3 border-bottom pb-1"><span class="font-weight-bold">Actions</span></div>
                </div>
                <div class="row pt-3" v-for="wordlistItem of wordlists" :key="wordlistItem.id">
                  <div class="col-2"><span>{{wordlistItem.filename}}</span></div>
                  <div class="col-2"><span>{{wordlistItem.count}}</span></div>
                  <div class="col-1"><span>{{wordlistItem.size}}</span></div>
                  <div class="col-4"><span class="text-break">{{wordlistItem.path}}/{{wordlistItem.filename}}</span></div>
                  <div class="col-3">
                    <div class="d-flex justify-content-between">
                      <button type="button" class="wordlist-btn-size blue-text agent-border btn create-agent-buttons-main-action rounded">Edit</button>
                      <button type="button" class="wordlist-btn-size red-text agent-border btn create-agent-buttons-main-action rounded">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div><!-- /.row -->
        </div>
        <div class="border-top-none modal-footer">
          <button type="button" class="blue-text agent-border btn create-agent-buttons-main-action">Accept</button>
          <button type="button" class="red-text agent-border btn create-agent-buttons-main-action" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'WordList',
  computed: {
    ...mapState('wordlist', ['wordlists']),
    ...mapGetters('wordlist', ['getWordListByType'])
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

    .invalid {
        color: red;
    }
input[type="file"]{
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow:hidden;
  position:absolute;
  z-index: -1;
}

label[for='uploadimage']{
  transition: all .5s;
  cursor: pointer;
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
  width: 80px;
  height: 40px;
}
</style>
