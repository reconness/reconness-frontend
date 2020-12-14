<template>
    <div class="col-12 col-sm-4 col-xl-3 col-lgg-5" @mouseover="hoverCard( {id} )" @mouseout="hoverCard(-1)">
        <div class="info-box agent-mini-main-container rounded-corners">
            <span class="rounded-corners info-box-icon" :style ="{backgroundColor:background}"><span class="material-icons agent-mini-color-gray">person</span></span>
            <div class="info-box-content">
                <span class="info-box-text agent-mini-agent-name">{{ name }}</span>
                <nav class="nav">
                    <a class="nav-link active agent-mini-agent-details agent-mini-color-gray" href="#">Details</a>
                    <a class="nav-link agent-mini-agent-edit agent-mini-color-gray" href="#">Edit</a>
                </nav>
            </div>
            <!-- /.info-box-content -->
        </div>
    </div><!-- /.col -->
</template>
<style scoped>
.agent-mini-main-container{
    margin-bottom: 32px;
}

.agent-mini-agent-name{
    font-weight: bold;
    margin-bottom: 5px;
}

.agent-mini-agent-details{
    font-size: 12px;
    padding-top: 5px;
    padding-bottom: 3px;
    padding-left: 0px;
}

.agent-mini-agent-edit{
    font-size: 12px;
    padding-top: 5px;
    padding-bottom: 3px;
    border-left: 1px solid #F1F3F5;
}

.agent-mini-color-gray{
  color: #B3B3B3;
}

span.agent-mini-color-gray{
    font-size: 28px;
}

div.info-box.agent-mini-main-container.rounded-corners{
    width: 226px;
}

.agent-mini-main-container {
transition: all .25s ease;
width:100%;
}
.agent-mini-main-container:hover {
-webkit-transform:scale(1.25);
-moz-transform:scale(1.25);
-ms-transform:scale(1.25);
-o-transform:scale(1.25);
transform:scale(1.05);
transition: all .25s ease;
}

.col-lgg-5 {
  min-height: 1px;
  position: relative;
}
@media (min-width: 1400px) {
  .col-lgg-5 {
    float: left;
        max-width: 20%;
  }
}

</style>
<script>

export default {
  name: 'AgentMiniView',
  props: {
    name: String,
    background: String,
    id: Number
  },
  methods: {
    hoverCard (selectedIndex) {
      this.selectedCard = selectedIndex
    }
  }
}
</script>
