<template>
    <div class="col-12 col-lg-4">
        <div :style ="{backgroundColor:background}" style="border-radius: 25px; padding: 25px; box-shadow: 13px 31px 41px #0C1F6A3B;">
            <div class="row">
            <div class="col-9">
                <p style="text-align: left!important;" class="text-center">
                <small>Targets with the most interactions in the last week</small>
                </p>
            </div>
            <div class="col-3">
                <div class = "number">
                <span class="float-right">
                    36
                </span>
                </div>
            </div>
            </div>
            <div class="progress-group">
            <div class="row">
                <div class="col-12">
                <small class="float-right"><b>160</b>/200</small>
                </div>
                <div class="col-12">
                <small class="name float-left">
                    Yanet
                </small>
                <div class="progress progress-sm">
                    <div class="progress-bar bg-primary" style="width: 80%"></div>
                </div>
                </div><!-- /.col-12 -->
            </div><!-- /.row -->
            </div><!-- /.progress-group -->
            <div class="progress-group">
            <div class="row">
                <div class="col-12">
                <small class="float-right"><b>160</b>/200</small>
                </div>
                <div class="col-12">
                 <small class="name float-left">
                    Portraite
                </small>
                <div class="progress progress-sm line-height: 10px">
                    <div class="progress-bar bg-primary" style="width: 80%"></div>
                </div>
                </div><!-- /.col-12 -->
            </div><!-- /.row -->
            </div><!-- /.progress-group -->
            <div class="progress-group">
            <div class="row">
                <div class="col-12">
                <small class="float-right"><b>160</b>/200</small>
                </div>
                <div class="col-12">
                 <small class="name float-left">
                    Yanet
                </small>
                <div class="progress progress-sm line-height: 10px">
                    <div class="progress-bar bg-primary" style="width: 80%"></div>
                </div>
                </div><!-- /.col-12 -->
            </div><!-- /.row -->
            </div><!-- /.progress-group -->

            <div class="progress-group">
            <div class="row">
                <div class="col-12">
                <small class="float-right"><b>160</b>/200</small>
                </div>
                <div class="col-12">
                 <small class="name float-left">
                    Portraite
                </small>
                <div class="progress progress-sm line-height: 10px">
                    <div class="progress-bar bg-primary" style="width: 80%"></div>
                </div>
                </div><!-- /.col-12 -->
            </div><!-- /.row -->
            </div><!-- /.progress-group -->
        </div>
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
.number{
    display: contents;
    padding: 2px;
    display: inline-block;
    float: right;
    border: 3px solid rgba(255, 255, 255, 0.15);
    border-radius: 14px;
}
.number span{
     padding: 5px;
     background-color: rgba(255, 255, 255, 0.15);
     border-radius: 10px;
     color: white;
}
.name{
    width: 70px;
    line-height: 10px;
    color: rgba(253, 253, 253, 0.76);
}
.progress-sm {
    height: 5px;
}
.text-center {
    color: rgba(255, 255, 255, 0.79);
}
</style>
