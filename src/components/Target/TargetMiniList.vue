<template>
    <div class="col-12 col-sm-4 col-xl-3 col-lgg-5" @mouseover="hoverCard( {id} )" @mouseout="hoverCard(-1)">
        <div class="initial-info-box agent-mini-main-container rounded-corners">
        <input type="checkbox" :id="id+1" name="checkitem"  :checked="isChecked(id)" >
        <label class="float-right" :for="id+1" v-show= check @click="addListTargetId" :data-id="id" :data-name="name" style="margin-bottom: .0rem"></label>
        <div class="p-2">
        <div class="info-box">
          <span class="info-box-icon icon-style" :style ="{background: 'linear-gradient(135deg,'+primaryColor+' '+ '0%,' + secondaryColor + ' ' + '100%) 0% 0% no-repeat padding-box'}"><BullseyeArrowIco/></span>
          <div class="info-box-content">
          <span class="info-box-text domain-names-target">
           <router-link :to="{ name: 'TargetDetail', params: {id:id} }" class="text-body" >
            {{name}}</router-link>
          </span>
          <nav class="nav">
            <a class="nav-link active agent-mini-agent-details agent-mini-color-gray" @click="setTargetId" href="#" data-toggle="modal"  :data-id="id" data-target="#confirmation-modal">Delete</a>
            <router-link :to="{ name: 'TargetDetail', params: {id:id} }" class="nav-link active agent-mini-agent-details agent-mini-color-gray">Details </router-link>
            <a class="nav-link agent-mini-agent-edit agent-mini-color-gray" href="#" @click="onEdit" data-toggle="modal" :data-id="id" data-target="#targetModalForm">Edit</a>
          </nav>
          </div>
          <!-- /.info-box-content -->
            </div></div>
            <!-- /.info-box-content -->
        </div>
        <TargetConfirmation></TargetConfirmation>
        <TargetForm/>
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
</style>
<script>
import TargetConfirmation from '@/components/Target/TargetConfirmation.vue'
import { mapState, mapMutations } from 'vuex'
import BullseyeArrowIco from '@/components/Icons/BullseyeArrowIco.vue'
import TargetForm from '@/components/Target/TargetForm.vue'
export default {
  components: {
    TargetConfirmation,
    BullseyeArrowIco,
    TargetForm
  },
  data: function () {
    return {
      checkSelected: false,
      checkDeleted: -1,
      selectedTargetName: ''
    }
  },
  props: {
    name: String,
    primaryColor: String,
    secondaryColor: String,
    id: Number,
    rootDom: Array
  },
  computed: {
    ...mapState('target', ['check', 'targetIdList'])
  },
  methods: {
    ...mapMutations('target', ['addIdTarget', 'removebyIdTarget']),
    addListTargetId (e) {
      const selectedId = Number(e.currentTarget.getAttribute('data-id'))
      const selectedTargetName = e.currentTarget.getAttribute('data-name')
      if (document.getElementById(selectedId + 1).checked === false) {
        if (this.targetIdList.length !== 0 && this.checkSelected === false) {
          this.checkSelected = false
          this.checkDeleted = selectedId
        } else {
          this.checkSelected = true
        }
        this.addIdTarget({ id: selectedId, name: selectedTargetName })
      } else {
        this.removebyIdTarget(selectedId)
        if (this.checkSelected === false) {
          this.checkDeleted = selectedId
        }
      }
    },
    isChecked (itemID) {
      if (this.checkSelected === false) {
        if (this.targetIdList.find(target => target.id === itemID)) {
          if (this.checkDeleted === itemID) {
            return false
          } else {
            return true
          }
        } else {
          if (this.checkDeleted === itemID) {
            return true
          } else {
            return false
          }
        }
      }
    },
    hoverCard (selectedIndex) {
      this.selectedCard = selectedIndex
    },
    isSelected (cardIndex) {
      return this.selectedCard === cardIndex
    },
    onEdit (e) {
      this.setTargetId(e)
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
    },
    setTargetName (e) {
      this.selectedTargetName = e.currentTarget.getAttribute('data-name')
    }
  }
}
</script>
