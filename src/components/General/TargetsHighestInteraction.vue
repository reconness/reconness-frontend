<template>
        <div :style ="{background:background}" class="box-outline">
            <div class="row">
            <div class="col-9">
                <p  class="targets-title">
                {{title}}
                </p>
            </div>
            <div class="col-3">
                <div class = "number float-right">
                <span>{{subdomainByDirectories.length}}</span>
                </div>
            </div>
            </div>
            <div v-for="subdomain of subdomainByDirectories" :key="subdomain.subdomain" class="progress-group mb-3">
            <div class="row">
                <div class="col-12">
                    <div class="d-flex justify-content-between">
                        <small class="name">{{subdomain.subdomain}}</small>
                        <small class="float-right progress-group-color">{{subdomain.port}}</small>
                    </div>
                <div class="progress progress-sm">
                    <div class="progress-bar bg-primary" style="width: 92%"></div>
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
    background: String,
    title: String,
    subdomainByDirectories: {
      type: Array,
      default: () => []
    },
    amountToDisplay: {
      type: Number,
      default: () => 4
    }
  },
  computed: {
    subdomainByDirectoriesLimited () {
      return this.subdomainByDirectories.slice(0, this.amountToDisplay)
    }
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
.box-outline {
    border-radius: 25px;
    padding: 25px;
    box-shadow: 13px 31px 41px #0C1F6A3B;
    margin-bottom: 1rem;
}
</style>
