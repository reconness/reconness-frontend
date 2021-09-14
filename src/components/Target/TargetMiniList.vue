<template>
    <div class="col-12 col-sm-4 col-xl-3 col-lgg-5" @mouseover="hoverCard( {id} )" @mouseout="hoverCard(-1)">
        <div class="initial-info-box agent-mini-main-container rounded-corners">
        <input type="checkbox" :id="id" name="checkitem"  :checked="this.$isItemOnList(id, targetIdList)" >
        <label class="float-right" :for="id" v-show="check" @click="addListTargetId" :data-id="id" :data-name="name" style="margin-bottom: .0rem"></label>
        <div class="p-2">
        <div class="info-box">
          <span class="info-box-icon icon-style" :style ="{background: 'linear-gradient(135deg,'+primaryColor+' '+ '0%,' + secondaryColor + ' ' + '100%) 0% 0% no-repeat padding-box'}"><BullseyeArrowIco :variableClass="'w-50 h-50'"/></span>
          <div class="info-box-content">
          <span class="info-box-text domain-names-target">
           <router-link :to="{ name: 'TargetDetail', params: {id:id, targetName: transformedName} }" class="text-body" >
            {{name}}</router-link>
          </span>
          <a class="nav-link active agent-mini-agent-details pt-0 pb-0 black-text border-right-0" @click="setTargetId" href="#" data-toggle="modal"  :data-id="id" data-target="#confirmation-modal">Details</a>
          <div class="d-flex target-mosaic-options">
            <a class="nav-link active agent-mini-agent-details pt-0 pb-0 black-text border-right-0" @click="setTargetId" href="#" data-toggle="modal"  :data-id="id" data-target="#confirmation-modal">Settings</a>
            <span class="material-icons cursor-pointer settings-ico" @click="onEdit" data-toggle="modal" data-target="#agentConfiguration" :data-id="1">settings</span>
          </div>
          </div>
          <!-- /.info-box-content -->
            </div></div>
            <!-- /.info-box-content -->
        </div>
        <TargetConfirmation></TargetConfirmation>
        <TargetForm/>
    </div><!-- /.col -->
</template>
<script>
import TargetConfirmation from '@/components/Target/TargetConfirmation.vue'
import { mapState, mapMutations } from 'vuex'
import BullseyeArrowIco from '@/components/Icons/BullseyeArrowIco.vue'
import TargetForm from '@/components/Target/TargetForm.vue'
import { TargetMixin } from '@/mixins/TargetMixin'
export default {
  name: 'TargetMiniList',
  components: {
    TargetConfirmation,
    BullseyeArrowIco,
    TargetForm
  },
  props: {
    name: String,
    primaryColor: String,
    secondaryColor: String,
    id: Number,
    rootDom: Array,
    transformedName: String
  },
  data: function () {
    return {
      checkSelected: false,
      checkDeleted: -1,
      selectedTargetName: ''
    }
  },
  mixins: [TargetMixin],
  computed: {
    ...mapState('target', ['check', 'targetIdList'])
  },
  methods: {
    ...mapMutations('target', ['addIdTarget', 'removebyIdTarget']),
    hoverCard (selectedIndex) {
      this.selectedCard = selectedIndex
    },
    isSelected (cardIndex) {
      return this.selectedCard === cardIndex
    },
    onEdit (e) {
      this.setTargetId(e)
      this.$store.commit('agent/setDetailsLinks', false)
    },
    setDetailsLink (e) {
      const selectedAgentId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('agent/setIdAgent', selectedAgentId)
      this.$store.commit('agent/setDetailsLinks', true)
    },
    setTargetId (e) {
      const selectedTargetId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('target/setIdTarget', selectedTargetId)
    },
    setTargetName (e) {
      this.selectedTargetName = e.currentTarget.getAttribute('data-name')
    }
  }
}
</script>
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
.target-mosaic-options .settings-ico {
  font-size: 18px
}
</style>
