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
                    <div class="col-3">
                      <div class="ml-3 pipe-setting-ico_container">
                        <span class="info-box-icon abs-center icon-gray pb-2"><RocketIco/></span>
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
          <div class="pipeline_spacing">
          <p class="float-right blue-text mb-1 cursor-pointer">Search</p>
          <div id="input-searcher-container">
            <AutoComplete v-for="(item, index) in settings_data.locations" :key="item.id" v-model="item.entity" :suggestions="this.filteredEntities" @keyup="filterEntities" field="name" :data-index="index" @focus="updateType"/>
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
          <!-- Inicio Carrusel -->
          <div class="col-12 pipeline_spacing">
            <div id="carouselPipelineControls" class="carousel slide w-100" data-ride="carousel" data-interval="false" data-wrap="false">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <div class="row">
                    <div class="col-12 col-lg-6">
                      <div class="event-settings d-flex flex-column">
                        <span id="close-icon-pipeline-setting" class="material-icons cursor-pointer">close</span>
                        <div class="d-inline-flex justify-content-between">
                          <div class="d-inline-flex">
                            <span class="material-icons">calendar_today</span><span class="ml-1">Wednesday 2</span>
                          </div>
                          <div class="form-group">
                            <div class="custom-control custom-switch wizard-setting-switch">
                              <input type="checkbox" class="custom-control-input" id="customSwitch1">
                              <label class="custom-control-label wizard-setting-switch-label" for="customSwitch1"></label>
                            </div>
                          </div>
                        </div>
                        <div class="d-inline-flex">
                          <span class="material-icons">query_builder</span><span class="ml-1">03:30pm</span>
                        </div>
                        <div class="mt-4">
                          <hr style="border: 0.5px solid #F1F3F5;"/>
                          <span class="float-left" id="pipeline-setting-repeat">Repeat</span>
                          <div class="form-group">
                            <select class="form-control float-right">
                              <option>None</option>
                              <option>Hourly</option>
                              <option>Daily</option>
                              <option>Monthly</option>
                              <option>Yearly</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-lg-6">
                      <div class="event-settings d-flex flex-column">
                        <span id="close-icon-pipeline-setting" class="material-icons cursor-pointer">close</span>
                        <div class="d-inline-flex justify-content-between">
                          <div class="d-inline-flex">
                            <span class="material-icons">calendar_today</span><span class="ml-1">Wednesday 2</span>
                          </div>
                          <div class="form-group">
                            <div class="custom-control custom-switch wizard-setting-switch">
                              <input type="checkbox" class="custom-control-input" id="customSwitch1">
                              <label class="custom-control-label wizard-setting-switch-label" for="customSwitch1"></label>
                            </div>
                          </div>
                        </div>
                        <div class="d-inline-flex">
                          <span class="material-icons">query_builder</span><span class="ml-1">03:30pm</span>
                        </div>
                        <div class="mt-4">
                          <hr style="border: 0.5px solid #F1F3F5;"/>
                          <span class="float-left" id="pipeline-setting-repeat">Repeat</span>
                          <div class="form-group">
                            <select class="form-control float-right">
                              <option>None</option>
                              <option>Hourly</option>
                              <option>Daily</option>
                              <option>Monthly</option>
                              <option>Yearly</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-item">
                  <div class="row">
                    <div class="col-12 col-lg-6">
                      <div class="w-100 h-100 d-flex justify-content-center align-items-center add-event add-event-height">
                          <span class="blue-text cursor-pointer">Add Event</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
          <!-- Fin Carrusel -->
          <!-- <div class="col-12 col-lg-1 m-auto">
            <span  class="material-icons blue-text"> chevron_left </span>
          </div> -->
          <!-- <div class="col-12 col-lg-5">
            <div class="event-settings d-flex flex-column">
              <span id="close-icon-pipeline-setting" class="material-icons cursor-pointer">close</span>
              <div class="d-inline-flex justify-content-between">
                <div class="d-inline-flex">
                  <span class="material-icons">calendar_today</span><span class="ml-1">Wednesday 2</span>
                </div>
                <div class="form-group">
                  <div class="custom-control custom-switch wizard-setting-switch">
                    <input type="checkbox" class="custom-control-input" id="customSwitch1">
                    <label class="custom-control-label wizard-setting-switch-label" for="customSwitch1"></label>
                  </div>
                </div>
              </div>
              <div class="d-inline-flex">
                <span class="material-icons">query_builder</span><span class="ml-1">03:30pm</span>
              </div>
              <div class="mt-4">
                <hr style="border: 0.5px solid #F1F3F5;"/>
                <span class="float-left" id="pipeline-setting-repeat">Repeat</span>
                <div class="form-group">
                  <select class="form-control float-right">
                    <option>None</option>
                    <option>Hourly</option>
                    <option>Daily</option>
                    <option>Monthly</option>
                    <option>Yearly</option>
                  </select>
                </div>
              </div>
            </div>
          </div> -->
          <!-- <div class="col-12 col-lg-5">
            <div class="w-100 h-100 d-flex justify-content-center align-items-center add-event">
                <span class="blue-text cursor-pointer">Add Event</span>
            </div>
          </div>
          <div class="col-12 col-lg-1 m-auto">
            <span  class="material-icons blue-text"> chevron_right </span>
          </div> -->
          <div class="col-12 pipeline_spacing">
            <div class="d-flex justify-content-center align-items-center mt-4">
              <Calendar v-model="settings_data.event_date" :inline="true" :minDate="new Date()"/>
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
export default {
  name: 'PipelinesFormStepSettings',
  data: function () {
    return {
      settings_data: {
        event_date: null,
        locations: [
          {
            entity: {
              name: 'candiman.com',
              entityType: 1,
              entityId: 1
            }
          },
          {
            entity: {
              name: 'pacha.com',
              entityType: 2,
              entityId: 2
            }
          }
        ],
        calendars: [
          {
            enabled: false,
            time: '',
            date: ''
          }
        ]
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
    AutoComplete
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
    loadEntityData (e) {}
  },
  computed: {
    ...mapGetters('target', ['filterTargetsByName', 'filterRootDomainsByName', 'filterSubDomainsByName'])
  },
  created: function () {
    if (this.settings_data.locations.length === 0) {
      this.addLocation({})
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
    height: 203px !important;
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
#pipeline-setting-repeat{
    bottom: 17px;
    position: absolute;
}
#close-icon-pipeline-setting{
    position: relative;
    top: -7px;
    left: 91%;
    color: #00B1FF;
}
#input-searcher-container{
  /* max-height: 168px;
  overflow-y: scroll; */
  width: 100%;
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
</style>
