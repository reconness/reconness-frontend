<template>
<div class="content-wrapper screen-height">
      <div class="container-fluid">
        <hr class="reset-margin-top" :class="{'mb-0': isOnAgentMinimalView}"/>
        <!-- <div class="content"> -->
          <div class="row">
            <div class="col-12">
              <div class="row">
                  <div class="w-60px"></div>
                  <div class="col-1 my-2 border-left">Status</div>
                  <div class="col-2 my-2 border-left">Description</div>
                  <div class="col-3 my-2 border-left">Date</div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <span>Today</span>
            </div>
            <div class="col-12">
              <div class="row">
                  <div class="w-60px"></div>
                  <div class="col-1 my-2">
                    1
                  </div>
                  <div class="col-2 my-2">
                    dfsfsdf
                  </div>
                  <div class="col-3 my-2">
                    sdfsdf
                  </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                  <div class="w-60px"></div>
                  <div class="col-1 my-2">
                    1
                  </div>
                  <div class="col-2 my-2">
                    dfsfsdf
                  </div>
                  <div class="col-3 my-2">
                    sdfsdf
                  </div>
              </div>
            </div>
            <div class="col-12">
              <span>Yesterday</span>
            </div>
            <div class="col-12">
              <div class="row">
                  <div class="w-60px"></div>
                  <div class="col-1 my-2">
                    1
                  </div>
                  <div class="col-2 my-2">
                    dfsfsdf
                  </div>
                  <div class="col-3 my-2">
                    sdfsdf
                  </div>
              </div>
            </div>
          </div>
      </div>
</div>
</template>
<script>
export default {
  name: 'NotificationsCenter',
  mounted () {
    this.$store.commit('agent/updateLocView', 'NotificationsCenter', true)
  }
}
</script>
<style scoped>
.header-bottom-line-shadow {
    background: #fbfbfb 0% 0% no-repeat padding-box;
    opacity: 1;
    box-shadow: 0px 6px 10px #0000000F
}
</style>
