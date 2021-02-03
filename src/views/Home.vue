<template>
<div class="content-wrapper">
  <div class="container-fluid">
  <div class="row mb-2">
    <div class="col-12 col-lg-9 col-xll-10">
      <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="content-header">
          <strong><h1 class="m-0 text-dark home-main-text">Welcome Reconness!!</h1></strong>
           <hr class="blueline"/>
        </div><!-- /.content-header -->
      </div><!-- /.col -->
      <div class="col-lg-12">
          <!-- <div class="container"> -->
            <div class="row">
              <div class="col-lg-12">
                <div class="row">
                  <div class="col-lg-8 ml-auto mr-auto">
                    <div class="home-secondary-text">
                      <blockquote class="blockquote text-center">
                      <p class="mb-0 app-description">
                        <span class="home-secondary-text">
                       A web app tool to run and keep all your <span class="blue-text">#recon</span>
                          in the same place and allow you to query your targets in an user friendly way
                        </span></p>
                      </blockquote>
                      </div>
                  </div><!-- /.col -->
                  <div class="col-lg-12">
                    <p class="float-right bold-text separator-content inline-material-icons">Last week resumee<span class="material-icons search-icon blue-text">keyboard_arrow_right</span></p>
                  </div>
                  <div class="col-12 col-lg-4 pr-4">
                  <TargetsHighestInteraction :background="'#03dced'"></TargetsHighestInteraction>
                  </div>
                  <DaysHighestInteraction></DaysHighestInteraction>
                  <div class="col-12 col-lg-4 pl-4">
                  <TargetsHighestInteraction :background="'rgb(134, 98, 202)'"></TargetsHighestInteraction>
                  </div>
                  </div></div>
                  <div class="col-lg-12">
                    <span class="refandres">References and resources</span><span> ></span>
                  </div><!-- /.col -->
                  <div class="col-lg-12">
                    <div class="home-quote-box">
                      <div class="row">
                        <div class="col-lg-12">
                          <span class="home-quote"><em>"A smart person is not one that knows the answers, but one who knows where to find them..." </em></span>
                        </div>
                        <div class="col-lg-12">
                          <div class="row">
                            <div class="col-lg-6">
                              <div class="form-group has-search">
                                <span class="material-icons search-icon form-control-feddback">search</span>
                                <input class="form-control" type="search" placeholder="URL" v-model="$v.resource.url.$model">
                              </div>
                              <p v-if="$v.$invalid" :class="{invalid: $v.resource.url.url.$invalid}" styl>The text is not a valid URL address</p>
                            </div>
                            <div class="col-lg-6">
                              <div class="row">
                                <div class="col-lg-7">
                                  <Chips v-model="resource.categories" placeholder="Categories"/>
                                </div>
                                <div class="col-lg-5">
                                  <button style="height: 40px;" type="submit" class="btn button-clolour rounded btn-block" @click="addReference">Add</button></div>
                                </div><!--./col-lg-5-->
                              </div><!--./row -->
                            </div><!--./col-lg-6 -->
                          </div><!--./row -->
                          <!-- </form> -->
                          <!-- </div>           -->
                        <div class="col-lg-12 input-group-sm">
                          <hr v-if="this.resources.length > 0"/>
                          <div class="row" v-for="item of resources"  :key="item.id">
                            <div class="col-lg-6">
                              <a style="color: #007bff;" :href="item.url" class="form-control url-input without-bordered-lines">{{item.url}}</a>
                            </div>
                            <div class="col-lg-4">
                              <input :value="item.categories.toString()" class="form-control url-input without-bordered-lines">
                            </div>
                            <div class="col-lg-2">
                              <button data-target="#simple-confirmation-modal" @click="setSelectedReference" data-toggle="modal" style="font-size: 14px;" :data-id="item.id" type="button" class="btn btn-primary btn-block btn-danger delete_btn rounded-corners">Delete</button>
                            </div>
                          </div>
                        </div>
                      </div><!-- /.row -->
                    </div><!-- /.home-quote-box -->
                  </div> <!-- /.col-sm-12 -->
                  <SimpleConfirmation></SimpleConfirmation>
                </div><!-- /.row -->
              </div><!-- /.col-sm-12 -->
            </div><!-- /.row -->
          </div><!-- /.container -->
      </div><!-- /.col -->
      <HomeRigthSidebar> </HomeRigthSidebar>
      </div><!-- /.row -->
  </div><!-- col-xs-12 -->
</div>
</template>

<script>
// @ is an alias to /src
import HomeRigthSidebar from '@/components/HomeRigthSidebar.vue'
import TargetsHighestInteraction from '@/components/TargetsHighestInteraction.vue'
import DaysHighestInteraction from '@/components/DaysHighestInteraction.vue'
import SimpleConfirmation from '@/components/SimpleConfirmation.vue'
import { mapState } from 'vuex'
import { url } from '@vuelidate/validators'
import Chips from 'primevue/chips'
export default {
  name: 'Home',
  components: {
    HomeRigthSidebar,
    TargetsHighestInteraction,
    DaysHighestInteraction,
    SimpleConfirmation,
    Chips
  },
  computed: {
    ...mapState(['resources'])
  },
  methods: {
    setSelectedReference (e) {
      const selectedId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('setSelectedResource', selectedId)
    },
    addReference () {
      this.$v.$touch()
      if (!this.$v.$error && this.$v.resource.url.$model !== '') {
        this.$store.commit('addResource', {
          url: this.$v.resource.url.$model,
          categories: this.resource.categories,
          id: this.resources.length + 1
        })
        this.resetResource()
      }
    },
    resetResource: function () {
      this.resource = {
        url: '',
        categories: [],
        id: -1
      }
      this.$v.resource.url.$model = ''
      this.$v.$reset()
    }
  },
  data () {
    return {
      categories: [
        { name: 'searcher', id: '1' },
        { name: 'docs', id: '2' }
      ],
      resource: {
        url: '',
        categories: [],
        id: -1
      },
      selectedResource: -1
    }
  },
  validations: {
    resource: {
      url: { url }
    }
  }
}
</script>
<style scoped>
.content-header h1 {
    font-size: 40px;
    color: #000000!important;
    font-weight: bold;
}

blockquote {
    background: none;
    border-left: none;
    font-size: inherit;
    margin: .1rem .1rem;
    padding: .5em .7rem;
}
.content-header {
    padding: 5px .5rem;
}
.target3 {
    background: rgba(110, 25, 249, 0.88);
    box-shadow: 13px 31px 41px #0C1F6A3B;
}
.btn-outline-primary {
    color: rgb(0, 177, 255);
    border-color: rgba(56, 70, 84, 0.24);
}
.rounded{
  border-radius: 12px !important;
  opacity: 1;
  border: 1px solid #f1f3f5;
  background: #fffffF 0% 0% no-repeat padding-box;
  font-size: 14px;
  color: #000000;
}

.without-bordered-lines{
  border-top: 0px;
  border-right: 0px;
  border-left: 0px;
  border-bottom: 0px;
}

.p-multiselect .p-multiselect-label.p-placeholder {
    color: #000000 !important;
}

.button-clolour{
  color: #00b1ff;
}

/* .p-multiselect{
  width: 100%;
  border-radius: 12px !important;
  opacity: 1;
  border: 1px solid #f1f3f5;
  background: #fffffF 0% 0% no-repeat padding-box;
  font-size: 14px;
  color: #000000;
  height: calc(1.8125rem + 2px);
} */

.p-chips{
  width: 100%;
  border-radius: 12px !important;
  opacity: 1;
  /* border: 1px solid #f1f3f5; */
  background: #fffffF 0% 0% no-repeat padding-box;
  font-size: 14px;
  color: #000000;
  /* min-height: calc(1.8125rem + 2px); */
}

@media (min-width: 2560px) {
.col-xll-10 {
    -ms-flex: 0 0 83.333333%;
    flex: 0 0 83.333333%;
    max-width: 83.333333%;
}
}

@media (min-width: 2560px) {
  .container, .container-lg, .container-md, .container-sm, .container-xl {
      max-width: 2000px;
  }
}

@media (max-width: 1024px) {
  .pr-4 {padding-right: 1rem!important;}
  .pl-4 {padding-left: 1rem!important;}
}
@media (min-width: 1440px) {
  .pr-4 {padding-right: 2rem!important;}
  .pl-4 {padding-left: 2rem!important;}
}
@media (min-width: 2560px) {
  .pr-4 {padding-right: 3rem!important;}
  .pl-4 {padding-left: 3rem!important;}
}
</style>
