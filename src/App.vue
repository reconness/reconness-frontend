<template>
  <div class="wrapper">
    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" v-on:click="changeButton" data-widget="pushmenu" href="#" role="button">
            <span v-show="button_module" class="material-icons">view_module</span>
            <span v-show="button_vert" class="material-icons">more_vert</span>
            </a>
        </li>
      </ul>
      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto right-navbar">
        <!-- Messages Dropdown Menu -->
        <li class="nav-item">
          <form class="form-inline ml-3">
            <div class="input-group input-group-sm search-box-container">
              <div class="input-group-append search-component">
                <button class="btn btn-navbar" type="submit">
                  <span class="material-icons search-icon">search</span>
                </button>
              </div>
              <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
            </div>
          </form>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link" data-toggle="dropdown" href="#">
            <span class="material-icons">settings</span>
          </a>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <a href="#" class="dropdown-item">
              <!-- Message Start -->
              <div class="media">
                <img src="/adminlte/img/user1-128x128.jpg" alt="User Avatar" class="img-size-50 mr-3 img-circle">
                <div class="media-body">
                  <h3 class="dropdown-item-title">
                    Brad Diesel
                    <span class="float-right text-sm text-danger"><i class="fas fa-star"></i></span>
                  </h3>
                  <p class="text-sm">Call me whenever you can...</p>
                  <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                </div>
              </div>
              <!-- Message End -->
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">
              <!-- Message Start -->
              <div class="media">
                <img src="/adminlte/img/user8-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3">
                <div class="media-body">
                  <h3 class="dropdown-item-title">
                    John Pierce
                    <span class="float-right text-sm text-muted"><i class="fas fa-star"></i></span>
                  </h3>
                  <p class="text-sm">I got your message bro</p>
                  <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                </div>
              </div>
              <!-- Message End -->
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">
              <!-- Message Start -->
              <div class="media">
                <img src="/adminlte/img/user3-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3">
                <div class="media-body">
                  <h3 class="dropdown-item-title">
                    Nora Silvester
                    <span class="float-right text-sm text-warning"><i class="fas fa-star"></i></span>
                  </h3>
                  <p class="text-sm">The subject goes here</p>
                  <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                </div>
              </div>
              <!-- Message End -->
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item dropdown-footer">See All Messages</a>
          </div>
        </li>
        <!-- Notifications Dropdown Menu -->
        <li class="nav-item dropdown">
          <a class="nav-link" data-toggle="dropdown" href="#">
            <span class="material-icons">notifications_none</span>
          </a>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span class="dropdown-header">15 Notifications</span>
          </div>
        </li>
        <li class="nav-item">
          <div class="image">
            <span class="loged-user-name">John Doe</span>
            <img src="/adminlte/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
          </div>
        </li>
      </ul>
    </nav>
    <!-- /.navbar -->
    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4 left-aside" @mouseenter="mouseenter" @mouseleave="mouseleave">
      <!-- Brand Logo -->
       <router-link to="/">
      <a href="#" class="brand-link">
        <img src="/adminlte/img/reconnes/logo2x.png" v-show="hide_logo" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
        <div class="text-center">
          <span class="brand-text"><strong>Recon</strong></span><span>Ness</span>
        </div>
      </a></router-link>
      <!-- Sidebar -->
      <div class="sidebar">
        <nav class="mt-2">
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li class="nav-item">
               <router-link to="/">
              <a href="#" class="nav-link">
               <span class="material-icons">home</span>
                <p>Home</p>
              </a></router-link>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <!-- <i class="nav-icon fas fa-th"></i> -->
                <span class="material-icons">track_changes</span>
                <p>
                  Targets
                </p>
              </a>
            </li>
            <li class="nav-item has-treeview menu-open">
              <a href="#" class="nav-link" v-on:click="hideArrow">
                <span class="material-icons badge badge-dark">
                code</span>
                <p>Pipelines
                  <span v-show="arrow_down" class="material-icons right">arrow_drop_down</span>
                  <span v-show="arrow_up" class="material-icons right">arrow_drop_up</span>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item"><router-link to="/agents/list">
                  <a href="#" class="nav-link">
                    <span class="material-icons">font_download</span>
                        <p>Agents</p>
                  </a></router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <!-- <i class="nav-icon fas fa-th"></i> -->
                <span class="material-icons">settings</span>
                <p>
                  Settings
                </p>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <!-- <i class="nav-icon fas fa-th"></i> -->
                <span class="material-icons">exit_to_app</span>
                <p>
                  Logout
                </p>
              </a>
            </li>
          </ul>
        </nav>
        <!-- /.sidebar-menu -->
      </div>
      <!-- /.sidebar -->
    </aside>
    <!-- Content Wrapper. Contains page content -->
    <div class="wrapper">
      <!-- Main content -->
      <router-view/>
    </div><!-- /.content-wrapper -->
  </div><!-- ./wrapper -->
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      arrow_down: false,
      arrow_up: true,
      hide_logo: false,
      button_module: true,
      button_vert: false
    }
  },
  methods: {
    hideArrow: function () {
      this.arrow_down = !this.arrow_down
      this.arrow_up = !this.arrow_up
    },
    mouseenter: function () {
      if (this.button_vert) {
        this.hide_logo = !this.hide_logo
      }
    },
    mouseleave: function () {
      if (this.button_vert) {
        this.hide_logo = !this.hide_logo
      }
    },
    changeButton: function () {
      if (this.button_module || this.button_vert) {
        this.button_module = !this.button_module
        this.button_vert = !this.button_vert
        this.hide_logo = !this.hide_logo
      }
    }
  }
}
</script>

<style scoped>
.left-aside {
    background: rgba(245, 246, 247, 0.9) 0% 0% no-repeat padding-box;
}
.nav-pills a .material-icons {
    font-size: 20px;
    margin-right: 15px;
}

.menu-open{
  background-color:#fff;
  border-radius: 15px;
}
.nav-sidebar>.nav-item ul a {
    margin-top: 30px;
    margin-bottom: 0px;
}
.badge-dark {
background-color: #000000;
}
.badge{
  padding: 0px;
  font-weight: 100;
}
/*.has-treeview a .material-icons{
    font-size: 16px;
    margin-right: 15px;
}*/

.nav-sidebar>.nav-item {
    margin-bottom: 30px;
}

.brand-link {
    margin-bottom: 40px;
}

.nav-sidebar .nav-link>p>.right{
  right: 1px;
}
.nav.nav-pills.nav-sidebar.flex-column > li p {
    vertical-align: 3.8px;
}
.brand-link .brand-image {
    margin-left: -0.1rem;
    max-height: 60px;
}
.brand-link div {
    font-size: 1.8rem;
}
form .input-group {
    display: -webkit-inline-box;
}
</style>
