<template>
  <div>
  <!-- Contains navs-bar -->
  <NavBarTwoDetailTarget :TargetName = "Target.name" />
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <div class="container-fluid">
        <hr class="reset-margin-top" />
        <div class="content">
          <div class="row">
           <div class="col-12 col-lg-4">
           <div class="card card-style box border-dotted-1rem" v-bind:style ="{backgroundImage: 'linear-gradient(white, white),' + LinearGradient}">
              <div class="card-body p-0">
                <div class="row">
                  <div class="col-5 border-right">
                    <div class="row">
                      <div class="col-12">
                        <blockquote class="blockquote-style ml-3 mt-3" v-bind:style ="{borderImage:LinearGradient}">
                          <p> Root Domains</p>
                        </blockquote>
                      </div>
                      <div class="col-12 d-flex justify-content-center">
                        <div :title="import_message" data-toggle="tooltip" data-placement="bottom" class="target-details-import-files border-radios-8px w-50 d-flex flex-column align-items-center m-3 border pt-2 pb-2">
                          <FileImportIco />
                          <label for="export-target" class="mb-0 font-weight-normal"> Import </label>
                          <input type="file" id="export-target"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col mt-3 pr-3 ml-1 pl-1">
                    <div class="row">
                      <div class="col-12">
                        <ul class="list-unstyled min-height" >
                          <li v-for="item of Target.rootDomains" :key="item.id" class="d-flex justify-content-between align-items-center">
                            <div class="target-details-root-links">
                            <span  class="material-icons font-size-16px mt-1 black-text cursor-pointer"> chevron_right </span>
                            <router-link :to="{ name: 'RootDomainDetails', params: {idTarget: Target.id , id: item.id, targetName: Target.name, rootdomainName: item.root} }">
                              {{item.root}}
                            </router-link>
                            </div>
                            <span title="Delete" data-toggle="tooltip" data-placement="bottom" class="target-details-trashcan">
                              <TrashCanIco @click="prepareToDelete($event, this.$agentType.ROOTDOMAIN)" class="cursor-pointer trash-size" data-toggle="modal" data-target="#message-box-modal" :data-id="item.id" :data-name="item.root"/>
                            </span>
                          </li>
                        </ul>
                      </div> <!-- /.col-12 -->
                      <div class="col-12 border-top description-block mt-3">
                        <span class="cursor-pointer target-details-add-root" data-toggle="modal" data-target="#rootDomainInsertionForm">Add Root Domain</span>
                      </div>
                      <RootDomainInsertionForm :gradient="LinearGradient"/>
                    </div> <!-- /.row -->
                  </div> <!-- /.col mt-3 pr-3 ml-1 pl-1 -->
                </div>
              </div>
              </div>
            <div class="card card-style">
              <div class="card-body border-container m-3">
                <dl>
                  <dt>Bug Bounty Program URL</dt>
                  <dd>{{Target.bugBountyUrl}}</dd>
                  <dt v-if="Target.isPrivateProgram">Is a private program</dt>
                  <dt v-else>Is not a private program</dt>
                  <dt>In Scope</dt>
                  <dd>{{Target.inScope}}</dd>
                  <dt>Out of Scope</dt>
                  <dd>{{Target.outScope}}</dd>
                </dl>
              </div>
              </div>
            <TargetsHighestInteraction v-bind:style ="{background:LinearGradient}" :title= "'Subdomains with more numbers of directories'"></TargetsHighestInteraction>
            </div>
            <div class="col-12 col-lg-4">
            <DaysHighestInteraction v-bind:style ="{background:LinearGradient}"></DaysHighestInteraction>
              <div class="card card-style">
                <div class="card-body">
                <div class="d-flex justify-content-between mb-3">
                    <blockquote class="blockquote-style"  v-bind:style ="{borderImage:LinearGradient}">
                    <p class="card-text float-right">Latest new things found in the Root Domain</p>
                    </blockquote>
                    <i class="font-size-26px material-icons mt-2 icon-color-style gradient-style" v-bind:style ="{background:LinearGradient}">event</i>
                </div>
                <div v-for="novelty in getLatestThingsFoundedInRootDomains" :key="novelty" class="d-flex justify-content-between item-list">
                  <p class="mb-0"> New port opened<br> in subdomain <em> {{novelty.entity}} </em> </p>
                  <div class="d-flex flex-column text-right">
                    <span><span class="font-weight-bold">{{this.getMonthByDate(novelty.date)}}</span>{{novelty.date.getDate()}}</span>
                    <span class="text-style-opacity">{{novelty.date.getFullYear()}}</span>
                  </div>
                </div>
              </div>
              </div>
            </div>
            <div class="col-12 col-lg-4">
            <div class="card card-style">
              <div class="card-body">
                <div class="row">
                 <div class="col-9">
                   <blockquote class="blockquote-style"  v-bind:style ="{borderImage:LinearGradient}">
                    <p>Number of subdomains by each open ports</p>
                    </blockquote>
                </div>
                <div class="col-3">
                <span class = "number float-right background-clip-content-box-border-box" v-bind:style ="{backgroundImage: 'linear-gradient(white, white),' + LinearGradient}">
                <div v-bind:style ="{background:LinearGradient}">43</div>
                </span>
               </div>
               </div>
                <apexchart width="100%" height="270px"  type="bar" :options="optionsBar" :series="seriesBar"></apexchart>
              </div>
              </div>
            <div class="card card-style" v-bind:style ="{background:LinearGradient}">
              <div class="card-body">
                <div class="row align-items-center">
                <div class="col donut-legend link-color">
                 <p> All running targets </p>
                 <hr>
                 <p class="text-right">{{ getNumberOfRunningTargets }}</p>
                </div>
                <div class="col-7">
                <apexchart  height="200" type="radialBar" :options="chartOptions" :series="seriesRadial"></apexchart>
                </div>
              </div></div>
            </div>
            </div> <!-- /.row -->
          </div>
        </div>
      </div>
    </div>
    <BottomBar/>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import DaysHighestInteraction from '@/components/General/DaysHighestInteraction.vue'
import TargetsHighestInteraction from '@/components/General/TargetsHighestInteraction.vue'
import NavBarTwoDetailTarget from '@/components/Target/NavBarTwoDetailTarget.vue'
import FileImportIco from '@/components/Icons/FileImportIco.vue'
import TrashCanIco from '@/components/Icons/TrashCanIco.vue'
import { TargetMixin } from '@/mixins/TargetMixin'
import RootDomainInsertionForm from '@/components/Target/RootDomainInsertionForm.vue'
import jQuery from 'jquery'
import BottomBar from '@/components/General/BottomBar'
export default {
  name: 'TargetsDetailsView',
  components: {
    DaysHighestInteraction,
    TargetsHighestInteraction,
    NavBarTwoDetailTarget,
    FileImportIco,
    TrashCanIco,
    RootDomainInsertionForm,
    BottomBar
  },
  props: {
    id: String
  },
  data: function () {
    return {
      Target: Object,
      LinearGradient: String,
      idTargetLoadedWhenIdPropsIsNull: Number,
      import_message: 'Import a Root Domain from external file',
      optionsBar: {
        chart: {
          toolbar: { show: false },
          height: 350,
          type: 'bar'
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'top'
            },
            columnWidth: '20%',
            borderRadius: 200
          }
        },
        grid: {
          borderColor: 'transparent',
          row: { colors: ['transparent'] }
        },
        dataLabels: {
          enabled: true,
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#304758']
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'horizontal',
            shadeIntensity: 0.5,
            inverseColors: true,
            opacityFrom: 0,
            opacityTo: 1,
            colorStops: [
              {
                offset: 0,
                color: ' ',
                opacity: 1
              },
              {
                offset: 20,
                color: '',
                opacity: 1
              }
            ]
          }
        },
        xaxis: {
          categories: [],
          axisBorder: {
            show: true
          },
          axisTicks: {
            show: false
          },
          tooltip: {
            enabled: false
          }
        },
        yaxis: {
          axisBorder: {
            show: true
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: true
          }
        }
      },
      seriesBar: [{
        name: 'series-1',
        data: []
      }],
      seriesRadial: [],
      chartOptions: {
        chart: {
          type: 'radialBar'
        },
        colors: ['#fff'],
        plotOptions: {
          radialBar: {
            hollow: {
              size: '70%'
            },
            track: {
              background: '#ebebeb57'
            },
            dataLabels: {
              value: {
                offsetY: -1,
                fontSize: '44px',
                color: '#fff'
              }
            }
          }
        },
        labels: ['']
      }
    }
  },
  mixins: [TargetMixin],
  computed: {
    ...mapGetters('target', ['getTargetById', 'getOpenPorts', 'getNumberSubDomainsByOpenPorts', 'getNumberOfRunningTargets', 'getPercentOfRunningTargets', 'getLatestThingsFoundedInRootDomains', 'getTargetByName']),
    ...mapState('agent', ['isElementDeleted']),
    ...mapState('target', ['rootDomainEliminationStatus']),
    getTargetId () {
      if (this.isIdPropsUndefined) {
        return this.Target.id
      }
      return this.id
    },
    isIdPropsUndefined () {
      return this.$route.params.id === undefined
    }
  },
  created () {
    this.updateOpenPortsInGraph()
    this.updateSubDomainsNumberByOpenPortInGraph()
    this.updatePercentOfRunningTargetsInGraph()
    this.updateTarget()
    this.updateLinearGradient()
  },
  mounted () {
    this.$store.commit('agent/updateLocView', 'Targets', true)
    this.optionsBar.fill.gradient.colorStops[0].color = this.Target.primaryColor
    this.optionsBar.fill.gradient.colorStops[1].color = this.Target.secondaryColor

    if (this.isElementDeleted) {
      this.$toast.add({ severity: 'success', sumary: 'Success', detail: 'The Root Domain has been deleted successfully', life: 3000 })
      this.setIsElementDeleted(false)
    }
    this.setCurrentView(this.$route.name)
    jQuery('[data-toggle="tooltip"]').tooltip()
  },
  methods: {
    ...mapMutations('agent', ['setIsElementDeleted']),
    ...mapMutations('target', ['setCurrentView', 'addEntityToDelete']),
    updateOpenPortsInGraph () {
      this.optionsBar.xaxis.categories = this.getOpenPorts
    },
    updateSubDomainsNumberByOpenPortInGraph () {
      this.seriesBar[0].data = this.getNumberSubDomainsByOpenPorts
    },
    updatePercentOfRunningTargetsInGraph () {
      this.seriesRadial[0] = this.getPercentOfRunningTargets
    },
    getShortMonthName (dateData) {
      return dateData.toLocaleString('default', { month: 'short' })
    },
    capitalizeFirstChartByMonth (dateData) {
      const month = this.getShortMonthName(dateData)
      return month.charAt(0).toUpperCase() + month.slice(1)
    },
    getMonthByDate (dateData) {
      return this.capitalizeFirstChartByMonth(dateData)
    },
    updateTarget () {
      if (this.isIdPropsUndefined) {
        this.updateTargetWhenUrlAccessedDirectly()
      } else {
        this.Target = this.getTargetById(parseInt(this.getTargetId))
      }
    },
    updateTargetWhenUrlAccessedDirectly () {
      const nameOfTarget = this.$route.params.targetName
      this.Target = this.getTargetByName(nameOfTarget)
      this.idTargetLoadedWhenIdPropsIsNull = this.Target.id
    },
    updateLinearGradient () {
      this.LinearGradient = 'linear-gradient(160deg,' + this.Target.primaryColor + ' ' + '0%,' + this.Target.secondaryColor + ' ' + '100%)'
    }
  }
}
</script>

<style scoped>
.background-clip-content-box-border-box{
  background-clip: content-box, border-box;
}
.font-size-26px{
  font-size:26px
}
.border-dotted-1rem{
  border:dotted .1rem transparent;
}
.blockquote-style {
  background: none;
  border-left: 4px solid;
  margin:0;
  border-image-slice: 1!important;
  opacity: 1;
  padding: 0px;
  padding-left: .5rem !important;
}
.card-style{
    background: #fbfbfb 0% 0% no-repeat padding-box;
    box-shadow: 13px 19px 41px #d6d6d6;
    opacity: 1;
    border-radius: 25px !important;
    background-origin: border-box;
    background-clip: content-box, border-box;
}
.border-container{
    border: 1px solid #f1f3f5;
    border-radius: 8px;
    opacity: 1;
}
.item-list {
    background-color: #FFF;
    PADDING: 5px 15px;
    border-radius: 8px;
    margin-bottom: 10px;
}
.icon-color-style{
  -webkit-background-clip: text!important;
  -webkit-text-fill-color: transparent!important;
  font-size: 16px;
  opacity: 1;
}
.number{
  border-image-slice: 1!important;
}
.list-unstyled a{
  color: #000000;
  text-decoration: underline;
  opacity: 1;
}
blockquote > p{
  font-weight: 600;
  font-size: 16px;
  opacity: 1;
  color: #000000;

}
.text-style-opacity{
  opacity: 0.5;
  font-size: 14px;
}
.description-block label{
  font-weight: unset!important;
  margin-top: 7px;
  margin-bottom: 7px;
}
.item-list p
{
  font-size: 14px;
}
.donut-legend{
  opacity: 1;
  color: #ffffff;
  font-size: 16px;
}
.donut-legend .text-right{
  font-size: 24px;
  }
.font-size-16px{
  font-size: 16px;
}
#export-target {
  opacity: 0;
  position: absolute;
  z-index: -1;
  display: none;
}
label {
  cursor: pointer;
}
.target-details-trashcan{
  width: 10%;
  height: 10%;
}
.target-details-trashcan:hover{
  fill: #FF4545
}
.target-details-import-files:hover svg{
  fill: #00B1FF;
}
.target-details-import-files:hover label{
  color: #00B1FF;
}
span.target-details-add-root:hover{
  color: #00B1FF;
}

.trash-size{
  width: 15px
}
</style>
