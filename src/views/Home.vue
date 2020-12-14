<template>
<div class="content-wrapper">
  <div class="container-fluid">
  <div class="row mb-2">
    <div class="col-xs-12 col-lg-7 offset-lg-1">
    <div class="row">
      <div class="col-lg-12">
        <div class="content-header">
          <h1 class="m-0 text-dark home-main-text">Welcome Reconness!!</h1>
        </div><!-- /.content-header -->
      </div><!-- /.col -->
      <div class="col-lg-12">
        <hr class="blueline"/>
      </div>
      <div class="col-lg-12">
        <div class="content">
          <!-- <div class="container"> -->
            <div class="row">
              <div class="col-lg-12">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="home-secondary-text">
                      <ul class="app-description">
                        <li>
                          <span class="home-secondary-text">
                            A web app tool to run and keep all your <span class="blue-text">#recon</span> in the same place
                          </span>
                        </li>
                        <li>
                          <span>
                            and allow you to query your targets in an user friendly way
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div><!-- /.col -->
                  <div class="col-lg-12">
                    <p class="float-right bold-text separator-content inline-material-icons">Last week resumee<span class="material-icons search-icon blue-text">keyboard_arrow_right</span></p>
                  </div>
                  <TargetsHighestInteraction></TargetsHighestInteraction>
                  <div class="col-lg-4">
                    <h1 class="text-center">grafo 2</h1>
                  </div><!-- /.col -->
                  <TargetsHighestInteraction></TargetsHighestInteraction>
                  <div class="col-lg-12">
                    <span class="refandres">References and resources</span><span> ></span>
                  </div><!-- /.col -->
                  <div class="col-lg-12">
                    <div class="home-quote-box">
                      <div class="row">
                        <div class="col-lg-12">
                          <span class="home-quote">"A smart personis not one that knows the answers, but one who knows where to find them..."</span>
                        </div>
                        <!-- <div class="home-form"> -->
                        <!-- <form class="form-inline ml-3"> -->
                        <div class="col-lg-12">
                          <div class="row">
                            <div class="col-lg-8">
                                <div class="input-group input-group-sm">
                                  <div class="input-group-append">
                                    <button class="btn btn-navbar" type="submit">
                                      <span class="material-icons search-icon">search</span>
                                    </button>
                                  </div>
                                  <input class="form-control" type="search" placeholder="URL">
                                </div>
                            </div>
                            <div class="col-lg-4">
                              <div class="row">
                                <div class="col-lg-6">
                                  <select class="form-control select2 rounded-lg" style="width: 100%;">
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
                                  <button type="submit" class="btn btn-default rounded-lg">Add</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                          <!-- </form> -->
                          <!-- </div>           -->
                        <div class="col-lg-12">
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
  }
}
</script>
