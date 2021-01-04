<template>
  <div class="col-12 col-lg-3 col-xll-2">
    <div class="right-sidebar target-item-home ">
        <div class="d-flex justify-content-between">
          <div class="float-left">
        <h5>TARGET LIST</h5></div>
        <div class="dropdown float-right">
       <p class="float-left">Sort by</p>
  <button class="btn btn-light sort-button" title="Sort by" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
   <i class="material-icons" >sort</i>
  </button>
  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button">Name</button>
    <button class="dropdown-item" type="button">Last Added</button>
  </div>
        </div>
        </div>
        <div class="info-box homerigthsidebar-infobox rounded-corners  homerigthsidebar-targets-spaces">
          <span style="background:transparent linear-gradient(135deg, #03dced 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box;" class="info-box-icon bg-info elevation-1">
            <span class="material-icons homerigthsidebar-infobox-icon">track_changes</span>
          </span>
          <div class="info-box-content">
          <span class="info-box-text domain-names-target">My target
          <span class="material-icons float-right vert" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">more_vert</span>
    <!--       <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
            <a href="#" class="color-blue" data-toggle="modal" data-target="#confirmModal">
            <button class="dropdown-item" type="button">Delete</button>
            </a>
          </div>-->
          </span>
            <span class="domain-names-list">
             <small > >reconnes.com, anoth..</small>
            </span>
          </div><!-- /.info-box-content -->
        </div><!-- /.info-box -->
        <div class="info-box homerigthsidebar-infobox rounded-corners homerigthsidebar-targets-spaces">
          <span style="background-color: #9a25b6 !important;" class="info-box-icon bg-info elevation-1"><span class="material-icons homerigthsidebar-infobox-icon">track_changes</span></span>
          <div class="info-box-content">
            <span class="info-box-text domain-names-target">My target
              <span class="material-icons float-right vert">more_vert</span></span>
            <span class="domain-names-list">
              <small >>reconnes.com, anoth..</small>
            </span>
          </div><!-- /.info-box-content -->
        </div><!-- /.info-box -->
        <div class="info-box homerigthsidebar-infobox rounded-corners homerigthsidebar-targets-spaces">
          <span style="background: transparent linear-gradient(160deg, #F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box;" class="info-box-icon bg-info elevation-1"><span class="material-icons homerigthsidebar-infobox-icon">track_changes</span></span>
          <div class="info-box-content">
            <span class="info-box-text domain-names-target">My target<span class="material-icons float-right vert">more_vert</span></span>
            <span class="domain-names-list">
              <small >>reconnes.com, anoth..</small>
            </span>
          </div><!-- /.info-box-content -->
        </div><!-- /.info-box -->
        <div class="info-box homerigthsidebar-infobox rounded-corners homerigthsidebar-targets-spaces">
          <span style="background-color: #f36e1c !important;" class="info-box-icon bg-info elevation-1"><span class="material-icons homerigthsidebar-infobox-icon">track_changes</span></span>
          <div class="info-box-content">
            <span class="info-box-text domain-names-target">My target<span class="material-icons float-right vert">more_vert</span></span>
            <span class="domain-names-list">
              <small >>reconnes.com, anoth..</small>
            </span>
          </div><!-- /.info-box-content -->
        </div><!-- /.info-box -->
                <div class="info-box homerigthsidebar-infobox rounded-corners  homerigthsidebar-targets-spaces">
          <span style="background:transparent linear-gradient(135deg, #03dced 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box;" class="info-box-icon bg-info elevation-1">
            <span class="material-icons homerigthsidebar-infobox-icon">track_changes</span>
          </span>
          <div class="info-box-content">
          <span class="info-box-text domain-names-target">My target
          <span class="material-icons float-right vert" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">more_vert</span>
   <!--        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
            <a href="#" class="color-blue" data-toggle="modal" data-target="#confirmModal">
            <button class="dropdown-item" type="button">Delete</button>
            </a>
          </div>-->
          </span>
            <span class="domain-names-list">
             <small > >reconnes.com, anoth..</small>
            </span>
          </div><!-- /.info-box-content -->
        </div><!-- /.info-box -->
      </div><!-- /.targets-list-home -->
    <div class="modal fade" id="confirmModal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header dialog-without-lines-header">
                  <!-- PARAMETIZABLE -->
                  <h5 class="modal-title"><b>
                       Are you sure you want to delete selected target?</b></h5>
              </div>
              <div class="modal-body">
                  <!-- PARAMETIZABLE -->
                  <p>Please, confirm the name of the target before delete it</p>
                  <input autofocus required  style="border-top: none; border-left: none; border-right: none;" class="form-control" placeholder="Target Name">
              </div>
              <div class="modal-footer dialog-without-lines-footer">
                  <button type="button" class="btn btn-primary btn-danger delete_btn" >Delete</button>
                  <button @click="close()" type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
              </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /#confirmation-modal -->
    </div>
</template>
<script>
export default {
  name: 'HomeRigthSidebar'
}
</script>
<style scoped>
  .homerigthsidebar-infobox{
    width:90%;
    margin: auto;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    min-height: 76px !important;
  }
  .homerigthsidebar-infobox-icon{
    font-size: 32px;
    color: #FFFFFF;
  }
  .sidebar-targets-title{
    padding-left: 10px;
    margin-top: 20px;
    /*font: normal normal bold 24px/32px Poppins;*/
  }
  .target-item-home .info-box.homerigthsidebar-infobox.rounded-corners{
    box-shadow: none;
  }

  .homerigthsidebar-targets-spaces{
    margin-top: 30px;
  }
  .justify-content-between {
    padding: 20px 20px 0px 20px;
}
.sort-button{
    background-color:rgba(230, 233, 237, 0.24);
    border-color: rgba(221, 221, 221, 0.03);
    color: #161616;
    padding: 0.1rem;
    border-radius: 0.4rem;
    height: 26px;
    width: 24px;
   margin-left: 10px;
}

.elevation-1 {
    box-shadow: 3px 12px 23px;
    border-radius: 13px !important;
    width: 56px !important;
    height: 56px!important;
}

.vert {
    font-size: 20px;
    color: #a99c9c;
}

.justify-content-between h5{
  font-size: 24px;
  font-weight: bold;
}
.justify-content-between p{
  font-size: 14px;
  color: #161616;
}

.justify-content-between .material-icons{
  font-size: 20px;
  }

@media (max-width: 1100px) {
.justify-content-between h5{
  font-size: 18px;
}
.justify-content-between p{
display: none;
}
}

@media (max-width: 1400px) {
.justify-content-between h5{
  font-size: 15px;
}  .domain-names-target {
    font-size: 13px;
}

}

.btn-red{
    color: #fff;
    background-color: #ff4545;
    border-color: #ff4545;
    box-shadow: none;
}
.btn-cancel{
  color: rgb(216, 106, 106);
}

@media (min-width: 2560px) {
.col-xll-2 {
    -ms-flex: 0 0 16.666667%;
    flex: 0 0 16.666667%;
    max-width: 16.666667%;
}
}

</style>
