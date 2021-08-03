<template>
      <div class="home-chart">
      <div class="dhPadding ">
       <div class="row">
            <div class="col-9">
                <p  class="targets-title">
                Days with the most interactions in the last week
                </p>
            </div>
            <div class="col-3">
                <div class = "number float-right">
                <span>43</span>
                </div>
            </div>
       </div></div>
      <apexchart width="100%" height="170px" type="line" :options="options" :series="series"></apexchart>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DaysHighestInteraction',
  data: function () {
    return {
      options: {
        chart: {
          id: 'chart-interactions',
          height: 950,
          foreColor: '#FFFFFF',
          toolbar: {
            show: false
          },
          dropShadow: {
            enabled: false,
            color: '#000'
          }
        },
        stroke: {
          curve: 'straight'
        },
        grid: {
          borderColor: 'transparent',
          row: {
            colors: ['transparent']
          }
        },
        markers: {
          size: 3,
          hover: {
            sizeOffset: 3
          }
        },
        xaxis: {
          categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
        },
        yaxis: {

        },
        colors: ['#ffffff'],
        dataLabels: {
          enabled: false
        }
      },
      series: [{
        name: 'series-1',
        data: []
      }]
    }
  },
  computed: {
    ...mapGetters(['daysWithMostInteractionsLastWeek'])
  },
  created: function () {
    this.updateDaysInGraph()
  },
  methods: {
    updateDaysInGraph () {
      this.series[0].data = this.daysWithMostInteractionsLastWeek
    }
  }
}
</script>
<style scoped>
.home-chart{
  background: transparent linear-gradient(160deg, #F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box;
  box-shadow: 13px 19px 41px #0C1F6A3B;
  border-radius: 25px;
  margin-bottom: 1rem;
}
.dhPadding{
   padding: 25px 15px 0px 15px;
}
.apexcharts-canvas {
  width: 968.167px; height: 958.4px}
</style>
