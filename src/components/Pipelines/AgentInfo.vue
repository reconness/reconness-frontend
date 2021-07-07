<template>
    <div :style="{background: agent.background}" class="info-box agent_info_panel">
        <div class="info-box-content">
        <div class="border-right">
            <span class="info-box-text mb-2 font-weight-bold overflow-visible white-text">{{agent.name}}</span>
            <span class="mr-1 white-text">00:00:00</span>
            <MotionPlayOutlineIco />
            <div class="mt-2 output-selector pr-2">
            <span @click="is_terminal_open = true" class="mr-2 cursor-pointer white-text">Terminal</span><span @click="is_terminal_open = false" class="pl-2 border-left cursor-pointer white-text">Logs</span>
            </div>
        </div>
        </div>
        <span class="info-box-icon elevation-1 process_status_panel container-container-circular-bar">
        <span class="border container-circular-bar">
        <div class="circular-bar-container border pipeline-run-terminal">
        <CircleProgress :percent="progressValue" :size="30" :border-width="3" :border-bg-width="3" empty-color="#ff959e" fill-color="#ffffff"/>
        </div>
    </span>
    </span>
    <!-- /.info-box-content -->
</div>
</template>
<script>
import CircleProgress from 'vue3-circle-progress'
import MotionPlayOutlineIco from '@/components/Icons/MotionPlayOutlineIco.vue'
export default {
  name: 'AgentInfo',
  components: {
    CircleProgress,
    MotionPlayOutlineIco
  },
  props: {
    agent: Object
  }
}
</script>
<style scoped>
.agent_info_panel{
  background: #FF5A5A 0% 0% no-repeat padding-box;
  border-radius: 18px;
  box-shadow: 13px 19px 41px #0C1F6A3B;
  opacity: 1;
}
.process_status_panel{
  box-shadow: none !important;
}
.container-circular-bar{
  width: 3rem;
  height: 3rem;
  border: 2px solid #dee2e6 !important;
  border-radius: 10px;
}
.agent_info_panel .info-box-text{
  font-size: 20px;
}
.agent_info_panel svg{
  fill: #ffffff;
}
.process_status_panel .space_between span, .align_left-ordered_columns .processbar-text{
  color: #b3b3b3;
}
.output-selector{
  font-size: 14px;
}
.circular-bar-container{
  width: 40px;
  height: 40px;
  margin: 2px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 10px;
  background-color: rgba(255,255,255,0.3);
}
/* .vue3-circular-progressbar{
  margin-left: 10%;
}
.vue3-circular-progressbar svg{
  margin-bottom: 27%;
} */
.terminal-container .vue3-circular-progressbar{
    top: -11%
}
.progress{
  height: 5px !important;
}
</style>
