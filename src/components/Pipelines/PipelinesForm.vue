<template>
  <div class="row">
    <div class="col-12">
      <div class="modal fade" id="pipelinesModalFormSettings"  tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-lg modal-dialog-top modal-dialog-centered modal-xl" role="document">
          <div class="modal-content agent-containers">
            <div class="modal-header border-0">
              <blockquote class="blockquote-style">
                <h5>Pipeline Settings</h5>
              </blockquote>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-12">
                  <PipelinesFormStepSettings @pipelineSettingsDone="updatePipelineSettings" />
                </div>
              </div>
            </div>
            <div class="modal-footer border-0 d-flex justify-content-between flex-row-reverse">
              <div>
               <button @click="save(this.routeName)" class="blue-text agent-border btn create-agent-buttons-main-action mr-2" :disabled="locationsContainNonExist() && !validators.blank.locations">DONE</button>
               <button type="button" class="red-text agent-border btn create-agent-buttons-main-action" data-dismiss="modal" @click="close()">CANCEL</button>
              </div>
              <div>
                <p  v-if="validators.exist.locations && !validators.blank.locations" :class="{invalid: validators.exist.locations}" class="ml-5">You must select a location from the list</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jQuery from 'jquery'
import { mapState, mapGetters, mapMutations } from 'vuex'
import PipelinesFormStepSettings from '@/components/Pipelines/PipelinesFormStepSettings.vue'
export default {
  name: 'PipelinesForm',
  components: {
    PipelinesFormStepSettings
  },
  props: {
    routeName: String
  },
  data: function () {
    return {
      settings_data: null,
      pipeline: {
        name: 'My pipeline',
        date: new Date(),
        statusRun: this.$entityStatus.FINISHED,
        agent: [],
        id: -1,
        locations: [],
        calendars: [],
        startingAgent: -1,
        type: this.$agentType.TARGET
      },
      enableDoneBtn: false,
      validators: {
        blank: {
          locations: false
        },
        exist: {
          locations: false
        }
      }
    }
  },
  computed: {
    ...mapState('pipelines', ['autoId']),
    ...mapGetters('agent', ['getAgentById']),
    ...mapGetters('target', ['filterTargetsByName', 'filterRootDomainsByName', 'filterSubDomainsByName']),
    isFromPipelineDetails () {
      return this.routeName === 'PipelineDetail'
    },
    isDoneButtonEnabled: function () {
      if (this.areEventsActivated()) {
        if (this.settings_data.locations[0].entity.entityId) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    }
  },
  watch: {
    settings_data: {
      handler: function () {
        this.enableDoneBtn = this.isDoneButtonEnabled
        this.pipeline.locations = this.transformPipelineLocations(this.settings_data.locations)
        this.locationsContainNonExist()
        this.pipeline.type = this.settings_data.type
        this.pipeline.date = this.settings_data.date
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations('pipelines', ['addPipeline', 'updatePipeline', 'setIdPipeline']),
    save () {
      this.pipeline.calendars = this.settings_data.calendars.slice()
      this.pipeline.locations = this.transformPipelineLocations(this.settings_data.locations)
      if (this.settings_data.editable) {
        if (!this.locationsContainNonExist() && !this.validators.blank.locations) {
          this.pipeline.id = this.settings_data.id
          this.pipeline.name = this.settings_data.name
          this.pipeline.date = this.settings_data.date
          this.pipeline.statusRun = this.settings_data.statusRun
          this.pipeline.agent = this.settings_data.agent
          this.pipeline.type = this.settings_data.type
          this.removeBlankLocations()
          this.updatePipeline(this.pipeline)
          this.setIdPipeline(-1)
          jQuery('#pipelinesModalFormSettings').modal('hide')
        }
      } else if (!this.locationsContainNonExist() && !this.validators.blank.locations) {
        this.removeBlankLocations()
        this.addPipeline(this.pipeline)
        this.pipeline.name = this.$defaultPipelineName()
        this.$router.push({ name: 'PipelineDetail', params: { pipelineName: this.pipeline.name } })
        jQuery('#pipelinesModalFormSettings').modal('hide')
        this.pipeline.agent = []
      }
    },
    updatePipelineSettings (e) {
      this.settings_data = e
    },
    transformPipelineLocations (locationsWrongStructure) {
      const newLocations = []
      locationsWrongStructure.forEach(element => {
        if (element.entity.entityId) {
          newLocations.push(element.entity)
        }
      })
      return newLocations
    },
    close () {
      this.setIdPipeline(-1)
      this.resetPipeline()
    },
    areEventsActivated () {
      if (!this.settings_data || this.settings_data.calendars.length === 0) {
        return false
      }
      const founded = this.settings_data.calendars.findIndex(item => item.enabled === true)
      if (founded !== -1) {
        return true
      }
      return false
    },
    locationsContainBlank () {
      const resultFilter = this.pipeline.locations.filter(
        item => this.$validateIsBlank(item.name) === true
      )
      const result = resultFilter.length > 0
      this.validators.blank.locations = result
      return result
    },
    locationsContainNonExist () {
      let founded = false
      let index = 0
      while (index < this.pipeline.locations.length && !founded) {
        const entityName = this.pipeline.locations[index].name
        founded = this.filterEntityByName(entityName)
        index++
      }
      this.validators.exist.locations = founded
      return founded
    },
    removeBlankLocations () {
      for (let index = 1; index < this.pipeline.locations.length; index++) {
        if (this.$validateIsBlank(this.pipeline.locations[index].name)) {
          this.pipeline.locations.splice(index, 1)
          index = index - 1
        }
      }
    },
    resetPipeline () {
      this.settings_data.name = 'My pipeline'
      this.settings_data.agent = []
      this.settings_data.startingAgent = -1
      this.settings_data.id = -1
      this.settings_data.statusRun = this.$entityStatus.FINISHED
    },
    searchTargetByName (targetName) {
      let founded = false
      let result = []
      result = this.filterTargetsByName({ name: targetName, strict: true }).length > 0
      if (!result && !this.validators.blank) {
        founded = true
      }
      return founded
    },
    searchRootDomainByName (rootDomainName) {
      let founded = false
      let result = []
      result = this.filterRootDomainsByName({ name: rootDomainName, strict: true }).length > 0
      if (!result && !this.validators.blank) {
        founded = true
      }
      return founded
    },
    searchSubDomainByName (subDomainName) {
      let founded = false
      let result = []
      result = this.filterSubDomainsByName({ name: subDomainName, strict: true }).length > 0
      if (!result && !this.validators.blank) {
        founded = true
      }
      return founded
    },
    filterEntityByName (entityName) {
      let founded = false
      if (this.settings_data.type === this.$agentType.TARGET) {
        founded = this.searchTargetByName(entityName)
      } else if (this.settings_data.type === this.$agentType.ROOTDOMAIN) {
        founded = this.searchRootDomainByName(entityName)
      } else {
        founded = this.searchSubDomainByName(entityName)
      }
      return founded
    }
  }
}
</script>
<style scoped>
.text-custom{
    color: #fff;
    font-size: 15px;
}
.small-text{
  color:rgb(228, 229, 230);
  font-size: 80%;
  opacity: 0.8;
}
.info-box{
 border-radius: 18px;
 box-shadow: 13px 19px 41px #d6d6d6;
 opacity: 1;
}
.info-box span svg {
    fill: #ffffff;
    width: 25px;
    height: 25px;
}
.blockquote-style {
  background: none;
  border-left: 4px solid;
  margin:0;
  opacity: 1;
  padding: 0px;
  padding-left: .5rem !important;
  color: #00B1FF;
}
blockquote > h5{
    color: #000;
    margin-bottom: auto;
    opacity: 1;
}
.style-border-item{
    border: 3px solid #fff;
}
.isLinkDisabled {
  color: currentColor;
  pointer-events: none;
  opacity: 0.5 !important;
  cursor: not-allowed;
}
.modal-header{
  border-bottom: 1px solid #f1f3f5;
  opacity: 1;
}
.modal-footer{
  border-top: 1px solid #f1f3f5;
  opacity: 1;
}
.card-tools > a{
  font-size: 14px;
  opacity: 1;
}
.card-tools .border-right{
  border-right: 1px solid #f1f3f5!important;
}
.info-box {
transition: all .25s ease;
width:100%;
}
.info-box:hover {
-webkit-transform:scale(1.25);
-moz-transform:scale(1.25);
-ms-transform:scale(1.25);
-o-transform:scale(1.25);
transform:scale(1.05);
transition: all .25s ease;
}
.agent-mini-agent-details{
  width: fit-content;
}
.agent-border {
    border: 1px solid #e3e5e8;
    border-radius: 12px;
    width: 90px;
    height: 47px;
}
</style>
