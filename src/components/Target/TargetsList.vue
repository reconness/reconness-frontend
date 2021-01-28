<template>
  <div class="row">
    <div v-for="item of arrayFilterList" :key="item.id" @mouseover="hoverCard(item.id)" @mouseout="hoverCard(-1)"
    class="col-12 col-md-4 col-lg-3 col-lgg-5 container-card">
      <div class="card text-white card-style  mb-3" v-bind:style ="{background:item.background}">
        <div class="card-body  link-color" v-bind:style="{paddingTop:styleList}">
          <div class="d-flex justify-content-between mb-4">
             <router-link to="/targets/details">
            <h1 class="card-title mt-2">{{item.name}}</h1>
             </router-link>
            <a href="#" class="mt-n2">  <BullseyeArrowIco/> </a>
          </div>
          <div class="card-body-inside">
            <ul class="list-unstyled min-height" >
              <li v-for="item2 of item.rootDomains.slice(item.rootDomains.length - 4) " :key="item2.id">
                >  {{item2.root}}
              </li>
            </ul>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="float-left mt-2">
              <router-link to="/targets/rootDomainDetails">
              <a href="#" class="font-italic font-color"><small>| RootDomains: {{item.rootDomains.length}}</small></a>
              </router-link> </div>
              <div class="float-right">
               <a href="#" class="btn btn-sm btn-info  btn-style " @click="onEdit" data-toggle="modal" :data-id="item.id" data-target="#exampleModalCenter">Edit Target</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import BullseyeArrowIco from '@/components/BullseyeArrowIco.vue'

export default {
  name: 'TargetsList',
  computed: {
    ...mapState('target', ['targetListStore', 'filterColour']),
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
      selectedCard: -1
    }
  },
  methods: {
    hoverCard (selectedIndex) {
      this.selectedCard = selectedIndex
    },
    isSelected (cardIndex) {
      return this.selectedCard === cardIndex
    }
  },
  components: {
    BullseyeArrowIco
  }
}
</script>
<style scoped>
div.card-body a svg{
  fill: #ffffff;
  fill-opacity: 0.2;
  width: 35px;
  height: 36px;
}
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
</style>
