<template>
    <div class="col-12 col-sm-4 col-xl-3 col-lgg-5" @mouseover="hoverCard( {id} )" @mouseout="hoverCard(-1)">
        <div class="initial-info-box agent-mini-main-container rounded-corners">
        <div class="p-2">
        <div class="info-box">
          <span class="info-box-icon icon-style" :style ="{background:background}"><BullseyeArrowIco/></span>
          <div class="info-box-content pr-1">
          <span class="info-box-text domain-names-target">
            <router-link to="/targets/details" class="text-dark">{{name}}</router-link>
          <span  class="material-icons float-right vert" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">more_vert</span>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
              <button class="dropdown-item" :data-id="id" type="button">Edit</button>
              <button class="dropdown-item" :data-id="id" type="button">Details</button>
              <button class="dropdown-item" data-toggle="modal" data-target="#confirmation-modal" @click="setTargetId" :data-id="id" type="button">Delete</button>
          </div>
          </span>
          <div class="domain-names-list">
            <span  class="material-icons float-left mt-2"> chevron_right </span>
            <div class="marquee text-truncate">
              <div class="marquee_content">
             <small class="list-inline " v-for="item2 of rootDom.slice(- 4)" :key="item2.id">
              {{item2.root}}, </small>
            </div></div></div>
          </div><!-- /.info-box-content -->
            </div></div>
            <!-- /.info-box-content -->
        </div>
        <TargetConfirmation></TargetConfirmation>
    </div><!-- /.col -->
</template>
<style scoped>
.agent-mini-main-container{
    margin-bottom: 32px;
}

div.initial-info-box.agent-mini-main-container.rounded-corners{
    width: 223px;
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
z-index: 500;
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

.initial-info-box {
    background: #fff;
    min-height: 70px;
    position: relative;
    width: 100%;
    box-shadow: -2px 17px 29px #eaeaea;
    opacity: 1;
}
.info-box {
    box-shadow: none;
    /* border-radius: .25rem; */
    /* background: #fff; */
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 0rem;
     min-height: 60px;
     padding: .0rem;
    position: relative;
    width: 100%;
}

.text-truncate {
    max-width: 100px;
}
.domain-names-list{
  cursor: pointer;
}
.domain-names-list .material-icons{
font-size: 17px;
}

.info-box >span{
  width: 56px;
  height: 56px;
  border-radius: 13px;
  box-shadow: 3px 12px 23px #eae9e9;
  opacity: 1;
}
</style>
<script>
import TargetConfirmation from '@/components/Target/TargetConfirmation.vue'
import { mapState } from 'vuex'
import BullseyeArrowIco from '@/components/BullseyeArrowIco.vue'
export default {
  name: 'AgentMiniView',
  components: {
    TargetConfirmation,
    BullseyeArrowIco
  },
  data: function () {
    return {
      checkSelected: false,
      checkDeleted: -1
    }
  },
  props: {
    name: String,
    background: String,
    id: Number,
    rootDom: Array
  },
  computed: {
    ...mapState(['agentIdList'])
  },
  methods: {
    hoverCard (selectedIndex) {
      this.selectedCard = selectedIndex
    },
    isSelected (cardIndex) {
      return this.selectedCard === cardIndex
    },
    setAgentId (e) {
      const selectedAgentId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('setIdAgent', selectedAgentId)
    },
    onEdit (e) {
      this.setAgentId(e)
      this.$store.commit('setDetailsLinks', false)
    },
    setDetailsLink (e) {
      const selectedAgentId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('setIdAgent', selectedAgentId)
      this.$store.commit('setDetailsLinks', true)
    },
    setTargetId (e) {
      const selectedTargetId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('target/setIdTarget', selectedTargetId)
    }
  }
}
</script>
