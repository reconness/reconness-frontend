<template>
  <div>
    <input class="form-control target-input-borders mb-2" :value="modelValue" @input="filteredEntities"/>
    <div v-click-outside="closeMenuFn" v-if="filteredLocations.length > 0 && isWriting && !closedMenu" class="dropdown-menu mb-2" aria-labelledby="dropdownMenu2">
      <button class="dropdown-item" v-for="item in filteredLocations" :key="item" @click="setLocation(item.name)">{{item.name}}</button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AutoCompleteLocations',
  props: {
    selectedType: {
      type: Number,
      default: 0
    },
    modelValue: String
  },
  data: function () {
    return {
      filteredLocations: [],
      closedMenu: false,
      isWriting: false
    }
  },
  computed: {
    ...mapGetters('target', ['filterTargetsByName', 'filterRootDomainsByName', 'filterSubDomainsByName'])
  },
  emits: ['update:modelValue'],
  methods: {
    filteredEntities (event) {
      if (this.selectedType === this.$agentType.TARGET) {
        this.filteredLocations = this.filterTargetsByName({ name: event.target.value, strict: false })
      } else if (this.selectedType === this.$agentType.ROOTDOMAIN) {
        this.filteredLocations = this.filterRootDomainsByName({ name: event.target.value, strict: false })
      } else {
        this.filteredLocations = this.filterSubDomainsByName({ name: event.target.value, strict: false })
      }
      this.isWriting = true
      this.closedMenu = false
      this.$emit('update:modelValue', event.target.value)
    },
    setLocation (location) {
      this.closedMenu = true
      this.$emit('update:modelValue', location)
    },
    closeMenuFn () {
      this.closedMenu = true
    }
  },
  directives: {
    clickOutside: {
      beforeMount (el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event, el)
          }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      unmounted (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      }
    }
  }
}
</script>
<style scoped>
  .dropdown-menu{
    display: inherit !important;
    width: 100%;
    position: relative;
  }
</style>
