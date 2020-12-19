<template>
  <div class="row">
    <div v-for="item of agentListStore" :key="item.id"
    @mouseover="hoverCard(item.id)"
    @mouseout="hoverCard(-1)"
    class="col-12 col-md-4 col-lg-3 col-lgg-5 container-card">
      <div class="card text-white card-style  mb-3" v-bind:style ="{background:item.background}">
        <div class="card-body link-color">
          <div class="d-flex justify-content-between">
            <h3 class="card-title">{{item.name}}</h3>
            <a href="#">
              <span class="material-icons">settings</span>
            </a>
          </div>
          <hr />
          <div class="direct-chat-infos clearfix">
            <em>
              <a href="#" class="float-left">Category</a>
            </em>
            <em>
              <a href="#" class="float-right under-line">Details</a>
            </em>
          </div>
          <div class="card-body-inside">
            <ul class="list-unstyled">
              <li>
                <a href="#">Agents Subdomain</a>
              </li>
              <li>
                <a href="#">Enum</a>
              </li>
              <li>
                <a href="#">Agents Scan</a>
              </li>
            </ul>
          </div>
          <div class="row">
            <div class="col-7 col-sm-6 col-xl-8 pad">
              <hr class="line-bottom" />
            </div>
            <div class="col-5 col-sm-6 col-xl-4">
              <a href="#" class="btn btn-info float-right btn-style" @click="setAgentId" data-toggle="modal" :data-id="item.id" data-target="#exampleModalCenter">Edit</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AgentForm></AgentForm>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AgentForm from '@/components/AgentForm.vue'

export default {
  name: 'AgentsList',
  computed: {
    ...mapState(['agentListStore'])
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
    },
    setAgentId (e) {
      const selectedAgentId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('setIdAgent', selectedAgentId)
    }
  },
  components: {
    AgentForm
  }
}
</script>

<style scoped>
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
@media (min-width: 1400px) {
  .col-lgg-5 {
    float: left;
        max-width: 20%;
  }
}
</style>
