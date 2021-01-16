<template>
    <div class="col-12 col-sm-4 col-xl-3 col-lgg-5" @mouseover="hoverCard( {id} )" @mouseout="hoverCard(-1)">
        <div class="initial-info-box agent-mini-main-container rounded-corners">
          <input type="checkbox" :id="id+1" name="checkitem" ><label class="float-right" :for="id+1" v-show= check @click="addListAgentId" :data-id="id" :data-name="name" style="margin-bottom: .0rem"></label>
        <div class="info-padding">
        <div style="margin-top: 0.2rem;" class="info-box">
          <span class="rounded-corners info-box-icon" :style ="{background:background}"><span class="material-icons agent-mini-color-gray">person</span></span>
            <div class="info-box-content">
                <span class="info-box-text agent-mini-agent-name">{{ name }}</span>
                <nav class="nav">
                    <a class="nav-link active agent-mini-agent-details agent-mini-color-gray" data-toggle="modal" @click="setAgentId" :data-id="id" data-target="#confirmation-modal">Delete</a>
                    <a class="nav-link active agent-mini-agent-details agent-mini-color-gray" @click="setDetailsLink" href="#" data-toggle="modal" :data-id="id" data-target="#exampleModalCenter">Details</a>
                    <a class="nav-link agent-mini-agent-edit agent-mini-color-gray" href="#" @click="onEdit" data-toggle="modal" :data-id="id" data-target="#exampleModalCenter">Edit</a>
                </nav>
            </div></div></div>
            <!-- /.info-box-content -->
        </div>
            <AgentConfirmation></AgentConfirmation>
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
    padding-right: 5px;
    border-right: 1px solid #F1F3F5;
    margin-right: 6px;
    padding-left: 0px;
}

.agent-mini-agent-edit{
    font-size: 12px;
    padding-top: 5px;
    padding-bottom: 3px;
    /* border-left: 1px solid #F1F3F5; */
    padding-left: 0px;
    padding-right: 0px;
    /*border-left: 1px solid #F1F3F5;*/
}

.agent-mini-color-gray{
  color: #B3B3B3;
}

span.agent-mini-color-gray{
    font-size: 28px;
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
input[type="checkbox"] + label:before {
  content: "";
  width: 26px;
  height: 26px;
  float: right;
 /* margin: 0.5em 0.5em 0 0;*/
  border: 2px solid #ccc;
  background: #fff;
  border-radius: .7rem;
  position: absolute;
  right: 0rem;
  z-index: 2;
}
input[type="checkbox"]:checked + label:before {
  border-color: #00B1FF;
}

input[type="checkbox"]:checked + label:after {
    content: "";
    width: 12px;
    height: 6px;
    border: 4px solid #00B1FF;
    float: right;
    margin-right: -1.2em;
    border-right: 0;
    border-top: 0;
    margin-top: .6em;
    transform: rotate(-55deg);
    position: absolute;
    right: 1.6rem;
    z-index: 2;
}

input[type="checkbox"] {
  display: none;
}

.initial-info-box {
    box-shadow: 0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2);
    border-radius: .25rem;
    background: #fff;
    margin-bottom: 1rem;
    min-height: 80px;
    position: relative;
    width: 100%;
}
.info-padding{
  padding: .5rem;
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
</style>
<script>
import AgentConfirmation from '@/components/AgentConfirmation.vue'
import { mapState } from 'vuex'
export default {
  name: 'AgentMiniView',
  components: {
    AgentConfirmation
  },
  props: {
    name: String,
    background: String,
    id: Number
  },
  computed: {
    ...mapState(['check'])
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
    addListAgentId (e) {
      const selectedId = Number(e.currentTarget.getAttribute('data-id'))
      const selectedAgentName = e.currentTarget.getAttribute('data-name')
      if (document.getElementById(selectedId + 1).checked === false) {
        this.$store.commit('addIdAgent', { id: selectedId, name: selectedAgentName })
      } else {
        this.$store.commit('removebyIdAgent', selectedId)
      }
    }
  }
}
</script>
