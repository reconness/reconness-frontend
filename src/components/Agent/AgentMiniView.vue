<template>
    <div class="col-12 col-sm-4 col-xl-3 col-lgg-5" @mouseover="hoverCard( {id} )" @mouseout="hoverCard(-1)">
        <div class="initial-info-box agent-mini-main-container rounded-corners">
          <input type="checkbox" :id="id" name="checkitem"  :checked="this.$isItemOnList(id, agentIdList)" ><label class="float-right mb-0" :for="id" v-show="check" @click="addListAgentId" :data-id="id" :data-name="name"></label>
        <div class="p-2">
        <div class="info-box ">
          <span class="info-box-icon" :style ="{background:background}"><AccountCogIco/></span>
            <div class="info-box-content">
                <span class="info-box-text agent-mini-agent-name cursor-pointer" @click="setDetailsLink" data-toggle="modal" :data-id="id" data-target="#exampleModalCenter">{{ name }}</span>
                <nav class="nav">
                    <a class="nav-link active agent-mini-agent-details agent-mini-color-gray" @click="setAgentId" href="#" data-toggle="modal"  :data-id="id" data-target="#confirmation-modal">Delete</a>
                    <a class="nav-link active agent-mini-agent-details agent-mini-color-gray" @click="setDetailsLink" href="#" data-toggle="modal" :data-id="id" data-target="#exampleModalCenter">Details</a>
                    <a class="nav-link agent-mini-agent-edit agent-mini-color-gray" href="#" @click="onEdit" data-toggle="modal" :data-id="id" data-target="#exampleModalCenter">Edit</a>
                </nav>
            </div></div></div>
            <!-- /.info-box-content -->
        </div>
            <AgentConfirmation></AgentConfirmation>
    </div><!-- /.col -->
</template>
<script>
import AgentConfirmation from '@/components/Agent/AgentConfirmation.vue'
import { mapState } from 'vuex'
import AccountCogIco from '@/components/Icons/AccountCogIco.vue'
import { AgentMixin } from '@/mixins/AgentMixin'
export default {
  name: 'AgentMiniView',
  components: {
    AgentConfirmation,
    AccountCogIco
  },
  props: {
    name: String,
    background: String,
    id: Number
  },
  data: function () {
    return {
      checkSelected: false,
      checkDeleted: -1
    }
  },
  mixins: [AgentMixin],
  computed: {
    ...mapState('agent', ['check', 'agentIdList'])
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
      this.$store.commit('agent/setIdAgent', selectedAgentId)
    },
    onEdit (e) {
      this.setAgentId(e)
      this.$store.commit('agent/setDetailsLinks', false)
    },
    setDetailsLink (e) {
      const selectedAgentId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('agent/setIdAgent', selectedAgentId)
      this.$store.commit('agent/setDetailsLinks', true)
    }
  }
}
</script>
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
    padding-left: 0px;
    padding-right: 0px;
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
    background: #fff;
    min-height: 70px;
    position: relative;
    width: 100%;
    box-shadow: -2px 17px 29px #eaeaea;
    opacity: 1;
}

.info-box {
    box-shadow: none;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 0rem;
    min-height: 60px;
    padding: .0rem;
    position: relative;
    width: 100%;
}
.info-box >span{
  width: 56px;
  height: 56px;
  border-radius: 13px;
  box-shadow: 3px 12px 23px #eae9e9;
  opacity: 1;
}
div.agent-mini-main-container svg {
    fill: #ffffff;
    width: 28px;
    height: 28px;
    opacity: 0.2;
}
</style>
