<template>
  <div class="row">
    <div class="col-12 col-lg-6">
      <div class="general-data-section">
      <div class="row">
        <div class="col-12">
            <div class="pipeline_diagram">
              <span  class="material-icons main_reconnes_text-color mt-1 float-left chevron_right"> chevron_right </span>
              <div class="card card-custom-pipeline w-auto mb-3">
                <div class="p-2">
                  <div v-if="showInputPipelineName" class="d-flex ml-3 mt-2 mr-2">
                    <h1 v-if="this.settings_data.name === ''" class="domain-names-list" @click="showInputPipelineName = false;">My Pipeline</h1>
                    <h1 v-else class="domain-names-list" @click="showInputPipelineName = false;">{{ settings_data.name }}</h1>
                    <span style="font-size: 18px;" class="material-icons float-right cursor-pointer" @click="showInputPipelineName = false;"> open_in_new</span>
                  </div>
                  <div v-else class="d-flex ml-3 mt-2 mr-2">
                    <input style="font-size: 18px; width: 75%;" v-model="settings_data.name" v-bind:class="{ 'bordered-input-name-withfocus': isPencilVisibleAndClick}"
                      class="form-control agent-placeholder agent-name-input" placeholder="My Pipeline"
                      @focus="isPencilVisible=true" @blur="onBlurExecute" @mouseover="isPencilVisible=true"
                      @mouseleave="verifyPencilStatus" @click="isPencilVisible=true; isPencilVisibleAndClick=true"
                      @keyup.enter="isPencilVisible=false; isPencilVisibleAndClick=false; editPipeline()" />
                    <span v-show="isPencilVisible" class="material-icons blue-text pencil-align-main mt-2">edit</span>
                  </div>
                  <div class="row pl-2 mt-2">
                    <div class="col-9 p-0">
                      <div class="card card-custom-container  pr-0 d-flex" style="position: relative;">
                        <img src="@/assets/pipeline_setting_diagram.png" class="m-2"/>
                      </div>
                    </div>
                    <div class="col-3 m-auto">
                      <div class="ml-3 pipe-setting-ico_container">
                        <span class="info-box-icon d-flex justify-content-start icon-gray pb-2"><RocketIco/></span>
                        <span>Run</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div class="col-12">
          <div class="pipeline_spacing">
            <hr/>
            <p>Set an option to set where you are going to run your pipeline</p>
            <div class="form-group">
                <div class="custom-control custom-radio form-check">
                <input :disabled="this.$store.state.agent.fromDetailsLink" class="form-check-input custom-control-input" type="radio" id="agent_customCheckbox1" :value="this.$agentType.TARGET" v-model="settings_data.type">
                <label class="form-check-label custom-control-label" for="agent_customCheckbox1">Target</label>
                </div>
                <div class="custom-control custom-radio form-check">
                <input :disabled="this.$store.state.agent.fromDetailsLink" class="form-check-input custom-control-input" type="radio" id="agent_customCheckbox2" :value="this.$agentType.ROOTDOMAIN" v-model="settings_data.type">
                <label class="form-check-label custom-control-label" for="agent_customCheckbox2">RootDomain</label>
                </div>
                <div class="custom-control custom-radio form-check">
                <input :disabled="this.$store.state.agent.fromDetailsLink" class="form-check-input custom-control-input" type="radio" id="agent_customCheckbox3" :value="this.$agentType.SUBDOMAIN" v-model="settings_data.type">
                <label class="form-check-label custom-control-label" for="agent_customCheckbox3">Subdomain</label>
                </div>
            </div>
        </div>
        </div>
        <div class="col-12">
          <div class="pipeline_spacing locations-container">
          <p class="float-right blue-text mb-1">Search</p>
            <div v-for="(item, index) in settings_data.locations" :key="item.entity.id" class="input-searcher-container">
              <AutoCompleteLocations :selectedType="settings_data.type" v-model="item.entity.name"/>
              <div style="height: 0;">
                <span v-if="index>0" @click="removeLocation" class="pipe-circle-minus-properties cursor-pointer" :data-index="index">
                  <MinusCircleIco/>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="p-2 w-100 mt-5 d-inline-flex settings-location border-top border-bottom">
            <div class="pipeline_spacing w-100 d-flex">
              <FileImportIco />
              <p class="ml-1 mb-0 blue-text cursor-pointer" @click="addLocation({})">Add another location</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    <div class="col-12 col-lg-6">
      <div class="schedule_section">
        <div class="row">
          <div class="col-12 pipeline_spacing">
            <h5>Schedule</h5>
          </div>
          <div class="col-12 pipeline_spacing">
            <div id="carouselPipelineControls" class="carousel slide w-100" data-ride="false" data-interval="false" data-pause="true" data-keyboard="false" data-wrap="false">
              <div class="carousel-inner">
                <div class="carousel-item" :class="{active:index==carouselIndexComputed}" v-for="(item, index) in loadParsedCalendarsToCarousel" :key="item">
                  <div class="row">
                    <div class="col-12 col-lg-6" v-if="loadParsedCalendarsToCarousel[index][0]">
                      <div class="event-settings d-flex flex-column">
                        <span class="material-icons cursor-pointer blue-text close-icon-pipeline-setting" :data-index-x="index" :data-index-y="0" @click="removeEvent">close</span>
                        <span class="calendar-edit cursor-pointer" :data-index-x="index" :data-index-y="0" @click="selectEvent">
                        <CalendarEditIco :style="'fill: #ff4545'" v-if="index === eventSelectionX && 0 === eventSelectionY"/>
                        <CalendarEditIco :style="'fill: #00B1FF'" v-else/>
                        </span>
                        <div class="d-inline-flex justify-content-between">
                          <div class="d-inline-flex">
                            <span class="material-icons">calendar_today</span><span class="ml-1">{{ this.$getWeekDay(loadParsedCalendarsToCarousel[index][0].date.getDay()) + ' ' + loadParsedCalendarsToCarousel[index][0].date.getDate() }}</span>
                          </div>
                          <div class="form-group">
                            <div class="custom-control custom-switch wizard-setting-switch">
                              <input type="checkbox" class="custom-control-input" :id="'customSwitch'+index+0" v-model="settings_data.calendars[index*2].enabled">
                              <label class="custom-control-label wizard-setting-switch-label" :for="'customSwitch'+index+0"></label>
                            </div>
                          </div>
                        </div>
                        <div class="d-inline-flex">
                          <Calendar v-model="settings_data.calendars[index*2].time" :inline="true" hourFormat="12" :timeOnly="true"/>
                        </div>
                        <div>
                          <hr style="border: 0.5px solid #F1F3F5;"/>
                          <span class="float-left pipeline-setting-repeat">Repeat</span>
                          <div class="form-group">
                            <select class="form-control float-right" v-model="settings_data.calendars[index*2].repeat">
                              <option value="0">None</option>
                              <option value="1">Hourly</option>
                              <option value="2">Daily</option>
                              <option value="3">Monthly</option>
                              <option value="4">Yearly</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-lg-6" v-if="loadParsedCalendarsToCarousel[index][1]">
                      <div class="event-settings d-flex flex-column">
                        <span class="material-icons close-icon-pipeline-setting cursor-pointer blue-text" :data-index-x="index" :data-index-y="1" @click="removeEvent">close</span>
                        <span class="calendar-edit cursor-pointer" v-if="index === eventSelectionX && eventSelectionY === 1" :data-index-x="index" :data-index-y="1" @click="selectEvent">
                        <CalendarEditIco :style="'fill: #ff4545'"/>
                        </span>
                        <span class="calendar-edit cursor-pointer" v-else :data-index-x="index" :data-index-y="1" @click="selectEvent">
                        <CalendarEditIco :style="'fill: #00B1FF'"/>
                        </span>
                        <div class="d-inline-flex justify-content-between">
                          <div class="d-inline-flex">
                            <span class="material-icons">calendar_today</span><span class="ml-1">{{ this.$getWeekDay(loadParsedCalendarsToCarousel[index][1].date.getDay()) + ' ' + loadParsedCalendarsToCarousel[index][1].date.getDate() }}</span>
                          </div>
                          <div class="form-group">
                            <div class="custom-control custom-switch wizard-setting-switch">
                              <input type="checkbox" class="custom-control-input" :id="'customSwitch'+index" v-model="settings_data.calendars[index*2+1].enabled">
                              <label class="custom-control-label wizard-setting-switch-label" :for="'customSwitch'+index"></label>
                            </div>
                          </div>
                        </div>
                        <div class="d-inline-flex">
                          <Calendar v-model="settings_data.calendars[index*2+1].time" :inline="true" hourFormat="12" :timeOnly="true"/>
                        </div>
                        <div>
                          <hr style="border: 0.5px solid #F1F3F5;"/>
                          <span class="float-left pipeline-setting-repeat">Repeat</span>
                          <div class="form-group">
                            <select class="form-control float-right" v-model="settings_data.calendars[index*2+1].repeat">
                             <option value="0">None</option>
                              <option value="1">Hourly</option>
                              <option value="2">Daily</option>
                              <option value="3">Monthly</option>
                              <option value="4">Yearly</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-lg-6" v-else>
                      <div class="w-100 h-100 d-flex justify-content-center align-items-center add-event add-event-height">
                          <span class="blue-text cursor-pointer" @click="addCalendarEvent({})">Add Event</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-item" v-if="loadParsedCalendarsToCarousel[loadParsedCalendarsToCarousel.length-1][1]">
                  <div class="row">
                    <div class="col-12 col-lg-6">
                      <div class="w-100 h-100 d-flex justify-content-center align-items-center add-event add-event-height">
                          <span class="blue-text cursor-pointer" @click="addCalendarEvent({})">Add Event</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ol class="carousel-indicators pipeline-settings-control-nav mt-3">
                <li data-target="#carouselPipelineControls" :data-slide-to="index" :class="{active:index==carouselIndexComputed}" class="rounded-circle" v-for="(item, index) in loadParsedCalendarsToCarousel" :key="item"></li>
                <li data-target="#carouselPipelineControls" :data-slide-to="loadParsedCalendarsToCarousel.length" v-if="loadParsedCalendarsToCarousel[loadParsedCalendarsToCarousel.length-1][1]" class="rounded-circle"></li>
              </ol>
            </div>
            <a class="carousel-control-prev pipeline-settings-nav" href="#carouselPipelineControls" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next pipeline-settings-nav" href="#carouselPipelineControls" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
          <div class="col-12 pipeline_spacing">
            <div class="d-flex justify-content-center align-items-center mt-1">
              <Calendar v-model="event_date" :inline="true" :minDate="new Date()" @date-select="onChangeDate(event_date)"/>
            </div>
          </div>
        </div>
    </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Calendar from 'primevue/calendar'
import RocketIco from '@/components/Icons/RocketIco.vue'
import FileImportIco from '@/components/Icons/PlusCircleIco.vue'
import AutoCompleteLocations from '@/components/General/AutoCompleteLocations'
import MinusCircleIco from '@/components/Icons/MinusCircleIco.vue'
import CalendarEditIco from '@/components/Icons/CalendarEditIco.vue'
import jQuery from 'jquery'
export default {
  name: 'PipelinesFormStepSettings',
  components: {
    Calendar,
    RocketIco,
    FileImportIco,
    AutoCompleteLocations,
    MinusCircleIco,
    CalendarEditIco
  },
  data: function () {
    return {
      event_date: null,
      showInputPipelineName: true,
      settings_data: {
        locations: [],
        calendars: [],
        editable: false,
        id: -1,
        name: '',
        date: new Date(),
        statusRun: this.$entityStatus.RUNNING,
        agent: [],
        type: this.$agentType.TARGET
      },
      entityNameSearchData: '',
      typedLocation: '',
      isPencilVisibleAndClick: false,
      isPencilVisible: false,
      carouselIndex: -1,
      locationOnFocusPos: 0,
      eventSelectionX: -1,
      eventSelectionY: -1
    }
  },
  computed: {
    ...mapGetters('target', ['filterTargetsByName', 'filterRootDomainsByName', 'filterSubDomainsByName']),
    ...mapGetters('pipelines', ['getPipelineById']),
    loadParsedCalendarsToCarousel: function () {
      const carouselItems = []
      let carouselPairItems = []
      for (let index = 0; index < this.settings_data.calendars.length; index++) {
        carouselPairItems.push({
          enabled: this.settings_data.calendars[index].enabled,
          time: this.settings_data.calendars[index].time,
          date: this.settings_data.calendars[index].date
        })
        if (this.$isOddNumber(index + 1)) {
          carouselItems.push(carouselPairItems)
        } else {
          carouselPairItems = []
        }
      }
      return carouselItems
    },
    loadSelectedPipeline () {
      const id = this.$store.getters['pipelines/getIdPipeline']
      return this.$store.getters['pipelines/getPipelineById'](parseInt(id))
    },
    carouselIndexComputed () {
      if (this.carouselIndex !== -1) {
        return this.carouselIndex
      }
      return this.loadParsedCalendarsToCarousel.length - 1
    },
    editCalendarBtnColor () {
      if (this.eventSelectionX >= 0) {
        return 'fill: #ff4545'
      } else {
        return 'fill: #00B1FF'
      }
    },
    eventPositionOnViewList () {
      if (this.eventSelectionX >= 0) {
        if (this.eventSelectionY === 0) {
          return this.eventSelectionX * 2
        } else {
          return this.eventSelectionX * 2 + 1
        }
      } else {
        if (this.eventSelectionY === 1) {
          return 1
        }
        return this.settings_data.calendars.length - 1
      }
    }
  },
  emits: {
    pipelineSettingsDone: null
  },
  watch: {
    settings_data: {
      handler: function () {
        this.sendPipelineSettings()
      },
      deep: true
    },
    loadSelectedPipeline: function (value) {
      if (value !== undefined) {
        this.settings_data.locations.splice(0)
        value.locations.forEach(element => {
          this.settings_data.locations.push({
            entity: {
              name: element.name,
              entityType: element.entityType,
              entityId: element.entityId
            }
          })
        })
        this.settings_data.calendars.splice(0)
        value.calendars.forEach(element => {
          this.settings_data.calendars.push(element)
        })
        this.settings_data.editable = true
        this.settings_data.id = value.id
        this.settings_data.name = value.name
        this.settings_data.date = value.date
        this.settings_data.statusRun = value.statusRun
        this.settings_data.agent = value.agent
        this.settings_data.type = value.type
      } else {
        this.settings_data.editable = false
        this.resetPipelineForm()
      }
    }
  },
  created: function () {
    if (this.settings_data.locations.length === 0) {
      this.addLocation({})
    }
    if (this.settings_data.calendars.length === 0) {
      this.addCalendarEvent({})
    }
  },
  mounted: function () {
    const self = this
    jQuery('#carouselPipelineControls').on('slide.bs.carousel', function (slide) {
      self.carouselIndex = slide.to
    })
  },
  methods: {
    addLocation: function (item) {
      if (Object.entries(item).length === 0) {
        this.settings_data.locations.push(
          {
            entity: {
              name: '',
              entityType: -1,
              entityId: -1
            }
          }
        )
      }
    },
    addCalendarEvent: function (item) {
      if (Object.entries(item).length === 0) {
        this.settings_data.calendars.push(
          {
            enabled: false,
            time: new Date(),
            date: new Date(),
            repeat: 0
          }
        )
      }
    },
    updateType: function (e) {
      const index = e.currentTarget.getAttribute('data-index')
      if (this.settings_data.locations[index].entity.entityType > -1) {
        this.settings_data.type = this.settings_data.locations[index].entity.entityType
      }
      this.locationOnFocusPos = index
    },
    onChangeDate: function (e) {
      if (this.event_date) {
        this.settings_data.calendars[this.eventPositionOnViewList].date = this.event_date
      }
    },
    sendPipelineSettings: function (e) {
      this.$emit('pipelineSettingsDone', this.settings_data)
    },
    removeEvent: function (e) {
      const closeIconIndexX = parseInt(e.currentTarget.getAttribute('data-index-x'))
      const closeIconIndexY = parseInt(e.currentTarget.getAttribute('data-index-y'))
      if (closeIconIndexX > 0) {
        if (closeIconIndexY === 0) {
          this.settings_data.calendars.splice(closeIconIndexX * 2, 1)
        } else {
          this.settings_data.calendars.splice(closeIconIndexX * 2 + 1, 1)
        }
      } else {
        if (closeIconIndexY === 1) {
          this.settings_data.calendars.splice(1, 1)
        }
      }
    },
    removeLocation: function (e) {
      const locationIndex = parseInt(e.currentTarget.getAttribute('data-index'))
      if (parseInt(locationIndex) > 0) {
        this.settings_data.locations.splice(locationIndex, 1)
      }
    },
    resetPipelineForm: function (e) {
      this.settings_data.locations.splice(0)
      this.addLocation({})
      this.settings_data.calendars.splice(0)
      this.addCalendarEvent({})
      this.settings_data.name = ''
      this.carouselIndex = -1
      this.settings_data.agent = []
    },
    onBlurExecute () {
      this.isPencilVisible = false
      this.isPencilVisibleAndClick = false
      this.showInputPipelineName = true
    },
    verifyPencilStatus () {
      if (this.isPencilVisibleAndClick) {
        this.isPencilVisible = true
      } else {
        this.isPencilVisible = false
      }
    },
    editPipeline () {
      this.showInputPipelineName = true
    },
    setTypedLocation (e) {
      this.typedLocation = e.target.value
    },
    setLocationIndex (e) {
      this.locationOnFocusPos = parseInt(e.currentTarget.getAttribute('data-index'))
    },
    selectEvent (e) {
      const eventSelectionX = parseInt(e.currentTarget.getAttribute('data-index-x'))
      const eventSelectionY = parseInt(e.currentTarget.getAttribute('data-index-y'))
      if (this.eventSelectionX >= 0) {
        this.eventSelectionX = -1
        this.eventSelectionY = -1
      } else {
        this.eventSelectionX = eventSelectionX
        this.eventSelectionY = eventSelectionY
      }
    }
  }
}
</script>
<style scoped>
  .event-settings{
    border: 2px solid #00B1FF;
    padding: 8px;
    border-radius: 12px;
  }
  .add-event{
    border: 1px solid #F1F3F5;
    padding: 8px;
    border-radius: 12px;
    height: 232px !important;
  }
  .wizard-setting-switch-label::after{
    background-color: #ffffff !important;
  }
  .wizard-setting-switch{
    width: 32px;
  }
.card-custom-pipeline{
 background: #ffffff 0% 0% no-repeat padding-box;
 box-shadow: 9px 28px 33px #0000001F;
 border-radius: 12px;
 opacity: 1;
}
.info-box-icon svg{
  width: 25px;
  height: 25px;
  opacity: 1;
}
h1{
  font-size: 18px;
  opacity: 1;
  color: #000000;
}
.card-custom-container{
  background: #f5f6f7 0% 0% no-repeat padding-box;
  border-radius: 12px;
  opacity: 1;
}
.pipeline_diagram{
  width: 71%;
  margin: auto;
}
.schedule_section{
  border-radius: 24px;
  box-shadow: 9px 28px 33px #0000001F;
}
.pipeline_spacing{
  padding-left: 10%;
  padding-right: 10%;
}
.settings-location svg{
  fill: #00B1FF;
}
.pipeline_diagram span.chevron_right{
  margin-top: 15px !important;
}
.schedule_section select{
    border: 0;
    outline: 0;
    width: 44%;
}
span.pipeline-setting-repeat{
    bottom: 20px;
    position: absolute;
}
.close-icon-pipeline-setting{
    position: relative;
    top: -7px;
    left: 91%;
}
span.p-autocomplete{
  margin-top: 7px;
}
a.carousel-control-prev.pipeline-settings-nav, a.carousel-control-next.pipeline-settings-nav{
  margin: auto;
  height: fit-content;
  width: 10% !important;
  opacity: 1;
}
a.pipeline-settings-nav span.carousel-control-prev-icon{
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%2300a1ff' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E");
}
a.pipeline-settings-nav span.carousel-control-next-icon{
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%2300a1ff' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E");
}
 ol.carousel-indicators.pipeline-settings-control-nav{
  position: relative !important;
  margin-bottom: 0;
}
.carousel-indicators li{
    background-color: #00B1FF;
}
.carousel-indicators .active{
    background-color: #00B1FF;
}
.carousel-indicators li {
  width: 15px;
  height: 15px;
  border-radius: 100%;
}
span.p-calendar.p-component.p-inputwrapper.p-calendar-timeonly{
  width: 100% !important;
}
span.pipe-circle-minus-properties{
  position: relative;
  z-index: 2;
  display: block;
  line-height: 2.375rem;
  text-align: center;
  top: -46px;
  right: -92%;
  width: 25px;
}
input.p-autocomplete-input.p-inputtext.p-component {
  padding-right: 6%;
}
span.pipe-circle-minus-properties svg{
  fill: #ff4545
}
.locations-container{
  max-height: 192px;
  overflow-y: auto;
}
div.event-settings hr{
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.bordered-input-name-withfocus{
  border-top: 2px solid #00B1FF;
  border-right: 2px solid #00B1FF;
  border-bottom: 2px solid #00B1FF;
}
.pencil-align-main{
  font-size: 18px;
}
.calendar-edit svg{
  position: absolute;
  top: 2%;
  right: 15%;
}
</style>
