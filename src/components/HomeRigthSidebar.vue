<template>
  <div class="col-xs-12 col-lg-3">
    <div class="right-sidebar">
      <div class="target-item-home">
        <div class="right-sidebar-title text-center">
          <span class="float-left sidebar-targets-title">TARGET LIST</span>
          <ul style="padding-top: 7px;" class="float-right target-list-header">
            <li>
              Sort by
            </li>
            <li class="box-contained">
              <span class="material-icons">sort</span>
            </li>
          </ul>
        </div>
        <div class="info-box homerigthsidebar-infobox rounded-corners">
          <span style="background-color: #17a2b8 !important;" class="info-box-icon bg-info elevation-1"><span class="material-icons homerigthsidebar-infobox-icon">track_changes</span></span>
          <div class="info-box-content">
            <span class="info-box-text domain-names-target">My target<span class="material-icons float-right">more_vert</span></span>
            <span class="domain-names-list">
              reconnes.com, another server
            </span>
          </div><!-- /.info-box-content -->
        </div><!-- /.info-box -->
        <div class="info-box homerigthsidebar-infobox rounded-corners homerigthsidebar-targets-spaces">
          <span style="background-color: #9a25b6 !important;" class="info-box-icon bg-info elevation-1"><span class="material-icons homerigthsidebar-infobox-icon">track_changes</span></span>
          <div class="info-box-content">
            <span class="info-box-text domain-names-target">My target<span class="material-icons float-right">more_vert</span></span>
            <span class="domain-names-list">
              reconnes.com, another server
            </span>
          </div><!-- /.info-box-content -->
        </div><!-- /.info-box -->
        <div class="info-box homerigthsidebar-infobox rounded-corners homerigthsidebar-targets-spaces">
          <span style="background-color: #e91013 !important;" class="info-box-icon bg-info elevation-1"><span class="material-icons homerigthsidebar-infobox-icon">track_changes</span></span>
          <div class="info-box-content">
            <span class="info-box-text domain-names-target">My target<span class="material-icons float-right">more_vert</span></span>
            <span class="domain-names-list">
              reconnes.com, another server
            </span>
          </div><!-- /.info-box-content -->
        </div><!-- /.info-box -->
        <div class="info-box homerigthsidebar-infobox rounded-corners homerigthsidebar-targets-spaces">
          <span style="background-color: #f36e1c !important;" class="info-box-icon bg-info elevation-1"><span class="material-icons homerigthsidebar-infobox-icon">track_changes</span></span>
          <div class="info-box-content">
            <span class="info-box-text domain-names-target">My target<span class="material-icons float-right">more_vert</span></span>
            <span class="domain-names-list">
              reconnes.com, another server
            </span>
          </div><!-- /.info-box-content -->
        </div><!-- /.info-box -->
      </div><!-- /.targets-list-home -->
    </div><!-- /.right-sidebar -->
  </div><!-- /.col-xs-2-->
</template>
<script>
export default {
  name: 'HomeRigthSidebar'
}
</script>
<style>
  .homerigthsidebar-infobox{
    width:90%;
    margin: auto;
    background: #FFFFFF 0% 0% no-repeat padding-box;
  }
  .homerigthsidebar-infobox-icon{
    font-size: 32px;
    color: #FFFFFF;
  }
  .sidebar-targets-title{
    padding-left: 10px;
    margin-top: 20px;
    font: normal normal bold 24px/32px Poppins;
  }
  .target-item-home .info-box.homerigthsidebar-infobox.rounded-corners{
    box-shadow: none;
  }

  .homerigthsidebar-targets-spaces{
    margin-top: 40px;
  }

</style>
