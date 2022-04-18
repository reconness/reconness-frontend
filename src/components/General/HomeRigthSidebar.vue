<template>
  <div class="col-12 col-lg-3 col-xll-2">
    <div class="right-sidebar target-item-home overflow-auto">
        <div class="d-flex justify-content-between">
          <div class="float-left">
        <h5>TARGET LIST</h5></div>
        <div class="dropdown float-right">
       <p class="float-left">Sort by</p>
  <button class="btn btn-light sort-button" title="Sort by" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
   <i class="material-icons" >sort</i>
  </button>
  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button" v-on:click="orderByNameDesc()">Name</button>
    <button class="dropdown-item" type="button" v-on:click="orderByCalendar()">Last Added</button>
  </div>
        </div>
        </div>
        <div v-for="item of getLasTenTargets" :key="item.id" class="info-box homerigthsidebar-infobox rounded-corners  homerigthsidebar-targets-spaces">
          <span v-bind:style ="{background: 'linear-gradient(135deg,'+item.primaryColor+' '+ '0%,' + item.secondaryColor + ' ' + '100%) 0% 0% no-repeat padding-box'}"  class="info-box-icon icons-color">
            <BullseyeArrowIco/>
          </span>
          <div class="info-box-content">
          <span class="info-box-text domain-names-target">
          <router-link :to="{ name: 'TargetDetail', params: {id: item.id, targetName: item.name} }"  class="text-dark" >{{item.name}}</router-link>
          <span  class="material-icons float-right vert" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">more_vert</span>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
            <a href="#" class="color-blue" data-toggle="modal" data-target="#message-box-modal">
            <button class="dropdown-item" @click="updateConfirm($event, item.name)" :data-id="item.id" :data-name="item.name" type="button">Delete</button>
            </a>
          </div>
          </span>
            <span class="domain-names-list text-truncate">
              <span  class="material-icons float-left mt-1 font-size-15"> chevron_right </span>
             <small>Root domains: {{item.rootDomains.length}}</small>
            </span>
          </div><!-- /.info-box-content -->
        </div><!-- /.info-box -->
      </div><!-- /.targets-list-home -->
      <Confirmation :valueName = selectedTargetName ></Confirmation>
    </div>
</template>
<script>
import BullseyeArrowIco from '@/components/Icons/BullseyeArrowIco.vue'
import Confirmation from '@/components/Target/TargetConfirmationV2.vue'
import { mapState, mapGetters, mapMutations } from 'vuex'
import { TargetMixin } from '@/mixins/TargetMixin'
export default {
  name: 'HomeRigthSidebar',
  components: {
    BullseyeArrowIco,
    Confirmation
  },
  mixins: [TargetMixin],
  data: function () {
    return {
      selectedTargetName: ''
    }
  },
  computed: {
    ...mapState('target', ['targetListStore']),
    ...mapGetters('target', ['getLasTenTargets'])
  },
  methods: {
    ...mapMutations('general', ['addEntityToDelete']),
    orderByNameDesc: function () {
      return this.targetListStore.sort(this.$compareNamesDesc)
    },
    orderByCalendar: function () {
      return this.targetListStore.sort(this.$orderByCalendarSplitting)
    },
    updateConfirm ($event, itemName) {
      this.prepareToDelete($event, this.$agentType.TARGET)
      return this.$store.commit('agent/confirm', { name: itemName, route: 'target' })
    }
  }
}
</script>
<style scoped>
  div.homerigthsidebar-infobox div.info-box-content{
    width: 30%;
  }
  .homerigthsidebar-infobox{
    width:90%;
    margin: auto;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    min-height: 76px !important;
  }
  .homerigthsidebar-infobox-icon{
    font-size: 32px;
    color: #FFFFFF;
  }
  .sidebar-targets-title{
    padding-left: 10px;
    margin-top: 20px;
    /*font: normal normal bold 24px/32px Poppins;*/
  }
  .target-item-home .info-box.homerigthsidebar-infobox.rounded-corners{
    box-shadow: none;
    overflow-x: hidden;
  }

  .homerigthsidebar-targets-spaces{
    margin-top: 30px;
  }
  .justify-content-between {
    padding: 20px 20px 0px 20px;
}
.sort-button{
    background-color:rgba(230, 233, 237, 0.24);
    border-color: rgba(221, 221, 221, 0.03);
    color: #161616;
    padding: 0.1rem;
    border-radius: 0.4rem;
    height: 26px;
    width: 24px;
   margin-left: 10px;
}

.justify-content-between h5{
  font-size: 24px;
  font-weight: bold;
}
.justify-content-between p{
  font-size: 14px;
  color: #161616;
}

.justify-content-between .material-icons{
  font-size: 20px;
  }

@media (max-width: 768px) {
  .right-sidebar{
    width: 100%;
    margin-top: 20px;
    position: relative;
  }
}

@media (min-width: 769px) {
  .right-sidebar{
    width: 95%;
    margin-top: 0;
    height: 100%;
    position: absolute;
  }
}

@media (max-width: 1100px) {
.justify-content-between h5{
  font-size: 18px;
}
.justify-content-between p{
display: none;
}
}

@media (max-width: 1400px) {
  .justify-content-between h5{
    font-size: 15px;
  }
  .domain-names-target {
    font-size: 13px;
  }
}

.btn-red{
    color: #fff;
    background-color: #ff4545;
    border-color: #ff4545;
    box-shadow: none;
}
.btn-cancel{
  color: rgb(216, 106, 106);
}

@media (min-width: 2560px) {
.col-xll-2 {
    -ms-flex: 0 0 16.666667%;
    flex: 0 0 16.666667%;
    max-width: 16.666667%;
}
.text-truncate {
    max-width: 200px;
  }
}

@media (min-width: 1441px) and (max-width: 2559px) {
  .text-truncate {
    max-width: 150px;;
  }
}

@media (min-width: 1160px) and (max-width: 1440px) {
    .text-truncate {
    max-width: 130px;
  }
}

@media (max-width: 1160px) {
.text-truncate {
    max-width: 103px;
}
}

@media (max-width: 768px) {
.text-truncate {
    max-width: 250px;
}
}
@media (min-width: 320px) and (max-width: 425px) {
  .text-truncate {
    max-width: 200px;
  }
}

@media (max-width: 320px) {
  .text-truncate {
    max-width: 160px;
  }
}
.domain-names-list .material-icons{
font-size: 17px;
}
.info-box >span{
  width: 56px;
  height: 56px;
  border-radius: 13px;
  box-shadow: 3px 12px 23px #eae9e9;
  min-width: 40px !important;
  opacity: 1;
}
</style>
