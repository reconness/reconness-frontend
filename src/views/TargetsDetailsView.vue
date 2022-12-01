<template>
  <div>
  <!-- Contains navs-bar -->
  <NavBarTwoDetailTarget :TargetName = "getCurrentTarget.name" />
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
                          <label for="import-rootdomains-targetdetails" class="mb-0 font-weight-normal"> Import </label>
                          <input type="file" id="import-rootdomains-targetdetails" @click="resetInputFile" @change="uploadRootDomainDataToServer" accept=".json"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col mt-3 pr-3 ml-1 pl-1">
                    <div class="row">
                      <div class="col-12">
                        <ul class="list-unstyled min-height" >
                          <li v-for="item of getCurrentTarget.rootDomains" :key="item.id" class="d-flex justify-content-between align-items-center">
                            <div class="target-details-root-links">
                            <span  class="material-icons font-size-16px mt-1 black-text cursor-pointer"> chevron_right </span>
                            <router-link :to="{ name: 'RootDomainDetails', params: {targetName: getCurrentTarget.name, rootdomainName: item.root} }">
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
                  <dd>{{getCurrentTarget.bugBountyUrl}}</dd>
                  <dt v-if="getCurrentTarget.isPrivateProgram">Is a private program</dt>
                  <dt v-else>Is not a private program</dt>
                  <dt>In Scope</dt>
                  <dd>{{getCurrentTarget.inScope}}</dd>
                  <dt>Out of Scope</dt>
                  <dd>{{getCurrentTarget.outScope}}</dd>
                </dl>
              </div>
              </div>
            <TargetsHighestInteraction v-if="isSubdomainByDirectoriesListNotEmpty" v-bind:style ="{background:LinearGradient}" :title= "'Subdomains with more numbers of directories'" :subdomainByDirectories="subdomainByDirectoriesInitialized"></TargetsHighestInteraction>
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
                  <p class="mb-0"> {{novelty.data}} </p>
                  <div class="d-flex flex-column text-right">
                    <span><span class="font-weight-bold">{{this.getMonthByDate(createDateObjectFromString(novelty.date))}}</span>{{createDateObjectFromString(novelty.date).getDate()}}</span>
                    <span class="text-style-opacity">{{createDateObjectFromString(novelty.date).getFullYear()}}</span>
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
            </div> <!-- /.row -->
          </div>
        </div>
      </div>
    </div>
    <BottomBar/>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState, mapActions } from 'vuex'
import DaysHighestInteraction from '@/components/General/DaysHighestInteraction.vue'
import TargetsHighestInteraction from '@/components/General/TargetsHighestInteraction.vue'
import NavBarTwoDetailTarget from '@/components/Target/NavBarTwoDetailTarget.vue'
import FileImportIco from '@/components/Icons/FileImportIco.vue'
import TrashCanIco from '@/components/Icons/TrashCanIco.vue'
import { RemoveEntitiesMixin } from '@/mixins/RemoveEntitiesMixin'
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
  data: function () {
    return {
      Target: Object,
      LinearGradient: String,
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
  mixins: [RemoveEntitiesMixin, TargetMixin],
  computed: {
    ...mapGetters('target', ['getTargetById', 'getOpenPorts', 'getNumberSubDomainsByOpenPorts', 'getNumberOfRunningTargets', 'getPercentOfRunningTargets', 'getLatestThingsFoundedInRootDomains', 'getTargetByName']),
    ...mapState('agent', ['isElementDeleted']),
    ...mapState('target', ['rootDomainEliminationStatus', 'targetListStore', 'dashboardData']),
    isIdPropsUndefined () {
      return this.$route.params.id === undefined
    },
    getCurrentTarget () {
      const nameOfTarget = this.$route.params.targetName
      const currentTarget = this.getTargetByName(nameOfTarget)
      if (currentTarget) {
        return currentTarget
      }
      return {}
    },
    subdomainByDirectoriesInitialized () {
      if (this.dashboardData) {
        return this.dashboardData.subdomainByDirectories
      }
      return []
    },
    isSubdomainByDirectoriesListNotEmpty () {
      return this.subdomainByDirectoriesInitialized.length > 0
    }
  },
  watch: {
    'targetListStore.length': function (size) {
      if (this.isIdPropsUndefined) {
        this.updateTargetWhenUrlAccessedDirectly()
        this.updateLinearGradient()
      }
    },
    dashboardData: function (value) {
      if (value) {
        this.updateSubdomainByPortGraph()
      }
    }
  },
  created () {
    this.loadTargets()
    if (!this.isIdPropsUndefined) {
      this.updateTarget()
    }
    this.updatePercentOfRunningTargetsInGraph()
    this.updateLinearGradient()
    this.loadGraphics()
  },
  mounted () {
    this.$store.commit('agent/updateLocView', 'Targets', true)
    this.optionsBar.fill.gradient.colorStops[0].color = this.getCurrentTarget.primaryColor
    this.optionsBar.fill.gradient.colorStops[1].color = this.getCurrentTarget.secondaryColor
    if (this.isElementDeleted) {
      this.$toast.add({ severity: 'success', sumary: 'Success', detail: 'The Root Domain has been deleted successfully', life: 3000 })
      this.setIsElementDeleted(false)
    }
    this.setCurrentView(this.$route.name)
    jQuery('[data-toggle="tooltip"]').tooltip()
    this.getTargetNotesFromServer(this.$route.params.targetName)
  },
  methods: {
    ...mapMutations('agent', ['setIsElementDeleted']),
    ...mapMutations('target', ['setCurrentView']),
    ...mapMutations('general', ['addEntityToDelete']),
    ...mapActions('target', ['getTargetNotesFromServer', 'uploadRootDomainFileToServer', 'loadTargets', 'loadDashboardDataFromServer']),
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
      const nameOfTarget = this.$route.params.targetName
      this.Target = this.getTargetByName(nameOfTarget)
    },
    updateTargetWhenUrlAccessedDirectly () {
      this.updateTarget()
    },
    updateLinearGradient () {
      this.LinearGradient = 'linear-gradient(160deg,' + this.getCurrentTarget.primaryColor + ' ' + '0%,' + this.getCurrentTarget.secondaryColor + ' ' + '100%)'
    },
    uploadRootDomainDataToServer (e) {
      const rootDataFile = e.target.files[0]
      const reader = new FileReader()
      const self = this
      reader.onload = function () {
        const rootFileFormData = new FormData()
        rootFileFormData.append('file', rootDataFile)
        const targetAndRootData = {
          targetName: self.getCurrentTarget.name,
          formData: rootFileFormData
        }
        self.uploadRootDomainFileToServer(targetAndRootData).then(response => {
          if (response.status) {
            self.updateOperationStatus(self.$entityStatus.SUCCESS, self.$message.successMessageForFileUpload)
          } else {
            self.updateOperationStatus(self.$entityStatus.FAILED, response.message)
          }
        })
      }
      reader.readAsText(rootDataFile)
    },
    resetInputFile (e) {
      e.target.value = null
    },
    loadGraphics () {
      const targetName = this.$route.params.targetName
      this.loadDashboardDataFromServer(targetName)
    },
    createDateObjectFromString (dateStr) {
      return new Date(dateStr)
    },
    updateSubdomainByPortGraph () {
      this.updateOpenPortsInGraph()
      this.updateSubDomainsNumberByOpenPortInGraph()
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
#import-rootdomains-targetdetails {
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
