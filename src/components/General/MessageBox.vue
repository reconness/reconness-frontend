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
                      <p v-if="removeAll" class="question-title-text-width question-title-font-size question-title-font-color text-center font-weight-bold ">Are you sure you want to delete all {{this.getLowerNameOfEntityTypeDisplayed}}s?</p>
                      <p v-else-if="multipleItemsToDelete" class="question-title-text-width question-title-font-size question-title-font-color text-center font-weight-bold ">Are you sure you want to delete selected {{this.getLowerNameOfEntityTypeDisplayed}}s?</p>
                      <p v-else class="question-title-text-width question-title-font-size question-title-font-color text-center font-weight-bold ">Are you sure you want to delete selected {{this.getLowerNameOfEntityTypeDisplayed}}?</p>
                    </div>
                  </div>
                  <div class="col-12">
                    <hr class="mb-4"/>
                  </div>
                  <div class="col-12">
                    <div class="d-flex justify-content-center pl-2 pr-2">
                      <p v-if="multipleItemsToDelete"> Please, confirm typing <b>yes</b> before delete the selected items</p>
                      <p v-else>Please, confirm the name of the {{this.getLowerNameOfEntityTypeDisplayed}} <b>{{selectedName}}</b> before delete it</p>
                    </div>
                  </div>
                  <div class="col-12">
                    <input class="form-control zero-borders" v-model="nameTyped" :placeholder="entityTypeDisplayed.description + ' name'">
                  </div>
                </div>
                </div> <!-- /.modal-body -->
              <div class="modal-footer dialog-without-lines-footer d-flex justify-content-center">
                  <button type="button" :disabled="!isSelectedEntityNameEqualToTypedText" class="btn message-box-btn message-box-btn-accept-fontcolor" @click="removeEntities()">Delete</button>
                  <button type="button" class="btn message-box-btn message-box-btn-cancel-fontcolor" @click="clearReferences()" data-dismiss="modal">Cancel</button>
              </div> <!-- /.modal-footer dialog-without-lines-footer -->
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /#confirmation-modal -->
    </div>
</template>
<script>
import HelpIco from '@/components/Icons/HelpIco.vue'
import { TargetMixin } from '@/mixins/TargetMixin'
import jQuery from 'jquery'
import { mapMutations, mapState, mapActions } from 'vuex'
export default {
  name: 'MessageBox',
  components: {
    HelpIco
  },
  data () {
    return {
      nameTyped: ''
    }
  },
  mixins: [TargetMixin],
  computed: {
    ...mapState('target', ['entitiesToDelete', 'removeAll']),
    entityTypeDisplayed () {
      if (this.isOnTargetView || this.$isOnHomeView()) {
        return this.$entityTypeData.TARGET
      } else if (this.isOnTargetDetailView) {
        if (this.isNotEmpty && this.entitiesToRemoveContainArootDomain) {
          return this.$entityTypeData.ROOTDOMAIN
        }
        return this.$entityTypeData.TARGET
      } else if (this.$isOnRootDomainView()) {
        if (this.isNotEmpty && this.entitiesToRemoveContainAsubDomain) {
          return this.$entityTypeData.SUBDOMAIN
        }
        return this.$entityTypeData.ROOTDOMAIN
      } else if (this.$isOnAgentView()) {
        return this.$entityTypeData.AGENT
      } else if (this.$isOnSubDomainView()) {
        return this.$entityTypeData.SUBDOMAIN
      } else if (this.$isOnPipelineView()) {
        return this.$entityTypeData.PIPELINE
      } else if (this.$isOnUserManagementView()) {
        return this.$entityTypeData.USER
      }
      return ''
    },
    getLowerNameOfEntityTypeDisplayed () {
      let entityDescription = this.entityTypeDisplayed.description
      if (entityDescription) {
        entityDescription = entityDescription.toLowerCase()
      }
      return entityDescription
    },
    selectedName () {
      if (this.isSingleSelection) {
        return this.singleItemName
      }
      return ''
    },
    isSingleSelection () {
      return this.entitiesToDelete.length === 1
    },
    isNotEmpty () {
      return this.entitiesToDelete.length >= 1
    },
    singleItemName () {
      if (this.isNotEmpty) {
        return this.entitiesToDelete[0].name
      }
      return ''
    },
    isSelectedEntityNameEqualToTypedText () {
      if (this.multipleItemsToDelete) {
        return this.nameTyped === 'yes'
      } else {
        return this.nameTyped === this.selectedName
      }
    },
    getTargetName () {
      return this.$route.params.targetName
    },
    getRootDomainName () {
      return this.$route.params.rootdomainName
    },
    multipleItemsToDelete () {
      return this.entitiesToDelete.length > 1 || this.removeAll
    },
    entitiesToRemoveContainArootDomain () {
      return this.entitiesToDelete[0].type === this.$entityTypeData.ROOTDOMAIN.id
    },
    entitiesToRemoveContainAsubDomain () {
      return this.entitiesToDelete[0].type === this.$entityTypeData.SUBDOMAIN.id
    }
  },
  methods: {
    ...mapMutations('target', ['clearTargetEntitiesToDelete', 'clearRootDomainEntitiesToDelete', 'clearSubDomainEntitiesToDelete', 'updateTargetEliminationStatus', 'updateRootDomainEliminationStatus', 'clearReferencesToDelete', 'clearAllSubDomainEntitiesToDelete', 'updateRemoveAllOption']),
    ...mapActions('agent', ['clearAgentEntitiesToDelete']),
    ...mapActions('target', ['clearTargetEntitiesToDeleteToServer']),
    ...mapActions('pipelines', ['clearPipelineEntitiesToDelete']),
    ...mapActions('user', ['clearUserEntitiesToDelete']),
    removeEntities () {
      if (this.isOnTargetView || this.$isOnHomeView()) {
        this.clearTargetEntitiesToDeleteToServer().then(success => {
          if (success) {
            this.updateOperationStatus(this.$entityStatus.SUCCESS, this.$message.successMessageForTargetDeletion)
          } else {
            this.updateOperationStatus(this.$entityStatus.FAILED, this.$message.errorMessageForAllPurpose)
          }
        })
      } else if (this.isOnTargetDetailView) {
        if (this.isNotEmpty && this.entitiesToRemoveContainArootDomain) {
          this.clearRootDomainEntitiesToDelete({ targetName: this.getTargetName })
          this.updateOperationStatus(this.$entityStatus.SUCCESS, this.$message.successMessageForRootDomainDeletion)
        } else {
          this.clearTargetRedirectToTargetListAndUpdateOperationStatus()
        }
      } else if (this.$isOnAgentView()) {
        this.clearAgentEntitiesToDelete().then(success => {
          if (success) {
            this.updateOperationStatus(this.$entityStatus.SUCCESS, this.$message.successMessageForAgentDeletion)
          } else {
            this.updateOperationStatus(this.$entityStatus.FAILED, this.$message.errorMessageForAllPurpose)
          }
        })
      } else if (this.$isOnRootDomainView()) {
        if (this.isNotEmpty && this.entitiesToRemoveContainAsubDomain) {
          if (this.removeAll) {
            this.clearAllSubDomainEntitiesToDelete({ targetName: this.getTargetName, rootDomainName: this.getRootDomainName })
            this.updateRemoveAllOption(false)
          } else {
            this.clearSubDomainEntitiesToDelete({ targetName: this.getTargetName, rootDomainName: this.getRootDomainName })
            this.updateOperationStatus(this.$entityStatus.SUCCESS, this.$message.successMessageForSubDomainDeletion)
          }
        } else {
          this.clearRootdomainsRedirectToTargetDetailsAndUpdateOperationStatus()
        }
      } else if (this.$isOnSubDomainView()) {
        this.clearSubdomainsRedirectToRootDomainAndUpdateOperationStatus()
      } else if (this.$isOnPipelineView()) {
        this.clearPipelineEntitiesToDelete()
        this.updateOperationStatus(this.$entityStatus.SUCCESS, this.$message.successMessageForPipelineDeletion)
      } else if (this.$isOnUserManagementView()) {
        this.clearUserEntitiesToDelete()
        this.updateOperationStatus(this.$entityStatus.SUCCESS, this.$message.successMessageForUserDeletion)
      }
      this.clearInput()
      jQuery('#message-box-modal').modal('hide')
    },
    setWaitingStatusOnTargetEliminationStatusAfterSeconds () {
      const self = this
      setTimeout(
        function () {
          self.updateTargetEliminationStatus(
            self.$entityStatus.WAITING
          )
        },
        5000
      )
    },
    setWaitingStatusOnRootDomainEliminationStatusAfterSeconds () {
      const self = this
      setTimeout(
        function () {
          self.updateRootDomainEliminationStatus(
            self.$entityStatus.WAITING
          )
        },
        5000
      )
    },
    updateTargetEliminationStatusTemporarily (status) {
      if (this.isOnTargetView) {
        this.updateTargetEliminationStatus(status)
        this.setWaitingStatusOnTargetEliminationStatusAfterSeconds()
      }
    },
    updateRootDomainEliminationStatusTemporarily (status) {
      if (this.isOnTargetDetailView) {
        this.updateRootDomainEliminationStatus(status)
        this.setWaitingStatusOnRootDomainEliminationStatusAfterSeconds()
      }
    },
    processTarget () {
      if (this.$randomBooleanResult()) {
        this.updateTargetEliminationStatusTemporarily(
          this.$entityStatus.SUCCESS
        )
      } else {
        this.updateTargetEliminationStatusTemporarily(
          this.$entityStatus.FAILED
        )
      }
    },
    processRootDomain () {
      if (this.$randomBooleanResult()) {
        this.updateRootDomainEliminationStatusTemporarily(
          this.$entityStatus.SUCCESS
        )
      } else {
        this.updateRootDomainEliminationStatusTemporarily(
          this.$entityStatus.FAILED
        )
      }
    },
    clearInput () {
      this.nameTyped = ''
    },
    clearReferences () {
      this.clearReferencesToDelete()
      this.clearInput()
      if (this.removeAll) {
        this.updateRemoveAllOption(false)
      }
    },
    redirectToTargetsList () {
      this.$router.push({ name: 'Targets' })
    },
    redirectToTargetDetails: function () {
      const urlParameters = { targetName: this.getTargetName }
      this.$router.push({ name: 'TargetDetail', params: urlParameters })
    },
    redirectToRootDomainDetails: function () {
      const urlParameters = { targetName: this.getTargetName, rootdomainName: this.getRootDomainName }
      this.$router.push({ name: 'RootDomainDetails', params: urlParameters })
    },
    clearTargetRedirectToTargetListAndUpdateOperationStatus: function () {
      this.redirectToTargetsList()
      this.clearTargetEntitiesToDelete()
      this.updateOperationStatus(this.$entityStatus.SUCCESS, this.$message.successMessageForTargetDeletion)
    },
    clearSubdomainsRedirectToRootDomainAndUpdateOperationStatus: function () {
      this.clearSubDomainEntitiesToDelete({ targetName: this.getTargetName, rootDomainName: this.getRootDomainName })
      this.updateOperationStatus(this.$entityStatus.SUCCESS, this.$message.successMessageForSubDomainDeletion)
      this.redirectToRootDomainDetails()
    },
    clearRootdomainsRedirectToTargetDetailsAndUpdateOperationStatus: function () {
      this.clearRootDomainEntitiesToDelete({ targetName: this.getTargetName })
      this.redirectToTargetDetails()
      this.updateOperationStatus(this.$entityStatus.SUCCESS, this.$message.successMessageForRootDomainDeletion)
    }
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
