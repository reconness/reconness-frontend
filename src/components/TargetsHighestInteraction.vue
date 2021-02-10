<template>
        <div :style ="{background:background}" style="border-radius: 25px; padding: 25px; box-shadow: 13px 31px 41px #0C1F6A3B; margin-bottom: 1rem;">
            <div class="row">
            <div class="col-9">
                <p  class="targets-title">
                Targets with the most interactions in the last week
                </p>
            </div>
            <div class="col-3">
                <div class = "number float-right">
                <span>92</span>
                </div>
            </div>
            </div>
            <div class="progress-group">
            <div class="row">
                <div class="col-12">
                <small class="float-right progress-group-color">92</small>
                </div>
                <div class="col-12">
                <small class="name float-left">Yanet</small>
                <div class="progress progress-sm">
                    <div class="progress-bar bg-primary" style="width: 92%"></div>
                </div>
                </div><!-- /.col-12 -->
            </div><!-- /.row -->
            </div><!-- /.progress-group -->
            <div class="progress-group">
            <div class="row">
                <div class="col-12">
                <small class="float-right progress-group-color">88</small>
                </div>
                <div class="col-12">
                 <small class="name float-left">Portraite</small>
                <div class="progress progress-sm line-height: 10px">
                    <div class="progress-bar bg-primary" style="width: 88%"></div>
                </div>
                </div><!-- /.col-12 -->
            </div><!-- /.row -->
            </div><!-- /.progress-group -->
            <div class="progress-group">
            <div class="row">
                <div class="col-12">
                <small class="float-right progress-group-color">70</small>
                </div>
                <div class="col-12">
                 <small class="name float-left">Yanet</small>
                <div class="progress progress-sm line-height: 10px">
                    <div class="progress-bar bg-primary" style="width: 70%"></div>
                </div>
                </div><!-- /.col-12 -->
            </div><!-- /.row -->
            </div><!-- /.progress-group -->

            <div class="progress-group">
            <div class="row">
                <div class="col-12">
                <small class="float-right progress-group-color">60</small>
                </div>
                <div class="col-12">
                 <small class="name float-left">Portraite</small>
                <div class="progress progress-sm line-height: 10px">
                    <div class="progress-bar bg-primary" style="width: 60%"></div>
                </div>
                </div><!-- /.col-12 -->
            </div><!-- /.row -->
            </div><!-- /.progress-group -->
              <div class="progress-group">
            <div class="row">
                <div class="col-12">
                <small class="float-right progress-group-color">51</small>
                </div>
                <div class="col-12">
                 <small class="name float-left"> Yanet </small>
                <div class="progress progress-sm line-height: 10px">
                    <div class="progress-bar bg-primary" style="width: 51%"></div>
                </div>
                </div><!-- /.col-12 -->
            </div><!-- /.row -->
            </div><!-- /.progress-group -->
        </div>
</template>

<script>
export default {
  name: 'TargetsHighestInteraction',
  props: {
    background: String
  }
}
</script>
<style scoped>
.name{
    width: 70px;
    line-height: 10px;
    font-size: 12px;
    color: #ffffff;
    opacity: 1;
}
.progress-sm {
    height: 5px;
    margin-top: 4px;
}

.progress {
    background-color: rgba(222, 229, 236, 0.32);
    border-radius: 4px;
    opacity: 0.7;
}

.bg-primary {
    background: transparent linear-gradient(180deg, #ffffff 0%, #ffffff 100%) 0% 0% no-repeat padding-box;
}
.progress-group-color{
    color: #ffffff;
    font-size: 10px;
    opacity: 1;
}
</style>
