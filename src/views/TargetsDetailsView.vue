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
           <div class="card card-style box" v-bind:style ="{backgroundImage: 'linear-gradient(white, white),' + LinearGradient}" style= "border:dotted .1rem transparent;">
              <div class="card-body p-0">
                <div class="row">
                  <div class="col-5 border-right">
                    <blockquote class="blockquote-style ml-4 mt-3" v-bind:style ="{borderImage:LinearGradient}">
                      <p> Root Domains</p>
                    </blockquote>
                  </div>
                  <div class="col mt-3 pr-3 ml-1 pl-1">
                    <ul class="list-unstyled min-height" >
                      <li v-for="item of Target.rootDomains" :key="item.id">
                        <span v-bind:style ="{background:LinearGradient}"  class="material-icons mt-1 gradient-style icon-color-style"> chevron_right </span>
                        <router-link :to="{ name: 'RootDomainDetails', params: {idTarget: Target.id , id: item.id} }">
                          {{item.root}}
                          <span v-bind:style ="{background:LinearGradient}"
                            class="material-icons mt-2 float-right icon-color-style gradient-style"> open_in_new
                          </span>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="row">
                  <div class="col border-top mr-2 ml-2 m-0 description-block">
                    <label for="import" class="domain-names-list"> Import Root Domains</label>
                    <input type="file" id="import" style="display:none"/>
                  </div>
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
                    <i class="material-icons mt-2 icon-color-style gradient-style" v-bind:style ="{background:LinearGradient}" style="font-size:26px">event</i>
                </div>
                <div class="d-flex justify-content-between item-list">
                  <p class="mb-0"> New port opened<br> in subdomain <em> {{'<yanet>'}} </em> </p>
                  <div class="d-flex flex-column text-right">
                    <span><span class="font-weight-bold">Jun</span>24</span>
                    <span class="text-style-opacity">2020</span>
                  </div>
                </div>
                <div class="d-flex justify-content-between item-list">
                  <p class="mb-0"> New port opened<br> in subdomain <em> {{'<yanet>'}} </em> </p>
                  <div class="d-flex flex-column text-right">
                    <span><span class="font-weight-bold">Jun</span>24</span>
                    <span class="text-style-opacity">2020</span>
                  </div>
                </div>
                <div class="d-flex justify-content-between item-list">
                  <p class="mb-0"> New port opened<br> in subdomain <em> {{'<yanet>'}} </em> </p>
                  <div class="d-flex flex-column text-right">
                    <span><span class="font-weight-bold">Jun</span>24</span>
                    <span class="text-style-opacity">2020</span>
                  </div>
                </div>
                <div class="d-flex justify-content-between item-list">
                  <p class="mb-0"> New port opened<br> in subdomain <em> {{'<yanet>'}} </em> </p>
                  <div class="d-flex flex-column text-right">
                    <span><span class="font-weight-bold">Jun</span>24</span>
                    <span class="text-style-opacity">2020</span>
                  </div>
                </div>
                <div class="d-flex justify-content-between item-list">
                  <p class="mb-0"> New port opened<br> in subdomain <em> {{'<yanet>'}} </em> </p>
                  <div class="d-flex flex-column text-right">
                    <span><span class="font-weight-bold">Jun</span>24</span>
                    <span class="text-style-opacity">2020</span>
                  </div>
                </div>
                <div class="d-flex justify-content-between item-list">
                  <p class="mb-0"> New port opened<br> in subdomain <em> {{'<yanet>'}} </em> </p>
                  <div class="d-flex flex-column text-right">
                    <span><span class="font-weight-bold">Jun</span>24</span>
                    <span class="text-style-opacity">2020</span>
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
                <span class = "number float-right" v-bind:style ="{backgroundImage: 'linear-gradient(white, white),' + LinearGradient}" style= "background-clip: content-box, border-box;">
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
                 <p class="text-right"> 110</p>
                </div>
                <div class="col-7">
                <apexchart  height="200" type="radialBar" :options="chartOptions" :series="seriesRadial"></apexchart>
                </div>
              </div></div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DaysHighestInteraction from '@/components/DaysHighestInteraction.vue'
import TargetsHighestInteraction from '@/components/TargetsHighestInteraction.vue'
import NavBarTwoDetailTarget from '@/components/Target/NavBarTwoDetailTarget.vue'
export default {
  name: 'TargetsDetailsView',
  data: function () {
    return {
      Target: Object,
      LinearGradient: String,
      optionsBar: {
        chart: {
          toolbar: { show: false },
          height: 350,
          type: 'bar'
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'top' // top, center, bottom
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
          categories: [21, 22, 53, 80, 443, 62],
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
        data: [62, 44, 38, 50, 78, 57]
      }],
      seriesRadial: [87],
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
  components: {
    DaysHighestInteraction,
    TargetsHighestInteraction,
    NavBarTwoDetailTarget
  },
  computed: {
    ...mapGetters('target', ['getTargetById'])
  },
  mounted () {
    this.$store.commit('updateLocView', 'Targets', true)
    this.Target = this.getTargetById(parseInt(this.$route.params.id))
    this.LinearGradient = 'linear-gradient(160deg,' + this.Target.primaryColor + ' ' + '0%,' + this.Target.secondaryColor + ' ' + '100%)'
    this.optionsBar.fill.gradient.colorStops[0].color = this.Target.primaryColor
    this.optionsBar.fill.gradient.colorStops[1].color = this.Target.secondaryColor
  }
}
</script>

<style scoped>
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
</style>
