<template>
  <div class="row">
    <div class="col-12 col-sm-6">
      <div class="row">
        <div class="col-12">
            <!-- IMAGEN -->
        </div>
        <div class="col-12">
          <hr/>
          <p>Set an option to set where you are going to run your pipeline</p>
          <div class="form-group">
            <div class="custom-control custom-checkbox form-check">
              <input class="form-check-input custom-control-input" type="checkbox" id="agent_customCheckbox4">
              <label class="form-check-label custom-control-label" for="agent_customCheckbox4">Target</label>
            </div>
            <div class="custom-control custom-checkbox form-check">
              <input class="form-check-input custom-control-input" type="checkbox" id="agent_customCheckbox5">
              <label class="form-check-label custom-control-label" for="agent_customCheckbox5">RootDomain</label>
            </div>
            <div class="custom-control custom-checkbox form-check">
              <input class="form-check-input custom-control-input" type="checkbox" id="agent_customCheckbox6">
              <label class="form-check-label custom-control-label" for="agent_customCheckbox6">Subdomain</label>
            </div>
          </div>
        </div>
        <div class="col-12">
          <p class="float-right blue-text mb-1">Search</p>
          <input :readonly="$store.state.fromDetailsLink" class="form-control target-input-borders">
        </div>
        <div class="col-12">
          <div class="p-2 w-100 mt-5 d-inline-flex settings-location border-top border-bottom">
            <span class="material-icons blue-text">control_point</span>
            <p class="ml-1 mb-0 blue-text">Add another location</p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-6">
      <div class="row">
        <div class="col-12">
          <h5>Schedule</h5>
        </div>
        <div class="col-12 col-lg-6">
          <!-- HORARIO -->
          <div class="event-settings d-flex flex-column">
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
            <div class="mt-5">
              <hr style="border: 0.5px solid #F1F3F5;"/>
              <span class="float-left">Repeat</span>
              <span class="float-right">Daily</span>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <!-- EVENTO -->
          <div class="w-100 h-100 d-flex justify-content-center align-items-center add-event">
              <span class="blue-text">Add Event</span>
          </div>
        </div>
        <div class="col-12">
          <div class="d-flex justify-content-center align-items-center mt-4">
            <Calendar v-model="event_date" :inline="true"/>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import Calendar from 'primevue/calendar'
export default {
  name: 'PipelinesFormStepSettings',
  data: function () {
    return {
      event_date: null
    }
  },
  components: {
    Calendar
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
  }
  .wizard-setting-switch-label::after{
    background-color: #ffffff !important;
  }
  .wizard-setting-switch{
    width: 32px;
  }
  .card-custom{
 background: #ffffff 0% 0% no-repeat padding-box;
 box-shadow: 22px 22px 13px #d6d6d6;
 border-radius: 12px;
 opacity: 1;
}
</style>
