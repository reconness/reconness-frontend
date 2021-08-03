<template>
  <div class="row">
    <div v-for="item of arrayFilterList" :key="item.id" @mouseover="hoverCard(item.id)" @mouseout="hoverCard(-1)"
    class="col-12 col-md-4 col-lg-3 col-lgg-5 container-card">
      <div class="card text-white card-style  mb-3" v-bind:style ="{background: 'linear-gradient(160deg,'+item.primaryColor+' '+ '0%,' + item.secondaryColor + ' ' + '100%) 0% 0% no-repeat padding-box'}">
        <input type="checkbox" :id="item.id"  name="checkitem" :checked="this.$isItemOnList(item.id, targetIdList)">
        <label :for="item.id" v-show="check"  @click="addListTargetId" :data-id="item.id" :data-name="item.name" ></label>
        <div class="card-body  link-color" v-bind:style="{paddingTop:styleList}">
          <div class="d-flex justify-content-between mb-4">
             <router-link :to="{ name: 'TargetDetail', params: {id: item.id, targetName: item.name} }">
            <h1 class="card-title mt-2">{{item.name}}</h1>
             </router-link>
            <a href="#" class="mt-n2">  <BullseyeArrowIco/> </a>
          </div>
          <div class="card-body-inside">
            <ul class="list-unstyled min-height" >
              <li v-for="item2 of item.rootDomains.slice(- 3) " :key="item2.id">
              <span  class="material-icons float-left mt-1"> chevron_right </span>
              <router-link :to="{ name: 'RootDomainDetails', params: {idTarget: item.id , id: item2.id, targetName: item.name, rootdomainName: item2.root} }">
               {{item2.root}}
              </router-link>
              </li>
              <li v-if="item.rootDomains.length > 3">
                <span class="target-item-text-style">... and {{item.rootDomains.length - 3}} rootdomains more</span>
              </li>
            </ul>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="float-left mt-2">
               <small class="font-italic font-color">| RootDomains: {{item.rootDomains.length}}</small>
                  </div>
              <div class="float-right">
               <a href="#" class="btn btn-sm btn-info  btn-style ml-1" @click="setTargetId" data-toggle="modal" :data-id="item.id" data-target="#confirmation-modal">Delete</a>
               <a href="#" class="btn btn-sm btn-info  btn-style ml-1" @click="onEdit" data-toggle="modal" :data-id="item.id" data-target="#targetModalForm">Edit</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12">
      <TargetConfirmation/>
    </div>
    <TargetForm/>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import BullseyeArrowIco from '@/components/Icons/BullseyeArrowIco.vue'
import TargetForm from '@/components/Target/TargetForm.vue'
import TargetConfirmation from '@/components/Target/TargetConfirmation.vue'

export default {
  name: 'TargetsList',
  computed: {
    ...mapState('target', ['targetListStore', 'check', 'filterColour', 'styleList', 'targetIdList']),
    ...mapGetters('target', ['filterByColor']),
    arrayFilterList () {
      if (this.filterColour === '') {
        return this.targetListStore
      } else {
        return this.filterByColor(this.filterColour)
      }
    }
  },
  data: function () {
    return {
      selectedCard: -1,
      checkSelected: false,
      checkDeleted: -1
    }
  },
  methods: {
    ...mapMutations('target', ['addIdTarget', 'removebyIdTarget']),
    addListTargetId (e) {
      const selectedId = Number(e.currentTarget.getAttribute('data-id'))
      const selectedTargetName = e.currentTarget.getAttribute('data-name')
      if (document.getElementById(selectedId).checked === false) {
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
    setTargetId (e) {
      const selectedTargetId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('target/setIdTarget', selectedTargetId)
    }
  },
  components: {
    BullseyeArrowIco,
    TargetForm,
    TargetConfirmation
  }
}
</script>
<style scoped>
.font-color{
    color: #ffffff;
    opacity: 0.4;
}

.card {
transition: all .25s ease;
width:100%;
}
.container-card:hover {
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

@media (min-width: 1440px) { /*1320*/
  .col-lgg-5 {
    float: left;
    max-width: 20%;
    padding: 17.5px !important;
  }
}
@media (min-width: 2550px) {
  .col-lgg-5 {
    float: left;
    max-width: 20%;
    padding: 40.5px!important;
  }
    .widhtLine {
    width: 50%;
  }
}

.btn:hover {
    background-color: rgba(49, 137, 231, 0) !important;
    opacity: 0.6 !important;
    border: 2px solid #FFFFFF !important;
}

.btn-info.focus, .btn-info:focus {
    background-color: rgba(49, 137, 231, 0);
    opacity: 0.6;
    border: 2px solid #FFFFFF;
}

.list-unstyled a{
    font-size: 14px;
    opacity: 1;
}

ul li span{
  font-size: 17px;
  color: #FFFFFF;
}
.min-height{
  min-height: 100px;
}
.card-title{
  font-size: 24px;
  opacity: 1;
}

@media (max-width: 1440px) {
.card-title{
  font-size: 20px;
}
}
@media (max-width: 1024px) {
.card-title{
  font-size: 17px;
}
}
@media (min-width: 992px) {
.col-lg-3 {
    padding: 10px;
}
}
@media (min-width: 1440px) and (max-width: 1520px) {
  small{
    font-size: 50%;
  }
}
@media (min-width: 768px) and (max-width: 1156px) {
.col-lg-3 {
    -ms-flex: 0 0 33.333333%;
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
    padding: 20px;
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
}

input[type="checkbox"] {
  display: none;
}
.target-item-text-style{
  font-size: 14px;
  opacity: 1;
}
</style>
