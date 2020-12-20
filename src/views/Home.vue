<template>
<div class="content-wrapper">
  <div class="container-fluid">
  <div class="row mb-2">
    <div class="col-xs-12 col-lg-9">
    <div class="row">
      <div class="col-lg-12">
        <div class="content-header">
          <strong><h1 class="m-0 text-dark home-main-text">Welcome Reconness!!</h1></strong>
           <hr class="blueline"/>
        </div><!-- /.content-header -->
      </div><!-- /.col -->
      <div class="col-lg-12">
        <div class="content">
          <!-- <div class="container"> -->
            <div class="row">
              <div class="col-lg-12">
                <div class="row">
                  <div class="col-lg-12">
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
                  <TargetsHighestInteraction :background="'#00B1FF'"></TargetsHighestInteraction>
                  <div class="col-lg-4">
                    <div class="home-chart">
                      <apexchart width="90%" height="90%" type="line" :options="options" :series="series"></apexchart>
                    </div>
                  </div><!-- /.col -->
                  <TargetsHighestInteraction :background="'rgb(134, 98, 202)'"></TargetsHighestInteraction>
                  <div class="col-lg-12">
                    <span class="refandres">References and resources</span><span> ></span>
                  </div><!-- /.col -->
                  <div class="col-lg-12">
                    <div class="home-quote-box">
                      <div class="row">
                        <div class="col-lg-12">
                          <span class="home-quote"><em>"A smart personis not one that knows the answers, but one who knows where to find them..." </em></span>
                        </div>
                        <!-- <div class="home-form"> -->
                        <!-- <form class="form-inline ml-3"> -->
                        <div class="col-lg-12">
                          <div class="row">
                            <div class="col-lg-8">
                            <div class="form-group has-search input-group-sm">
                              <span class="material-icons search-icon form-control-feddback">search</span>
                              <input class="form-control" type="search" placeholder="URL">
                            </div>
                            </div>
                            <div class="col-lg-4">
                              <div class="row">
                                <div class="col-lg-6">
                                  <select class="form-control form-control-sm select2 rounded-lg" style="width: 100%;">
                                    <option selected="selected">Alabama</option>
                                    <option>Alaska</option>
                                    <option>California</option>
                                    <option>Delaware</option>
                                    <option>Tennessee</option>
                                    <option>Texas</option>
                                    <option>Washington</option>
                                  </select>
                                </div>
                                <div class="col-lg-6">
                                  <button type="submit" class="btn btn-outline-primary rounded-lg btn-sm btn-block">Add</button>                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                          <!-- </form> -->
                          <!-- </div>           -->
                        <div class="col-lg-12 input-group-sm">
                          <input type="url" class="form-control url-input" placeholder=">">
                        </div>
                      </div><!-- /.row -->
                    </div><!-- /.home-quote-box -->
                  </div> <!-- /.col-sm-12 -->
                </div><!-- /.row -->
              </div><!-- /.col-sm-12 -->
            </div><!-- /.row -->
          <!--</div>--><!-- /.container -->
        </div><!-- /.content -->
      </div><!-- /.col -->
    </div><!-- /.row -->
  </div><!-- col-xs-12 -->
  <HomeRigthSidebar> </HomeRigthSidebar>
</div>
</div>
</div>
</template>

<script>
// @ is an alias to /src
import HomeRigthSidebar from '@/components/HomeRigthSidebar.vue'
import TargetsHighestInteraction from '@/components/TargetsHighestInteraction.vue'
export default {
  name: 'Home',
  components: {
    HomeRigthSidebar,
    TargetsHighestInteraction
  },
  data: function () {
    return {
      options: {
        chart: {
          id: 'chart-interactions',
          foreColor: '#FFFFFF',
          toolbar: {
            show: false
          }
        },
        xaxis: {
          categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
        }
      },
      series: [{
        name: 'series-1',
        data: [20, 40, 60, 80]
      }],
      colors: ['#FFFFFF']
    }
  }
}
</script>
<style scoped>
.content-header h1 {
    font-size: 40px;
    color: #000000!important;
}
.blueline {
    width: 76px;
    border: 3px solid #00B1FF;
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
.has-search .form-control{
  padding-left: 2.375rem;
}
.has-search .form-control-feddback{
  position: absolute;
  z-index: 2;
  display: block;
  width: 2.375rem;
  height: 2.375rem;
  line-height: 2.375rem;
  text-align: center;
  pointer-events: none;
  color:#000;
}
.url-input {
    margin-top: 0px;
}
.home-chart{
  width: 100%;
  height: 100%;
  background: transparent linear-gradient(160deg, #F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box;
  box-shadow: 13px 19px 41px #0C1F6A3B;
  border-radius: 18px;
}
</style>
