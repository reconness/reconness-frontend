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
                  <div class="d-flex justify-content-between ml-3 mt-2 mr-2">
                    <h1 class="domain-names-list">My Pipeline</h1>
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
                <input :disabled="$store.state.fromDetailsLink" class="form-check-input custom-control-input" type="radio" id="agent_customCheckbox1" :value="this.$agentType.TARGET" v-model="generalLocationType">
                <label class="form-check-label custom-control-label" for="agent_customCheckbox1">Target</label>
                </div>
                <div class="custom-control custom-radio form-check">
                <input :disabled="$store.state.fromDetailsLink" class="form-check-input custom-control-input" type="radio" id="agent_customCheckbox2" :value="this.$agentType.ROOTDOMAIN" v-model="generalLocationType">
                <label class="form-check-label custom-control-label" for="agent_customCheckbox2">RootDomain</label>
                </div>
                <div class="custom-control custom-radio form-check">
                <input :disabled="$store.state.fromDetailsLink" class="form-check-input custom-control-input" type="radio" id="agent_customCheckbox3" :value="this.$agentType.SUBDOMAIN" v-model="generalLocationType">
                <label class="form-check-label custom-control-label" for="agent_customCheckbox3">Subdomain</label>
                </div>
            </div>
        </div>
        </div>
        <div class="col-12">
          <div class="pipeline_spacing locations-container">
          <p class="float-right blue-text mb-1">Search</p>
            <div v-for="(item, index) in settings_data.locations" :key="item.id" class="input-searcher-container">
              <AutoComplete v-model="item.entity" :suggestions="this.filteredEntities" @keyup="filterEntities" field="name" :data-index="index" @focus="updateType" @blur="sendPipelineSettings"/>
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
            <div id="carouselPipelineControls" class="carousel slide w-100" data-ride="carousel" data-interval="false" data-wrap="false">
              <div class="carousel-inner">
                <div class="carousel-item" :class="{active:index==loadParsedCalendarsToCarousel.length-1}" v-for="(item, index) in loadParsedCalendarsToCarousel" :key="item">
                  <div class="row">
                    <div class="col-12 col-lg-6" v-if="loadParsedCalendarsToCarousel[index][0]">
                      <div class="event-settings d-flex flex-column">
                        <span id="close-icon-pipeline-setting" class="material-icons cursor-pointer" :data-index-x="index" :data-index-y="0" @click="removeEvent">close</span>
                        <div class="d-inline-flex justify-content-between">
                          <div class="d-inline-flex">
                            <span class="material-icons">calendar_today</span><span class="ml-1">{{ this.$getWeekDay(loadParsedCalendarsToCarousel[index][0].date.getDay()) + ' ' + loadParsedCalendarsToCarousel[index][0].date.getDate() }}</span>
                          </div>
                          <div class="form-group">
                            <div class="custom-control custom-switch wizard-setting-switch">
                              <input type="checkbox" class="custom-control-input" id="customSwitch1" v-model="settings_data.calendars[index].enabled">
                              <label class="custom-control-label wizard-setting-switch-label" for="customSwitch1"></label>
                            </div>
                          </div>
                        </div>
                        <div class="d-inline-flex">
                          <Calendar v-model="settings_data.calendars[index].time" :inline="true" hourFormat="12" :timeOnly="true"/>
                        </div>
                        <div>
                          <hr style="border: 0.5px solid #F1F3F5;"/>
                          <span class="float-left pipeline-setting-repeat">Repeat</span>
                          <div class="form-group">
                            <select class="form-control float-right" v-model="settings_data.calendars[index].repeat">
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
                        <span id="close-icon-pipeline-setting" class="material-icons cursor-pointer" :data-index-x="index" :data-index-y="1" @click="removeEvent">close</span>
                        <div class="d-inline-flex justify-content-between">
                          <div class="d-inline-flex">
                            <span class="material-icons">calendar_today</span><span class="ml-1">{{ this.$getWeekDay(loadParsedCalendarsToCarousel[index][1].date.getDay()) + ' ' + loadParsedCalendarsToCarousel[index][1].date.getDate() }}</span>
                          </div>
                          <div class="form-group">
                            <div class="custom-control custom-switch wizard-setting-switch">
                              <input type="checkbox" class="custom-control-input" id="customSwitch1">
                              <label class="custom-control-label wizard-setting-switch-label" for="customSwitch1"></label>
                            </div>
                          </div>
                        </div>
                        <div class="d-inline-flex">
                          <Calendar v-model="settings_data.calendars[index+1].time" :inline="true" hourFormat="12" :timeOnly="true"/>
                        </div>
                        <div>
                          <hr style="border: 0.5px solid #F1F3F5;"/>
                          <span class="float-left pipeline-setting-repeat">Repeat</span>
                          <div class="form-group">
                            <select class="form-control float-right" v-model="settings_data.calendars[index].repeat">
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
                <li data-target="#carouselPipelineControls" :data-slide-to="index" :class="{active:index==loadParsedCalendarsToCarousel.length-1}" class="rounded-circle" v-for="(item, index) in loadParsedCalendarsToCarousel" :key="item"></li>
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
import AutoComplete from 'primevue/autocomplete'
import MinusCircleIco from '@/components/Icons/MinusCircleIco.vue'
export default {
  name: 'PipelinesFormStepSettings',
  data: function () {
    return {
      event_date: null,
      settings_data: {
        locations: [],
        calendars: []
      },
      generalLocationType: 1,
      entityNameSearchData: '',
      filteredEntities: []
    }
  },
  components: {
    Calendar,
    RocketIco,
    FileImportIco,
    AutoComplete,
    MinusCircleIco
  },
  emits: {
    pipelineSettingsDone: null
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
    filterEntities: function (e) {
      if (this.generalLocationType === this.$agentType.TARGET) {
        this.filteredEntities = this.filterTargetsByName(e.target.value)
      } else if (this.generalLocationType === this.$agentType.ROOTDOMAIN) {
        this.filteredEntities = this.filterRootDomainsByName(e.target.value)
      } else {
        this.filteredEntities = this.filterSubDomainsByName(e.target.value)
      }
    },
    updateType: function (e) {
      const index = e.currentTarget.getAttribute('data-index')
      if (this.settings_data.locations[index].entity.entityType > -1) {
        this.generalLocationType = this.settings_data.locations[index].entity.entityType
      }
    },
    onChangeDate: function (e) {
      if (this.settings_data.calendars[this.settings_data.calendars.length - 1] && this.event_date) {
        this.settings_data.calendars[this.settings_data.calendars.length - 1].date = this.event_date
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
    }
  },
  computed: {
    ...mapGetters('target', ['filterTargetsByName', 'filterRootDomainsByName', 'filterSubDomainsByName']),
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
    }
  },
  watch: {
    settings_data: {
      handler: function () {
        this.sendPipelineSettings()
      },
      deep: true
    }
  },
  created: function () {
    if (this.settings_data.locations.length === 0) {
      this.addLocation({})
      this.addCalendarEvent({})
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
    bottom: 13%;
    position: absolute;
}
#close-icon-pipeline-setting{
    position: relative;
    top: -7px;
    left: 91%;
    color: #00B1FF;
}
.input-searcher-container{
  max-height: 168px;
}
.dropdown-menu{
  display: inherit !important;
  width: 100%;
  position: relative;
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
  top: -41px;
  right: -89%;
  width: 25px;
}
input.p-autocomplete-input.p-inputtext.p-component {
  padding-right: 6%;
}
span.pipe-circle-minus-properties svg{
  fill: #ff4545
}
.locations-container{
  max-height: 358px;
  overflow-y: auto;
}
div.event-settings hr{
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
